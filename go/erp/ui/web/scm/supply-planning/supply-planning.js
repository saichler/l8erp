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
// Supply Planning Module - Entry Point
// Column Configurations and Form Definitions for Supply Planning models
//
// This file serves as the entry point. The SupplyPlanning module is split across:
//   - supply-planning-enums.js   : All enum definitions and value mappings
//   - supply-planning-columns.js : Table column configurations
//   - supply-planning-forms.js   : Form field definitions and primary keys
//
// Load order: supply-planning-enums.js -> supply-planning-columns.js -> supply-planning-forms.js -> supply-planning.js

(function() {
    'use strict';

    // Ensure SupplyPlanning namespace exists and is complete
    if (typeof window.SupplyPlanning === 'undefined') {
        console.error('SupplyPlanning module not properly initialized. Ensure all supply-planning-*.js files are loaded.');
        return;
    }

    // Verify required properties exist
    const requiredProps = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    for (const prop of requiredProps) {
        if (!SupplyPlanning[prop]) {
            console.error(`SupplyPlanning.${prop} not found. Ensure all supply-planning-*.js files are loaded.`);
            return;
        }
    }

    // SupplyPlanning module is ready
    console.log('SupplyPlanning module initialized');

})();
