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
 * Mobile Manufacturing Planning Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: mfg/planning/planning-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8MRenderers;

    window.MobileMfgPlanning = window.MobileMfgPlanning || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const MRP_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['Running', 'running', 'status-active'],
        ['Completed', 'completed', 'status-active'],
        ['Failed', 'failed', 'status-terminated'],
        ['Cancelled', 'cancelled', 'status-inactive']
    ]);

    const REQUIREMENT_TYPE = factory.simple([
        'Unspecified', 'Planned Order', 'Purchase Requisition', 'Transfer Order',
        'Reschedule In', 'Reschedule Out', 'Cancel'
    ]);

    const SCHEDULE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Published', 'published', 'status-active'],
        ['Locked', 'locked', 'status-inactive'],
        ['Archived', 'archived', 'status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileMfgPlanning.enums = {
        MRP_STATUS: MRP_STATUS.enum,
        MRP_STATUS_VALUES: MRP_STATUS.values,
        MRP_STATUS_CLASSES: MRP_STATUS.classes,
        REQUIREMENT_TYPE: REQUIREMENT_TYPE.enum,
        SCHEDULE_STATUS: SCHEDULE_STATUS.enum,
        SCHEDULE_STATUS_VALUES: SCHEDULE_STATUS.values,
        SCHEDULE_STATUS_CLASSES: SCHEDULE_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileMfgPlanning.render = {
        mrpStatus: createStatusRenderer(MRP_STATUS.enum, MRP_STATUS.classes),
        requirementType: (type) => renderEnum(type, REQUIREMENT_TYPE.enum),
        scheduleStatus: createStatusRenderer(SCHEDULE_STATUS.enum, SCHEDULE_STATUS.classes),
        date: renderDate
    };

})();
