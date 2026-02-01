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
        MobileSysSecurity
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

    function getModuleName(modelName) {
        const mod = findModule(modelName);
        if (!mod) return null;
        if (mod === MobileSysHealth) return 'Health';
        if (mod === MobileSysSecurity) return 'Security';
        return null;
    }

    window.MobileSYS = {
        getFormDef,
        getColumns,
        getTransformData,
        hasModel,
        getModuleName,
        modules: {
            Health: MobileSysHealth,
            Security: MobileSysSecurity
        }
    };

})();
