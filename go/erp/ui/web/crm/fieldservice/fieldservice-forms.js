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
// CRM Field Service Module - Form Definitions

(function() {
    'use strict';

    window.CrmFieldService = window.CrmFieldService || {};

    const enums = CrmFieldService.enums;

    CrmFieldService.forms = {
        CrmServiceOrder: {
            title: 'Service Order',
            sections: [
                {
                    title: 'Order Details',
                    fields: [
                        { key: 'orderNumber', label: 'Order Number', type: 'text', required: true },
                        { key: 'subject', label: 'Subject', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'contactId', label: 'Contact', type: 'reference', lookupModel: 'CrmContact' },
                        { key: 'orderType', label: 'Type', type: 'select', options: enums.SERVICE_ORDER_TYPE },
                        { key: 'priority', label: 'Priority', type: 'select', options: enums.SERVICE_ORDER_PRIORITY },
                        { key: 'status', label: 'Status', type: 'select', options: enums.SERVICE_ORDER_STATUS }
                    ]
                },
                {
                    title: 'Scheduling',
                    fields: [
                        { key: 'scheduledDate', label: 'Scheduled Date', type: 'date' },
                        { key: 'estimatedDuration', label: 'Estimated Duration (hours)', type: 'number' },
                        { key: 'technicianId', label: 'Assigned Technician', type: 'reference', lookupModel: 'CrmTechnician' },
                        { key: 'contractId', label: 'Service Contract', type: 'reference', lookupModel: 'CrmServiceContract' }
                    ]
                },
                {
                    title: 'Location',
                    fields: [
                        { key: 'serviceAddress', label: 'Service Address', type: 'textarea' },
                        { key: 'latitude', label: 'Latitude', type: 'number' },
                        { key: 'longitude', label: 'Longitude', type: 'number' }
                    ]
                },
                {
                    title: 'Completion',
                    fields: [
                        { key: 'completedDate', label: 'Completed Date', type: 'date' },
                        { key: 'resolution', label: 'Resolution', type: 'textarea' },
                        { key: 'productId', label: 'Product', type: 'reference', lookupModel: 'ScmItem' }
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
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'HcmEmployee' },
                        { key: 'email', label: 'Email', type: 'email' },
                        { key: 'phone', label: 'Phone', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TECHNICIAN_STATUS }
                    ]
                },
                {
                    title: 'Skills & Qualifications',
                    fields: [
                        { key: 'specialization', label: 'Specialization', type: 'text' },
                        { key: 'skillLevel', label: 'Skill Level', type: 'number' },
                        { key: 'isCertified', label: 'Certified', type: 'checkbox' },
                        { key: 'certifications', label: 'Certifications', type: 'textarea' }
                    ]
                },
                {
                    title: 'Assignment',
                    fields: [
                        { key: 'region', label: 'Region', type: 'text' },
                        { key: 'territory', label: 'Territory', type: 'text' },
                        { key: 'maxOrdersPerDay', label: 'Max Orders/Day', type: 'number' },
                        { key: 'hourlyRate', label: 'Hourly Rate', type: 'money' }
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
                        { key: 'contractNumber', label: 'Contract Number', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'contactId', label: 'Contact', type: 'reference', lookupModel: 'CrmContact' },
                        { key: 'contractType', label: 'Type', type: 'select', options: enums.CONTRACT_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.CONTRACT_STATUS }
                    ]
                },
                {
                    title: 'Term',
                    fields: [
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'renewalDate', label: 'Renewal Date', type: 'date' },
                        { key: 'autoRenewal', label: 'Auto Renewal', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Coverage',
                    fields: [
                        { key: 'coverage', label: 'Coverage Details', type: 'textarea' },
                        { key: 'visitsIncluded', label: 'Visits Included', type: 'number' },
                        { key: 'visitsUsed', label: 'Visits Used', type: 'number' },
                        { key: 'partsIncluded', label: 'Parts Included', type: 'checkbox' },
                        { key: 'laborIncluded', label: 'Labor Included', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Value',
                    fields: [
                        { key: 'contractValue', label: 'Contract Value', type: 'money' },
                        { key: 'billingFrequency', label: 'Billing Frequency', type: 'text' },
                        { key: 'slaId', label: 'SLA', type: 'reference', lookupModel: 'CrmSLA' }
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
                        { key: 'serviceOrderId', label: 'Service Order', type: 'reference', lookupModel: 'CrmServiceOrder', required: true },
                        { key: 'technicianId', label: 'Technician', type: 'reference', lookupModel: 'CrmTechnician', required: true },
                        { key: 'scheduledDate', label: 'Scheduled Date', type: 'date', required: true },
                        { key: 'startTime', label: 'Start Time', type: 'text' },
                        { key: 'endTime', label: 'End Time', type: 'text' },
                        { key: 'estimatedDuration', label: 'Estimated Duration (hours)', type: 'number' }
                    ]
                },
                {
                    title: 'Confirmation',
                    fields: [
                        { key: 'isConfirmed', label: 'Confirmed', type: 'checkbox' },
                        { key: 'confirmedDate', label: 'Confirmed Date', type: 'date' },
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
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'unitPrice', label: 'Unit Price', type: 'money' },
                        { key: 'totalPrice', label: 'Total Price', type: 'money' }
                    ]
                },
                {
                    title: 'Installation',
                    fields: [
                        { key: 'isInstalled', label: 'Installed', type: 'checkbox' },
                        { key: 'installedDate', label: 'Installed Date', type: 'date' },
                        { key: 'serialNumber', label: 'Serial Number', type: 'text' },
                        { key: 'warrantyEndDate', label: 'Warranty End Date', type: 'date' }
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
                        { key: 'visitDate', label: 'Visit Date', type: 'date', required: true },
                        { key: 'arrivalTime', label: 'Arrival Time', type: 'text' },
                        { key: 'departureTime', label: 'Departure Time', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.VISIT_STATUS }
                    ]
                },
                {
                    title: 'Work Performed',
                    fields: [
                        { key: 'workPerformed', label: 'Work Performed', type: 'textarea' },
                        { key: 'laborHours', label: 'Labor Hours', type: 'number' },
                        { key: 'laborCost', label: 'Labor Cost', type: 'money' },
                        { key: 'partsUsed', label: 'Parts Used', type: 'textarea' },
                        { key: 'findings', label: 'Findings', type: 'textarea' },
                        { key: 'recommendations', label: 'Recommendations', type: 'textarea' }
                    ]
                },
                {
                    title: 'Sign-off',
                    fields: [
                        { key: 'customerSignature', label: 'Customer Signature', type: 'text' },
                        { key: 'customerName', label: 'Customer Name', type: 'text' },
                        { key: 'signatureDate', label: 'Signature Date', type: 'date' },
                        { key: 'customerFeedback', label: 'Customer Feedback', type: 'textarea' },
                        { key: 'rating', label: 'Rating', type: 'number' }
                    ]
                }
            ]
        }
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
