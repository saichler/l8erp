/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// E-Commerce Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    Layer8SectionConfigs.register('ecommerce', {
        title: 'E-Commerce',
        subtitle: 'Catalog, Orders, Customers & Promotions',
        icon: '🛒',
        svgContent: Layer8SvgFactory.generate('ecommerce'),
        initFn: 'initializeEcom',
        modules: [
            {
                key: 'catalog', label: 'Catalog', icon: '🏪', isDefault: true,
                services: [
                    { key: 'products', label: 'Products', icon: '📦', isDefault: true },
                    { key: 'categories', label: 'Categories', icon: '📂' },
                    { key: 'attributes', label: 'Attributes', icon: '📋' },
                    { key: 'images', label: 'Images', icon: '🖼️' },
                    { key: 'variants', label: 'Variants', icon: '🎨' }
                ]
            },
            {
                key: 'orders', label: 'Orders', icon: '📦',
                services: [
                    { key: 'orders', label: 'Orders', icon: '📋', isDefault: true },
                    { key: 'order-lines', label: 'Order Lines', icon: '📝' },
                    { key: 'order-statuses', label: 'Order Statuses', icon: '📊' },
                    { key: 'returns', label: 'Returns', icon: '↩️' },
                    { key: 'return-lines', label: 'Return Lines', icon: '📄' }
                ]
            },
            {
                key: 'customers', label: 'Customers', icon: '👥',
                services: [
                    { key: 'customers', label: 'Customers', icon: '👤', isDefault: true },
                    { key: 'addresses', label: 'Addresses', icon: '📍' },
                    { key: 'wishlists', label: 'Wishlists', icon: '❤️' },
                    { key: 'wishlist-items', label: 'Wishlist Items', icon: '📌' },
                    { key: 'carts', label: 'Carts', icon: '🛒' }
                ]
            },
            {
                key: 'promotions', label: 'Promotions', icon: '🏷️',
                services: [
                    { key: 'promotions', label: 'Promotions', icon: '🎁', isDefault: true },
                    { key: 'coupons', label: 'Coupons', icon: '🎫' },
                    { key: 'price-rules', label: 'Price Rules', icon: '💰' },
                    { key: 'shipping-methods', label: 'Shipping Methods', icon: '🚚' },
                    { key: 'payment-methods', label: 'Payment Methods', icon: '💳' }
                ]
            }
        ]
    });
})();
