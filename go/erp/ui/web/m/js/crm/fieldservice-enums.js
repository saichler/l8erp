/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    window.MobileCrmFieldService = window.MobileCrmFieldService || {};
    MobileCrmFieldService.enums = {};

    // SERVICE ORDER TYPE
    MobileCrmFieldService.enums.SERVICE_ORDER_TYPE = {
        0: 'Unspecified', 1: 'Installation', 2: 'Repair', 3: 'Maintenance', 4: 'Inspection', 5: 'Upgrade'
    };
    MobileCrmFieldService.enums.SERVICE_ORDER_TYPE_VALUES = {
        'installation': 1, 'repair': 2, 'maintenance': 3, 'inspection': 4, 'upgrade': 5
    };
    MobileCrmFieldService.enums.SERVICE_ORDER_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-pending', 3: 'status-active', 4: 'status-active', 5: 'status-active'
    };

    // SERVICE ORDER STATUS
    MobileCrmFieldService.enums.SERVICE_ORDER_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Scheduled', 3: 'In Progress', 4: 'Completed', 5: 'Cancelled'
    };
    MobileCrmFieldService.enums.SERVICE_ORDER_STATUS_VALUES = {
        'draft': 1, 'scheduled': 2, 'inprogress': 3, 'completed': 4, 'cancelled': 5
    };
    MobileCrmFieldService.enums.SERVICE_ORDER_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-active', 5: 'status-terminated'
    };

    // SERVICE ORDER PRIORITY
    MobileCrmFieldService.enums.SERVICE_ORDER_PRIORITY = {
        0: 'Unspecified', 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Emergency'
    };
    MobileCrmFieldService.enums.SERVICE_ORDER_PRIORITY_VALUES = {
        'low': 1, 'medium': 2, 'high': 3, 'emergency': 4
    };
    MobileCrmFieldService.enums.SERVICE_ORDER_PRIORITY_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-active', 4: 'status-terminated'
    };

    // TECHNICIAN STATUS
    MobileCrmFieldService.enums.TECHNICIAN_STATUS = {
        0: 'Unspecified', 1: 'Available', 2: 'On Job', 3: 'On Break', 4: 'Off Duty'
    };
    MobileCrmFieldService.enums.TECHNICIAN_STATUS_VALUES = {
        'available': 1, 'onjob': 2, 'onbreak': 3, 'offduty': 4
    };
    MobileCrmFieldService.enums.TECHNICIAN_STATUS_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-pending', 4: 'status-inactive'
    };

    // CONTRACT TYPE
    MobileCrmFieldService.enums.CONTRACT_TYPE = {
        0: 'Unspecified', 1: 'Time & Material', 2: 'Fixed Price', 3: 'Warranty', 4: 'Subscription'
    };
    MobileCrmFieldService.enums.CONTRACT_TYPE_VALUES = {
        'timematerial': 1, 'fixedprice': 2, 'warranty': 3, 'subscription': 4
    };
    MobileCrmFieldService.enums.CONTRACT_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-pending', 4: 'status-active'
    };

    // CONTRACT STATUS
    MobileCrmFieldService.enums.CONTRACT_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Active', 3: 'Expired', 4: 'Terminated'
    };
    MobileCrmFieldService.enums.CONTRACT_STATUS_VALUES = {
        'draft': 1, 'active': 2, 'expired': 3, 'terminated': 4
    };
    MobileCrmFieldService.enums.CONTRACT_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-inactive', 4: 'status-terminated'
    };

    // VISIT STATUS
    MobileCrmFieldService.enums.VISIT_STATUS = {
        0: 'Unspecified', 1: 'Scheduled', 2: 'En Route', 3: 'On Site', 4: 'Completed', 5: 'Cancelled'
    };
    MobileCrmFieldService.enums.VISIT_STATUS_VALUES = {
        'scheduled': 1, 'enroute': 2, 'onsite': 3, 'completed': 4, 'cancelled': 5
    };
    MobileCrmFieldService.enums.VISIT_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-active', 5: 'status-terminated'
    };

    // RENDER FUNCTIONS
    MobileCrmFieldService.render = {
        serviceOrderType: Layer8MRenderers.createStatusRenderer(MobileCrmFieldService.enums.SERVICE_ORDER_TYPE, MobileCrmFieldService.enums.SERVICE_ORDER_TYPE_CLASSES),
        serviceOrderStatus: Layer8MRenderers.createStatusRenderer(MobileCrmFieldService.enums.SERVICE_ORDER_STATUS, MobileCrmFieldService.enums.SERVICE_ORDER_STATUS_CLASSES),
        serviceOrderPriority: Layer8MRenderers.createStatusRenderer(MobileCrmFieldService.enums.SERVICE_ORDER_PRIORITY, MobileCrmFieldService.enums.SERVICE_ORDER_PRIORITY_CLASSES),
        technicianStatus: Layer8MRenderers.createStatusRenderer(MobileCrmFieldService.enums.TECHNICIAN_STATUS, MobileCrmFieldService.enums.TECHNICIAN_STATUS_CLASSES),
        contractType: Layer8MRenderers.createStatusRenderer(MobileCrmFieldService.enums.CONTRACT_TYPE, MobileCrmFieldService.enums.CONTRACT_TYPE_CLASSES),
        contractStatus: Layer8MRenderers.createStatusRenderer(MobileCrmFieldService.enums.CONTRACT_STATUS, MobileCrmFieldService.enums.CONTRACT_STATUS_CLASSES),
        visitStatus: Layer8MRenderers.createStatusRenderer(MobileCrmFieldService.enums.VISIT_STATUS, MobileCrmFieldService.enums.VISIT_STATUS_CLASSES),
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
