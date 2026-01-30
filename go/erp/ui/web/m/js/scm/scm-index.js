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
 * Mobile SCM Module Registry
 * Unified access to all SCM sub-module configurations
 * Desktop Equivalent: scm/scm-config.js
 */
(function() {
    'use strict';

    // Module registry - order matters for lookup priority
    const modules = [
        MobileProcurement,
        MobileInventory,
        MobileWarehouse,
        MobileLogistics,
        MobileDemandPlanning,
        MobileSupplyPlanning
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
     * @param {string} modelName - The model name (e.g., 'Item', 'PurchaseOrder')
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
     * @returns {string|null} Module name (e.g., 'Procurement', 'Inventory')
     */
    function getModuleName(modelName) {
        const mod = findModule(modelName);
        if (!mod) return null;

        if (mod === MobileProcurement) return 'Procurement';
        if (mod === MobileInventory) return 'Inventory';
        if (mod === MobileWarehouse) return 'Warehouse';
        if (mod === MobileLogistics) return 'Logistics';
        if (mod === MobileDemandPlanning) return 'Demand Planning';
        if (mod === MobileSupplyPlanning) return 'Supply Planning';

        return null;
    }

    // Export unified interface
    window.MobileSCM = {
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
            Procurement: MobileProcurement,
            Inventory: MobileInventory,
            Warehouse: MobileWarehouse,
            Logistics: MobileLogistics,
            DemandPlanning: MobileDemandPlanning,
            SupplyPlanning: MobileSupplyPlanning
        }
    };

})();
