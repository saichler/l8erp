/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// SCM Module Configuration - Uses Layer8ModuleConfigFactory
Layer8ModuleConfigFactory.create({
    namespace: 'SCM',
    modules: {
        'procurement': {
            label: 'Procurement', icon: '📦',
            services: [
                { key: 'purchase-requisitions', label: 'Requisitions', icon: '📋', endpoint: '/50/PurchReq', model: 'ScmPurchaseRequisition', supportedViews: ['table', 'kanban'] },
                { key: 'rfqs', label: 'RFQs', icon: '📨', endpoint: '/50/RFQ', model: 'ScmRequestForQuotation' },
                { key: 'purchase-orders', label: 'Purchase Orders', icon: '📄', endpoint: '/50/PurchOrder', model: 'ScmPurchaseOrder', supportedViews: ['table', 'kanban'] },
                { key: 'blanket-orders', label: 'Blanket Orders', icon: '📑', endpoint: '/50/BlnktOrder', model: 'ScmBlanketOrder' },
                { key: 'supplier-scorecards', label: 'Scorecards', icon: '⭐', endpoint: '/50/SupplrCard', model: 'ScmSupplierScorecard' }
            ]
        },
        'inventory': {
            label: 'Inventory', icon: '📦',
            services: [
                { key: 'items', label: 'Items', icon: '📦', endpoint: '/50/Item', model: 'ScmItem' },
                { key: 'item-categories', label: 'Categories', icon: '📁', endpoint: '/50/ItemCat', model: 'ScmItemCategory', supportedViews: ['table', 'tree'] },
                { key: 'cycle-counts', label: 'Cycle Counts', icon: '🔄', endpoint: '/50/CycleCount', model: 'ScmCycleCount' }
            ]
        },
        'warehouse': {
            label: 'Warehouse', icon: '🏭',
            services: [
                { key: 'warehouses', label: 'Warehouses', icon: '🏭', endpoint: '/50/Warehouse', model: 'ScmWarehouse' },
                { key: 'receiving-orders', label: 'Receiving', icon: '📥', endpoint: '/50/RecvOrder', model: 'ScmReceivingOrder' },
                { key: 'wave-plans', label: 'Wave Plans', icon: '🌊', endpoint: '/50/WavePlan', model: 'ScmWavePlan' },
                { key: 'dock-schedules', label: 'Dock Schedules', icon: '🚢', endpoint: '/50/DockSched', model: 'ScmDockSchedule', supportedViews: ['table', 'calendar'] }
            ]
        },
        'logistics': {
            label: 'Logistics', icon: '🚚',
            services: [
                { key: 'carriers', label: 'Carriers', icon: '🚚', endpoint: '/50/ScmCarrier', model: 'ScmCarrier' },
                { key: 'freight-rates', label: 'Freight Rates', icon: '💲', endpoint: '/50/FreightRt', model: 'ScmFreightRate' },
                { key: 'shipments', label: 'Shipments', icon: '📦', endpoint: '/50/Shipment', model: 'ScmShipment' },
                { key: 'routes', label: 'Routes', icon: '🗺️', endpoint: '/50/Route', model: 'ScmRoute' },
                { key: 'load-plans', label: 'Load Plans', icon: '📋', endpoint: '/50/LoadPlan', model: 'ScmLoadPlan' },
                { key: 'return-authorizations', label: 'Returns', icon: '↩️', endpoint: '/50/ReturnAuth', model: 'ScmReturnAuthorization', supportedViews: ['table', 'kanban'] }
            ]
        },
        'demand-planning': {
            label: 'Demand Planning', icon: '📈',
            services: [
                { key: 'demand-forecasts', label: 'Forecasts', icon: '📊', endpoint: '/50/DmndFcast', model: 'ScmDemandForecast' },
                { key: 'forecast-models', label: 'Models', icon: '🧮', endpoint: '/50/FcastModel', model: 'ScmForecastModel' },
                { key: 'demand-plans', label: 'Demand Plans', icon: '📋', endpoint: '/50/DemandPlan', model: 'ScmDemandPlan' },
                { key: 'promo-plans', label: 'Promotions', icon: '🎯', endpoint: '/50/PromoPlan', model: 'ScmPromotionalPlan' },
                { key: 'new-product-plans', label: 'New Products', icon: '🆕', endpoint: '/50/NewProdPln', model: 'ScmNewProductPlan' }
            ]
        },
        'supply-planning': {
            label: 'Supply Planning', icon: '🔗',
            services: [
                { key: 'material-requirements', label: 'Material Reqs', icon: '📋', endpoint: '/50/MatReq', model: 'ScmMaterialRequirement' },
                { key: 'distribution-requirements', label: 'Distribution Reqs', icon: '🔄', endpoint: '/50/DistReq', model: 'ScmDistributionRequirement' },
                { key: 'supply-plans', label: 'Supply Plans', icon: '📊', endpoint: '/50/SupplyPlan', model: 'ScmSupplyPlan' },
                { key: 'supplier-collaborations', label: 'Collaborations', icon: '🤝', endpoint: '/50/SupCollab', model: 'ScmSupplierCollaboration' },
                { key: 'safety-stocks', label: 'Safety Stock', icon: '🛡️', endpoint: '/50/SafeStock', model: 'ScmSafetyStock' },
                { key: 'lead-times', label: 'Lead Times', icon: '⏱️', endpoint: '/50/LeadTime', model: 'ScmLeadTime' }
            ]
        }
    },
    submodules: ['Procurement', 'Inventory', 'WarehouseManagement', 'Logistics', 'ScmDemandPlanning', 'ScmSupplyPlanning']
});
