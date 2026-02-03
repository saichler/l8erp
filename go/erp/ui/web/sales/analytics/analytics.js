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
// Sales Analytics Module - Entry Point
// Verifies all Sales Analytics files are loaded

(function() {
    'use strict';

    // Ensure SalesAnalytics namespace exists and is complete
    if (typeof window.SalesAnalytics === 'undefined') {
        console.error('SalesAnalytics module not properly initialized. Ensure all analytics-*.js files are loaded.');
        return;
    }

    // Verify required properties exist
    const requiredProps = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    for (const prop of requiredProps) {
        if (!SalesAnalytics[prop]) {
            console.error(`SalesAnalytics.${prop} not found. Ensure all analytics-*.js files are loaded.`);
            return;
        }
    }

    // SalesAnalytics module is ready
    console.log('SalesAnalytics module initialized');

})();
