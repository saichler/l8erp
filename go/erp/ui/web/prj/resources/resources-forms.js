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
// Projects Resources Module - Form Definitions

(function() {
    'use strict';

    window.PrjResources = window.PrjResources || {};

    const enums = PrjResources.enums;

    PrjResources.forms = {
        PrjResourcePool: {
            title: 'Resource Pool',
            sections: [
                {
                    title: 'Pool Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'managerId', label: 'Manager', type: 'reference', lookupModel: 'Employee' },
                        { key: 'departmentId', label: 'Department', type: 'reference', lookupModel: 'Department' },
                        { key: 'totalCapacityHours', label: 'Total Capacity Hours', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        PrjResource: {
            title: 'Resource',
            sections: [
                {
                    title: 'Resource Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'poolId', label: 'Resource Pool', type: 'reference', lookupModel: 'PrjResourcePool' },
                        { key: 'resourceType', label: 'Resource Type', type: 'select', options: enums.RESOURCE_TYPE, required: true },
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee' },
                        { key: 'jobTitle', label: 'Job Title', type: 'text' },
                        { key: 'hourlyCost', label: 'Hourly Cost', type: 'money' },
                        { key: 'billingRate', label: 'Billing Rate', type: 'money' },
                        { key: 'availabilityPercent', label: 'Availability %', type: 'number' },
                        { key: 'capacityHoursPerWeek', label: 'Capacity Hours/Week', type: 'number' },
                        { key: 'availableFrom', label: 'Available From', type: 'date' },
                        { key: 'availableUntil', label: 'Available Until', type: 'date' },
                        { key: 'location', label: 'Location', type: 'text' },
                        { key: 'timeZone', label: 'Time Zone', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        PrjResourceSkill: {
            title: 'Resource Skill',
            sections: [
                {
                    title: 'Skill Details',
                    fields: [
                        { key: 'resourceId', label: 'Resource', type: 'reference', lookupModel: 'PrjResource', required: true },
                        { key: 'skillName', label: 'Skill Name', type: 'text', required: true },
                        { key: 'skillCategory', label: 'Skill Category', type: 'text' },
                        { key: 'proficiencyLevel', label: 'Proficiency Level (1-5)', type: 'number', required: true },
                        { key: 'yearsExperience', label: 'Years Experience', type: 'number' },
                        { key: 'isPrimary', label: 'Primary Skill', type: 'checkbox' },
                        { key: 'certifiedDate', label: 'Certified Date', type: 'date' },
                        { key: 'certificationExpiry', label: 'Certification Expiry', type: 'date' }
                    ]
                }
            ]
        },

        PrjAllocation: {
            title: 'Resource Allocation',
            sections: [
                {
                    title: 'Allocation Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'resourceId', label: 'Resource', type: 'reference', lookupModel: 'PrjResource', required: true },
                        { key: 'taskId', label: 'Task', type: 'reference', lookupModel: 'PrjTask' },
                        { key: 'phaseId', label: 'Phase', type: 'reference', lookupModel: 'PrjPhase' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ALLOCATION_STATUS },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'allocatedHours', label: 'Allocated Hours', type: 'number' },
                        { key: 'allocatedPercent', label: 'Allocation %', type: 'number' },
                        { key: 'billingRate', label: 'Billing Rate', type: 'money' },
                        { key: 'isBillable', label: 'Billable', type: 'checkbox' },
                        { key: 'role', label: 'Role', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        PrjBooking: {
            title: 'Resource Booking',
            sections: [
                {
                    title: 'Booking Details',
                    fields: [
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject', required: true },
                        { key: 'resourceId', label: 'Resource', type: 'reference', lookupModel: 'PrjResource', required: true },
                        { key: 'requestedBy', label: 'Requested By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'approvedBy', label: 'Approved By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.BOOKING_STATUS },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'requestedHours', label: 'Requested Hours', type: 'number' },
                        { key: 'approvedHours', label: 'Approved Hours', type: 'number' },
                        { key: 'role', label: 'Role', type: 'text' },
                        { key: 'skillRequired', label: 'Skill Required', type: 'text' },
                        { key: 'requestedDate', label: 'Requested Date', type: 'date' },
                        { key: 'decisionDate', label: 'Decision Date', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        PrjCapacityPlan: {
            title: 'Capacity Plan',
            sections: [
                {
                    title: 'Plan Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'poolId', label: 'Resource Pool', type: 'reference', lookupModel: 'PrjResourcePool' },
                        { key: 'periodStart', label: 'Period Start', type: 'date', required: true },
                        { key: 'periodEnd', label: 'Period End', type: 'date', required: true },
                        { key: 'totalCapacityHours', label: 'Total Capacity Hours', type: 'number' },
                        { key: 'allocatedHours', label: 'Allocated Hours', type: 'number' },
                        { key: 'availableHours', label: 'Available Hours', type: 'number' },
                        { key: 'utilizationTarget', label: 'Utilization Target %', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        PrjUtilization: {
            title: 'Resource Utilization',
            sections: [
                {
                    title: 'Utilization Details',
                    fields: [
                        { key: 'resourceId', label: 'Resource', type: 'reference', lookupModel: 'PrjResource', required: true },
                        { key: 'projectId', label: 'Project', type: 'reference', lookupModel: 'PrjProject' },
                        { key: 'periodStart', label: 'Period Start', type: 'date', required: true },
                        { key: 'periodEnd', label: 'Period End', type: 'date', required: true },
                        { key: 'capacityHours', label: 'Capacity Hours', type: 'number' },
                        { key: 'billableHours', label: 'Billable Hours', type: 'number' },
                        { key: 'nonBillableHours', label: 'Non-Billable Hours', type: 'number' },
                        { key: 'totalHours', label: 'Total Hours', type: 'number' },
                        { key: 'utilizationPercent', label: 'Utilization %', type: 'number' },
                        { key: 'billableUtilizationPercent', label: 'Billable Utilization %', type: 'number' },
                        { key: 'revenue', label: 'Revenue', type: 'money' },
                        { key: 'cost', label: 'Cost', type: 'money' }
                    ]
                }
            ]
        }
    };

    PrjResources.primaryKeys = {
        PrjResourcePool: 'poolId',
        PrjResource: 'resourceId',
        PrjResourceSkill: 'skillId',
        PrjAllocation: 'allocationId',
        PrjBooking: 'bookingId',
        PrjCapacityPlan: 'planId',
        PrjUtilization: 'utilizationId'
    };

})();
