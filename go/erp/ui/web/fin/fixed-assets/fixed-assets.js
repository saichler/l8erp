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
// Fixed Assets Module - Entry Point
// Column Configurations and Form Definitions for Fixed Assets models
//
// This file serves as the entry point. The FixedAssets module is split across:
//   - fixed-assets-enums.js   : All enum definitions and value mappings
//   - fixed-assets-columns.js : Table column configurations
//   - fixed-assets-forms.js   : Form field definitions and primary keys
//
// Load order: fixed-assets-enums.js -> fixed-assets-columns.js -> fixed-assets-forms.js -> fixed-assets.js

(function() {
    'use strict';

    // Ensure FixedAssets namespace exists and is complete
    if (typeof window.FixedAssets === 'undefined') {
        console.error('FixedAssets module not properly initialized. Ensure all fixed-assets-*.js files are loaded.');
        return;
    }

    // Verify required properties exist
    const requiredProps = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    for (const prop of requiredProps) {
        if (!FixedAssets[prop]) {
            console.error(`FixedAssets.${prop} not found. Ensure all fixed-assets-*.js files are loaded.`);
            return;
        }
    }

    // FixedAssets module is ready
    console.log('FixedAssets module initialized');

})();
