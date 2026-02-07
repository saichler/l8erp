/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Compliance Audit Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.CompAudit = window.CompAudit || {};

    const f = window.Layer8FormFactory;
    const enums = CompAudit.enums;

    CompAudit.forms = {
        CompAuditSchedule: f.form('Audit Schedule', [
            f.section('Audit Information', [
                ...f.text('name', 'Name', true),
                ...f.select('auditType', 'Audit Type', enums.auditType, true),
                ...f.text('fiscalYear', 'Fiscal Year'),
                ...f.select('status', 'Status', enums.auditStatus)
            ]),
            f.section('Timeline', [
                ...f.date('plannedStartDate', 'Planned Start Date'),
                ...f.date('plannedEndDate', 'Planned End Date'),
                ...f.date('actualStartDate', 'Actual Start Date'),
                ...f.date('actualEndDate', 'Actual End Date')
            ]),
            f.section('Team', [
                ...f.reference('leadAuditorId', 'Lead Auditor', 'Employee'),
                ...f.text('auditFirm', 'Audit Firm')
            ]),
            f.section('Scope', [
                ...f.textarea('auditScope', 'Audit Scope'),
                ...f.textarea('objectives', 'Objectives')
            ])
        ]),

        CompAuditFinding: f.form('Audit Finding', [
            f.section('Finding Information', [
                ...f.text('findingNumber', 'Finding Number', true),
                ...f.text('title', 'Title', true),
                ...f.reference('auditScheduleId', 'Audit', 'CompAuditSchedule', true),
                ...f.select('severity', 'Severity', enums.findingSeverity, true),
                ...f.select('status', 'Status', enums.findingStatus)
            ]),
            f.section('Ownership', [
                ...f.reference('responsibleId', 'Responsible', 'Employee')
            ]),
            f.section('Dates', [
                ...f.date('discoveryDate', 'Discovery Date'),
                ...f.date('dueDate', 'Due Date'),
                ...f.date('closedDate', 'Closed Date')
            ]),
            f.section('Details', [
                ...f.textarea('description', 'Description'),
                ...f.textarea('rootCause', 'Root Cause'),
                ...f.textarea('recommendation', 'Recommendation'),
                ...f.textarea('managementResponse', 'Management Response')
            ])
        ]),

        CompRemediationAction: f.form('Remediation Action', [
            f.section('Action Information', [
                ...f.reference('findingId', 'Finding', 'CompAuditFinding', true),
                ...f.text('description', 'Description', true),
                ...f.text('actionNumber', 'Action Number'),
                ...f.select('status', 'Status', enums.remediationStatus)
            ]),
            f.section('Ownership', [
                ...f.reference('ownerId', 'Owner', 'Employee')
            ]),
            f.section('Timeline', [
                ...f.date('dueDate', 'Due Date'),
                ...f.date('completionDate', 'Completion Date'),
                ...f.date('verificationDate', 'Verification Date')
            ]),
            f.section('Details', [
                ...f.textarea('progressNotes', 'Progress Notes'),
                ...f.number('percentComplete', 'Percent Complete')
            ])
        ]),

        CompAuditReport: f.form('Audit Report', [
            f.section('Report Information', [
                ...f.text('title', 'Title', true),
                ...f.reference('auditScheduleId', 'Audit', 'CompAuditSchedule'),
                ...f.text('reportNumber', 'Report Number'),
                ...f.select('status', 'Status', enums.reportStatus)
            ]),
            f.section('Dates', [
                ...f.date('draftDate', 'Draft Date'),
                ...f.date('finalDate', 'Final Date')
            ]),
            f.section('Content', [
                ...f.textarea('executiveSummary', 'Executive Summary'),
                ...f.textarea('scopeDescription', 'Scope'),
                ...f.textarea('overallOpinion', 'Overall Opinion')
            ])
        ]),

        CompComplianceReport: f.form('Compliance Report', [
            f.section('Report Information', [
                ...f.text('title', 'Title', true),
                ...f.select('reportType', 'Report Type', enums.reportType),
                ...f.select('status', 'Status', enums.reportStatus)
            ]),
            f.section('Period', [
                ...f.date('periodStart', 'Period Start'),
                ...f.date('periodEnd', 'Period End'),
                ...f.date('reportDate', 'Report Date')
            ]),
            f.section('Ownership', [
                ...f.reference('preparedById', 'Prepared By', 'Employee'),
                ...f.reference('approvedById', 'Approved By', 'Employee')
            ]),
            f.section('Content', [
                ...f.textarea('executiveSummary', 'Executive Summary'),
                ...f.textarea('areasOfConcern', 'Areas of Concern'),
                ...f.textarea('recommendations', 'Recommendations')
            ])
        ])
    };

    CompAudit.primaryKeys = {
        CompAuditSchedule: 'scheduleId',
        CompAuditFinding: 'findingId',
        CompRemediationAction: 'actionId',
        CompAuditReport: 'reportId',
        CompComplianceReport: 'reportId'
    };

})();
