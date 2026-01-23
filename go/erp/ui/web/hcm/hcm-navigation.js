// HCM Module - Navigation
// Tab switching and service view management

(function() {
    'use strict';

    // Ensure HCM namespace exists
    window.HCM = window.HCM || {};

    // Current state
    HCM._state = {
        currentModule: 'core-hr',
        currentService: 'employees',
        serviceTables: {}
    };

    // Initialize HCM module
    HCM.initialize = function() {
        // Clear cached table references since DOM was replaced
        HCM._state.serviceTables = {};

        // Reset to default module/service
        HCM._state.currentModule = 'core-hr';
        HCM._state.currentService = 'employees';

        HCM._setupModuleTabs();
        HCM._setupSubNavigation();
        HCM.loadServiceView(HCM._state.currentModule, HCM._state.currentService);
    };

    // Setup module tab click handlers
    HCM._setupModuleTabs = function() {
        const tabs = document.querySelectorAll('.hcm-module-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const moduleKey = tab.dataset.module;
                HCM.switchModule(moduleKey);
            });
        });
    };

    // Switch to a different module
    HCM.switchModule = function(moduleKey) {
        if (!HCM.modules[moduleKey]) return;

        HCM._state.currentModule = moduleKey;

        // Update tab active state
        document.querySelectorAll('.hcm-module-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.module === moduleKey);
        });

        // Update content visibility
        document.querySelectorAll('.hcm-module-content').forEach(content => {
            content.classList.toggle('active', content.dataset.module === moduleKey);
        });

        // Load first service of the module
        const firstService = HCM.modules[moduleKey].services[0];
        if (firstService) {
            HCM._state.currentService = firstService.key;
            HCM._updateSubNavActive(HCM._state.currentService);
            HCM.loadServiceView(moduleKey, firstService.key);
        }
    };

    // Setup sub-navigation click handlers
    HCM._setupSubNavigation = function() {
        document.querySelectorAll('.hcm-subnav').forEach(subnav => {
            subnav.addEventListener('click', (e) => {
                const item = e.target.closest('.hcm-subnav-item');
                if (!item) return;

                const serviceKey = item.dataset.service;
                const moduleKey = item.closest('.hcm-module-content').dataset.module;

                HCM._state.currentService = serviceKey;
                HCM._updateSubNavActive(serviceKey, moduleKey);
                HCM.loadServiceView(moduleKey, serviceKey);
            });
        });
    };

    // Update sub-navigation active state
    HCM._updateSubNavActive = function(serviceKey, moduleKey) {
        moduleKey = moduleKey || HCM._state.currentModule;
        const moduleContent = document.querySelector(`.hcm-module-content[data-module="${moduleKey}"]`);
        if (!moduleContent) return;

        moduleContent.querySelectorAll('.hcm-subnav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.service === serviceKey);
        });
    };

    // Load a service view
    HCM.loadServiceView = function(moduleKey, serviceKey) {
        const module = HCM.modules[moduleKey];
        if (!module) return;

        const service = module.services.find(s => s.key === serviceKey);
        if (!service) return;

        // Update service view visibility
        const moduleContent = document.querySelector(`.hcm-module-content[data-module="${moduleKey}"]`);
        if (!moduleContent) return;

        moduleContent.querySelectorAll('.hcm-service-view').forEach(view => {
            view.classList.toggle('active', view.dataset.service === serviceKey);
        });

        // Initialize table if not already done
        const tableId = `${moduleKey}-${serviceKey}-table`;
        if (!HCM._state.serviceTables[tableId]) {
            HCM._initializeServiceTable(moduleKey, service, tableId);
        }
    };

    // Get service info by key
    HCM.getServiceInfo = function(moduleKey, serviceKey) {
        const module = HCM.modules[moduleKey];
        if (!module) return null;
        return module.services.find(s => s.key === serviceKey);
    };

    // Refresh current table
    HCM.refreshCurrentTable = function() {
        const tableId = `${HCM._state.currentModule}-${HCM._state.currentService}-table`;
        if (HCM._state.serviceTables[tableId]) {
            HCM._state.serviceTables[tableId].fetchData(1, HCM._state.serviceTables[tableId].pageSize);
        }
    };

    // Also expose initializeHCM globally for sections.js compatibility
    window.initializeHCM = HCM.initialize;

})();
