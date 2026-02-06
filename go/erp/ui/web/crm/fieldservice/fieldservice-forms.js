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
                ...f.text('subject', 'Subject', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.reference('contactId', 'Contact', 'CrmContact'),
                ...f.select('orderType', 'Type', enums.SERVICE_ORDER_TYPE),
                ...f.select('priority', 'Priority', enums.SERVICE_ORDER_PRIORITY),
                ...f.select('status', 'Status', enums.SERVICE_ORDER_STATUS)
            ]),
            f.section('Scheduling', [
                ...f.date('scheduledDate', 'Scheduled Date'),
                ...f.number('estimatedDuration', 'Estimated Duration (hours)'),
                ...f.reference('technicianId', 'Assigned Technician', 'CrmTechnician'),
                ...f.reference('contractId', 'Service Contract', 'CrmServiceContract')
            ]),
            f.section('Location', [
                ...f.textarea('serviceAddress', 'Service Address'),
                ...f.number('latitude', 'Latitude'),
                ...f.number('longitude', 'Longitude')
            ]),
            f.section('Completion', [
                ...f.date('completedDate', 'Completed Date'),
                ...f.textarea('resolution', 'Resolution'),
                ...f.reference('productId', 'Product', 'ScmItem')
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
            f.section('Skills & Qualifications', [
                ...f.text('specialization', 'Specialization'),
                ...f.number('skillLevel', 'Skill Level'),
                ...f.checkbox('isCertified', 'Certified'),
                ...f.textarea('certifications', 'Certifications')
            ]),
            f.section('Assignment', [
                ...f.text('region', 'Region'),
                ...f.text('territory', 'Territory'),
                ...f.number('maxOrdersPerDay', 'Max Orders/Day'),
                ...f.money('hourlyRate', 'Hourly Rate')
            ])
        ]),

        CrmServiceContract: f.form('Service Contract', [
            f.section('Contract Details', [
                ...f.text('contractNumber', 'Contract Number', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.reference('contactId', 'Contact', 'CrmContact'),
                ...f.select('contractType', 'Type', enums.CONTRACT_TYPE),
                ...f.select('status', 'Status', enums.CONTRACT_STATUS)
            ]),
            f.section('Term', [
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.date('renewalDate', 'Renewal Date'),
                ...f.checkbox('autoRenewal', 'Auto Renewal')
            ]),
            f.section('Coverage', [
                ...f.textarea('coverage', 'Coverage Details'),
                ...f.number('visitsIncluded', 'Visits Included'),
                ...f.number('visitsUsed', 'Visits Used'),
                ...f.checkbox('partsIncluded', 'Parts Included'),
                ...f.checkbox('laborIncluded', 'Labor Included')
            ]),
            f.section('Value', [
                ...f.money('contractValue', 'Contract Value'),
                ...f.text('billingFrequency', 'Billing Frequency'),
                ...f.reference('slaId', 'SLA', 'CrmSLA')
            ])
        ]),

        CrmServiceSchedule: f.form('Service Schedule', [
            f.section('Schedule Details', [
                ...f.reference('serviceOrderId', 'Service Order', 'CrmServiceOrder', true),
                ...f.reference('technicianId', 'Technician', 'CrmTechnician', true),
                ...f.date('scheduledDate', 'Scheduled Date', true),
                ...f.text('startTime', 'Start Time'),
                ...f.text('endTime', 'End Time'),
                ...f.number('estimatedDuration', 'Estimated Duration (hours)')
            ]),
            f.section('Confirmation', [
                ...f.checkbox('isConfirmed', 'Confirmed'),
                ...f.date('confirmedDate', 'Confirmed Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        CrmServicePart: f.form('Service Part', [
            f.section('Part Details', [
                ...f.reference('serviceOrderId', 'Service Order', 'CrmServiceOrder', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.textarea('description', 'Description'),
                ...f.number('quantity', 'Quantity', true),
                ...f.money('unitPrice', 'Unit Price'),
                ...f.money('totalPrice', 'Total Price')
            ]),
            f.section('Installation', [
                ...f.checkbox('isInstalled', 'Installed'),
                ...f.date('installedDate', 'Installed Date'),
                ...f.text('serialNumber', 'Serial Number'),
                ...f.date('warrantyEndDate', 'Warranty End Date')
            ])
        ]),

        CrmServiceVisit: f.form('Service Visit', [
            f.section('Visit Details', [
                ...f.reference('serviceOrderId', 'Service Order', 'CrmServiceOrder', true),
                ...f.reference('technicianId', 'Technician', 'CrmTechnician', true),
                ...f.date('visitDate', 'Visit Date', true),
                ...f.text('arrivalTime', 'Arrival Time'),
                ...f.text('departureTime', 'Departure Time'),
                ...f.select('status', 'Status', enums.VISIT_STATUS)
            ]),
            f.section('Work Performed', [
                ...f.textarea('workPerformed', 'Work Performed'),
                ...f.number('laborHours', 'Labor Hours'),
                ...f.money('laborCost', 'Labor Cost'),
                ...f.textarea('partsUsed', 'Parts Used'),
                ...f.textarea('findings', 'Findings'),
                ...f.textarea('recommendations', 'Recommendations')
            ]),
            f.section('Sign-off', [
                ...f.text('customerSignature', 'Customer Signature'),
                ...f.text('customerName', 'Customer Name'),
                ...f.date('signatureDate', 'Signature Date'),
                ...f.textarea('customerFeedback', 'Customer Feedback'),
                ...f.number('rating', 'Rating')
            ])
        ])
    };

    CrmFieldService.primaryKeys = {
        CrmServiceOrder: 'orderId',
        CrmTechnician: 'technicianId',
        CrmServiceContract: 'contractId',
        CrmServiceSchedule: 'scheduleId',
        CrmServicePart: 'partId',
        CrmServiceVisit: 'visitId'
    };

})();
