/**
 * Mobile HCM Module Registry
 * Unified access to all HCM sub-module configurations
 * Desktop Equivalent: hcm/hcm-service.js
 */
(function() {
    'use strict';

    // Module registry - order matters for lookup priority
    const modules = [
        MobileCoreHR,
        MobilePayroll,
        MobileBenefits,
        MobileTime,
        MobileTalent,
        MobileLearning,
        MobileCompensation
    ];

    /**
     * Find which module contains a given model
     */
    function findModule(modelName) {
        for (const mod of modules) {
            if (mod.columns && mod.columns[modelName]) {
                return mod;
            }
        }
        return null;
    }

    /**
     * Get form definition for a model
     * @param {string} modelName - The model name (e.g., 'Employee', 'BenefitPlan')
     * @returns {Object|null} Form definition with sections and fields
     */
    function getFormDef(modelName) {
        const mod = findModule(modelName);
        if (mod && mod.forms && mod.forms[modelName]) {
            return mod.forms[modelName];
        }
        return null;
    }

    /**
     * Get column definitions for a model
     * @param {string} modelName - The model name
     * @returns {Array|null} Array of column definitions
     */
    function getColumns(modelName) {
        const mod = findModule(modelName);
        if (mod && mod.columns && mod.columns[modelName]) {
            return mod.columns[modelName];
        }
        return null;
    }

    /**
     * Get enum definitions for a model's module
     * @param {string} modelName - The model name
     * @returns {Object|null} Enum definitions object
     */
    function getEnums(modelName) {
        const mod = findModule(modelName);
        if (mod && mod.enums) {
            return mod.enums;
        }
        return null;
    }

    /**
     * Get primary key field for a model
     * @param {string} modelName - The model name
     * @returns {string|null} Primary key field name
     */
    function getPrimaryKey(modelName) {
        const mod = findModule(modelName);
        if (mod && mod.primaryKeys && mod.primaryKeys[modelName]) {
            return mod.primaryKeys[modelName];
        }
        return null;
    }

    /**
     * Get render functions for a model's module
     * @param {string} modelName - The model name
     * @returns {Object|null} Render functions object
     */
    function getRender(modelName) {
        const mod = findModule(modelName);
        if (mod && mod.render) {
            return mod.render;
        }
        return null;
    }

    /**
     * Get all available models across all modules
     * @returns {Array} Array of model names
     */
    function getAllModels() {
        const models = [];
        for (const mod of modules) {
            if (mod.columns) {
                models.push(...Object.keys(mod.columns));
            }
        }
        return models;
    }

    /**
     * Check if a model exists in any module
     * @param {string} modelName - The model name
     * @returns {boolean} True if model exists
     */
    function hasModel(modelName) {
        return findModule(modelName) !== null;
    }

    /**
     * Get module name for a model
     * @param {string} modelName - The model name
     * @returns {string|null} Module name (e.g., 'CoreHR', 'Benefits')
     */
    function getModuleName(modelName) {
        const mod = findModule(modelName);
        if (!mod) return null;

        if (mod === MobileCoreHR) return 'Core HR';
        if (mod === MobilePayroll) return 'Payroll';
        if (mod === MobileBenefits) return 'Benefits';
        if (mod === MobileTime) return 'Time & Attendance';
        if (mod === MobileTalent) return 'Talent';
        if (mod === MobileLearning) return 'Learning';
        if (mod === MobileCompensation) return 'Compensation';

        return null;
    }

    // Export unified interface
    window.MobileHCM = {
        getFormDef,
        getColumns,
        getEnums,
        getPrimaryKey,
        getRender,
        getAllModels,
        hasModel,
        getModuleName,

        // Direct module access for advanced use
        modules: {
            CoreHR: MobileCoreHR,
            Payroll: MobilePayroll,
            Benefits: MobileBenefits,
            Time: MobileTime,
            Talent: MobileTalent,
            Learning: MobileLearning,
            Compensation: MobileCompensation
        }
    };

})();
