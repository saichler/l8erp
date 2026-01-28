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
// Learning Management Module - Entry Point
// Part 4 of 4 - Load this file last
//
// This file serves as the entry point for the Learning module.
// The module is split across multiple files:
//
//   - learning-enums.js   : Enum definitions and render functions
//   - learning-columns.js : Table column configurations
//   - learning-forms.js   : Form definitions and primary keys
//   - learning.js         : This file (entry point)
//
// Load all JS files in app.html in order:
//   1. learning-enums.js
//   2. learning-columns.js
//   3. learning-forms.js
//   4. learning.js

(function() {
    'use strict';

    // Verify Learning module loaded correctly
    if (!window.Learning) {
        console.error('Learning module failed to load: namespace not found');
        return;
    }

    if (!window.Learning.columns) {
        console.error('Learning module failed to load: columns not found');
        return;
    }

    if (!window.Learning.forms) {
        console.error('Learning module failed to load: forms not found');
        return;
    }

    if (!window.Learning.enums) {
        console.error('Learning module failed to load: enums not found');
        return;
    }

    // Clean up internal helpers (no longer needed after initialization)
    delete window.Learning._internal;

    console.log('Learning module loaded successfully');

})();
