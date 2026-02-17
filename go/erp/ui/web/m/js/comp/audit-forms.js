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
                ...f.textarea('auditScope', 'Audit Scope')
            ]),
            f.section('Audit Reports', [
                ...f.inlineTable('reports', 'Audit Reports', [
                    { key: 'reportId', label: 'ID', hidden: true },
                    { key: 'reportNumber', label: 'Number', type: 'text' },
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.AUDIT_STATUS },
                    { key: 'overallOpinion', label: 'Opinion', type: 'text' },
                    { key: 'draftDate', label: 'Draft Date', type: 'date' },
                    { key: 'finalDate', label: 'Final Date', type: 'date' }
                ])
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
                ...f.textarea('cause', 'Root Cause'),
                ...f.textarea('recommendation', 'Recommendation'),
                ...f.textarea('managementResponse', 'Management Response'),
                ...f.checkbox('repeatFinding', 'Repeat Finding')
            ]),
            f.section('Remediation Actions', [
                ...f.inlineTable('actions', 'Remediation Actions', [
                    { key: 'actionId', label: 'ID', hidden: true },
                    { key: 'actionNumber', label: 'Number', type: 'text' },
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.REMEDIATION_STATUS },
                    { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                    { key: 'dueDate', label: 'Due Date', type: 'date' },
                    { key: 'percentComplete', label: '% Complete', type: 'number' }
                ])
            ])
        ]),

        CompComplianceReport: f.form('Compliance Report', [
            f.section('Report Details', [
                ...f.text('reportNumber', 'Report Number'),
                ...f.text('title', 'Title', true),
                ...f.text('reportType', 'Report Type'),
                ...f.reference('regulationId', 'Regulation', 'CompRegulation'),
                ...f.text('status', 'Status')
            ]),
            f.section('Period & Metrics', [
                ...f.date('periodStart', 'Period Start'),
                ...f.date('periodEnd', 'Period End'),
                ...f.number('overallComplianceRate', 'Overall Compliance Rate (%)'),
                ...f.number('openFindings', 'Open Findings'),
                ...f.number('overdueRemediations', 'Overdue Remediations')
            ]),
            f.section('Report Information', [
                ...f.date('reportDate', 'Report Date'),
                ...f.reference('preparedById', 'Prepared By', 'Employee'),
                ...f.textarea('executiveSummary', 'Executive Summary')
            ])
        ])
    };

})();
