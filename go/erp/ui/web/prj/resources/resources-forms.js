/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Projects Resources Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.PrjResources = window.PrjResources || {};

    const f = window.Layer8FormFactory;
    const enums = PrjResources.enums;

    PrjResources.forms = {
        PrjResourcePool: f.form('Resource Pool', [
            f.section('Pool Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('managerId', 'Manager', 'Employee'),
                ...f.reference('departmentId', 'Department', 'Department'),
                ...f.number('totalCapacityHours', 'Total Capacity Hours'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        PrjResource: f.form('Resource', [
            f.section('Resource Details', [
                ...f.text('name', 'Name', true),
                ...f.reference('poolId', 'Resource Pool', 'PrjResourcePool'),
                ...f.select('resourceType', 'Resource Type', enums.RESOURCE_TYPE, true),
                ...f.reference('employeeId', 'Employee', 'Employee'),
                ...f.text('jobTitle', 'Job Title'),
                ...f.money('hourlyCost', 'Hourly Cost'),
                ...f.money('billingRate', 'Billing Rate'),
                ...f.number('availabilityPercent', 'Availability %'),
                ...f.number('capacityHoursPerWeek', 'Capacity Hours/Week'),
                ...f.date('availableFrom', 'Available From'),
                ...f.date('availableUntil', 'Available Until'),
                ...f.text('location', 'Location'),
                ...f.text('timeZone', 'Time Zone'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        PrjResourceSkill: f.form('Resource Skill', [
            f.section('Skill Details', [
                ...f.reference('resourceId', 'Resource', 'PrjResource', true),
                ...f.text('skillName', 'Skill Name', true),
                ...f.text('skillCategory', 'Skill Category'),
                ...f.number('proficiencyLevel', 'Proficiency Level (1-5)', true),
                ...f.number('yearsExperience', 'Years Experience'),
                ...f.checkbox('isPrimary', 'Primary Skill'),
                ...f.date('certifiedDate', 'Certified Date'),
                ...f.date('certificationExpiry', 'Certification Expiry')
            ])
        ]),

        PrjAllocation: f.form('Resource Allocation', [
            f.section('Allocation Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.reference('resourceId', 'Resource', 'PrjResource', true),
                ...f.reference('taskId', 'Task', 'PrjTask'),
                ...f.reference('phaseId', 'Phase', 'PrjPhase'),
                ...f.select('status', 'Status', enums.ALLOCATION_STATUS),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.number('allocatedHours', 'Allocated Hours'),
                ...f.number('allocatedPercent', 'Allocation %'),
                ...f.money('billingRate', 'Billing Rate'),
                ...f.checkbox('isBillable', 'Billable'),
                ...f.text('role', 'Role'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        PrjBooking: f.form('Resource Booking', [
            f.section('Booking Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.reference('resourceId', 'Resource', 'PrjResource', true),
                ...f.reference('requestedBy', 'Requested By', 'Employee'),
                ...f.reference('approvedBy', 'Approved By', 'Employee'),
                ...f.select('status', 'Status', enums.BOOKING_STATUS),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.number('requestedHours', 'Requested Hours'),
                ...f.number('approvedHours', 'Approved Hours'),
                ...f.text('role', 'Role'),
                ...f.text('skillRequired', 'Skill Required'),
                ...f.date('requestedDate', 'Requested Date'),
                ...f.date('decisionDate', 'Decision Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        PrjCapacityPlan: f.form('Capacity Plan', [
            f.section('Plan Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('poolId', 'Resource Pool', 'PrjResourcePool'),
                ...f.date('periodStart', 'Period Start', true),
                ...f.date('periodEnd', 'Period End', true),
                ...f.number('totalCapacityHours', 'Total Capacity Hours'),
                ...f.number('allocatedHours', 'Allocated Hours'),
                ...f.number('availableHours', 'Available Hours'),
                ...f.number('utilizationTarget', 'Utilization Target %'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        PrjUtilization: f.form('Resource Utilization', [
            f.section('Utilization Details', [
                ...f.reference('resourceId', 'Resource', 'PrjResource', true),
                ...f.reference('projectId', 'Project', 'PrjProject'),
                ...f.date('periodStart', 'Period Start', true),
                ...f.date('periodEnd', 'Period End', true),
                ...f.number('capacityHours', 'Capacity Hours'),
                ...f.number('billableHours', 'Billable Hours'),
                ...f.number('nonBillableHours', 'Non-Billable Hours'),
                ...f.number('totalHours', 'Total Hours'),
                ...f.number('utilizationPercent', 'Utilization %'),
                ...f.number('billableUtilizationPercent', 'Billable Utilization %'),
                ...f.money('revenue', 'Revenue'),
                ...f.money('cost', 'Cost')
            ])
        ])
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
