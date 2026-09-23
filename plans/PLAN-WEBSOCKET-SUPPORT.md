# Plan: Enable WebSocket Real-Time Updates in L8ERP

## Context

The Layer 8 framework recently added WebSocket support for real-time data updates. The probler project has already integrated it end-to-end. The l8erp project has all the infrastructure pre-built (both backend in vendored `l8web` and frontend in `l8ui`), but it is not wired up — the WebSocket client script is not loaded in any HTML file, `Layer8DWebSocket.init()` is never called, and the `L8NotificationSet` type is not registered in the UI server.

**Goal:** Wire up WebSocket support so that when data changes on the server (CRUD operations), connected browser clients receive real-time notifications and tables/dashboards auto-refresh.

**Scope:** This is an **activation** plan — all WebSocket infrastructure already exists in l8erp's vendored dependencies and l8ui library. No new components are created. The work is purely wiring: adding script tags, calling `init()`, and registering one Go type. No vendored code, l8ui library code, or framework interfaces are modified.

**Reference implementation:** `../probler/go/prob/newui/` — fully working WebSocket integration.

## How It Works (Architecture)

```
Browser                          Server (l8web framework)
  |                                |
  |-- Layer8DWebSocket.init() ---> |-- /ws endpoint (WebSocketManager)
  |   (ws:// + bearer token)       |   (validates token, registers connection)
  |                                |
  |                                |-- CRUD operation on any service
  |                                |   (BaseServiceNotifications creates L8NotificationSet)
  |                                |   (multicasts to "websock" service via L8Bus)
  |                                |
  |<-- JSON: {action, modelType,   |-- WsNotifyService.OnNotification()
  |     primaryKey} --------------- |   (broadcasts to connected clients)
  |                                |
  |-- Layer8DDataSource handles:   |
  |   update -> patch item in-place|
  |   add/delete -> refetch page   |
```

The l8ui data sources (`layer8d-data-source.js`, `layer8m-data-source.js`, `layer8d-table-data.js`) already contain the subscription code guarded by `typeof Layer8DWebSocket !== 'undefined'`. Tables with `realtime: true` will automatically subscribe. Currently this guard always evaluates to false because the script isn't loaded.

## What Already Exists in L8ERP (No Changes Needed)

| Component | File | Status |
|-----------|------|--------|
| WebSocket server endpoint `/ws` | Vendored `l8web/go/web/server/WebService.go:124-131` | Activated automatically when web server starts |
| WebSocket connection manager | Vendored `l8web/go/web/server/WebSocketManager.go` | Handles auth, ping/pong, connection pool |
| Notification multicast service | Vendored `l8web/go/web/server/WsNotifyService.go` | Receives L8Bus multicasts, forwards to WS clients |
| Notification publishing | Vendored `l8services/go/services/base/BaseServiceNotifications.go` | CRUD ops multicast L8NotificationSet to "websock" service |
| JS WebSocket client | `l8ui/shared/layer8d-websocket.js` (84 lines) | `init()`, `subscribe(model, cb)`, auto-reconnect |
| Desktop data source WS hooks | `l8ui/shared/layer8d-data-source.js:164-165` | Subscribes when `realtime: true` |
| Desktop table data WS hooks | `l8ui/edit_table/layer8d-table-data.js:84-85,145-146` | Adds `register=true` to query, subscribes |
| Mobile data source WS hooks | `l8ui/m/js/layer8m-data-source.js:143-144` | Same pattern as desktop |
| Mobile table WS hooks | `l8ui/m/js/layer8m-table.js:181-182` | Same pattern as desktop |
| Mobile table realtime extension | `l8ui/m/js/layer8m-table-realtime.js` (80 lines) | In-place card updates with animation |
| L8NotificationSet type | Vendored `l8types/go/types/l8notify/notification.pb.go` | Available in vendor |

## Changes Required

### Phase 1: Go Type Registration (1 file)

**File:** `go/erp/ui/shared_other.go`

1. Add import: `l8notify "github.com/saichler/l8types/go/types/l8notify"`
2. In `registerSysTypes()`, add: `resources.Registry().Register(&l8notify.L8NotificationSet{})`

This registers the notification type with the UI server's introspection/serialization system so WebSocket messages can be properly marshaled.

**Probler reference:** `../probler/go/prob/newui/main.go:28,64`

### Phase 2: Desktop Wiring (2 files)

**File:** `go/erp/ui/web/app.html`

Add the WebSocket script tag after `layer8d-config.js` (line 251) and before `layer8d-utils.js` (line 252). Insert as new line between these two existing lines. This matches probler's loading order where websocket loads immediately after config.

```html
<!-- Line 251: <script src="l8ui/shared/layer8d-config.js"></script> -->
<script src="l8ui/shared/layer8d-websocket.js"></script>
<!-- Line 252: <script src="l8ui/shared/layer8d-utils.js"></script> -->
```

**File:** `go/erp/ui/web/js/app.js`

Add WebSocket initialization after the AI agent bubble init (line 212) and before `loadSection('dashboard')` (line 215). This matches probler's pattern — init after auth/config/permissions, before first section load.

```javascript
if (typeof Layer8DWebSocket !== 'undefined') {
    Layer8DWebSocket.init();
}
```

### Phase 3: Mobile Wiring (2 files)

**File:** `go/erp/ui/web/m/app.html`

Two insertions:

1. Add the WebSocket script tag after `layer8d-config.js` (line 302) and before `layer8d-utils.js` (line 303). Insert as new line between these two existing lines. Same position as probler's mobile app.html.

```html
<!-- Line 302: <script src="../l8ui/shared/layer8d-config.js"></script> -->
<script src="../l8ui/shared/layer8d-websocket.js"></script>
<!-- Line 303: <script src="../l8ui/shared/layer8d-utils.js"></script> -->
```

2. Add the mobile table realtime extension after `layer8m-table-touch.js` (line 318) and before `layer8-csv-export.js` (line 319):

```html
<!-- Line 318: <script src="../l8ui/m/js/layer8m-table-touch.js"></script> -->
<script src="../l8ui/m/js/layer8m-table-realtime.js"></script>
<!-- Line 319: <script src="../l8ui/shared/layer8-csv-export.js"></script> -->
```

**File:** `go/erp/ui/web/m/js/app-core.js`

Add WebSocket initialization in `MobileApp.init()` after the AI agent bubble init (line 119) and before sidebar initialization (line 122). This matches probler's pattern.

```javascript
if (typeof Layer8DWebSocket !== 'undefined') {
    Layer8DWebSocket.init();
}
```

### Phase 4: Dashboard Live Updates (2 files)

**File:** `go/erp/ui/web/dashboard/dashboard-init.js`

After `DashboardStats.loadAll()` (line 27), add WebSocket subscriptions for all KPI models so dashboard cards auto-refresh when data changes. The subscription list comes from the KPI config in `dashboard-config.js`.

Pattern (from probler's `dashboard-init.js:257-267`):
```javascript
if (typeof Layer8DWebSocket !== 'undefined' && window.DashboardConfig) {
    var refreshTimer = null;
    DashboardConfig.kpis.forEach(function(kpi) {
        Layer8DWebSocket.subscribe(kpi.model, function() {
            clearTimeout(refreshTimer);
            refreshTimer = setTimeout(function() {
                DashboardStats.loadAll();
            }, 1000);
        });
    });
}
```

This debounces rapid updates into a single dashboard refresh after 1 second of quiet.

**File:** `go/erp/ui/web/dashboard/dashboard-stats.js`

Add a `loadKPIById` method so individual KPI cards can be refreshed without reloading all of them (optimization for targeted updates). However, given l8erp has 12 KPIs across different models, the debounced `loadAll()` approach is simpler and sufficient for Phase 4. This can be optimized later if needed.

No changes needed to `dashboard-stats.js` for the initial implementation.

## Traceability Matrix

| # | Gap | Platform | Phase | File |
|---|-----|----------|-------|------|
| 1 | L8NotificationSet type not registered in UI server | Backend | Phase 1 | `go/erp/ui/shared_other.go` |
| 2 | WebSocket client script not loaded in desktop HTML | Desktop | Phase 2 | `go/erp/ui/web/app.html` |
| 3 | `Layer8DWebSocket.init()` not called in desktop app | Desktop | Phase 2 | `go/erp/ui/web/js/app.js` |
| 4 | WebSocket client script not loaded in mobile HTML | Mobile | Phase 3 | `go/erp/ui/web/m/app.html` |
| 5 | Mobile table realtime extension not loaded | Mobile | Phase 3 | `go/erp/ui/web/m/app.html` |
| 6 | `Layer8DWebSocket.init()` not called in mobile app | Mobile | Phase 3 | `go/erp/ui/web/m/js/app-core.js` |
| 7 | Dashboard KPIs don't auto-refresh on data changes | Desktop | Phase 4 | `go/erp/ui/web/dashboard/dashboard-init.js` |

## What About Portal Dashboards?

The ESS, Manager, and Vendor portals (`ess/`, `mgr/`, `vendor/`) have their own dashboard JS files but no separate `app.html` — they are subdirectories served by the main web server. Their dashboard files load within the main `app.html` context, so they will inherit the WebSocket connection from the parent page. Portal-specific WebSocket subscriptions can be added as a follow-up if needed, but the core wiring in this plan enables the infrastructure they would use.

### Phase 5: End-to-End Verification

#### Build Verification
- [ ] Backend: `cd go && go build -o /dev/null ./erp/ui/main/` compiles without errors

#### Desktop Verification
- [ ] Desktop: After login, DevTools > Network > WS tab shows `/ws?token=...` connection established and stays open
- [ ] Desktop: Open two browser tabs. Tab A: view Employee list. Tab B: edit an employee and save. Tab A auto-refreshes (if table has `realtime: true`)
- [ ] Desktop: Open dashboard, create a new Employee in another tab. Dashboard "Total Employees" card updates within ~1 second
- [ ] Desktop: Navigate through all major sections (HCM, FIN, SCM, Sales, MFG, CRM, PRJ, BI, DOC, ECOM, COMP, SYS). Verify tables load, detail popups open, CRUD works

#### Mobile Verification
- [ ] Mobile: After login on `/m/app.html`, DevTools > Network > WS tab shows `/ws?token=...` connection established
- [ ] Mobile: Same two-tab live update test as desktop on mobile UI
- [ ] Mobile: Navigate through all major sections via card navigation. Verify tables load, detail popups open, CRUD works

#### Cross-Platform Verification
- [ ] Reconnection: Kill and restart the backend server. Verify the WebSocket reconnects automatically on both desktop and mobile (exponential backoff 1s -> 30s)
- [ ] No regression: The WebSocket integration is additive — all subscription code is guarded by `typeof Layer8DWebSocket !== 'undefined'` and `realtime: true` checks, so non-realtime tables are unaffected. Confirm no behavioral changes in any section

## Rule Compliance Notes

| Rule | Status | Notes |
|------|--------|-------|
| `never-touch-vendor-or-git.md` | Compliant | No vendor or git operations. L8NotificationSet already vendored. |
| `desktop-script-loading-order.md` | Compliant | WebSocket script loads after config, before utils (matches probler). |
| `mobile-script-loading-order.md` | Compliant | Same position as desktop; realtime loads after table-touch. |
| `plan-platform-completeness.md` | Compliant | Traceability matrix has Platform column. Phases cover backend, desktop, and mobile. Verification has per-platform checkboxes. |
| `plan-traceability-and-verification.md` | Compliant | Traceability matrix maps all 7 gaps to phases. Phase 5 is formal verification with per-platform items. |
| `mobile-rules.md` | Compliant | Mobile wiring (Phase 3) mirrors desktop wiring (Phase 2). |
| `framework-interface-boundaries.md` | N/A | No framework interfaces modified. Type registration uses existing `Registry().Register()` API — same pattern as existing `EventRecord` registration. |
| `events-service-required.md` | N/A | l8events is already active (`EventRecord` registered in `registerSysTypes`). |
| `l8ui-no-project-specific-code.md` | Compliant | No l8ui files modified. All changes are in l8erp project files. |
| `maintainability.md` | Compliant | No file approaches 500 lines. dashboard-init.js grows from 28 to ~42 lines. |

## Risk Assessment

**Low risk.** All changes are additive:
- The Go change adds one type registration — cannot break existing types
- The HTML changes add script tags — existing scripts are untouched
- The JS changes add guarded `init()` calls — if WebSocket fails to connect, the app continues normally (graceful degradation is built into `layer8d-websocket.js`)
- Data source subscription code already exists in l8ui with defensive guards — enabling it just means the guard condition (`typeof Layer8DWebSocket !== 'undefined'`) now evaluates to true
- Tables only subscribe when `realtime: true` is set, which no current l8erp config uses yet — so table behavior is unchanged until explicitly opted in
