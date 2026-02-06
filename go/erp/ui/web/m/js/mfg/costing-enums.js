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
 * Mobile Manufacturing Costing Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: mfg/costing/costing-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileMfgCosting = window.MobileMfgCosting || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const COST_ELEMENT_TYPE = factory.simple([
        'Unspecified', 'Material', 'Labor', 'Machine', 'Overhead', 'Subcontracting', 'Other'
    ]);

    const ROLLUP_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['In Progress', 'progress', 'status-active'],
        ['Completed', 'completed', 'status-active'],
        ['Failed', 'failed', 'status-terminated']
    ]);

    const VARIANCE_TYPE = factory.simple([
        'Unspecified', 'Material Price', 'Material Usage', 'Labor Rate',
        'Labor Efficiency', 'Overhead', 'Yield', 'Mix'
    ]);

    const ALLOCATION_METHOD = factory.simple([
        'Unspecified', 'Direct Labor Hours', 'Machine Hours', 'Direct Labor Cost',
        'Material Cost', 'Units Produced'
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileMfgCosting.enums = {
        COST_ELEMENT_TYPE: COST_ELEMENT_TYPE.enum,
        ROLLUP_STATUS: ROLLUP_STATUS.enum,
        ROLLUP_STATUS_VALUES: ROLLUP_STATUS.values,
        ROLLUP_STATUS_CLASSES: ROLLUP_STATUS.classes,
        VARIANCE_TYPE: VARIANCE_TYPE.enum,
        ALLOCATION_METHOD: ALLOCATION_METHOD.enum
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileMfgCosting.render = {
        costElementType: (type) => renderEnum(type, COST_ELEMENT_TYPE.enum),
        rollupStatus: createStatusRenderer(ROLLUP_STATUS.enum, ROLLUP_STATUS.classes),
        varianceType: (type) => renderEnum(type, VARIANCE_TYPE.enum),
        allocationMethod: (method) => renderEnum(method, ALLOCATION_METHOD.enum),
        date: renderDate,
        money: renderMoney
    };

})();
