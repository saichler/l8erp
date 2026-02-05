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

    const enums = MobileCompRegulatory.enums;
    const render = MobileCompRegulatory.render;

    MobileCompRegulatory.columns = {
        CompRegulation: [
            { key: 'regulationId', label: 'ID', sortKey: 'regulationId', filterKey: 'regulationId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'regulationType', label: 'Type', sortKey: 'regulationType', filterKey: 'regulationType', enumValues: enums.REGULATION_TYPE_VALUES, render: (item) => render.regulationType(item.regulationType) },
            { key: 'jurisdiction', label: 'Jurisdiction', sortKey: 'jurisdiction' },
            { key: 'issuingBody', label: 'Issuing Body', sortKey: 'issuingBody' },
            { key: 'effectiveDate', label: 'Effective Date', sortKey: 'effectiveDate', render: (item) => render.date(item.effectiveDate) },
            { key: 'version', label: 'Version', sortKey: 'version' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' }
        ],

        CompRequirement: [
            { key: 'requirementId', label: 'ID', sortKey: 'requirementId', filterKey: 'requirementId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'regulationId', label: 'Regulation', sortKey: 'regulationId', filterKey: 'regulationId' },
            { key: 'priority', label: 'Priority', sortKey: 'priority', filterKey: 'priority', enumValues: enums.SEVERITY_LEVEL_VALUES, render: (item) => render.severityLevel(item.priority) },
            { key: 'isMandatory', label: 'Mandatory', sortKey: 'isMandatory', render: (item) => item.isMandatory ? 'Yes' : 'No' },
            { key: 'reviewFrequencyDays', label: 'Review Frequency', sortKey: 'reviewFrequencyDays', render: (item) => item.reviewFrequencyDays ? item.reviewFrequencyDays + ' days' : '-' },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        CompComplianceStatus: [
            { key: 'statusId', label: 'ID', sortKey: 'statusId', filterKey: 'statusId' },
            { key: 'requirementId', label: 'Requirement', sortKey: 'requirementId', filterKey: 'requirementId' },
            { key: 'entityType', label: 'Entity Type', sortKey: 'entityType' },
            { key: 'entityId', label: 'Entity ID', sortKey: 'entityId' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.COMPLIANCE_STATUS_TYPE_VALUES, render: (item) => render.complianceStatusType(item.status) },
            { key: 'assessmentDate', label: 'Assessment Date', sortKey: 'assessmentDate', render: (item) => render.date(item.assessmentDate) },
            { key: 'nextReviewDate', label: 'Next Review', sortKey: 'nextReviewDate', render: (item) => render.date(item.nextReviewDate) },
            { key: 'complianceScore', label: 'Score', sortKey: 'complianceScore', render: (item) => item.complianceScore ? item.complianceScore.toFixed(1) + '%' : '-' },
            { key: 'assessorId', label: 'Assessor', sortKey: 'assessorId' }
        ],

        CompCertification: [
            { key: 'certificationId', label: 'ID', sortKey: 'certificationId', filterKey: 'certificationId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'issuingBody', label: 'Issuing Body', sortKey: 'issuingBody' },
            { key: 'certificateNumber', label: 'Certificate #', sortKey: 'certificateNumber' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.CERTIFICATION_STATUS_VALUES, render: (item) => render.certificationStatus(item.status) },
            { key: 'issueDate', label: 'Issue Date', sortKey: 'issueDate', render: (item) => render.date(item.issueDate) },
            { key: 'expiryDate', label: 'Expiry Date', sortKey: 'expiryDate', render: (item) => render.date(item.expiryDate) },
            { key: 'scope', label: 'Scope', sortKey: 'scope' },
            { key: 'responsibleId', label: 'Responsible', sortKey: 'responsibleId' }
        ],

        CompViolationRecord: [
            { key: 'violationId', label: 'ID', sortKey: 'violationId', filterKey: 'violationId' },
            { key: 'violationNumber', label: 'Number', sortKey: 'violationNumber', filterKey: 'violationNumber' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'requirementId', label: 'Requirement', sortKey: 'requirementId' },
            { key: 'severity', label: 'Severity', sortKey: 'severity', filterKey: 'severity', enumValues: enums.SEVERITY_LEVEL_VALUES, render: (item) => render.severityLevel(item.severity) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.FINDING_STATUS_VALUES, render: (item) => render.findingStatus(item.status) },
            { key: 'discoveryDate', label: 'Discovery Date', sortKey: 'discoveryDate', render: (item) => render.date(item.discoveryDate) },
            { key: 'dueDate', label: 'Due Date', sortKey: 'dueDate', render: (item) => render.date(item.dueDate) },
            { key: 'assignedToId', label: 'Assigned To', sortKey: 'assignedToId' }
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
