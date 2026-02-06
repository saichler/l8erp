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
 * Mobile Reference Registry
 * Central configuration for all reference/lookup fields.
 * Desktop Equivalent: shared/reference-registry.js
 *
 * This file combines module-specific registries from:
 * - layer8m-reference-registry-hcm.js
 * - layer8m-reference-registry-scm.js
 * - layer8m-reference-registry-crm.js
 * - layer8m-reference-registry-prj.js
 * - layer8m-reference-registry-mfg.js
 * - layer8m-reference-registry-sales.js
 * - layer8m-reference-registry-ecom.js
 *
 * This must match the desktop Layer8DReferenceRegistry EXACTLY.
 */
(function() {
    'use strict';

    // Create the combined registry
    window.Layer8MReferenceRegistry = {};

    // Merge all module registries when they're available
    function mergeRegistries() {
        var registries = [
            window.Layer8MReferenceRegistryHCM,
            window.Layer8MReferenceRegistrySCM,
            window.Layer8MReferenceRegistryCRM,
            window.Layer8MReferenceRegistryPRJ,
            window.Layer8MReferenceRegistryMFG,
            window.Layer8MReferenceRegistrySales,
            window.Layer8MReferenceRegistryECOM
        ];

        registries.forEach(function(registry) {
            if (registry) {
                Object.keys(registry).forEach(function(key) {
                    window.Layer8MReferenceRegistry[key] = registry[key];
                });
            }
        });
    }

    // Merge immediately (module files should be loaded before this one)
    mergeRegistries();

    /**
     * Get configuration for a model
     * @param {string} modelName - The model name (e.g., 'Employee')
     * @returns {Object|null} Configuration object or null
     */
    Layer8MReferenceRegistry.get = function(modelName) {
        return this[modelName] || null;
    };

    /**
     * Check if a model is registered
     * @param {string} modelName - The model name
     * @returns {boolean} True if model exists
     */
    Layer8MReferenceRegistry.has = function(modelName) {
        return this.hasOwnProperty(modelName) && typeof this[modelName] === 'object';
    };

    /**
     * Get all registered model names
     * @returns {string[]} Array of model names
     */
    Layer8MReferenceRegistry.getModelNames = function() {
        return Object.keys(this).filter(function(key) {
            return typeof window.Layer8MReferenceRegistry[key] === 'object';
        });
    };

})();
