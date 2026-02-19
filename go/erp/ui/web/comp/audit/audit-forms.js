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
                ...f.select('status', 'Status', enums.auditStatus),
                ...f.text('description', 'Description'),
                ...f.text('departments', 'Departments'),
                ...f.text('processes', 'Processes'),
                ...f.text('auditorIds', 'Auditor Ids'),
                ...f.money('budget', 'Budget'),
                ...f.money('actualCost', 'Actual Cost'),
                ...f.text('auditPlanDocumentId', 'Audit Plan Document'),
                ...f.text('relatedRegulationIds', 'Related Regulation Ids'),
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
            ]),
            f.section('Audit Reports', [
                ...f.inlineTable('reports', 'Audit Reports', [
                    { key: 'reportId', label: 'ID', hidden: true },
                    { key: 'reportNumber', label: 'Number', type: 'text' },
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.auditStatus },
                    { key: 'overallOpinion', label: 'Opinion', type: 'text' },
                    { key: 'draftDate', label: 'Draft Date', type: 'date' },
                    { key: 'finalDate', label: 'Final Date', type: 'date' }
                ])
            ])
        ]),

        CompAuditFinding: f.form('Audit Finding', [
            f.section('Finding Information', [
                ...f.text('findingNumber', 'Finding Number', true),
                ...f.text('title', 'Title', true),
                ...f.reference('auditScheduleId', 'Audit', 'CompAuditSchedule', true),
                ...f.select('severity', 'Severity', enums.findingSeverity, true),
                ...f.select('status', 'Status', enums.findingStatus),
                ...f.text('condition', 'Condition'),
                ...f.text('criteria', 'Criteria'),
                ...f.text('cause', 'Cause'),
                ...f.text('effect', 'Effect'),
                ...f.text('relatedControlIds', 'Related Control Ids'),
                ...f.text('relatedRequirementIds', 'Related Requirement Ids'),
                ...f.text('evidenceDocumentId', 'Evidence Document'),
                ...f.checkbox('repeatFinding', 'Repeat Finding'),
                ...f.text('priorFindingId', 'Prior Finding'),
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
            ]),
            f.section('Remediation Actions', [
                ...f.inlineTable('actions', 'Remediation Actions', [
                    { key: 'actionId', label: 'ID', hidden: true },
                    { key: 'actionNumber', label: 'Number', type: 'text' },
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.remediationStatus },
                    { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                    { key: 'dueDate', label: 'Due Date', type: 'date' },
                    { key: 'percentComplete', label: '% Complete', type: 'number' }
                ])
            ])
        ]),

        CompComplianceReport: f.form('Compliance Report', [
            f.section('Report Information', [
                ...f.text('title', 'Title', true),
                ...f.select('reportType', 'Report Type', enums.reportType),
                ...f.select('status', 'Status', enums.reportStatus),
                ...f.text('reportNumber', 'Report Number'),
                ...f.text('regulationId', 'Regulation'),
                ...f.number('overallComplianceRate', 'Overall Compliance Rate'),
                ...f.number('requirementsTotal', 'Requirements Total'),
                ...f.number('requirementsCompliant', 'Requirements Compliant'),
                ...f.number('requirementsPartial', 'Requirements Partial'),
                ...f.number('requirementsNonCompliant', 'Requirements Non Compliant'),
                ...f.number('openViolations', 'Open Violations'),
                ...f.number('openFindings', 'Open Findings'),
                ...f.number('overdueRemediations', 'Overdue Remediations'),
                ...f.text('keyAchievements', 'Key Achievements'),
                ...f.text('reportDocumentId', 'Report Document'),
                ...f.text('distributionList', 'Distribution List'),
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
        CompComplianceReport: 'reportId'
    };

})();
