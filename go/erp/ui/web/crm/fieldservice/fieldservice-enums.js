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
// CRM Field Service Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney, renderBoolean } = Layer8DRenderers;

    window.CrmFieldService = window.CrmFieldService || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const SERVICE_ORDER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Scheduled', 'scheduled', 'layer8d-status-pending'],
        ['Dispatched', 'dispatched', 'layer8d-status-active'],
        ['In Progress', 'progress', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    const SERVICE_ORDER_TYPE = factory.simple([
        'Unspecified', 'Installation', 'Repair', 'Maintenance', 'Inspection', 'Upgrade'
    ]);

    const SERVICE_ORDER_PRIORITY = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'layer8d-status-inactive'],
        ['Medium', 'medium', 'layer8d-status-pending'],
        ['High', 'high', 'layer8d-status-active'],
        ['Critical', 'critical', 'layer8d-status-terminated']
    ]);

    const CONTRACT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Active', 'active', 'layer8d-status-active'],
        ['Expired', 'expired', 'layer8d-status-inactive'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated'],
        ['Suspended', 'suspended', 'layer8d-status-inactive']
    ]);

    const CONTRACT_TYPE = factory.simple([
        'Unspecified', 'Warranty', 'Service Agreement', 'Maintenance', 'Support', 'Extended Warranty'
    ]);

    const TECHNICIAN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Available', 'available', 'layer8d-status-active'],
        ['Busy', 'busy', 'layer8d-status-pending'],
        ['On Leave', 'leave', 'layer8d-status-inactive'],
        ['Inactive', 'inactive', 'layer8d-status-terminated']
    ]);

    const VISIT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Scheduled', 'scheduled', 'layer8d-status-pending'],
        ['En Route', 'enroute', 'layer8d-status-active'],
        ['On Site', 'onsite', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated'],
        ['Rescheduled', 'rescheduled', 'layer8d-status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    CrmFieldService.enums = {
        SERVICE_ORDER_STATUS: SERVICE_ORDER_STATUS.enum,
        SERVICE_ORDER_STATUS_CLASSES: SERVICE_ORDER_STATUS.classes,
        SERVICE_ORDER_TYPE: SERVICE_ORDER_TYPE.enum,
        SERVICE_ORDER_PRIORITY: SERVICE_ORDER_PRIORITY.enum,
        SERVICE_ORDER_PRIORITY_CLASSES: SERVICE_ORDER_PRIORITY.classes,
        CONTRACT_STATUS: CONTRACT_STATUS.enum,
        CONTRACT_STATUS_CLASSES: CONTRACT_STATUS.classes,
        CONTRACT_TYPE: CONTRACT_TYPE.enum,
        TECHNICIAN_STATUS: TECHNICIAN_STATUS.enum,
        TECHNICIAN_STATUS_CLASSES: TECHNICIAN_STATUS.classes,
        VISIT_STATUS: VISIT_STATUS.enum,
        VISIT_STATUS_CLASSES: VISIT_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    CrmFieldService.render = {
        serviceOrderStatus: createStatusRenderer(SERVICE_ORDER_STATUS.enum, SERVICE_ORDER_STATUS.classes),
        serviceOrderType: (v) => renderEnum(v, SERVICE_ORDER_TYPE.enum),
        serviceOrderPriority: createStatusRenderer(SERVICE_ORDER_PRIORITY.enum, SERVICE_ORDER_PRIORITY.classes),
        contractStatus: createStatusRenderer(CONTRACT_STATUS.enum, CONTRACT_STATUS.classes),
        contractType: (v) => renderEnum(v, CONTRACT_TYPE.enum),
        technicianStatus: createStatusRenderer(TECHNICIAN_STATUS.enum, TECHNICIAN_STATUS.classes),
        visitStatus: createStatusRenderer(VISIT_STATUS.enum, VISIT_STATUS.classes),
        date: renderDate,
        money: renderMoney,
        boolean: renderBoolean
    };

})();
