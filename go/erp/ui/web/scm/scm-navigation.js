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
// SCM Module - Navigation
// Tab switching and service view management

(function() {
    'use strict';

    // Ensure SCM namespace exists
    window.SCM = window.SCM || {};

    // Current state
    SCM._state = {
        currentModule: 'procurement',
        currentService: 'purchase-requisitions',
        serviceTables: {},
        sectionEl: null
    };

    // Initialize SCM module
    SCM.initialize = function() {
        // Clear cached table references since DOM was replaced
        SCM._state.serviceTables = {};

        // Reset to default module/service
        SCM._state.currentModule = 'procurement';
        SCM._state.currentService = 'purchase-requisitions';

        // Get the SCM section container (scoping element)
        SCM._state.sectionEl = document.querySelector('.hcm-module-content[data-module="procurement"]');
        if (SCM._state.sectionEl) {
            SCM._state.sectionEl = SCM._state.sectionEl.closest('.section-container');
        }
        if (!SCM._state.sectionEl) {
            console.error('SCM section container not found');
            return;
        }

        SCM._setupModuleTabs();
        SCM._setupSubNavigation();
        SCM.loadServiceView(SCM._state.currentModule, SCM._state.currentService);
    };

    // Setup module tab click handlers
    SCM._setupModuleTabs = function() {
        const tabs = SCM._state.sectionEl.querySelectorAll('.hcm-module-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const moduleKey = tab.dataset.module;
                SCM.switchModule(moduleKey);
            });
        });
    };

    // Switch to a different module
    SCM.switchModule = function(moduleKey) {
        if (!SCM.modules[moduleKey]) return;

        SCM._state.currentModule = moduleKey;

        // Update tab active state
        SCM._state.sectionEl.querySelectorAll('.hcm-module-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.module === moduleKey);
        });

        // Update content visibility
        SCM._state.sectionEl.querySelectorAll('.hcm-module-content').forEach(content => {
            content.classList.toggle('active', content.dataset.module === moduleKey);
        });

        // Load first service of the module
        const firstService = SCM.modules[moduleKey].services[0];
        if (firstService) {
            SCM._state.currentService = firstService.key;
            SCM._updateSubNavActive(SCM._state.currentService);
            SCM.loadServiceView(moduleKey, firstService.key);
        }
    };

    // Setup sub-navigation click handlers
    SCM._setupSubNavigation = function() {
        SCM._state.sectionEl.querySelectorAll('.hcm-subnav').forEach(subnav => {
            subnav.addEventListener('click', (e) => {
                const item = e.target.closest('.hcm-subnav-item');
                if (!item) return;

                const serviceKey = item.dataset.service;
                const moduleKey = item.closest('.hcm-module-content').dataset.module;

                SCM._state.currentService = serviceKey;
                SCM._updateSubNavActive(serviceKey, moduleKey);
                SCM.loadServiceView(moduleKey, serviceKey);
            });
        });
    };

    // Update sub-navigation active state
    SCM._updateSubNavActive = function(serviceKey, moduleKey) {
        moduleKey = moduleKey || SCM._state.currentModule;
        const moduleContent = SCM._state.sectionEl.querySelector(`.hcm-module-content[data-module="${moduleKey}"]`);
        if (!moduleContent) return;

        moduleContent.querySelectorAll('.hcm-subnav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.service === serviceKey);
        });
    };

    // Load a service view
    SCM.loadServiceView = function(moduleKey, serviceKey) {
        const module = SCM.modules[moduleKey];
        if (!module) return;

        const service = module.services.find(s => s.key === serviceKey);
        if (!service) return;

        // Update service view visibility
        const moduleContent = SCM._state.sectionEl.querySelector(`.hcm-module-content[data-module="${moduleKey}"]`);
        if (!moduleContent) return;

        moduleContent.querySelectorAll('.hcm-service-view').forEach(view => {
            view.classList.toggle('active', view.dataset.service === serviceKey);
        });

        // Initialize table if not already done
        const tableId = `${moduleKey}-${serviceKey}-table`;
        if (!SCM._state.serviceTables[tableId]) {
            SCM._initializeServiceTable(moduleKey, service, tableId);
        }
    };

    // Get service info by key
    SCM.getServiceInfo = function(moduleKey, serviceKey) {
        const module = SCM.modules[moduleKey];
        if (!module) return null;
        return module.services.find(s => s.key === serviceKey);
    };

    // Refresh current table
    SCM.refreshCurrentTable = function() {
        const tableId = `${SCM._state.currentModule}-${SCM._state.currentService}-table`;
        if (SCM._state.serviceTables[tableId]) {
            SCM._state.serviceTables[tableId].fetchData(1, SCM._state.serviceTables[tableId].pageSize);
        }
    };

    // Also expose initializeSCM globally for sections.js compatibility
    window.initializeSCM = SCM.initialize;

})();
