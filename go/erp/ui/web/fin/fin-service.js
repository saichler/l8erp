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
// FIN Module - Service Configuration
// Service table initialization and configuration lookups

(function() {
    'use strict';

    // Ensure FIN namespace exists
    window.FIN = window.FIN || {};

    // Initialize a service table
    FIN._initializeServiceTable = function(moduleKey, service, tableId) {
        const containerId = `${moduleKey}-${service.key}-table-container`;
        const container = document.getElementById(containerId);

        if (!container) {
            console.warn(`Container not found: ${containerId}`);
            return;
        }

        // Get column configuration for this service
        const columns = FIN.getServiceColumns(service.model);
        const primaryKey = FIN.getServicePrimaryKey(service.model);

        // Create table instance
        const table = new L8Table({
            containerId: containerId,
            endpoint: service.endpoint,
            modelName: service.model,
            serverSide: true,
            columns: columns,
            primaryKey: primaryKey,
            pageSize: 10,
            onAdd: () => FIN._openAddModal(service),
            onEdit: (id) => FIN._openEditModal(service, id),
            onDelete: (id) => FIN._confirmDeleteItem(service, id),
            onRowClick: (item, id) => FIN._showDetailsModal(service, item, id),
            addButtonText: `Add ${service.label.replace(/s$/, '')}`
        });

        table.init();
        FIN._state.serviceTables[tableId] = table;
    };

    // Get column configuration for a service model
    FIN.getServiceColumns = function(modelName) {
        // Check for General Ledger columns
        if (typeof GeneralLedger !== 'undefined' && GeneralLedger.columns && GeneralLedger.columns[modelName]) {
            return GeneralLedger.columns[modelName];
        }

        // Check for Accounts Payable columns
        if (typeof AccountsPayable !== 'undefined' && AccountsPayable.columns && AccountsPayable.columns[modelName]) {
            return AccountsPayable.columns[modelName];
        }

        // Check for Accounts Receivable columns
        if (typeof AccountsReceivable !== 'undefined' && AccountsReceivable.columns && AccountsReceivable.columns[modelName]) {
            return AccountsReceivable.columns[modelName];
        }

        // Check for Cash Management columns
        if (typeof CashManagement !== 'undefined' && CashManagement.columns && CashManagement.columns[modelName]) {
            return CashManagement.columns[modelName];
        }

        // Check for Fixed Assets columns
        if (typeof FixedAssets !== 'undefined' && FixedAssets.columns && FixedAssets.columns[modelName]) {
            return FixedAssets.columns[modelName];
        }

        // Check for Budgeting columns
        if (typeof Budgeting !== 'undefined' && Budgeting.columns && Budgeting.columns[modelName]) {
            return Budgeting.columns[modelName];
        }

        // Check for Tax Management columns
        if (typeof TaxManagement !== 'undefined' && TaxManagement.columns && TaxManagement.columns[modelName]) {
            return TaxManagement.columns[modelName];
        }

        // Default columns for models not yet configured
        return [
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'status', label: 'Status' }
        ];
    };

    // Get form definition for a service model
    FIN.getServiceFormDef = function(modelName) {
        // Check General Ledger forms
        if (typeof GeneralLedger !== 'undefined' && GeneralLedger.forms && GeneralLedger.forms[modelName]) {
            return GeneralLedger.forms[modelName];
        }

        // Check Accounts Payable forms
        if (typeof AccountsPayable !== 'undefined' && AccountsPayable.forms && AccountsPayable.forms[modelName]) {
            return AccountsPayable.forms[modelName];
        }

        // Check Accounts Receivable forms
        if (typeof AccountsReceivable !== 'undefined' && AccountsReceivable.forms && AccountsReceivable.forms[modelName]) {
            return AccountsReceivable.forms[modelName];
        }

        // Check Cash Management forms
        if (typeof CashManagement !== 'undefined' && CashManagement.forms && CashManagement.forms[modelName]) {
            return CashManagement.forms[modelName];
        }

        // Check Fixed Assets forms
        if (typeof FixedAssets !== 'undefined' && FixedAssets.forms && FixedAssets.forms[modelName]) {
            return FixedAssets.forms[modelName];
        }

        // Check Budgeting forms
        if (typeof Budgeting !== 'undefined' && Budgeting.forms && Budgeting.forms[modelName]) {
            return Budgeting.forms[modelName];
        }

        // Check Tax Management forms
        if (typeof TaxManagement !== 'undefined' && TaxManagement.forms && TaxManagement.forms[modelName]) {
            return TaxManagement.forms[modelName];
        }

        return null;
    };

    // Get details configuration for a service model
    FIN.getServiceDetailsConfig = function(modelName) {
        // Check General Ledger details config
        if (typeof GeneralLedger !== 'undefined' && GeneralLedger.detailsConfig && GeneralLedger.detailsConfig[modelName]) {
            return GeneralLedger.detailsConfig[modelName];
        }

        // Check Accounts Payable details config
        if (typeof AccountsPayable !== 'undefined' && AccountsPayable.detailsConfig && AccountsPayable.detailsConfig[modelName]) {
            return AccountsPayable.detailsConfig[modelName];
        }

        // Check Accounts Receivable details config
        if (typeof AccountsReceivable !== 'undefined' && AccountsReceivable.detailsConfig && AccountsReceivable.detailsConfig[modelName]) {
            return AccountsReceivable.detailsConfig[modelName];
        }

        // Check Cash Management details config
        if (typeof CashManagement !== 'undefined' && CashManagement.detailsConfig && CashManagement.detailsConfig[modelName]) {
            return CashManagement.detailsConfig[modelName];
        }

        // Check Fixed Assets details config
        if (typeof FixedAssets !== 'undefined' && FixedAssets.detailsConfig && FixedAssets.detailsConfig[modelName]) {
            return FixedAssets.detailsConfig[modelName];
        }

        // Check Budgeting details config
        if (typeof Budgeting !== 'undefined' && Budgeting.detailsConfig && Budgeting.detailsConfig[modelName]) {
            return Budgeting.detailsConfig[modelName];
        }

        // Check Tax Management details config
        if (typeof TaxManagement !== 'undefined' && TaxManagement.detailsConfig && TaxManagement.detailsConfig[modelName]) {
            return TaxManagement.detailsConfig[modelName];
        }

        return null;
    };

    // Get primary key for a service model
    FIN.getServicePrimaryKey = function(modelName) {
        // Check General Ledger primary keys
        if (typeof GeneralLedger !== 'undefined' && GeneralLedger.primaryKeys && GeneralLedger.primaryKeys[modelName]) {
            return GeneralLedger.primaryKeys[modelName];
        }

        // Check Accounts Payable primary keys
        if (typeof AccountsPayable !== 'undefined' && AccountsPayable.primaryKeys && AccountsPayable.primaryKeys[modelName]) {
            return AccountsPayable.primaryKeys[modelName];
        }

        // Check Accounts Receivable primary keys
        if (typeof AccountsReceivable !== 'undefined' && AccountsReceivable.primaryKeys && AccountsReceivable.primaryKeys[modelName]) {
            return AccountsReceivable.primaryKeys[modelName];
        }

        // Check Cash Management primary keys
        if (typeof CashManagement !== 'undefined' && CashManagement.primaryKeys && CashManagement.primaryKeys[modelName]) {
            return CashManagement.primaryKeys[modelName];
        }

        // Check Fixed Assets primary keys
        if (typeof FixedAssets !== 'undefined' && FixedAssets.primaryKeys && FixedAssets.primaryKeys[modelName]) {
            return FixedAssets.primaryKeys[modelName];
        }

        // Check Budgeting primary keys
        if (typeof Budgeting !== 'undefined' && Budgeting.primaryKeys && Budgeting.primaryKeys[modelName]) {
            return Budgeting.primaryKeys[modelName];
        }

        // Check Tax Management primary keys
        if (typeof TaxManagement !== 'undefined' && TaxManagement.primaryKeys && TaxManagement.primaryKeys[modelName]) {
            return TaxManagement.primaryKeys[modelName];
        }

        // Default fallback
        return 'id';
    };

})();
