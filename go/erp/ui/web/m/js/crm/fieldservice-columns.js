/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileCrmFieldService.enums;
    const render = MobileCrmFieldService.render;

    MobileCrmFieldService.columns = {
        CrmServiceOrder: [
            ...col.id('orderId'),
            ...col.col('orderNumber', 'Order #'),
            ...col.col('accountId', 'Account'),
            ...col.status('orderType', 'Type', enums.SERVICE_ORDER_TYPE_VALUES, render.serviceOrderType),
            ...col.status('status', 'Status', enums.SERVICE_ORDER_STATUS_VALUES, render.serviceOrderStatus),
            ...col.status('priority', 'Priority', enums.SERVICE_ORDER_PRIORITY_VALUES, render.serviceOrderPriority),
            ...col.date('scheduledStart', 'Scheduled')
        ],

        CrmTechnician: [
            ...col.id('technicianId'),
            ...col.col('name', 'Name'),
            ...col.col('email', 'Email'),
            ...col.col('phone', 'Phone'),
            ...col.status('status', 'Status', enums.TECHNICIAN_STATUS_VALUES, render.technicianStatus),
            ...col.col('territory', 'Territory'),
            ...col.boolean('isActive', 'Active')
        ],

        CrmServiceContract: [
            ...col.id('contractId'),
            ...col.col('contractNumber', 'Contract #'),
            ...col.col('accountId', 'Account'),
            ...col.status('contractType', 'Type', enums.CONTRACT_TYPE_VALUES, render.contractType),
            ...col.status('status', 'Status', enums.CONTRACT_STATUS_VALUES, render.contractStatus),
            ...col.date('startDate', 'Start'),
            ...col.date('endDate', 'End')
        ],

        CrmServiceSchedule: [
            ...col.id('scheduleId'),
            ...col.col('technicianId', 'Technician'),
            ...col.date('scheduleDate', 'Date'),
            ...col.col('scheduleType', 'Type'),
            ...col.boolean('isAvailable', 'Available'),
            ...col.col('serviceOrderId', 'Service Order')
        ],

        CrmServicePart: [
            ...col.id('partId'),
            ...col.col('serviceOrderId', 'Service Order'),
            ...col.col('itemName', 'Item'),
            ...col.col('quantity', 'Qty'),
            ...col.money('unitCost', 'Unit Cost'),
            ...col.money('totalCost', 'Total'),
            ...col.boolean('isWarranty', 'Warranty')
        ],

        CrmServiceVisit: [
            ...col.id('visitId'),
            ...col.col('serviceOrderId', 'Service Order'),
            ...col.col('technicianId', 'Technician'),
            ...col.status('status', 'Status', enums.VISIT_STATUS_VALUES, render.visitStatus),
            ...col.date('scheduledArrival', 'Scheduled'),
            ...col.col('laborHours', 'Labor Hrs'),
            ...col.col('customerRating', 'Rating')
        ]
    };

    MobileCrmFieldService.primaryKeys = {
        CrmServiceOrder: 'orderId', CrmTechnician: 'technicianId', CrmServiceContract: 'contractId',
        CrmServiceSchedule: 'scheduleId', CrmServicePart: 'partId', CrmServiceVisit: 'visitId'
    };

})();
