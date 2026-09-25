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
 * Mobile System Module Registry
 * Unified access to all System sub-module configurations
 * Desktop Equivalent: l8ui/sys/l8sys-config.js
 */
(function() {
    'use strict';

    const modules = [
        MobileSysHealth,
        L8Security
    ];

    function findModule(modelName) {
        for (const mod of modules) {
            if (mod.columns && mod.columns[modelName]) {
                return mod;
            }
        }
        return null;
    }

    function getFormDef(modelName) {
        const mod = findModule(modelName);
        if (mod && mod.forms && mod.forms[modelName]) {
            return mod.forms[modelName];
        }
        return null;
    }

    function getColumns(modelName) {
        const mod = findModule(modelName);
        if (mod && mod.columns && mod.columns[modelName]) {
            return mod.columns[modelName];
        }
        return null;
    }

    function getTransformData(modelName) {
        const mod = findModule(modelName);
        if (mod && mod.transformData) {
            return mod.transformData;
        }
        return null;
    }

    function hasModel(modelName) {
        return findModule(modelName) !== null;
    }

    // MobileSYS is hand-rolled rather than built by
    // Layer8MModuleRegistry.create(), so every member of the registry contract
    // has to be supplied here. getPrimaryKey was missing: any caller resolving a
    // SYS model's key through the registry got undefined instead of a field
    // name. (layer8m-nav-data.js happens to read serviceConfig.idField, which is
    // why this stayed latent.)
    function getPrimaryKey(modelName) {
        const mod = findModule(modelName);
        if (mod && mod.primaryKeys && mod.primaryKeys[modelName]) {
            return mod.primaryKeys[modelName];
        }
        return null;
    }

    function getModuleName(modelName) {
        const mod = findModule(modelName);
        if (!mod) return null;
        if (mod === MobileSysHealth) return 'Health';
        if (mod === L8Security) return 'Security';
        return null;
    }

    window.MobileSYS = {
        getFormDef,
        getColumns,
        getTransformData,
        getPrimaryKey,
        hasModel,
        getModuleName,
        modules: {
            Health: MobileSysHealth,
            Security: L8Security
        }
    };

})();
