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
// Parses the CRM's own Planned Term format, e.g. "2026 T4 - 6/7/2026 - 21/8/2026",
// into a prefix ("2026 T4") and a start/end date pair (DD/MM/YYYY, as used by this CRM).
function parsePlannedTerm(raw) {
  if (!raw) return null;
  const parts = String(raw).split(" - ").map((s) => s.trim());
  if (parts.length < 3) return null;
  const parseDMY = (s) => {
    const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!m) return null;
    return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  };
  const start = parseDMY(parts[1]);
  const end = parseDMY(parts[2]);
  if (!start || !end) return null;
  return { prefix: parts[0], start, end };
}

// termWindows[entity|prefix] = { start: earliest seen, end: latest seen } --
// a term can have more than one date-range variant in the CRM's history, so
// this widens to cover the union rather than trusting a single row.
let termWindows = {};

// leadRecords: one entry per raw CRM row (not expanded like `records`), used for anything that
// needs to reason about a single lead's full stage-date history at once -- backlog-by-stage,
// turnaround times between stages, and open-lead counts all need this, since the aggregate
// `records` array only stores individual stage *events*, not which events belong to the same lead.
let leadRecords = [];

// This CRM's Status Reason uses numbered progression codes ("01 - New" ... "08 - File Complete",
// "10 - Registered") for leads still moving through the funnel, and plain-text reasons
// ("Not Interested", "Does Not Meet Adm. Req.", etc.) once a lead is lost. Adjust here if your
// CRM's own taxonomy differs.
function isLostStatus(status) {
  if (!status) return false;
  return !/^\d/.test(String(status).trim());
}
function isCompletedStatus(status) {
  if (!status) return false;
  return /^(08|10)\b/.test(String(status).trim());
}
function isOpenStatus(status) {
  return !isLostStatus(status) && !isCompletedStatus(status);
}

function transformCRMRows(rawRows) {
  const out = [];
  const leadsOut = [];
  let skipped = 0;
  termWindows = {};
  for (const row of rawRows) {
    const k = normalizeKeys(row);
    const entity = deriveEntity(k["account"]);
    if (!entity) { skipped++; continue; }

    const program = String(k["short name (program) (program)"] || k["program"] || "Unknown").trim() || "Unknown";
    const channel = String(k["lead channel"] || "Unknown").trim() || "Unknown";
    const advisor = String(k["enrollment advisor"] || "").trim();
    const statusReason = String(k["status reason"] || "").trim();
    const plannedTermRaw = String(k["planned term"] || "").trim();
    const parsedTerm = plannedTermRaw ? parsePlannedTerm(plannedTermRaw) : null;
    if (parsedTerm) {
      const twKey = entity + "|" + parsedTerm.prefix;
      const existing = termWindows[twKey];
      if (!existing) {
        termWindows[twKey] = { start: parsedTerm.start, end: parsedTerm.end };
      } else {
        if (parsedTerm.start < existing.start) existing.start = parsedTerm.start;
        if (parsedTerm.end > existing.end) existing.end = parsedTerm.end;
      }
    }

    const stageDates = {
      Leads: parseDateValue(k["created on"]),
      Contacts: parseDateValue(k["contacted date"]),
      ICs: parseDateValue(k["interview completed date"]),
      ECs: parseDateValue(k["evaluation completed date"]),
      Apps: parseDateValue(k["file completed date"]),
    };

    leadsOut.push({
      entity, program, channel, advisor, status: statusReason,
      term: parsedTerm ? parsedTerm.prefix : null,
      created: stageDates.Leads, contacted: stageDates.Contacts,
      ic: stageDates.ICs, ec: stageDates.ECs, app: stageDates.Apps,
    });

    if (stageDates.Leads) {
      const we = weekEndingSunday(stageDates.Leads);
      out.push({ date: we, entity, group: "Marketing", type: "Program", name: program, metric: "Leads", value: 1 });
      out.push({ date: we, entity, group: "Marketing", type: "Channel", name: channel, metric: "Leads", value: 1 });
    }
    if (stageDates.Contacts) out.push({ date: weekEndingSunday(stageDates.Contacts), entity, group: "Funnel", type: "Stage", name: "Contacts", metric: "Contacts", value: 1 });
    if (stageDates.ICs) out.push({ date: weekEndingSunday(stageDates.ICs), entity, group: "Funnel", type: "Stage", name: "ICs", metric: "ICs", value: 1 });
    if (stageDates.ECs) out.push({ date: weekEndingSunday(stageDates.ECs), entity, group: "Funnel", type: "Stage", name: "ECs", metric: "ECs", value: 1 });
    if (stageDates.Apps) {
      const we = weekEndingSunday(stageDates.Apps);
      out.push({ date: we, entity, group: "Marketing", type: "Program", name: program, metric: "Applications", value: 1 });
      out.push({ date: we, entity, group: "Funnel", type: "Stage", name: "Apps", metric: "Apps", value: 1 });
    }

    // Per-advisor breakdown (only if the CRM export has this row tagged with an advisor).
    if (advisor) {
      ["Contacts", "ICs", "ECs", "Apps"].forEach((stage) => {
        if (stageDates[stage]) {
          out.push({ date: weekEndingSunday(stageDates[stage]), entity, group: "Admissions", type: "Advisor", name: advisor, metric: stage, value: 1 });
        }
      });
    }

    // Per-term cumulative tracking (only if the CRM export has Planned Term populated).
    if (parsedTerm) {
      ["Leads", "Contacts", "ICs", "ECs", "Apps"].forEach((stage) => {
        if (stageDates[stage]) {
          out.push({ date: weekEndingSunday(stageDates[stage]), entity, group: "Term", type: "Stage", name: parsedTerm.prefix, metric: stage, value: 1 });
        }
      });
    }
  }
  leadRecords = leadsOut;
  return { rows: out, skipped, totalInput: rawRows.length, termWindows, leadRecords: leadsOut };
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
  const sections = [
    ["Check-in box", updateCheckinBox],
    ["Executive Scorecard", renderExecScorecard],
    ["KPI row", renderKPIs],
    ["Channel chart", renderChannelChart],
    ["Donut & channel table", renderDonutAndChannelTable],
    ["Program chart", renderProgramChart],
    ["Rates chart", renderRatesChart],
    ["Funnel", renderFunnel],
    ["Program table", renderProgramTable],
    ["Term Targets", renderTermTargets],
    ["Advisor table", renderAdvisorTable],
    ["Operations", renderOperations],
    ["Actions log", renderActionsLog],
    ["Traffic light", renderTrafficLight],
  ];
  sections.forEach(([label, fn]) => {
    try {
      fn();
    } catch (e) {
      // One section failing (e.g. a missing element from a stale/mismatched HTML+JS pair)
      // should never blank out every other section -- log it and keep going.
      console.error("Dashboard section failed to render: " + label, e);
    }
  });
}

function updateCheckinBox() {
  const leads = totalsByDate({ entity: currentEntity, group: "Marketing", type: "Channel", metric: "Leads" });
  const latest = latestDate(completeDates(leads.dates));
  const line1 = $("#latestCheckinLine");
  const line2 = $("#latestCheckinSub");
  if (line1 && line2) {
    if (latest) {
      line1.textContent = "Latest check-in: week ending " + latest;
      line2.textContent = currentEntity + " \u2022 figures as of most recent complete week";
    } else {
      line1.textContent = "Latest check-in: no complete week yet";
      line2.textContent = currentEntity + " \u2022 waiting on data";
    }
  }
  const marketingLabel = $("#marketingWeekLabel");
  if (marketingLabel) marketingLabel.textContent = latest ? "Week ending " + latest : "\u2013";
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

function renderDonutAndChannelTable() {
  const rows = filterRows({ entity: currentEntity, group: "Marketing", type: "Channel", metric: "Leads" });
  const dates = uniqueSorted(rows.map((r) => r.date));
  const latest = latestDate(completeDates(dates));
  const names = uniqueSorted(rows.filter((r) => r.date === latest).map((r) => r.name));
  const values = names.map((n) => rows.filter((r) => r.date === latest && r.name === n).reduce((s, r) => s + r.value, 0));
  const total = values.reduce((a, b) => a + b, 0);

  destroyChart("donut");
  const ctx = $("#chartDonut").getContext("2d");
  charts.donut = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: names,
      datasets: [{ data: values, backgroundColor: names.map((_, i) => PALETTE[i % PALETTE.length]), borderWidth: 2, borderColor: "#fff" }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "62%",
      plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 11 } } } },
    },
  });

  const body = names.map((n, i) => {
    const v = values[i];
    const share = total ? (v / total) * 100 : 0;
    return "<tr><td>" + n + "</td><td>" + fmtInt(v) + "</td><td>" + share.toFixed(1) + "%</td></tr>";
  }).join("");
  $("#channelTableBody").innerHTML = body || ('<tr><td colspan="3" style="font-family:var(--body-font);color:var(--ink-soft);">No channel data for ' + currentEntity + ' yet.</td></tr>');
}

function ragStatus(curr, prev, target) {
  // Red: missed target AND declining. Amber: missed target OR declining (not both). Green: otherwise.
  if (curr === null) return "amber";
  const missed = target !== null && curr < target;
  const declining = prev !== null && curr < prev;
  if (missed && declining) return "red";
  if (missed || declining) return "amber";
  return "green";
}

const TERM_ASSUMPTIONS_KEY = "wat_term_assumptions_v1";
function getTermAssumptions() {
  try {
    const saved = localStorage.getItem(TERM_ASSUMPTIONS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) { /* ignore */ }
  return {};
}
function setTermAssumption(termKey, field, value) {
  const all = getTermAssumptions();
  all[termKey] = all[termKey] || {};
  all[termKey][field] = value;
  try { localStorage.setItem(TERM_ASSUMPTIONS_KEY, JSON.stringify(all)); } catch (e) { /* ignore */ }
}

function weeksRemaining(end) {
  const ms = end.getTime() - Date.now();
  return Math.max(Math.ceil(ms / (7 * 24 * 3600 * 1000)), 1);
}

function cumulativeTermStage(entity, prefix, metric) {
  return filterRows({ entity, group: "Term", type: "Stage", name: prefix, metric }).reduce((s, r) => s + r.value, 0);
}

function renderTermTargets() {
  const wrap = $("#termTargetsRow");
  if (!wrap) return;
  const keys = Object.keys(termWindows).filter((k) => k.startsWith(currentEntity + "|"));
  if (!keys.length) {
    wrap.innerHTML = '<p style="color:var(--ink-soft);font-size:13px;">No Planned Term data found for ' + currentEntity + ' \u2014 this needs the CRM\'s Planned Term column populated to work.</p>';
    return;
  }
  const assumptions = getTermAssumptions();
  const items = keys.map((k) => {
    const prefix = k.split("|")[1];
    const win = termWindows[k];
    const leads = cumulativeTermStage(currentEntity, prefix, "Leads");
    const ics = cumulativeTermStage(currentEntity, prefix, "ICs");
    const ecs = cumulativeTermStage(currentEntity, prefix, "ECs");
    const apps = cumulativeTermStage(currentEntity, prefix, "Apps");
    return { key: k, prefix, win, leads, ics, ecs, apps };
  }).sort((a, b) => a.win.end - b.win.end);

  wrap.innerHTML = items.map((it) => {
    const a = assumptions[it.key] || {};
    const startTarget = a.startTarget !== undefined ? a.startTarget : "";
    const convRate = a.convRate !== undefined ? a.convRate : 0.8;
    const wr = weeksRemaining(it.win.end);
    let appsNeeded = null, remaining = null, perWeek = null;
    if (startTarget !== "" && !isNaN(startTarget) && Number(startTarget) > 0) {
      appsNeeded = Math.ceil(Number(startTarget) / convRate);
      remaining = Math.max(appsNeeded - it.apps, 0);
      perWeek = Math.ceil(remaining / wr);
    }
    const isCurrent = it.win.start <= new Date() && new Date() <= it.win.end;
    return (
      '<div class="term-card' + (isCurrent ? " current" : "") + '">' +
        '<div class="term-card-head"><span class="term-name">' + it.prefix + '</span>' + (isCurrent ? '<span class="status-pill" style="background:var(--good-tint);color:var(--good);">current</span>' : "") + "</div>" +
        '<div class="term-meta">Window ends ' + toISODate(it.win.end) + " &bull; " + wr + " wks remaining</div>" +
        '<div class="term-inputs">' +
          '<label>Start target<input type="number" min="0" class="term-input" data-term="' + it.key + '" data-field="startTarget" value="' + startTarget + '" placeholder="\u2013"></label>' +
          '<label>App\u2192Start rate<input type="number" min="0" max="1" step="0.01" class="term-input" data-term="' + it.key + '" data-field="convRate" value="' + convRate + '"></label>' +
        "</div>" +
        '<div class="term-stats">' +
          '<div><span class="term-stat-label">Apps needed</span><span class="term-stat-value">' + (appsNeeded === null ? "\u2013" : fmtInt(appsNeeded)) + "</span></div>" +
          '<div><span class="term-stat-label">Current apps</span><span class="term-stat-value">' + fmtInt(it.apps) + "</span></div>" +
          '<div><span class="term-stat-label">Remaining</span><span class="term-stat-value">' + (remaining === null ? "\u2013" : fmtInt(remaining)) + "</span></div>" +
          '<div><span class="term-stat-label">Apps/wk needed</span><span class="term-stat-value">' + (perWeek === null ? "\u2013" : fmtInt(perWeek)) + "</span></div>" +
        "</div>" +
        '<div class="term-cumulative">Cumulative to date: ' + fmtInt(it.leads) + " leads &bull; " + fmtInt(it.ics) + " ICs &bull; " + fmtInt(it.ecs) + " ECs &bull; " + fmtInt(it.apps) + " apps</div>" +
      "</div>"
    );
  }).join("");

  $$(".term-input").forEach((inp) => {
    inp.addEventListener("change", () => {
      const val = inp.dataset.field === "startTarget" ? (inp.value === "" ? "" : Number(inp.value)) : Number(inp.value);
      setTermAssumption(inp.dataset.term, inp.dataset.field, val);
      renderTermTargets();
    });
  });
}

let advisorSortState = { key: "name", dir: 1 };

function computeAdvisorRows(entity) {
  const rows = filterRows({ entity, group: "Admissions", type: "Advisor" });
  const dates = uniqueSorted(rows.map((r) => r.date));
  const latest = latestDate(completeDates(dates));
  const names = uniqueSorted(rows.filter((r) => r.date === latest).map((r) => r.name));
  return names.map((name) => {
    const val = (metric) => rows.filter((r) => r.date === latest && r.name === name && r.metric === metric).reduce((s, r) => s + r.value, 0);
    const contacts = val("Contacts"), ics = val("ICs"), ecs = val("ECs"), apps = val("Apps");
    return {
      name, Contacts: contacts, ICs: ics, ECs: ecs, Apps: apps,
      cicRate: safeDiv(ics, contacts), icecRate: safeDiv(ecs, ics), ecappRate: safeDiv(apps, ecs),
    };
  });
}

function renderAdvisorTable() {
  const tbody = $("#advisorTableBody");
  if (!tbody) return;
  let rows = computeAdvisorRows(currentEntity);
  rows.sort((a, b) => {
    const va = a[advisorSortState.key], vb = b[advisorSortState.key];
    if (va === null || va === undefined) return 1;
    if (vb === null || vb === undefined) return -1;
    if (typeof va === "string") return va.localeCompare(vb) * advisorSortState.dir;
    return (va - vb) * advisorSortState.dir;
  });
  const body = rows.map((r) => (
    "<tr><td>" + r.name + "</td><td>" + fmtInt(r.Contacts) + "</td><td>" + fmtInt(r.ICs) + "</td><td>" + fmtPct(r.cicRate) +
    "</td><td>" + fmtInt(r.ECs) + "</td><td>" + fmtPct(r.icecRate) + "</td><td>" + fmtInt(r.Apps) + "</td><td>" + fmtPct(r.ecappRate) + "</td></tr>"
  )).join("");
  tbody.innerHTML = body || ('<tr><td colspan="7" style="font-family:var(--body-font);color:var(--ink-soft);">No advisor data for ' + currentEntity + ' yet \u2014 this needs the CRM\'s Enrollment Advisor column populated.</td></tr>');
}

/* ==================== Executive Scorecard ==================== */

function getCurrentTermKey(entity) {
  const now = new Date();
  const keys = Object.keys(termWindows).filter((k) => k.startsWith(entity + "|"));
  if (!keys.length) return null;
  let current = keys.find((k) => termWindows[k].start <= now && now <= termWindows[k].end);
  if (!current) {
    const upcoming = keys.filter((k) => termWindows[k].end >= now).sort((a, b) => termWindows[a].end - termWindows[b].end);
    current = upcoming[0] || keys.sort((a, b) => termWindows[b].end - termWindows[a].end)[0];
  }
  return current;
}

function computeStartsForecast(entity) {
  const key = getCurrentTermKey(entity);
  if (!key) return null;
  const prefix = key.split("|")[1];
  const win = termWindows[key];
  const assumptions = getTermAssumptions()[key] || {};
  const startTarget = assumptions.startTarget !== undefined && assumptions.startTarget !== "" ? Number(assumptions.startTarget) : null;
  const convRate = assumptions.convRate !== undefined ? Number(assumptions.convRate) : 0.8;
  const currentApps = cumulativeTermStage(entity, prefix, "Apps");

  const appRows = filterRows({ entity, group: "Term", type: "Stage", name: prefix, metric: "Apps" });
  const weekTotals = {};
  appRows.forEach((r) => { weekTotals[r.date] = (weekTotals[r.date] || 0) + r.value; });
  const weekDates = completeDates(uniqueSorted(Object.keys(weekTotals)));
  const last4 = weekDates.slice(-4);
  const recentAvg = last4.length ? last4.reduce((s, d) => s + weekTotals[d], 0) / last4.length : 0;

  const wr = weeksRemaining(win.end);
  const projectedApps = currentApps + recentAvg * wr;
  const projectedStarts = Math.round(projectedApps * convRate);
  return { prefix, windowEnd: win.end, startTarget, currentApps, projectedApps: Math.round(projectedApps), projectedStarts, weeksRemaining: wr, recentAvgPerWeek: Math.round(recentAvg * 10) / 10 };
}

function computeOpenLeads(entity) {
  const openLeads = leadRecords.filter((r) => r.entity === entity && isOpenStatus(r.status) && !r.app);
  const byStage = { "Not Yet Contacted": 0, "Awaiting Interview": 0, "Awaiting Evaluation": 0, "Awaiting Application": 0 };
  openLeads.forEach((r) => {
    if (!r.contacted) byStage["Not Yet Contacted"]++;
    else if (!r.ic) byStage["Awaiting Interview"]++;
    else if (!r.ec) byStage["Awaiting Evaluation"]++;
    else byStage["Awaiting Application"]++;
  });
  return { total: openLeads.length, byStage };
}

function renderExecScorecard() {
  const wrap = $("#execScorecard");
  if (!wrap) return;
  const forecast = computeStartsForecast(currentEntity);
  const open = computeOpenLeads(currentEntity);

  let forecastHtml;
  if (!forecast) {
    forecastHtml = '<div class="scorecard-empty">No Planned Term data for ' + currentEntity + '.</div>';
  } else {
    const pct = forecast.startTarget ? Math.round((forecast.projectedStarts / forecast.startTarget) * 100) : null;
    const statusClass = pct === null ? "" : (pct >= 100 ? "good" : pct >= 85 ? "amber" : "bad");
    forecastHtml =
      '<div class="score-value">' + fmtInt(forecast.projectedStarts) + (forecast.startTarget ? ' <span class="score-of">/ ' + fmtInt(forecast.startTarget) + '</span>' : "") + '</div>' +
      '<div class="score-sub ' + statusClass + '">' + (pct === null ? "No target set" : pct + "% of target, projected") + '</div>' +
      '<div class="score-detail">' + forecast.prefix + " &bull; " + forecast.weeksRemaining + " wks left &bull; " + forecast.recentAvgPerWeek + " apps/wk recent pace</div>";
  }

  const appsToDateHtml = forecast
    ? '<div class="score-value">' + fmtInt(forecast.currentApps) + '</div><div class="score-sub">' + forecast.prefix + ' to date</div>'
    : '<div class="scorecard-empty">No Planned Term data for ' + currentEntity + '.</div>';

  const openHtml =
    '<div class="score-value">' + fmtInt(open.total) + '</div>' +
    '<div class="score-sub">still open across the funnel</div>' +
    '<div class="score-breakdown">' + Object.entries(open.byStage).map(([k, v]) => k + ": <b>" + v + "</b>").join(" &bull; ") + "</div>";

  wrap.innerHTML =
    '<div class="score-card"><div class="score-label">Current Term Starts Forecast</div>' + forecastHtml + '</div>' +
    '<div class="score-card"><div class="score-label">Current Term Applications to Date</div>' + appsToDateHtml + '</div>' +
    '<div class="score-card"><div class="score-label">Funnel Health \u2014 Leads Still Open</div>' + openHtml + '</div>';
}

/* ==================== Operations / Admissions ==================== */

function avgDaysBetween(entity, fromField, toField) {
  const diffs = leadRecords
    .filter((r) => r.entity === entity && r[fromField] && r[toField])
    .map((r) => (r[toField] - r[fromField]) / (1000 * 3600 * 24));
  if (!diffs.length) return null;
  return diffs.reduce((s, d) => s + d, 0) / diffs.length;
}

function renderOperations() {
  const backlogWrap = $("#backlogRow");
  const turnaroundWrap = $("#turnaroundRow");
  if (!backlogWrap || !turnaroundWrap) return;

  const open = computeOpenLeads(currentEntity);
  const maxCount = Math.max.apply(null, Object.values(open.byStage).concat([1]));
  backlogWrap.innerHTML = Object.entries(open.byStage).map(([stage, count]) => {
    const pct = (count / maxCount) * 100;
    return '<div class="backlog-row"><div class="backlog-label">' + stage + '</div>' +
      '<div class="backlog-track"><div class="backlog-fill" style="width:' + pct + '%"></div></div>' +
      '<div class="backlog-count">' + fmtInt(count) + '</div></div>';
  }).join("");

  const stages = [
    { label: "Contact \u2192 Interview", from: "contacted", to: "ic" },
    { label: "Interview \u2192 Evaluation", from: "ic", to: "ec" },
    { label: "Evaluation \u2192 Application", from: "ec", to: "app" },
  ];
  turnaroundWrap.innerHTML = stages.map((s) => {
    const avg = avgDaysBetween(currentEntity, s.from, s.to);
    return '<div class="kpi-card"><div class="label">' + s.label + '</div><div class="value">' + (avg === null ? "\u2013" : avg.toFixed(1) + " d") + '</div><div class="sub">average turnaround</div></div>';
  }).join("");
}

/* ==================== Free-text notes (persisted) ==================== */

function setupNote(elId) {
  const el = $(elId);
  if (!el) return;
  const key = "wat_note_" + elId.replace("#", "");
  try {
    const saved = localStorage.getItem(key);
    if (saved) el.value = saved;
  } catch (e) { /* ignore */ }
  el.addEventListener("input", () => {
    try { localStorage.setItem(key, el.value); } catch (e) { /* storage full or unavailable */ }
  });
}

/* ==================== Risks, Decisions & Actions log ==================== */

const ACTIONS_KEY = "wat_actions_log_v1";
function getActionsLog() {
  try {
    const saved = localStorage.getItem(ACTIONS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) { /* ignore */ }
  return [];
}
function setActionsLog(list) {
  try { localStorage.setItem(ACTIONS_KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
}

function renderActionsLog() {
  const tbody = $("#actionsTableBody");
  if (!tbody) return;
  const log = getActionsLog();
  tbody.innerHTML = log.map((item, i) => (
    '<tr>' +
      '<td><input class="action-input" data-i="' + i + '" data-f="item" value="' + (item.item || "").replace(/"/g, "&quot;") + '" placeholder="Issue / decision / action"></td>' +
      '<td><select class="action-input" data-i="' + i + '" data-f="type">' +
        ["Risk", "Decision", "Action"].map((t) => '<option' + (item.type === t ? " selected" : "") + '>' + t + '</option>').join("") +
      '</select></td>' +
      '<td><input class="action-input" data-i="' + i + '" data-f="owner" value="' + (item.owner || "").replace(/"/g, "&quot;") + '" placeholder="Owner"></td>' +
      '<td><input class="action-input" data-i="' + i + '" data-f="deadline" type="date" value="' + (item.deadline || "") + '"></td>' +
      '<td><select class="action-input" data-i="' + i + '" data-f="status">' +
        ["Open", "In Progress", "Done"].map((s) => '<option' + (item.status === s ? " selected" : "") + '>' + s + '</option>').join("") +
      '</select></td>' +
      '<td><button class="action-remove" data-i="' + i + '" title="Remove">&times;</button></td>' +
    '</tr>'
  )).join("") || '<tr><td colspan="6" style="color:var(--ink-soft);">No items yet \u2014 click "Add row" below.</td></tr>';

  $$(".action-input").forEach((inp) => {
    const evt = inp.tagName === "SELECT" || inp.type === "date" ? "change" : "input";
    inp.addEventListener(evt, () => {
      const list = getActionsLog();
      const i = Number(inp.dataset.i);
      list[i][inp.dataset.f] = inp.value;
      setActionsLog(list);
    });
  });
  $$(".action-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const list = getActionsLog();
      list.splice(Number(btn.dataset.i), 1);
      setActionsLog(list);
      renderActionsLog();
    });
  });
}

function renderTrafficLight() {
  const leads = totalsByDate({ entity: currentEntity, group: "Marketing", type: "Channel", metric: "Leads" });
  const leadDates = completeDates(leads.dates);
  const leadsNow = latestDate(leadDates) ? leads.totals[latestDate(leadDates)] : null;
  const leadsPrev = prevDate(leadDates) ? leads.totals[prevDate(leadDates)] : null;
  const marketingStatus = ragStatus(leadsNow, leadsPrev, null);
  const marketingText = leadsNow === null
    ? "No complete week of leads data yet."
    : (leadsPrev === null
        ? fmtInt(leadsNow) + " leads in the latest complete week (no prior week to compare)."
        : fmtInt(leadsNow) + " leads this week vs " + fmtInt(leadsPrev) + " last week ("
          + (leadsNow >= leadsPrev ? "up" : "down") + " " + Math.abs(((leadsNow - leadsPrev) / (leadsPrev || 1)) * 100).toFixed(1) + "%).");

  const funnel = funnelTotalsByDate(currentEntity);
  const fDates = completeDates(funnel.dates);
  const fi = funnel.dates.indexOf(latestDate(fDates));
  const pfi = funnel.dates.indexOf(prevDate(fDates));
  const icecNow = fi >= 0 ? safeDiv(funnel.perMetric.ECs[fi], funnel.perMetric.ICs[fi]) : null;
  const icecPrev = pfi >= 0 ? safeDiv(funnel.perMetric.ECs[pfi], funnel.perMetric.ICs[pfi]) : null;
  const admissionsStatus = ragStatus(icecNow, icecPrev, null);
  const admissionsText = icecNow === null
    ? "No complete week of funnel data yet."
    : "IC \u2192 EC rate is " + fmtPct(icecNow) + (icecPrev !== null ? " vs " + fmtPct(icecPrev) + " last week." : " (no prior week to compare).");

  const cards = [
    { title: "Marketing", status: marketingStatus, text: marketingText },
    { title: "Admissions", status: admissionsStatus, text: admissionsText },
  ];

  $("#ragRow").innerHTML = cards.map((c) => (
    '<div class="rag-card ' + c.status + '">' +
      '<div class="head"><h4><span class="dot"></span>' + c.title + '</h4><span class="status-pill">' + c.status + '</span></div>' +
      "<p>" + c.text + "</p>" +
    "</div>"
  )).join("");
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
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    localStorage.setItem(STORAGE_KEY + "_termWindows", JSON.stringify(termWindows));
    localStorage.setItem(STORAGE_KEY + "_leadRecords", JSON.stringify(leadRecords));
  } catch (e) {
    // leadRecords can be large (one entry per raw CRM row) -- if storage is full, drop it from
    // persistence rather than failing the whole load. It'll just need re-deriving next session.
    try { localStorage.removeItem(STORAGE_KEY + "_leadRecords"); } catch (e2) { /* ignore */ }
  }
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

function setupTabNav() {
  const links = $$(".tab-link");
  if (!links.length) return;
  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
  const sections = links.map((l) => document.querySelector(l.getAttribute("href"))).filter(Boolean);
  if (!("IntersectionObserver" in window) || !sections.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = "#" + entry.target.id;
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === id));
      }
    });
  }, { rootMargin: "-100px 0px -70% 0px", threshold: 0 });
  sections.forEach((s) => observer.observe(s));
}

function setupFocusNote() {
  const NOTE_KEY = "wat_focus_note_v1";
  const el = $("#focusNote");
  if (!el) return;
  try {
    const saved = localStorage.getItem(NOTE_KEY);
    if (saved) el.value = saved;
  } catch (e) { /* ignore */ }
  el.addEventListener("input", () => {
    try { localStorage.setItem(NOTE_KEY, el.value); } catch (e) { /* storage full or unavailable */ }
  });
}

function initDashboard() {
  setupTabNav();
  ["#marketingIntelNote", "#marketingFocusNote", "#salesCoachingNote", "#salesFocusNote", "#opsNote"].forEach(setupNote);
  renderActionsLog();

  $("#addActionRow").addEventListener("click", () => {
    const list = getActionsLog();
    list.push({ item: "", type: "Risk", owner: "", deadline: "", status: "Open" });
    setActionsLog(list);
    renderActionsLog();
  });

  $("#fileInput").addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  });

  $("#sampleBtn").addEventListener("click", () => {
    finishLoad(parseCSVText(SAMPLE_CSV), "sample dataset");
  });

  $("#clearBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY + "_termWindows");
    localStorage.removeItem(STORAGE_KEY + "_leadRecords");
    records = [];
    termWindows = {};
    leadRecords = [];
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

  $$("#advisorTable thead th").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.key;
      advisorSortState = { key, dir: advisorSortState.key === key ? -advisorSortState.dir : 1 };
      if (records.length) renderAdvisorTable();
    });
  });

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) {
        records = parsed;
        try {
          const savedTW = localStorage.getItem(STORAGE_KEY + "_termWindows");
          if (savedTW) {
            const rawTW = JSON.parse(savedTW);
            termWindows = {};
            Object.keys(rawTW).forEach((k) => {
              termWindows[k] = { start: new Date(rawTW[k].start), end: new Date(rawTW[k].end) };
            });
          }
        } catch (e2) { /* ignore corrupt term-window cache */ }
        try {
          const savedLR = localStorage.getItem(STORAGE_KEY + "_leadRecords");
          if (savedLR) {
            const rawLR = JSON.parse(savedLR);
            const dateFields = ["created", "contacted", "ic", "ec", "app"];
            leadRecords = rawLR.map((r) => {
              const rec = Object.assign({}, r);
              dateFields.forEach((f) => { rec[f] = rec[f] ? new Date(rec[f]) : null; });
              return rec;
            });
          }
        } catch (e3) { /* ignore corrupt lead-record cache */ }
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
