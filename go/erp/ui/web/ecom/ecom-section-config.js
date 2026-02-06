/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// E-Commerce Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    const ecomSvg = `
        <svg class="hcm-illustration" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="ecomGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
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
                <rect x="165" y="55" width="25" height="18" rx="2" fill="none" stroke="url(#ecomGradient1)" stroke-width="2" opacity="0.6"/>
                <circle cx="172" cy="78" r="4" fill="url(#ecomGradient1)" opacity="0.5"/>
                <circle cx="185" cy="78" r="4" fill="url(#ecomGradient1)" opacity="0.5"/>
                <path d="M 160,50 L 165,50 L 170,55" fill="none" stroke="url(#ecomGradient1)" stroke-width="2" opacity="0.6"/>
                <rect x="385" y="48" width="30" height="24" rx="2" fill="url(#ecomGradient1)" opacity="0.5"/>
                <line x1="400" y1="48" x2="400" y2="72" stroke="#0ea5e9" stroke-width="2" opacity="0.6"/>
                <line x1="385" y1="58" x2="415" y2="58" stroke="#0ea5e9" stroke-width="2" opacity="0.6"/>
                <rect x="580" y="50" width="40" height="26" rx="3" fill="url(#ecomGradient1)" opacity="0.5"/>
                <rect x="585" y="58" width="20" height="4" rx="1" fill="#0ea5e9" opacity="0.6"/>
                <rect x="585" y="66" width="12" height="3" rx="1" fill="#0ea5e9" opacity="0.4"/>
                <path d="M 795,55 Q 795,48 802,48 Q 810,48 810,58 Q 810,68 795,78 Q 780,68 780,58 Q 780,48 788,48 Q 795,48 795,55" fill="url(#ecomGradient1)" opacity="0.5"/>
                <path d="M 975,45 L 1010,45 L 1020,60 L 1010,75 L 975,75 Z" fill="url(#ecomGradient1)" opacity="0.5"/>
                <circle cx="985" cy="60" r="4" fill="#0ea5e9" opacity="0.8"/>
            </g>
            <path d="M 195,60 Q 290,45 380,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 420,60 Q 500,75 580,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 620,60 Q 700,45 780,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 815,60 Q 895,75 975,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <circle cx="300" cy="50" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="700" cy="50" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
            </circle>
        </svg>`;

    Layer8SectionConfigs.register('ecommerce', {
        title: 'E-Commerce',
        subtitle: 'Catalog, Orders, Customers & Promotions',
        icon: '🛒',
        svgContent: ecomSvg,
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
