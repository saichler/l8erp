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

    const col = window.Layer8ColumnFactory;
    const enums = MobileCompAudit.enums;
    const render = MobileCompAudit.render;

    MobileCompAudit.columns = {
        CompAuditSchedule: [
            ...col.id('scheduleId'),
            ...col.col('name', 'Name'),
            ...col.status('auditType', 'Type', enums.AUDIT_TYPE_VALUES, render.auditType),
            ...col.status('status', 'Status', enums.AUDIT_STATUS_VALUES, render.auditStatus),
            ...col.col('fiscalYear', 'Fiscal Year'),
            ...col.date('plannedStartDate', 'Planned Start'),
            ...col.date('plannedEndDate', 'Planned End'),
            ...col.col('leadAuditorId', 'Lead Auditor'),
            ...col.col('auditFirm', 'Audit Firm')
        ],

        CompAuditFinding: [
            ...col.id('findingId'),
            ...col.col('findingNumber', 'Number'),
            ...col.col('title', 'Title'),
            ...col.col('auditScheduleId', 'Audit'),
            ...col.status('severity', 'Severity', enums.SEVERITY_LEVEL_VALUES, render.severityLevel),
            ...col.status('status', 'Status', enums.FINDING_STATUS_VALUES, render.findingStatus),
            ...col.date('discoveryDate', 'Discovery Date'),
            ...col.date('dueDate', 'Due Date'),
            ...col.col('responsibleId', 'Responsible'),
            ...col.boolean('repeatFinding', 'Repeat')
        ],

        CompComplianceReport: [
            ...col.id('reportId'),
            ...col.col('reportNumber', 'Number'),
            ...col.col('title', 'Title'),
            ...col.col('reportType', 'Type'),
            ...col.col('status', 'Status'),
            ...col.date('periodStart', 'Period Start'),
            ...col.date('periodEnd', 'Period End'),
            ...col.custom('overallComplianceRate', 'Compliance Rate', (item) => item.overallComplianceRate ? item.overallComplianceRate.toFixed(1) + '%' : '-'),
            ...col.col('openFindings', 'Open Findings'),
            ...col.date('reportDate', 'Report Date')
        ]
    };

    MobileCompAudit.primaryKeys = {
        CompAuditSchedule: 'scheduleId',
        CompAuditFinding: 'findingId',
        CompComplianceReport: 'reportId'
    };

})();
