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
// SCM Module - Configuration
// Module definitions and service mappings

(function() {
    'use strict';

    // Create SCM namespace
    window.SCM = window.SCM || {};

    // SCM Module Configuration
    SCM.modules = {
        'procurement': {
            label: 'Procurement',
            icon: '📦',
            services: [
                { key: 'purchase-requisitions', label: 'Requisitions', icon: '📋', endpoint: '/erp/200/PurchReq', model: 'PurchaseRequisition' },
                { key: 'requisition-lines', label: 'Requisition Lines', icon: '📝', endpoint: '/erp/200/ReqLine', model: 'RequisitionLine' },
                { key: 'rfqs', label: 'RFQs', icon: '📨', endpoint: '/erp/200/RFQ', model: 'RequestForQuotation' },
                { key: 'purchase-orders', label: 'Purchase Orders', icon: '📄', endpoint: '/erp/200/PurchOrder', model: 'PurchaseOrder' },
                { key: 'po-lines', label: 'PO Lines', icon: '📋', endpoint: '/erp/200/POLine', model: 'PurchaseOrderLine' },
                { key: 'blanket-orders', label: 'Blanket Orders', icon: '📑', endpoint: '/erp/200/BlnktOrder', model: 'BlanketOrder' },
                { key: 'supplier-scorecards', label: 'Scorecards', icon: '⭐', endpoint: '/erp/200/SupplrCard', model: 'SupplierScorecard' }
            ]
        },
        'inventory': {
            label: 'Inventory',
            icon: '📦',
            services: [
                { key: 'items', label: 'Items', icon: '📦', endpoint: '/erp/200/Item', model: 'Item' },
                { key: 'item-categories', label: 'Categories', icon: '📁', endpoint: '/erp/200/ItemCat', model: 'ItemCategory' },
                { key: 'stock-movements', label: 'Stock Movements', icon: '🔄', endpoint: '/erp/200/StockMove', model: 'StockMovement' },
                { key: 'lot-numbers', label: 'Lot Numbers', icon: '🏷️', endpoint: '/erp/200/LotNumber', model: 'LotNumber' },
                { key: 'serial-numbers', label: 'Serial Numbers', icon: '🔢', endpoint: '/erp/200/SerialNum', model: 'SerialNumber' },
                { key: 'cycle-counts', label: 'Cycle Counts', icon: '🔄', endpoint: '/erp/200/CycleCount', model: 'CycleCount' },
                { key: 'reorder-points', label: 'Reorder Points', icon: '📊', endpoint: '/erp/200/ReorderPt', model: 'ReorderPoint' },
                { key: 'inventory-valuations', label: 'Valuations', icon: '💰', endpoint: '/erp/200/InvValue', model: 'InventoryValuation' }
            ]
        },
        'warehouse': {
            label: 'Warehouse',
            icon: '🏭',
            services: [
                { key: 'warehouses', label: 'Warehouses', icon: '🏭', endpoint: '/erp/200/Warehouse', model: 'Warehouse' },
                { key: 'bins', label: 'Bins', icon: '📍', endpoint: '/erp/200/Bin', model: 'Bin' },
                { key: 'receiving-orders', label: 'Receiving', icon: '📥', endpoint: '/erp/200/RecvOrder', model: 'ReceivingOrder' },
                { key: 'putaway-tasks', label: 'Put Away', icon: '📤', endpoint: '/erp/200/PutAway', model: 'PutawayTask' },
                { key: 'pick-tasks', label: 'Pick Tasks', icon: '🔍', endpoint: '/erp/200/PickTask', model: 'PickTask' },
                { key: 'pack-tasks', label: 'Pack Tasks', icon: '📦', endpoint: '/erp/200/PackTask', model: 'PackTask' },
                { key: 'ship-tasks', label: 'Ship Tasks', icon: '🚚', endpoint: '/erp/200/ShipTask', model: 'ShipTask' },
                { key: 'wave-plans', label: 'Wave Plans', icon: '🌊', endpoint: '/erp/200/WavePlan', model: 'WavePlan' },
                { key: 'dock-schedules', label: 'Dock Schedules', icon: '🚢', endpoint: '/erp/200/DockSched', model: 'DockSchedule' }
            ]
        },
        'logistics': {
            label: 'Logistics',
            icon: '🚚',
            services: [
                { key: 'carriers', label: 'Carriers', icon: '🚚', endpoint: '/erp/200/Carrier', model: 'Carrier' },
                { key: 'freight-rates', label: 'Freight Rates', icon: '💲', endpoint: '/erp/200/FreightRt', model: 'FreightRate' },
                { key: 'shipments', label: 'Shipments', icon: '📦', endpoint: '/erp/200/Shipment', model: 'Shipment' },
                { key: 'routes', label: 'Routes', icon: '🗺️', endpoint: '/erp/200/Route', model: 'Route' },
                { key: 'load-plans', label: 'Load Plans', icon: '📋', endpoint: '/erp/200/LoadPlan', model: 'LoadPlan' },
                { key: 'delivery-proofs', label: 'Delivery Proofs', icon: '✅', endpoint: '/erp/200/DlvryProof', model: 'DeliveryProof' },
                { key: 'freight-audits', label: 'Freight Audits', icon: '🔍', endpoint: '/erp/200/FrtAudit', model: 'FreightAudit' },
                { key: 'return-authorizations', label: 'Returns', icon: '↩️', endpoint: '/erp/200/ReturnAuth', model: 'ReturnAuthorization' }
            ]
        },
        'demand-planning': {
            label: 'Demand Planning',
            icon: '📈',
            services: [
                { key: 'demand-forecasts', label: 'Forecasts', icon: '📊', endpoint: '/erp/200/DmndFcast', model: 'DemandForecast' },
                { key: 'forecast-models', label: 'Models', icon: '🧮', endpoint: '/erp/200/FcastModel', model: 'ForecastModel' },
                { key: 'demand-plans', label: 'Demand Plans', icon: '📋', endpoint: '/erp/200/DemandPlan', model: 'DemandPlan' },
                { key: 'promo-plans', label: 'Promotions', icon: '🎯', endpoint: '/erp/200/PromoPlan', model: 'PromotionalPlan' },
                { key: 'new-product-plans', label: 'New Products', icon: '🆕', endpoint: '/erp/200/NewProdPln', model: 'NewProductPlan' },
                { key: 'forecast-accuracies', label: 'Accuracy', icon: '🎯', endpoint: '/erp/200/FcastAccur', model: 'ForecastAccuracy' }
            ]
        },
        'supply-planning': {
            label: 'Supply Planning',
            icon: '🔗',
            services: [
                { key: 'material-requirements', label: 'Material Reqs', icon: '📋', endpoint: '/erp/200/MatReq', model: 'MaterialRequirement' },
                { key: 'distribution-requirements', label: 'Distribution Reqs', icon: '🔄', endpoint: '/erp/200/DistReq', model: 'DistributionRequirement' },
                { key: 'supply-plans', label: 'Supply Plans', icon: '📊', endpoint: '/erp/200/SupplyPlan', model: 'SupplyPlan' },
                { key: 'supplier-collaborations', label: 'Collaborations', icon: '🤝', endpoint: '/erp/200/SupCollab', model: 'SupplierCollaboration' },
                { key: 'safety-stocks', label: 'Safety Stock', icon: '🛡️', endpoint: '/erp/200/SafeStock', model: 'SafetyStock' },
                { key: 'lead-times', label: 'Lead Times', icon: '⏱️', endpoint: '/erp/200/LeadTime', model: 'LeadTime' }
            ]
        }
    };

    // Render status badge (uses shared erp-status-* classes)
    SCM.renderStatus = function(status) {
        const statusMap = {
            1: { label: 'Active', class: 'erp-status-active' },
            0: { label: 'Inactive', class: 'erp-status-inactive' },
            2: { label: 'Pending', class: 'erp-status-pending' },
            3: { label: 'Closed', class: 'erp-status-terminated' }
        };

        const config = statusMap[status] || { label: status, class: '' };
        return `<span class="erp-status ${config.class}">${ERPUtils.escapeHtml(config.label)}</span>`;
    };

})();
