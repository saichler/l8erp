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
// FIN Module - CRUD Operations
// Add, Edit, Delete, and Details modal handlers

(function() {
    'use strict';

    // Ensure FIN namespace exists
    window.FIN = window.FIN || {};

    // Import shared utilities
    const { escapeHtml, formatDate, formatMoney } = ERPUtils;

    // Open add modal
    FIN._openAddModal = function(service) {
        const formDef = FIN.getServiceFormDef(service.model);

        if (!formDef || typeof FINForms === 'undefined') {
            ERPNotification.warning(`Add ${service.label} - Form not yet configured`);
            return;
        }

        const serviceConfig = {
            endpoint: service.endpoint,
            primaryKey: FIN.getServicePrimaryKey(service.model),
            modelName: service.model
        };

        FINForms.openAddForm(serviceConfig, formDef, () => {
            FIN.refreshCurrentTable();
        });
    };

    // Open edit modal
    FIN._openEditModal = function(service, id) {
        const formDef = FIN.getServiceFormDef(service.model);

        if (!formDef || typeof FINForms === 'undefined') {
            ERPNotification.warning(`Edit ${service.label} - Form not yet configured`);
            return;
        }

        const serviceConfig = {
            endpoint: service.endpoint,
            primaryKey: FIN.getServicePrimaryKey(service.model),
            modelName: service.model
        };

        FINForms.openEditForm(serviceConfig, formDef, id, () => {
            FIN.refreshCurrentTable();
        });
    };

    // Confirm delete
    FIN._confirmDeleteItem = function(service, id) {
        const serviceConfig = {
            endpoint: service.endpoint,
            primaryKey: FIN.getServicePrimaryKey(service.model),
            modelName: service.model
        };

        if (typeof FINForms !== 'undefined') {
            FINForms.confirmDelete(serviceConfig, id, () => {
                FIN.refreshCurrentTable();
            });
        } else if (confirm(`Are you sure you want to delete this ${service.label.replace(/s$/, '')}?`)) {
            FIN._deleteItem(service, id);
        }
    };

    // Delete item
    FIN._deleteItem = async function(service, id) {
        try {
            const response = await fetch(`${service.endpoint}?id=${id}`, {
                method: 'DELETE',
                headers: typeof getAuthHeaders === 'function' ? getAuthHeaders() : { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Delete failed');
            }

            // Refresh table
            const tableId = `${FIN._state.currentModule}-${service.key}-table`;
            if (FIN._state.serviceTables[tableId]) {
                FIN._state.serviceTables[tableId].fetchData(1, FIN._state.serviceTables[tableId].pageSize);
            }
        } catch (error) {
            console.error('Delete error:', error);
            ERPNotification.error('Failed to delete item');
        }
    };

    // Show details modal for a record using ERPPopup (reuses edit form with disabled fields)
    FIN._showDetailsModal = function(service, item, itemId) {
        const formDef = FIN.getServiceFormDef(service.model);

        if (!formDef || typeof FINForms === 'undefined') {
            ERPNotification.error('Details view not available');
            return;
        }

        const title = `${service.label.replace(/s$/, '')} Details`;

        // Generate form HTML with the item data (same as edit form)
        let content = FINForms.generateFormHtml(formDef, item);

        // Show popup using ERPPopup
        ERPPopup.show({
            title: title,
            content: content,
            size: 'large',
            showFooter: false,
            onShow: (body) => {
                // Set form context for reference pickers to access displayFormat
                if (typeof ERPForms !== 'undefined' && ERPForms.setFormContext) {
                    ERPForms.setFormContext(formDef, service);
                }
                // Attach date pickers and reference pickers to fetch display values
                if (typeof ERPForms !== 'undefined' && ERPForms.attachDatePickers) {
                    ERPForms.attachDatePickers(body);
                }
                // Disable all form inputs
                body.querySelectorAll('input, select, textarea').forEach(el => {
                    el.disabled = true;
                });
            }
        });
    };

    // Get display value for a field in details view
    FIN._getFieldDisplayValue = function(item, field) {
        let value = item[field.key];

        // Handle nested keys
        if (field.key && field.key.includes('.')) {
            const keys = field.key.split('.');
            value = item;
            for (const k of keys) {
                if (value === null || value === undefined) break;
                value = value[k];
            }
        }

        if (value === null || value === undefined || value === '') {
            return '<span class="detail-empty">-</span>';
        }

        // Apply render function if provided
        if (field.render) {
            return field.render(item);
        }

        // Handle special types
        if (field.type === 'date' && typeof value === 'number') {
            return escapeHtml(formatDate(value));
        }

        if (field.type === 'currency' && typeof value === 'number') {
            return escapeHtml(formatMoney(value));
        }

        if (field.type === 'boolean') {
            return value ? '<span class="detail-value status-online">Yes</span>' : '<span class="detail-value status-offline">No</span>';
        }

        if (field.enumLabels && field.enumLabels[value] !== undefined) {
            return escapeHtml(field.enumLabels[value]);
        }

        return escapeHtml(String(value));
    };

    // Format field label from camelCase key
    FIN._formatFieldLabel = function(key) {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .replace(/Id$/, ' ID')
            .trim();
    };

    // Format field value for display
    FIN._formatFieldValue = function(key, value) {
        if (value === null || value === undefined || value === '') {
            return '<span class="detail-empty">-</span>';
        }

        // Detect and format dates (Unix timestamps in seconds)
        if ((key.toLowerCase().includes('date') || key.toLowerCase().includes('time') || key.toLowerCase().endsWith('at'))
            && typeof value === 'number' && value > 1000000000 && value < 2000000000) {
            return escapeHtml(formatDate(value));
        }

        // Format boolean values
        if (typeof value === 'boolean') {
            return value ? '<span class="detail-value status-online">Yes</span>' : '<span class="detail-value status-offline">No</span>';
        }

        // Format arrays
        if (Array.isArray(value)) {
            if (value.length === 0) return '<span class="detail-empty">-</span>';
            return escapeHtml(value.join(', '));
        }

        // Format objects
        if (typeof value === 'object') {
            return '<span class="detail-empty">[Object]</span>';
        }

        return escapeHtml(String(value));
    };

})();
