// HCM Module - Entry Point
// Main JavaScript for Human Capital Management
//
// This file serves as the entry point. The HCM module is split across:
//   - hcm-config.js     : Module configuration and service definitions
//   - hcm-navigation.js : Tab switching and service view management
//   - hcm-service.js    : Service table initialization and config lookups
//   - hcm-crud.js       : Add, Edit, Delete, and Details operations
//
// Load order: hcm-config.js -> hcm-navigation.js -> hcm-service.js -> hcm-crud.js -> hcm.js

(function() {
    'use strict';

    // Ensure HCM namespace exists and is complete
    if (typeof window.HCM === 'undefined') {
        console.error('HCM module not properly initialized. Ensure all hcm-*.js files are loaded.');
        return;
    }

    // Verify required methods exist
    const requiredMethods = ['initialize', 'switchModule', 'loadServiceView', 'refreshCurrentTable'];
    for (const method of requiredMethods) {
        if (typeof HCM[method] !== 'function') {
            console.error(`HCM.${method} not found. Ensure hcm-navigation.js is loaded.`);
            return;
        }
    }

    // HCM module is ready
    console.log('HCM module initialized');

})();
