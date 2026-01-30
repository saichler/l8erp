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
// Warehouse Management Module - Entry Point
// Column Configurations and Form Definitions for Warehouse Management models
//
// This file serves as the entry point. The WarehouseManagement module is split across:
//   - warehouse-enums.js   : All enum definitions and value mappings
//   - warehouse-columns.js : Table column configurations
//   - warehouse-forms.js   : Form field definitions and primary keys
//
// Load order: warehouse-enums.js -> warehouse-columns.js -> warehouse-forms.js -> warehouse.js

(function() {
    'use strict';

    // Ensure WarehouseManagement namespace exists and is complete
    if (typeof window.WarehouseManagement === 'undefined') {
        console.error('WarehouseManagement module not properly initialized. Ensure all warehouse-*.js files are loaded.');
        return;
    }

    // Verify required properties exist
    const requiredProps = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    for (const prop of requiredProps) {
        if (!WarehouseManagement[prop]) {
            console.error(`WarehouseManagement.${prop} not found. Ensure all warehouse-*.js files are loaded.`);
            return;
        }
    }

    // WarehouseManagement module is ready
    console.log('WarehouseManagement module initialized');

})();
