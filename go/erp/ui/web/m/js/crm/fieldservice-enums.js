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
 * Mobile CRM Field Service Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: crm/fieldservice/fieldservice-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileCrmFieldService = window.MobileCrmFieldService || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const SERVICE_ORDER_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Installation', 'installation', 'status-active'],
        ['Repair', 'repair', 'status-pending'],
        ['Maintenance', 'maintenance', 'status-active'],
        ['Inspection', 'inspection', 'status-active'],
        ['Upgrade', 'upgrade', 'status-active']
    ]);

    const SERVICE_ORDER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Scheduled', 'scheduled', 'status-active'],
        ['In Progress', 'inprogress', 'status-active'],
        ['Completed', 'completed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    const SERVICE_ORDER_PRIORITY = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'status-inactive'],
        ['Medium', 'medium', 'status-pending'],
        ['High', 'high', 'status-active'],
        ['Emergency', 'emergency', 'status-terminated']
    ]);

    const TECHNICIAN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Available', 'available', 'status-active'],
        ['On Job', 'onjob', 'status-active'],
        ['On Break', 'onbreak', 'status-pending'],
        ['Off Duty', 'offduty', 'status-inactive']
    ]);

    const CONTRACT_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Time & Material', 'timematerial', 'status-active'],
        ['Fixed Price', 'fixedprice', 'status-active'],
        ['Warranty', 'warranty', 'status-pending'],
        ['Subscription', 'subscription', 'status-active']
    ]);

    const CONTRACT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Active', 'active', 'status-active'],
        ['Expired', 'expired', 'status-inactive'],
        ['Terminated', 'terminated', 'status-terminated']
    ]);

    const VISIT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Scheduled', 'scheduled', 'status-pending'],
        ['En Route', 'enroute', 'status-active'],
        ['On Site', 'onsite', 'status-active'],
        ['Completed', 'completed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileCrmFieldService.enums = {
        SERVICE_ORDER_TYPE: SERVICE_ORDER_TYPE.enum,
        SERVICE_ORDER_TYPE_VALUES: SERVICE_ORDER_TYPE.values,
        SERVICE_ORDER_TYPE_CLASSES: SERVICE_ORDER_TYPE.classes,
        SERVICE_ORDER_STATUS: SERVICE_ORDER_STATUS.enum,
        SERVICE_ORDER_STATUS_VALUES: SERVICE_ORDER_STATUS.values,
        SERVICE_ORDER_STATUS_CLASSES: SERVICE_ORDER_STATUS.classes,
        SERVICE_ORDER_PRIORITY: SERVICE_ORDER_PRIORITY.enum,
        SERVICE_ORDER_PRIORITY_VALUES: SERVICE_ORDER_PRIORITY.values,
        SERVICE_ORDER_PRIORITY_CLASSES: SERVICE_ORDER_PRIORITY.classes,
        TECHNICIAN_STATUS: TECHNICIAN_STATUS.enum,
        TECHNICIAN_STATUS_VALUES: TECHNICIAN_STATUS.values,
        TECHNICIAN_STATUS_CLASSES: TECHNICIAN_STATUS.classes,
        CONTRACT_TYPE: CONTRACT_TYPE.enum,
        CONTRACT_TYPE_VALUES: CONTRACT_TYPE.values,
        CONTRACT_TYPE_CLASSES: CONTRACT_TYPE.classes,
        CONTRACT_STATUS: CONTRACT_STATUS.enum,
        CONTRACT_STATUS_VALUES: CONTRACT_STATUS.values,
        CONTRACT_STATUS_CLASSES: CONTRACT_STATUS.classes,
        VISIT_STATUS: VISIT_STATUS.enum,
        VISIT_STATUS_VALUES: VISIT_STATUS.values,
        VISIT_STATUS_CLASSES: VISIT_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCrmFieldService.render = {
        serviceOrderType: createStatusRenderer(SERVICE_ORDER_TYPE.enum, SERVICE_ORDER_TYPE.classes),
        serviceOrderStatus: createStatusRenderer(SERVICE_ORDER_STATUS.enum, SERVICE_ORDER_STATUS.classes),
        serviceOrderPriority: createStatusRenderer(SERVICE_ORDER_PRIORITY.enum, SERVICE_ORDER_PRIORITY.classes),
        technicianStatus: createStatusRenderer(TECHNICIAN_STATUS.enum, TECHNICIAN_STATUS.classes),
        contractType: createStatusRenderer(CONTRACT_TYPE.enum, CONTRACT_TYPE.classes),
        contractStatus: createStatusRenderer(CONTRACT_STATUS.enum, CONTRACT_STATUS.classes),
        visitStatus: createStatusRenderer(VISIT_STATUS.enum, VISIT_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
