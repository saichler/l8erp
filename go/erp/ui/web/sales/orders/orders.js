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
// Sales Orders Module - Entry Point
// Verifies all Sales Orders files are loaded

(function() {
    'use strict';

    // Ensure SalesOrders namespace exists and is complete
    if (typeof window.SalesOrders === 'undefined') {
        console.error('SalesOrders module not properly initialized. Ensure all orders-*.js files are loaded.');
        return;
    }

    // Verify required properties exist
    const requiredProps = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    for (const prop of requiredProps) {
        if (!SalesOrders[prop]) {
            console.error(`SalesOrders.${prop} not found. Ensure all orders-*.js files are loaded.`);
            return;
        }
    }

    // SalesOrders module is ready
    console.log('SalesOrders module initialized');

})();
