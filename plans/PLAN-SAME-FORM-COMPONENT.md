# Plan: Same Form Component for Popup and Inline — No Fallbacks

## Problem

ESS My Profile uses `Layer8DFormsInline.renderViewForm()` while detail popups use `Layer8DFormsModal.openViewForm()`. These are two separate code paths with subtly different activation (popup uses `onShow` callback on a **copied innerHTML**, inline uses `setTimeout` on the **original DOM element**). This causes reference pickers to work in one path but not the other.

Additionally, the file is littered with fallback guards (`typeof Layer8DPopup === 'undefined'`, `confirm()` fallback in `confirmDelete`) that silently mask failures.

## Design

**One function. One code path. One DOM element.**

`openViewForm(serviceConfig, formDef, data, container)`:
1. Create `bodyEl`
2. Call `renderFormIntoBody(bodyEl, ...)`
3. Place `bodyEl` into the target (popup or container)
4. Call `activateForm(bodyEl, ...)` — same `bodyEl` in both cases

The popup receives the **live DOM element**, not an innerHTML copy. This guarantees `activateForm` operates on the exact same element regardless of target.

No fallbacks. No `typeof` guards. No `confirm()` alternative. If Layer8DPopup is not loaded, the call fails visibly.

## Phase 1: Rewrite layer8d-forms-modal.js

**File:** `l8ui/shared/layer8d-forms-modal.js`

### Fallbacks to remove

| Line | Fallback | Action |
|------|----------|--------|
| 112-115 | `typeof Layer8DPopup === 'undefined'` in openAddForm | Remove — fail visibly |
| 138-141 | `typeof Layer8DPopup === 'undefined'` in openEditForm | Remove — fail visibly |
| 191-194 | `typeof Layer8DPopup === 'undefined'` in openViewForm | Remove — fail visibly |
| 212-219 | `typeof Layer8DPopup === 'undefined'` + `confirm()` fallback in confirmDelete | Remove — fail visibly |
| 96 | `typeof Layer8DPopup !== 'undefined'` guard on close | Remove — if we opened a popup, popup exists |
| 274 | `if (!container || !formDef || !data) return` silent guard in renderViewForm | Remove — fail visibly |
| 289 | `if (!container || !formDef) return` silent guard in renderEditForm | Remove — fail visibly |
| 322 | `if (!container || !formDef) return` silent guard in renderAddForm | Remove — fail visibly |

### New openViewForm

```javascript
function openViewForm(serviceConfig, formDef, data, container) {
    var bodyEl = document.createElement('div');
    bodyEl.className = 'probler-popup-body';
    renderFormIntoBody(bodyEl, formDef, data, serviceConfig, {});

    if (container) {
        container.innerHTML = '';
        container.appendChild(bodyEl);
    } else {
        Layer8DPopup.show({
            title: formDef.title + ' Details',
            content: bodyEl,
            size: 'large',
            showFooter: false
        });
    }

    // Same activation on the same bodyEl — no onShow, no setTimeout
    activateForm(bodyEl, { disableInputs: true });
}
```

**Key change:** `Layer8DPopup.show` receives `bodyEl` (the live DOM element) via `content`, not `bodyEl.innerHTML` (a string copy). The popup must appendChild this element. `activateForm` runs on the same `bodyEl` in both cases — synchronously, after placement.

**NOTE:** This requires `Layer8DPopup.show` to accept a DOM element for `content`, not just a string. If it currently only accepts strings, we modify `Layer8DPopup` to handle both (check `typeof content === 'string'` → innerHTML, else appendChild). This is a one-line change in the popup component.

### New openEditForm

```javascript
async function openEditForm(serviceConfig, formDef, recordId, onSuccess, container, onCancel) {
    var target = container || null;

    // Show loading state
    if (target) {
        target.innerHTML = '<div style="text-align:center;padding:40px;color:#718096;">Loading...</div>';
    } else {
        Layer8DPopup.show({
            title: 'Edit ' + formDef.title,
            content: '<div style="text-align:center;padding:40px;color:#718096;">Loading...</div>',
            size: 'large',
            showFooter: false
        });
    }

    var record = await Layer8DFormsData.fetchRecord(
        serviceConfig.endpoint, serviceConfig.primaryKey, recordId, serviceConfig.modelName
    );

    var bodyEl = document.createElement('div');
    bodyEl.className = 'probler-popup-body';
    renderFormIntoBody(bodyEl, formDef, record, serviceConfig, {
        isEdit: true, recordId: recordId, onSuccess: onSuccess
    });

    if (target) {
        target.innerHTML = '';
        target.appendChild(bodyEl);
        var footer = buildInlineFooter('Save', 'Cancel', handleInlineSave, onCancel);
        target.appendChild(footer);
    } else {
        Layer8DPopup.close();
        Layer8DPopup.show({
            title: 'Edit ' + formDef.title,
            content: bodyEl,
            size: 'large',
            showFooter: true,
            saveButtonText: 'Save',
            cancelButtonText: 'Cancel',
            onSave: handleFormSave
        });
    }

    // Same activation on the same bodyEl
    activateForm(bodyEl, { attachInlineTableHandlers: true });
}
```

### New openAddForm

```javascript
function openAddForm(serviceConfig, formDef, onSuccess, container, onCancel) {
    var bodyEl = document.createElement('div');
    bodyEl.className = 'probler-popup-body';
    renderFormIntoBody(bodyEl, formDef, {}, serviceConfig, {
        isEdit: false, onSuccess: onSuccess
    });

    if (container) {
        container.innerHTML = '';
        container.appendChild(bodyEl);
        var footer = buildInlineFooter('Save', 'Cancel', handleInlineSave, onCancel);
        container.appendChild(footer);
    } else {
        Layer8DPopup.show({
            title: 'Add ' + formDef.title,
            content: bodyEl,
            size: 'large',
            showFooter: true,
            saveButtonText: 'Save',
            cancelButtonText: 'Cancel',
            onSave: handleFormSave
        });
    }

    // Same activation on the same bodyEl
    activateForm(bodyEl, { attachInlineTableHandlers: true });
}
```

### New confirmDelete (no fallback)

```javascript
function confirmDelete(serviceConfig, recordId, onSuccess) {
    Layer8DPopup.show({
        title: 'Confirm Delete',
        content: '<div class="delete-message">' +
            '<p>Are you sure you want to delete this record?</p>' +
            '<p style="color: var(--layer8d-error); font-weight: 600;">This action cannot be undone.</p>' +
            '</div>',
        size: 'small',
        showFooter: true,
        saveButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        onSave: async function() {
            await Layer8DFormsData.deleteRecord(serviceConfig.endpoint, recordId, serviceConfig.primaryKey, serviceConfig.modelName);
            Layer8DPopup.close();
            if (onSuccess) onSuccess();
        }
    });
}
```

### New performSave (no typeof guard)

```javascript
function performSave(closePopup) {
    var ctx = Layer8DFormsPickers.getFormContext();
    var data = Layer8DFormsData.collectFormData(ctx.formDef);
    var errors = Layer8DFormsData.validateFormData(ctx.formDef, data);

    if (errors.length > 0) {
        Layer8DNotification.error('Validation failed', errors.map(function(e) { return e.message; }));
        return;
    }

    if (ctx.isEdit && ctx.recordId) {
        data[ctx.serviceConfig.primaryKey] = ctx.recordId;
    }

    Layer8DFormsData.saveRecord(ctx.serviceConfig.endpoint, data, ctx.isEdit).then(function() {
        if (closePopup) Layer8DPopup.close();
        Layer8DFormsPickers.clearFormContext();
        if (ctx.onSuccess) ctx.onSuccess();
    }).catch(function(error) {
        Layer8DNotification.error('Error saving', [error.message]);
    });
}
```

### Delete separate inline methods

Delete `renderViewForm`, `renderEditForm`, `renderAddForm` — the `openViewForm`/`openEditForm`/`openAddForm` functions now handle both targets.

### New exports

```javascript
window.Layer8DFormsModal = {
    openAddForm: openAddForm,
    openEditForm: openEditForm,
    openViewForm: openViewForm,
    confirmDelete: confirmDelete,
    handleFormSave: handleFormSave
};

// Backward compatibility — delegates to the same functions
window.Layer8DFormsInline = {
    renderViewForm: function(container, serviceConfig, formDef, data) {
        openViewForm(serviceConfig, formDef, data, container);
    },
    renderEditForm: function(container, serviceConfig, formDef, recordId, onSuccess, onCancel) {
        openEditForm(serviceConfig, formDef, recordId, onSuccess, container, onCancel);
    },
    renderAddForm: function(container, serviceConfig, formDef, onSuccess, onCancel) {
        openAddForm(serviceConfig, formDef, onSuccess, container, onCancel);
    }
};
```

## Phase 2: Update Layer8DPopup to accept DOM element for content

**File:** `l8ui/popup/layer8d-popup.js`

Find where `content` is assigned to the popup body. Change from:
```javascript
body.innerHTML = options.content;
```
To:
```javascript
if (typeof options.content === 'string') {
    body.innerHTML = options.content;
} else {
    body.innerHTML = '';
    body.appendChild(options.content);
}
```

This is the ONLY place a type check is needed — it's not a fallback, it's supporting two input types (string for simple content like confirmDelete's HTML, DOM element for forms).

## Phase 3: Syntax verification

```bash
node -c l8ui/shared/layer8d-forms-modal.js
node -c l8ui/popup/layer8d-popup.js
```

## Files Modified

```
l8ui/shared/layer8d-forms-modal.js    (rewrite: same function for popup/inline, remove all fallbacks, delete inline methods)
l8ui/popup/layer8d-popup.js           (one-line change: accept DOM element for content)
```

## Why This Fixes the Organization Field Bug

Before: popup path copies innerHTML (loses event listeners, reference picker state), then activates on a different DOM element via onShow callback. Inline path activates on the original DOM element via setTimeout. Two different elements, two different timings.

After: ONE `bodyEl` is created, rendered into, placed in the target, and activated. Same element. Same `activateForm` call. Same reference pickers. Same result.

## Traceability

| # | Issue | Fix | Phase |
|---|-------|-----|-------|
| 1 | Two separate form rendering paths | One function with optional container param | Phase 1 |
| 2 | activateForm runs on different DOM elements | Always runs on the original bodyEl | Phase 1-2 |
| 3 | innerHTML copy loses DOM state | Popup receives live DOM element | Phase 2 |
| 4 | `typeof Layer8DPopup === 'undefined'` fallback in openAddForm | Removed | Phase 1 |
| 5 | `typeof Layer8DPopup === 'undefined'` fallback in openEditForm | Removed | Phase 1 |
| 6 | `typeof Layer8DPopup === 'undefined'` fallback in openViewForm | Removed | Phase 1 |
| 7 | `confirm()` fallback in confirmDelete | Removed | Phase 1 |
| 8 | `typeof Layer8DPopup !== 'undefined'` guard in performSave | Removed | Phase 1 |
| 9 | Silent `if (!container) return` guards | Removed | Phase 1 |
| 10 | Separate renderViewForm/renderEditForm/renderAddForm | Deleted — openXxxForm handles both | Phase 1 |
