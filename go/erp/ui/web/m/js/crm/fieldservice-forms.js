/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
// Uses Layer8FormFactory for reduced boilerplate
(function() {
    'use strict';

    window.MobileCrmFieldService = window.MobileCrmFieldService || {};
    const f = window.Layer8FormFactory;
    const enums = MobileCrmFieldService.enums;

    MobileCrmFieldService.forms = {
        CrmServiceOrder: f.form('Service Order', [
            f.section('Order Details', [
                ...f.text('orderNumber', 'Order Number'),
                ...f.select('orderType', 'Order Type', enums.SERVICE_ORDER_TYPE, true),
                ...f.select('status', 'Status', enums.SERVICE_ORDER_STATUS),
                ...f.select('priority', 'Priority', enums.SERVICE_ORDER_PRIORITY),
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.reference('contactId', 'Contact', 'CrmContact'),
                ...f.reference('caseId', 'Case', 'CrmCase'),
                ...f.reference('contractId', 'Contract', 'CrmServiceContract'),
                ...f.textarea('description', 'Description'),
                ...f.reference('technicianId', 'Technician', 'CrmTechnician'),
                ...f.date('scheduledStart', 'Scheduled Start'),
                ...f.date('scheduledEnd', 'Scheduled End'),
                ...f.money('estimatedCost', 'Estimated Cost'),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ])
        ]),

        CrmTechnician: f.form('Technician', [
            f.section('Technician Details', [
                ...f.reference('employeeId', 'Employee', 'Employee'),
                ...f.text('name', 'Name', true),
                ...f.email('email', 'Email'),
                ...f.text('phone', 'Phone'),
                ...f.select('status', 'Status', enums.TECHNICIAN_STATUS),
                ...f.text('territory', 'Territory'),
                ...f.number('hourlyRate', 'Hourly Rate'),
                ...f.number('overtimeRate', 'Overtime Rate'),
                ...f.number('maxDailyOrders', 'Max Daily Orders'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        CrmServiceContract: f.form('Service Contract', [
            f.section('Contract Details', [
                ...f.text('contractNumber', 'Contract Number'),
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.select('contractType', 'Contract Type', enums.CONTRACT_TYPE, true),
                ...f.select('status', 'Status', enums.CONTRACT_STATUS),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.money('contractValue', 'Contract Value'),
                ...f.number('includedHours', 'Included Hours'),
                ...f.number('includedVisits', 'Included Visits'),
                ...f.reference('slaId', 'SLA', 'CrmSLA'),
                ...f.checkbox('autoRenew', 'Auto Renew'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.textarea('terms', 'Terms')
            ])
        ]),

        CrmServiceSchedule: f.form('Service Schedule', [
            f.section('Schedule Details', [
                ...f.reference('technicianId', 'Technician', 'CrmTechnician', true),
                ...f.date('scheduleDate', 'Schedule Date', true),
                ...f.date('startTime', 'Start Time'),
                ...f.date('endTime', 'End Time'),
                ...f.text('scheduleType', 'Schedule Type'),
                ...f.checkbox('isAvailable', 'Available'),
                ...f.reference('serviceOrderId', 'Service Order', 'CrmServiceOrder'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        CrmServicePart: f.form('Service Part', [
            f.section('Part Details', [
                ...f.reference('serviceOrderId', 'Service Order', 'CrmServiceOrder', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.text('itemName', 'Item Name'),
                ...f.number('quantity', 'Quantity', true),
                ...f.money('unitCost', 'Unit Cost'),
                ...f.money('totalCost', 'Total Cost'),
                ...f.text('serialNumber', 'Serial Number'),
                ...f.checkbox('isWarranty', 'Warranty'),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        CrmServiceVisit: f.form('Service Visit', [
            f.section('Visit Details', [
                ...f.reference('serviceOrderId', 'Service Order', 'CrmServiceOrder', true),
                ...f.reference('technicianId', 'Technician', 'CrmTechnician', true),
                ...f.select('status', 'Status', enums.VISIT_STATUS),
                ...f.date('scheduledArrival', 'Scheduled Arrival'),
                ...f.date('actualArrival', 'Actual Arrival'),
                ...f.date('departureTime', 'Departure Time'),
                ...f.number('laborHours', 'Labor Hours'),
                ...f.number('travelHours', 'Travel Hours'),
                ...f.textarea('workPerformed', 'Work Performed'),
                ...f.number('customerRating', 'Customer Rating'),
                ...f.textarea('customerFeedback', 'Customer Feedback')
            ])
        ])
    };

})();
