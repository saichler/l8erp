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
// SCM Module - Service Configuration
// Service table initialization and configuration lookups

(function() {
    'use strict';

    // Ensure SCM namespace exists
    window.SCM = window.SCM || {};

    // Initialize a service table
    SCM._initializeServiceTable = function(moduleKey, service, tableId) {
        const containerId = `${moduleKey}-${service.key}-table-container`;
        const container = document.getElementById(containerId);

        if (!container) {
            console.warn(`Container not found: ${containerId}`);
            return;
        }

        // Get column configuration for this service
        const columns = SCM.getServiceColumns(service.model);
        const primaryKey = SCM.getServicePrimaryKey(service.model);

        // Create table instance
        const table = new L8Table({
            containerId: containerId,
            endpoint: service.endpoint,
            modelName: service.model,
            serverSide: true,
            columns: columns,
            primaryKey: primaryKey,
            pageSize: 10,
            onAdd: () => SCM._openAddModal(service),
            onEdit: (id) => SCM._openEditModal(service, id),
            onDelete: (id) => SCM._confirmDeleteItem(service, id),
            onRowClick: (item, id) => SCM._showDetailsModal(service, item, id),
            addButtonText: `Add ${service.label.replace(/s$/, '')}`
        });

        table.init();
        SCM._state.serviceTables[tableId] = table;
    };

    // SCM submodule namespaces to check for configuration
    const submodules = ['Procurement', 'Inventory', 'WarehouseManagement', 'Logistics', 'DemandPlanning', 'SupplyPlanning'];

    // Helper to find a property in any submodule namespace
    function findInSubmodules(property, modelName) {
        for (const ns of submodules) {
            const mod = window[ns];
            if (mod && mod[property] && mod[property][modelName]) {
                return mod[property][modelName];
            }
        }
        return null;
    }

    // Get column configuration for a service model
    SCM.getServiceColumns = function(modelName) {
        return findInSubmodules('columns', modelName) || [
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'status', label: 'Status' }
        ];
    };

    // Get form definition for a service model
    SCM.getServiceFormDef = function(modelName) {
        return findInSubmodules('forms', modelName);
    };

    // Get details configuration for a service model
    SCM.getServiceDetailsConfig = function(modelName) {
        return findInSubmodules('detailsConfig', modelName);
    };

    // Get primary key for a service model
    SCM.getServicePrimaryKey = function(modelName) {
        return findInSubmodules('primaryKeys', modelName) || 'id';
    };

})();
