/**
 * ERP Application Configuration
 * Loads and provides access to app-level configuration settings
 */
(function() {
    'use strict';

    // Default configuration
    const DEFAULT_CONFIG = {
        dateFormat: 'mm/dd/yyyy'
    };

    // Current configuration (starts with defaults)
    let currentConfig = { ...DEFAULT_CONFIG };
    let configLoaded = false;

    /**
     * Load configuration from login.json
     * @returns {Promise<void>}
     */
    async function load() {
        if (configLoaded) return;

        try {
            const response = await fetch('login.json');
            if (!response.ok) {
                console.warn('Could not load login.json, using default config');
                configLoaded = true;
                return;
            }

            const data = await response.json();

            // Extract app config section
            if (data.app) {
                currentConfig = { ...DEFAULT_CONFIG, ...data.app };
            }

            configLoaded = true;
            console.log('App config loaded:', currentConfig);
        } catch (error) {
            console.warn('Error loading app config, using defaults:', error);
            configLoaded = true;
        }
    }

    /**
     * Get the configured date format
     * @returns {string} Date format string (e.g., 'mm/dd/yyyy')
     */
    function getDateFormat() {
        return currentConfig.dateFormat || DEFAULT_CONFIG.dateFormat;
    }

    /**
     * Get all configuration
     * @returns {object} Current configuration object
     */
    function getConfig() {
        return { ...currentConfig };
    }

    /**
     * Check if configuration has been loaded
     * @returns {boolean}
     */
    function isLoaded() {
        return configLoaded;
    }

    // Export
    window.ERPConfig = {
        load,
        getDateFormat,
        getConfig,
        isLoaded
    };

})();
