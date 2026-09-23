# PLAN — Full Playwright E2E Coverage for l8erp

**Status:** awaiting approval. Nothing in this plan is implemented.

**Goal:** every model, submodule, screen, table and popup — desktop and mobile —
exercised end to end against a real KIND-deployed cluster.

Governed by `PostImplementationE2ETesting`, `PlanRequirements`, `MobileRules`
(desktop/mobile parity) and `TestLocationAndApproach` in
`../l8book/layer-8-guide-lines.md`.

---

## 1. The coverage universe

Measured, not estimated — extracted by executing every script tag of both
shells and reading the shipped configs (`e2e/tools/generate-inventory.js`).

| Dimension | Count |
|---|---|
| HTML entry points (screens) | **20** |
| — desktop shells | `app.html` + 6 portals + `index.html` = 8 |
| — mobile shells | `m/app.html` + 6 portals + `m/index.html` = 8 |
| — auth screens | login, forgot-password, reset-password, register = 4 |
| Desktop sections | 15 (13 module + dashboard + system) |
| Desktop modules (submodules) | 56 |
| Desktop services | **256** |
| Desktop submodule namespaces | 65 |
| Mobile modules | 14 |
| Mobile services | **249** |
| Mobile module registries / models | 17 / 240 |
| Form definitions | **254** |
| Form sections / fields | 623 / **3 563** |
| Distinct field types | 16 (`checkbox, date, datetime, ein, file, inlineTable, money, number, period, reference, select, ssn, text, textarea, time, url`) |
| `inlineTable` fields (child entities) | **142** |
| Distinct `lookupModel`s (reference pickers) | **90** |
| Services with alternate views | 50 |
| Alternate view instances | kanban 22, chart 11, calendar 10, tree 7, gantt 4, timeline 2 |
| SYS services | 8 (health, modules, logs, dataimport, security×4) |

### Popup / dialog surfaces to cover
Add form · Edit form · View (read-only) form · Delete confirmation ·
Reference picker · Date picker · Inline-table row editor · Export menu ·
Notification toasts (success/error/warning/info) · Stacked popups
(`StackedPopupDomScoping`) · Mobile popup + mobile confirm + mobile date picker
+ mobile reference picker.

---

## 2. What exists today

`e2e/` currently holds **210 tests in 13 files** (183 desktop, 27 mobile):
shell integrity ×2, auth, dashboard+navigation, desktop service sweep (256
services), API contract, CRUD (**1 model**), table features (**1 model**), view
system (53), system section, permissions+theme, mobile shell integrity, mobile
service sweep (249 services), mobile parity.

**It proves services load. It does not prove they work.** The gaps this plan
closes:

| Gap | Today | Target |
|---|---|---|
| Create / edit / delete | 1 of 256 models | all writable models |
| Detail (view) popup | 1 model | all models with data |
| Form field rendering | incidental | all 254 forms, all 3 563 fields |
| Reference pickers | 0 interactions | all 90 lookup models |
| Inline tables (child entities) | 0 | all 142 |
| Field-type behaviour | 0 | all 16 types |
| Mobile CRUD / forms / pickers | 0 | parity with desktop |
| Portal shells | load-only | full nav + tables per portal |
| Mobile portal shells | **not covered at all** | load + nav |
| Auth screens | login only | + register, forgot, reset, TFA |
| Data Import / Logs / Agent chat / Security CRUD | render-only | full flows |
| Exports (CSV/Excel/PDF) | 1 table, CSV | all offered formats |
| Realtime (WebSocket) | 0 | services declaring `realtime` |

---

## 3. Duplication audit (`PlanRequirements`)

Required before writing to `./plans/`.

Walking the existing suite and the planned additions, the behavioural logic
that would otherwise be copied is:

| Behaviour | Instances if copied | Behavioural lines each | Product |
|---|---|---|---|
| "navigate to service, wait for resolve, assert" | desktop sweep + CRUD + forms + views + exports + realtime = 6 | ~35 | 210 |
| "open popup, assert fields, fill, save, verify, clean up" | desktop CRUD + mobile CRUD + inline-table + portal = 4 | ~60 | 240 |
| "seed a record via API, use it, delete it" | ~8 specs | ~25 | 200 |
| mobile drill-down navigation | mobile sweep + mobile CRUD + mobile forms + mobile portal = 4 | ~30 | 120 |

All four exceed the `behavioural_lines × instances > 100` threshold, so
**extraction is mandatory and becomes Phase 0.** Per the Second Instance Rule,
these are extracted before the second consumer is written, not after.

Phase 0 deliverables (all in `e2e/`):
- `fixtures/record.ts` — `withSeededRecord(model, fn)`: create via API, hand the
  id to the spec, delete in `afterEach` through `safeCleanup`.
- `fixtures/formdata.ts` — derives a valid payload for any form definition from
  its field types (`money`→cents, `date`→timestamp, `reference`→an existing id
  fetched from the lookup model, `select`→first non-zero enum, …). This is what
  makes CRUD across 256 models tractable instead of 256 hand-written fixtures.
- `pages/ServiceScreen.ts` — one object composing nav + table + popup for a
  `(section, module, service)` triple, desktop and mobile behind one interface.
- `drivers/crud.ts`, `drivers/forms.ts`, `drivers/views.ts` — the shared
  assertion bodies the per-platform specs call.

Specs stay **data-only**: which services, which expectations. All behaviour in
the drivers — the same Config-vs-Logic split `Maintainability` requires of
module files.

---

## 4. Component × Platform audit (`PlanRequirements` — Platform Completeness)

| Component | Desktop | Mobile | Phase |
|---|---|---|---|
| Shell integrity / script audit | ✅ exists | ✅ exists | — |
| Section & module navigation | ✅ exists | ✅ exists | — |
| Service load sweep | ✅ 256 | ✅ 249 | — |
| Table render + columns | ✅ sweep | ✅ sweep | — |
| Table paging / filter / sort | 1 model | 1 model | 2 |
| Detail (view) popup | 1 model | 1 model | 2 |
| Add form render (all fields) | ✗ | ✗ | 3 |
| Create | 1 model | ✗ | 4 |
| Edit prefill + update | 1 model | ✗ | 4 |
| Delete + confirmation | 1 model | ✗ | 4 |
| Validation (required, type) | 1 form | ✗ | 3 |
| Reference picker (90 models) | ✗ | ✗ | 5 |
| Date picker | ✗ | ✗ | 5 |
| Inline tables (142) | ✗ | ✗ | 6 |
| Field types (16) | ✗ | ✗ | 3 |
| File upload | ✗ | ✗ | 6 |
| Alternate views (50 services) | ✅ 53 tests | ✗ | 7 |
| Exports CSV/Excel/PDF | 1 table/CSV | ✗ | 8 |
| SYS: health/modules/logs/import/security | render-only | ✗ | 9 |
| Agent chat | ✗ | ✗ | 9 |
| Realtime / WebSocket | ✗ | ✗ | 10 |
| Permissions filtering | ✅ | ✗ | 11 |
| Theme / dark mode | ✅ | ✗ | 11 |
| Portals (6 desktop, 6 mobile) | load-only | ✗ | 12 |
| Auth: login/register/forgot/reset/TFA | login only | ✗ | 13 |

---

## 5. Phases

Each phase is independently mergeable and leaves the suite green.

**Phase 0 — Shared drivers (mandatory extraction).**
`fixtures/record.ts`, `fixtures/formdata.ts`, `pages/ServiceScreen.ts`,
`drivers/*.ts`. Retrofit the existing CRUD and table specs onto them so there is
exactly one implementation before the second consumer lands.

**Phase 1 — Inventory expansion.** Extend `generate-inventory.js` to emit, per
service: the form definition (field key/type/required/readOnly), `lookupModel`
references, inline-table child schemas, view configs, `realtime` flag, and the
mobile column/form registry. Everything after this is driven from that file.

**Phase 2 — Table depth, all services.** For every service with data: paging
past page 1 (and the `Layer8DTablePaginationMetadata` total-preservation guard),
column filter, sort-by in the re-issued query, row click → detail popup showing
`select *` fields. Desktop + mobile.

**Phase 3 — Form rendering, all 254 forms.** Open the Add form for every
service; assert every configured section and field renders, required markers
present, `readOnly` fields display-only, and each of the 16 field types renders
its expected control. Assert validation blocks an empty required save. No writes.

**Phase 4 — Write path, all writable models.** Using `formdata.ts`: create →
read back by filter → edit (assert prefill) → update → delete, per service,
cleaned up in `afterEach`. Services whose payload cannot be derived are
**skipped with an explicit named reason**, and the count of skips is itself
asserted not to grow.

**Phase 5 — Pickers.** All 90 `lookupModel`s: open picker, search, select,
assert the id is stored and the display value shown. Date picker: open, pick,
assert timestamp; the `0 = Current` case. Desktop + mobile.

**Phase 6 — Child entities.** All 142 inline tables: render, add row, edit row,
delete row, persistence through parent save. Includes
`StackedPopupDomScoping` (a child popup over a parent must not read the
parent's duplicate ids) and `CompoundFormFieldDataCollection` (`money` sub-fields).
File upload where a `file` field exists.

**Phase 7 — Views on mobile.** Mirror the 53 desktop view tests against the
mobile view factory; assert `MobileRules` parity for every service declaring an
alternate view.

**Phase 8 — Exports.** Every table offering an export: CSV, Excel, PDF —
download fires, file is non-empty, and the CSV's header row matches the
configured columns.

**Phase 9 — SYS + Agent.** Data Import (template CRUD, AI mapping, transfer,
execute), Logs (tree, pagination), Security (users/roles/credentials/events
CRUD), Modules toggle-tree save round-trip, Health, Agent chat
(send/receive/conversation switch). Desktop + mobile where a mobile surface exists.

**Phase 10 — Realtime.** For services with `realtime: true`: subscribe, mutate
via API from a second client, assert the open table updates without a reload.

**Phase 11 — Cross-cutting on mobile.** Permission filtering and theme/dark mode
on the mobile shell, matching the existing desktop specs.

**Phase 12 — Portals.** All 6 desktop and all 6 mobile portal shells: load,
authenticate as the portal's own role, navigate, tables render, scoped data only
(a customer portal must not see another customer's rows — the `ScopeView` path).

**Phase 13 — Auth screens.** Register (+ CAPTCHA), forgot-password,
reset-password, TFA setup and challenge, must-change-password, session timeout.

**Phase 14 — Final verification.** Full suite, both platforms, against a
freshly recreated cluster (`kind-stop.sh && kind-start.sh`) for a clean-data
baseline; then a second run on the *same* cluster to prove every spec cleans up
after itself and is re-runnable. `find e2e/tests -name "zzz-*"` must be empty.

---

## 6. Traceability matrix

| # | Area | Gap / action item | Platform | Phase |
|---|---|---|---|---|
| 1 | Suite | Shared drivers extracted before second consumer | both | 0 |
| 2 | Inventory | Forms, lookups, inline tables, view configs, realtime | both | 1 |
| 3 | Tables | Paging + total preservation, all services | both | 2 |
| 4 | Tables | Column filter, all filterable columns | both | 2 |
| 5 | Tables | Sort re-issues query with `sort-by` | both | 2 |
| 6 | Popups | Detail popup shows `select *` fields | both | 2 |
| 7 | Forms | All 254 forms render all 3 563 fields | both | 3 |
| 8 | Forms | 16 field types render correct controls | both | 3 |
| 9 | Forms | `readOnly` fields display-only | both | 3 |
| 10 | Forms | Required-field validation blocks save | both | 3 |
| 11 | CRUD | Create, all writable models | both | 4 |
| 12 | CRUD | Edit prefill + update | both | 4 |
| 13 | CRUD | Delete + confirmation dialog | both | 4 |
| 14 | Pickers | 90 reference lookups | both | 5 |
| 15 | Pickers | Date picker incl. `0 = Current` | both | 5 |
| 16 | Children | 142 inline tables, row CRUD | both | 6 |
| 17 | Children | Stacked-popup DOM scoping | both | 6 |
| 18 | Children | Compound `money` field collection | both | 6 |
| 19 | Files | Upload + download where `file` fields exist | both | 6 |
| 20 | Views | 50 services × alternate views | mobile | 7 |
| 21 | Export | CSV / Excel / PDF, all offering tables | both | 8 |
| 22 | SYS | Data Import full flow | both | 9 |
| 23 | SYS | Logs tree + pagination | both | 9 |
| 24 | SYS | Security users/roles/credentials/events CRUD | both | 9 |
| 25 | SYS | Modules toggle-tree save round-trip | both | 9 |
| 26 | Agent | Chat send/receive/conversation switch | both | 9 |
| 27 | Realtime | WebSocket-driven table updates | both | 10 |
| 28 | Permissions | Filtering on mobile | mobile | 11 |
| 29 | Theme | Tokens + dark mode on mobile | mobile | 11 |
| 30 | Portals | 6 desktop portals: nav, tables, scoped data | desktop | 12 |
| 31 | Portals | 6 mobile portals (currently zero coverage) | mobile | 12 |
| 32 | Auth | Register + CAPTCHA | both | 13 |
| 33 | Auth | Forgot / reset password | both | 13 |
| 34 | Auth | TFA setup + challenge | both | 13 |
| 35 | Auth | Must-change-password, session timeout | both | 13 |
| 36 | All | Clean-baseline + re-runnable verification | both | 14 |

No orphans: every row in §4 maps to a phase.

---

## 7. L8UI includes audit (`PrdL8uiIncludesAudit`)

This plan adds no l8ui file and changes no shell, so the per-file include audit
is unchanged. It is instead **enforced** by the suite: `00-shell-integrity`
(desktop and mobile) asserts every `<script src>` resolves and every required
global is defined, and `generate-inventory.js` fails on any script that throws
at load. That is a stronger, executable form of the audit than a static table,
and it currently passes for both shells after the 7 missing shared scripts were
added.

If a reviewer wants the literal per-file table in this document, say so and I
will generate it from `rules/desktop-script-loading-order.md` and
`rules/mobile-script-loading-order.md` — noting that both files are themselves
stale (they list none of the 7 shared scripts), which is tracked separately.

---

## 8. Rule compliance

| Rule | How this plan complies |
|---|---|
| `PostImplementationE2ETesting` | `e2e/` at project root; real KIND cluster; `fixtures/`+`pages/`+`tests/desktop/`+`tests/mobile/`; mobile = the real bundle; cleanup, no exact counts, filter-before-assert, `zzz-` hygiene |
| `PlanRequirements` | Duplication audit → Phase 0; Component×Platform audit; traceability matrix with Platform column; final verification phase |
| `MobileRules` | Every phase names both platforms; parity gaps are failures, not omissions |
| `TestLocationAndApproach` | Tests drive the system through its real API and UI; no internal calls; `go/tests/` untouched |
| `Maintainability` | Drivers hold behaviour, specs hold data; every file < 500 lines |
| `L8UINoProjectSpecificCode` | No l8ui edit; suite lives entirely in `e2e/` |
| `DemoDirectorySync` | `go/demo/` untouched |
| `FailFastNoSilentFallback` | Suite asserts on `pageerror`/`console.error` everywhere; no spec tolerates a silent degradation |
| `Layer8DTablePaginationMetadata` | Phase 2 asserts the total survives paging past page 1 |
| `StackedPopupDomScoping` | Phase 6 asserts child-popup scoping |
| `ReferenceRegistryCompleteness` | Phase 5 covers all 90 lookups (all currently registered — verified) |
| `ReportInfraBugs` | Findings are reported, never worked around in the spec |
| `VendorAndGit` | No git commands, no vendor changes |

---

## 9. Cost and risk

- **Scale.** ~1 200–1 600 tests at completion, versus 210 today. A full run
  against one erp pod at 3 workers is on the order of 1.5–3 hours. Phases 3–6
  dominate. Mitigation: tag phases so CI can run `@smoke` per PR and the full
  sweep nightly.
- **Write coverage is the hard part.** Phase 4 depends on `formdata.ts`
  deriving valid payloads from form definitions. Cross-module foreign keys make
  some models unseedable without ordering; those are skipped with a named reason
  rather than silently dropped, and the skip list is asserted not to grow.
- **Live-cluster pollution.** Phases 4/6 create real rows. Cleanup is in
  `afterEach` via `safeCleanup`; Phase 14's second run on the same cluster is
  what proves it actually works.
- **Backend throughput, not test flakiness.** Concurrency is capped at 3 for a
  single-replica deployment. Raising it produces timeouts unrelated to the code
  — already observed.
- **Found-bug interference.** Open defects (below) will make some new specs fail
  on first write. Each must be triaged as app-bug vs spec-bug before being
  marked expected — the failure mode that cost three sweep runs in this session.

---

## 10. Open defects this suite has already found

Carried here so they are not lost; fixing them is **not** part of this plan.

1. `js/app.js` `nsMap` — 6 wrong namespace names (`MFG`/`CRM`/`BI`/`DOC`/`ECOM`/
   `COMP` vs `Mfg`/`Crm`/`Bi`/`Doc`/`Ecom`/`Comp`), `lending` and `aia` missing.
   `Layer8DPermissionFilter` resolves no model for 8 of 13 sections.
2. `m/app.html` omits `talent-enums-recruiting.js` and
   `talent-enums-performance.js`; all 9 HCM Talent services fall back to
   `DEFAULT_COLUMNS` on mobile.
3. `l8ui/edit_table/layer8d-table-render.js:236` — `value.replace()` on a
   non-string `col.render()` return throws; `fetchData`'s catch relabels it
   `Error fetching data:`. Affects `mfg/production`, `crm/opportunities` and
   others.
4. `aia/agent/chat` issues `select * from L8AgentChatConversation limit 20
   sort-by updatedAt descending` — no `page` clause.
5. 24 services whose table container never resolves within 20s — triage pending;
   some are (3) above, the rest unclassified.
6. Sidebar clicks are silently dropped during the ~2s boot window, because
   `js/app.js` attaches nav handlers only after five awaited round-trips.

---

## 11. Approval

This plan is written to `./plans/` and stops here, per `PlanRequirements`.
