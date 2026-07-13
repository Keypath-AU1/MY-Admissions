/* ==========================================================================
   SUN / SIM Weekly Alignment Dashboard
   Fully client-side: parses an uploaded CRM export (CSV or Excel) in a
   long-format schema and renders charts + tables. Nothing leaves the browser.

   Expected schema (one row per metric per week per entity):
     week_ending, entity, group, type, name, metric, value

     week_ending : date, e.g. 2026-07-17
     entity      : "SUN" or "SIM"
     group       : "Marketing" or "Admissions"
     type        : "Channel" | "Program" | "Advisor"
     name        : e.g. "SEO", "Business", "Ron Lim"
     metric      : "Leads" | "Applications" | "Handles" | "Contacts" | "ICs" | "ECs" | "Apps"
     value       : number
   ========================================================================== */

const STORAGE_KEY = "wat_dashboard_records_v1";
const PER_ADVISOR_TARGET = { Handles: 500, Contacts: 50, ICs: 10, ECs: 3, Apps: 2 };
const RATE_STAGES = [
  { key: "contactRate", label: "Contact Rate", num: "Contacts", den: "Handles" },
  { key: "cicRate", label: "C \u2192 IC", num: "ICs", den: "Contacts" },
  { key: "icecRate", label: "IC \u2192 EC", num: "ECs", den: "ICs" },
  { key: "ecappRate", label: "EC \u2192 App", num: "Apps", den: "ECs" },
];
const PALETTE = ["#203864", "#B23B2E", "#1F7A54", "#B7791F", "#5B2C6F", "#2E6B8F", "#8A5A2E", "#6B7280"];

let records = [];
let currentEntity = "SUN";
let charts = {};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* ---------------------------- Parsing helpers ---------------------------- */

function excelSerialToDate(n) {
  return new Date(Math.round((n - 25569) * 86400 * 1000));
}

function parseDateValue(v) {
  if (v instanceof Date) return v;
  if (typeof v === "number") return excelSerialToDate(v);
  if (typeof v === "string") {
    const d = new Date(v);
    if (!isNaN(d)) return d;
  }
  return null;
}

function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

function normalizeRows(rawRows) {
  const required = ["week_ending", "entity", "group", "type", "name", "metric", "value"];
  const out = [];
  let skipped = 0;
  for (const row of rawRows) {
    const keys = Object.keys(row).reduce((acc, k) => { acc[k.trim().toLowerCase()] = row[k]; return acc; }, {});
    const missing = required.some((r) => keys[r] === undefined || keys[r] === null || keys[r] === "");
    if (missing) { skipped++; continue; }
    const d = parseDateValue(keys.week_ending);
    const value = Number(keys.value);
    if (!d || isNaN(value)) { skipped++; continue; }
    out.push({
      date: toISODate(d),
      entity: String(keys.entity).trim().toUpperCase(),
      group: String(keys.group).trim(),
      type: String(keys.type).trim(),
      name: String(keys.name).trim(),
      metric: String(keys.metric).trim(),
      value,
    });
  }
  return { rows: out, skipped };
}

function parseCSVText(text) {
  const parsed = Papa.parse(text, { header: true, skipEmptyLines: true, dynamicTyping: false });
  return normalizeRows(parsed.data);
}

function parseWorkbookArrayBuffer(buf) {
  const wb = XLSX.read(buf, { type: "array", cellDates: true });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });
  return normalizeRows(rows);
}

/* ---------------------------- Data access layer --------------------------- */

function uniqueSorted(arr) {
  return Array.from(new Set(arr)).sort();
}

function filterRows({ entity, group, type, metric }) {
  return records.filter((r) =>
    (!entity || r.entity === entity) &&
    (!group || r.group === group) &&
    (!type || r.type === type) &&
    (!metric || r.metric === metric)
  );
}

function seriesByName({ entity, group, type, metric }) {
  const rows = filterRows({ entity, group, type, metric });
  const dates = uniqueSorted(rows.map((r) => r.date));
  const names = uniqueSorted(rows.map((r) => r.name));
  const map = {};
  names.forEach((n) => { map[n] = dates.map(() => null); });
  rows.forEach((r) => {
    const di = dates.indexOf(r.date);
    map[r.name][di] = (map[r.name][di] || 0) + r.value;
  });
  return { dates, names, map };
}

function totalsByDate({ entity, group, type, metric }) {
  const rows = filterRows({ entity, group, type, metric });
  const dates = uniqueSorted(rows.map((r) => r.date));
  const totals = {};
  dates.forEach((d) => { totals[d] = 0; });
  rows.forEach((r) => { totals[r.date] += r.value; });
  return { dates, totals };
}

function admissionsTotalsByDate(entity) {
  const dates = uniqueSorted(filterRows({ entity, group: "Admissions", type: "Advisor" }).map((r) => r.date));
  const perMetric = {};
  Object.keys(PER_ADVISOR_TARGET).forEach((m) => {
    const t = totalsByDate({ entity, group: "Admissions", type: "Advisor", metric: m });
    perMetric[m] = dates.map((d) => (d in t.totals ? t.totals[d] : null));
  });
  const advisorCounts = dates.map((d) => {
    const names = new Set(records.filter((r) => r.entity === entity && r.group === "Admissions" && r.type === "Advisor" && r.date === d).map((r) => r.name));
    return names.size;
  });
  return { dates, perMetric, advisorCounts };
}

function safeDiv(a, b) {
  if (a === null || b === null || !b) return null;
  return a / b;
}

function latestDate(dates) {
  return dates.length ? dates[dates.length - 1] : null;
}

function prevDate(dates) {
  return dates.length > 1 ? dates[dates.length - 2] : null;
}

/* ------------------------------- Rendering -------------------------------- */

function entityColor(entity) {
  return entity === "SUN" ? "#203864" : "#5B2C6F";
}

function fmtInt(n) {
  return n === null || n === undefined ? "\u2013" : Math.round(n).toLocaleString();
}
function fmtPct(n) {
  return n === null || n === undefined || isNaN(n) ? "\u2013" : (n * 100).toFixed(1) + "%";
}

function renderAll() {
  document.querySelector(".topbar").dataset.entity = currentEntity;
  renderKPIs();
  renderChannelChart();
  renderProgramChart();
  renderRatesChart();
  renderFunnel();
  renderAdvisorTable();
}

function deltaBadge(curr, prev, higherIsBetter) {
  if (curr === null || prev === null || prev === 0) return { text: "", cls: "" };
  const diff = curr - prev;
  const pct = (diff / Math.abs(prev)) * 100;
  const good = higherIsBetter ? diff >= 0 : diff <= 0;
  const arrow = diff >= 0 ? "\u25B2" : "\u25BC";
  return { text: arrow + " " + Math.abs(pct).toFixed(1) + "% vs prior week", cls: good ? "good" : "bad" };
}

function renderKPIs() {
  const mktLeads = totalsByDate({ entity: currentEntity, group: "Marketing", type: "Channel", metric: "Leads" });
  const mktApps = totalsByDate({ entity: currentEntity, group: "Marketing", type: "Program", metric: "Applications" });
  const adm = admissionsTotalsByDate(currentEntity);

  const ld = latestDate(mktLeads.dates), pd = prevDate(mktLeads.dates);
  const leadsNow = ld ? mktLeads.totals[ld] : null;
  const leadsPrev = pd ? mktLeads.totals[pd] : null;

  const ad2 = latestDate(mktApps.dates), pd2 = prevDate(mktApps.dates);
  const appsNow = ad2 ? mktApps.totals[ad2] : null;
  const appsPrev = pd2 ? mktApps.totals[pd2] : null;

  const admLatestIdx = adm.dates.length - 1;
  const admPrevIdx = adm.dates.length - 2;
  const contactRateNow = admLatestIdx >= 0 ? safeDiv(adm.perMetric.Contacts[admLatestIdx], adm.perMetric.Handles[admLatestIdx]) : null;
  const contactRatePrev = admPrevIdx >= 0 ? safeDiv(adm.perMetric.Contacts[admPrevIdx], adm.perMetric.Handles[admPrevIdx]) : null;
  const icecNow = admLatestIdx >= 0 ? safeDiv(adm.perMetric.ECs[admLatestIdx], adm.perMetric.ICs[admLatestIdx]) : null;
  const icecPrev = admPrevIdx >= 0 ? safeDiv(adm.perMetric.ECs[admPrevIdx], adm.perMetric.ICs[admPrevIdx]) : null;

  const leadToApp = safeDiv(appsNow, leadsNow);

  const cards = [
    { label: "Leads (latest week)", value: fmtInt(leadsNow), delta: deltaBadge(leadsNow, leadsPrev, true), watch: false },
    { label: "Applications (latest week)", value: fmtInt(appsNow), delta: deltaBadge(appsNow, appsPrev, true), watch: false },
    { label: "Lead-to-Application Rate", value: fmtPct(leadToApp), delta: { text: "", cls: "" }, watch: false },
    { label: "Contact Rate", value: fmtPct(contactRateNow), delta: deltaBadge(contactRateNow, contactRatePrev, true), watch: false },
    { label: "IC \u2192 EC Rate", value: fmtPct(icecNow), delta: deltaBadge(icecNow, icecPrev, true), watch: true },
  ];

  $("#kpiRow").innerHTML = cards.map((c) => {
    const sub = c.delta.text ? `<div class="sub ${c.delta.cls}">${c.delta.text}</div>` : `<div class="sub">&nbsp;</div>`;
    return `<div class="kpi-card ${c.watch ? "watch" : ""}">
      <div class="label">${c.label}</div>
      <div class="value">${c.value}</div>
      ${sub}
    </div>`;
  }).join("");
}

function baseLineOptions(yLabel, isPercent) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 11 } } } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 }, maxRotation: 45, minRotation: 45 } },
      y: {
        title: { display: true, text: yLabel, font: { size: 11 } },
        ticks: isPercent ? { callback: (v) => (v * 100).toFixed(0) + "%", font: { size: 10 } } : { font: { size: 10 } },
        grid: { color: "#EEEFF2" },
      },
    },
  };
}

function destroyChart(key) {
  if (charts[key]) { charts[key].destroy(); delete charts[key]; }
}

function renderChannelChart() {
  const { dates, names, map } = seriesByName({ entity: currentEntity, group: "Marketing", type: "Channel", metric: "Leads" });
  destroyChart("channel");
  const ctx = $("#chartChannel").getContext("2d");
  charts.channel = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: names.map((n, i) => ({
        label: n, data: map[n], borderColor: PALETTE[i % PALETTE.length],
        backgroundColor: PALETTE[i % PALETTE.length], tension: 0.3, pointRadius: 2, borderWidth: 2,
      })),
    },
    options: baseLineOptions("Leads", false),
  });
}

function renderProgramChart() {
  const leads = totalsByDate({ entity: currentEntity, group: "Marketing", type: "Program", metric: "Leads" });
  const apps = totalsByDate({ entity: currentEntity, group: "Marketing", type: "Program", metric: "Applications" });
  const dates = uniqueSorted([...leads.dates, ...apps.dates]);
  destroyChart("program");
  const opts = baseLineOptions("Leads", false);
  const ctx = $("#chartProgram").getContext("2d");
  charts.program = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        { label: "Total Leads", data: dates.map((d) => (d in leads.totals ? leads.totals[d] : null)), borderColor: entityColor(currentEntity), backgroundColor: entityColor(currentEntity), tension: 0.3, pointRadius: 2, borderWidth: 2 },
        { label: "Total Applications", data: dates.map((d) => (d in apps.totals ? apps.totals[d] : null)), borderColor: "#B7791F", backgroundColor: "#B7791F", tension: 0.3, pointRadius: 2, borderWidth: 2, yAxisID: "y1" },
      ],
    },
    options: {
      ...opts,
      scales: {
        ...opts.scales,
        y1: { position: "right", title: { display: true, text: "Applications", font: { size: 11 } }, grid: { display: false }, ticks: { font: { size: 10 } } },
      },
    },
  });
}

function renderRatesChart() {
  const adm = admissionsTotalsByDate(currentEntity);
  const seriesData = RATE_STAGES.map((s) =>
    adm.dates.map((_, i) => safeDiv(adm.perMetric[s.num][i], adm.perMetric[s.den][i]))
  );
  destroyChart("rates");
  const ctx = $("#chartRates").getContext("2d");
  charts.rates = new Chart(ctx, {
    type: "line",
    data: {
      labels: adm.dates,
      datasets: RATE_STAGES.map((s, i) => ({
        label: s.label, data: seriesData[i], borderColor: PALETTE[i % PALETTE.length],
        backgroundColor: PALETTE[i % PALETTE.length], tension: 0.3, pointRadius: 2, borderWidth: 2,
      })),
    },
    options: baseLineOptions("Rate", true),
  });
}

function renderFunnel() {
  const adm = admissionsTotalsByDate(currentEntity);
  const idx = adm.dates.length - 1;
  const wrap = $("#funnelViz");
  const weekLabel = $("#funnelWeekLabel");
  if (idx < 0) { wrap.innerHTML = ""; weekLabel.textContent = "No admissions data loaded yet."; return; }

  const date = adm.dates[idx];
  const advisorCount = adm.advisorCounts[idx] || 0;
  weekLabel.textContent = "Week of " + date + " \u2022 " + advisorCount + " active advisor" + (advisorCount === 1 ? "" : "s");

  const stages = ["Handles", "Contacts", "ICs", "ECs", "Apps"];
  const values = stages.map((s) => adm.perMetric[s][idx]);
  const targets = stages.map((s) => PER_ADVISOR_TARGET[s] * advisorCount);
  const maxVal = Math.max.apply(null, values.map((v) => v || 0).concat(targets).concat([1]));

  let html = "";
  stages.forEach((s, i) => {
    const v = values[i];
    const t = targets[i];
    const heightPct = Math.max(((v || 0) / maxVal) * 100, v ? 4 : 0);
    const targetPct = (t / maxVal) * 100;
    const met = v !== null && v >= t;
    const convText = i > 0 && values[i - 1] ? ((v / values[i - 1]) * 100).toFixed(1) + "% of " + stages[i - 1] : "";
    html += '<div class="funnel-stage">' +
      '<div class="funnel-bar-track">' +
        '<div class="funnel-target-line" style="bottom:' + targetPct + '%"><span>target ' + fmtInt(t) + '</span></div>' +
        '<div class="funnel-bar actual" style="height:' + heightPct + '%"></div>' +
      '</div>' +
      '<div class="funnel-value ' + (met ? "good" : "bad") + '">' + fmtInt(v) + '</div>' +
      '<div class="funnel-label">' + s + '</div>' +
      (convText ? '<div class="funnel-conv">' + convText + '</div>' : "") +
    '</div>';
    if (i < stages.length - 1) html += '<div class="funnel-arrow">&rarr;</div>';
  });
  wrap.innerHTML = html;
}

let sortState = { key: "name", dir: 1 };

function computeAdvisorRows(entity) {
  const rows = filterRows({ entity, group: "Admissions", type: "Advisor" });
  const dates = uniqueSorted(rows.map((r) => r.date));
  const latest = latestDate(dates);
  const names = uniqueSorted(rows.filter((r) => r.date === latest).map((r) => r.name));
  return names.map((name) => {
    const rec = { name };
    Object.keys(PER_ADVISOR_TARGET).forEach((m) => {
      const found = rows.find((r) => r.date === latest && r.name === name && r.metric === m);
      rec[m] = found ? found.value : null;
    });
    rec.contactRate = safeDiv(rec.Contacts, rec.Handles);
    rec.cicRate = safeDiv(rec.ICs, rec.Contacts);
    rec.icecRate = safeDiv(rec.ECs, rec.ICs);
    rec.ecappRate = safeDiv(rec.Apps, rec.ECs);
    return rec;
  });
}

function renderAdvisorTable() {
  let rows = computeAdvisorRows(currentEntity);
  rows.sort((a, b) => {
    const va = a[sortState.key], vb = b[sortState.key];
    if (va === null) return 1;
    if (vb === null) return -1;
    if (typeof va === "string") return va.localeCompare(vb) * sortState.dir;
    return (va - vb) * sortState.dir;
  });
  const body = rows.map((r) => (
    "<tr>" +
      "<td>" + r.name + "</td>" +
      "<td>" + fmtInt(r.Handles) + "</td>" +
      "<td>" + fmtInt(r.Contacts) + "</td>" +
      "<td>" + fmtPct(r.contactRate) + "</td>" +
      "<td>" + fmtInt(r.ICs) + "</td>" +
      "<td>" + fmtPct(r.cicRate) + "</td>" +
      "<td>" + fmtInt(r.ECs) + "</td>" +
      "<td>" + fmtPct(r.icecRate) + "</td>" +
      "<td>" + fmtInt(r.Apps) + "</td>" +
      "<td>" + fmtPct(r.ecappRate) + "</td>" +
    "</tr>"
  )).join("");
  $("#advisorTableBody").innerHTML = body || ('<tr><td colspan="10" style="font-family:var(--body);color:var(--ink-soft);">No advisor data for ' + currentEntity + ' yet.</td></tr>');
}

/* ------------------------------- Data loading ------------------------------ */

function setStatus(text, isEmpty) {
  const el = $("#statusBar");
  el.textContent = text;
  el.classList.toggle("empty", !!isEmpty);
}

function showApp(hasData) {
  $("#app").classList.toggle("hidden", !hasData);
  $("#emptyState").classList.toggle("hidden", hasData);
}

function loadRecords(newRecords, sourceLabel) {
  records = newRecords;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); } catch (e) { /* storage full or unavailable */ }
  const dates = uniqueSorted(records.map((r) => r.date));
  const entities = uniqueSorted(records.map((r) => r.entity));
  setStatus("Loaded " + records.length.toLocaleString() + " rows from " + sourceLabel + " \u2022 " + dates.length + " weeks \u2022 entities: " + (entities.join(", ") || "\u2013"), false);
  showApp(records.length > 0);
  if (records.length) renderAll();
}

function handleFile(file) {
  const name = file.name.toLowerCase();
  const reader = new FileReader();
  if (name.endsWith(".csv")) {
    reader.onload = (e) => {
      const { rows, skipped } = parseCSVText(e.target.result);
      finishLoad(rows, skipped, file.name);
    };
    reader.readAsText(file);
  } else {
    reader.onload = (e) => {
      const { rows, skipped } = parseWorkbookArrayBuffer(e.target.result);
      finishLoad(rows, skipped, file.name);
    };
    reader.readAsArrayBuffer(file);
  }
}

function finishLoad(rows, skipped, sourceLabel) {
  if (!rows.length) {
    setStatus("Could not read any valid rows from " + sourceLabel + ". Check it matches the schema in the README (week_ending, entity, group, type, name, metric, value).", true);
    return;
  }
  loadRecords(rows, sourceLabel + (skipped ? " (" + skipped + " row" + (skipped === 1 ? "" : "s") + " skipped \u2014 missing/invalid fields)" : ""));
}

/* --------------------------------- Wiring ---------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  $$(".entity-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".entity-btn").forEach((b) => { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      currentEntity = btn.dataset.entity;
      if (records.length) renderAll();
    });
  });

  $("#fileInput").addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  });

  $("#sampleBtn").addEventListener("click", () => {
    const { rows, skipped } = parseCSVText(SAMPLE_CSV);
    finishLoad(rows, skipped, "sample dataset");
  });

  $("#clearBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    records = [];
    showApp(false);
    setStatus("No data loaded — upload a CRM export or load the sample dataset.", true);
  });

  $$("#advisorTable thead th").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.key;
      sortState = { key, dir: sortState.key === key ? -sortState.dir : 1 };
      if (records.length) renderAdvisorTable();
    });
  });

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) {
        records = parsed;
        setStatus("Restored " + records.length.toLocaleString() + " rows from your last session.", false);
        showApp(true);
        renderAll();
        return;
      }
    } catch (e) { /* ignore corrupt cache */ }
  }
  showApp(false);
});
