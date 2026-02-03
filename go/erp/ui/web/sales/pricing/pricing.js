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
// Sales Pricing Module - Entry Point
// Verifies all Sales Pricing files are loaded

(function() {
    'use strict';

    // Ensure SalesPricing namespace exists and is complete
    if (typeof window.SalesPricing === 'undefined') {
        console.error('SalesPricing module not properly initialized. Ensure all pricing-*.js files are loaded.');
        return;
    }

    // Verify required properties exist
    const requiredProps = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    for (const prop of requiredProps) {
        if (!SalesPricing[prop]) {
            console.error(`SalesPricing.${prop} not found. Ensure all pricing-*.js files are loaded.`);
            return;
        }
    }

    // SalesPricing module is ready
    console.log('SalesPricing module initialized');

})();
