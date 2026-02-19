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
// Manufacturing Shop Floor Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney, renderBoolean } = Layer8DRenderers;

    window.MfgShopFloor = window.MfgShopFloor || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const WORK_CENTER_TYPE = factory.simple([
        'Unspecified', 'Machine', 'Labor', 'Assembly', 'Inspection', 'Packaging'
    ]);

    const SHIFT_TYPE = factory.simple([
        'Unspecified', 'Day', 'Evening', 'Night', 'Rotating'
    ]);

    const DOWNTIME_TYPE = factory.simple([
        'Unspecified', 'Planned', 'Unplanned', 'Breakdown', 'Maintenance', 'Changeover'
    ]);

    const DOWNTIME_REASON = factory.create([
        ['Unspecified', null, ''],
        ['Planned Maintenance', 'planned', 'layer8d-status-pending'],
        ['Breakdown', 'breakdown', 'layer8d-status-terminated'],
        ['Setup/Changeover', 'setup', 'layer8d-status-pending'],
        ['Material Shortage', 'material', 'layer8d-status-inactive'],
        ['Quality Issue', 'quality', 'layer8d-status-terminated'],
        ['No Orders', 'noorders', 'layer8d-status-inactive'],
        ['Other', 'other', 'layer8d-status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MfgShopFloor.enums = {
        WORK_CENTER_TYPE: WORK_CENTER_TYPE.enum,
        SHIFT_TYPE: SHIFT_TYPE.enum,
        DOWNTIME_TYPE: DOWNTIME_TYPE.enum,
        DOWNTIME_REASON: DOWNTIME_REASON.enum,
        DOWNTIME_REASON_CLASSES: DOWNTIME_REASON.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    MfgShopFloor.render = {
        workCenterType: (v) => renderEnum(v, WORK_CENTER_TYPE.enum),
        downtimeType: (v) => renderEnum(v, DOWNTIME_TYPE.enum),
        shiftType: (v) => renderEnum(v, SHIFT_TYPE.enum),
        downtimeReason: createStatusRenderer(DOWNTIME_REASON.enum, DOWNTIME_REASON.classes),
        date: renderDate,
        money: renderMoney,
        boolean: renderBoolean
    };

})();
