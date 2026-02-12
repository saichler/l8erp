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
// Projects Resources Module - Column Configurations

(function() {
    'use strict';

    window.PrjResources = window.PrjResources || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = PrjResources.render;

    PrjResources.columns = {
        PrjResourcePool: [
            { key: 'poolId', label: 'ID', sortKey: 'poolId', filterKey: 'poolId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'managerId', label: 'Manager', sortKey: 'managerId' },
            { key: 'departmentId', label: 'Department', sortKey: 'departmentId' },
            { key: 'totalCapacityHours', label: 'Capacity Hours', sortKey: 'totalCapacityHours' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        PrjResource: [
            { key: 'resourceId', label: 'ID', sortKey: 'resourceId', filterKey: 'resourceId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'poolId', label: 'Pool', sortKey: 'poolId' },
            {
                key: 'resourceType',
                label: 'Type',
                sortKey: 'resourceType',
                render: (item) => render.resourceType(item.resourceType)
            },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId' },
            { key: 'jobTitle', label: 'Job Title', sortKey: 'jobTitle' },
            {
                key: 'billingRate',
                label: 'Billing Rate',
                sortKey: 'billingRate',
                render: (item) => renderMoney(item.billingRate)
            },
            { key: 'availabilityPercent', label: 'Availability %', sortKey: 'availabilityPercent' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        PrjAllocation: [
            { key: 'allocationId', label: 'ID', sortKey: 'allocationId', filterKey: 'allocationId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'resourceId', label: 'Resource', sortKey: 'resourceId', filterKey: 'resourceId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.allocationStatus(item.status)
            },
            {
                key: 'startDate',
                label: 'Start Date',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End Date',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            },
            { key: 'allocatedHours', label: 'Allocated Hours', sortKey: 'allocatedHours' },
            { key: 'allocatedPercent', label: 'Allocation %', sortKey: 'allocatedPercent' },
            {
                key: 'isBillable',
                label: 'Billable',
                sortKey: 'isBillable',
                render: (item) => item.isBillable ? 'Yes' : 'No'
            }
        ],

        PrjBooking: [
            { key: 'bookingId', label: 'ID', sortKey: 'bookingId', filterKey: 'bookingId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'resourceId', label: 'Resource', sortKey: 'resourceId', filterKey: 'resourceId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.bookingStatus(item.status)
            },
            { key: 'requestedBy', label: 'Requested By', sortKey: 'requestedBy' },
            {
                key: 'startDate',
                label: 'Start Date',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End Date',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            },
            { key: 'requestedHours', label: 'Requested Hours', sortKey: 'requestedHours' },
            { key: 'approvedHours', label: 'Approved Hours', sortKey: 'approvedHours' }
        ],

        PrjCapacityPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'poolId', label: 'Pool', sortKey: 'poolId' },
            {
                key: 'periodStart',
                label: 'Period Start',
                sortKey: 'periodStart',
                render: (item) => renderDate(item.periodStart)
            },
            {
                key: 'periodEnd',
                label: 'Period End',
                sortKey: 'periodEnd',
                render: (item) => renderDate(item.periodEnd)
            },
            { key: 'totalCapacityHours', label: 'Capacity Hours', sortKey: 'totalCapacityHours' },
            { key: 'allocatedHours', label: 'Allocated Hours', sortKey: 'allocatedHours' },
            { key: 'availableHours', label: 'Available Hours', sortKey: 'availableHours' },
            { key: 'utilizationTarget', label: 'Target %', sortKey: 'utilizationTarget' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        PrjUtilization: [
            { key: 'utilizationId', label: 'ID', sortKey: 'utilizationId', filterKey: 'utilizationId' },
            { key: 'resourceId', label: 'Resource', sortKey: 'resourceId', filterKey: 'resourceId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId' },
            {
                key: 'periodStart',
                label: 'Period Start',
                sortKey: 'periodStart',
                render: (item) => renderDate(item.periodStart)
            },
            {
                key: 'periodEnd',
                label: 'Period End',
                sortKey: 'periodEnd',
                render: (item) => renderDate(item.periodEnd)
            },
            { key: 'capacityHours', label: 'Capacity Hours', sortKey: 'capacityHours' },
            { key: 'billableHours', label: 'Billable Hours', sortKey: 'billableHours' },
            { key: 'nonBillableHours', label: 'Non-Billable', sortKey: 'nonBillableHours' },
            { key: 'totalHours', label: 'Total Hours', sortKey: 'totalHours' },
            { key: 'utilizationPercent', label: 'Utilization %', sortKey: 'utilizationPercent' },
            { key: 'billableUtilizationPercent', label: 'Billable %', sortKey: 'billableUtilizationPercent' }
        ]
    };

})();
