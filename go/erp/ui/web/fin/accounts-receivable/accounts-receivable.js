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
// Accounts Receivable Module - Entry Point
// Part 4 of 4 - Load this file last
//
// This file serves as the entry point for the Accounts Receivable module.
// The module is split across multiple files:
//
//   - accounts-receivable-enums.js   : Enum definitions and render functions
//   - accounts-receivable-columns.js : Table column configurations
//   - accounts-receivable-forms.js   : Form definitions and primary keys
//   - accounts-receivable.js         : This file (entry point)
//
// Load all JS files in app.html in order:
//   1. accounts-receivable-enums.js
//   2. accounts-receivable-columns.js
//   3. accounts-receivable-forms.js
//   4. accounts-receivable.js

(function() {
    'use strict';

    // Verify AccountsReceivable module loaded correctly
    if (!window.AccountsReceivable) {
        console.error('AccountsReceivable module failed to load: namespace not found');
        return;
    }

    if (!window.AccountsReceivable.columns) {
        console.error('AccountsReceivable module failed to load: columns not found');
        return;
    }

    if (!window.AccountsReceivable.forms) {
        console.error('AccountsReceivable module failed to load: forms not found');
        return;
    }

    if (!window.AccountsReceivable.enums) {
        console.error('AccountsReceivable module failed to load: enums not found');
        return;
    }

    console.log('AccountsReceivable module loaded successfully');

})();
