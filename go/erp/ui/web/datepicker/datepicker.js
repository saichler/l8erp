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
