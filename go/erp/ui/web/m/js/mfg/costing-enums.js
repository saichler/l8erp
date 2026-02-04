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
 * Mobile Manufacturing Costing Module - Enum Definitions
 * Desktop Equivalent: mfg/costing/costing-enums.js
 */
(function() {
    'use strict';

    window.MobileMfgCosting = window.MobileMfgCosting || {};
    MobileMfgCosting.enums = {};

    // COST ELEMENT TYPE
    MobileMfgCosting.enums.COST_ELEMENT_TYPE = {
        0: 'Unspecified', 1: 'Material', 2: 'Labor', 3: 'Machine', 4: 'Overhead', 5: 'Subcontracting', 6: 'Other'
    };

    // ROLLUP STATUS
    MobileMfgCosting.enums.ROLLUP_STATUS = {
        0: 'Unspecified', 1: 'Pending', 2: 'In Progress', 3: 'Completed', 4: 'Failed'
    };
    MobileMfgCosting.enums.ROLLUP_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-terminated'
    };

    // VARIANCE TYPE
    MobileMfgCosting.enums.VARIANCE_TYPE = {
        0: 'Unspecified', 1: 'Material Price', 2: 'Material Usage', 3: 'Labor Rate',
        4: 'Labor Efficiency', 5: 'Overhead', 6: 'Yield', 7: 'Mix'
    };

    // OVERHEAD ALLOCATION METHOD
    MobileMfgCosting.enums.ALLOCATION_METHOD = {
        0: 'Unspecified', 1: 'Direct Labor Hours', 2: 'Machine Hours', 3: 'Direct Labor Cost',
        4: 'Material Cost', 5: 'Units Produced'
    };

    // RENDER FUNCTIONS
    MobileMfgCosting.render = {
        costElementType: function(type) { return MobileMfgCosting.enums.COST_ELEMENT_TYPE[type] || 'Unknown'; },
        rollupStatus: Layer8MRenderers.createStatusRenderer(
            MobileMfgCosting.enums.ROLLUP_STATUS,
            MobileMfgCosting.enums.ROLLUP_STATUS_CLASSES
        ),
        varianceType: function(type) { return MobileMfgCosting.enums.VARIANCE_TYPE[type] || 'Unknown'; },
        allocationMethod: function(method) { return MobileMfgCosting.enums.ALLOCATION_METHOD[method] || 'Unknown'; },
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
