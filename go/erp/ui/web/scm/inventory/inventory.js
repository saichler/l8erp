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
// Inventory Module - Entry Point
// Column Configurations and Form Definitions for Inventory models
//
// This file serves as the entry point. The Inventory module is split across:
//   - inventory-enums.js   : All enum definitions and value mappings
//   - inventory-columns.js : Table column configurations
//   - inventory-forms.js   : Form field definitions and primary keys
//
// Load order: inventory-enums.js -> inventory-columns.js -> inventory-forms.js -> inventory.js

(function() {
    'use strict';

    // Ensure Inventory namespace exists and is complete
    if (typeof window.Inventory === 'undefined') {
        console.error('Inventory module not properly initialized. Ensure all inventory-*.js files are loaded.');
        return;
    }

    // Verify required properties exist
    const requiredProps = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    for (const prop of requiredProps) {
        if (!Inventory[prop]) {
            console.error(`Inventory.${prop} not found. Ensure all inventory-*.js files are loaded.`);
            return;
        }
    }

    // Inventory module is ready
    console.log('Inventory module initialized');

})();
