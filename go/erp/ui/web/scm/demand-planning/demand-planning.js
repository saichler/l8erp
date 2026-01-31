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
// Demand Planning Module - Entry Point
// Column Configurations and Form Definitions for Demand Planning models
//
// This file serves as the entry point. The ScmDemandPlanning module is split across:
//   - demand-planning-enums.js   : All enum definitions and value mappings
//   - demand-planning-columns.js : Table column configurations
//   - demand-planning-forms.js   : Form field definitions and primary keys
//
// Load order: demand-planning-enums.js -> demand-planning-columns.js -> demand-planning-forms.js -> demand-planning.js

(function() {
    'use strict';

    // Ensure ScmDemandPlanning namespace exists and is complete
    if (typeof window.ScmDemandPlanning === 'undefined') {
        console.error('ScmDemandPlanning module not properly initialized. Ensure all demand-planning-*.js files are loaded.');
        return;
    }

    // Verify required properties exist
    const requiredProps = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    for (const prop of requiredProps) {
        if (!ScmDemandPlanning[prop]) {
            console.error(`ScmDemandPlanning.${prop} not found. Ensure all demand-planning-*.js files are loaded.`);
            return;
        }
    }

    // ScmDemandPlanning module is ready
    console.log('ScmDemandPlanning module initialized');

})();
