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
// Benefits Module - Entry Point
// Part 4 of 4 - Load this file last
//
// This file serves as the entry point for the Benefits module.
// The module is split across multiple files:
//
//   - benefits-enums.js   : Enum definitions and render functions
//   - benefits-columns.js : Table column configurations
//   - benefits-forms.js   : Form definitions and primary keys
//   - benefits.js         : This file (entry point)
//
// Load all JS files in app.html in order:
//   1. benefits-enums.js
//   2. benefits-columns.js
//   3. benefits-forms.js
//   4. benefits.js

(function() {
    'use strict';

    // Verify Benefits module loaded correctly
    if (!window.Benefits) {
        console.error('Benefits module failed to load: namespace not found');
        return;
    }

    if (!window.Benefits.columns) {
        console.error('Benefits module failed to load: columns not found');
        return;
    }

    if (!window.Benefits.forms) {
        console.error('Benefits module failed to load: forms not found');
        return;
    }

    if (!window.Benefits.enums) {
        console.error('Benefits module failed to load: enums not found');
        return;
    }

    // Clean up internal helpers (no longer needed after initialization)
    delete window.Benefits._internal;

    console.log('Benefits module loaded successfully');

})();
