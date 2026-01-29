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
// General Ledger Module - Entry Point
// Column Configurations and Form Definitions for General Ledger models
//
// This file serves as the entry point. The GeneralLedger module is split across:
//   - general-ledger-enums.js   : All enum definitions and value mappings
//   - general-ledger-columns.js : Table column configurations
//   - general-ledger-forms.js   : Form field definitions and primary keys
//
// Load order: general-ledger-enums.js -> general-ledger-columns.js -> general-ledger-forms.js -> general-ledger.js

(function() {
    'use strict';

    // Ensure GeneralLedger namespace exists and is complete
    if (typeof window.GeneralLedger === 'undefined') {
        console.error('GeneralLedger module not properly initialized. Ensure all general-ledger-*.js files are loaded.');
        return;
    }

    // Verify required properties exist
    const requiredProps = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    for (const prop of requiredProps) {
        if (!GeneralLedger[prop]) {
            console.error(`GeneralLedger.${prop} not found. Ensure all general-ledger-*.js files are loaded.`);
            return;
        }
    }

    // GeneralLedger module is ready
    console.log('GeneralLedger module initialized');

})();
