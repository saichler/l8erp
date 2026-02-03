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
// Sales Shipping Module - Entry Point
// Verifies all Sales Shipping files are loaded

(function() {
    'use strict';

    // Ensure SalesShipping namespace exists and is complete
    if (typeof window.SalesShipping === 'undefined') {
        console.error('SalesShipping module not properly initialized. Ensure all shipping-*.js files are loaded.');
        return;
    }

    // Verify required properties exist
    const requiredProps = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    for (const prop of requiredProps) {
        if (!SalesShipping[prop]) {
            console.error(`SalesShipping.${prop} not found. Ensure all shipping-*.js files are loaded.`);
            return;
        }
    }

    // SalesShipping module is ready
    console.log('SalesShipping module initialized');

})();
