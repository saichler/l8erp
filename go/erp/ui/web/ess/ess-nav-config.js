/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// ESS Portal Navigation Configuration
(function() {
    'use strict';

    var ESS = window.ESS = window.ESS || {};

    // Navigation sections for the ESS sidebar
    ESS.nav = [
        { key: 'dashboard', label: 'Dashboard', icon: '📊' },
        { key: 'profile',   label: 'My Profile', icon: '👤' },
        { key: 'pay',       label: 'Pay', icon: '💰' },
        { key: 'timeoff',   label: 'Time Off', icon: '🏖️' },
        { key: 'benefits',  label: 'Benefits', icon: '🏥' },
        { key: 'performance', label: 'Performance', icon: '⭐' },
        { key: 'learning',  label: 'Learning', icon: '📚' }
    ];
})();
