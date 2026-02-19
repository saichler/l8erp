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
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.address('serviceAddress'),
                ...f.number('actualStart', 'Actual Start'),
                ...f.number('actualEnd', 'Actual End'),
                ...f.text('productId', 'Product'),
                ...f.money('actualCost', 'Actual Cost'),
                ...f.text('resolution', 'Resolution'),
            ]),
            f.section('Parts', [
                ...f.inlineTable('parts', 'Service Parts', [
                    { key: 'partId', label: 'ID', hidden: true },
                    { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem' },
                    { key: 'itemName', label: 'Name', type: 'text' },
                    { key: 'quantity', label: 'Qty', type: 'number', required: true },
                    { key: 'unitCost', label: 'Unit Cost', type: 'money' },
                    { key: 'totalCost', label: 'Total', type: 'money' },
                    { key: 'serialNumber', label: 'Serial #', type: 'text' },
                    { key: 'isWarranty', label: 'Warranty', type: 'checkbox' }
                ])
            ]),
            f.section('Visits', [
                ...f.inlineTable('visits', 'Service Visits', [
                    { key: 'visitId', label: 'ID', hidden: true },
                    { key: 'technicianId', label: 'Technician', type: 'reference', lookupModel: 'CrmTechnician' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.VISIT_STATUS },
                    { key: 'scheduledArrival', label: 'Scheduled', type: 'date' },
                    { key: 'laborHours', label: 'Labor Hrs', type: 'number' },
                    { key: 'laborCost', label: 'Labor Cost', type: 'money' },
                    { key: 'travelDistance', label: 'Travel Dist', type: 'number' },
                    { key: 'travelCost', label: 'Travel Cost', type: 'money' }
                ])
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
                ...f.checkbox('isActive', 'Active'),
                ...f.text('skills', 'Skills'),
                ...f.address('homeLocation'),
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
                ...f.textarea('terms', 'Terms'),
                ...f.number('usedHours', 'Used Hours'),
                ...f.number('usedVisits', 'Used Visits'),
                ...f.text('billingFrequency', 'Billing Frequency'),
                ...f.number('renewalNoticeDays', 'Renewal Notice Days'),
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

    };

})();
