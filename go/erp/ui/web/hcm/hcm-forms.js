// HCM Forms - Modal Form Generation and Handling
// Generic form builder for all HCM services

// ============================================================================
// MODAL MANAGEMENT
// ============================================================================

let currentModal = null;

// Create and show a modal
function showModal(title, content, onSave, onCancel) {
    // Remove existing modal if any
    closeModal();

    const modal = document.createElement('div');
    modal.className = 'hcm-modal-overlay';
    modal.innerHTML = `
        <div class="hcm-modal">
            <div class="hcm-modal-header">
                <h3 class="hcm-modal-title">${escapeHtml(title)}</h3>
                <button class="hcm-modal-close" type="button">&times;</button>
            </div>
            <div class="hcm-modal-body">
                ${content}
            </div>
            <div class="hcm-modal-footer">
                <button type="button" class="hcm-btn hcm-btn-secondary hcm-modal-cancel">Cancel</button>
                <button type="button" class="hcm-btn hcm-btn-primary hcm-modal-save">Save</button>
            </div>
        </div>
    `;

    // Add event listeners
    modal.querySelector('.hcm-modal-close').addEventListener('click', () => {
        if (onCancel) onCancel();
        closeModal();
    });

    modal.querySelector('.hcm-modal-cancel').addEventListener('click', () => {
        if (onCancel) onCancel();
        closeModal();
    });

    modal.querySelector('.hcm-modal-save').addEventListener('click', () => {
        if (onSave) onSave();
    });

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            if (onCancel) onCancel();
            closeModal();
        }
    });

    // Close on Escape key
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            if (onCancel) onCancel();
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);

    document.body.appendChild(modal);
    currentModal = modal;

    // Focus first input
    setTimeout(() => {
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) firstInput.focus();
    }, 100);

    return modal;
}

// Close current modal
function closeModal() {
    if (currentModal) {
        currentModal.remove();
        currentModal = null;
    }
}

// ============================================================================
// FORM GENERATION
// ============================================================================

// Generate form HTML from form definition
function generateFormHtml(formDef, data = {}) {
    let html = '<form class="hcm-form" id="hcm-edit-form">';

    formDef.sections.forEach(section => {
        html += `<div class="hcm-form-section">`;
        if (section.title) {
            html += `<h4 class="hcm-form-section-title">${escapeHtml(section.title)}</h4>`;
        }

        section.fields.forEach(field => {
            html += generateFieldHtml(field, data[field.key]);
        });

        html += '</div>';
    });

    html += '</form>';
    return html;
}

// Generate HTML for a single field
function generateFieldHtml(field, value) {
    const required = field.required ? 'required' : '';
    const requiredMark = field.required ? '<span class="hcm-required">*</span>' : '';

    let inputHtml = '';

    switch (field.type) {
        case 'text':
            inputHtml = `<input type="text" class="hcm-form-input" id="field-${field.key}"
                name="${field.key}" value="${escapeAttr(value || '')}" ${required}>`;
            break;

        case 'number':
            inputHtml = `<input type="number" class="hcm-form-input" id="field-${field.key}"
                name="${field.key}" value="${escapeAttr(value || '')}" ${required}>`;
            break;

        case 'date':
            const dateValue = value ? formatDateForInput(value) : '';
            inputHtml = `<input type="date" class="hcm-form-input" id="field-${field.key}"
                name="${field.key}" value="${dateValue}" ${required}>`;
            break;

        case 'textarea':
            inputHtml = `<textarea class="hcm-form-input hcm-form-textarea" id="field-${field.key}"
                name="${field.key}" rows="3" ${required}>${escapeHtml(value || '')}</textarea>`;
            break;

        case 'select':
            inputHtml = generateSelectHtml(field, value);
            break;

        case 'checkbox':
            const checked = value ? 'checked' : '';
            inputHtml = `<label class="hcm-checkbox-label">
                <input type="checkbox" class="hcm-form-checkbox" id="field-${field.key}"
                    name="${field.key}" ${checked}>
                <span class="hcm-checkbox-text">${escapeHtml(field.label)}</span>
            </label>`;
            // Return early for checkbox - different layout
            return `<div class="hcm-form-group hcm-form-group-checkbox">${inputHtml}</div>`;

        case 'lookup':
            inputHtml = generateLookupHtml(field, value);
            break;

        default:
            inputHtml = `<input type="text" class="hcm-form-input" id="field-${field.key}"
                name="${field.key}" value="${escapeAttr(value || '')}" ${required}>`;
    }

    return `
        <div class="hcm-form-group">
            <label for="field-${field.key}">${escapeHtml(field.label)}${requiredMark}</label>
            ${inputHtml}
        </div>
    `;
}

// Generate select dropdown HTML
function generateSelectHtml(field, selectedValue) {
    let html = `<select class="hcm-form-select" id="field-${field.key}" name="${field.key}" ${field.required ? 'required' : ''}>`;
    html += '<option value="">-- Select --</option>';

    for (const [val, label] of Object.entries(field.options)) {
        const selected = String(selectedValue) === String(val) ? 'selected' : '';
        html += `<option value="${escapeAttr(val)}" ${selected}>${escapeHtml(label)}</option>`;
    }

    html += '</select>';
    return html;
}

// Generate lookup field HTML (text input with search capability)
function generateLookupHtml(field, value) {
    // For now, simple text input - can be enhanced with autocomplete later
    return `
        <div class="hcm-lookup-field">
            <input type="text" class="hcm-form-input" id="field-${field.key}"
                name="${field.key}" value="${escapeAttr(value || '')}"
                ${field.required ? 'required' : ''}
                placeholder="Enter ${field.lookupModel} ID">
        </div>
    `;
}

// ============================================================================
// FORM DATA HANDLING
// ============================================================================

// Collect form data
function collectFormData(formDef) {
    const form = document.getElementById('hcm-edit-form');
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
                    value = element.value ? parseInt(element.value, 10) : null;
                    break;
                case 'date':
                    value = element.value ? new Date(element.value).getTime() : null;
                    break;
                case 'select':
                    value = element.value ? parseInt(element.value, 10) : null;
                    // Handle non-numeric select values
                    if (isNaN(value)) value = element.value || null;
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
    const errors = [];

    formDef.sections.forEach(section => {
        section.fields.forEach(field => {
            if (field.required) {
                const value = data[field.key];
                if (value === null || value === undefined || value === '') {
                    errors.push(`${field.label} is required`);
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
    const method = isEdit ? 'PUT' : 'POST';
    const body = JSON.stringify(data);

    try {
        const response = await fetch(endpoint, {
            method: method,
            headers: getAuthHeaders(),
            body: body
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to save record');
        }

        return await response.json();
    } catch (error) {
        console.error('Save error:', error);
        throw error;
    }
}

// Fetch single record by ID
async function fetchRecord(endpoint, id, primaryKey) {
    const query = encodeURIComponent(JSON.stringify({
        text: `select * from ${endpoint.split('/').pop()} where ${primaryKey}=${id}`
    }));

    try {
        const response = await fetch(`${endpoint}?body=${query}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to fetch record');
        }

        const data = await response.json();
        return data.list && data.list.length > 0 ? data.list[0] : null;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Delete record
async function deleteRecord(endpoint, id, primaryKey) {
    try {
        const response = await fetch(`${endpoint}?${primaryKey}=${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error('Failed to delete record');
        }

        return true;
    } catch (error) {
        console.error('Delete error:', error);
        throw error;
    }
}

// ============================================================================
// HIGH-LEVEL FORM OPERATIONS
// ============================================================================

// Open add modal for a service
function openAddForm(serviceConfig, formDef, onSuccess) {
    const formHtml = generateFormHtml(formDef);

    showModal(
        `Add ${formDef.title}`,
        formHtml,
        async () => {
            const data = collectFormData(formDef);
            const errors = validateFormData(formDef, data);

            if (errors.length > 0) {
                alert('Validation errors:\n' + errors.join('\n'));
                return;
            }

            try {
                await saveRecord(serviceConfig.endpoint, data, serviceConfig.primaryKey, false);
                closeModal();
                if (onSuccess) onSuccess();
            } catch (error) {
                alert('Error saving: ' + error.message);
            }
        }
    );
}

// Open edit modal for a service
async function openEditForm(serviceConfig, formDef, recordId, onSuccess) {
    // Show loading state
    const loadingModal = showModal(
        `Edit ${formDef.title}`,
        '<div class="hcm-loading">Loading...</div>',
        null
    );

    try {
        const record = await fetchRecord(serviceConfig.endpoint, recordId, serviceConfig.primaryKey);

        if (!record) {
            closeModal();
            alert('Record not found');
            return;
        }

        const formHtml = generateFormHtml(formDef, record);

        // Update modal content
        const modalBody = loadingModal.querySelector('.hcm-modal-body');
        modalBody.innerHTML = formHtml;

        // Re-attach save handler
        const saveBtn = loadingModal.querySelector('.hcm-modal-save');
        saveBtn.onclick = async () => {
            const data = collectFormData(formDef);
            data[serviceConfig.primaryKey] = recordId; // Include primary key for update

            const errors = validateFormData(formDef, data);

            if (errors.length > 0) {
                alert('Validation errors:\n' + errors.join('\n'));
                return;
            }

            try {
                await saveRecord(serviceConfig.endpoint, data, serviceConfig.primaryKey, true);
                closeModal();
                if (onSuccess) onSuccess();
            } catch (error) {
                alert('Error saving: ' + error.message);
            }
        };

    } catch (error) {
        closeModal();
        alert('Error loading record: ' + error.message);
    }
}

// Confirm and delete a record
function confirmDelete(serviceConfig, recordId, onSuccess) {
    if (confirm(`Are you sure you want to delete this record?`)) {
        deleteRecord(serviceConfig.endpoint, recordId, serviceConfig.primaryKey)
            .then(() => {
                if (onSuccess) onSuccess();
            })
            .catch(error => {
                alert('Error deleting: ' + error.message);
            });
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

function escapeAttr(text) {
    if (text === null || text === undefined) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function formatDateForInput(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
}

// ============================================================================
// EXPORTS
// ============================================================================

if (typeof window !== 'undefined') {
    window.HCMForms = {
        showModal,
        closeModal,
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
}
