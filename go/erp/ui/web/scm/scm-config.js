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
                { key: 'purchase-requisitions', label: 'Requisitions', icon: '📋', endpoint: '/erp/50/PurchReq', model: 'ScmPurchaseRequisition' },
                { key: 'requisition-lines', label: 'Requisition Lines', icon: '📝', endpoint: '/erp/50/ReqLine', model: 'ScmRequisitionLine' },
                { key: 'rfqs', label: 'RFQs', icon: '📨', endpoint: '/erp/50/RFQ', model: 'ScmRequestForQuotation' },
                { key: 'purchase-orders', label: 'Purchase Orders', icon: '📄', endpoint: '/erp/50/PurchOrder', model: 'ScmPurchaseOrder' },
                { key: 'po-lines', label: 'PO Lines', icon: '📋', endpoint: '/erp/50/POLine', model: 'ScmPurchaseOrderLine' },
                { key: 'blanket-orders', label: 'Blanket Orders', icon: '📑', endpoint: '/erp/50/BlnktOrder', model: 'ScmBlanketOrder' },
                { key: 'supplier-scorecards', label: 'Scorecards', icon: '⭐', endpoint: '/erp/50/SupplrCard', model: 'ScmSupplierScorecard' }
            ]
        },
        'inventory': {
            label: 'Inventory',
            icon: '📦',
            services: [
                { key: 'items', label: 'Items', icon: '📦', endpoint: '/erp/50/Item', model: 'ScmItem' },
                { key: 'item-categories', label: 'Categories', icon: '📁', endpoint: '/erp/50/ItemCat', model: 'ScmItemCategory' },
                { key: 'stock-movements', label: 'Stock Movements', icon: '🔄', endpoint: '/erp/50/StockMove', model: 'ScmStockMovement' },
                { key: 'lot-numbers', label: 'Lot Numbers', icon: '🏷️', endpoint: '/erp/50/LotNumber', model: 'ScmLotNumber' },
                { key: 'serial-numbers', label: 'Serial Numbers', icon: '🔢', endpoint: '/erp/50/SerialNum', model: 'ScmSerialNumber' },
                { key: 'cycle-counts', label: 'Cycle Counts', icon: '🔄', endpoint: '/erp/50/CycleCount', model: 'ScmCycleCount' },
                { key: 'reorder-points', label: 'Reorder Points', icon: '📊', endpoint: '/erp/50/ReorderPt', model: 'ScmReorderPoint' },
                { key: 'inventory-valuations', label: 'Valuations', icon: '💰', endpoint: '/erp/50/InvValue', model: 'ScmInventoryValuation' }
            ]
        },
        'warehouse': {
            label: 'Warehouse',
            icon: '🏭',
            services: [
                { key: 'warehouses', label: 'Warehouses', icon: '🏭', endpoint: '/erp/50/Warehouse', model: 'ScmWarehouse' },
                { key: 'bins', label: 'Bins', icon: '📍', endpoint: '/erp/50/Bin', model: 'ScmBin' },
                { key: 'receiving-orders', label: 'Receiving', icon: '📥', endpoint: '/erp/50/RecvOrder', model: 'ScmReceivingOrder' },
                { key: 'putaway-tasks', label: 'Put Away', icon: '📤', endpoint: '/erp/50/PutAway', model: 'ScmPutawayTask' },
                { key: 'pick-tasks', label: 'Pick Tasks', icon: '🔍', endpoint: '/erp/50/PickTask', model: 'ScmPickTask' },
                { key: 'pack-tasks', label: 'Pack Tasks', icon: '📦', endpoint: '/erp/50/PackTask', model: 'ScmPackTask' },
                { key: 'ship-tasks', label: 'Ship Tasks', icon: '🚚', endpoint: '/erp/50/ShipTask', model: 'ScmShipTask' },
                { key: 'wave-plans', label: 'Wave Plans', icon: '🌊', endpoint: '/erp/50/WavePlan', model: 'ScmWavePlan' },
                { key: 'dock-schedules', label: 'Dock Schedules', icon: '🚢', endpoint: '/erp/50/DockSched', model: 'ScmDockSchedule' }
            ]
        },
        'logistics': {
            label: 'Logistics',
            icon: '🚚',
            services: [
                { key: 'carriers', label: 'Carriers', icon: '🚚', endpoint: '/erp/50/ScmCarrier', model: 'ScmCarrier' },
                { key: 'freight-rates', label: 'Freight Rates', icon: '💲', endpoint: '/erp/50/FreightRt', model: 'ScmFreightRate' },
                { key: 'shipments', label: 'Shipments', icon: '📦', endpoint: '/erp/50/Shipment', model: 'ScmShipment' },
                { key: 'routes', label: 'Routes', icon: '🗺️', endpoint: '/erp/50/Route', model: 'ScmRoute' },
                { key: 'load-plans', label: 'Load Plans', icon: '📋', endpoint: '/erp/50/LoadPlan', model: 'ScmLoadPlan' },
                { key: 'delivery-proofs', label: 'Delivery Proofs', icon: '✅', endpoint: '/erp/50/DlvryProof', model: 'ScmDeliveryProof' },
                { key: 'freight-audits', label: 'Freight Audits', icon: '🔍', endpoint: '/erp/50/FrtAudit', model: 'ScmFreightAudit' },
                { key: 'return-authorizations', label: 'Returns', icon: '↩️', endpoint: '/erp/50/ReturnAuth', model: 'ScmReturnAuthorization' }
            ]
        },
        'demand-planning': {
            label: 'Demand Planning',
            icon: '📈',
            services: [
                { key: 'demand-forecasts', label: 'Forecasts', icon: '📊', endpoint: '/erp/50/DmndFcast', model: 'ScmDemandForecast' },
                { key: 'forecast-models', label: 'Models', icon: '🧮', endpoint: '/erp/50/FcastModel', model: 'ScmForecastModel' },
                { key: 'demand-plans', label: 'Demand Plans', icon: '📋', endpoint: '/erp/50/DemandPlan', model: 'ScmDemandPlan' },
                { key: 'promo-plans', label: 'Promotions', icon: '🎯', endpoint: '/erp/50/PromoPlan', model: 'ScmPromotionalPlan' },
                { key: 'new-product-plans', label: 'New Products', icon: '🆕', endpoint: '/erp/50/NewProdPln', model: 'ScmNewProductPlan' },
                { key: 'forecast-accuracies', label: 'Accuracy', icon: '🎯', endpoint: '/erp/50/FcastAccur', model: 'ScmForecastAccuracy' }
            ]
        },
        'supply-planning': {
            label: 'Supply Planning',
            icon: '🔗',
            services: [
                { key: 'material-requirements', label: 'Material Reqs', icon: '📋', endpoint: '/erp/50/MatReq', model: 'ScmMaterialRequirement' },
                { key: 'distribution-requirements', label: 'Distribution Reqs', icon: '🔄', endpoint: '/erp/50/DistReq', model: 'ScmDistributionRequirement' },
                { key: 'supply-plans', label: 'Supply Plans', icon: '📊', endpoint: '/erp/50/SupplyPlan', model: 'ScmSupplyPlan' },
                { key: 'supplier-collaborations', label: 'Collaborations', icon: '🤝', endpoint: '/erp/50/SupCollab', model: 'ScmSupplierCollaboration' },
                { key: 'safety-stocks', label: 'Safety Stock', icon: '🛡️', endpoint: '/erp/50/SafeStock', model: 'ScmSafetyStock' },
                { key: 'lead-times', label: 'Lead Times', icon: '⏱️', endpoint: '/erp/50/LeadTime', model: 'ScmLeadTime' }
            ]
        }
    };

    // Sub-module namespaces for service registry
    SCM.submodules = ['Procurement', 'Inventory', 'WarehouseManagement', 'Logistics', 'DemandPlanning', 'SupplyPlanning'];

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
