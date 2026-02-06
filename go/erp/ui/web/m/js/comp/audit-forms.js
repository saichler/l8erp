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
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile COMP Audit Module - Form Configurations
 * Desktop Equivalent: comp/audit/audit-forms.js
 */
(function() {
    'use strict';

    window.MobileCompAudit = window.MobileCompAudit || {};
    const f = window.Layer8FormFactory;
    const enums = MobileCompAudit.enums;

    MobileCompAudit.forms = {
        CompAuditSchedule: f.form('Audit Schedule', [
            f.section('Audit Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('auditType', 'Audit Type', enums.AUDIT_TYPE),
                ...f.select('status', 'Status', enums.AUDIT_STATUS),
                ...f.number('fiscalYear', 'Fiscal Year')
            ]),
            f.section('Schedule', [
                ...f.date('plannedStartDate', 'Planned Start Date'),
                ...f.date('plannedEndDate', 'Planned End Date'),
                ...f.date('actualStartDate', 'Actual Start Date'),
                ...f.date('actualEndDate', 'Actual End Date')
            ]),
            f.section('Audit Team', [
                ...f.reference('leadAuditorId', 'Lead Auditor', 'Employee'),
                ...f.text('auditFirm', 'Audit Firm'),
                ...f.textarea('scope', 'Scope'),
                ...f.textarea('objectives', 'Objectives')
            ])
        ]),

        CompAuditFinding: f.form('Audit Finding', [
            f.section('Finding Details', [
                ...f.text('findingNumber', 'Finding Number'),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('auditScheduleId', 'Audit', 'CompAuditSchedule', true),
                ...f.select('severity', 'Severity', enums.SEVERITY_LEVEL),
                ...f.select('status', 'Status', enums.FINDING_STATUS)
            ]),
            f.section('Timeline', [
                ...f.date('discoveryDate', 'Discovery Date'),
                ...f.date('dueDate', 'Due Date'),
                ...f.date('closedDate', 'Closed Date')
            ]),
            f.section('Details & Assignment', [
                ...f.reference('responsibleId', 'Responsible', 'Employee'),
                ...f.textarea('rootCause', 'Root Cause'),
                ...f.textarea('recommendation', 'Recommendation'),
                ...f.textarea('managementResponse', 'Management Response'),
                ...f.checkbox('repeatFinding', 'Repeat Finding')
            ])
        ]),

        CompRemediationAction: f.form('Remediation Action', [
            f.section('Action Details', [
                ...f.text('actionNumber', 'Action Number'),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('findingId', 'Finding', 'CompAuditFinding', true),
                ...f.select('status', 'Status', enums.REMEDIATION_STATUS)
            ]),
            f.section('Timeline', [
                ...f.date('dueDate', 'Due Date'),
                ...f.date('completedDate', 'Completed Date'),
                ...f.date('verifiedDate', 'Verified Date')
            ]),
            f.section('Progress & Ownership', [
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.number('percentComplete', 'Percent Complete'),
                ...f.checkbox('isOverdue', 'Overdue'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        CompAuditReport: f.form('Audit Report', [
            f.section('Report Details', [
                ...f.text('reportNumber', 'Report Number'),
                ...f.text('title', 'Title', true),
                ...f.reference('auditScheduleId', 'Audit', 'CompAuditSchedule', true),
                ...f.select('status', 'Status', enums.AUDIT_STATUS),
                ...f.text('overallOpinion', 'Overall Opinion')
            ]),
            f.section('Findings Summary', [
                ...f.number('findingsCritical', 'Critical Findings'),
                ...f.number('findingsHigh', 'High Findings'),
                ...f.number('findingsMedium', 'Medium Findings'),
                ...f.number('findingsLow', 'Low Findings')
            ]),
            f.section('Dates & Content', [
                ...f.date('draftDate', 'Draft Date'),
                ...f.date('finalDate', 'Final Date'),
                ...f.textarea('executiveSummary', 'Executive Summary')
            ])
        ]),

        CompComplianceReport: f.form('Compliance Report', [
            f.section('Report Details', [
                ...f.text('reportNumber', 'Report Number'),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.text('reportType', 'Report Type'),
                ...f.text('status', 'Status')
            ]),
            f.section('Period & Metrics', [
                ...f.date('periodStart', 'Period Start'),
                ...f.date('periodEnd', 'Period End'),
                ...f.number('overallComplianceRate', 'Overall Compliance Rate (%)'),
                ...f.number('openFindings', 'Open Findings'),
                ...f.number('closedFindings', 'Closed Findings')
            ]),
            f.section('Report Information', [
                ...f.date('reportDate', 'Report Date'),
                ...f.reference('preparedById', 'Prepared By', 'Employee'),
                ...f.textarea('executiveSummary', 'Executive Summary')
            ])
        ])
    };

})();
