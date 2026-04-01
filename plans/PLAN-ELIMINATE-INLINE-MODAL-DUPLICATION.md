# Plan: Eliminate Duplication Between Inline Forms and Modal Forms

## Context

`Layer8DFormsInline` (`layer8d-forms-inline.js`, 230 lines) is a near-complete copy of `Layer8DFormsModal` (`layer8d-forms-modal.js`, 203 lines). Both files:

1. Call `Layer8DFormsFields.generateFormHtml(formDef, data)` to produce HTML
2. Call `Layer8DFormsPickers.setFormContext()` / `updateFormContext()` for reference resolution
3. Call `Layer8DFormsPickers.attachDatePickers(body)` which internally calls `attachReferencePickers`
4. Disable all inputs for read-only mode
5. Have their own `handleSave` function (nearly identical logic)
6. Have their own footer builder

The inline file duplicates the modal's rendering pipeline with minor differences (container injection vs popup DOM, no `Layer8DPopup.close()` on save). When one path is updated, the other is forgotten — this is why reference fields resolve in the popup but may fail in the inline form.

## Root Cause

The duplication exists because `Layer8DFormsInline` was created as a separate component that copies the modal's behavior. The correct design is: **one rendering engine, two targets** (popup vs container).

## Specific Bug: Organization Field Shows ID in Inline, Name in Popup

Both paths call `attachReferencePickers`. The code paths are:

**Popup** (`openViewForm`):
```
Layer8DPopup.show({ onShow: (body) => { attachDatePickers(body); } })
```
The popup's `onShow` fires AFTER the popup DOM is in the document and visible.

**Inline** (`renderViewForm`):
```
var body = initBody(container, content);
setTimeout(function() { attachDatePickers(body); }, 50);
```
`initBody` creates a detached-style div, appends it to the container. The 50ms timeout is a guess — it may fire before the container is actually in the visible DOM, or the body element may not be properly connected for `attachReferencePickers` to resolve endpoints.

More critically: if `Layer8DServiceRegistry` has not been populated by the time the inline form's `setTimeout` fires (race condition with HCM config registration in the inline `<script>` block), `getEndpointForModel()` returns `null` and reference pickers silently fail.

The real fix is to eliminate the duplicate code entirely so both paths use the exact same rendering pipeline.

## Design

Refactor `Layer8DFormsModal` to accept a **target** parameter: either a popup or a DOM container. The rendering pipeline (generate HTML → set context → attach pickers → disable inputs) stays in ONE place. `Layer8DFormsInline` becomes a thin wrapper that calls `Layer8DFormsModal` methods with a container target instead of a popup.

### New API

```javascript
// Existing popup-based API (unchanged)
Layer8DFormsModal.openViewForm(serviceConfig, formDef, data);
Layer8DFormsModal.openEditForm(serviceConfig, formDef, recordId, onSuccess);
Layer8DFormsModal.openAddForm(serviceConfig, formDef, onSuccess);

// New container-based API (replaces Layer8DFormsInline)
Layer8DFormsModal.renderViewForm(container, serviceConfig, formDef, data);
Layer8DFormsModal.renderEditForm(container, serviceConfig, formDef, recordId, onSuccess, onCancel);
Layer8DFormsModal.renderAddForm(container, serviceConfig, formDef, onSuccess, onCancel);
```

The internal rendering pipeline is shared — the only difference is where the HTML is placed and how save/cancel work.

## Phase 1: Extract shared rendering pipeline

**File:** `layer8d-forms-modal.js`

Extract the common logic into internal helper functions:

```javascript
/**
 * Shared: render form HTML into a body element, set context, attach pickers.
 * Used by BOTH popup and inline rendering.
 * Returns the body element.
 */
function renderFormIntoBody(bodyEl, formDef, data, serviceConfig, opts) {
    var content = Layer8DFormsFields.generateFormHtml(formDef, data);
    bodyEl.innerHTML = content;

    // Wire tab switching
    bodyEl.addEventListener('click', function(e) {
        var tab = e.target.closest('.probler-popup-tab');
        if (!tab) return;
        var tabId = tab.dataset.tab;
        if (!tabId) return;
        bodyEl.querySelectorAll('.probler-popup-tab').forEach(function(t) { t.classList.remove('active'); });
        bodyEl.querySelectorAll('.probler-popup-tab-pane').forEach(function(p) { p.classList.remove('active'); });
        tab.classList.add('active');
        var pane = bodyEl.querySelector('.probler-popup-tab-pane[data-pane="' + tabId + '"]');
        if (pane) pane.classList.add('active');
    });

    // Set form context (for reference picker resolution)
    if (opts.isEdit !== undefined) {
        Layer8DFormsPickers.updateFormContext({
            formDef: formDef,
            serviceConfig: serviceConfig,
            isEdit: opts.isEdit,
            recordId: opts.recordId || null,
            onSuccess: opts.onSuccess || null
        });
    } else {
        Layer8DFormsPickers.setFormContext(formDef, serviceConfig);
    }

    return bodyEl;
}

/**
 * Shared: attach pickers and optionally disable all inputs.
 * Called after the body is in the DOM (via onShow or setTimeout).
 */
function activateForm(bodyEl, opts) {
    Layer8DFormsPickers.attachDatePickers(bodyEl);
    if (opts.attachInlineTableHandlers) {
        Layer8DFormsPickers.attachInlineTableHandlers(bodyEl);
    }
    if (opts.disableInputs) {
        bodyEl.querySelectorAll('input, select, textarea').forEach(function(el) {
            el.disabled = true;
        });
    }
}
```

## Phase 2: Refactor popup methods to use shared pipeline

**File:** `layer8d-forms-modal.js`

Rewrite `openViewForm`, `openEditForm`, `openAddForm` to call `renderFormIntoBody` + `activateForm`:

```javascript
function openViewForm(serviceConfig, formDef, data) {
    if (typeof Layer8DPopup === 'undefined') {
        Layer8DNotification.error('View component not available');
        return;
    }

    var bodyEl = document.createElement('div');
    bodyEl.className = 'probler-popup-body';
    renderFormIntoBody(bodyEl, formDef, data, serviceConfig, {});

    Layer8DPopup.show({
        title: formDef.title + ' Details',
        content: bodyEl.innerHTML,
        size: 'large',
        showFooter: false,
        onShow: function(body) {
            activateForm(body, { disableInputs: true });
        }
    });
}
```

Same pattern for `openEditForm` and `openAddForm` — they call `renderFormIntoBody` with `{ isEdit: true/false, ... }`, then `activateForm` with `{ attachInlineTableHandlers: true }`.

`handleFormSave` stays as-is (it reads from `getFormContext()`).

## Phase 3: Add inline rendering methods to Layer8DFormsModal

**File:** `layer8d-forms-modal.js`

Add `renderViewForm`, `renderEditForm`, `renderAddForm` that render into a DOM container instead of a popup:

```javascript
function renderViewForm(container, serviceConfig, formDef, data) {
    if (!container || !formDef || !data) return;

    var bodyEl = document.createElement('div');
    bodyEl.className = 'probler-popup-body';
    container.innerHTML = '';
    container.appendChild(bodyEl);

    renderFormIntoBody(bodyEl, formDef, data, serviceConfig, {});

    // Activate after body is in the DOM
    setTimeout(function() {
        activateForm(bodyEl, { disableInputs: true });
    }, 50);
}

function renderEditForm(container, serviceConfig, formDef, recordId, onSuccess, onCancel) {
    if (!container || !formDef) return;
    container.innerHTML = '<div style="text-align:center;padding:40px;color:#718096;">Loading...</div>';

    Layer8DFormsData.fetchRecord(
        serviceConfig.endpoint, serviceConfig.primaryKey, recordId, serviceConfig.modelName
    ).then(function(record) {
        if (!record) {
            container.innerHTML = '';
            Layer8DNotification.error('Record not found');
            return;
        }

        var bodyEl = document.createElement('div');
        bodyEl.className = 'probler-popup-body';
        container.innerHTML = '';
        container.appendChild(bodyEl);

        renderFormIntoBody(bodyEl, formDef, record, serviceConfig, {
            isEdit: true, recordId: recordId, onSuccess: onSuccess
        });

        var footer = buildInlineFooter('Save', 'Cancel', handleInlineSave, onCancel);
        container.appendChild(footer);

        setTimeout(function() {
            activateForm(bodyEl, { attachInlineTableHandlers: true });
        }, 50);
    }).catch(function(error) {
        container.innerHTML = '';
        Layer8DNotification.error('Error loading record', [error.message]);
    });
}

function renderAddForm(container, serviceConfig, formDef, onSuccess, onCancel) {
    if (!container || !formDef) return;

    var bodyEl = document.createElement('div');
    bodyEl.className = 'probler-popup-body';
    container.innerHTML = '';
    container.appendChild(bodyEl);

    renderFormIntoBody(bodyEl, formDef, {}, serviceConfig, {
        isEdit: false, onSuccess: onSuccess
    });

    var footer = buildInlineFooter('Save', 'Cancel', handleInlineSave, onCancel);
    container.appendChild(footer);

    setTimeout(function() {
        activateForm(bodyEl, { attachInlineTableHandlers: true });
    }, 50);
}
```

`handleInlineSave` is identical to `handleFormSave` except no `Layer8DPopup.close()` call. Extract the shared save logic:

```javascript
function performSave(closePopup) {
    var ctx = Layer8DFormsPickers.getFormContext();
    if (!ctx) return;
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
        if (closePopup && typeof Layer8DPopup !== 'undefined') Layer8DPopup.close();
        Layer8DFormsPickers.clearFormContext();
        if (ctx.onSuccess) ctx.onSuccess();
    }).catch(function(error) {
        Layer8DNotification.error('Error saving', [error.message]);
    });
}

function handleFormSave() { performSave(true); }
function handleInlineSave() { performSave(false); }
```

`buildInlineFooter` is a simple DOM builder (same as `Layer8DFormsInline.buildFooter`).

## Phase 4: Delete `layer8d-forms-inline.js`

**File:** `l8ui/shared/layer8d-forms-inline.js` — DELETE

## Phase 5: Add backward-compatible `Layer8DFormsInline` alias

**File:** `layer8d-forms-modal.js` — at the bottom of exports:

```javascript
// Backward compatibility — Layer8DFormsInline delegates to Layer8DFormsModal
window.Layer8DFormsInline = {
    renderViewForm: renderViewForm,
    renderEditForm: renderEditForm,
    renderAddForm: renderAddForm
};
```

This ensures existing code (ESS `ess-app.js` line 208) continues to work without changes.

## Phase 6: Remove script include

**File:** `ess.html` — remove the `<script src="l8ui/shared/layer8d-forms-inline.js"></script>` line (line 246).

Also check `app.html` and `m/app.html` for the same include — remove if present.

## Phase 7: Verification

For the specific bug reported (Organization field in ESS My Profile):
1. Navigate to ESS portal → My Profile → Organizational Placement tab
2. Verify Organization field shows the organization **name** (not raw ID)
3. Verify all other reference fields (Department, Position, Job, Manager) show names
4. Open the same Employee record from the main ERP detail popup
5. Verify the popup shows identical values for all reference fields
6. Verify both paths show identical formatting for all field types (dates, money, enums, etc.)

General verification:
- [ ] ESS My Profile inline form: all tabs render correctly
- [ ] ESS detail popup (from table row click): all tabs render correctly
- [ ] Both show identical data for the same record
- [ ] Add/Edit forms work from both popup and inline contexts
- [ ] Save handler works correctly in both contexts
- [ ] `node -c layer8d-forms-modal.js` passes

## Files Modified

```
l8ui/shared/layer8d-forms-modal.js    (refactored: shared pipeline + inline methods + alias)
l8ui/shared/layer8d-forms-inline.js   (DELETED — logic moved into modal.js)
ess.html                               (remove inline.js script include)
app.html                               (remove inline.js script include if present)
m/app.html                             (remove inline.js script include if present)
```

## Traceability

| # | Duplication | Fix | Phase |
|---|-------------|-----|-------|
| 1 | `renderViewForm` duplicates `openViewForm` rendering pipeline | Both call `renderFormIntoBody` + `activateForm` | Phase 1-3 |
| 2 | `renderEditForm` duplicates `openEditForm` rendering pipeline | Both call shared pipeline | Phase 1-3 |
| 3 | `renderAddForm` duplicates `openAddForm` rendering pipeline | Both call shared pipeline | Phase 1-3 |
| 4 | `handleSave` duplicated in inline.js | Shared `performSave(closePopup)` function | Phase 3 |
| 5 | `buildFooter` duplicated in inline.js | `buildInlineFooter` in modal.js | Phase 3 |
| 6 | `initBody` tab wiring duplicated from popup | `renderFormIntoBody` includes tab wiring | Phase 1 |
| 7 | Organization field shows ID in inline but name in popup | Same `activateForm` → `attachReferencePickers` for both | Phase 1-3 |
| 8 | `layer8d-forms-inline.js` exists as separate 230-line file | Deleted — all logic in modal.js | Phase 4 |
| 9 | Two separate exports (`Layer8DFormsInline`, `Layer8DFormsModal`) | Single source, alias for backward compat | Phase 5 |
