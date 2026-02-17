/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompAudit = window.CompAudit || {};

    CompAudit.columns = {
        CompAuditSchedule: [
            { key: 'name', label: 'Name', width: '200px' },
            { key: 'auditType', label: 'Type', width: '100px' },
            { key: 'fiscalYear', label: 'Fiscal Year', width: '100px' },
            { key: 'plannedStartDate', label: 'Start Date', width: '100px', type: 'date' },
            { key: 'plannedEndDate', label: 'End Date', width: '100px', type: 'date' },
            { key: 'leadAuditorId', label: 'Lead Auditor', width: '150px', type: 'reference', referenceType: 'Employee' },
            { key: 'status', label: 'Status', width: '100px' }
        ],
        CompAuditFinding: [
            { key: 'findingNumber', label: 'Number', width: '100px' },
            { key: 'title', label: 'Title', width: '200px' },
            { key: 'auditScheduleId', label: 'Audit', width: '150px', type: 'reference', referenceType: 'CompAuditSchedule' },
            { key: 'severity', label: 'Severity', width: '100px' },
            { key: 'responsibleId', label: 'Responsible', width: '150px', type: 'reference', referenceType: 'Employee' },
            { key: 'status', label: 'Status', width: '100px' }
        ],
        CompComplianceReport: [
            { key: 'title', label: 'Title', width: '250px' },
            { key: 'reportType', label: 'Type', width: '120px' },
            { key: 'periodStart', label: 'Period Start', width: '100px', type: 'date' },
            { key: 'periodEnd', label: 'Period End', width: '100px', type: 'date' },
            { key: 'status', label: 'Status', width: '100px' }
        ]
    };

    CompAudit.primaryKeys = {
        CompAuditSchedule: 'scheduleId',
        CompAuditFinding: 'findingId',
        CompComplianceReport: 'reportId'
    };
})();
