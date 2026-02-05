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
 * Mobile COMP Audit Module - Column Configurations
 * Desktop Equivalent: comp/audit/audit-columns.js
 */
(function() {
    'use strict';

    const enums = MobileCompAudit.enums;
    const render = MobileCompAudit.render;

    MobileCompAudit.columns = {
        CompAuditSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'auditType', label: 'Type', sortKey: 'auditType', filterKey: 'auditType', enumValues: enums.AUDIT_TYPE_VALUES, render: (item) => render.auditType(item.auditType) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.AUDIT_STATUS_VALUES, render: (item) => render.auditStatus(item.status) },
            { key: 'fiscalYear', label: 'Fiscal Year', sortKey: 'fiscalYear' },
            { key: 'plannedStartDate', label: 'Planned Start', sortKey: 'plannedStartDate', render: (item) => render.date(item.plannedStartDate) },
            { key: 'plannedEndDate', label: 'Planned End', sortKey: 'plannedEndDate', render: (item) => render.date(item.plannedEndDate) },
            { key: 'leadAuditorId', label: 'Lead Auditor', sortKey: 'leadAuditorId' },
            { key: 'auditFirm', label: 'Audit Firm', sortKey: 'auditFirm' }
        ],

        CompAuditFinding: [
            { key: 'findingId', label: 'ID', sortKey: 'findingId', filterKey: 'findingId' },
            { key: 'findingNumber', label: 'Number', sortKey: 'findingNumber', filterKey: 'findingNumber' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'auditScheduleId', label: 'Audit', sortKey: 'auditScheduleId', filterKey: 'auditScheduleId' },
            { key: 'severity', label: 'Severity', sortKey: 'severity', filterKey: 'severity', enumValues: enums.SEVERITY_LEVEL_VALUES, render: (item) => render.severityLevel(item.severity) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.FINDING_STATUS_VALUES, render: (item) => render.findingStatus(item.status) },
            { key: 'discoveryDate', label: 'Discovery Date', sortKey: 'discoveryDate', render: (item) => render.date(item.discoveryDate) },
            { key: 'dueDate', label: 'Due Date', sortKey: 'dueDate', render: (item) => render.date(item.dueDate) },
            { key: 'responsibleId', label: 'Responsible', sortKey: 'responsibleId' },
            { key: 'repeatFinding', label: 'Repeat', sortKey: 'repeatFinding', render: (item) => item.repeatFinding ? 'Yes' : 'No' }
        ],

        CompRemediationAction: [
            { key: 'actionId', label: 'ID', sortKey: 'actionId', filterKey: 'actionId' },
            { key: 'actionNumber', label: 'Number', sortKey: 'actionNumber', filterKey: 'actionNumber' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'findingId', label: 'Finding', sortKey: 'findingId', filterKey: 'findingId' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.REMEDIATION_STATUS_VALUES, render: (item) => render.remediationStatus(item.status) },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            { key: 'dueDate', label: 'Due Date', sortKey: 'dueDate', render: (item) => render.date(item.dueDate) },
            { key: 'percentComplete', label: 'Progress', sortKey: 'percentComplete', render: (item) => item.percentComplete ? item.percentComplete + '%' : '0%' },
            { key: 'isOverdue', label: 'Overdue', sortKey: 'isOverdue', render: (item) => item.isOverdue ? 'Yes' : 'No' }
        ],

        CompAuditReport: [
            { key: 'reportId', label: 'ID', sortKey: 'reportId', filterKey: 'reportId' },
            { key: 'reportNumber', label: 'Number', sortKey: 'reportNumber', filterKey: 'reportNumber' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'auditScheduleId', label: 'Audit', sortKey: 'auditScheduleId' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.AUDIT_STATUS_VALUES, render: (item) => render.auditStatus(item.status) },
            { key: 'overallOpinion', label: 'Opinion', sortKey: 'overallOpinion' },
            { key: 'findingsCritical', label: 'Critical', sortKey: 'findingsCritical' },
            { key: 'findingsHigh', label: 'High', sortKey: 'findingsHigh' },
            { key: 'findingsMedium', label: 'Medium', sortKey: 'findingsMedium' },
            { key: 'findingsLow', label: 'Low', sortKey: 'findingsLow' },
            { key: 'finalDate', label: 'Final Date', sortKey: 'finalDate', render: (item) => render.date(item.finalDate) }
        ],

        CompComplianceReport: [
            { key: 'reportId', label: 'ID', sortKey: 'reportId', filterKey: 'reportId' },
            { key: 'reportNumber', label: 'Number', sortKey: 'reportNumber', filterKey: 'reportNumber' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'reportType', label: 'Type', sortKey: 'reportType' },
            { key: 'status', label: 'Status', sortKey: 'status' },
            { key: 'periodStart', label: 'Period Start', sortKey: 'periodStart', render: (item) => render.date(item.periodStart) },
            { key: 'periodEnd', label: 'Period End', sortKey: 'periodEnd', render: (item) => render.date(item.periodEnd) },
            { key: 'overallComplianceRate', label: 'Compliance Rate', sortKey: 'overallComplianceRate', render: (item) => item.overallComplianceRate ? item.overallComplianceRate.toFixed(1) + '%' : '-' },
            { key: 'openFindings', label: 'Open Findings', sortKey: 'openFindings' },
            { key: 'reportDate', label: 'Report Date', sortKey: 'reportDate', render: (item) => render.date(item.reportDate) }
        ]
    };

    MobileCompAudit.primaryKeys = {
        CompAuditSchedule: 'scheduleId',
        CompAuditFinding: 'findingId',
        CompRemediationAction: 'actionId',
        CompAuditReport: 'reportId',
        CompComplianceReport: 'reportId'
    };

})();
