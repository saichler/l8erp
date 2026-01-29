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
// Accounts Payable Module - Entry Point
// Column Configurations and Form Definitions for Accounts Payable models
//
// This file serves as the entry point. The AccountsPayable module is split across:
//   - accounts-payable-enums.js   : All enum definitions and value mappings
//   - accounts-payable-columns.js : Table column configurations
//   - accounts-payable-forms.js   : Form field definitions and primary keys
//
// Load order: accounts-payable-enums.js -> accounts-payable-columns.js -> accounts-payable-forms.js -> accounts-payable.js

(function() {
    'use strict';

    // Ensure AccountsPayable namespace exists and is complete
    if (typeof window.AccountsPayable === 'undefined') {
        console.error('AccountsPayable module not properly initialized. Ensure all accounts-payable-*.js files are loaded.');
        return;
    }

    // Verify required properties exist
    const requiredProps = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    for (const prop of requiredProps) {
        if (!AccountsPayable[prop]) {
            console.error(`AccountsPayable.${prop} not found. Ensure all accounts-payable-*.js files are loaded.`);
            return;
        }
    }

    // AccountsPayable module is ready
    console.log('AccountsPayable module initialized');

})();
