/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const enums = MobileCrmFieldService.enums;
    const render = MobileCrmFieldService.render;

    MobileCrmFieldService.columns = {
        CrmServiceOrder: [
            { key: 'orderId', label: 'ID', sortKey: 'orderId', filterKey: 'orderId' },
            { key: 'orderNumber', label: 'Order #', sortKey: 'orderNumber', filterKey: 'orderNumber' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            { key: 'orderType', label: 'Type', sortKey: 'orderType', enumValues: enums.SERVICE_ORDER_TYPE_VALUES, render: (item) => render.serviceOrderType(item.orderType) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.SERVICE_ORDER_STATUS_VALUES, render: (item) => render.serviceOrderStatus(item.status) },
            { key: 'priority', label: 'Priority', sortKey: 'priority', enumValues: enums.SERVICE_ORDER_PRIORITY_VALUES, render: (item) => render.serviceOrderPriority(item.priority) },
            { key: 'scheduledStart', label: 'Scheduled', sortKey: 'scheduledStart', render: (item) => Layer8MRenderers.renderDate(item.scheduledStart) }
        ],

        CrmTechnician: [
            { key: 'technicianId', label: 'ID', sortKey: 'technicianId', filterKey: 'technicianId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'email', label: 'Email', sortKey: 'email', filterKey: 'email' },
            { key: 'phone', label: 'Phone', sortKey: 'phone' },
            { key: 'status', label: 'Status', sortKey: 'status', enumValues: enums.TECHNICIAN_STATUS_VALUES, render: (item) => render.technicianStatus(item.status) },
            { key: 'territory', label: 'Territory', sortKey: 'territory' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        CrmServiceContract: [
            { key: 'contractId', label: 'ID', sortKey: 'contractId', filterKey: 'contractId' },
            { key: 'contractNumber', label: 'Contract #', sortKey: 'contractNumber', filterKey: 'contractNumber' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            { key: 'contractType', label: 'Type', sortKey: 'contractType', enumValues: enums.CONTRACT_TYPE_VALUES, render: (item) => render.contractType(item.contractType) },
            { key: 'status', label: 'Status', sortKey: 'status', enumValues: enums.CONTRACT_STATUS_VALUES, render: (item) => render.contractStatus(item.status) },
            { key: 'startDate', label: 'Start', sortKey: 'startDate', render: (item) => Layer8MRenderers.renderDate(item.startDate) },
            { key: 'endDate', label: 'End', sortKey: 'endDate', render: (item) => Layer8MRenderers.renderDate(item.endDate) }
        ],

        CrmServiceSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'technicianId', label: 'Technician', sortKey: 'technicianId', filterKey: 'technicianId' },
            { key: 'scheduleDate', label: 'Date', sortKey: 'scheduleDate', render: (item) => Layer8MRenderers.renderDate(item.scheduleDate) },
            { key: 'scheduleType', label: 'Type', sortKey: 'scheduleType' },
            { key: 'isAvailable', label: 'Available', sortKey: 'isAvailable', render: (item) => item.isAvailable ? 'Yes' : 'No' },
            { key: 'serviceOrderId', label: 'Service Order', sortKey: 'serviceOrderId' }
        ],

        CrmServicePart: [
            { key: 'partId', label: 'ID', sortKey: 'partId', filterKey: 'partId' },
            { key: 'serviceOrderId', label: 'Service Order', sortKey: 'serviceOrderId', filterKey: 'serviceOrderId' },
            { key: 'itemName', label: 'Item', sortKey: 'itemName', filterKey: 'itemName' },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' },
            { key: 'unitCost', label: 'Unit Cost', sortKey: 'unitCost', render: (item) => Layer8MRenderers.renderMoney(item.unitCost) },
            { key: 'totalCost', label: 'Total', sortKey: 'totalCost', render: (item) => Layer8MRenderers.renderMoney(item.totalCost) },
            { key: 'isWarranty', label: 'Warranty', sortKey: 'isWarranty', render: (item) => item.isWarranty ? 'Yes' : 'No' }
        ],

        CrmServiceVisit: [
            { key: 'visitId', label: 'ID', sortKey: 'visitId', filterKey: 'visitId' },
            { key: 'serviceOrderId', label: 'Service Order', sortKey: 'serviceOrderId', filterKey: 'serviceOrderId' },
            { key: 'technicianId', label: 'Technician', sortKey: 'technicianId' },
            { key: 'status', label: 'Status', sortKey: 'status', enumValues: enums.VISIT_STATUS_VALUES, render: (item) => render.visitStatus(item.status) },
            { key: 'scheduledArrival', label: 'Scheduled', sortKey: 'scheduledArrival', render: (item) => Layer8MRenderers.renderDate(item.scheduledArrival) },
            { key: 'laborHours', label: 'Labor Hrs', sortKey: 'laborHours' },
            { key: 'customerRating', label: 'Rating', sortKey: 'customerRating' }
        ]
    };

    MobileCrmFieldService.primaryKeys = {
        CrmServiceOrder: 'orderId', CrmTechnician: 'technicianId', CrmServiceContract: 'contractId',
        CrmServiceSchedule: 'scheduleId', CrmServicePart: 'partId', CrmServiceVisit: 'visitId'
    };

})();
