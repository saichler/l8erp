/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Customer Portal Navigation Configuration
(function() {
    'use strict';

    var CUST = window.CUST = window.CUST || {};

    CUST.nav = [
        { key: 'dashboard', label: 'Dashboard', icon: '📊' },
        { key: 'orders',    label: 'Orders', icon: '📦' },
        { key: 'billing',   label: 'Billing', icon: '💳' },
        { key: 'support',   label: 'Support', icon: '🎧' },
        { key: 'account',   label: 'Account', icon: '🏢' }
    ];
})();
