/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Sales Module Configuration - Uses Layer8ModuleConfigFactory
Layer8ModuleConfigFactory.create({
    namespace: 'Sales',
    modules: {
        'customers': {
            label: 'Customers', icon: '👥',
            services: [
                { key: 'hierarchies', label: 'Hierarchies', icon: '🏢', endpoint: '/60/CustHier', model: 'SalesCustomerHierarchy', supportedViews: ['table', 'tree'] },
                { key: 'segments', label: 'Segments', icon: '📊', endpoint: '/60/CustSegmt', model: 'SalesCustomerSegment' },
                { key: 'contracts', label: 'Contracts', icon: '📄', endpoint: '/60/CustContr', model: 'SalesCustomerContract' },
                { key: 'partners', label: 'Partners', icon: '🤝', endpoint: '/60/Partner', model: 'SalesPartnerChannel' }
            ]
        },
        'orders': {
            label: 'Orders', icon: '📋',
            services: [
                { key: 'quotations', label: 'Quotations', icon: '📝', endpoint: '/60/SalesQuote', model: 'SalesQuotation', supportedViews: ['table', 'kanban'] },
                { key: 'sales-orders', label: 'Sales Orders', icon: '📦', endpoint: '/60/SalesOrder', model: 'SalesOrder', supportedViews: ['table', 'kanban'] },
                { key: 'returns', label: 'Returns', icon: '↩️', endpoint: '/60/ReturnOrd', model: 'SalesReturnOrder', supportedViews: ['table', 'kanban'] }
            ]
        },
        'pricing': {
            label: 'Pricing', icon: '💰',
            services: [
                { key: 'price-lists', label: 'Price Lists', icon: '📃', endpoint: '/60/PriceList', model: 'SalesPriceList' },
                { key: 'discounts', label: 'Discounts', icon: '🎫', endpoint: '/60/DiscntRule', model: 'SalesDiscountRule' },
                { key: 'promotions', label: 'Promotions', icon: '🎯', endpoint: '/60/PromoPrice', model: 'SalesPromotionalPrice' }
            ]
        },
        'shipping': {
            label: 'Shipping', icon: '🚚',
            services: [
                { key: 'deliveries', label: 'Deliveries', icon: '📬', endpoint: '/60/DlvryOrder', model: 'SalesDeliveryOrder' }
            ]
        },
        'billing': {
            label: 'Billing', icon: '💳',
            services: [
                { key: 'schedules', label: 'Billing Schedules', icon: '📅', endpoint: '/60/BillSched', model: 'SalesBillingSchedule' },
                { key: 'revenue', label: 'Revenue Recog', icon: '📊', endpoint: '/60/RevSched', model: 'SalesRevenueSchedule' }
            ]
        },
        'analytics': {
            label: 'Analytics', icon: '📊',
            services: [
                { key: 'targets', label: 'Sales Targets', icon: '🎯', endpoint: '/60/SalesTrgt', model: 'SalesTarget', supportedViews: ['table', 'chart'] },
                { key: 'territories', label: 'Territories', icon: '🗺️', endpoint: '/60/Territory', model: 'SalesTerritory' },
                { key: 'commission-plans', label: 'Commission Plans', icon: '💵', endpoint: '/60/CommPlan', model: 'SalesCommissionPlan' },
                { key: 'forecasts', label: 'Forecasts', icon: '🔮', endpoint: '/60/SalesFcast', model: 'SalesForecast', supportedViews: ['table', 'chart'] }
            ]
        },
        'reports': {
            label: 'Reports', icon: '📊',
            services: [
                { key: 'module-reports', label: 'Reports', endpoint: '/60/SalesRept', model: 'FinReport' }
            ]
        }
    },
    submodules: ['SalesCustomers', 'SalesOrders', 'SalesPricing', 'SalesShipping', 'SalesBilling', 'SalesAnalytics', 'Reports']
});
