/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const enums = MobilePrjResources.enums;
    const render = MobilePrjResources.render;

    MobilePrjResources.columns = {
        PrjResourcePool: [
            { key: 'poolId', label: 'ID', sortKey: 'poolId', filterKey: 'poolId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'managerId', label: 'Manager', sortKey: 'managerId' },
            { key: 'departmentId', label: 'Department', sortKey: 'departmentId' },
            { key: 'totalCapacityHours', label: 'Capacity Hours', sortKey: 'totalCapacityHours' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        PrjResource: [
            { key: 'resourceId', label: 'ID', sortKey: 'resourceId', filterKey: 'resourceId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'poolId', label: 'Pool', sortKey: 'poolId' },
            { key: 'resourceType', label: 'Type', sortKey: 'resourceType', enumValues: enums.RESOURCE_TYPE_VALUES, render: (item) => render.resourceType(item.resourceType) },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId' },
            { key: 'jobTitle', label: 'Job Title', sortKey: 'jobTitle' },
            { key: 'billingRate', label: 'Billing Rate', sortKey: 'billingRate', render: (item) => Layer8MRenderers.renderMoney(item.billingRate) },
            { key: 'availabilityPercent', label: 'Availability %', sortKey: 'availabilityPercent' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        PrjResourceSkill: [
            { key: 'skillId', label: 'ID', sortKey: 'skillId', filterKey: 'skillId' },
            { key: 'resourceId', label: 'Resource', sortKey: 'resourceId', filterKey: 'resourceId' },
            { key: 'skillName', label: 'Skill Name', sortKey: 'skillName', filterKey: 'skillName' },
            { key: 'skillCategory', label: 'Category', sortKey: 'skillCategory' },
            { key: 'proficiencyLevel', label: 'Proficiency', sortKey: 'proficiencyLevel' },
            { key: 'yearsExperience', label: 'Years Exp', sortKey: 'yearsExperience' },
            { key: 'isPrimary', label: 'Primary', sortKey: 'isPrimary', render: (item) => item.isPrimary ? 'Yes' : 'No' },
            { key: 'certifiedDate', label: 'Certified', sortKey: 'certifiedDate', render: (item) => Layer8MRenderers.renderDate(item.certifiedDate) }
        ],

        PrjAllocation: [
            { key: 'allocationId', label: 'ID', sortKey: 'allocationId', filterKey: 'allocationId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'resourceId', label: 'Resource', sortKey: 'resourceId', filterKey: 'resourceId' },
            { key: 'status', label: 'Status', sortKey: 'status', enumValues: enums.ALLOCATION_STATUS_VALUES, render: (item) => render.allocationStatus(item.status) },
            { key: 'startDate', label: 'Start Date', sortKey: 'startDate', render: (item) => Layer8MRenderers.renderDate(item.startDate) },
            { key: 'endDate', label: 'End Date', sortKey: 'endDate', render: (item) => Layer8MRenderers.renderDate(item.endDate) },
            { key: 'allocatedHours', label: 'Allocated Hours', sortKey: 'allocatedHours' },
            { key: 'allocatedPercent', label: 'Allocation %', sortKey: 'allocatedPercent' },
            { key: 'isBillable', label: 'Billable', sortKey: 'isBillable', render: (item) => item.isBillable ? 'Yes' : 'No' }
        ],

        PrjBooking: [
            { key: 'bookingId', label: 'ID', sortKey: 'bookingId', filterKey: 'bookingId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId', filterKey: 'projectId' },
            { key: 'resourceId', label: 'Resource', sortKey: 'resourceId', filterKey: 'resourceId' },
            { key: 'status', label: 'Status', sortKey: 'status', enumValues: enums.BOOKING_STATUS_VALUES, render: (item) => render.bookingStatus(item.status) },
            { key: 'requestedBy', label: 'Requested By', sortKey: 'requestedBy' },
            { key: 'startDate', label: 'Start Date', sortKey: 'startDate', render: (item) => Layer8MRenderers.renderDate(item.startDate) },
            { key: 'endDate', label: 'End Date', sortKey: 'endDate', render: (item) => Layer8MRenderers.renderDate(item.endDate) },
            { key: 'requestedHours', label: 'Requested Hours', sortKey: 'requestedHours' },
            { key: 'approvedHours', label: 'Approved Hours', sortKey: 'approvedHours' }
        ],

        PrjCapacityPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'poolId', label: 'Pool', sortKey: 'poolId' },
            { key: 'periodStart', label: 'Period Start', sortKey: 'periodStart', render: (item) => Layer8MRenderers.renderDate(item.periodStart) },
            { key: 'periodEnd', label: 'Period End', sortKey: 'periodEnd', render: (item) => Layer8MRenderers.renderDate(item.periodEnd) },
            { key: 'totalCapacityHours', label: 'Capacity Hours', sortKey: 'totalCapacityHours' },
            { key: 'allocatedHours', label: 'Allocated Hours', sortKey: 'allocatedHours' },
            { key: 'availableHours', label: 'Available Hours', sortKey: 'availableHours' },
            { key: 'utilizationTarget', label: 'Target %', sortKey: 'utilizationTarget' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        PrjUtilization: [
            { key: 'utilizationId', label: 'ID', sortKey: 'utilizationId', filterKey: 'utilizationId' },
            { key: 'resourceId', label: 'Resource', sortKey: 'resourceId', filterKey: 'resourceId' },
            { key: 'projectId', label: 'Project', sortKey: 'projectId' },
            { key: 'periodStart', label: 'Period Start', sortKey: 'periodStart', render: (item) => Layer8MRenderers.renderDate(item.periodStart) },
            { key: 'periodEnd', label: 'Period End', sortKey: 'periodEnd', render: (item) => Layer8MRenderers.renderDate(item.periodEnd) },
            { key: 'capacityHours', label: 'Capacity Hours', sortKey: 'capacityHours' },
            { key: 'billableHours', label: 'Billable Hours', sortKey: 'billableHours' },
            { key: 'nonBillableHours', label: 'Non-Billable', sortKey: 'nonBillableHours' },
            { key: 'totalHours', label: 'Total Hours', sortKey: 'totalHours' },
            { key: 'utilizationPercent', label: 'Utilization %', sortKey: 'utilizationPercent' },
            { key: 'billableUtilizationPercent', label: 'Billable %', sortKey: 'billableUtilizationPercent' }
        ]
    };

    MobilePrjResources.primaryKeys = {
        PrjResourcePool: 'poolId', PrjResource: 'resourceId', PrjResourceSkill: 'skillId',
        PrjAllocation: 'allocationId', PrjBooking: 'bookingId',
        PrjCapacityPlan: 'planId', PrjUtilization: 'utilizationId'
    };

})();
