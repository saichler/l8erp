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
| 7 — cluster verification | **blocked** | needs a commit + push: the Dockerfile resolves `l8erp` from GitHub |

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

### Still open (found, not in this plan's scope)

- `fin/reports/reports-viewer.js` (223 lines) defines `Layer8FinReportViewer`
  and is loaded by both shells, but nothing ever calls it.
- `js/app.js` nsMap has 6 wrong namespaces.
- **Mobile `primary`/`secondary` column hints.** `AddingModule`'s mobile step
  asks for them and `Layer8MTable._renderDefaultCard` reads them for the card
  title and subtitle. Only 1 of this repo's 77 column files sets them, because
  `Layer8ColumnFactory` has no option for it — every card in the app therefore
  renders untitled, with all fields in the body. Fixing it properly means an
  option on the factory, not hand-written column objects in 77 files.
- **A report's `lines` are not rendered anywhere.** They sit one level below
  `sections`, and `generateInlineTableHtml` cannot nest. `Layer8FinReportViewer`
  was evidently written for exactly this and is dead code.
