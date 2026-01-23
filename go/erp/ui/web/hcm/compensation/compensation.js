// Compensation Management Module - Entry Point
// Part 4 of 4 - Load this file last
//
// This file serves as the entry point for the Compensation module.
// The module is split across multiple files:
//
//   - compensation-enums.js   : Enum definitions and render functions
//   - compensation-columns.js : Table column configurations
//   - compensation-forms.js   : Form definitions and primary keys
//   - compensation.js         : This file (entry point)
//
// Load all JS files in app.html in order:
//   1. compensation-enums.js
//   2. compensation-columns.js
//   3. compensation-forms.js
//   4. compensation.js

(function() {
    'use strict';

    // Verify Compensation module loaded correctly
    if (!window.Compensation) {
        console.error('Compensation module failed to load: namespace not found');
        return;
    }

    if (!window.Compensation.columns) {
        console.error('Compensation module failed to load: columns not found');
        return;
    }

    if (!window.Compensation.forms) {
        console.error('Compensation module failed to load: forms not found');
        return;
    }

    if (!window.Compensation.enums) {
        console.error('Compensation module failed to load: enums not found');
        return;
    }

    // Clean up internal helpers (no longer needed after initialization)
    delete window.Compensation._internal;

    console.log('Compensation module loaded successfully');

})();
