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
 * Mobile COMP Regulatory Module - Form Configurations
 * Desktop Equivalent: comp/regulatory/regulatory-forms.js
 */
(function() {
    'use strict';

    const enums = MobileCompRegulatory.enums;

    MobileCompRegulatory.forms = {
        CompRegulation: {
            title: 'Regulation',
            sections: [
                {
                    title: 'Regulation Details',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'regulationType', label: 'Type', type: 'select', options: enums.REGULATION_TYPE },
                        { key: 'jurisdiction', label: 'Jurisdiction', type: 'text' },
                        { key: 'issuingBody', label: 'Issuing Body', type: 'text' }
                    ]
                },
                {
                    title: 'Dates & Status',
                    fields: [
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
                        { key: 'version', label: 'Version', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Ownership',
                    fields: [
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'referenceUrl', label: 'Reference URL', type: 'text' }
                    ]
                }
            ]
        },

        CompRequirement: {
            title: 'Requirement',
            sections: [
                {
                    title: 'Requirement Details',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'regulationId', label: 'Regulation', type: 'reference', lookupModel: 'CompRegulation', required: true },
                        { key: 'parentRequirementId', label: 'Parent Requirement', type: 'reference', lookupModel: 'CompRequirement' }
                    ]
                },
                {
                    title: 'Classification',
                    fields: [
                        { key: 'priority', label: 'Priority', type: 'select', options: enums.SEVERITY_LEVEL },
                        { key: 'isMandatory', label: 'Mandatory', type: 'checkbox' },
                        { key: 'category', label: 'Category', type: 'text' }
                    ]
                },
                {
                    title: 'Review & Ownership',
                    fields: [
                        { key: 'reviewFrequencyDays', label: 'Review Frequency (Days)', type: 'number' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        CompComplianceStatus: {
            title: 'Compliance Status',
            sections: [
                {
                    title: 'Status Details',
                    fields: [
                        { key: 'requirementId', label: 'Requirement', type: 'reference', lookupModel: 'CompRequirement', required: true },
                        { key: 'entityType', label: 'Entity Type', type: 'text', required: true },
                        { key: 'entityId', label: 'Entity ID', type: 'text', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.COMPLIANCE_STATUS_TYPE }
                    ]
                },
                {
                    title: 'Assessment',
                    fields: [
                        { key: 'assessmentDate', label: 'Assessment Date', type: 'date' },
                        { key: 'assessorId', label: 'Assessor', type: 'reference', lookupModel: 'Employee' },
                        { key: 'complianceScore', label: 'Compliance Score (%)', type: 'number' },
                        { key: 'evidenceDocumentId', label: 'Evidence Document', type: 'text' }
                    ]
                },
                {
                    title: 'Review',
                    fields: [
                        { key: 'nextReviewDate', label: 'Next Review Date', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        CompCertification: {
            title: 'Certification',
            sections: [
                {
                    title: 'Certification Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'issuingBody', label: 'Issuing Body', type: 'text', required: true },
                        { key: 'certificateNumber', label: 'Certificate Number', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.CERTIFICATION_STATUS }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'issueDate', label: 'Issue Date', type: 'date' },
                        { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
                        { key: 'renewalDate', label: 'Renewal Date', type: 'date' }
                    ]
                },
                {
                    title: 'Scope & Ownership',
                    fields: [
                        { key: 'scope', label: 'Scope', type: 'textarea' },
                        { key: 'responsibleId', label: 'Responsible', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        },

        CompViolationRecord: {
            title: 'Violation Record',
            sections: [
                {
                    title: 'Violation Details',
                    fields: [
                        { key: 'violationNumber', label: 'Violation Number', type: 'text' },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'requirementId', label: 'Requirement', type: 'reference', lookupModel: 'CompRequirement', required: true },
                        { key: 'severity', label: 'Severity', type: 'select', options: enums.SEVERITY_LEVEL },
                        { key: 'status', label: 'Status', type: 'select', options: enums.FINDING_STATUS }
                    ]
                },
                {
                    title: 'Timeline',
                    fields: [
                        { key: 'discoveryDate', label: 'Discovery Date', type: 'date' },
                        { key: 'reportedDate', label: 'Reported Date', type: 'date' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'closedDate', label: 'Closed Date', type: 'date' }
                    ]
                },
                {
                    title: 'Assignment & Resolution',
                    fields: [
                        { key: 'assignedToId', label: 'Assigned To', type: 'reference', lookupModel: 'Employee' },
                        { key: 'rootCause', label: 'Root Cause', type: 'textarea' },
                        { key: 'correctiveAction', label: 'Corrective Action', type: 'textarea' }
                    ]
                }
            ]
        }
    };

})();
