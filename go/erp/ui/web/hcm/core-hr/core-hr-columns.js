/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Core HR Module - Column Configurations
// Uses Layer8ColumnFactory for reduced boilerplate

(function() {
    'use strict';

    window.CoreHR = window.CoreHR || {};

    const col = window.Layer8ColumnFactory;
    const { escapeHtml } = Layer8DUtils;
    const { renderBoolean } = Layer8DRenderers;
    const enums = CoreHR.enums;
    const render = CoreHR.render;

    CoreHR.columns = {
        Employee: [
            ...col.id('employeeId'),
            ...col.col('employeeNumber', 'Emp #'),
            ...col.custom('name', 'Name', (item) => {
                const name = `${item.firstName || ''} ${item.lastName || ''}`.trim();
                return `<a href="#" class="emp-name-link" onclick="EmployeeDetail.open('${item.employeeId}'); return false;">${escapeHtml(name)}</a>`;
            }, { sortKey: 'lastName', filterKey: 'lastName' }),
            ...col.status('employmentStatus', 'Status', enums.EMPLOYMENT_STATUS_VALUES, render.employmentStatus),
            ...col.status('employmentType', 'Type', enums.EMPLOYMENT_TYPE_VALUES, render.employmentType),
            ...col.date('hireDate', 'Hire Date')
        ],

        Organization: [
            ...col.id('organizationId'),
            ...col.basic(['code', 'name']),
            ...col.status('organizationType', 'Type', enums.ORGANIZATION_TYPE_VALUES, render.orgType),
            ...col.col('legalName', 'Legal Name'),
            ...col.boolean('isActive', 'Active')
        ],

        Department: [
            ...col.id('departmentId'),
            ...col.basic(['code', 'name', 'description']),
            ...col.col('managerId', 'Manager ID'),
            ...col.boolean('isActive', 'Active')
        ],

        Position: [
            ...col.id('positionId'),
            ...col.col('positionCode', 'Code'),
            ...col.col('title', 'Title'),
            ...col.col('departmentId', 'Dept ID'),
            ...col.status('status', 'Status', enums.POSITION_STATUS_VALUES, render.positionStatus),
            ...col.custom('headcount', 'Headcount', (item) => `${item.filledCount || 0}/${item.headcount || 0}`),
            ...col.boolean('isManager', 'Manager')
        ],

        Job: [
            ...col.id('jobId'),
            ...col.col('jobCode', 'Code'),
            ...col.col('title', 'Title'),
            ...col.col('jobFamilyId', 'Family'),
            ...col.col('jobLevel', 'Level'),
            ...col.boolean('isFlsaExempt', 'FLSA Exempt', { trueText: 'Exempt', falseText: 'Non-Exempt' }),
            ...col.boolean('isActive', 'Active')
        ],

        JobFamily: [
            ...col.id('jobFamilyId'),
            ...col.basic(['code', 'name', 'description']),
            ...col.boolean('isActive', 'Active')
        ],

        EmployeeDocument: [
            ...col.id('documentId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('name', 'Name'),
            ...col.enum('documentType', 'Type', null, render.documentType),
            ...col.date('uploadDate', 'Uploaded'),
            ...col.date('expirationDate', 'Expires'),
            ...col.boolean('isVerified', 'Verified')
        ],

        ComplianceRecord: [
            ...col.id('recordId'),
            ...col.col('employeeId', 'Employee'),
            ...col.enum('complianceType', 'Type', null, render.complianceType),
            ...col.col('status', 'Status'),
            ...col.date('dueDate', 'Due Date'),
            ...col.date('completionDate', 'Completed'),
            ...col.date('expirationDate', 'Expires')
        ]
    };

})();
