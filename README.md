# SUN / SIM Weekly Alignment Dashboard

A static, client-side dashboard structured around the actual Monday meeting
agenda — Executive Scorecard, Marketing Update, Sales Update,
Operations/Admissions, and Risks/Decisions/Actions — rather than a generic
chart dump. Open `alignmentdashboard.html` in a browser, or host the folder
on GitHub Pages. All parsing and calculation happens in the visitor's
browser; nothing is ever uploaded anywhere.

## Structure (matches the meeting agenda)

- **Executive Scorecard** (5 min) — three figures at a glance for the
  current recruitment term: **Starts Forecast** (projected total starts by
  term close, based on applications to date plus the recent weekly pace,
  compared against your Start Target), **Applications to Date**, and
  **Funnel Health** (how many leads are still open — not yet lost, not yet
  converted — broken down by which stage they're waiting at).
- **1. Marketing Update** (10 min) — lead volume KPIs, the weekly leads
  trend by channel, a channel-mix donut + table, and two free-text boxes
  (Market Intelligence & Risks, Weekly Focus).
- **2. Sales Update** (15 min) — the advisor productivity/conversion table,
  pipeline movement funnel, conversion rates over time, and two free-text
  boxes (Coaching Insights, Weekly Focus).
- **3. Operations/Admissions** (10 min) — **Backlog by Stage** (how many
  open leads are waiting at each point in the funnel — not yet contacted,
  awaiting interview, awaiting evaluation, awaiting application) and
  **Average Turnaround Time** between each stage transition, both computed
  directly from the CRM's own stage dates. Plus a free-text notes box.
- **4. Risks, Decisions & Actions** (10-15 min) — a structured, editable
  log (Item, Type, Owner, Deadline, Status) rather than a plain text box,
  so owners and deadlines are actually tracked, not just written down.
- **Reference Detail** — Program Detail, Term Targets cards, and Traffic
  Light status, kept as supporting detail below the main agenda flow for
  anyone who wants to dig deeper, not part of the standing agenda itself.

## New computations behind the Executive Scorecard and Operations sections

These read directly off columns already in the CRM export — **Status
Reason** (to know if a lead is still active, lost, or completed) and the
existing stage dates — no extra upload needed:

- **Starts Forecast**: takes applications-to-date for the current term,
  adds a projection (recent weeks' average apps/week &times; weeks
  remaining until the term's close, parsed straight out of the CRM's own
  Planned Term text), and applies your App&rarr;Start conversion rate.
- **Leads Still Open**: any lead whose Status Reason isn't a loss reason
  and hasn't yet reached File Complete. This CRM's Status Reason uses
  numbered codes ("01 - New" ... "08 - File Complete") for leads still
  moving through the funnel, and plain-text reasons ("Not Interested",
  etc.) once lost — adjust the `isLostStatus` / `isCompletedStatus`
  functions in `app.js` if your CRM's taxonomy differs.
- **Backlog by Stage** and **Turnaround Time**: computed per-lead (pairing
  each lead's own Contacted/Interview/Evaluation/Application dates), not
  just aggregate counts — so these numbers reflect real bottlenecks, not
  independent weekly totals.

## What's new in this version

- **Restyled header** — navy gradient banner with a gold eyebrow label,
  a "latest check-in" box, and the SUN/SIM entity toggle.
- **Sticky tab navigation** — Snapshot, Leads Trend, Lead Source Mix,
  Programs & Applications, Funnel & Rates, Program Detail, Term Targets,
  Advisor Detail, Traffic Light. These are anchor links to sections on the
  same page (not separate panels), with the active tab highlighting as you
  scroll.
- **Numbered section banners** ("1 Marketing Updates", "2 Admissions Update")
  matching the reference's visual grouping.
- **This Week's Focus** — an editable note box (saved locally in the
  browser) for jotting the week's decision or call-out, similar to the
  reference's "Decision this week" callout.
- **Lead Source Mix** — a donut chart + channel totals table for the
  latest complete week.
- **Traffic Light section** — RAG (red/amber/green) status cards for
  Marketing and Admissions, computed automatically from the same
  week-on-week delta logic used in the KPI cards (not manually set).
- **Term Targets** (new, mirrors the Excel tracker's Term Targets tab) —
  if your CRM export's Planned Term column is populated (format:
  `"2026 T4 - 6/7/2026 - 21/8/2026"`), the dashboard automatically detects
  every term in your data, parses its date window straight out of that
  text, and shows cumulative Leads/ICs/ECs/Apps to date for each one. The
  only manual inputs are Start Target and the App→Start conversion rate
  (both saved locally per term) — from those it computes Apps Needed,
  Remaining, and Apps/Week needed to hit the target by the term's close.
- **Advisor Detail** (new, mirrors the Excel tracker's Admissions tabs) —
  if your CRM export's Enrollment Advisor column is populated, this shows
  each advisor's Contacts/ICs/ECs/Apps and stage-conversion rates for the
  latest complete week, sortable by column.

Both new sections read directly off columns already in the real CRM export
(Planned Term, Enrollment Advisor) — no extra upload or reshaping needed,
same file as everything else. If those columns aren't populated in your
export, those sections will say so rather than showing empty charts.

## Quick start

1. Open `alignmentdashboard.html`.
2. Click **Load sample data** to see it populated with a synthetic dataset,
   or click **Upload weekly CRM export** and select your actual export file
   (the same `.xlsx` you pull from the CRM each week).
3. Switch between entities (SUN / SIM, or whatever accounts are in your
   data) with the toggle in the header.

## What file to upload

Upload the CRM's **Leads** export as-is — the same file, unmodified, that
you already pull weekly. The dashboard reads it directly. No pivoting,
reshaping, or renaming needed.

**Required columns** (matched case-insensitively, extra columns are ignored):

| Column | Used for |
|---|---|
| `Account` | Which entity the lead belongs to (maps "Sunway University - Online" → SUN, "Singapore Institute of Management - Online" → SIM; any other account name is used as its own entity label) |
| `Program` / `Short Name (Program) (Program)` | Program breakdown |
| `Lead Channel` | Channel breakdown (PPC, SEO, Creative, etc. — whatever appears in your data) |
| `Created On` | When the lead was created — drives the Leads count and its week |
| `Contacted Date` | When first contacted — drives the Contacts count |
| `Interview Completed Date` | Drives the ICs count |
| `Evaluation Completed Date` | Drives the ECs count |
| `File Completed Date` | Drives the Applications / Apps count |

Each upload is treated as a **full refresh** — it replaces whatever was
loaded before, since the export is a rolling extract of all leads to date,
not just the new ones. Just upload the latest file each week; you don't
need to merge or trim anything first.

## Weeks run Monday–Sunday

Every date column is bucketed into the Mon–Sun week it actually falls in,
labelled by its week-ending Sunday. A lead created in one week that reaches
Interview Complete two weeks later shows up correctly in both weeks'
figures — leads counted the week they arrived, Contacts/ICs/ECs/Apps
counted the week each milestone happened.

**"Latest week" always means the last fully-completed Mon–Sun week.** If
you upload the file on a Monday and it already contains a few leads created
that same morning, those get bucketed into the new (still in-progress)
week and are excluded from the headline KPI cards and the funnel panel —
so Monday's view always reflects the week that just ended, not a partial
sliver of the new one. They still show up in the trend charts, just as a
naturally lower, still-forming data point.

## What's on the dashboard

- **KPI row** — last full week's Leads, Applications, Lead-to-Application
  Rate, and IC→EC Rate (flagged "watch" — historically the bottleneck
  stage), each with a vs-prior-week delta.
- **Leads by Channel** — line chart, one line per channel that appears in
  your data.
- **Leads & Applications by Program** — rolled-up totals on a dual axis.
- **Funnel Stage Rates** — C→IC, IC→EC, EC→App over time.
- **Funnel (latest week)** — a waterfall-style bar view of
  Contacts → ICs → ECs → Apps for the last completed week.
- **Program Detail table** — last completed week, per program, sortable.

## A known gap: no advisor-level detail or Handles

This export is a lead-lifecycle file — it has no advisor/owner column and
no call-activity data, so there's nothing in it to build a per-advisor
breakdown or a "Handles" (dial volume) metric from. Everything on this
dashboard is entity-level, built purely from lead and milestone dates.

If you get a separate call-activity/dialer export later (one with an
advisor column and call counts), that can be wired in as an additional
upload and advisor-level detail can be added back — just share a sample
of that export's columns and it can be built the same way this one was.

## Deploying to GitHub Pages

1. Put these files together in one repo folder: `alignmentdashboard.html`, `style.css`,
   `app.js`, `sample-data.js`, `sample_data.csv`.
2. Push to GitHub.
3. **Settings → Pages** → set Source to your branch, root folder, save.
4. GitHub gives you a live URL — that's the dashboard.

If this dashboard shares a repo with anything else, keep it in its own
subfolder or its own repo entirely — GitHub Pages serves whatever
`alignmentdashboard.html` it finds, so a filename collision with another project will
silently overwrite one or the other.

## Data persistence

Once loaded, data is cached in the browser's `localStorage` so it's still
there if you close and reopen the page, until you upload a new file or
click **Clear loaded data**. This is per-browser, per-device — it doesn't
sync anywhere or get shared with anyone else who opens the page.

## Customising

- **Colours**: edit the CSS custom properties at the top of `style.css`
  (`--sun`, `--sim`, etc.).
- **Programs/channels**: no code change needed — whatever values appear in
  your data are picked up automatically.
- **Column mapping**: if the CRM export's column names ever change, update
  the lowercase key lookups in `transformCRMRows()` in `app.js`.

## Fully offline / no external network dependencies

The three JS libraries this dashboard uses (Chart.js, PapaParse, SheetJS)
are bundled locally (`chart.umd.js`, `papaparse.min.js`, `xlsx.full.min.js`,
sitting alongside the other files, no subfolder) rather than loaded from a
CDN. This matters if you're on a network that blocks common CDN domains
(`cdnjs.cloudflare.com`, `jsdelivr.net`, etc.) — a real issue we hit while
testing this, showing as `Uncaught ReferenceError: Chart is not defined`
in the browser console. With everything bundled locally, the only network
request the page makes is for the Google Fonts stylesheet (cosmetic only —
if that's blocked too, it just falls back to a system font, nothing breaks).

**When uploading to GitHub, make sure all three vendor .js files go up
too** — they're not optional, `alignmentdashboard.html` references
`chart.umd.js`, `papaparse.min.js`, and `xlsx.full.min.js` directly.
