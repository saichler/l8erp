# Plan: Port l8ui Updates from Probler to L8ERP

## Summary
3 files changed in probler's l8ui. Two are critical pagination bug fixes, one is a new feature.

## Changes

### 1. `l8ui/edit_table/layer8d-table-data.js` — Pagination Metadata Guard (CRITICAL)

**What**: Guard metadata reads to page 1 only; make `setServerData` defensive against 0 totalItems.

**File**: `go/erp/ui/web/l8ui/edit_table/layer8d-table-data.js`

**Change A** (lines 105-109 → 105-114): Replace the unconditional metadata read:
```javascript
// OLD (l8erp)
let totalCount = 0;
if (data.metadata?.keyCount?.counts) {
    totalCount = data.metadata.keyCount.counts.Total || 0;
}

// NEW (from probler)
let totalCount = 0;
if (page === 1 && data.metadata?.keyCount?.counts) {
    totalCount = data.metadata.keyCount.counts.Total || 0;
    this.totalItems = totalCount;
} else {
    totalCount = this.totalItems || 0;
}
```

**Change B** (lines 157-161 → 161-170): Make `setServerData` defensive:
```javascript
// OLD (l8erp)
Layer8DTable.prototype.setServerData = function(data, totalItems) {
    this.data = Array.isArray(data) ? data : Object.values(data);
    this.totalItems = totalItems || 0;
    this.render();
};

// NEW (from probler)
Layer8DTable.prototype.setServerData = function(data, totalItems) {
    this.data = Array.isArray(data) ? data : Object.values(data);
    if (totalItems > 0) {
        this.totalItems = totalItems;
    }
    this.render();
};
```

---

### 2. `l8ui/reference_picker/layer8d-reference-picker-data.js` — Pagination Metadata Guard (CRITICAL)

**What**: Same fix as above but for reference picker. Uses 0-based page indexing.

**File**: `go/erp/ui/web/l8ui/reference_picker/layer8d-reference-picker-data.js`

**Change** (lines 91-95 → 91-99): Replace the unconditional metadata read:
```javascript
// OLD (l8erp)
let totalCount = 0;
if (data.metadata?.keyCount?.counts) {
    totalCount = data.metadata.keyCount.counts.Total || 0;
}

// NEW (from probler)
let totalCount = 0;
if (state.currentPage === 0 && data.metadata?.keyCount?.counts) {
    totalCount = data.metadata.keyCount.counts.Total || 0;
} else {
    totalCount = state.totalItems || 0;
}
```

---

### 3. `l8ui/sys/health/l8health.js` — Memory Dump Download Feature

**What**: New `fetchMemoryDump()` function + button in health detail modal to download pprof memory profiles from running services.

**File**: `go/erp/ui/web/l8ui/sys/health/l8health.js`

**Change A**: Insert `fetchMemoryDump()` function (46 lines) after the `escapeHtml` function (after line 147), before `showHealthDetailsModal`.

**Change B**: Update `showHealthDetailsModal` to add `onShow` callback that wires the memory dump button:
```javascript
Layer8DPopup.show({
    id: 'health-detail-modal',
    title: 'Service Health - ' + rowData.service,
    size: 'xlarge',
    content: contentHtml,
    showFooter: false,
    onShow: function(body) {
        var btn = body.querySelector('#l8health-memory-dump-btn');
        if (btn) {
            btn.addEventListener('click', function() {
                fetchMemoryDump(rawData, btn);
            });
        }
    }
});
```

**Change C**: Add memory dump button HTML at the end of `generateHealthDetailContent()` return string (before the closing of the function), after the last `</div>`:
```html
<div style="text-align:right;padding:12px 16px 4px;">
    <button id="l8health-memory-dump-btn" class="layer8d-btn layer8d-btn-primary layer8d-btn-small">Memory Dump</button>
</div>
```

## Execution Order
1. Fix `layer8d-table-data.js` (Change A + B)
2. Fix `layer8d-reference-picker-data.js`
3. Add memory dump feature to `l8health.js` (Change A + B + C)

## Verification
```bash
# Confirm pagination guards are in place
grep -n "page === 1 && data.metadata" go/erp/ui/web/l8ui/edit_table/layer8d-table-data.js
grep -n "currentPage === 0 && data.metadata" go/erp/ui/web/l8ui/reference_picker/layer8d-reference-picker-data.js
grep -n "totalItems > 0" go/erp/ui/web/l8ui/edit_table/layer8d-table-data.js

# Confirm memory dump feature
grep -n "fetchMemoryDump" go/erp/ui/web/l8ui/sys/health/l8health.js
grep -n "memory-dump-btn" go/erp/ui/web/l8ui/sys/health/l8health.js

# Syntax check all modified files
node -c go/erp/ui/web/l8ui/edit_table/layer8d-table-data.js
node -c go/erp/ui/web/l8ui/reference_picker/layer8d-reference-picker-data.js
node -c go/erp/ui/web/l8ui/sys/health/l8health.js
```
