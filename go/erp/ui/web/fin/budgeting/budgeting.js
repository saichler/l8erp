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
// Budgeting Module - Entry Point
// Column Configurations and Form Definitions for Budgeting models
//
// This file serves as the entry point. The Budgeting module is split across:
//   - budgeting-enums.js   : All enum definitions and value mappings
//   - budgeting-columns.js : Table column configurations
//   - budgeting-forms.js   : Form field definitions and primary keys
//
// Load order: budgeting-enums.js -> budgeting-columns.js -> budgeting-forms.js -> budgeting.js

(function() {
    'use strict';

    // Ensure Budgeting namespace exists and is complete
    if (typeof window.Budgeting === 'undefined') {
        console.error('Budgeting module not properly initialized. Ensure all budgeting-*.js files are loaded.');
        return;
    }

    // Verify required properties exist
    const requiredProps = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    for (const prop of requiredProps) {
        if (!Budgeting[prop]) {
            console.error(`Budgeting.${prop} not found. Ensure all budgeting-*.js files are loaded.`);
            return;
        }
    }

    // Budgeting module is ready
    console.log('Budgeting module initialized');

})();
