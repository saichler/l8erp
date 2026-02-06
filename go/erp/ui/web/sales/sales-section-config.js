/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Sales Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    const salesSvg = `
        <svg class="hcm-illustration" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="salesGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
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
                <circle cx="190" cy="55" r="12" fill="url(#salesGradient1)" opacity="0.6"/>
                <circle cx="210" cy="65" r="12" fill="url(#salesGradient1)" opacity="0.5"/>
                <rect x="380" y="45" width="40" height="30" rx="3" fill="url(#salesGradient1)" opacity="0.5"/>
                <rect x="385" y="50" width="30" height="3" fill="#fff" opacity="0.3"/>
                <rect x="385" y="56" width="25" height="3" fill="#fff" opacity="0.3"/>
                <rect x="385" y="62" width="28" height="3" fill="#fff" opacity="0.3"/>
                <rect x="575" y="40" width="50" height="40" rx="4" fill="url(#salesGradient1)" opacity="0.6"/>
                <circle cx="600" cy="60" r="10" fill="#fff" opacity="0.3"/>
                <text x="600" y="65" text-anchor="middle" fill="#0ea5e9" font-size="12" font-weight="bold">$</text>
                <rect x="775" y="50" width="50" height="25" rx="3" fill="url(#salesGradient1)" opacity="0.5"/>
                <rect x="780" y="55" width="40" height="15" rx="2" fill="#fff" opacity="0.2"/>
                <circle cx="1000" cy="55" r="15" fill="url(#salesGradient1)" opacity="0.6"/>
                <path d="M 992,55 L 998,61 L 1010,49" fill="none" stroke="#fff" stroke-width="2" opacity="0.6"/>
            </g>
            <path d="M 222,60 Q 300,45 380,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 420,60 Q 500,75 575,60" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 625,60 Q 700,45 775,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 825,60 Q 900,70 985,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <circle cx="300" cy="52" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="700" cy="52" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
            </circle>
        </svg>`;

    Layer8SectionConfigs.register('sales', {
        title: 'Sales',
        subtitle: 'Customers, Orders, Pricing, Shipping, Billing & Analytics',
        icon: '🛒',
        svgContent: salesSvg,
        initFn: 'initializeSales',
        modules: [
            {
                key: 'customers', label: 'Customers', icon: '👥', isDefault: true,
                services: [
                    { key: 'hierarchies', label: 'Hierarchies', icon: '🏢', isDefault: true },
                    { key: 'segments', label: 'Segments', icon: '📊' },
                    { key: 'contracts', label: 'Contracts', icon: '📄' },
                    { key: 'partners', label: 'Partners', icon: '🤝' }
                ]
            },
            {
                key: 'orders', label: 'Orders', icon: '📋',
                services: [
                    { key: 'quotations', label: 'Quotations', icon: '📝', isDefault: true },
                    { key: 'quotation-lines', label: 'Quote Lines', icon: '📋' },
                    { key: 'sales-orders', label: 'Sales Orders', icon: '📦' },
                    { key: 'order-lines', label: 'Order Lines', icon: '📝' },
                    { key: 'allocations', label: 'Allocations', icon: '📌' },
                    { key: 'back-orders', label: 'Back Orders', icon: '⏳' },
                    { key: 'returns', label: 'Returns', icon: '↩️' },
                    { key: 'return-lines', label: 'Return Lines', icon: '📋' }
                ]
            },
            {
                key: 'pricing', label: 'Pricing', icon: '💰',
                services: [
                    { key: 'price-lists', label: 'Price Lists', icon: '📃', isDefault: true },
                    { key: 'price-entries', label: 'Price Entries', icon: '📋' },
                    { key: 'customer-prices', label: 'Customer Prices', icon: '🏷️' },
                    { key: 'discounts', label: 'Discounts', icon: '🎫' },
                    { key: 'promotions', label: 'Promotions', icon: '🎯' },
                    { key: 'qty-breaks', label: 'Qty Breaks', icon: '📈' }
                ]
            },
            {
                key: 'shipping', label: 'Shipping', icon: '🚚',
                services: [
                    { key: 'deliveries', label: 'Deliveries', icon: '📬', isDefault: true },
                    { key: 'delivery-lines', label: 'Delivery Lines', icon: '📋' },
                    { key: 'pick-releases', label: 'Pick Releases', icon: '📋' },
                    { key: 'packing', label: 'Packing Slips', icon: '📦' },
                    { key: 'ship-docs', label: 'Ship Docs', icon: '📄' },
                    { key: 'confirmations', label: 'Confirmations', icon: '✅' }
                ]
            },
            {
                key: 'billing', label: 'Billing', icon: '💳',
                services: [
                    { key: 'schedules', label: 'Billing Schedules', icon: '📅', isDefault: true },
                    { key: 'milestones', label: 'Milestones', icon: '🏁' },
                    { key: 'revenue', label: 'Revenue Recog', icon: '📊' }
                ]
            },
            {
                key: 'analytics', label: 'Analytics', icon: '📊',
                services: [
                    { key: 'targets', label: 'Sales Targets', icon: '🎯', isDefault: true },
                    { key: 'territories', label: 'Territories', icon: '🗺️' },
                    { key: 'territory-assigns', label: 'Assignments', icon: '📍' },
                    { key: 'commission-plans', label: 'Commission Plans', icon: '💵' },
                    { key: 'commission-calcs', label: 'Calculations', icon: '🧮' },
                    { key: 'forecasts', label: 'Forecasts', icon: '🔮' }
                ]
            }
        ]
    });
})();
