# SUN / SIM Weekly Alignment Dashboard

A static, client-side dashboard for the weekly Marketing/Admissions alignment
tracker. No backend, no build step — open `index.html` in a browser, or host
the folder on GitHub Pages. All parsing and calculation happens in the
visitor's browser; nothing is ever uploaded anywhere.

## Quick start

1. Open `index.html` (double-click, or via GitHub Pages).
2. Click **Load sample data** to see it populated immediately with a made-up
   dataset, or click **Upload CRM export** to load your own file.
3. Switch between **SUN** and **SIM** with the toggle in the header — the two
   run as fully separate tracks, matching the underlying tracker.

## Deploying to GitHub Pages

1. Create a new GitHub repo (or a folder in an existing one) and add these
   five files: `index.html`, `style.css`, `app.js`, `sample-data.js`,
   `sample_data.csv`.
2. Push to GitHub.
3. In the repo, go to **Settings → Pages**, set the source to the branch
   you pushed (e.g. `main`) and root folder, then save.
4. GitHub will give you a URL like `https://<username>.github.io/<repo>/` —
   that's the live dashboard. Anyone with the link can open it and upload
   their own CRM export; nothing is shared between visitors (each browser
   only sees what's uploaded or restored from its own local storage).

No server, database, or API key is needed anywhere in this setup.

## The expected data schema

The dashboard expects a **long-format** CSV or Excel file — one row per
metric, per week, per entity — with exactly these columns (header names are
case-insensitive):

| Column | Description | Example |
|---|---|---|
| `week_ending` | Date for that week (Friday, matching the tracker) | `2026-07-17` |
| `entity` | `SUN` or `SIM` | `SUN` |
| `group` | `Marketing` or `Admissions` | `Marketing` |
| `type` | `Channel`, `Program`, or `Advisor` | `Channel` |
| `name` | The channel/program/advisor name | `SEO` |
| `metric` | See metric list below | `Leads` |
| `value` | The number | `144` |

**Metrics used:**
- Marketing rows: `Leads` (for both Channel and Program rows), `Applications`
  (for Program rows only — applications aren't split by channel, matching
  the tracker).
- Admissions rows (`type = Advisor`): `Handles`, `Contacts`, `ICs`, `ECs`,
  `Apps`.

**Example rows:**
```csv
week_ending,entity,group,type,name,metric,value
2026-07-17,SUN,Marketing,Channel,SEO,Leads,144
2026-07-17,SUN,Marketing,Program,Business,Leads,90
2026-07-17,SUN,Marketing,Program,Business,Applications,9
2026-07-17,SUN,Admissions,Advisor,Ron Lim,Handles,480
2026-07-17,SUN,Admissions,Advisor,Ron Lim,Contacts,264
2026-07-17,SUN,Admissions,Advisor,Ron Lim,ICs,111
2026-07-17,SUN,Admissions,Advisor,Ron Lim,ECs,5
2026-07-17,SUN,Admissions,Advisor,Ron Lim,Apps,4
```

Open `sample_data.csv` for a full working example (20 weeks, both entities).
Click **Download template** in the dashboard to grab this file directly.

### Getting your CRM export into this shape

Most CRM exports come "wide" (one row per week, one column per channel or
advisor) rather than this "long" shape. You'll likely need one pivot/unpivot
step — in Excel: Data → From Table, then unpivot the metric columns; or in
Power Query / a script, melt the wide export into `week_ending, entity,
group, type, name, metric, value`. If your CRM can already export a flat
transaction-level log (one row per lead, one row per handle), that's an even
better source — aggregate it to weekly totals by channel/program/advisor
before exporting.

### File formats supported

- `.csv` — parsed with PapaParse.
- `.xlsx` / `.xls` — parsed with SheetJS; only the **first sheet** is read,
  and it should be laid out with the same seven columns as a header row.

Rows missing any of the seven required fields, or with a non-numeric
`value`, are silently skipped and counted in the status bar message (e.g.
"3 rows skipped — missing/invalid fields") so you can catch formatting
issues.

## What's on the dashboard

- **KPI row** — latest week's Leads, Applications, Lead-to-Application Rate,
  Contact Rate, and IC→EC Rate (flagged "watch" — it's the known bottleneck
  stage), each with a vs-prior-week delta.
- **Leads by Channel** — line chart, one line per channel, over all weeks
  loaded.
- **Leads & Applications by Program** — rolled-up totals (not broken out per
  program, to keep the chart legible) on a dual axis.
- **Funnel Stage Rates** — Contact Rate, C→IC, IC→EC, EC→App over time.
- **Admissions Funnel (latest week)** — a waterfall-style bar view of
  Handles → Contacts → ICs → ECs → Apps for the latest week, each bar
  against a dashed target line (500 / 50 / 10 / 3 / 2 per advisor,
  multiplied by however many distinct advisors appear in that week's data).
- **Advisor Detail table** — latest week, per advisor, sortable by any
  column.

## Data persistence

Once loaded, data is cached in the browser's `localStorage` so it's still
there if you close and reopen the page — until you upload a new file or
click **Clear loaded data**. This is per-browser, per-device; it doesn't
sync anywhere or get shared with anyone else who opens the page.

## Customising

- **Per-advisor targets**: edit the `PER_ADVISOR_TARGET` object near the top
  of `app.js`.
- **Colours**: edit the CSS custom properties at the top of `style.css`
  (`--sun`, `--sim`, etc.).
- **Programs/channels**: no code change needed — whatever `name` values
  appear in your data for a given `type` are picked up automatically.
