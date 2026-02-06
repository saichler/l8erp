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
 * Mobile Manufacturing Shop Floor Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: mfg/shopfloor/shopfloor-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderBoolean } = Layer8MRenderers;

    window.MobileMfgShopFloor = window.MobileMfgShopFloor || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const WORK_CENTER_TYPE = factory.simple([
        'Unspecified', 'Machine', 'Labor', 'Assembly', 'Inspection', 'Packaging'
    ]);

    const SHIFT_TYPE = factory.simple([
        'Unspecified', 'Day', 'Evening', 'Night', 'Rotating'
    ]);

    const DOWNTIME_REASON = factory.create([
        ['Unspecified', null, ''],
        ['Planned Maintenance', 'planned', 'status-pending'],
        ['Breakdown', 'breakdown', 'status-terminated'],
        ['Setup/Changeover', 'setup', 'status-pending'],
        ['Material Shortage', 'material', 'status-inactive'],
        ['Quality Issue', 'quality', 'status-terminated'],
        ['No Orders', 'no-orders', 'status-inactive'],
        ['Other', 'other', 'status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileMfgShopFloor.enums = {
        WORK_CENTER_TYPE: WORK_CENTER_TYPE.enum,
        SHIFT_TYPE: SHIFT_TYPE.enum,
        DOWNTIME_REASON: DOWNTIME_REASON.enum,
        DOWNTIME_REASON_VALUES: DOWNTIME_REASON.values,
        DOWNTIME_REASON_CLASSES: DOWNTIME_REASON.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileMfgShopFloor.render = {
        workCenterType: (type) => renderEnum(type, WORK_CENTER_TYPE.enum),
        shiftType: (type) => renderEnum(type, SHIFT_TYPE.enum),
        downtimeReason: createStatusRenderer(DOWNTIME_REASON.enum, DOWNTIME_REASON.classes),
        date: renderDate,
        boolean: renderBoolean
    };

})();
