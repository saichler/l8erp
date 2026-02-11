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
/**
 * Layer8MForms - Form handling for ERP mobile
 * Desktop Equivalent: shared/erp-forms.js
 *
 * Reference fields match desktop EXACTLY:
 * - Uses Layer8MReferenceRegistry for model configurations
 * - Uses data-ref-id, data-ref-config, data-ref-item attributes
 * - Uses L8Query format for fetching display values
 *
 * Field renderers are in mobile-forms-fields.js (Layer8MFormFields)
 */
(function() {
    'use strict';

    window.Layer8MForms = {
        /**
         * Render a form field based on type
         * Delegates to Layer8MFormFields for actual rendering
         */
        renderField(fieldConfig, value, readonly = false) {
            const type = fieldConfig.type || 'text';
            const F = Layer8MFormFields;

            switch (type) {
                case 'text':
                case 'email':
                case 'tel':
                    return F.renderTextField(fieldConfig, value, readonly);
                case 'number':
                    return F.renderNumberField(fieldConfig, value, readonly);
                case 'textarea':
                    return F.renderTextareaField(fieldConfig, value, readonly);
                case 'date':
                    return F.renderDateField(fieldConfig, value, readonly);
                case 'select':
                    return F.renderSelectField(fieldConfig, value, readonly);
                case 'checkbox':
                    return F.renderCheckboxField(fieldConfig, value, readonly);
                case 'money':
                    return F.renderMoneyField(fieldConfig, value, readonly);
                case 'currency':
                    return F.renderCurrencyField(fieldConfig, value, readonly);
                case 'percentage':
                    return F.renderPercentageField(fieldConfig, value, readonly);
                case 'phone':
                    return F.renderPhoneField(fieldConfig, value, readonly);
                case 'ssn':
                    return F.renderSSNField(fieldConfig, value, readonly);
                case 'reference':
                    return F.renderReferenceField(fieldConfig, value, readonly);
                case 'url':
                    return F.renderUrlField(fieldConfig, value, readonly);
                case 'rating':
                    return F.renderRatingField(fieldConfig, value, readonly);
                case 'hours':
                    return F.renderHoursField(fieldConfig, value, readonly);
                case 'ein':
                    return F.renderEinField(fieldConfig, value, readonly);
                case 'routingNumber':
                    return F.renderRoutingNumberField(fieldConfig, value, readonly);
                case 'colorCode':
                    return F.renderColorCodeField(fieldConfig, value, readonly);
                case 'inlineTable':
                    return F.renderInlineTableField(fieldConfig, value, readonly);
                default:
                    return F.renderTextField(fieldConfig, value, readonly);
            }
        },

        /**
         * Render a complete form from definition
         */
        renderForm(formDef, data = {}, readonly = false) {
            let html = '<form class="mobile-form">';

            if (formDef.sections) {
                formDef.sections.forEach(section => {
                    html += `<div class="mobile-form-section">`;
                    if (section.title) {
                        html += `<h3 class="mobile-form-section-title">${Layer8MUtils.escapeHtml(section.title)}</h3>`;
                    }
                    section.fields.forEach(field => {
                        const value = data[field.key];
                        html += this.renderField(field, value, readonly || field.readonly);
                    });
                    html += '</div>';
                });
            } else if (formDef.fields) {
                formDef.fields.forEach(field => {
                    const value = data[field.key];
                    html += this.renderField(field, value, readonly || field.readonly);
                });
            }

            html += '</form>';
            return html;
        },

        /**
         * Get form data from container
         * Reference fields: get ID from data-ref-id attribute (matches desktop)
         */
        getFormData(container) {
            const form = container.querySelector('form') || container;
            const formData = {};

            form.querySelectorAll('input, select, textarea').forEach(input => {
                if (!input.name) return;

                // Reference fields - get ID from data-ref-id (matches desktop collectFormData)
                if (input.classList.contains('reference-input')) {
                    const refId = input.dataset.refId;
                    if (refId && refId !== '' && refId !== 'undefined') {
                        const numRefId = parseInt(refId, 10);
                        formData[input.name] = isNaN(numRefId) ? refId : numRefId;
                    } else {
                        formData[input.name] = null;
                    }
                    return;
                }

                if (input.type === 'checkbox') {
                    formData[input.name] = input.checked ? 1 : 0;
                } else if (input.dataset.format === 'currency') {
                    formData[input.name] = Math.round(parseFloat(input.value || 0) * 100);
                } else if (input.dataset.format === 'percentage') {
                    formData[input.name] = parseFloat(input.value || 0) / 100;
                } else if (input.dataset.format === 'hours') {
                    const parts = (input.value || '').split(':');
                    if (parts.length === 2) {
                        formData[input.name] = (parseInt(parts[0], 10) || 0) * 60 + (parseInt(parts[1], 10) || 0);
                    } else {
                        formData[input.name] = 0;
                    }
                } else if (input.type === 'date' || input.dataset.zeroLabel) {
                    // Handle date fields - check for "Current"/"N/A" zero values (matches desktop)
                    const dateVal = (input.value || '').trim().toLowerCase();
                    if (dateVal === 'current' || dateVal === 'n/a' || input.dataset.isZero === 'true') {
                        formData[input.name] = 0;
                    } else if (dateVal === '') {
                        formData[input.name] = 0;
                    } else {
                        formData[input.name] = Layer8MUtils.parseDateToTimestamp(input.value) || 0;
                    }
                } else if (input.type === 'number') {
                    formData[input.name] = parseFloat(input.value) || 0;
                } else {
                    formData[input.name] = input.value;
                }
            });

            // Post-process inline table fields (hidden JSON inputs)
            form.querySelectorAll('input[data-inline-table-data]').forEach(hiddenInput => {
                const key = hiddenInput.name;
                if (hiddenInput.value) {
                    try { formData[key] = JSON.parse(hiddenInput.value); } catch (e) { formData[key] = []; }
                }
            });

            // Post-process money compound fields (__currencyId + __amount → Money object)
            const moneyKeys = new Set();
            for (const key of Object.keys(formData)) {
                if (key.endsWith('.__amount')) moneyKeys.add(key.replace('.__amount', ''));
            }
            for (const baseKey of moneyKeys) {
                const cents = formData[baseKey + '.__amount'];
                const currId = formData[baseKey + '.__currencyId'];
                formData[baseKey] = cents != null ? { amount: parseInt(cents, 10) || 0, currencyId: currId || '' } : null;
                delete formData[baseKey + '.__amount'];
                delete formData[baseKey + '.__currencyId'];
            }

            return formData;
        },

        /**
         * Validate form
         */
        validateForm(container) {
            const form = container.querySelector('form') || container;
            const errors = [];

            form.querySelectorAll('[required]').forEach(input => {
                let isEmpty = !input.value || input.value.trim() === '';

                // For reference inputs, also check data-ref-id
                if (input.classList.contains('reference-input')) {
                    const refId = input.dataset.refId;
                    isEmpty = !refId || refId === '' || refId === 'undefined';
                }

                if (isEmpty) {
                    const label = form.querySelector(`label[for="${input.name}"]`)?.textContent ||
                                  input.closest('.mobile-form-field')?.querySelector('.mobile-form-label')?.textContent ||
                                  input.name;
                    errors.push(`${label.replace(' *', '')} is required`);
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            return errors;
        },

        /**
         * Show form errors
         */
        showErrors(container, errors) {
            const existing = container.querySelector('.mobile-form-errors');
            if (existing) existing.remove();

            if (errors.length === 0) return;

            const errorHtml = `
                <div class="mobile-form-errors">
                    ${errors.map(e => `<div class="mobile-form-error">${Layer8MUtils.escapeHtml(e)}</div>`).join('')}
                </div>
            `;

            const form = container.querySelector('form') || container;
            form.insertAdjacentHTML('afterbegin', errorHtml);
        },

        /**
         * Initialize interactive form fields (date pickers, reference pickers, inline tables)
         * Call this after form is rendered to container
         */
        initFormFields(container, formDef) {
            this.initReferencePickers(container);
            if (formDef) this.initInlineTableHandlers(container, formDef);
        },

        /**
         * Initialize inline table event handlers (add/edit/delete, row click)
         */
        initInlineTableHandlers(container, formDef) {
            if (!formDef || !formDef.sections) return;

            container.querySelectorAll('.mobile-form-inline-table').forEach(table => {
                const fieldKey = table.dataset.inlineTable;
                const hiddenInput = table.querySelector(`input[data-inline-table-data="${fieldKey}"]`);
                const isReadOnly = table.querySelector('.l8-clickable-row') !== null;

                // Find field def
                let fieldDef = null;
                for (const section of formDef.sections) {
                    for (const field of section.fields) {
                        if (field.key === fieldKey) { fieldDef = field; break; }
                    }
                    if (fieldDef) break;
                }
                if (!fieldDef || !fieldDef.columns) return;

                function getRows() {
                    try { return JSON.parse(hiddenInput.value || '[]'); } catch (e) { return []; }
                }

                table.addEventListener('click', (e) => {
                    const btn = e.target.closest('[data-action]');
                    const card = e.target.closest('.mobile-form-inline-card');

                    if (btn) {
                        const action = btn.dataset.action;
                        const rowIndex = parseInt(btn.dataset.rowIndex, 10);

                        if (action === 'add-row') {
                            this._openMobileRowEditor(fieldDef, -1, {}, (newRow) => {
                                const rows = getRows();
                                rows.push(newRow);
                                hiddenInput.value = JSON.stringify(rows);
                                this._rerenderMobileTable(table, fieldDef, rows, false);
                            });
                        } else if (action === 'edit-row') {
                            e.stopPropagation();
                            const rows = getRows();
                            this._openMobileRowEditor(fieldDef, rowIndex, rows[rowIndex] || {}, (updated) => {
                                const rows = getRows();
                                rows[rowIndex] = updated;
                                hiddenInput.value = JSON.stringify(rows);
                                this._rerenderMobileTable(table, fieldDef, rows, false);
                            });
                        } else if (action === 'delete-row') {
                            e.stopPropagation();
                            if (confirm('Delete this row?')) {
                                const rows = getRows();
                                rows.splice(rowIndex, 1);
                                hiddenInput.value = JSON.stringify(rows);
                                this._rerenderMobileTable(table, fieldDef, rows, false);
                            }
                        }
                    } else if (card && isReadOnly) {
                        const rowIndex = parseInt(card.dataset.rowIndex, 10);
                        const rows = getRows();
                        if (rows[rowIndex]) {
                            this._showMobileChildDetail(fieldDef, rows[rowIndex]);
                        }
                    }
                });
            });
        },

        _openMobileRowEditor(fieldDef, rowIndex, rowData, onSave) {
            const miniFormDef = {
                sections: [{ title: fieldDef.label, fields: fieldDef.columns.filter(c => !c.hidden) }]
            };
            const content = this.renderForm(miniFormDef, rowData);

            Layer8MPopup.show({
                title: rowIndex >= 0 ? `Edit ${fieldDef.label}` : `Add ${fieldDef.label}`,
                content: content,
                size: 'large',
                saveButtonText: rowIndex >= 0 ? 'Update' : 'Add',
                onShow: (popup) => { this.initFormFields(popup.body); },
                onSave: (popup) => {
                    const data = this.getFormData(popup.body);
                    fieldDef.columns.forEach(col => {
                        if (col.hidden && rowData[col.key] !== undefined) data[col.key] = rowData[col.key];
                    });
                    onSave(data);
                    Layer8MPopup.close();
                }
            });
        },

        _showMobileChildDetail(fieldDef, rowData) {
            const miniFormDef = {
                sections: [{ title: 'Details', fields: fieldDef.columns.filter(c => !c.hidden) }]
            };
            const content = this.renderForm(miniFormDef, rowData, true);

            Layer8MPopup.show({
                title: `${fieldDef.label} Details`,
                content: content,
                size: 'large',
                showFooter: false,
                onShow: (popup) => {
                    popup.body.querySelectorAll('input, select, textarea').forEach(el => { el.disabled = true; });
                }
            });
        },

        _rerenderMobileTable(tableEl, fieldDef, rows, isReadOnly) {
            // Remove existing cards and empty message
            tableEl.querySelectorAll('.mobile-form-inline-card, .mobile-form-inline-empty').forEach(el => el.remove());

            const addBtn = tableEl.querySelector('.mobile-form-inline-add');
            const F = Layer8MFormFields;
            const visibleCols = fieldDef.columns.filter(c => !c.hidden);

            if (rows.length > 0) {
                rows.forEach((row, idx) => {
                    const card = document.createElement('div');
                    card.className = 'mobile-form-inline-card';
                    card.dataset.rowIndex = idx;

                    const titleCol = visibleCols[0];
                    const titleVal = titleCol ? F._formatMobileCell(titleCol, row[titleCol.key]) : '-';

                    let cardHtml = `<div class="mobile-form-inline-card-header">`;
                    cardHtml += `<span class="mobile-form-inline-card-title">${titleVal}</span>`;
                    if (!isReadOnly) {
                        cardHtml += `<div class="mobile-form-inline-card-actions">`;
                        cardHtml += `<button type="button" data-action="edit-row" data-row-index="${idx}">Edit</button>`;
                        cardHtml += `<button type="button" data-action="delete-row" data-row-index="${idx}">Delete</button>`;
                        cardHtml += `</div>`;
                    }
                    cardHtml += `</div>`;
                    if (visibleCols.length > 1) {
                        cardHtml += `<div class="mobile-form-inline-card-body">`;
                        visibleCols.slice(1).forEach(col => {
                            cardHtml += `<div class="mobile-form-inline-card-row">`;
                            cardHtml += `<span class="mobile-form-inline-card-label">${Layer8MUtils.escapeHtml(col.label)}</span>`;
                            cardHtml += `<span class="mobile-form-inline-card-value">${F._formatMobileCell(col, row[col.key])}</span>`;
                            cardHtml += `</div>`;
                        });
                        cardHtml += `</div>`;
                    }
                    card.innerHTML = cardHtml;
                    if (addBtn) tableEl.insertBefore(card, addBtn);
                    else tableEl.appendChild(card);
                });
            } else {
                const empty = document.createElement('div');
                empty.className = 'mobile-form-inline-empty';
                empty.textContent = 'No records';
                if (addBtn) tableEl.insertBefore(empty, addBtn);
                else tableEl.appendChild(empty);
            }
        },

        /**
         * Initialize reference picker fields - MATCHES DESKTOP attachReferencePickers() EXACTLY
         */
        initReferencePickers(container) {
            const refInputs = container.querySelectorAll('input.reference-input');

            refInputs.forEach(async input => {
                if (input.disabled) return;

                let config = {};
                try {
                    config = JSON.parse(input.dataset.refConfig || '{}');
                } catch (e) {
                    console.warn('Invalid reference config for', input.name);
                    return;
                }

                if (!config.modelName || !config.idColumn || !config.displayColumn) {
                    console.warn('Reference input missing required config:', input.name);
                    return;
                }

                if (!config.endpoint) {
                    config.endpoint = Layer8MReferencePicker.getEndpointForModel(config.modelName);
                    if (!config.endpoint) {
                        console.warn('No endpoint found for model:', config.modelName);
                        return;
                    }
                }

                // Get displayFormat from registry (functions can't be serialized)
                const lookupModel = input.dataset.lookupModel || config.modelName;
                if (lookupModel && window.Layer8MReferenceRegistry) {
                    const registryConfig = Layer8MReferenceRegistry.get(lookupModel);
                    if (registryConfig) {
                        if (registryConfig.displayFormat && !config.displayFormat) {
                            config.displayFormat = registryConfig.displayFormat;
                        }
                        if (registryConfig.selectColumns && !config.selectColumns) {
                            config.selectColumns = registryConfig.selectColumns;
                        }
                    }
                }

                input.style.cursor = 'pointer';

                input.addEventListener('click', (e) => {
                    e.stopPropagation();

                    Layer8MReferencePicker.show({
                        endpoint: config.endpoint,
                        modelName: config.modelName,
                        idColumn: config.idColumn,
                        displayColumn: config.displayColumn,
                        displayFormat: config.displayFormat,
                        selectColumns: config.selectColumns,
                        displayLabel: config.displayLabel,
                        baseWhereClause: config.baseWhereClause,
                        title: config.title || `Select ${config.modelName}`,
                        placeholder: config.placeholder,
                        currentValue: input.dataset.refId || null,
                        onChange: (id, displayValue, item) => {
                            if (id === null || id === undefined) {
                                input.value = '';
                                delete input.dataset.refId;
                                delete input.dataset.refItem;
                            } else {
                                input.value = displayValue || '';
                                input.dataset.refId = id;
                                if (item) {
                                    input.dataset.refItem = JSON.stringify(item);
                                }
                            }
                        }
                    });
                });

                // Fetch display value for existing ID (matches desktop)
                const refId = input.dataset.refId;
                if (refId && refId !== '' && refId !== 'undefined') {
                    const result = await Layer8MReferencePicker.fetchDisplayValue(config, refId);
                    if (result) {
                        input.value = result.displayValue;
                        if (result.item) {
                            input.dataset.refItem = JSON.stringify(result.item);
                        }
                    }
                }
            });
        }
    };

})();
