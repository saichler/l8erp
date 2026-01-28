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
/**
 * ERP Date Picker Component - Entry Point
 * A reusable calendar date picker with configurable date format support
 *
 * This file serves as the entry point. The ERPDatePicker module is split across:
 *   - datepicker-utils.js    : Constants and helper functions
 *   - datepicker-calendar.js : Calendar creation and rendering
 *   - datepicker-core.js     : Main API functions
 *
 * Load order: datepicker-utils.js -> datepicker-calendar.js -> datepicker-core.js -> datepicker.js
 *
 * Public API:
 *   - ERPDatePicker.attach(inputElement, options)
 *   - ERPDatePicker.open(inputElement)
 *   - ERPDatePicker.close()
 *   - ERPDatePicker.setDate(inputElement, timestamp)
 *   - ERPDatePicker.getDate(inputElement)
 *   - ERPDatePicker.detach(inputElement)
 */
(function() {
    'use strict';

    // Verify module loaded correctly
    if (typeof window.ERPDatePicker === 'undefined') {
        console.error('ERPDatePicker module not properly initialized. Ensure all datepicker-*.js files are loaded.');
        return;
    }

    const requiredMethods = ['attach', 'open', 'close', 'setDate', 'getDate', 'detach'];
    for (const method of requiredMethods) {
        if (typeof ERPDatePicker[method] !== 'function') {
            console.error(`ERPDatePicker.${method} not found. Ensure datepicker-core.js is loaded.`);
            return;
        }
    }

    // Clean up internal namespace (not needed externally)
    delete ERPDatePicker._internal;

    console.log('ERPDatePicker module initialized');

})();
