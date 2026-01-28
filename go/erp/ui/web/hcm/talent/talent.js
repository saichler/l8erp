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
// Talent Management Module - Entry Point
// Part 4 of 4 - Load this file last
//
// This file serves as the entry point for the Talent module.
// The module is split across multiple files:
//
//   - talent-enums.js   : Enum definitions and render functions
//   - talent-columns.js : Table column configurations
//   - talent-forms.js   : Form definitions and primary keys
//   - talent.js         : This file (entry point)
//
// Load all JS files in app.html in order:
//   1. talent-enums.js
//   2. talent-columns.js
//   3. talent-forms.js
//   4. talent.js

(function() {
    'use strict';

    // Verify Talent module loaded correctly
    if (!window.Talent) {
        console.error('Talent module failed to load: namespace not found');
        return;
    }

    if (!window.Talent.columns) {
        console.error('Talent module failed to load: columns not found');
        return;
    }

    if (!window.Talent.forms) {
        console.error('Talent module failed to load: forms not found');
        return;
    }

    if (!window.Talent.enums) {
        console.error('Talent module failed to load: enums not found');
        return;
    }

    // Clean up internal helpers (no longer needed after initialization)
    delete window.Talent._internal;

    console.log('Talent module loaded successfully');

})();
