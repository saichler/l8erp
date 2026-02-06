/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// SCM Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    Layer8SectionConfigs.register('scm', {
        title: 'Supply Chain Management',
        subtitle: 'Procurement, Inventory, Warehouse, Logistics, Demand & Supply Planning',
        icon: '🔗',
        svgContent: Layer8SvgFactory.generate('supplyChain'),
        initFn: 'initializeSCM',
        modules: [
            {
                key: 'procurement', label: 'Procurement', icon: '📦', isDefault: true,
                services: [
                    { key: 'purchase-requisitions', label: 'Requisitions', icon: '📋', isDefault: true },
                    { key: 'requisition-lines', label: 'Requisition Lines', icon: '📝' },
                    { key: 'rfqs', label: 'RFQs', icon: '📨' },
                    { key: 'purchase-orders', label: 'Purchase Orders', icon: '📄' },
                    { key: 'po-lines', label: 'PO Lines', icon: '📋' },
                    { key: 'blanket-orders', label: 'Blanket Orders', icon: '📑' },
                    { key: 'supplier-scorecards', label: 'Scorecards', icon: '⭐' }
                ]
            },
            {
                key: 'inventory', label: 'Inventory', icon: '📦',
                services: [
                    { key: 'items', label: 'Items', icon: '📦', isDefault: true },
                    { key: 'item-categories', label: 'Categories', icon: '📁' },
                    { key: 'stock-movements', label: 'Stock Movements', icon: '🔄' },
                    { key: 'lot-numbers', label: 'Lot Numbers', icon: '🏷️' },
                    { key: 'serial-numbers', label: 'Serial Numbers', icon: '🔢' },
                    { key: 'cycle-counts', label: 'Cycle Counts', icon: '🔄' },
                    { key: 'reorder-points', label: 'Reorder Points', icon: '📊' },
                    { key: 'inventory-valuations', label: 'Valuations', icon: '💰' }
                ]
            },
            {
                key: 'warehouse', label: 'Warehouse', icon: '🏭',
                services: [
                    { key: 'warehouses', label: 'Warehouses', icon: '🏭', isDefault: true },
                    { key: 'bins', label: 'Bins', icon: '📍' },
                    { key: 'receiving-orders', label: 'Receiving', icon: '📥' },
                    { key: 'putaway-tasks', label: 'Put Away', icon: '📤' },
                    { key: 'pick-tasks', label: 'Pick Tasks', icon: '🔍' },
                    { key: 'pack-tasks', label: 'Pack Tasks', icon: '📦' },
                    { key: 'ship-tasks', label: 'Ship Tasks', icon: '🚚' },
                    { key: 'wave-plans', label: 'Wave Plans', icon: '🌊' },
                    { key: 'dock-schedules', label: 'Dock Schedules', icon: '🚢' }
                ]
            },
            {
                key: 'logistics', label: 'Logistics', icon: '🚚',
                services: [
                    { key: 'carriers', label: 'Carriers', icon: '🚚', isDefault: true },
                    { key: 'freight-rates', label: 'Freight Rates', icon: '💲' },
                    { key: 'shipments', label: 'Shipments', icon: '📦' },
                    { key: 'routes', label: 'Routes', icon: '🗺️' },
                    { key: 'load-plans', label: 'Load Plans', icon: '📋' },
                    { key: 'delivery-proofs', label: 'Delivery Proofs', icon: '✅' },
                    { key: 'freight-audits', label: 'Freight Audits', icon: '🔍' },
                    { key: 'return-authorizations', label: 'Returns', icon: '↩️' }
                ]
            },
            {
                key: 'demand-planning', label: 'Demand Planning', icon: '📈',
                services: [
                    { key: 'demand-forecasts', label: 'Forecasts', icon: '📊', isDefault: true },
                    { key: 'forecast-models', label: 'Models', icon: '🧮' },
                    { key: 'demand-plans', label: 'Demand Plans', icon: '📋' },
                    { key: 'promo-plans', label: 'Promotions', icon: '🎯' },
                    { key: 'new-product-plans', label: 'New Products', icon: '🆕' },
                    { key: 'forecast-accuracies', label: 'Accuracy', icon: '🎯' }
                ]
            },
            {
                key: 'supply-planning', label: 'Supply Planning', icon: '🔗',
                services: [
                    { key: 'material-requirements', label: 'Material Reqs', icon: '📋', isDefault: true },
                    { key: 'distribution-requirements', label: 'Distribution Reqs', icon: '🔄' },
                    { key: 'supply-plans', label: 'Supply Plans', icon: '📊' },
                    { key: 'supplier-collaborations', label: 'Collaborations', icon: '🤝' },
                    { key: 'safety-stocks', label: 'Safety Stock', icon: '🛡️' },
                    { key: 'lead-times', label: 'Lead Times', icon: '⏱️' }
                ]
            }
        ]
    });
})();
