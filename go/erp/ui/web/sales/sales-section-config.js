/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Sales Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    Layer8SectionConfigs.register('sales', {
        title: 'Sales',
        subtitle: 'Customers, Orders, Pricing, Shipping, Billing & Analytics',
        icon: '🛒',
        svgContent: Layer8SvgFactory.generate('sales'),
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
