/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompAudit = window.CompAudit || {};
    const col = window.Layer8ColumnFactory;

    CompAudit.columns = {
        CompAuditSchedule: [
            ...col.col('name', 'Name'),
            ...col.col('auditType', 'Type'),
            ...col.col('fiscalYear', 'Fiscal Year'),
            ...col.date('plannedStartDate', 'Start Date'),
            ...col.date('plannedEndDate', 'End Date'),
            { key: 'leadAuditorId', label: 'Lead Auditor', width: '150px', type: 'reference', referenceType: 'Employee' },
            ...col.col('status', 'Status'),
        ],
        CompAuditFinding: [
            ...col.col('findingNumber', 'Number'),
            ...col.col('title', 'Title'),
            { key: 'auditScheduleId', label: 'Audit', width: '150px', type: 'reference', referenceType: 'CompAuditSchedule' },
            ...col.col('severity', 'Severity'),
            { key: 'responsibleId', label: 'Responsible', width: '150px', type: 'reference', referenceType: 'Employee' },
            ...col.col('status', 'Status'),
        ],
        CompComplianceReport: [
            ...col.col('title', 'Title'),
            ...col.col('reportType', 'Type'),
            ...col.date('periodStart', 'Period Start'),
            ...col.date('periodEnd', 'Period End'),
            ...col.col('status', 'Status'),
        ]
    };

    CompAudit.primaryKeys = {
        CompAuditSchedule: 'scheduleId',
        CompAuditFinding: 'findingId',
        CompComplianceReport: 'reportId'
    };
})();
