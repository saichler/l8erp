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
// CRM Field Service Module - Enum Definitions

(function() {
    'use strict';

    window.CrmFieldService = window.CrmFieldService || {};
    CrmFieldService.enums = {};

    // SERVICE ORDER STATUS
    CrmFieldService.enums.SERVICE_ORDER_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Scheduled',
        3: 'Dispatched',
        4: 'In Progress',
        5: 'Completed',
        6: 'Cancelled'
    };

    CrmFieldService.enums.SERVICE_ORDER_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active',
        6: 'layer8d-status-terminated'
    };

    // SERVICE ORDER TYPE
    CrmFieldService.enums.SERVICE_ORDER_TYPE = {
        0: 'Unspecified',
        1: 'Installation',
        2: 'Repair',
        3: 'Maintenance',
        4: 'Inspection',
        5: 'Upgrade'
    };

    CrmFieldService.enums.SERVICE_ORDER_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-terminated',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-pending',
        5: 'layer8d-status-active'
    };

    // SERVICE ORDER PRIORITY
    CrmFieldService.enums.SERVICE_ORDER_PRIORITY = {
        0: 'Unspecified',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Critical'
    };

    CrmFieldService.enums.SERVICE_ORDER_PRIORITY_CLASSES = {
        1: 'layer8d-status-inactive',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // CONTRACT STATUS
    CrmFieldService.enums.CONTRACT_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Active',
        3: 'Expired',
        4: 'Cancelled',
        5: 'Suspended'
    };

    CrmFieldService.enums.CONTRACT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-inactive'
    };

    // CONTRACT TYPE
    CrmFieldService.enums.CONTRACT_TYPE = {
        0: 'Unspecified',
        1: 'Warranty',
        2: 'Service Agreement',
        3: 'Maintenance',
        4: 'Support',
        5: 'Extended Warranty'
    };

    CrmFieldService.enums.CONTRACT_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active'
    };

    // TECHNICIAN STATUS
    CrmFieldService.enums.TECHNICIAN_STATUS = {
        0: 'Unspecified',
        1: 'Available',
        2: 'Busy',
        3: 'On Leave',
        4: 'Inactive'
    };

    CrmFieldService.enums.TECHNICIAN_STATUS_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-inactive',
        4: 'layer8d-status-terminated'
    };

    // VISIT STATUS
    CrmFieldService.enums.VISIT_STATUS = {
        0: 'Unspecified',
        1: 'Scheduled',
        2: 'En Route',
        3: 'On Site',
        4: 'Completed',
        5: 'Cancelled',
        6: 'Rescheduled'
    };

    CrmFieldService.enums.VISIT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-terminated',
        6: 'layer8d-status-inactive'
    };

    // RENDERERS
    CrmFieldService.render = {};

    CrmFieldService.render.serviceOrderStatus = Layer8DRenderers.createStatusRenderer(
        CrmFieldService.enums.SERVICE_ORDER_STATUS,
        CrmFieldService.enums.SERVICE_ORDER_STATUS_CLASSES
    );

    CrmFieldService.render.serviceOrderType = Layer8DRenderers.createStatusRenderer(
        CrmFieldService.enums.SERVICE_ORDER_TYPE,
        CrmFieldService.enums.SERVICE_ORDER_TYPE_CLASSES
    );

    CrmFieldService.render.serviceOrderPriority = Layer8DRenderers.createStatusRenderer(
        CrmFieldService.enums.SERVICE_ORDER_PRIORITY,
        CrmFieldService.enums.SERVICE_ORDER_PRIORITY_CLASSES
    );

    CrmFieldService.render.contractStatus = Layer8DRenderers.createStatusRenderer(
        CrmFieldService.enums.CONTRACT_STATUS,
        CrmFieldService.enums.CONTRACT_STATUS_CLASSES
    );

    CrmFieldService.render.contractType = Layer8DRenderers.createStatusRenderer(
        CrmFieldService.enums.CONTRACT_TYPE,
        CrmFieldService.enums.CONTRACT_TYPE_CLASSES
    );

    CrmFieldService.render.technicianStatus = Layer8DRenderers.createStatusRenderer(
        CrmFieldService.enums.TECHNICIAN_STATUS,
        CrmFieldService.enums.TECHNICIAN_STATUS_CLASSES
    );

    CrmFieldService.render.visitStatus = Layer8DRenderers.createStatusRenderer(
        CrmFieldService.enums.VISIT_STATUS,
        CrmFieldService.enums.VISIT_STATUS_CLASSES
    );

    CrmFieldService.render.date = Layer8DRenderers.renderDate;
    CrmFieldService.render.money = Layer8DRenderers.renderMoney;
    CrmFieldService.render.boolean = Layer8DRenderers.renderBoolean;

})();
