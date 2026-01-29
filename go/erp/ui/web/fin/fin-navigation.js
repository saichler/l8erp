/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// FIN Module - Navigation
// Tab switching and service view management

(function() {
    'use strict';

    // Ensure FIN namespace exists
    window.FIN = window.FIN || {};

    // Current state
    FIN._state = {
        currentModule: 'general-ledger',
        currentService: 'accounts',
        serviceTables: {},
        sectionEl: null
    };

    // Initialize FIN module
    FIN.initialize = function() {
        // Clear cached table references since DOM was replaced
        FIN._state.serviceTables = {};

        // Reset to default module/service
        FIN._state.currentModule = 'general-ledger';
        FIN._state.currentService = 'accounts';

        // Get the FIN section container (scoping element)
        FIN._state.sectionEl = document.querySelector('.hcm-module-content[data-module="general-ledger"]');
        if (FIN._state.sectionEl) {
            FIN._state.sectionEl = FIN._state.sectionEl.closest('.section-container');
        }
        if (!FIN._state.sectionEl) {
            console.error('FIN section container not found');
            return;
        }

        FIN._setupModuleTabs();
        FIN._setupSubNavigation();
        FIN.loadServiceView(FIN._state.currentModule, FIN._state.currentService);
    };

    // Setup module tab click handlers
    FIN._setupModuleTabs = function() {
        const tabs = FIN._state.sectionEl.querySelectorAll('.hcm-module-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const moduleKey = tab.dataset.module;
                FIN.switchModule(moduleKey);
            });
        });
    };

    // Switch to a different module
    FIN.switchModule = function(moduleKey) {
        if (!FIN.modules[moduleKey]) return;

        FIN._state.currentModule = moduleKey;

        // Update tab active state
        FIN._state.sectionEl.querySelectorAll('.hcm-module-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.module === moduleKey);
        });

        // Update content visibility
        FIN._state.sectionEl.querySelectorAll('.hcm-module-content').forEach(content => {
            content.classList.toggle('active', content.dataset.module === moduleKey);
        });

        // Load first service of the module
        const firstService = FIN.modules[moduleKey].services[0];
        if (firstService) {
            FIN._state.currentService = firstService.key;
            FIN._updateSubNavActive(FIN._state.currentService);
            FIN.loadServiceView(moduleKey, firstService.key);
        }
    };

    // Setup sub-navigation click handlers
    FIN._setupSubNavigation = function() {
        FIN._state.sectionEl.querySelectorAll('.hcm-subnav').forEach(subnav => {
            subnav.addEventListener('click', (e) => {
                const item = e.target.closest('.hcm-subnav-item');
                if (!item) return;

                const serviceKey = item.dataset.service;
                const moduleKey = item.closest('.hcm-module-content').dataset.module;

                FIN._state.currentService = serviceKey;
                FIN._updateSubNavActive(serviceKey, moduleKey);
                FIN.loadServiceView(moduleKey, serviceKey);
            });
        });
    };

    // Update sub-navigation active state
    FIN._updateSubNavActive = function(serviceKey, moduleKey) {
        moduleKey = moduleKey || FIN._state.currentModule;
        const moduleContent = FIN._state.sectionEl.querySelector(`.hcm-module-content[data-module="${moduleKey}"]`);
        if (!moduleContent) return;

        moduleContent.querySelectorAll('.hcm-subnav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.service === serviceKey);
        });
    };

    // Load a service view
    FIN.loadServiceView = function(moduleKey, serviceKey) {
        const module = FIN.modules[moduleKey];
        if (!module) return;

        const service = module.services.find(s => s.key === serviceKey);
        if (!service) return;

        // Update service view visibility
        const moduleContent = FIN._state.sectionEl.querySelector(`.hcm-module-content[data-module="${moduleKey}"]`);
        if (!moduleContent) return;

        moduleContent.querySelectorAll('.hcm-service-view').forEach(view => {
            view.classList.toggle('active', view.dataset.service === serviceKey);
        });

        // Initialize table if not already done
        const tableId = `${moduleKey}-${serviceKey}-table`;
        if (!FIN._state.serviceTables[tableId]) {
            FIN._initializeServiceTable(moduleKey, service, tableId);
        }
    };

    // Get service info by key
    FIN.getServiceInfo = function(moduleKey, serviceKey) {
        const module = FIN.modules[moduleKey];
        if (!module) return null;
        return module.services.find(s => s.key === serviceKey);
    };

    // Refresh current table
    FIN.refreshCurrentTable = function() {
        const tableId = `${FIN._state.currentModule}-${FIN._state.currentService}-table`;
        if (FIN._state.serviceTables[tableId]) {
            FIN._state.serviceTables[tableId].fetchData(1, FIN._state.serviceTables[tableId].pageSize);
        }
    };

    // Also expose initializeFIN globally for sections.js compatibility
    window.initializeFIN = FIN.initialize;

})();
