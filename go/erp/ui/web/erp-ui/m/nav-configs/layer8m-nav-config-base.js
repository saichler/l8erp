/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Navigation Configuration - Base Module List
 */
(function() {
    'use strict';

    window.LAYER8M_NAV_CONFIG_BASE = {
        // ERP Modules (Level 1) - matches desktop sidebar order
        modules: [
            { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', hasSubModules: false },
            { key: 'financial', label: 'Financial', icon: 'financial', hasSubModules: true },
            { key: 'hcm', label: 'Human Capital', icon: 'hcm', hasSubModules: true },
            { key: 'scm', label: 'Supply Chain', icon: 'scm', hasSubModules: true },
            { key: 'manufacturing', label: 'Manufacturing', icon: 'manufacturing', hasSubModules: true },
            { key: 'sales', label: 'Sales', icon: 'sales', hasSubModules: true },
            { key: 'crm', label: 'CRM', icon: 'crm', hasSubModules: true },
            { key: 'projects', label: 'Projects', icon: 'projects', hasSubModules: true },
            { key: 'bi', label: 'Business Intelligence', icon: 'bi', hasSubModules: true },
            { key: 'documents', label: 'Documents', icon: 'documents', hasSubModules: true },
            { key: 'ecommerce', label: 'E-Commerce', icon: 'ecommerce', hasSubModules: true },
            { key: 'compliance', label: 'Compliance', icon: 'compliance', hasSubModules: false },
            { key: 'system', label: 'System', icon: 'system', hasSubModules: true }
        ]
    };
})();
