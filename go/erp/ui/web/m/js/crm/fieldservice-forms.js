/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const enums = MobileCrmFieldService.enums;

    MobileCrmFieldService.forms = {
        CrmServiceOrder: {
            title: 'Service Order',
            sections: [
                {
                    title: 'Order Details',
                    fields: [
                        { key: 'orderNumber', label: 'Order Number', type: 'text' },
                        { key: 'orderType', label: 'Order Type', type: 'select', options: enums.SERVICE_ORDER_TYPE, required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.SERVICE_ORDER_STATUS },
                        { key: 'priority', label: 'Priority', type: 'select', options: enums.SERVICE_ORDER_PRIORITY },
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'contactId', label: 'Contact', type: 'reference', lookupModel: 'CrmContact' },
                        { key: 'caseId', label: 'Case', type: 'reference', lookupModel: 'CrmCase' },
                        { key: 'contractId', label: 'Contract', type: 'reference', lookupModel: 'CrmServiceContract' },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'technicianId', label: 'Technician', type: 'reference', lookupModel: 'CrmTechnician' },
                        { key: 'scheduledStart', label: 'Scheduled Start', type: 'date' },
                        { key: 'scheduledEnd', label: 'Scheduled End', type: 'date' },
                        { key: 'estimatedCost', label: 'Estimated Cost', type: 'currency' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        },

        CrmTechnician: {
            title: 'Technician',
            sections: [
                {
                    title: 'Technician Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee' },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'email', label: 'Email', type: 'email' },
                        { key: 'phone', label: 'Phone', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TECHNICIAN_STATUS },
                        { key: 'territory', label: 'Territory', type: 'text' },
                        { key: 'hourlyRate', label: 'Hourly Rate', type: 'number' },
                        { key: 'overtimeRate', label: 'Overtime Rate', type: 'number' },
                        { key: 'maxDailyOrders', label: 'Max Daily Orders', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmServiceContract: {
            title: 'Service Contract',
            sections: [
                {
                    title: 'Contract Details',
                    fields: [
                        { key: 'contractNumber', label: 'Contract Number', type: 'text' },
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'contractType', label: 'Contract Type', type: 'select', options: enums.CONTRACT_TYPE, required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.CONTRACT_STATUS },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'contractValue', label: 'Contract Value', type: 'currency' },
                        { key: 'includedHours', label: 'Included Hours', type: 'number' },
                        { key: 'includedVisits', label: 'Included Visits', type: 'number' },
                        { key: 'slaId', label: 'SLA', type: 'reference', lookupModel: 'CrmSLA' },
                        { key: 'autoRenew', label: 'Auto Renew', type: 'checkbox' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'terms', label: 'Terms', type: 'textarea' }
                    ]
                }
            ]
        },

        CrmServiceSchedule: {
            title: 'Service Schedule',
            sections: [
                {
                    title: 'Schedule Details',
                    fields: [
                        { key: 'technicianId', label: 'Technician', type: 'reference', lookupModel: 'CrmTechnician', required: true },
                        { key: 'scheduleDate', label: 'Schedule Date', type: 'date', required: true },
                        { key: 'startTime', label: 'Start Time', type: 'date' },
                        { key: 'endTime', label: 'End Time', type: 'date' },
                        { key: 'scheduleType', label: 'Schedule Type', type: 'text' },
                        { key: 'isAvailable', label: 'Available', type: 'checkbox' },
                        { key: 'serviceOrderId', label: 'Service Order', type: 'reference', lookupModel: 'CrmServiceOrder' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        CrmServicePart: {
            title: 'Service Part',
            sections: [
                {
                    title: 'Part Details',
                    fields: [
                        { key: 'serviceOrderId', label: 'Service Order', type: 'reference', lookupModel: 'CrmServiceOrder', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'itemName', label: 'Item Name', type: 'text' },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'unitCost', label: 'Unit Cost', type: 'currency' },
                        { key: 'totalCost', label: 'Total Cost', type: 'currency' },
                        { key: 'serialNumber', label: 'Serial Number', type: 'text' },
                        { key: 'isWarranty', label: 'Warranty', type: 'checkbox' },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        CrmServiceVisit: {
            title: 'Service Visit',
            sections: [
                {
                    title: 'Visit Details',
                    fields: [
                        { key: 'serviceOrderId', label: 'Service Order', type: 'reference', lookupModel: 'CrmServiceOrder', required: true },
                        { key: 'technicianId', label: 'Technician', type: 'reference', lookupModel: 'CrmTechnician', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.VISIT_STATUS },
                        { key: 'scheduledArrival', label: 'Scheduled Arrival', type: 'date' },
                        { key: 'actualArrival', label: 'Actual Arrival', type: 'date' },
                        { key: 'departureTime', label: 'Departure Time', type: 'date' },
                        { key: 'laborHours', label: 'Labor Hours', type: 'number' },
                        { key: 'travelHours', label: 'Travel Hours', type: 'number' },
                        { key: 'workPerformed', label: 'Work Performed', type: 'textarea' },
                        { key: 'customerRating', label: 'Customer Rating', type: 'number' },
                        { key: 'customerFeedback', label: 'Customer Feedback', type: 'textarea' }
                    ]
                }
            ]
        }
    };

})();
