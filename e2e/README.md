# l8erp end-to-end suite

Playwright suite driving the **real deployed app** against a **real KIND
cluster**, per `PostImplementationE2ETesting` in
`../../l8book/layer-8-guide-lines.md`.

`go/tests/` proves the API contract. It cannot see what only rendering, CSS and
real framework wiring can break. Every finding listed at the bottom of this file
was invisible to `go/tests/` and shipped.

## Layout

```
e2e/
├── playwright.config.ts     desktop + mobile projects, concurrency, retries
├── fixtures/
│   ├── env.ts               base URL, credentials, shell paths
│   ├── api.ts               direct API client (auth, L8Query, CRUD, cleanup)
│   ├── test.ts              the test fixture: api / app / mobile / consoleErrors
│   ├── globals.ts           l8ui global resolution (window + global lexical)
│   ├── inventory.ts         typed accessors over inventory.json
│   └── inventory.json       GENERATED -- do not hand-edit
├── pages/
│   ├── LoginPage.ts         the standalone login shell
│   ├── DesktopNav.ts        sidebar, module tabs, sub-nav, service containers
│   ├── DesktopTable.ts      Layer8DTable: rows, paging, filter, sort, export
│   ├── Popup.ts             Layer8DPopup + the forms inside it
│   └── MobileNav.ts         MobileNav + MobileTable for the mobile bundle
├── tests/desktop/           8 spec files
├── tests/mobile/            3 spec files
└── tools/
    ├── shell-loader.js      loads a shell's scripts into a DOM stub
    └── generate-inventory.js  writes fixtures/inventory.json
```

## Running

```bash
npm install
npx playwright install chromium

npm run inventory      # regenerate coverage from the shipped configs
npm test               # everything
npm run test:smoke     # @smoke only
npm run test:desktop
npm run test:mobile
npm run report
```

Point it somewhere else with env vars (`fixtures/env.ts` lists them all):

```bash
L8ERP_BASE_URL=https://localhost:2773 L8ERP_USER=operator L8ERP_PASS='Oper123!' npm test
```

## Coverage is generated, not hand-maintained

`tools/generate-inventory.js` loads `app.html` and `m/app.html` in a DOM stub,
executes every script tag in order, and reads the **real** module configs off
the resulting globals. That produces `fixtures/inventory.json`:

| Shell | Sections / modules | Services |
|---|---|---|
| desktop (`app.html`, 388 scripts) | 13 sections, 56 modules | **256** |
| mobile (`m/app.html`, 341 scripts) | 14 modules | **249** |

The sweep specs iterate that inventory. A service added to a `*-config.js` is
covered on the next `npm run inventory` instead of quietly falling outside the
suite — which is the whole point: a hand-written list of 250 services goes stale
the first time someone adds one, and the spec that would have caught the
regression silently stops covering it.

**Re-run `npm run inventory` and commit the result** after changing any
`*-config.js`, nav config, or shell script list.

The generator is itself an audit: it reports any script that throws at load,
which is how the mobile Talent breakage below was found.

## What is covered

**Desktop**
| Spec | Covers |
|---|---|
| `00-shell-integrity` | every script tag resolves; no uncaught exception; no console error; every l8ui global defined; every namespace and section initializer present; all 6 portal shells load |
| `01-auth` | login, bad credentials, redirect when unauthenticated, `/permissions`, logout |
| `02-dashboard-and-navigation` | every KPI tile resolves and agrees with the API; every section renders every module pane and every service container |
| `03-service-coverage` | **all 256 services**: sub-nav present, the query is actually issued, the query is well-formed, the container resolves, columns are the configured ones and not the `DEFAULT_COLUMNS` fallback |
| `04-api-contract` | every model answers a paginated select; page-1 `Total` metadata; page 2 does not zero the total; bare GET rejected; health |
| `05-crud` | create / read / edit / row-click / delete through the UI, plus required-field validation |
| `06-table-features` | rows vs API, paging, filtering, sorting, detail popup, CSV export, page size |
| `07-view-system` | every declared view type registered; switchers render; every alternate view renders; no stale view after re-entry |
| `08-system-section` | Health, Modules, Logs, Data Import, and all 4 Security services |
| `09-permissions-and-theme` | permission map loaded and complete; restricted account sees less; write buttons follow permissions; theme tokens; dark mode |

**Mobile** — the real bundle at `/m/app.html`, never a resized desktop viewport.
| Spec | Covers |
|---|---|
| `00-shell-integrity` | same integrity checks against the mobile script set and nav config |
| `01-service-coverage` | **all 249 mobile services** drilled home → module → sub-module → service |
| `02-parity-and-features` | cards, paging, detail popup, back nav; desktop↔mobile service parity in both directions; `idField` casing |

## Hygiene rules this suite follows

From `PostImplementationE2ETesting`, all learned the hard way:

- **Clean up what you create.** `05-crud` deletes every row it makes in
  `afterEach`, through the API, keyed by a unique per-run code so parallel
  workers never collide. Cleanup runs through `safeCleanup`, which reports a
  failure but never lets it decide the test result.
- **Never assert an exact count against live data.** Assertions are about *the
  row this test created*, never a total.
- **Filter before asserting visibility.** Real data volume grows; a specific row
  is not guaranteed to land on page 1.
- **Scratch specs get a `zzz-` prefix and are deleted before moving on.**
  `npm run lint:scratch` fails if one is left behind.
- **A cached session goes stale after a pod restart.** This suite captures a
  fresh token per worker rather than persisting one, so a redeploy cannot leave
  it holding a token signed by a dead process.
- **Distinguish infra churn from a real bug.** `retries: 1`. A failure that
  reproduces in isolation is real; one that only appears under load is not.
- **Concurrency matches the deployment.** The target is one `erp-web` pod in
  front of one `erp` pod. Above ~3 browsers the backend queues and specs fail on
  timeouts unrelated to the code. `workers: 3` (2 in CI).

## Iterating on a fix

```bash
cd ../go/erp/ui && ./build.sh latest amd64
kind load docker-image saichler/erp-web:latest --name l8erp
kubectl delete pod -n l8erp erp-web-0
kubectl wait --for=condition=Ready pod/erp-web-0 -n l8erp --timeout=90s
cd ../../../e2e && npm test
```

Note that `erp-web` reads every web asset into memory at startup, so editing a
file under `go/erp/ui/web/` changes nothing until the image is rebuilt and the
pod replaced. A `kubectl cp` will not do it either.

## Findings from the first run

Every item here was found by this suite or by the inventory generator, and each
is invisible to `go/tests/`.

1. **7 shared scripts missing from all 8 shells** — `layer8-query-builder.js`,
   `layer8-form-chips.js`, `layer8-field-parsers.js`, `layer8-period-selector.js`,
   `layer8-inline-table-state.js`, `layer8-reference-config-resolver.js`,
   `layer8-datepicker-grid.js`. `Layer8DTable.buildQuery` calls
   `Layer8QueryBuilder` on its first line, so **every table in the app threw
   before issuing its query** — an empty table with no visible error, while the
   dashboard kept working because it builds its query text by hand. Fixed in the
   8 shells; `00-shell-integrity` now guards it.
   Not ERP-specific: the same file is missing from fmc, l8stocks, l8rubi,
   l8learn, l8vibe, l8id, l8vendingmachine and secscan-mobile.
2. **`js/app.js` `nsMap` has 6 wrong namespaces** — `MFG`/`CRM`/`BI`/`DOC`/
   `ECOM`/`COMP` against real `Mfg`/`Crm`/`Bi`/`Doc`/`Ecom`/`Comp`, and omits
   `lending` and `aia`. `Layer8DPermissionFilter` therefore resolves no model
   for 8 of 13 sections and never filters their sub-nav.
3. **`m/app.html` omits two Talent enum parts** — desktop loads
   `talent-enums-recruiting.js` and `talent-enums-performance.js` *before*
   `talent-enums.js`; mobile loads neither, so `talent-enums`, `talent-columns`
   and `talent-forms` all throw and **all 9 HCM Talent services fall back to
   `DEFAULT_COLUMNS` on mobile**.
4. **`layer8d-table-render.js:236` throws on a non-string renderer** —
   `value.replace(...)` on whatever `col.render()` returned. Renderers returning
   a number or boolean (`mfg/production` `quantityOrdered`, `crm/opportunities`
   `probability`/`sequence`/`isClosed`/`isWon`/`isActive`) throw, and
   `fetchData`'s catch relabels it `Error fetching data:` — so a render bug is
   reported as a network failure.

Items 2–4 are not yet fixed.
