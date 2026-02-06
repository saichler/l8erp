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
 * Mobile Navigation Configuration
 * Defines the EXACT navigation hierarchy matching desktop
 *
 * This file merges module configs from:
 * - layer8m-nav-config-base.js (modules list)
 * - layer8m-nav-config-icons.js (SVG icons)
 * - layer8m-nav-config-fin-hcm.js (Financial and HCM)
 * - layer8m-nav-config-scm-sales.js (SCM, Manufacturing, Sales, CRM)
 * - layer8m-nav-config-prj-other.js (Projects, BI, Documents, Ecommerce, System)
 */
(function() {
    'use strict';

    // Build the merged configuration
    window.LAYER8M_NAV_CONFIG = {
        // Modules list from base config
        modules: window.LAYER8M_NAV_CONFIG_BASE.modules,

        // Module configs from FIN/HCM
        financial: window.LAYER8M_NAV_CONFIG_FIN_HCM.financial,
        hcm: window.LAYER8M_NAV_CONFIG_FIN_HCM.hcm,

        // Module configs from SCM/Sales
        scm: window.LAYER8M_NAV_CONFIG_SCM_SALES.scm,
        manufacturing: window.LAYER8M_NAV_CONFIG_SCM_SALES.manufacturing,
        sales: window.LAYER8M_NAV_CONFIG_SCM_SALES.sales,
        crm: window.LAYER8M_NAV_CONFIG_SCM_SALES.crm,

        // Module configs from Projects/Other
        projects: window.LAYER8M_NAV_CONFIG_PRJ_OTHER.projects,
        bi: window.LAYER8M_NAV_CONFIG_PRJ_OTHER.bi,
        documents: window.LAYER8M_NAV_CONFIG_PRJ_OTHER.documents,
        ecommerce: window.LAYER8M_NAV_CONFIG_PRJ_OTHER.ecommerce,
        system: window.LAYER8M_NAV_CONFIG_PRJ_OTHER.system,

        // Icons from icons config
        icons: window.LAYER8M_NAV_CONFIG_ICONS.icons,

        // Get icon SVG by key
        getIcon(key) {
            return this.icons[key] || this.icons['default'];
        }
    };

})();
