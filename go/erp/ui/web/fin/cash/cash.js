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
// Cash Management Module - Entry Point
// Part 4 of 4 - Load this file last
//
// This file serves as the entry point for the Cash Management module.
// The module is split across multiple files:
//
//   - cash-enums.js   : Enum definitions and render functions
//   - cash-columns.js : Table column configurations
//   - cash-forms.js   : Form definitions and primary keys
//   - cash.js         : This file (entry point)
//
// Load all JS files in app.html in order:
//   1. cash-enums.js
//   2. cash-columns.js
//   3. cash-forms.js
//   4. cash.js

(function() {
    'use strict';

    // Verify CashManagement module loaded correctly
    if (!window.CashManagement) {
        console.error('CashManagement module failed to load: namespace not found');
        return;
    }

    if (!window.CashManagement.columns) {
        console.error('CashManagement module failed to load: columns not found');
        return;
    }

    if (!window.CashManagement.forms) {
        console.error('CashManagement module failed to load: forms not found');
        return;
    }

    if (!window.CashManagement.enums) {
        console.error('CashManagement module failed to load: enums not found');
        return;
    }

    console.log('CashManagement module loaded successfully');

})();
