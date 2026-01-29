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
// Tax Management Module - Entry Point
// Column Configurations and Form Definitions for Tax Management models
//
// This file serves as the entry point. The TaxManagement module is split across:
//   - tax-enums.js   : All enum definitions and value mappings
//   - tax-columns.js : Table column configurations
//   - tax-forms.js   : Form field definitions and primary keys
//
// Load order: tax-enums.js -> tax-columns.js -> tax-forms.js -> tax.js

(function() {
    'use strict';

    // Ensure TaxManagement namespace exists and is complete
    if (typeof window.TaxManagement === 'undefined') {
        console.error('TaxManagement module not properly initialized. Ensure all tax-*.js files are loaded.');
        return;
    }

    // Verify required properties exist
    const requiredProps = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    for (const prop of requiredProps) {
        if (!TaxManagement[prop]) {
            console.error(`TaxManagement.${prop} not found. Ensure all tax-*.js files are loaded.`);
            return;
        }
    }

    // TaxManagement module is ready
    console.log('TaxManagement module initialized');

})();
