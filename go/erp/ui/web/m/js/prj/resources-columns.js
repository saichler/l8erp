/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobilePrjResources.enums;
    const render = MobilePrjResources.render;

    MobilePrjResources.columns = {
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
            ...col.status('resourceType', 'Type', enums.RESOURCE_TYPE_VALUES, render.resourceType),
            ...col.col('employeeId', 'Employee'),
            ...col.col('jobTitle', 'Job Title'),
            ...col.money('billingRate', 'Billing Rate'),
            ...col.col('availabilityPercent', 'Availability %'),
            ...col.boolean('isActive', 'Active')
        ],

        PrjResourceSkill: [
            ...col.id('skillId'),
            ...col.col('resourceId', 'Resource'),
            ...col.col('skillName', 'Skill Name'),
            ...col.col('skillCategory', 'Category'),
            ...col.col('proficiencyLevel', 'Proficiency'),
            ...col.col('yearsExperience', 'Years Exp'),
            ...col.boolean('isPrimary', 'Primary'),
            ...col.date('certifiedDate', 'Certified')
        ],

        PrjAllocation: [
            ...col.id('allocationId'),
            ...col.col('projectId', 'Project'),
            ...col.col('resourceId', 'Resource'),
            ...col.status('status', 'Status', enums.ALLOCATION_STATUS_VALUES, render.allocationStatus),
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
            ...col.status('status', 'Status', enums.BOOKING_STATUS_VALUES, render.bookingStatus),
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

    MobilePrjResources.primaryKeys = {
        PrjResourcePool: 'poolId', PrjResource: 'resourceId', PrjResourceSkill: 'skillId',
        PrjAllocation: 'allocationId', PrjBooking: 'bookingId',
        PrjCapacityPlan: 'planId', PrjUtilization: 'utilizationId'
    };

})();
