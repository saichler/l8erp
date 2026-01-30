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
// Logistics Module - Entry Point
// Column Configurations and Form Definitions for Logistics models
//
// This file serves as the entry point. The Logistics module is split across:
//   - logistics-enums.js   : All enum definitions and value mappings
//   - logistics-columns.js : Table column configurations
//   - logistics-forms.js   : Form field definitions and primary keys
//
// Load order: logistics-enums.js -> logistics-columns.js -> logistics-forms.js -> logistics.js

(function() {
    'use strict';

    // Ensure Logistics namespace exists and is complete
    if (typeof window.Logistics === 'undefined') {
        console.error('Logistics module not properly initialized. Ensure all logistics-*.js files are loaded.');
        return;
    }

    // Verify required properties exist
    const requiredProps = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    for (const prop of requiredProps) {
        if (!Logistics[prop]) {
            console.error(`Logistics.${prop} not found. Ensure all logistics-*.js files are loaded.`);
            return;
        }
    }

    // Logistics module is ready
    console.log('Logistics module initialized');

})();
