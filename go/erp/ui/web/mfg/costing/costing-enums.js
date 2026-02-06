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
// Manufacturing Costing Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney } = Layer8DRenderers;

    window.MfgCosting = window.MfgCosting || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const COST_ELEMENT_TYPE = factory.simple([
        'Unspecified', 'Material', 'Labor', 'Machine', 'Overhead',
        'Subcontracting', 'Other'
    ]);

    const ROLLUP_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['In Progress', 'progress', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Failed', 'failed', 'layer8d-status-terminated']
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

    MfgCosting.enums = {
        COST_ELEMENT_TYPE: COST_ELEMENT_TYPE.enum,
        ROLLUP_STATUS: ROLLUP_STATUS.enum,
        ROLLUP_STATUS_CLASSES: ROLLUP_STATUS.classes,
        VARIANCE_TYPE: VARIANCE_TYPE.enum,
        ALLOCATION_METHOD: ALLOCATION_METHOD.enum
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    MfgCosting.render = {
        costElementType: (v) => renderEnum(v, COST_ELEMENT_TYPE.enum),
        rollupStatus: createStatusRenderer(ROLLUP_STATUS.enum, ROLLUP_STATUS.classes),
        varianceType: (v) => renderEnum(v, VARIANCE_TYPE.enum),
        allocationMethod: (v) => renderEnum(v, ALLOCATION_METHOD.enum),
        date: renderDate,
        money: renderMoney
    };

})();
