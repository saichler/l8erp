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
// HCM Module - Service Configuration
// Service table initialization and configuration lookups

(function() {
    'use strict';

    // Ensure HCM namespace exists
    window.HCM = window.HCM || {};

    // Initialize a service table
    HCM._initializeServiceTable = function(moduleKey, service, tableId) {
        const containerId = `${moduleKey}-${service.key}-table-container`;
        const container = document.getElementById(containerId);

        if (!container) {
            console.warn(`Container not found: ${containerId}`);
            return;
        }

        // Get column configuration for this service
        const columns = HCM.getServiceColumns(service.model);
        const primaryKey = HCM.getServicePrimaryKey(service.model);

        // Create table instance
        const table = new L8Table({
            containerId: containerId,
            endpoint: service.endpoint,
            modelName: service.model,
            serverSide: true,
            columns: columns,
            primaryKey: primaryKey,
            pageSize: 10,
            onAdd: () => HCM._openAddModal(service),
            onEdit: (id) => HCM._openEditModal(service, id),
            onDelete: (id) => HCM._confirmDeleteItem(service, id),
            onRowClick: (item, id) => HCM._showDetailsModal(service, item, id),
            addButtonText: `Add ${service.label.replace(/s$/, '')}`
        });

        table.init();
        HCM._state.serviceTables[tableId] = table;
    };

    // Get column configuration for a service model
    HCM.getServiceColumns = function(modelName) {
        // Check for Core HR columns
        if (typeof CoreHR !== 'undefined' && CoreHR.columns && CoreHR.columns[modelName]) {
            return CoreHR.columns[modelName];
        }

        // Check for Payroll columns
        if (typeof Payroll !== 'undefined' && Payroll.columns && Payroll.columns[modelName]) {
            return Payroll.columns[modelName];
        }

        // Check for Benefits columns
        if (typeof Benefits !== 'undefined' && Benefits.columns && Benefits.columns[modelName]) {
            return Benefits.columns[modelName];
        }

        // Check for Time columns
        if (typeof Time !== 'undefined' && Time.columns && Time.columns[modelName]) {
            return Time.columns[modelName];
        }

        // Check for Talent columns
        if (typeof Talent !== 'undefined' && Talent.columns && Talent.columns[modelName]) {
            return Talent.columns[modelName];
        }

        // Check for Learning columns
        if (typeof Learning !== 'undefined' && Learning.columns && Learning.columns[modelName]) {
            return Learning.columns[modelName];
        }

        // Check for Compensation columns
        if (typeof Compensation !== 'undefined' && Compensation.columns && Compensation.columns[modelName]) {
            return Compensation.columns[modelName];
        }

        // Default columns for models not yet configured
        return [
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'status', label: 'Status' }
        ];
    };

    // Get form definition for a service model
    HCM.getServiceFormDef = function(modelName) {
        // Check Core HR forms
        if (typeof CoreHR !== 'undefined' && CoreHR.forms && CoreHR.forms[modelName]) {
            return CoreHR.forms[modelName];
        }

        // Check Payroll forms
        if (typeof Payroll !== 'undefined' && Payroll.forms && Payroll.forms[modelName]) {
            return Payroll.forms[modelName];
        }

        // Check Benefits forms
        if (typeof Benefits !== 'undefined' && Benefits.forms && Benefits.forms[modelName]) {
            return Benefits.forms[modelName];
        }

        // Check Time forms
        if (typeof Time !== 'undefined' && Time.forms && Time.forms[modelName]) {
            return Time.forms[modelName];
        }

        // Check Talent forms
        if (typeof Talent !== 'undefined' && Talent.forms && Talent.forms[modelName]) {
            return Talent.forms[modelName];
        }

        // Check Learning forms
        if (typeof Learning !== 'undefined' && Learning.forms && Learning.forms[modelName]) {
            return Learning.forms[modelName];
        }

        // Check Compensation forms
        if (typeof Compensation !== 'undefined' && Compensation.forms && Compensation.forms[modelName]) {
            return Compensation.forms[modelName];
        }

        return null;
    };

    // Get details configuration for a service model
    HCM.getServiceDetailsConfig = function(modelName) {
        // Check Core HR details config
        if (typeof CoreHR !== 'undefined' && CoreHR.detailsConfig && CoreHR.detailsConfig[modelName]) {
            return CoreHR.detailsConfig[modelName];
        }

        // Check Payroll details config
        if (typeof Payroll !== 'undefined' && Payroll.detailsConfig && Payroll.detailsConfig[modelName]) {
            return Payroll.detailsConfig[modelName];
        }

        // Check Benefits details config
        if (typeof Benefits !== 'undefined' && Benefits.detailsConfig && Benefits.detailsConfig[modelName]) {
            return Benefits.detailsConfig[modelName];
        }

        // Check Time details config
        if (typeof Time !== 'undefined' && Time.detailsConfig && Time.detailsConfig[modelName]) {
            return Time.detailsConfig[modelName];
        }

        // Check Talent details config
        if (typeof Talent !== 'undefined' && Talent.detailsConfig && Talent.detailsConfig[modelName]) {
            return Talent.detailsConfig[modelName];
        }

        // Check Learning details config
        if (typeof Learning !== 'undefined' && Learning.detailsConfig && Learning.detailsConfig[modelName]) {
            return Learning.detailsConfig[modelName];
        }

        // Check Compensation details config
        if (typeof Compensation !== 'undefined' && Compensation.detailsConfig && Compensation.detailsConfig[modelName]) {
            return Compensation.detailsConfig[modelName];
        }

        return null;
    };

    // Get primary key for a service model
    HCM.getServicePrimaryKey = function(modelName) {
        // Check Core HR primary keys
        if (typeof CoreHR !== 'undefined' && CoreHR.primaryKeys && CoreHR.primaryKeys[modelName]) {
            return CoreHR.primaryKeys[modelName];
        }

        // Check Payroll primary keys
        if (typeof Payroll !== 'undefined' && Payroll.primaryKeys && Payroll.primaryKeys[modelName]) {
            return Payroll.primaryKeys[modelName];
        }

        // Check Benefits primary keys
        if (typeof Benefits !== 'undefined' && Benefits.primaryKeys && Benefits.primaryKeys[modelName]) {
            return Benefits.primaryKeys[modelName];
        }

        // Check Time primary keys
        if (typeof Time !== 'undefined' && Time.primaryKeys && Time.primaryKeys[modelName]) {
            return Time.primaryKeys[modelName];
        }

        // Check Talent primary keys
        if (typeof Talent !== 'undefined' && Talent.primaryKeys && Talent.primaryKeys[modelName]) {
            return Talent.primaryKeys[modelName];
        }

        // Check Learning primary keys
        if (typeof Learning !== 'undefined' && Learning.primaryKeys && Learning.primaryKeys[modelName]) {
            return Learning.primaryKeys[modelName];
        }

        // Check Compensation primary keys
        if (typeof Compensation !== 'undefined' && Compensation.primaryKeys && Compensation.primaryKeys[modelName]) {
            return Compensation.primaryKeys[modelName];
        }

        // Default fallback
        return 'id';
    };

})();
