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
                ...f.select('frequency', 'Frequency', enums.auditFrequency),
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
                ...f.reference('departmentId', 'Audited Department', 'Department')
            ]),
            f.section('Scope', [
                ...f.textarea('scope', 'Audit Scope'),
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
                ...f.reference('ownerId', 'Finding Owner', 'Employee'),
                ...f.reference('controlId', 'Related Control', 'CompControl')
            ]),
            f.section('Dates', [
                ...f.date('identifiedDate', 'Identified Date'),
                ...f.date('targetRemediationDate', 'Target Remediation'),
                ...f.date('actualRemediationDate', 'Actual Remediation')
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
                ...f.select('priority', 'Priority', enums.remediationPriority),
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
                ...f.textarea('actionPlan', 'Action Plan'),
                ...f.textarea('evidence', 'Evidence of Completion')
            ])
        ]),

        CompAuditReport: f.form('Audit Report', [
            f.section('Report Information', [
                ...f.text('title', 'Title', true),
                ...f.reference('auditScheduleId', 'Audit', 'CompAuditSchedule'),
                ...f.select('reportType', 'Report Type', enums.reportType),
                ...f.select('status', 'Status', enums.reportStatus)
            ]),
            f.section('Dates', [
                ...f.date('issueDate', 'Issue Date'),
                ...f.date('responseDate', 'Response Due Date')
            ]),
            f.section('Content', [
                ...f.textarea('executiveSummary', 'Executive Summary'),
                ...f.textarea('scope', 'Scope'),
                ...f.textarea('conclusion', 'Conclusion')
            ])
        ]),

        CompComplianceReport: f.form('Compliance Report', [
            f.section('Report Information', [
                ...f.text('title', 'Title', true),
                ...f.select('reportType', 'Report Type', enums.reportType),
                ...f.select('status', 'Status', enums.reportStatus)
            ]),
            f.section('Period', [
                ...f.date('periodStartDate', 'Period Start Date'),
                ...f.date('periodEndDate', 'Period End Date'),
                ...f.date('generatedDate', 'Generated Date')
            ]),
            f.section('Ownership', [
                ...f.reference('preparedById', 'Prepared By', 'Employee'),
                ...f.reference('approvedById', 'Approved By', 'Employee')
            ]),
            f.section('Content', [
                ...f.textarea('executiveSummary', 'Executive Summary'),
                ...f.textarea('findings', 'Key Findings'),
                ...f.textarea('recommendations', 'Recommendations')
            ])
        ])
    };

    CompAudit.primaryKeys = {
        CompAuditSchedule: 'auditId',
        CompAuditFinding: 'findingId',
        CompRemediationAction: 'actionId',
        CompAuditReport: 'reportId',
        CompComplianceReport: 'reportId'
    };

})();
