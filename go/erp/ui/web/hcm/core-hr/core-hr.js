// Core HR Module - Entry Point
// Column Configurations and Form Definitions for Core HR models
//
// This file serves as the entry point. The CoreHR module is split across:
//   - core-hr-enums.js   : All enum definitions and value mappings
//   - core-hr-columns.js : Table column configurations
//   - core-hr-forms.js   : Form field definitions and primary keys
//
// Load order: core-hr-enums.js -> core-hr-columns.js -> core-hr-forms.js -> core-hr.js

(function() {
    'use strict';

    // Ensure CoreHR namespace exists and is complete
    if (typeof window.CoreHR === 'undefined') {
        console.error('CoreHR module not properly initialized. Ensure all core-hr-*.js files are loaded.');
        return;
    }

    // Verify required properties exist
    const requiredProps = ['columns', 'forms', 'primaryKeys', 'enums', 'render'];
    for (const prop of requiredProps) {
        if (!CoreHR[prop]) {
            console.error(`CoreHR.${prop} not found. Ensure all core-hr-*.js files are loaded.`);
            return;
        }
    }

    // CoreHR module is ready
    console.log('CoreHR module initialized');

})();
