/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// SCM Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    const scmSvg = `
        <svg class="hcm-illustration" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="scmGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:0.4" />
                    <stop offset="100%" style="stop-color:#0284c7;stop-opacity:0.2" />
                </linearGradient>
            </defs>
            <g opacity="0.1">
                <line x1="0" y1="30" x2="1200" y2="30" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="0" y1="60" x2="1200" y2="60" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="0" y1="90" x2="1200" y2="90" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="200" y1="0" x2="200" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="400" y1="0" x2="400" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="600" y1="0" x2="600" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="800" y1="0" x2="800" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="1000" y1="0" x2="1000" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
            </g>
            <g class="people-animation">
                <rect x="180" y="45" width="40" height="30" rx="2" fill="url(#scmGradient1)" opacity="0.6"/>
                <polygon points="180,45 200,30 220,45" fill="url(#scmGradient1)" opacity="0.5"/>
                <rect x="385" y="50" width="15" height="15" rx="2" fill="url(#scmGradient1)" opacity="0.5"/>
                <rect x="395" y="40" width="15" height="15" rx="2" fill="url(#scmGradient1)" opacity="0.6"/>
                <rect x="405" y="55" width="15" height="15" rx="2" fill="url(#scmGradient1)" opacity="0.5"/>
                <rect x="575" y="50" width="30" height="20" rx="2" fill="url(#scmGradient1)" opacity="0.6"/>
                <rect x="605" y="55" width="15" height="15" rx="2" fill="url(#scmGradient1)" opacity="0.7"/>
                <circle cx="585" cy="73" r="4" fill="#0ea5e9" opacity="0.6"/>
                <circle cx="612" cy="73" r="4" fill="#0ea5e9" opacity="0.6"/>
                <circle cx="800" cy="55" r="10" fill="none" stroke="url(#scmGradient1)" stroke-width="3" opacity="0.5"/>
                <circle cx="820" cy="55" r="10" fill="none" stroke="url(#scmGradient1)" stroke-width="3" opacity="0.5"/>
                <circle cx="1000" cy="60" r="16" fill="url(#scmGradient1)" opacity="0.6"/>
                <ellipse cx="1000" cy="60" rx="16" ry="8" fill="none" stroke="#fff" stroke-width="1" opacity="0.4"/>
                <line x1="1000" y1="44" x2="1000" y2="76" stroke="#fff" stroke-width="1" opacity="0.4"/>
            </g>
            <path d="M 220,60 Q 300,40 385,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 420,55 Q 500,70 575,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 620,60 Q 700,45 790,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 830,55 Q 900,75 984,60" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <circle cx="300" cy="50" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="700" cy="55" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
            </circle>
        </svg>`;

    Layer8SectionConfigs.register('scm', {
        title: 'Supply Chain Management',
        subtitle: 'Procurement, Inventory, Warehouse, Logistics, Demand & Supply Planning',
        icon: '🔗',
        svgContent: scmSvg,
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
