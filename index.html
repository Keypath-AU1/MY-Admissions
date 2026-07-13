/* ==========================================================================
   SUN / SIM Weekly Alignment Dashboard
   Fully client-side: parses the weekly CRM "Leads" export (CSV or Excel)
   directly. Nothing leaves the browser.

   Expected input: one row per lead/opportunity, with (at minimum) these
   columns — header names matched case-insensitively:
     Account, Program, Short Name (Program) (Program), Lead Channel,
     Created On, Contacted Date, Interview Completed Date,
     Evaluation Completed Date, File Completed Date

   This is the raw export as-is from the CRM — no reshaping needed before
   upload. Each upload is treated as a full refresh (replaces prior data),
   since the export is a rolling extract, not an incremental one.

   Weeks run Monday-Sunday. Every date column is bucketed into the week it
   actually falls in (week-ending Sunday), so a lead created in one week
   that reaches Interview Complete three weeks later shows up correctly in
   both weeks' figures.
   ========================================================================== */

const STORAGE_KEY = "wat_dashboard_records_v2";
const RATE_STAGES = [
  { key: "cicRate", label: "C \u2192 IC", num: "ICs", den: "Contacts" },
  { key: "icecRate", label: "IC \u2192 EC", num: "ECs", den: "ICs" },
  { key: "ecappRate", label: "EC \u2192 App", num: "Apps", den: "ECs" },
];
const FUNNEL_STAGES = ["Contacts", "ICs", "ECs", "Apps"];
const PALETTE = ["#203864", "#B23B2E", "#1F7A54", "#B7791F", "#5B2C6F", "#2E6B8F", "#8A5A2E", "#6B7280", "#0E7490", "#9333EA", "#CA8A04", "#15803D"];

let records = [];
let currentEntity = "SUN";
let charts = {};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* ---------------------------- Date / week helpers ---------------------------- */

function excelSerialToDate(n) {
  return new Date(Math.round((n - 25569) * 86400 * 1000));
}

function parseDateValue(v) {
  if (v instanceof Date) return v;
  if (typeof v === "number") return excelSerialToDate(v);
  if (typeof v === "string" && v.trim() !== "") {
    const d = new Date(v);
    if (!isNaN(d)) return d;
  }
  return null;
}

function toISODate(d) {
  const dt = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  return dt.toISOString().slice(0, 10);
}

// Monday-start ISO week -> returns the week-ending Sunday as an ISO date string.
function weekEndingSunday(d) {
  const dt = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = dt.getDay(); // 0 = Sun ... 6 = Sat
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(dt);
  monday.setDate(monday.getDate() + diffToMonday);
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);
  return toISODate(sunday);
}

/* ---------------------------- Entity mapping ---------------------------- */

function deriveEntity(account) {
  if (!account) return null;
  const a = String(account).toLowerCase();
  if (a.includes("sunway")) return "SUN";
  if (a.includes("singapore institute of management")) return "SIM";
  // Fallback: still works for any future partner account, just uses its own label.
  return String(account).trim();
}

/* ---------------------------- Schema detection & parsing ---------------------------- */

function normalizeKeys(row) {
  const out = {};
  Object.keys(row).forEach((k) => { out[k.trim().toLowerCase()] = row[k]; });
  return out;
}

function looksLikeCRMExport(sampleRow) {
  const keys = Object.keys(sampleRow).map((k) => k.trim().toLowerCase());
  return keys.includes("account") && keys.includes("created on") && keys.some((k) => k.includes("interview completed date"));
}

// Transforms raw CRM lead-level rows into the internal long-form records
// the rest of the app already knows how to aggregate:
//   { date (week-ending Sunday), entity, group, type, name, metric, value }
function transformCRMRows(rawRows) {
  const out = [];
  let skipped = 0;
  for (const row of rawRows) {
    const k = normalizeKeys(row);
    const entity = deriveEntity(k["account"]);
    if (!entity) { skipped++; continue; }

    const program = String(k["short name (program) (program)"] || k["program"] || "Unknown").trim() || "Unknown";
    const channel = String(k["lead channel"] || "Unknown").trim() || "Unknown";

    const createdOn = parseDateValue(k["created on"]);
    if (createdOn) {
      const we = weekEndingSunday(createdOn);
      out.push({ date: we, entity, group: "Marketing", type: "Program", name: program, metric: "Leads", value: 1 });
      out.push({ date: we, entity, group: "Marketing", type: "Channel", name: channel, metric: "Leads", value: 1 });
    }

    const contactedDate = parseDateValue(k["contacted date"]);
    if (contactedDate) out.push({ date: weekEndingSunday(contactedDate), entity, group: "Funnel", type: "Stage", name: "Contacts", metric: "Contacts", value: 1 });

    const icDate = parseDateValue(k["interview completed date"]);
    if (icDate) out.push({ date: weekEndingSunday(icDate), entity, group: "Funnel", type: "Stage", name: "ICs", metric: "ICs", value: 1 });

    const ecDate = parseDateValue(k["evaluation completed date"]);
    if (ecDate) out.push({ date: weekEndingSunday(ecDate), entity, group: "Funnel", type: "Stage", name: "ECs", metric: "ECs", value: 1 });

    const fileDate = parseDateValue(k["file completed date"]);
    if (fileDate) {
      const we = weekEndingSunday(fileDate);
      out.push({ date: we, entity, group: "Marketing", type: "Program", name: program, metric: "Applications", value: 1 });
      out.push({ date: we, entity, group: "Funnel", type: "Stage", name: "Apps", metric: "Apps", value: 1 });
    }
  }
  return { rows: out, skipped, totalInput: rawRows.length };
}

function parseCSVText(text) {
  const parsed = Papa.parse(text, { header: true, skipEmptyLines: true, dynamicTyping: false });
  const data = parsed.data;
  if (!data.length || !looksLikeCRMExport(data[0])) {
    return { rows: [], skipped: data.length, totalInput: data.length, schemaError: true };
  }
  return transformCRMRows(data);
}

function parseWorkbookArrayBuffer(buf) {
  const wb = XLSX.read(buf, { type: "array", cellDates: true });
  // Prefer a sheet that actually looks like the leads export, in case the
  // workbook has other tabs (e.g. the CRM's own hidden picklist sheet).
  let rows = [];
  for (const sheetName of wb.SheetNames) {
    const sheet = wb.Sheets[sheetName];
    const candidate = XLSX.utils.sheet_to_json(sheet, { defval: null });
    if (candidate.length && looksLikeCRMExport(candidate[0])) { rows = candidate; break; }
  }
  if (!rows.length) return { rows: [], skipped: 0, totalInput: 0, schemaError: true };
  return transformCRMRows(rows);
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

function funnelTotalsByDate(entity) {
  const dates = uniqueSorted(filterRows({ entity, group: "Funnel", type: "Stage" }).map((r) => r.date));
  const perMetric = {};
  FUNNEL_STAGES.forEach((m) => {
    const t = totalsByDate({ entity, group: "Funnel", type: "Stage", metric: m });
    perMetric[m] = dates.map((d) => (d in t.totals ? t.totals[d] : null));
  });
  return { dates, perMetric };
}

function safeDiv(a, b) {
  if (a === null || b === null || !b) return null;
  return a / b;
}
function latestDate(dates) { return dates.length ? dates[dates.length - 1] : null; }
function prevDate(dates) { return dates.length > 1 ? dates[dates.length - 2] : null; }

// Excludes the current, still-in-progress Mon-Sun week from "latest" figures,
// so a file uploaded mid-week (e.g. Monday evening) doesn't show a
// misleadingly low partial week as if it were a completed one.
function completeDates(dates) {
  const todayWeekEnding = weekEndingSunday(new Date());
  return dates.filter((d) => d < todayWeekEnding);
}

function allEntities() {
  return uniqueSorted(records.map((r) => r.entity));
}

/* ------------------------------- Rendering -------------------------------- */

function entityColor(entity) {
  if (entity === "SUN") return "#203864";
  if (entity === "SIM") return "#5B2C6F";
  const others = allEntities().filter((e) => e !== "SUN" && e !== "SIM");
  const idx = others.indexOf(entity);
  return PALETTE[(idx + 2) % PALETTE.length];
}

function fmtInt(n) { return n === null || n === undefined ? "\u2013" : Math.round(n).toLocaleString(); }
function fmtPct(n) { return n === null || n === undefined || isNaN(n) ? "\u2013" : (n * 100).toFixed(1) + "%"; }

function renderEntityToggle() {
  const entities = allEntities();
  if (!entities.length) return;
  if (!entities.includes(currentEntity)) currentEntity = entities.includes("SUN") ? "SUN" : entities[0];
  const wrap = $("#entityToggle");
  wrap.innerHTML = entities.map((e) =>
    '<button class="entity-btn' + (e === currentEntity ? " active" : "") + '" data-entity="' + e + '" role="tab" aria-selected="' + (e === currentEntity) + '">' + e + '</button>'
  ).join("");
  $$(".entity-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentEntity = btn.dataset.entity;
      renderEntityToggle();
      renderAll();
    });
  });
}

function renderAll() {
  document.querySelector(".topbar").dataset.entity = (currentEntity === "SIM") ? "SIM" : "SUN";
  renderKPIs();
  renderChannelChart();
  renderProgramChart();
  renderRatesChart();
  renderFunnel();
  renderProgramTable();
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
  const leads = totalsByDate({ entity: currentEntity, group: "Marketing", type: "Channel", metric: "Leads" });
  const apps = totalsByDate({ entity: currentEntity, group: "Marketing", type: "Program", metric: "Applications" });
  const funnel = funnelTotalsByDate(currentEntity);

  const leadDates = completeDates(leads.dates);
  const ld = latestDate(leadDates), pld = prevDate(leadDates);
  const leadsNow = ld ? leads.totals[ld] : null;
  const leadsPrev = pld ? leads.totals[pld] : null;

  const appDates = completeDates(apps.dates);
  const ad = latestDate(appDates), pad = prevDate(appDates);
  const appsNow = ad ? apps.totals[ad] : null;
  const appsPrev = pad ? apps.totals[pad] : null;

  const funnelDates = completeDates(funnel.dates);
  const fi = funnel.dates.indexOf(latestDate(funnelDates));
  const pfi = funnel.dates.indexOf(prevDate(funnelDates));
  const icecNow = fi >= 0 ? safeDiv(funnel.perMetric.ECs[fi], funnel.perMetric.ICs[fi]) : null;
  const icecPrev = pfi >= 0 ? safeDiv(funnel.perMetric.ECs[pfi], funnel.perMetric.ICs[pfi]) : null;

  const leadToApp = safeDiv(appsNow, leadsNow);

  const cards = [
    { label: "Leads (last full week)", value: fmtInt(leadsNow), delta: deltaBadge(leadsNow, leadsPrev, true), watch: false },
    { label: "Applications (last full week)", value: fmtInt(appsNow), delta: deltaBadge(appsNow, appsPrev, true), watch: false },
    { label: "Lead-to-Application Rate", value: fmtPct(leadToApp), delta: { text: "", cls: "" }, watch: false },
    { label: "IC \u2192 EC Rate", value: fmtPct(icecNow), delta: deltaBadge(icecNow, icecPrev, true), watch: true },
  ];

  $("#kpiRow").innerHTML = cards.map((c) => {
    const sub = c.delta.text ? '<div class="sub ' + c.delta.cls + '">' + c.delta.text + '</div>' : '<div class="sub">&nbsp;</div>';
    return '<div class="kpi-card ' + (c.watch ? "watch" : "") + '"><div class="label">' + c.label + '</div><div class="value">' + c.value + '</div>' + sub + '</div>';
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

function destroyChart(key) { if (charts[key]) { charts[key].destroy(); delete charts[key]; } }

function renderChannelChart() {
  const { dates, names, map } = seriesByName({ entity: currentEntity, group: "Marketing", type: "Channel", metric: "Leads" });
  destroyChart("channel");
  const ctx = $("#chartChannel").getContext("2d");
  charts.channel = new Chart(ctx, {
    type: "line",
    data: { labels: dates, datasets: names.map((n, i) => ({ label: n, data: map[n], borderColor: PALETTE[i % PALETTE.length], backgroundColor: PALETTE[i % PALETTE.length], tension: 0.3, pointRadius: 2, borderWidth: 2 })) },
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
    options: { ...opts, scales: { ...opts.scales, y1: { position: "right", title: { display: true, text: "Applications", font: { size: 11 } }, grid: { display: false }, ticks: { font: { size: 10 } } } } },
  });
}

function renderRatesChart() {
  const f = funnelTotalsByDate(currentEntity);
  const seriesData = RATE_STAGES.map((s) => f.dates.map((_, i) => safeDiv(f.perMetric[s.num][i], f.perMetric[s.den][i])));
  destroyChart("rates");
  const ctx = $("#chartRates").getContext("2d");
  charts.rates = new Chart(ctx, {
    type: "line",
    data: { labels: f.dates, datasets: RATE_STAGES.map((s, i) => ({ label: s.label, data: seriesData[i], borderColor: PALETTE[i % PALETTE.length], backgroundColor: PALETTE[i % PALETTE.length], tension: 0.3, pointRadius: 2, borderWidth: 2 })) },
    options: baseLineOptions("Rate", true),
  });
}

function renderFunnel() {
  const f = funnelTotalsByDate(currentEntity);
  const completeD = completeDates(f.dates);
  const lastComplete = latestDate(completeD);
  const idx = f.dates.indexOf(lastComplete);
  const wrap = $("#funnelViz");
  const weekLabel = $("#funnelWeekLabel");
  if (idx < 0) { wrap.innerHTML = ""; weekLabel.textContent = "No completed week of funnel data for this entity yet."; return; }

  const date = f.dates[idx];
  weekLabel.textContent = "Week ending " + date + " (last completed week)";

  const values = FUNNEL_STAGES.map((s) => f.perMetric[s][idx]);
  const maxVal = Math.max.apply(null, values.map((v) => v || 0).concat([1]));

  let html = "";
  FUNNEL_STAGES.forEach((s, i) => {
    const v = values[i];
    const heightPct = Math.max(((v || 0) / maxVal) * 100, v ? 4 : 0);
    const convText = i > 0 && values[i - 1] ? ((v / values[i - 1]) * 100).toFixed(1) + "% of " + FUNNEL_STAGES[i - 1] : "";
    html += '<div class="funnel-stage"><div class="funnel-bar-track"><div class="funnel-bar actual" style="height:' + heightPct + '%"></div></div>' +
      '<div class="funnel-value">' + fmtInt(v) + '</div>' +
      '<div class="funnel-label">' + s + '</div>' +
      (convText ? '<div class="funnel-conv">' + convText + '</div>' : "") +
      '</div>';
    if (i < FUNNEL_STAGES.length - 1) html += '<div class="funnel-arrow">&rarr;</div>';
  });
  wrap.innerHTML = html;
}

let sortState = { key: "name", dir: 1 };

function computeProgramRows(entity) {
  const leads = filterRows({ entity, group: "Marketing", type: "Program", metric: "Leads" });
  const apps = filterRows({ entity, group: "Marketing", type: "Program", metric: "Applications" });
  const dates = uniqueSorted(leads.map((r) => r.date));
  const latest = latestDate(completeDates(dates));
  const names = uniqueSorted(leads.filter((r) => r.date === latest).map((r) => r.name)
    .concat(apps.filter((r) => r.date === latest).map((r) => r.name)));
  return names.map((name) => {
    const leadsVal = leads.filter((r) => r.date === latest && r.name === name).reduce((s, r) => s + r.value, 0);
    const appsVal = apps.filter((r) => r.date === latest && r.name === name).reduce((s, r) => s + r.value, 0);
    return { name, Leads: leadsVal, Applications: appsVal, rate: safeDiv(appsVal, leadsVal) };
  });
}

function renderProgramTable() {
  let rows = computeProgramRows(currentEntity);
  rows.sort((a, b) => {
    const va = a[sortState.key], vb = b[sortState.key];
    if (va === null || va === undefined) return 1;
    if (vb === null || vb === undefined) return -1;
    if (typeof va === "string") return va.localeCompare(vb) * sortState.dir;
    return (va - vb) * sortState.dir;
  });
  const body = rows.map((r) => (
    "<tr><td>" + r.name + "</td><td>" + fmtInt(r.Leads) + "</td><td>" + fmtInt(r.Applications) + "</td><td>" + fmtPct(r.rate) + "</td></tr>"
  )).join("");
  $("#programTableBody").innerHTML = body || ('<tr><td colspan="4" style="font-family:var(--body);color:var(--ink-soft);">No program data for ' + currentEntity + ' yet.</td></tr>');
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
  const entities = allEntities();
  setStatus("Loaded " + records.length.toLocaleString() + " data points from " + sourceLabel + " \u2022 " + dates.length + " weeks \u2022 entities: " + (entities.join(", ") || "\u2013"), false);
  showApp(records.length > 0);
  if (records.length) { renderEntityToggle(); renderAll(); }
}

function handleFile(file) {
  const name = file.name.toLowerCase();
  const reader = new FileReader();
  if (name.endsWith(".csv")) {
    reader.onload = (e) => { finishLoad(parseCSVText(e.target.result), file.name); };
    reader.readAsText(file);
  } else {
    reader.onload = (e) => { finishLoad(parseWorkbookArrayBuffer(e.target.result), file.name); };
    reader.readAsArrayBuffer(file);
  }
}

function finishLoad(result, sourceLabel) {
  if (result.schemaError) {
    setStatus("Couldn't find the expected CRM columns (Account, Created On, Interview Completed Date, etc.) in " + sourceLabel + ". Check it's the raw weekly export, not a reshaped copy.", true);
    return;
  }
  if (!result.rows.length) {
    setStatus("No usable rows found in " + sourceLabel + " (" + result.totalInput + " rows read, " + result.skipped + " skipped - likely missing Account values).", true);
    return;
  }
  const note = result.skipped ? " (" + result.skipped + " of " + result.totalInput + " source rows skipped - missing Account)" : "";
  loadRecords(result.rows, sourceLabel + note + " \u2014 " + result.totalInput + " leads processed");
}

/* --------------------------------- Wiring ---------------------------------- */

function initDashboard() {
  $("#fileInput").addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  });

  $("#sampleBtn").addEventListener("click", () => {
    finishLoad(parseCSVText(SAMPLE_CSV), "sample dataset");
  });

  $("#clearBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    records = [];
    showApp(false);
    setStatus("No data loaded - upload the weekly CRM export or load the sample dataset.", true);
  });

  $$("#programTable thead th").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.key;
      sortState = { key, dir: sortState.key === key ? -sortState.dir : 1 };
      if (records.length) renderProgramTable();
    });
  });

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) {
        records = parsed;
        setStatus("Restored " + records.length.toLocaleString() + " data points from your last session.", false);
        showApp(true);
        renderEntityToggle();
        renderAll();
        return;
      }
    } catch (e) { /* ignore corrupt cache */ }
  }
  showApp(false);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDashboard);
} else {
  initDashboard();
}
