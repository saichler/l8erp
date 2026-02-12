/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// CRM Field Service Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.CrmFieldService = window.CrmFieldService || {};

    const f = window.Layer8FormFactory;
    const enums = CrmFieldService.enums;

    CrmFieldService.forms = {
        CrmServiceOrder: f.form('Service Order', [
            f.section('Order Details', [
                ...f.text('orderNumber', 'Order Number', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.reference('contactId', 'Contact', 'CrmContact'),
                ...f.reference('caseId', 'Case', 'CrmCase'),
                ...f.select('orderType', 'Type', enums.SERVICE_ORDER_TYPE),
                ...f.select('priority', 'Priority', enums.SERVICE_ORDER_PRIORITY),
                ...f.select('status', 'Status', enums.SERVICE_ORDER_STATUS)
            ]),
            f.section('Scheduling', [
                ...f.date('scheduledStart', 'Scheduled Start'),
                ...f.date('scheduledEnd', 'Scheduled End'),
                ...f.reference('technicianId', 'Assigned Technician', 'CrmTechnician'),
                ...f.reference('contractId', 'Service Contract', 'CrmServiceContract')
            ]),
            f.section('Location & Product', [
                ...f.address('serviceAddress'),
                ...f.reference('productId', 'Product', 'ScmItem'),
                ...f.text('serialNumber', 'Serial Number'),
                ...f.money('estimatedCost', 'Estimated Cost'),
                ...f.money('actualCost', 'Actual Cost')
            ]),
            f.section('Completion', [
                ...f.date('actualStart', 'Actual Start'),
                ...f.date('actualEnd', 'Actual End'),
                ...f.textarea('resolution', 'Resolution'),
                ...f.reference('ownerId', 'Owner', 'Employee')
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
                ...f.text('name', 'Name', true),
                ...f.reference('employeeId', 'Employee', 'Employee'),
                ...f.text('email', 'Email'),
                ...f.text('phone', 'Phone'),
                ...f.select('status', 'Status', enums.TECHNICIAN_STATUS)
            ]),
            f.section('Skills & Assignment', [
                ...f.text('skills', 'Skills'),
                ...f.text('territory', 'Territory'),
                ...f.address('homeLocation'),
                ...f.number('maxDailyOrders', 'Max Daily Orders'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Rates', [
                ...f.number('hourlyRate', 'Hourly Rate'),
                ...f.number('overtimeRate', 'Overtime Rate')
            ])
        ]),

        CrmServiceContract: f.form('Service Contract', [
            f.section('Contract Details', [
                ...f.text('contractNumber', 'Contract Number', true),
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.select('contractType', 'Type', enums.CONTRACT_TYPE),
                ...f.select('status', 'Status', enums.CONTRACT_STATUS),
                ...f.textarea('terms', 'Terms')
            ]),
            f.section('Term', [
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.checkbox('autoRenew', 'Auto Renew'),
                ...f.number('renewalNoticeDays', 'Renewal Notice Days')
            ]),
            f.section('Coverage', [
                ...f.number('includedHours', 'Included Hours'),
                ...f.number('usedHours', 'Used Hours'),
                ...f.number('includedVisits', 'Included Visits'),
                ...f.number('usedVisits', 'Used Visits')
            ]),
            f.section('Value', [
                ...f.money('contractValue', 'Contract Value'),
                ...f.text('billingFrequency', 'Billing Frequency'),
                ...f.reference('slaId', 'SLA', 'CrmSLA'),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ])
        ]),

        CrmServiceSchedule: f.form('Service Schedule', [
            f.section('Schedule Details', [
                ...f.reference('serviceOrderId', 'Service Order', 'CrmServiceOrder', true),
                ...f.reference('technicianId', 'Technician', 'CrmTechnician', true),
                ...f.date('scheduleDate', 'Schedule Date', true),
                ...f.text('startTime', 'Start Time'),
                ...f.text('endTime', 'End Time'),
                ...f.text('scheduleType', 'Schedule Type')
            ]),
            f.section('Availability', [
                ...f.checkbox('isAvailable', 'Available'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

    };

    CrmFieldService.primaryKeys = {
        CrmServiceOrder: 'orderId',
        CrmTechnician: 'technicianId',
        CrmServiceContract: 'contractId',
        CrmServiceSchedule: 'scheduleId'
    };

})();
