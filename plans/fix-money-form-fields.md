# Fix: Money Form Fields — Restore Amount Input

## Context

Phase 14 changed `Money.currency_code` to `Money.currency_id` (FK to Currency service) and made the `type: 'money'` form field render a **compound widget** combining a Currency reference picker and an amount input into a single field. This is broken — users can only interact with the currency picker and **cannot enter an amount**.

The root cause: the currency selector is a **reference picker** — a `readonly` input that opens a modal table on click. When placed in a compact compound widget alongside the amount input, it captures clicks and prevents interaction with the amount field.

### Why Reference Picker is Wrong for This

A reference picker is designed for selecting from large datasets (employees, vendors, etc.) via a searchable modal. Currencies are a small, finite list (typically 5-20 active currencies). The correct UI element is a **`<select>` dropdown** — compact, instantly usable, and doesn't interfere with the adjacent amount input.

---

## Design: Currency `<select>` Dropdown + Amount Input

Each money field renders as a **compact `<select>` dropdown** (showing currency code like "USD") + an **editable amount input** side by side. The dropdown is populated from a currency cache that's loaded once on app startup.

```
[ USD ▼ ] [ $1,234.56    ]
```

### Currency Cache

`layer8d-utils.js` already has `_currencyCache` (maps currencyId → ISO code) and `setCurrencyCache()`, but **nothing calls it**. We need to:
1. Fetch currencies once on app startup
2. Store both the cache (for formatMoney lookups) and a list (for dropdown options)
3. Expose the list so form field renderers can build `<select>` dropdowns

---

## Step 1: Load currency cache on app startup

**File**: `go/erp/ui/web/l8ui/shared/layer8d-utils.js`

Add a `_currencyList` array alongside `_currencyCache`, and a `getCurrencyList()` getter:

```javascript
const _currencyCache = {};    // existing: currencyId → code
const _currencyList = [];     // NEW: [{ currencyId, code, name, symbol }]

function setCurrencyCache(currencies) {
    _currencyList.length = 0;
    for (const c of currencies) {
        if (c.currencyId && c.code) {
            _currencyCache[c.currencyId] = c.code;
            _currencyList.push({ currencyId: c.currencyId, code: c.code, name: c.name || c.code, symbol: c.symbol || '' });
        }
    }
}

function getCurrencyList() { return _currencyList; }
```

Export `getCurrencyList` alongside `setCurrencyCache`.

**File**: `go/erp/ui/web/js/app.js`

After `Layer8DConfig.load()` and bearer token check, fetch currencies:

```javascript
// Load currency cache for Money form fields
try {
    const query = encodeURIComponent(JSON.stringify({ text: 'select * from Currency where isActive=true' }));
    const resp = await fetch(`/erp/40/Currency?body=${query}`, {
        headers: { 'Authorization': `Bearer ${bearerToken}`, 'Content-Type': 'application/json' }
    });
    if (resp.ok) {
        const data = await resp.json();
        if (data.list) Layer8DUtils.setCurrencyCache(data.list);
    }
} catch (e) { console.warn('Failed to load currencies:', e); }
```

**File**: `go/erp/ui/web/m/js/app-core.js`

Same fetch for mobile app initialization.

---

## Step 2: Desktop — Replace reference picker with `<select>` dropdown

**File**: `go/erp/ui/web/l8ui/shared/layer8d-forms-fields.js`

Replace the `case 'money':` block (lines 90-110) with:

```javascript
case 'money': {
    const moneyObj = (typeof value === 'object' && value !== null) ? value : {};
    const amountValue = moneyObj.amount !== undefined ? moneyObj.amount : value;
    const currencyId = moneyObj.currencyId || '';

    // Currency <select> dropdown
    const currencies = Layer8DUtils.getCurrencyList();
    let selectHtml = `<select name="${field.key}.__currencyId" class="money-currency-select">`;
    selectHtml += '<option value="">--</option>';
    for (const c of currencies) {
        const sel = c.currencyId === currencyId ? ' selected' : '';
        selectHtml += `<option value="${escapeAttr(c.currencyId)}"${sel}>${escapeHtml(c.code)}</option>`;
    }
    selectHtml += '</select>';

    // Amount formatted input
    const amountField = { ...field, key: field.key + '.__amount', type: 'currency' };
    const amountHtml = generateFormattedInput(amountField, amountValue);

    inputHtml = `<div class="money-input-group">${selectHtml}${amountHtml}</div>`;
    break;
}
```

---

## Step 3: Desktop — Fix money data collection

**File**: `go/erp/ui/web/l8ui/shared/layer8d-forms-data.js`

Replace the `case 'money':` block (lines 109-125) with:

```javascript
case 'money': {
    const amountEl = form.elements[field.key + '.__amount'];
    const currencyEl = form.querySelector(`select[name="${field.key}.__currencyId"]`);
    let cents = null;
    if (amountEl) {
        if (typeof Layer8DInputFormatter !== 'undefined') {
            const raw = Layer8DInputFormatter.getValue(amountEl);
            cents = raw !== null && raw !== '' ? parseInt(raw, 10) : null;
        } else if (amountEl.dataset.rawValue) {
            cents = parseInt(amountEl.dataset.rawValue, 10);
            if (isNaN(cents)) cents = null;
        }
    }
    const currId = currencyEl ? currencyEl.value : '';
    value = cents != null ? { amount: cents, currencyId: currId } : null;
    break;
}
```

The only change from the current code is: read `currencyEl.value` (from `<select>`) instead of `currencyEl.dataset.refId` (from reference picker).

---

## Step 4: Desktop — Update compound widget CSS

**File**: `go/erp/ui/web/l8ui/popup/layer8d-popup-forms.css`

Replace the existing `.money-input-group` rules (lines 442-445) with:

```css
/* Money input group: currency dropdown + amount */
.money-input-group { display: flex; gap: 8px; align-items: stretch; }
.money-input-group .money-currency-select { width: 80px; min-width: 80px; flex-shrink: 0; }
.money-input-group .formatted-input-wrapper { flex: 1; }
```

Remove the `.money-input-group .reference-input` rule (no longer used).

---

## Step 5: Mobile — Replace reference picker with `<select>` dropdown

**File**: `go/erp/ui/web/l8ui/m/js/layer8m-forms-fields-reference.js`

Replace `F.renderMoneyField` with:

```javascript
F.renderMoneyField = function(config, value, readonly) {
    const moneyObj = (typeof value === 'object' && value !== null) ? value : {};
    const amountValue = moneyObj.amount !== undefined ? moneyObj.amount : value;
    const currencyId = moneyObj.currencyId || '';

    // Currency <select> dropdown
    const currencies = (window.Layer8DUtils && Layer8DUtils.getCurrencyList)
        ? Layer8DUtils.getCurrencyList() : [];
    let selectHtml = `<select name="${config.key}.__currencyId" class="mobile-money-currency-select"${readonly ? ' disabled' : ''}>`;
    selectHtml += '<option value="">--</option>';
    for (const c of currencies) {
        const sel = c.currencyId === currencyId ? ' selected' : '';
        selectHtml += `<option value="${Layer8MUtils.escapeAttr(c.currencyId)}"${sel}>${Layer8MUtils.escapeHtml(c.code)}</option>`;
    }
    selectHtml += '</select>';

    // Amount input
    const displayAmount = amountValue ? (amountValue / 100).toFixed(2) : '';
    const requiredAttr = config.required ? 'required' : '';
    const readonlyAttr = readonly ? 'readonly' : '';
    const amountHtml = `<input type="number" name="${config.key}.__amount"
        value="${displayAmount}" step="0.01" min="0"
        class="mobile-form-input mobile-money-amount"
        ${requiredAttr} ${readonlyAttr}>`;

    return `
        <div class="mobile-form-field">
            <label class="mobile-form-label">${Layer8MUtils.escapeHtml(config.label)}${config.required ? ' *' : ''}</label>
            <div class="mobile-money-input-group">
                ${selectHtml}
                ${amountHtml}
            </div>
        </div>
    `;
};
```

---

## Step 6: Mobile — Fix money data collection

**File**: `go/erp/ui/web/l8ui/m/js/layer8m-forms.js`

Update the money compound field post-processing. The `moneyKeys` loop currently reads `currencyId` from `dataset.refId` on the reference picker. Change it to read `.value` from the `<select>`:

```javascript
// In the moneyKeys loop:
const currSelect = form.querySelector(`select[name="${baseKey}.__currencyId"]`);
const currId = currSelect ? currSelect.value : '';
```

---

## Step 7: Mobile — Update compound widget CSS

**File**: `go/erp/ui/web/l8ui/m/css/layer8m-forms.css`

Replace the existing `.mobile-money-input-group` rules (lines 289-305) with:

```css
/* Money input group - currency dropdown + amount */
.mobile-money-input-group { display: flex; gap: 8px; align-items: stretch; }
.mobile-money-input-group .mobile-money-currency-select { width: 80px; min-width: 80px; flex-shrink: 0; }
.mobile-money-input-group .mobile-money-amount { flex: 1; }
```

Remove the `.mobile-money-input-group .reference-input` rule (no longer used).

---

## Files Summary

| File | Action |
|------|--------|
| `l8ui/shared/layer8d-utils.js` | Add `_currencyList` array + `getCurrencyList()` getter |
| `js/app.js` | Fetch currencies on startup, call `setCurrencyCache()` |
| `m/js/app-core.js` | Same currency fetch for mobile |
| `l8ui/shared/layer8d-forms-fields.js` | Replace reference picker with `<select>` dropdown in `case 'money':` |
| `l8ui/shared/layer8d-forms-data.js` | Read currency from `<select>.value` instead of `dataset.refId` |
| `l8ui/popup/layer8d-popup-forms.css` | Update `.money-input-group` styles for `<select>` |
| `l8ui/m/js/layer8m-forms-fields-reference.js` | Replace `renderMoneyField` reference picker with `<select>` |
| `l8ui/m/js/layer8m-forms.js` | Read currency from `<select>.value` in post-processing |
| `l8ui/m/css/layer8m-forms.css` | Update `.mobile-money-input-group` styles for `<select>` |

**No new files created. No form definition files changed.** The fix is entirely within the form framework layer + app initialization.

---

## Verification

1. Desktop: Open any form with Money fields (e.g., SalaryGrade) — verify currency `<select>` dropdown + editable amount input appear side by side
2. Desktop: Select a currency from the dropdown, enter an amount, save — verify the Money object has both `amount` and `currencyId`
3. Desktop: Edit an existing record — verify both the currency dropdown and amount display correctly from the Money object
4. Mobile: Same tests as desktop
5. Verify the currency dropdown shows all active currencies (fetched on app startup)
6. `go build ./tests/mocks/` — still passes (no Go changes in this fix)
