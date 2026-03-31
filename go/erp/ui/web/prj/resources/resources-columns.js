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

    const col = window.Layer8ColumnFactory;
    const render = PrjResources.render;

    PrjResources.columns = {
        PrjResourcePool: [
            ...col.id('poolId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.col('managerId', 'Manager'),
            ...col.col('departmentId', 'Department'),
            ...col.col('totalCapacityHours', 'Capacity Hours'),
            ...col.boolean('isActive', 'Active')
        ],

        PrjResource: [
            ...col.id('resourceId'),
            ...col.col('name', 'Name'),
            ...col.col('poolId', 'Pool'),
            ...col.enum('resourceType', 'Type', null, render.resourceType),
            ...col.col('employeeId', 'Employee'),
            ...col.col('jobTitle', 'Job Title'),
            ...col.money('billingRate', 'Billing Rate'),
            ...col.col('availabilityPercent', 'Availability %'),
            ...col.boolean('isActive', 'Active')
        ],

        PrjAllocation: [
            ...col.id('allocationId'),
            ...col.col('projectId', 'Project'),
            ...col.col('resourceId', 'Resource'),
            ...col.enum('status', 'Status', null, render.allocationStatus),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.col('allocatedHours', 'Allocated Hours'),
            ...col.col('allocatedPercent', 'Allocation %'),
            ...col.boolean('isBillable', 'Billable')
        ],

        PrjBooking: [
            ...col.id('bookingId'),
            ...col.col('projectId', 'Project'),
            ...col.col('resourceId', 'Resource'),
            ...col.enum('status', 'Status', null, render.bookingStatus),
            ...col.col('requestedBy', 'Requested By'),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.col('requestedHours', 'Requested Hours'),
            ...col.col('approvedHours', 'Approved Hours')
        ],

        PrjCapacityPlan: [
            ...col.id('planId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.col('poolId', 'Pool'),
            ...col.date('periodStart', 'Period Start'),
            ...col.date('periodEnd', 'Period End'),
            ...col.col('totalCapacityHours', 'Capacity Hours'),
            ...col.col('allocatedHours', 'Allocated Hours'),
            ...col.col('availableHours', 'Available Hours'),
            ...col.col('utilizationTarget', 'Target %'),
            ...col.boolean('isActive', 'Active')
        ],

        PrjUtilization: [
            ...col.id('utilizationId'),
            ...col.col('resourceId', 'Resource'),
            ...col.col('projectId', 'Project'),
            ...col.date('periodStart', 'Period Start'),
            ...col.date('periodEnd', 'Period End'),
            ...col.col('capacityHours', 'Capacity Hours'),
            ...col.col('billableHours', 'Billable Hours'),
            ...col.col('nonBillableHours', 'Non-Billable'),
            ...col.col('totalHours', 'Total Hours'),
            ...col.col('utilizationPercent', 'Utilization %'),
            ...col.col('billableUtilizationPercent', 'Billable %')
        ]
    };

})();
