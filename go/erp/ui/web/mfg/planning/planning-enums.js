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
// Manufacturing Planning Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8DRenderers;

    window.MfgPlanning = window.MfgPlanning || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const MRP_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Running', 'running', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Failed', 'failed', 'layer8d-status-terminated'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    const REQUIREMENT_TYPE = factory.simple([
        'Unspecified', 'Planned Order', 'Purchase Requisition', 'Transfer Order',
        'Reschedule In', 'Reschedule Out', 'Cancel'
    ]);

    const SCHEDULE_TYPE = factory.simple([
        'Unspecified', 'Forward', 'Backward', 'Constraint Based'
    ]);

    const SCHEDULE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Published', 'published', 'layer8d-status-active'],
        ['Locked', 'locked', 'layer8d-status-inactive'],
        ['Archived', 'archived', 'layer8d-status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MfgPlanning.enums = {
        MRP_STATUS: MRP_STATUS.enum,
        MRP_STATUS_CLASSES: MRP_STATUS.classes,
        REQUIREMENT_TYPE: REQUIREMENT_TYPE.enum,
        SCHEDULE_TYPE: SCHEDULE_TYPE.enum,
        SCHEDULE_STATUS: SCHEDULE_STATUS.enum,
        SCHEDULE_STATUS_CLASSES: SCHEDULE_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    MfgPlanning.render = {
        mrpStatus: createStatusRenderer(MRP_STATUS.enum, MRP_STATUS.classes),
        requirementType: (v) => renderEnum(v, REQUIREMENT_TYPE.enum),
        scheduleType: (v) => renderEnum(v, SCHEDULE_TYPE.enum),
        scheduleStatus: createStatusRenderer(SCHEDULE_STATUS.enum, SCHEDULE_STATUS.classes),
        date: renderDate
    };

})();
