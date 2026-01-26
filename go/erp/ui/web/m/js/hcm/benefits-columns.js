/**
 * Mobile Benefits Module - Column Configurations
 * Desktop Equivalent: hcm/benefits/benefits-columns.js
 */
(function() {
    'use strict';

    const enums = MobileBenefits.enums;
    const render = MobileBenefits.render;

    MobileBenefits.columns = {
        BenefitPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'planType', label: 'Type', sortKey: 'planType', filterKey: 'planType', enumValues: enums.BENEFIT_PLAN_TYPE_VALUES, render: (item) => render.benefitPlanType(item.planType) },
            { key: 'category', label: 'Category', sortKey: 'category', filterKey: 'category', enumValues: enums.BENEFIT_PLAN_CATEGORY_VALUES, render: (item) => render.benefitPlanCategory(item.category) },
            { key: 'planYear', label: 'Year', sortKey: 'planYear', filterKey: 'planYear' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => MobileRenderers.renderBoolean(item.isActive) }
        ],

        BenefitEnrollment: [
            { key: 'enrollmentId', label: 'ID', sortKey: 'enrollmentId', filterKey: 'enrollmentId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'planId', label: 'Plan', sortKey: 'planId', filterKey: 'planId' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.ENROLLMENT_STATUS_VALUES, render: (item) => render.enrollmentStatus(item.status) },
            { key: 'reason', label: 'Reason', sortKey: 'reason', filterKey: 'reason', enumValues: enums.ENROLLMENT_REASON_VALUES, render: (item) => render.enrollmentReason(item.reason) },
            { key: 'coverageStartDate', label: 'Coverage Start', sortKey: 'coverageStartDate', render: (item) => MobileRenderers.renderDate(item.coverageStartDate) },
            { key: 'employeeCostPerPeriod', label: 'Employee Cost', sortKey: 'employeeCostPerPeriod', render: (item) => MobileRenderers.renderMoney(item.employeeCostPerPeriod) }
        ],

        Carrier: [
            { key: 'carrierId', label: 'ID', sortKey: 'carrierId', filterKey: 'carrierId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'carrierType', label: 'Type', sortKey: 'carrierType', filterKey: 'carrierType', enumValues: enums.CARRIER_TYPE_VALUES, render: (item) => render.carrierType(item.carrierType) },
            { key: 'phone', label: 'Phone', sortKey: 'phone', filterKey: 'phone' },
            { key: 'website', label: 'Website', sortKey: 'website', filterKey: 'website' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => MobileRenderers.renderBoolean(item.isActive) }
        ],

        Dependent: [
            { key: 'dependentId', label: 'ID', sortKey: 'dependentId', filterKey: 'dependentId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'name', label: 'Name', sortKey: 'lastName', filterKey: 'lastName', render: (item) => `${MobileUtils.escapeHtml(item.firstName || '')} ${MobileUtils.escapeHtml(item.lastName || '')}`.trim() },
            { key: 'relationship', label: 'Relationship', sortKey: 'relationship', filterKey: 'relationship', enumValues: enums.DEPENDENT_RELATIONSHIP_VALUES, render: (item) => render.dependentRelationship(item.relationship) },
            { key: 'dateOfBirth', label: 'Date of Birth', sortKey: 'dateOfBirth', render: (item) => MobileRenderers.renderDate(item.dateOfBirth) },
            { key: 'verificationStatus', label: 'Verified', sortKey: 'verificationStatus', filterKey: 'verificationStatus', enumValues: enums.VERIFICATION_STATUS_VALUES, render: (item) => render.verificationStatus(item.verificationStatus) }
        ],

        LifeEvent: [
            { key: 'lifeEventId', label: 'ID', sortKey: 'lifeEventId', filterKey: 'lifeEventId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'eventType', label: 'Event Type', sortKey: 'eventType', filterKey: 'eventType', enumValues: enums.LIFE_EVENT_TYPE_VALUES, render: (item) => render.lifeEventType(item.eventType) },
            { key: 'eventDate', label: 'Event Date', sortKey: 'eventDate', render: (item) => MobileRenderers.renderDate(item.eventDate) },
            { key: 'enrollmentDeadline', label: 'Deadline', sortKey: 'enrollmentDeadline', render: (item) => MobileRenderers.renderDate(item.enrollmentDeadline) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.LIFE_EVENT_STATUS_VALUES, render: (item) => render.lifeEventStatus(item.status) }
        ],

        COBRAEvent: [
            { key: 'cobraEventId', label: 'ID', sortKey: 'cobraEventId', filterKey: 'cobraEventId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'eventType', label: 'Event Type', sortKey: 'eventType', filterKey: 'eventType', enumValues: enums.COBRA_EVENT_TYPE_VALUES, render: (item) => render.cobraEventType(item.eventType) },
            { key: 'qualifyingEventDate', label: 'Event Date', sortKey: 'qualifyingEventDate', render: (item) => MobileRenderers.renderDate(item.qualifyingEventDate) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.COBRA_STATUS_VALUES, render: (item) => render.cobraStatus(item.status) },
            { key: 'coverageMonths', label: 'Months', sortKey: 'coverageMonths' },
            { key: 'totalMonthlyCost', label: 'Monthly Cost', sortKey: 'totalMonthlyCost', render: (item) => MobileRenderers.renderMoney(item.totalMonthlyCost) }
        ]
    };

    MobileBenefits.primaryKeys = {
        BenefitPlan: 'planId', BenefitEnrollment: 'enrollmentId', Carrier: 'carrierId',
        Dependent: 'dependentId', LifeEvent: 'lifeEventId', COBRAEvent: 'cobraEventId'
    };

})();
