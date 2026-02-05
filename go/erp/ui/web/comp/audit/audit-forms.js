/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompAudit = window.CompAudit || {};

    CompAudit.forms = {
        CompAuditSchedule: {
            sections: [
                {
                    title: 'Audit Information',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'auditType', label: 'Audit Type', type: 'select', options: 'auditType', required: true },
                        { key: 'frequency', label: 'Frequency', type: 'select', options: 'auditFrequency' },
                        { key: 'status', label: 'Status', type: 'select', options: 'auditStatus' }
                    ]
                },
                {
                    title: 'Timeline',
                    fields: [
                        { key: 'plannedStartDate', label: 'Planned Start Date', type: 'date' },
                        { key: 'plannedEndDate', label: 'Planned End Date', type: 'date' },
                        { key: 'actualStartDate', label: 'Actual Start Date', type: 'date' },
                        { key: 'actualEndDate', label: 'Actual End Date', type: 'date' }
                    ]
                },
                {
                    title: 'Team',
                    fields: [
                        { key: 'leadAuditorId', label: 'Lead Auditor', type: 'reference', lookupModel: 'Employee' },
                        { key: 'departmentId', label: 'Audited Department', type: 'reference', lookupModel: 'Department' }
                    ]
                },
                {
                    title: 'Scope',
                    fields: [
                        { key: 'scope', label: 'Audit Scope', type: 'textarea' },
                        { key: 'objectives', label: 'Objectives', type: 'textarea' }
                    ]
                }
            ]
        },
        CompAuditFinding: {
            sections: [
                {
                    title: 'Finding Information',
                    fields: [
                        { key: 'findingNumber', label: 'Finding Number', type: 'text', required: true },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'auditScheduleId', label: 'Audit', type: 'reference', lookupModel: 'CompAuditSchedule', required: true },
                        { key: 'severity', label: 'Severity', type: 'select', options: 'findingSeverity', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: 'findingStatus' }
                    ]
                },
                {
                    title: 'Ownership',
                    fields: [
                        { key: 'ownerId', label: 'Finding Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'controlId', label: 'Related Control', type: 'reference', lookupModel: 'CompControl' }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'identifiedDate', label: 'Identified Date', type: 'date' },
                        { key: 'targetRemediationDate', label: 'Target Remediation', type: 'date' },
                        { key: 'actualRemediationDate', label: 'Actual Remediation', type: 'date' }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'rootCause', label: 'Root Cause', type: 'textarea' },
                        { key: 'recommendation', label: 'Recommendation', type: 'textarea' },
                        { key: 'managementResponse', label: 'Management Response', type: 'textarea' }
                    ]
                }
            ]
        },
        CompRemediationAction: {
            sections: [
                {
                    title: 'Action Information',
                    fields: [
                        { key: 'findingId', label: 'Finding', type: 'reference', lookupModel: 'CompAuditFinding', required: true },
                        { key: 'description', label: 'Description', type: 'text', required: true },
                        { key: 'priority', label: 'Priority', type: 'select', options: 'remediationPriority' },
                        { key: 'status', label: 'Status', type: 'select', options: 'remediationStatus' }
                    ]
                },
                {
                    title: 'Ownership',
                    fields: [
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Timeline',
                    fields: [
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'completionDate', label: 'Completion Date', type: 'date' },
                        { key: 'verificationDate', label: 'Verification Date', type: 'date' }
                    ]
                },
                {
                    title: 'Details',
                    fields: [
                        { key: 'actionPlan', label: 'Action Plan', type: 'textarea' },
                        { key: 'evidence', label: 'Evidence of Completion', type: 'textarea' }
                    ]
                }
            ]
        },
        CompAuditReport: {
            sections: [
                {
                    title: 'Report Information',
                    fields: [
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'auditScheduleId', label: 'Audit', type: 'reference', lookupModel: 'CompAuditSchedule' },
                        { key: 'reportType', label: 'Report Type', type: 'select', options: 'reportType' },
                        { key: 'status', label: 'Status', type: 'select', options: 'reportStatus' }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'issueDate', label: 'Issue Date', type: 'date' },
                        { key: 'responseDate', label: 'Response Due Date', type: 'date' }
                    ]
                },
                {
                    title: 'Content',
                    fields: [
                        { key: 'executiveSummary', label: 'Executive Summary', type: 'textarea' },
                        { key: 'scope', label: 'Scope', type: 'textarea' },
                        { key: 'conclusion', label: 'Conclusion', type: 'textarea' }
                    ]
                }
            ]
        },
        CompComplianceReport: {
            sections: [
                {
                    title: 'Report Information',
                    fields: [
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'reportType', label: 'Report Type', type: 'select', options: 'reportType' },
                        { key: 'status', label: 'Status', type: 'select', options: 'reportStatus' }
                    ]
                },
                {
                    title: 'Period',
                    fields: [
                        { key: 'periodStartDate', label: 'Period Start Date', type: 'date' },
                        { key: 'periodEndDate', label: 'Period End Date', type: 'date' },
                        { key: 'generatedDate', label: 'Generated Date', type: 'date' }
                    ]
                },
                {
                    title: 'Ownership',
                    fields: [
                        { key: 'preparedById', label: 'Prepared By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'approvedById', label: 'Approved By', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Content',
                    fields: [
                        { key: 'executiveSummary', label: 'Executive Summary', type: 'textarea' },
                        { key: 'findings', label: 'Key Findings', type: 'textarea' },
                        { key: 'recommendations', label: 'Recommendations', type: 'textarea' }
                    ]
                }
            ]
        }
    };
})();
