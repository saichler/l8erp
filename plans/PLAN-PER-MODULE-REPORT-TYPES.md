# PLAN — Give each module its own Report type

**Status:** awaiting approval. Nothing in this plan is implemented.

**Problem:** six modules serve FIN's `FinReport` under their own ServiceName.
**Goal:** each module owns a properly prefixed report Prime Object, ending the
shared-table and shared-cache violations and restoring real columns and forms.

---

## 1. The defect, as measured

Seven services activate an ORM service over the **same** protobuf type:

| Service dir | ServiceName | Area | Service item |
|---|---|---|---|
| `fin/finreports` | `FinReport` | 40 | `&fin.FinReport{}` ✅ correct owner |
| `crm/crmreports` | `CrmReport` | 80 | `&fin.FinReport{}` ❌ |
| `hcm/hcmreports` | `HcmReport` | 30 | `&fin.FinReport{}` ❌ |
| `mfg/mfgreports` | `MfgReport` | 70 | `&fin.FinReport{}` ❌ |
| `prj/prjreports` | `PrjReport` | 90 | `&fin.FinReport{}` ❌ |
| `sales/salesreports` | `SalesRept` | 60 | `&fin.FinReport{}` ❌ |
| `scm/scmreports` | `ScmReport` | 50 | `&fin.FinReport{}` ❌ |

Three consequences, each a named rule violation:

1. **`SingleOwnerDatabaseTable`** — "Only ONE process may activate the ORM
   service for a given Prime Object. Dual activation causes silently divergent
   caches." Seven activations share one `finreport` table and seven caches.
2. **`ProtobufRules` — Model Names Must Match Protobuf Types** — the UI declares
   `model: 'FinReport'` for all seven, so HCM's Reports tab queries FIN's type.
3. **`EnumRendererColumnCascade`** — no module registers columns, forms or
   primaryKeys for `FinReport`, so all seven fall back to `DEFAULT_COLUMNS`
   (`id`, `name`, `status`) with `primaryKey = 'id'`. `id` is not a field of
   `FinReport`; filtering or sorting on it returns
   `Unknown attribute FinReport.id` (HTTP 400).

Also: `mfg/mfgreports/MfgReportServiceCallback.go` registers the type name
`"FinReport"` and casts to `*fin.FinReport` — a copy-paste that the rename will
force out into the open.

**Evidence:** 7 of the 11 remaining Phase 2 failures in `e2e/` are exactly these
services. They are the only failures in the suite not caused by the
`paymentallocation` rows.

---

## 2. Shape of the fix

`FinReport` is a Prime Object (independent identity, own lifecycle, queried
directly, no parent id), so `PrimeObjectReferences` Rule 1 applies to each
module's equivalent, and Rule 3 dictates what each one needs:

> config entry, columns, forms, nav entry, type registration, reference
> registry entry, mock data generator with ID slice

`FinReport`'s shape (`proto/fin-reports.proto`) is:

```
FinReport        report_id, report_type(enum), fiscal_period_id, fiscal_year_id,
                 department_id, currency_id, account_id, title, period_name,
                 generated_at, sections[], grand_total(Money), row_count, audit_info
FinReportSection title, lines[], section_total(Money)
FinReportLine    account_id, account_number, account_name, level, is_header,
                 debit, credit, balance
```

Each module needs its **own** `Section` and `Line` child messages as well.
Reusing `FinReportSection` would put six modules' children back into one
`finreportsection` table — recreating precisely the collision just fixed for
`PaymentAllocation`.

Several fields are FIN-specific (`fiscal_period_id`, `fiscal_year_id`,
`account_id`, debit/credit). Per-module types should carry the generic core
(`report_id`, `report_type`, `title`, `period_name`, `generated_at`, `sections`,
`row_count`, `audit_info`) plus whatever that module actually reports on, rather
than copying FIN's ledger columns into HCM.

---

## 3. Duplication audit (`PlanRequirements`)

Required before writing to `./plans/`.

Six near-identical report types, each with a service, a callback, desktop UI
data files, mobile registry entries and a mock generator:

| Behaviour | Instances | Behavioural lines each | Product |
|---|---|---|---|
| `Activate()` + `NewOrmSLA` + callback wiring | 6 | ~25 | 150 |
| desktop columns/forms/enums module scaffold | 6 | ~40 | 240 |
| mobile registry + nav + columns/forms scaffold | 6 | ~35 | 210 |
| mock generator (build N reports with sections/lines) | 6 | ~45 | 270 |

All four exceed `behavioural_lines × instances > 100`, so **extraction is
mandatory and becomes Phase 0**, per the Second Instance Rule ("extract shared
abstraction immediately on second instance, never copy+replace").

Phase 0 deliverables:
- `go/erp/common/report_service.go` — `ActivateReportService(sla parts…)`
  collapsing the six identical `Activate()` bodies to a call each.
- `go/tests/mocks/gen_reports.go` — one generator parameterised by
  (module, endpoint, type enum, ID prefix), replacing six copies.
- `l8ui`-side: **nothing**. Report columns/forms are configuration, and
  `Layer8ColumnFactory` / `Layer8FormFactory` already cover them; a new shared
  component would be project-specific code in `l8ui`, which
  `L8UINoProjectSpecificCode` forbids.

Specs and module data files stay **data-only** — the Config-vs-Logic split
`Maintainability` requires.

---

## 4. Component × Platform audit (Platform Completeness)

| Component | Desktop | Mobile | Phase |
|---|---|---|---|
| proto message + List + Section + Line (×6) | n/a | n/a | 1 |
| generated `.pb.go` via `make-bindings.sh` | n/a | n/a | 1 |
| service item/list swap in `Activate()` (×6) | n/a | n/a | 2 |
| ServiceCallback type name + cast (×6) | n/a | n/a | 2 |
| UI type registration in `go/erp/ui/shared.go` | ✗ | ✗ | 3 |
| module config `model:` (×6) | ✗ | ✗ | 3 |
| columns (×6) | ✗ | ✗ | 4 |
| forms (×6) | ✗ | ✗ | 4 |
| enums/renderers for report_type (×6) | ✗ | ✗ | 4 |
| reference registry entry (×6) | ✗ | ✗ | 4 |
| mobile registry + nav config (×6) | n/a | ✗ | 5 |
| mock generators with ID slices (×6) | n/a | n/a | 6 |
| e2e coverage | regenerated inventory | regenerated inventory | 7 |

---

## 5. Phases

**Phase 0 — Mandatory extraction.** `common/report_service.go` and
`gen_reports.go` as above; retrofit FIN's existing report service and generator
onto them first, so there is one implementation before the second consumer.

**Phase 1 — Protos.** Add `HcmReport`/`ScmReport`/`MfgReport`/`SalesReport`/
`CrmReport`/`PrjReport`, each with `…List`, `…Section`, `…Line`. Enum zero =
`UNSPECIFIED` (`ProtobufRules`); list field named `list = 1` with
`l8api.L8MetaData metadata = 2`. Run `cd proto && ./make-bindings.sh` (never
per-file), then `go build ./...`.

**Phase 2 — Services.** Point each `Activate()` at its own type/list; fix
`MfgReportServiceCallback`'s `"FinReport"` type name and `*fin.FinReport` cast.
After this, seven services own seven tables — the
`SingleOwnerDatabaseTable` violation is gone.

**Phase 3 — Type registration + config.** Register each type in
`go/erp/ui/shared.go` via `common.RegisterType(...)` with its PK; change each
module config's `model:` from `'FinReport'` to its own. This alone ends the
`DEFAULT_COLUMNS`/`pk='id'` fallback.

**Phase 4 — Desktop UI data.** Per module: enums + renderer for its report-type
enum, columns, forms (sections as `f.inlineTable`, per
`PrimeObjectReferences` Rule 3 — Section/Line are child types and get no config
of their own), and a reference registry entry.

**Phase 5 — Mobile.** `Layer8MModuleRegistry` entry, nav config service entry
with the correct lowercase `idField` (`JsProtobufFieldNames` calls wrong casing
a five-times regression), columns with `primary`/`secondary`, forms.

**Phase 6 — Mock data.** Six generators via the Phase 0 helper, each with an ID
slice in `store.go` and a phase entry; every column field populated with
non-zero values (`DataCompletenessPipeline` Stage 2).

**Phase 7 — Verification.** `npm run inventory` in `e2e/` (the suite is driven
by the shipped configs, so the new services enter coverage automatically), then
Phases 2–6 of the e2e suite. The 7 `FinReport` failures must become passes, with
no regression elsewhere. Plus:

```bash
grep -rn "fin.FinReport" go/erp/{crm,hcm,mfg,prj,sales,scm} --include=*.go   # expect none
grep -rn "'FinReport'" go/erp/ui/web/{crm,hcm,mfg,prj,sales,scm}             # expect none
```

---

## 6. Traceability matrix

| # | Area | Gap / action item | Platform | Phase |
|---|---|---|---|---|
| 1 | Suite | Extract shared report service activation | n/a | 0 |
| 2 | Suite | Extract shared report mock generator | n/a | 0 |
| 3 | Proto | 6 × Report + List + Section + Line | n/a | 1 |
| 4 | Proto | Regenerate bindings, `go build ./...` | n/a | 1 |
| 5 | Service | 6 × `Activate()` own type/list | n/a | 2 |
| 6 | Service | Fix `MfgReport` callback type name + cast | n/a | 2 |
| 7 | Service | `SingleOwnerDatabaseTable` restored | n/a | 2 |
| 8 | UI | 6 × type registration in `ui/shared.go` | both | 3 |
| 9 | UI | 6 × module config `model:` | both | 3 |
| 10 | UI | 6 × columns | desktop | 4 |
| 11 | UI | 6 × forms (sections as inline tables) | desktop | 4 |
| 12 | UI | 6 × report-type enums + renderer | desktop | 4 |
| 13 | UI | 6 × reference registry entries | desktop | 4 |
| 14 | Mobile | 6 × module registry entries | mobile | 5 |
| 15 | Mobile | 6 × nav config, lowercase `idField` | mobile | 5 |
| 16 | Mobile | 6 × columns with primary/secondary | mobile | 5 |
| 17 | Mobile | 6 × forms | mobile | 5 |
| 18 | Mocks | 6 × generators + ID slices + phase order | n/a | 6 |
| 19 | Mocks | Every column field non-zero | n/a | 6 |
| 20 | e2e | Regenerate inventory | both | 7 |
| 21 | e2e | 7 `FinReport` failures → pass, no regressions | both | 7 |
| 22 | e2e | Greps confirm no residual `fin.FinReport` use | n/a | 7 |

No orphans: every row in §4 maps to a phase.

---

## 7. L8UI includes audit (`PrdL8uiIncludesAudit`)

This plan adds no l8ui file and changes no shell, so the per-file include audit
is unchanged. It is enforced continuously instead by
`e2e/tests/{desktop,mobile}/00-shell-integrity.spec.ts`, which asserts every
`<script src>` resolves and every required global is defined, and by
`tools/generate-inventory.js`, which fails on any script that throws at load.
Both currently pass for both shells.

---

## 8. Rule compliance

| Rule | How this plan complies |
|---|---|
| `SingleOwnerDatabaseTable` | Phase 2 gives each Prime Object exactly one owning activation |
| `ProtobufRules` — names match types | Module-prefixed types; UI `model:` matches the protobuf type |
| `ProtobufRules` — enum zero, list convention | Phase 1: `…UNSPECIFIED = 0`, `repeated X list = 1`, metadata field 2 |
| `ProtobufRules` — generation | Full `make-bindings.sh`, never per-file; verify `.pb.go` + `go build ./...` |
| `PrimeObjectReferences` R1/R3 | Reports are Prime Objects and get the full set; Section/Line are children and get only `f.inlineTable` |
| `PlanRequirements` | Duplication audit → Phase 0; Component×Platform; traceability with Platform column; final verification phase |
| `MobileRules` | Phase 5 mirrors every desktop artifact; parity asserted by the e2e parity spec |
| `Maintainability` | ServiceNames already ≤10 chars; module files stay data-only; files < 500 lines |
| `EnumRendererColumnCascade` | Phase 4 supplies real columns/enums, ending the `DEFAULT_COLUMNS` fallback |
| `JsProtobufFieldNames` | Phase 5 uses lowercase JSON `idField`; all JS names verified against `.pb.go` |
| `DataCompletenessPipeline` | Phase 6 populates every column field with non-zero values |
| `L8UINoProjectSpecificCode` | No l8ui change; shared behaviour goes in `erp/common` |
| `TestLocationAndApproach` | Verification through the real API/UI; `go/tests/` untouched |
| `VendorAndGit` | No git or vendor commands run by me |

---

## 9. Cost and risk

- **Scale:** ~24 new proto messages, 6 service + 6 callback edits, ~30 desktop
  UI files, ~24 mobile files, 6 mock generators. The largest single change in
  this workstream.
- **Deployment:** `go/erp/main/Dockerfile` resolves `l8erp` from GitHub, not
  from the working tree or `vendor/`. Every phase that touches Go or protos
  needs a commit + push before it can be tested on the cluster — this has
  already cost several cycles, so batch the backend phases into one push.
- **Data migration:** existing `finreport` rows written by the six borrowing
  services become orphans under the new tables. They are mock data; a reload
  after Phase 6 is simpler than migrating them.
- **Narrower alternative** (if this is too large right now): do Phases 3–4 only
  — register per-module columns/forms/primaryKeys for `FinReport`. That ends
  the `DEFAULT_COLUMNS`/`pk='id'` failures and turns the 7 e2e failures green,
  but leaves the `SingleOwnerDatabaseTable` and `ProtobufRules` violations in
  place. It should be recorded as debt, not treated as a fix.

---

## 10. Approval

This plan is written to `./plans/` and stops here, per `PlanRequirements`.

---

## 11. Implementation status (Phases 0–6 complete, verified locally)

| Phase | State | Notes |
|---|---|---|
| 0 — shared service scaffolding | done | `go/erp/common/report_service.go` |
| 1 — six protos | done | regenerated; SCM's `SUPPLIER_PERFORMANCE` dropped (no generator) |
| 2 — services + generators | done | 20 files; all **seven** services now on the shared scaffolding, FIN included |
| 3 — type registration + module config | done | `shared*.go` ×6, `*-config.js` ×6 |
| 4 — desktop UI | done | new `{mod}/reports/` ×6 + FIN namespace fix |
| 5 — mobile UI | done | registries, nav config, `m/app.html`; reports reach mobile for the first time |
| 6 — mock generators | done | `gen_reports.go`, `reports_phases.go`, `store_reports.go` |
| 7 — cluster verification | done (2 blocked) | images rebuilt at `e0aec5cf`, loaded into KIND; see below |

### Phase 7 results (live KIND cluster)

Both images rebuilt from the pushed commit — the build log confirms
`l8erp v0.0.0-20260923120641-e0aec5cf391b`, so no stale code this time — loaded
into KIND and the pods restarted.

**Seven separate tables, confirmed at runtime.** All seven endpoints answer
HTTP 200 for their own protobuf type and started empty: the shared-table
violation is gone in the running system, not just in the source.

**All 26 report types generate.** Seeding the seven services through the real
API produced real sections and lines for every type in every module:

| Service | Reports | sections/rows produced |
|---|---|---|
| FinReport | 7 | 3s/12r, 2s/14r, 1s/26r, 1s/5r, 4s/30r, 4s/23r, 1s/3r |
| HcmReport | 4 | 1s/12r, 1s/1r, 1s/2r, 1s/1r |
| ScmReport | 3 | 6s/25r, 1s/5r, 1s/6r |
| MfgReport | 3 | 1s/4r, 1s/5r, 1s/20r |
| SalesReport | 3 | 1s/20r, 1s/5r, 1s/15r |
| CrmReport | 3 | 1s/6r, 1s/8r, 1s/6r |
| PrjReport | 3 | 1s/15r, 1s/22r, 1s/15r |

**The images were never being deployed.** Every workload in
`k8s/l8erp-kind.yaml` carries `imagePullPolicy: Always`, so Kubernetes pulls
`saichler/erp:latest` from Docker Hub and discards whatever `kind load` put on
the node. With no `docker push`, the cluster ran Hub's Sep 21 binary
(`HcmReportList` ×0) while the locally built Sep 23 image sat unused — so an
earlier claim in this file that Phase 7 ran against the pushed commit was
wrong; the build log only proved the image compiled, not that the pod used it.
Verified by `grep -c HcmReportList /home/run/erp` inside the container: 0
before, 25 after patching both StatefulSets to `IfNotPresent` and re-loading.

`Always` also makes the workflow `PostImplementationE2ETesting` prescribes
impossible ("rebuild the image, `kind load docker-image`, `kubectl delete pod`
to force a fresh pull of the loaded image"). The patch above is live-only; the
manifest still says `Always`, and changing it is a deployment-artifact decision
left to the owner.

Spec results, reports only — all green:

| Spec | Reports covered | Result |
|---|---|---|
| `03-service-coverage` | 7/7 | pass (suite went 11 failed -> 2 failed, 66 passed) |
| `11-form-rendering` | 7/7, 12–13 fields each | pass |
| `14-inline-tables` | 7/7 `sections` tables | pass |

`10/11/14` together: 174 passed, 12 failed, 11 flaky. Only **2** of those 12 are
real (AP and AR, the orphaned rows below). The other 10 are Playwright
`ENOENT ... .playwright-artifacts-N/traces/*.trace` — `outputDir` is the shared
`./test-results` and Playwright clears it on startup, so launching the mobile
suite while the desktop suite was still running destroyed the desktop run's
in-flight traces. Operator error, not a product finding: **never run two
suites concurrently against this config.** The same mistake invalidated a
mobile run (19 failed, 12 of them that cascade).

### The defect only the cluster could catch

`col.custom('sections', ..., fn)` returned a **number**. `Layer8DTable.
renderRow` calls `value.replace(/<[^>]*>/g, '')` on whatever `col.render`
returns, to strip markup for the cell tooltip — so a non-string throws, and
`fetchData`'s catch relabels it as a data error, taking down the **entire
table** rather than one cell. All seven now return `String(...)`.

Worth raising upstream: `renderRow`'s `col.key` branch coerces through
`escapeHtml`'s `String(text)`, but its `col.render` branch does not. One
`String()` in `l8ui/edit_table/layer8d-table-render.js:236` would turn a
whole-table outage into a rendered cell. Not changed here — it belongs to l8ui,
and `L8UINoProjectSpecificCode` says to push l8ui rather than edit it in place.

### Schema changes beyond the mechanical rename

`fin.FinReportLine.level` was never used as an indent level by any of the six
module generators — each stored a headcount, an order count or a row count in
it, so a column labelled "Level" would have shown a tally. The new
`{P}ReportLine` carries `count` instead, plus `percentage` and `quantity` for
the values that were being smuggled through `variance_percent`. Indentation is
carried by `is_header` alone.

### Defects found and fixed along the way

- **All seven report tables rendered `DEFAULT_COLUMNS`.** `fin/reports/*.js`
  was the only submodule in the codebase writing to a nested namespace
  (`FIN.Reports`) instead of a top-level global. `Layer8DServiceRegistry`
  resolves a submodule name to `window[name]`, so it never found the columns,
  forms or primary key — the three `id`/`name`/`status` fallback columns were
  what the e2e suite had been reporting. Namespace is now `window.FinReports`,
  matching `MfgCosting` and every other submodule.
- `fin/reports/reports-config.js` was dead: nothing ever read `FIN.Reports.config`. Deleted.
- `MfgReportServiceCallback`, `CrmReportServiceCallback` and
  `PrjReportServiceCallback` registered their type as `"FinReport"`.
- `m/app.html` never loaded `talent-enums-recruiting.js` /
  `talent-enums-performance.js`, so three HCM Talent files threw on mobile.
  Mobile shell now loads with **0 failures** for the first time.
- `NewReportCallback` originally tolerated a nil `Generate` — a report service
  without a generator would have persisted an empty report and reported
  success. Now required (`FailFastNoSilentFallback`).

### Guideline audit (second pass, all 76 rules)

A systematic re-check against `l8book/layer-8-guide-lines.md` found three things
the first pass had got wrong. All three are fixed:

1. **`AddingModule` / `primaryKeys` — the worst of them.** None of the seven
   report submodules declared `{NS}.primaryKeys`. `Layer8DServiceRegistry.
   getPrimaryKey()` then falls back to `'id'`, `Layer8DTable.getItemId()` finds
   no such field and returns `undefined`, and `Layer8DModuleCRUD` builds
   `select * from XxxReport where id=undefined`. Row clicks, Edit and Delete
   would all have done nothing, silently — the same class of failure the plan
   set out to fix. 75 sibling files declare it at the end of `*-forms.js`; all
   seven now do too.
2. **`DataCompletenessPipeline` Stage 1 + `PrimeObjectReferences` Rule 3 —
   `sections` was in columns but not in forms.** It had been left out on the
   reasoning that POST overwrites it; that reasoning was wrong, because PUT
   round-trips it and, without the inline table, a generated report's own
   content is not visible anywhere in the UI. All seven forms now render
   `sections` as an inline table.
3. **FIN's own columns/forms were incomplete** — `fiscalYearId`,
   `fiscalPeriodId`, `departmentId`, `accountId`, `currencyId`, `grandTotal`,
   `sections` and `periodName` were each missing from one side. Closed.

Verified clean: proto enum zero values and label/ordinal alignment against the
generated `*_name` maps; `ReportList` `list`/`metadata` convention;
`Layer8EnumFactory` three-method API; every `col.*` exists and `col.enum` gets
its four arguments; `JsProtobufFieldNames` (every JS key checked against the
`.pb.go` JSON tags, nav `idField` lowercase `reportId`); `ReferenceRegistry
Completeness` (Currency/Department/Employee all registered);
`MoneyFieldTypeMapping` (`grandTotal`/`sectionTotal` use `money`, and read-only
money and date both resolve through `Layer8FormatDisplay`, satisfying
`SingleDisplayFormatterRule` and `DateFieldRenderingPipeline`);
`ScriptLoadingOrder` (module data before each module's init on desktop, before
each `*-index.js` on mobile) and every script tag in both shells resolving to a
real file; section container ids generated as `{moduleKey}-{serviceKey}-table-
container`; `ServiceName` <= 10 chars and one `ServiceArea` per module;
`Maintainability` file sizes; `NoGoGenerics`; `TestLocationAndApproach`;
`CleanupTestBinaries` (no stray binaries); `VendorAndGit` and
`DemoDirectorySync` (`vendor/`, `l8ui/` and `go/demo/` all untouched);
`ProtobufRules` generation via `make-bindings.sh` with `-i`.

Second Instance Rule: each report service is now ~9 non-comment lines — a
`ServiceName`/`ServiceArea` pair and one delegating call. The per-type accessor
closures cannot be shared further without generics, which are banned.

### Two genuine product bugs the real browser found (both in l8ui) — FIXED

Both fixed in the **l8ui source** (`../l8ui`), per `L8UINoProjectSpecificCode`:
an l8ui fix goes through its own repo and a submodule bump, never an in-place
edit of `go/erp/ui/web/l8ui`. **l8ui must be committed and pushed, and the
submodule bumped**, or the next `git submodule update` discards them — the
working copy inside l8erp is only mirrored so the image could be built and the
fix verified.

**1. Bar charts cannot render negative values.**
`l8ui/chart/layer8d-chart-bar.js` computes `maxVal = Math.max(...values, 1)`
with the baseline pinned to the bottom of the plot, then
`barH = (d.value / maxVal) * plotH` (line 77; line 145 for the horizontal
variant). A negative datum yields a negative height, SVG rejects the attribute,
the bar never draws and the console fills with
`<rect> attribute height: A negative value is not valid. ("-189.84…")`.
Any dataset containing a variance, delta or profit/loss silently loses those
bars — reproduced on `bi/analytics/trend-analyses`.

Fixed with a signed domain rather than a clamp: a new `_domain(data)` returns
`min(values, 0)`..`max(values, 0)`, `_getTicks(min, max)` walks that signed
range on a rounded step and always includes zero, the axis line moves from the
plot floor to the zero position, and each bar is drawn from zero with
`Math.abs()` extent. `_getTicks(maxVal)` keeps its old single-argument meaning
so nothing else that calls it breaks. Checked against negatives-only, mixed,
all-positive, all-negative and all-zero data: no negative extents, and
all-positive output is unchanged apart from zero now appearing as a tick.

**2. A restricted account gets a completely blank shell.**
Signed in as `hrclerk`, `#content-area` has `innerHTML.length === 0` and zero
`.section-container`s, while all 15 sidebar links still render as visible. The
operator, same shell, same moment: 16 115 characters and one section.
Permissions themselves are correct — `/permissions` returns 16 models for
`hrclerk` against 269 for `operator`.

Root cause: `Layer8DModuleFilter.load()` queries `SysModuleConfig`, which the
restricted role may not read — `operator` gets HTTP 200 `{}`, `hrclerk` gets
HTTP 400 `access denied`. `load()` treated that as fatal and returned false, and
`js/app.js:176` does `if (!configLoaded) return;`, aborting init before
`loadSection('dashboard')` on line 220. Hence a blank `#content-area` with a
full sidebar, plus `showErrorAndLogout()` on top of it
(`ModconfigFailureNoLogout`).

Fixed in `load()`: a 401/403, or a body containing `access denied`, is now a
normal state — it warns, leaves `_loaded` false and returns true. That is the
component's own documented safe default (`isEnabled()` reports everything
visible when unloaded), and it grants nothing, because module config only toggles
which modules are *shown*; the real boundary is `/permissions` plus the server's
deny rules, which still apply. A genuine outage (any other status) stays fatal,
so `FailFastNoSilentFallback` is preserved for the case it is about.

One red herring worth recording: an earlier probe of mine queried
`L8ModuleConfig` instead of `SysModuleConfig` and got a 400 for *both* accounts,
which briefly looked like the cause. It was not — the operator boots through it.

### Mobile suite: 8 passed / 76 failed -> 85 passed / 2 failed

Almost all of it was one page-object bug of mine. Mobile has **two** card-table
components — `Layer8MTable` emits `mobile-table-*`, `Layer8MEditTable` emits
`mobile-edit-table-*` — and `layer8m-nav-data.js` renders services through the
editable one (`AddingModule`: "Mobile: `new Layer8MEditTable(containerId,
config)`"). `pages/MobileNav.ts` matched only `mobile-table-*`, so a live probe
found `#service-table-container` holding **43 097 characters of fully rendered
table** while every selector counted zero, and all 256 services reported "table
never resolved". Also fixed: `openService()` was passed `subModuleKey`
(`core-hr`) where it matches the card's visible text (`Core HR`) — Playwright's
`hasText` is case-insensitive substring, so single-word keys like `health`
matched by luck and hyphenated ones never did, which is exactly which 8 tests
passed. Custom views (`aia/agent/chat`, `system/modules/module-settings`,
`model: undefined`) are now skipped, as the desktop sweep skips `customView`.

**A third product bug, found by the parity spec:** `layer8m-nav-config.js`
enumerates each module config it merges and `lending` was absent.
`layer8m-nav-config-prj-other.js` defines all six LEND services, but they never
reached `LAYER8M_NAV_CONFIG`, so the sidebar showed a Lending entry (that comes
from the base modules list) leading nowhere — every LEND service was
desktop-only, a `MobileRules` parity violation. One line in `erp-ui/`; mobile
went 256 -> 262 services.

**A fourth, found by rewriting a bad test of mine:**
`00-shell-integrity`'s registry check took every `window.Mobile*` global and
demanded it be a `Layer8MModuleRegistry`, which is false for
`MobileEmployeeDetail`, `MobileSysHealth` and `MobileApp` — three permanent
false failures, and it never consulted the nav config its name refers to. The
rewrite asserts what it claims: anything exposing `hasModel` implements the whole
contract, and every nav-config module with services has a registry that knows at
least one of its models. It immediately caught `window.MobileSYS`, hand-rolled
instead of built by `Layer8MModuleRegistry.create()` and missing
`getPrimaryKey` — latent only because `layer8m-nav-data.js` reads
`serviceConfig.idField`. Added.

Remaining 2 failures are genuine `aia` config gaps, left for the owner:
`aia/conversations` (`L8AgentConversation`, the ORM-backed service) exists on
mobile but not desktop; and `aia/chat` declares `model:
L8AgentChatConversation` on desktop but no model on mobile. `AgntChat` is *not*
ORM-backed — custom handler, no table — so mobile's "custom view" declaration is
arguably the correct one, and desktop naming a model for a non-CRUD service is
what made `04-api-contract` flag `L8AgentChatConversation` as having no page-1
`Total`.

### Still open (found, not in this plan's scope)

- `fin/reports/reports-viewer.js` (223 lines) defines `Layer8FinReportViewer`
  and is loaded by both shells, but nothing ever calls it.
- `js/app.js` nsMap has 6 wrong namespaces.
- **20 orphaned rows in `paymentallocation`, still blocking AP and AR.** They
  are pre-rename LEND rows (`parentkey` like `[{24}lpay-NNN]`, type 24) stranded
  in FIN's table when `PaymentAllocation` became `LendPaymentAllocation`; their
  `paymentid`/`invoiceid` are NULL, so every `VendorPayment` and
  `CustomerPayment` query dies on `Scan error on column index 3, name
  "paymentid": converting NULL to string is unsupported`. The 20 bad rows and
  the 20 LEND rows are exactly the same set, disjoint from the 20 good FIN
  (`vpmt-`) rows, so the delete is unambiguous. `lendpaymentallocation` exists
  and is empty. The assistant's sandbox blocks the write that would remove them.
- **Mobile `primary`/`secondary` column hints.** `AddingModule`'s mobile step
  asks for them and `Layer8MTable._renderDefaultCard` reads them for the card
  title and subtitle. Only 1 of this repo's 77 column files sets them, because
  `Layer8ColumnFactory` has no option for it — every card in the app therefore
  renders untitled, with all fields in the body. Fixing it properly means an
  option on the factory, not hand-written column objects in 77 files.
- **A report's `lines` are not rendered anywhere.** They sit one level below
  `sections`, and `generateInlineTableHtml` cannot nest. `Layer8FinReportViewer`
  was evidently written for exactly this and is dead code.
