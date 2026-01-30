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
// SCM Module - Entry Point
// Main JavaScript for Supply Chain Management
//
// This file serves as the entry point. The SCM module is split across:
//   - scm-config.js     : Module configuration and service definitions
//   - scm-navigation.js : Tab switching and service view management
//   - scm-service.js    : Service table initialization and config lookups
//   - scm-crud.js       : Add, Edit, Delete, and Details operations
//
// Load order: scm-config.js -> scm-navigation.js -> scm-service.js -> scm-crud.js -> scm.js

(function() {
    'use strict';

    // Ensure SCM namespace exists and is complete
    if (typeof window.SCM === 'undefined') {
        console.error('SCM module not properly initialized. Ensure all scm-*.js files are loaded.');
        return;
    }

    // Verify required methods exist
    const requiredMethods = ['initialize', 'switchModule', 'loadServiceView', 'refreshCurrentTable'];
    for (const method of requiredMethods) {
        if (typeof SCM[method] !== 'function') {
            console.error(`SCM.${method} not found. Ensure scm-navigation.js is loaded.`);
            return;
        }
    }

    // Verify required submodule namespaces
    const requiredNamespaces = ['Procurement', 'Inventory', 'WarehouseManagement', 'Logistics', 'DemandPlanning', 'SupplyPlanning'];
    for (const ns of requiredNamespaces) {
        if (!window[ns]) {
            console.warn(`SCM submodule ${ns} not loaded. Some features may not work.`);
        }
    }

    // SCM module is ready
    console.log('SCM module initialized');

})();
