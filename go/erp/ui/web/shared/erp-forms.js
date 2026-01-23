/**
 * ERP Shared Form Handler
 * Generic form generation and handling for all ERP modules
 */
(function() {
    'use strict';

    const { escapeHtml, escapeAttr, formatDateForInput, parseDateToTimestamp } = ERPUtils;

    // ========================================
    // FORM GENERATION
    // ========================================

    function generateFormHtml(formDef, data = {}) {
        const sections = formDef.sections;
        let html = '<form id="erp-edit-form">';

        // Tabs header
        html += '<div class="probler-popup-tabs">';
        sections.forEach((section, idx) => {
            const activeClass = idx === 0 ? ' active' : '';
            html += `<div class="probler-popup-tab${activeClass}" data-tab="tab-${idx}">${escapeHtml(section.title)}</div>`;
        });
        html += '</div>';

        // Tab content
        html += '<div class="probler-popup-tab-content">';
        sections.forEach((section, idx) => {
            const activeClass = idx === 0 ? ' active' : '';
            html += `<div class="probler-popup-tab-pane${activeClass}" data-pane="tab-${idx}">`;
            html += '<div class="detail-grid"><div class="detail-section detail-full-width">';

            const fields = section.fields;
            for (let i = 0; i < fields.length; i += 2) {
                const field1 = fields[i];
                const field2 = fields[i + 1];

                if (field2) {
                    html += '<div class="form-row">';
                    html += generateFieldHtml(field1, data[field1.key]);
                    html += generateFieldHtml(field2, data[field2.key]);
                    html += '</div>';
                } else {
                    html += generateFieldHtml(field1, data[field1.key]);
                }
            }

            html += '</div></div></div>';
        });
        html += '</div></form>';

        return html;
    }

    function generateFieldHtml(field, value) {
        const required = field.required ? 'required' : '';
        const requiredMark = field.required ? ' <span style="color: var(--erp-error);">*</span>' : '';

        let inputHtml = '';

        switch (field.type) {
            case 'text':
                inputHtml = `<input type="text" id="field-${field.key}" name="${field.key}" value="${escapeAttr(value || '')}" ${required}>`;
                break;

            case 'number':
                inputHtml = `<input type="number" id="field-${field.key}" name="${field.key}" value="${escapeAttr(value || '')}" ${required}>`;
                break;

            case 'date':
                const dateValue = value ? formatDateForInput(value) : '';
                const datePlaceholder = typeof ERPUtils !== 'undefined' && ERPUtils.getDateInputPlaceholder
                    ? ERPUtils.getDateInputPlaceholder()
                    : 'MM/DD/YYYY';
                inputHtml = `<div class="date-input-wrapper">
                    <input type="text" id="field-${field.key}" name="${field.key}" value="${dateValue}" ${required} placeholder="${datePlaceholder}" class="date-input">
                    <button type="button" class="date-picker-trigger" data-for="field-${field.key}" title="Open calendar">&#x1F4C5;</button>
                </div>`;
                break;

            case 'textarea':
                inputHtml = `<textarea id="field-${field.key}" name="${field.key}" rows="3" ${required}>${escapeHtml(value || '')}</textarea>`;
                break;

            case 'select':
                inputHtml = generateSelectHtml(field, value);
                break;

            case 'checkbox':
                const checked = value ? 'checked' : '';
                return `
                    <div class="form-group">
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="checkbox" id="field-${field.key}" name="${field.key}" ${checked} style="width: auto;">
                            <span>${escapeHtml(field.label)}</span>
                        </label>
                    </div>
                `;

            case 'lookup':
                inputHtml = `<input type="text" id="field-${field.key}" name="${field.key}" value="${escapeAttr(value || '')}" ${required} placeholder="Enter ${field.lookupModel} ID">`;
                break;

            default:
                inputHtml = `<input type="text" id="field-${field.key}" name="${field.key}" value="${escapeAttr(value || '')}" ${required}>`;
        }

        return `
            <div class="form-group">
                <label for="field-${field.key}">${escapeHtml(field.label)}${requiredMark}</label>
                ${inputHtml}
            </div>
        `;
    }

    function generateSelectHtml(field, selectedValue) {
        let html = `<select id="field-${field.key}" name="${field.key}" ${field.required ? 'required' : ''}>`;
        html += '<option value="">-- Select --</option>';

        for (const [val, label] of Object.entries(field.options)) {
            const selected = String(selectedValue) === String(val) ? 'selected' : '';
            html += `<option value="${escapeAttr(val)}" ${selected}>${escapeHtml(label)}</option>`;
        }

        html += '</select>';
        return html;
    }

    // ========================================
    // FORM DATA HANDLING
    // ========================================

    function collectFormData(formDef) {
        const form = document.getElementById('erp-edit-form');
        if (!form) return null;

        const data = {};

        formDef.sections.forEach(section => {
            section.fields.forEach(field => {
                const element = form.elements[field.key];
                if (!element) return;

                let value;
                switch (field.type) {
                    case 'checkbox':
                        value = element.checked;
                        break;
                    case 'number':
                        value = element.value ? parseFloat(element.value) : null;
                        break;
                    case 'date':
                        value = parseDateToTimestamp(element.value);
                        break;
                    case 'select':
                        // Try to parse as number, otherwise keep as string
                        if (element.value) {
                            const numVal = parseInt(element.value, 10);
                            value = isNaN(numVal) ? element.value : numVal;
                        } else {
                            value = null;
                        }
                        break;
                    default:
                        value = element.value || null;
                }

                if (value !== null && value !== '') {
                    data[field.key] = value;
                }
            });
        });

        return data;
    }

    function validateFormData(formDef, data) {
        const errors = [];

        formDef.sections.forEach(section => {
            section.fields.forEach(field => {
                if (field.required) {
                    const value = data[field.key];
                    if (value === null || value === undefined || value === '') {
                        errors.push({ field: field.key, message: `${field.label} is required` });
                    }
                }
            });
        });

        return errors;
    }

    // ========================================
    // CRUD OPERATIONS
    // ========================================

    async function fetchRecord(endpoint, primaryKey, id, modelName) {
        const query = encodeURIComponent(JSON.stringify({
            text: `select * from ${modelName} where ${primaryKey}=${id}`
        }));

        const response = await fetch(`${endpoint}?body=${query}`, {
            method: 'GET',
            headers: typeof getAuthHeaders === 'function' ? getAuthHeaders() : {}
        });

        if (!response.ok) throw new Error('Failed to fetch record');

        const result = await response.json();
        return result.list && result.list.length > 0 ? result.list[0] : null;
    }

    async function saveRecord(endpoint, data, isEdit = false) {
        const method = isEdit ? 'PUT' : 'POST';

        const response = await fetch(endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...(typeof getAuthHeaders === 'function' ? getAuthHeaders() : {})
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to save record');
        }
        return await response.json();
    }

    async function deleteRecord(endpoint, id, primaryKey) {
        const response = await fetch(`${endpoint}?${primaryKey}=${id}`, {
            method: 'DELETE',
            headers: typeof getAuthHeaders === 'function' ? getAuthHeaders() : {}
        });

        if (!response.ok) throw new Error('Failed to delete record');
        return true;
    }

    // ========================================
    // DATE PICKER INTEGRATION
    // ========================================

    /**
     * Attach date pickers to all date inputs in a container
     * @param {HTMLElement} container
     */
    function attachDatePickers(container) {
        if (typeof ERPDatePicker === 'undefined') return;

        // Find all date inputs
        const dateInputs = container.querySelectorAll('input.date-input');
        dateInputs.forEach(input => {
            ERPDatePicker.attach(input);
        });

        // Setup trigger buttons
        const triggers = container.querySelectorAll('.date-picker-trigger');
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const inputId = trigger.dataset.for;
                const input = container.querySelector(`#${inputId}`);
                if (input) {
                    ERPDatePicker.open(input);
                }
            });
        });
    }

    // ========================================
    // MODAL HELPERS
    // ========================================

    // Store current form context for save handler
    let currentFormContext = null;

    function openAddForm(serviceConfig, formDef, onSuccess) {
        if (typeof ERPPopup === 'undefined') {
            alert('Form component not available');
            return;
        }

        const title = `Add ${formDef.title}`;
        const content = generateFormHtml(formDef, {});

        currentFormContext = {
            formDef: formDef,
            serviceConfig: serviceConfig,
            isEdit: false,
            recordId: null,
            onSuccess: onSuccess
        };

        ERPPopup.show({
            title: title,
            content: content,
            size: 'large',
            showFooter: true,
            saveButtonText: 'Save',
            cancelButtonText: 'Cancel',
            onSave: handleFormSave,
            onShow: attachDatePickers
        });
    }

    async function openEditForm(serviceConfig, formDef, recordId, onSuccess) {
        if (typeof ERPPopup === 'undefined') {
            alert('Form component not available');
            return;
        }

        // Show loading state
        ERPPopup.show({
            title: `Edit ${formDef.title}`,
            content: '<div style="text-align: center; padding: 40px; color: #718096;">Loading...</div>',
            size: 'large',
            showFooter: false
        });

        try {
            const record = await fetchRecord(
                serviceConfig.endpoint,
                serviceConfig.primaryKey,
                recordId,
                serviceConfig.modelName
            );

            if (!record) {
                ERPPopup.close();
                alert('Record not found');
                return;
            }

            const content = generateFormHtml(formDef, record);

            currentFormContext = {
                formDef: formDef,
                serviceConfig: serviceConfig,
                isEdit: true,
                recordId: recordId,
                onSuccess: onSuccess
            };

            // Re-show with footer
            ERPPopup.close();
            ERPPopup.show({
                title: `Edit ${formDef.title}`,
                content: content,
                size: 'large',
                showFooter: true,
                saveButtonText: 'Save',
                cancelButtonText: 'Cancel',
                onSave: handleFormSave,
                onShow: attachDatePickers
            });

        } catch (error) {
            ERPPopup.close();
            alert('Error loading record: ' + error.message);
        }
    }

    async function handleFormSave() {
        if (!currentFormContext) return;

        const { formDef, serviceConfig, isEdit, recordId, onSuccess } = currentFormContext;

        const data = collectFormData(formDef);
        const errors = validateFormData(formDef, data);

        if (errors.length > 0) {
            alert('Validation errors:\n' + errors.map(e => e.message).join('\n'));
            return;
        }

        // Include primary key for update
        if (isEdit && recordId) {
            data[serviceConfig.primaryKey] = recordId;
        }

        try {
            await saveRecord(serviceConfig.endpoint, data, isEdit);
            ERPPopup.close();
            currentFormContext = null;
            if (onSuccess) onSuccess();
        } catch (error) {
            alert('Error saving: ' + error.message);
        }
    }

    function openViewForm(serviceConfig, formDef, data) {
        if (typeof ERPPopup === 'undefined') {
            alert('View component not available');
            return;
        }

        const title = `${formDef.title} Details`;
        const content = generateFormHtml(formDef, data);

        ERPPopup.show({
            title: title,
            content: content,
            size: 'large',
            showFooter: false,
            onShow: (body) => {
                body.querySelectorAll('input, select, textarea').forEach(el => {
                    el.disabled = true;
                });
            }
        });
    }

    function confirmDelete(serviceConfig, recordId, onSuccess) {
        if (typeof ERPPopup === 'undefined') {
            if (confirm('Are you sure you want to delete this record?')) {
                deleteRecord(serviceConfig.endpoint, recordId, serviceConfig.primaryKey)
                    .then(() => { if (onSuccess) onSuccess(); })
                    .catch(error => { alert('Error deleting: ' + error.message); });
            }
            return;
        }

        ERPPopup.show({
            title: 'Confirm Delete',
            content: `
                <div class="delete-message">
                    <p>Are you sure you want to delete this record?</p>
                    <p style="color: var(--erp-error); font-weight: 600;">This action cannot be undone.</p>
                </div>
            `,
            size: 'small',
            showFooter: true,
            saveButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            onSave: async () => {
                try {
                    await deleteRecord(serviceConfig.endpoint, recordId, serviceConfig.primaryKey);
                    ERPPopup.close();
                    if (onSuccess) onSuccess();
                } catch (error) {
                    alert('Error deleting: ' + error.message);
                }
            }
        });
    }

    // ========================================
    // EXPORT
    // ========================================

    window.ERPForms = {
        generateFormHtml,
        generateFieldHtml,
        generateSelectHtml,
        collectFormData,
        validateFormData,
        fetchRecord,
        saveRecord,
        deleteRecord,
        openAddForm,
        openEditForm,
        openViewForm,
        confirmDelete,
        attachDatePickers
    };

})();
