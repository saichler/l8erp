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
                    { key: 'rfqs', label: 'RFQs', icon: '📨' },
                    { key: 'purchase-orders', label: 'Purchase Orders', icon: '📄' },
                    { key: 'blanket-orders', label: 'Blanket Orders', icon: '📑' },
                    { key: 'supplier-scorecards', label: 'Scorecards', icon: '⭐' }
                ]
            },
            {
                key: 'inventory', label: 'Inventory', icon: '📦',
                services: [
                    { key: 'items', label: 'Items', icon: '📦', isDefault: true },
                    { key: 'item-categories', label: 'Categories', icon: '📁' },
                    { key: 'cycle-counts', label: 'Cycle Counts', icon: '🔄' }
                ]
            },
            {
                key: 'warehouse', label: 'Warehouse', icon: '🏭',
                services: [
                    { key: 'warehouses', label: 'Warehouses', icon: '🏭', isDefault: true },
                    { key: 'receiving-orders', label: 'Receiving', icon: '📥' },
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
                    { key: 'new-product-plans', label: 'New Products', icon: '🆕' }
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
            },
            {
                key: 'reports',
                label: 'Reports',
                icon: '📊',
                services: [
                    { key: 'module-reports', label: 'Module Reports', icon: '📊', isDefault: true }
                ]
            }
        ]
    });
})();
