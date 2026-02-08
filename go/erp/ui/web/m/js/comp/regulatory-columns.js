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
 * Mobile COMP Regulatory Module - Column Configurations
 * Desktop Equivalent: comp/regulatory/regulatory-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileCompRegulatory.enums;
    const render = MobileCompRegulatory.render;

    MobileCompRegulatory.columns = {
        CompRegulation: [
            ...col.id('regulationId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.status('regulationType', 'Type', enums.REGULATION_TYPE_VALUES, render.regulationType),
            ...col.col('jurisdiction', 'Jurisdiction'),
            ...col.col('issuingBody', 'Issuing Body'),
            ...col.date('effectiveDate', 'Effective Date'),
            ...col.col('version', 'Version'),
            ...col.boolean('isActive', 'Active'),
            ...col.col('ownerId', 'Owner')
        ],

        CompRequirement: [
            ...col.id('requirementId'),
            ...col.col('code', 'Code'),
            ...col.col('title', 'Title'),
            ...col.col('regulationId', 'Regulation'),
            ...col.status('priority', 'Priority', enums.SEVERITY_LEVEL_VALUES, render.severityLevel),
            ...col.boolean('isMandatory', 'Mandatory'),
            ...col.custom('reviewFrequencyDays', 'Review Frequency', (item) => item.reviewFrequencyDays ? item.reviewFrequencyDays + ' days' : '-'),
            ...col.col('ownerId', 'Owner'),
            ...col.boolean('isActive', 'Active')
        ],

        CompComplianceStatus: [
            ...col.id('statusId'),
            ...col.col('requirementId', 'Requirement'),
            ...col.col('entityType', 'Entity Type'),
            ...col.col('entityId', 'Entity ID'),
            ...col.status('status', 'Status', enums.COMPLIANCE_STATUS_TYPE_VALUES, render.complianceStatusType),
            ...col.date('assessmentDate', 'Assessment Date'),
            ...col.date('nextReviewDate', 'Next Review'),
            ...col.custom('complianceScore', 'Score', (item) => item.complianceScore ? item.complianceScore.toFixed(1) + '%' : '-'),
            ...col.col('assessorId', 'Assessor')
        ],

        CompCertification: [
            ...col.id('certificationId'),
            ...col.col('name', 'Name'),
            ...col.col('issuingBody', 'Issuing Body'),
            ...col.col('certificateNumber', 'Certificate #'),
            ...col.status('status', 'Status', enums.CERTIFICATION_STATUS_VALUES, render.certificationStatus),
            ...col.date('issueDate', 'Issue Date'),
            ...col.date('expiryDate', 'Expiry Date'),
            ...col.col('scope', 'Scope'),
            ...col.col('responsibleId', 'Responsible')
        ],

        CompViolationRecord: [
            ...col.id('violationId'),
            ...col.col('violationNumber', 'Number'),
            ...col.col('title', 'Title'),
            ...col.col('requirementId', 'Requirement'),
            ...col.status('severity', 'Severity', enums.SEVERITY_LEVEL_VALUES, render.severityLevel),
            ...col.status('status', 'Status', enums.FINDING_STATUS_VALUES, render.findingStatus),
            ...col.date('discoveryDate', 'Discovery Date'),
            ...col.date('dueDate', 'Due Date'),
            ...col.col('assignedToId', 'Assigned To')
        ]
    };

    MobileCompRegulatory.primaryKeys = {
        CompRegulation: 'regulationId',
        CompRequirement: 'requirementId',
        CompComplianceStatus: 'statusId',
        CompCertification: 'certificationId',
        CompViolationRecord: 'violationId'
    };

})();
