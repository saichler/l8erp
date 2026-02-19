/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// E-Commerce Module Configuration - Uses Layer8ModuleConfigFactory
Layer8ModuleConfigFactory.create({
    namespace: 'Ecom',
    modules: {
        'catalog': {
            label: 'Catalog', icon: '📦',
            services: [
                { key: 'products', label: 'Products', icon: '🏷️', endpoint: '/100/EcomProd', model: 'EcomProduct' },
                { key: 'categories', label: 'Categories', icon: '📂', endpoint: '/100/EcomCat', model: 'EcomCategory', supportedViews: ['table', 'tree'] },
                { key: 'attributes', label: 'Attributes', icon: '🔖', endpoint: '/100/EcomAttr', model: 'EcomAttribute' }
            ]
        },
        'orders': {
            label: 'Orders', icon: '🛒',
            services: [
                { key: 'orders', label: 'Orders', icon: '📋', endpoint: '/100/EcomOrder', model: 'EcomOrder', supportedViews: ['table', 'kanban'] },
                { key: 'returns', label: 'Returns', icon: '↩️', endpoint: '/100/EcomReturn', model: 'EcomReturn', supportedViews: ['table', 'kanban'] }
            ]
        },
        'customers': {
            label: 'Customers', icon: '👥',
            services: [
                { key: 'customers', label: 'Customers', icon: '👤', endpoint: '/100/EcomCust', model: 'EcomCustomer' },
                { key: 'wishlists', label: 'Wishlists', icon: '❤️', endpoint: '/100/EcomWish', model: 'EcomWishlist' },
                { key: 'carts', label: 'Carts', icon: '🛒', endpoint: '/100/EcomCart', model: 'EcomCart' }
            ]
        },
        'promotions': {
            label: 'Promotions', icon: '🎉',
            services: [
                { key: 'promotions', label: 'Promotions', icon: '📢', endpoint: '/100/EcomPromo', model: 'EcomPromotion' },
                { key: 'coupons', label: 'Coupons', icon: '🎟️', endpoint: '/100/EcomCoupon', model: 'EcomCoupon' },
                { key: 'price-rules', label: 'Price Rules', icon: '💰', endpoint: '/100/EcomPrcRl', model: 'EcomPriceRule' },
                { key: 'shipping-methods', label: 'Shipping Methods', icon: '🚚', endpoint: '/100/EcomShip', model: 'EcomShippingMethod' },
                { key: 'payment-methods', label: 'Payment Methods', icon: '💳', endpoint: '/100/EcomPay', model: 'EcomPaymentMethod' }
            ]
        }
    },
    submodules: ['EcomCatalog', 'EcomOrders', 'EcomCustomers', 'EcomPromotions']
});
