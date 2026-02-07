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
 * Mobile COMP Regulatory Module - Form Configurations
 * Desktop Equivalent: comp/regulatory/regulatory-forms.js
 */
(function() {
    'use strict';

    window.MobileCompRegulatory = window.MobileCompRegulatory || {};
    const f = window.Layer8FormFactory;
    const enums = MobileCompRegulatory.enums;

    MobileCompRegulatory.forms = {
        CompRegulation: f.form('Regulation', [
            f.section('Regulation Details', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('regulationType', 'Type', enums.REGULATION_TYPE),
                ...f.text('jurisdiction', 'Jurisdiction'),
                ...f.text('issuingBody', 'Issuing Body')
            ]),
            f.section('Dates & Status', [
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('sunsetDate', 'Sunset Date'),
                ...f.text('version', 'Version'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Ownership', [
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.text('sourceUrl', 'Source URL')
            ])
        ]),

        CompRequirement: f.form('Requirement', [
            f.section('Requirement Details', [
                ...f.text('code', 'Code', true),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('regulationId', 'Regulation', 'CompRegulation', true),
                ...f.reference('parentRequirementId', 'Parent Requirement', 'CompRequirement')
            ]),
            f.section('Classification', [
                ...f.select('priority', 'Priority', enums.SEVERITY_LEVEL),
                ...f.checkbox('isMandatory', 'Mandatory'),
                ...f.textarea('controlObjective', 'Control Objective')
            ]),
            f.section('Review & Ownership', [
                ...f.number('reviewFrequencyDays', 'Review Frequency (Days)'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        CompComplianceStatus: f.form('Compliance Status', [
            f.section('Status Details', [
                ...f.reference('requirementId', 'Requirement', 'CompRequirement', true),
                ...f.text('entityType', 'Entity Type', true),
                ...f.text('entityId', 'Entity ID', true),
                ...f.select('status', 'Status', enums.COMPLIANCE_STATUS_TYPE)
            ]),
            f.section('Assessment', [
                ...f.date('assessmentDate', 'Assessment Date'),
                ...f.reference('assessorId', 'Assessor', 'Employee'),
                ...f.number('complianceScore', 'Compliance Score (%)'),
                ...f.text('evidenceDocumentId', 'Evidence Document')
            ]),
            f.section('Review', [
                ...f.date('nextReviewDate', 'Next Review Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        CompCertification: f.form('Certification', [
            f.section('Certification Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('issuingBody', 'Issuing Body', true),
                ...f.text('certificateNumber', 'Certificate Number'),
                ...f.select('status', 'Status', enums.CERTIFICATION_STATUS)
            ]),
            f.section('Dates', [
                ...f.date('issueDate', 'Issue Date'),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.number('renewalLeadDays', 'Renewal Lead Days')
            ]),
            f.section('Scope & Ownership', [
                ...f.textarea('scope', 'Scope'),
                ...f.reference('responsibleId', 'Responsible', 'Employee')
            ])
        ]),

        CompViolationRecord: f.form('Violation Record', [
            f.section('Violation Details', [
                ...f.text('violationNumber', 'Violation Number'),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('requirementId', 'Requirement', 'CompRequirement', true),
                ...f.select('severity', 'Severity', enums.SEVERITY_LEVEL),
                ...f.select('status', 'Status', enums.FINDING_STATUS)
            ]),
            f.section('Timeline', [
                ...f.date('discoveryDate', 'Discovery Date'),
                ...f.reference('discoveredById', 'Discovered By', 'Employee'),
                ...f.date('dueDate', 'Due Date'),
                ...f.date('closedDate', 'Closed Date')
            ]),
            f.section('Assignment & Resolution', [
                ...f.reference('assignedToId', 'Assigned To', 'Employee'),
                ...f.textarea('rootCause', 'Root Cause'),
                ...f.textarea('correctiveAction', 'Corrective Action')
            ])
        ])
    };

})();
