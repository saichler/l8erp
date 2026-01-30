/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// SCM Forms - Modal Form Generation and Handling
// Thin wrapper around ERPForms for SCM-specific needs

(function() {
    'use strict';

    // Import shared utilities
    const { escapeHtml, escapeAttr, formatDateForInput, parseDateToTimestamp } = ERPUtils;

    // ============================================================================
    // FORM GENERATION (delegates to ERPForms when available)
    // ============================================================================

    // Generate form HTML from form definition
    function generateFormHtml(formDef, data = {}) {
        // Use shared ERPForms if available
        if (typeof ERPForms !== 'undefined' && ERPForms.generateFormHtml) {
            return ERPForms.generateFormHtml(formDef, data);
        }

        // Fallback implementation
        const sections = formDef.sections;

        let html = '<form id="scm-edit-form">';

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

            // Use form-row for two-column layout
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
        html += '</div>';

        html += '</form>';
        return html;
    }

    // Generate HTML for a single field
    function generateFieldHtml(field, value) {
        const required = field.required ? 'required' : '';
        const requiredMark = field.required ? ' <span style="color: var(--erp-error, #ef4444);">*</span>' : '';

        let inputHtml = '';

        switch (field.type) {
            case 'text':
                inputHtml = `<input type="text" id="field-${field.key}"
                    name="${field.key}" value="${escapeAttr(value || '')}" ${required}>`;
                break;

            case 'number':
                inputHtml = `<input type="number" id="field-${field.key}"
                    name="${field.key}" value="${escapeAttr(value || '')}" ${required}>`;
                break;

            case 'date':
                const dateValue = value ? formatDateForInput(value) : '';
                inputHtml = `<input type="text" id="field-${field.key}"
                    name="${field.key}" value="${dateValue}" ${required} placeholder="YYYY-MM-DD">`;
                break;

            case 'textarea':
                inputHtml = `<textarea id="field-${field.key}"
                    name="${field.key}" rows="3" ${required}>${escapeHtml(value || '')}</textarea>`;
                break;

            case 'select':
                inputHtml = generateSelectHtml(field, value);
                break;

            case 'checkbox':
                const checked = value ? 'checked' : '';
                return `
                    <div class="form-group">
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="checkbox" id="field-${field.key}"
                                name="${field.key}" ${checked} style="width: auto;">
                            <span>${escapeHtml(field.label)}</span>
                        </label>
                    </div>
                `;

            case 'lookup':
                inputHtml = `<input type="text" id="field-${field.key}"
                    name="${field.key}" value="${escapeAttr(value || '')}"
                    ${required} placeholder="Enter ${field.lookupModel} ID">`;
                break;

            default:
                inputHtml = `<input type="text" id="field-${field.key}"
                    name="${field.key}" value="${escapeAttr(value || '')}" ${required}>`;
        }

        return `
            <div class="form-group">
                <label for="field-${field.key}">${escapeHtml(field.label)}${requiredMark}</label>
                ${inputHtml}
            </div>
        `;
    }

    // Generate select dropdown HTML
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

    // ============================================================================
    // FORM DATA HANDLING
    // ============================================================================

    // Collect form data
    function collectFormData(formDef) {
        // Try shared ERPForms first
        if (typeof ERPForms !== 'undefined' && ERPForms.collectFormData) {
            return ERPForms.collectFormData(formDef);
        }

        // Fallback implementation
        const form = document.getElementById('scm-edit-form') || document.getElementById('erp-edit-form');
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

    // Validate form data
    function validateFormData(formDef, data) {
        // Try shared ERPForms first
        if (typeof ERPForms !== 'undefined' && ERPForms.validateFormData) {
            return ERPForms.validateFormData(formDef, data);
        }

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

    // ============================================================================
    // API OPERATIONS
    // ============================================================================

    // Save record (create or update)
    async function saveRecord(endpoint, data, primaryKey, isEdit) {
        // Delegate to ERPForms if available
        if (typeof ERPForms !== 'undefined' && ERPForms.saveRecord) {
            return ERPForms.saveRecord(endpoint, data, isEdit);
        }

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

    // Fetch single record by ID
    async function fetchRecord(endpoint, id, primaryKey, modelName) {
        // Delegate to ERPForms if available
        if (typeof ERPForms !== 'undefined' && ERPForms.fetchRecord) {
            return ERPForms.fetchRecord(endpoint, primaryKey, id, modelName);
        }

        const query = encodeURIComponent(JSON.stringify({
            text: `select * from ${modelName} where ${primaryKey}=${id}`
        }));

        const response = await fetch(`${endpoint}?body=${query}`, {
            method: 'GET',
            headers: typeof getAuthHeaders === 'function' ? getAuthHeaders() : {}
        });

        if (!response.ok) {
            throw new Error('Failed to fetch record');
        }

        const data = await response.json();
        return data.list && data.list.length > 0 ? data.list[0] : null;
    }

    // Delete record
    async function deleteRecord(endpoint, id, primaryKey) {
        // Delegate to ERPForms if available
        if (typeof ERPForms !== 'undefined' && ERPForms.deleteRecord) {
            return ERPForms.deleteRecord(endpoint, id, primaryKey);
        }

        const response = await fetch(`${endpoint}?${primaryKey}=${id}`, {
            method: 'DELETE',
            headers: typeof getAuthHeaders === 'function' ? getAuthHeaders() : {}
        });

        if (!response.ok) {
            throw new Error('Failed to delete record');
        }

        return true;
    }

    // ============================================================================
    // HIGH-LEVEL FORM OPERATIONS USING ERPPopup
    // ============================================================================

    // Store current form context for save handler
    let currentFormContext = null;

    // Open add modal for a service
    function openAddForm(serviceConfig, formDef, onSuccess) {
        // Delegate to ERPForms if available
        if (typeof ERPForms !== 'undefined' && ERPForms.openAddForm) {
            return ERPForms.openAddForm(serviceConfig, formDef, onSuccess);
        }

        if (typeof ERPPopup === 'undefined') {
            ERPNotification.error('Form component not available');
            return;
        }

        const formHtml = generateFormHtml(formDef);

        currentFormContext = {
            formDef: formDef,
            serviceConfig: serviceConfig,
            isEdit: false,
            recordId: null,
            onSuccess: onSuccess
        };

        ERPPopup.show({
            title: `Add ${formDef.title}`,
            content: formHtml,
            size: 'large',
            showFooter: true,
            saveButtonText: 'Save',
            cancelButtonText: 'Cancel',
            onSave: handleFormSave
        });
    }

    // Open edit modal for a service
    async function openEditForm(serviceConfig, formDef, recordId, onSuccess) {
        // Delegate to ERPForms if available
        if (typeof ERPForms !== 'undefined' && ERPForms.openEditForm) {
            return ERPForms.openEditForm(serviceConfig, formDef, recordId, onSuccess);
        }

        if (typeof ERPPopup === 'undefined') {
            ERPNotification.error('Form component not available');
            return;
        }

        // Show loading state
        ERPPopup.show({
            title: `Edit ${formDef.title}`,
            content: '<div style="text-align: center; padding: 40px; color: var(--erp-text-muted, #718096);">Loading...</div>',
            size: 'large',
            showFooter: false
        });

        try {
            const record = await fetchRecord(serviceConfig.endpoint, recordId, serviceConfig.primaryKey, serviceConfig.modelName);

            if (!record) {
                ERPPopup.close();
                ERPNotification.error('Record not found');
                return;
            }

            const formHtml = generateFormHtml(formDef, record);

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
                content: formHtml,
                size: 'large',
                showFooter: true,
                saveButtonText: 'Save',
                cancelButtonText: 'Cancel',
                onSave: handleFormSave
            });

        } catch (error) {
            ERPPopup.close();
            ERPNotification.error('Error loading record', [error.message]);
        }
    }

    // Handle form save
    async function handleFormSave() {
        if (!currentFormContext) return;

        const { formDef, serviceConfig, isEdit, recordId, onSuccess } = currentFormContext;

        const data = collectFormData(formDef);
        const errors = validateFormData(formDef, data);

        if (errors.length > 0) {
            const messages = errors.map(e => typeof e === 'string' ? e : e.message);
            ERPNotification.error('Validation failed', messages);
            return;
        }

        // Include primary key for update
        if (isEdit && recordId) {
            data[serviceConfig.primaryKey] = recordId;
        }

        try {
            await saveRecord(serviceConfig.endpoint, data, serviceConfig.primaryKey, isEdit);
            ERPPopup.close();
            currentFormContext = null;
            if (onSuccess) onSuccess();
        } catch (error) {
            ERPNotification.error('Error saving', [error.message]);
        }
    }

    // Confirm and delete a record
    function confirmDelete(serviceConfig, recordId, onSuccess) {
        // Delegate to ERPForms if available
        if (typeof ERPForms !== 'undefined' && ERPForms.confirmDelete) {
            return ERPForms.confirmDelete(serviceConfig, recordId, onSuccess);
        }

        if (typeof ERPPopup === 'undefined') {
            if (confirm('Are you sure you want to delete this record?')) {
                deleteRecord(serviceConfig.endpoint, recordId, serviceConfig.primaryKey)
                    .then(() => { if (onSuccess) onSuccess(); })
                    .catch(error => { ERPNotification.error('Error deleting', [error.message]); });
            }
            return;
        }

        ERPPopup.show({
            title: 'Confirm Delete',
            content: `
                <div class="delete-message">
                    <p>Are you sure you want to delete this record?</p>
                    <p style="color: var(--erp-error, #ef4444); font-weight: 600;">This action cannot be undone.</p>
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
                    ERPNotification.error('Error deleting', [error.message]);
                }
            }
        });
    }

    // ============================================================================
    // EXPORTS
    // ============================================================================

    window.SCMForms = {
        generateFormHtml,
        collectFormData,
        validateFormData,
        saveRecord,
        fetchRecord,
        deleteRecord,
        openAddForm,
        openEditForm,
        confirmDelete
    };

})();
