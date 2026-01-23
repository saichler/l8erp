/**
 * ERP Reference Picker Component - Entry Point
 * A reusable dropdown picker for selecting referenced entities (foreign keys)
 *
 * This file serves as the entry point. The ERPReferencePicker module is split across:
 *   - reference-picker-utils.js  : Constants and helper functions
 *   - reference-picker-data.js   : L8Query building and server communication
 *   - reference-picker-render.js : DOM creation and list rendering
 *   - reference-picker-events.js : Event handlers
 *   - reference-picker-core.js   : Main API functions
 *
 * Load order:
 *   reference-picker-utils.js -> reference-picker-data.js ->
 *   reference-picker-render.js -> reference-picker-events.js ->
 *   reference-picker-core.js -> reference-picker.js
 *
 * Public API:
 *   - ERPReferencePicker.attach(inputElement, options)
 *   - ERPReferencePicker.open(inputElement)
 *   - ERPReferencePicker.close()
 *   - ERPReferencePicker.getValue(inputElement)
 *   - ERPReferencePicker.getItem(inputElement)
 *   - ERPReferencePicker.setValue(inputElement, id, displayValue, item)
 *   - ERPReferencePicker.detach(inputElement)
 *
 * Usage Example:
 *   ERPReferencePicker.attach(document.getElementById('department-input'), {
 *       endpoint: '/api/query',
 *       modelName: 'Department',
 *       idColumn: 'departmentId',
 *       displayColumn: 'name',
 *       title: 'Select Department',
 *       onChange: (id, display, item) => console.log('Selected:', id, display)
 *   });
 */
(function() {
    'use strict';

    // Verify module loaded correctly
    if (typeof window.ERPReferencePicker === 'undefined') {
        console.error('ERPReferencePicker module not properly initialized. Ensure all reference-picker-*.js files are loaded.');
        return;
    }

    const requiredMethods = ['attach', 'open', 'close', 'getValue', 'setValue', 'detach'];
    for (const method of requiredMethods) {
        if (typeof ERPReferencePicker[method] !== 'function') {
            console.error(`ERPReferencePicker.${method} not found. Ensure reference-picker-core.js is loaded.`);
            return;
        }
    }

    // Clean up internal namespace (not needed externally)
    delete ERPReferencePicker._internal;

})();
