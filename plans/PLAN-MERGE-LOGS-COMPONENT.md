# Plan: Merge Logs Generic Component from Probler to L8ERP L8UI

## Current State

The logs component files (`l8logs.js`, `l8logs.css`) have already been copied from `problerweb/l8ui/sys/logs/` to `go/erp/ui/web/l8ui/sys/logs/` and are byte-for-byte identical. The following integration points are also already in place:

- `l8sys-config.js` - logs module entry (lines 45-49)
- `l8sys-init.js` - `L8Logs.initialize()` call (line 38)
- `system.html` - logs tab button + content container (lines 109-112, 148-151)
- `app.html` - CSS include (line 71) + JS include (line 534)

## Backend Service

The logs backend already exists at `go/logs/vnet/`:
- **Service Area**: 87 (`LogServiceArea`)
- **Service Name**: `"logs"` (`LogServiceName`)
- **Vnet Port**: 35005 (`ERP_LOGS_VNET`)
- **Storage**: `/data/logsdb/erp/<source-ip>/<filename>`
- **Architecture**: Two components - vnet server (aggregator) + agent (collector per node)
- **Endpoint**: `/87/logs` - matches what `l8logs.js` calls via `Layer8DConfig.resolveEndpoint('/87/logs')`

The backend supports:
1. **Directory listing** (path="*"): Returns recursive file tree as `L8File` objects
2. **File content** (path + name): Returns paginated 5KB chunks with total size

No backend work needed - the service is fully functional.

## Issue: DOM Scoping Violation

`l8logs.js` lines 200 and 263 use hardcoded `document.querySelector` with `probler-popup-*` selectors:
```javascript
// Line 200
var popupBody = document.querySelector('#layer8d-popup-root .probler-popup-overlay:not(.stacked) .probler-popup-body');

// Line 263
document.querySelectorAll('#layer8d-popup-root .probler-popup-overlay:not(.stacked) .l8logs-pagination-btn')
```

All other sys components (`l8security-users-crud.js`, `l8security-roles-crud.js`, `l8security-credentials-crud.js`) use `Layer8DPopup.getBody()` for popup DOM scoping. The logs component should follow the same pattern per the stacked-popup-dom-scoping rule.

**Fix**: Replace hardcoded selectors with `Layer8DPopup.getBody()`:
```javascript
// Line 200 - replace with:
var popupBody = Layer8DPopup.getBody();

// Line 263 - replace with:
var body = Layer8DPopup.getBody();
if (body) {
    body.querySelectorAll('.l8logs-pagination-btn').forEach(function(btn) { ... });
}
```

## Proposed Steps

### Step 1: Fix DOM Scoping (l8logs.js) - both projects
- Replace `document.querySelector('#layer8d-popup-root .probler-popup-overlay:not(.stacked) .probler-popup-body')` with `Layer8DPopup.getBody()`
- Replace `document.querySelectorAll('#layer8d-popup-root .probler-popup-overlay:not(.stacked) .l8logs-pagination-btn')` with scoped query via `Layer8DPopup.getBody()`
- Apply the same fix to both:
  - `go/erp/ui/web/l8ui/sys/logs/l8logs.js`
  - `problerweb/l8ui/sys/logs/l8logs.js`

## Files to Modify

| File | Change |
|------|--------|
| `go/erp/ui/web/l8ui/sys/logs/l8logs.js` | Fix DOM scoping (2 locations) |
| `problerweb/l8ui/sys/logs/l8logs.js` | Backport same DOM scoping fix |
