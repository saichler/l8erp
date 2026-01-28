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
// Time & Attendance Module - Entry Point
// Part 4 of 4 - Load this file last
//
// This file serves as the entry point for the Time module.
// The module is split across multiple files:
//
//   - time-enums.js   : Enum definitions and render functions
//   - time-columns.js : Table column configurations
//   - time-forms.js   : Form definitions and primary keys
//   - time.js         : This file (entry point)
//
// Load all JS files in app.html in order:
//   1. time-enums.js
//   2. time-columns.js
//   3. time-forms.js
//   4. time.js

(function() {
    'use strict';

    // Verify Time module loaded correctly
    if (!window.Time) {
        console.error('Time module failed to load: namespace not found');
        return;
    }

    if (!window.Time.columns) {
        console.error('Time module failed to load: columns not found');
        return;
    }

    if (!window.Time.forms) {
        console.error('Time module failed to load: forms not found');
        return;
    }

    if (!window.Time.enums) {
        console.error('Time module failed to load: enums not found');
        return;
    }

    // Clean up internal helpers (no longer needed after initialization)
    delete window.Time._internal;

    console.log('Time module loaded successfully');

})();
