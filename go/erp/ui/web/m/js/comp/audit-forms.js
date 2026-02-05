/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
 * Mobile COMP Audit Module - Form Configurations
 * Desktop Equivalent: comp/audit/audit-forms.js
 */
(function() {
    'use strict';

    const enums = MobileCompAudit.enums;

    MobileCompAudit.forms = {
        CompAuditSchedule: {
            title: 'Audit Schedule',
            sections: [
                {
                    title: 'Audit Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'auditType', label: 'Audit Type', type: 'select', options: enums.AUDIT_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.AUDIT_STATUS },
                        { key: 'fiscalYear', label: 'Fiscal Year', type: 'number' }
                    ]
                },
                {
                    title: 'Schedule',
                    fields: [
                        { key: 'plannedStartDate', label: 'Planned Start Date', type: 'date' },
                        { key: 'plannedEndDate', label: 'Planned End Date', type: 'date' },
                        { key: 'actualStartDate', label: 'Actual Start Date', type: 'date' },
                        { key: 'actualEndDate', label: 'Actual End Date', type: 'date' }
                    ]
                },
                {
                    title: 'Audit Team',
                    fields: [
                        { key: 'leadAuditorId', label: 'Lead Auditor', type: 'reference', lookupModel: 'Employee' },
                        { key: 'auditFirm', label: 'Audit Firm', type: 'text' },
                        { key: 'scope', label: 'Scope', type: 'textarea' },
                        { key: 'objectives', label: 'Objectives', type: 'textarea' }
                    ]
                }
            ]
        },

        CompAuditFinding: {
            title: 'Audit Finding',
            sections: [
                {
                    title: 'Finding Details',
                    fields: [
                        { key: 'findingNumber', label: 'Finding Number', type: 'text' },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'auditScheduleId', label: 'Audit', type: 'reference', lookupModel: 'CompAuditSchedule', required: true },
                        { key: 'severity', label: 'Severity', type: 'select', options: enums.SEVERITY_LEVEL },
                        { key: 'status', label: 'Status', type: 'select', options: enums.FINDING_STATUS }
                    ]
                },
                {
                    title: 'Timeline',
                    fields: [
                        { key: 'discoveryDate', label: 'Discovery Date', type: 'date' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'closedDate', label: 'Closed Date', type: 'date' }
                    ]
                },
                {
                    title: 'Details & Assignment',
                    fields: [
                        { key: 'responsibleId', label: 'Responsible', type: 'reference', lookupModel: 'Employee' },
                        { key: 'rootCause', label: 'Root Cause', type: 'textarea' },
                        { key: 'recommendation', label: 'Recommendation', type: 'textarea' },
                        { key: 'managementResponse', label: 'Management Response', type: 'textarea' },
                        { key: 'repeatFinding', label: 'Repeat Finding', type: 'checkbox' }
                    ]
                }
            ]
        },

        CompRemediationAction: {
            title: 'Remediation Action',
            sections: [
                {
                    title: 'Action Details',
                    fields: [
                        { key: 'actionNumber', label: 'Action Number', type: 'text' },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'findingId', label: 'Finding', type: 'reference', lookupModel: 'CompAuditFinding', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.REMEDIATION_STATUS }
                    ]
                },
                {
                    title: 'Timeline',
                    fields: [
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'completedDate', label: 'Completed Date', type: 'date' },
                        { key: 'verifiedDate', label: 'Verified Date', type: 'date' }
                    ]
                },
                {
                    title: 'Progress & Ownership',
                    fields: [
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'percentComplete', label: 'Percent Complete', type: 'number' },
                        { key: 'isOverdue', label: 'Overdue', type: 'checkbox' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        CompAuditReport: {
            title: 'Audit Report',
            sections: [
                {
                    title: 'Report Details',
                    fields: [
                        { key: 'reportNumber', label: 'Report Number', type: 'text' },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'auditScheduleId', label: 'Audit', type: 'reference', lookupModel: 'CompAuditSchedule', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.AUDIT_STATUS },
                        { key: 'overallOpinion', label: 'Overall Opinion', type: 'text' }
                    ]
                },
                {
                    title: 'Findings Summary',
                    fields: [
                        { key: 'findingsCritical', label: 'Critical Findings', type: 'number' },
                        { key: 'findingsHigh', label: 'High Findings', type: 'number' },
                        { key: 'findingsMedium', label: 'Medium Findings', type: 'number' },
                        { key: 'findingsLow', label: 'Low Findings', type: 'number' }
                    ]
                },
                {
                    title: 'Dates & Content',
                    fields: [
                        { key: 'draftDate', label: 'Draft Date', type: 'date' },
                        { key: 'finalDate', label: 'Final Date', type: 'date' },
                        { key: 'executiveSummary', label: 'Executive Summary', type: 'textarea' }
                    ]
                }
            ]
        },

        CompComplianceReport: {
            title: 'Compliance Report',
            sections: [
                {
                    title: 'Report Details',
                    fields: [
                        { key: 'reportNumber', label: 'Report Number', type: 'text' },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'reportType', label: 'Report Type', type: 'text' },
                        { key: 'status', label: 'Status', type: 'text' }
                    ]
                },
                {
                    title: 'Period & Metrics',
                    fields: [
                        { key: 'periodStart', label: 'Period Start', type: 'date' },
                        { key: 'periodEnd', label: 'Period End', type: 'date' },
                        { key: 'overallComplianceRate', label: 'Overall Compliance Rate (%)', type: 'number' },
                        { key: 'openFindings', label: 'Open Findings', type: 'number' },
                        { key: 'closedFindings', label: 'Closed Findings', type: 'number' }
                    ]
                },
                {
                    title: 'Report Information',
                    fields: [
                        { key: 'reportDate', label: 'Report Date', type: 'date' },
                        { key: 'preparedById', label: 'Prepared By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'executiveSummary', label: 'Executive Summary', type: 'textarea' }
                    ]
                }
            ]
        }
    };

})();
