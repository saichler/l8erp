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
// Procurement Module - Entry Point
// Column Configurations and Form Definitions for Procurement models
//
// This file serves as the entry point. The Procurement module is split across:
//   - procurement-enums.js   : All enum definitions and value mappings
//   - procurement-columns.js : Table column configurations
//   - procurement-forms.js   : Form field definitions and primary keys
//
// Load order: procurement-enums.js -> procurement-columns.js -> procurement-forms.js -> procurement.js

(function() {
    'use strict';

    // Ensure Procurement namespace exists and is complete
    if (typeof window.Procurement === 'undefined') {
        console.error('Procurement module not properly initialized. Ensure all procurement-*.js files are loaded.');
        return;
    }

    // Verify required properties exist
    const requiredProps = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    for (const prop of requiredProps) {
        if (!Procurement[prop]) {
            console.error(`Procurement.${prop} not found. Ensure all procurement-*.js files are loaded.`);
            return;
        }
    }

    // Procurement module is ready
    console.log('Procurement module initialized');

})();
