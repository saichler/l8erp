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
// HCM Module - Entry Point
// Main JavaScript for Human Capital Management
//
// This file serves as the entry point. The HCM module is split across:
//   - hcm-config.js     : Module configuration and service definitions
//   - hcm-navigation.js : Tab switching and service view management
//   - hcm-service.js    : Service table initialization and config lookups
//   - hcm-crud.js       : Add, Edit, Delete, and Details operations
//
// Load order: hcm-config.js -> hcm-navigation.js -> hcm-service.js -> hcm-crud.js -> hcm.js

(function() {
    'use strict';

    // Ensure HCM namespace exists and is complete
    if (typeof window.HCM === 'undefined') {
        console.error('HCM module not properly initialized. Ensure all hcm-*.js files are loaded.');
        return;
    }

    // Verify required methods exist
    const requiredMethods = ['initialize', 'switchModule', 'loadServiceView', 'refreshCurrentTable'];
    for (const method of requiredMethods) {
        if (typeof HCM[method] !== 'function') {
            console.error(`HCM.${method} not found. Ensure hcm-navigation.js is loaded.`);
            return;
        }
    }

    // HCM module is ready
    console.log('HCM module initialized');

})();
