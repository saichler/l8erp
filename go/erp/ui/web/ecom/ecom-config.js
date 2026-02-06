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
                { key: 'categories', label: 'Categories', icon: '📂', endpoint: '/100/EcomCat', model: 'EcomCategory' },
                { key: 'attributes', label: 'Attributes', icon: '🔖', endpoint: '/100/EcomAttr', model: 'EcomAttribute' },
                { key: 'images', label: 'Images', icon: '🖼️', endpoint: '/100/EcomImage', model: 'EcomImage' },
                { key: 'variants', label: 'Variants', icon: '🔀', endpoint: '/100/EcomVar', model: 'EcomVariant' }
            ]
        },
        'orders': {
            label: 'Orders', icon: '🛒',
            services: [
                { key: 'orders', label: 'Orders', icon: '📋', endpoint: '/100/EcomOrder', model: 'EcomOrder' },
                { key: 'order-lines', label: 'Order Lines', icon: '📝', endpoint: '/100/EcomOrdLn', model: 'EcomOrderLine' },
                { key: 'order-statuses', label: 'Order Statuses', icon: '📊', endpoint: '/100/EcomOrdSts', model: 'EcomOrderStatusHistory' },
                { key: 'returns', label: 'Returns', icon: '↩️', endpoint: '/100/EcomReturn', model: 'EcomReturn' },
                { key: 'return-lines', label: 'Return Lines', icon: '📄', endpoint: '/100/EcomRetLn', model: 'EcomReturnLine' }
            ]
        },
        'customers': {
            label: 'Customers', icon: '👥',
            services: [
                { key: 'customers', label: 'Customers', icon: '👤', endpoint: '/100/EcomCust', model: 'EcomCustomer' },
                { key: 'addresses', label: 'Addresses', icon: '📍', endpoint: '/100/EcomAddr', model: 'EcomCustomerAddress' },
                { key: 'wishlists', label: 'Wishlists', icon: '❤️', endpoint: '/100/EcomWish', model: 'EcomWishlist' },
                { key: 'wishlist-items', label: 'Wishlist Items', icon: '🎁', endpoint: '/100/EcomWishIt', model: 'EcomWishlistItem' },
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
