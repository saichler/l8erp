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
 * Mobile COMP Controls Module - Form Configurations
 * Desktop Equivalent: comp/controls/controls-forms.js
 */
(function() {
    'use strict';

    window.MobileCompControls = window.MobileCompControls || {};
    const f = window.Layer8FormFactory;
    const enums = MobileCompControls.enums;

    MobileCompControls.forms = {
        CompControl: f.form('Control', [
            f.section('Control Details', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('controlType', 'Control Type', enums.CONTROL_TYPE),
                ...f.text('processArea', 'Process Area')
            ]),
            f.section('Classification', [
                ...f.reference('departmentId', 'Department', 'HcmDepartment'),
                ...f.checkbox('isKeyControl', 'Key Control'),
                ...f.checkbox('isAutomated', 'Automated'),
                ...f.textarea('objective', 'Objective')
            ]),
            f.section('Testing & Ownership', [
                ...f.number('testFrequencyDays', 'Test Frequency (Days)'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        CompControlAssessment: f.form('Control Assessment', [
            f.section('Assessment Details', [
                ...f.reference('controlId', 'Control', 'CompControl', true),
                ...f.date('assessmentDate', 'Assessment Date', true),
                ...f.reference('assessorId', 'Assessor', 'Employee', true),
                ...f.select('effectiveness', 'Effectiveness', enums.CONTROL_EFFECTIVENESS)
            ]),
            f.section('Testing', [
                ...f.textarea('testProcedure', 'Test Procedure'),
                ...f.number('sampleSize', 'Sample Size'),
                ...f.number('exceptionsFound', 'Exceptions Found')
            ]),
            f.section('Results & Next Steps', [
                ...f.textarea('findings', 'Findings'),
                ...f.textarea('recommendations', 'Recommendations'),
                ...f.date('nextAssessmentDate', 'Next Assessment Date')
            ])
        ]),

        CompPolicyDocument: f.form('Policy Document', [
            f.section('Document Details', [
                ...f.text('code', 'Code', true),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.text('policyType', 'Policy Type'),
                ...f.reference('departmentId', 'Department', 'HcmDepartment')
            ]),
            f.section('Version & Status', [
                ...f.text('version', 'Version'),
                ...f.text('status', 'Status'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('expiryDate', 'Expiry Date')
            ]),
            f.section('Approval & Review', [
                ...f.reference('approvedBy', 'Approved By', 'Employee'),
                ...f.date('approvalDate', 'Approval Date'),
                ...f.date('nextReviewDate', 'Next Review Date'),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ])
        ]),

        CompApprovalMatrix: f.form('Approval Matrix', [
            f.section('Matrix Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('transactionType', 'Transaction Type', true),
                ...f.reference('departmentId', 'Department', 'HcmDepartment')
            ]),
            f.section('Approval Rules', [
                ...f.number('minAmount', 'Minimum Amount'),
                ...f.number('maxAmount', 'Maximum Amount'),
                ...f.number('requiredApprovals', 'Required Approvals'),
                ...f.checkbox('requiresSequential', 'Sequential Approval')
            ]),
            f.section('Escalation & Status', [
                ...f.number('escalationDays', 'Escalation Days'),
                ...f.number('priority', 'Priority'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        CompSegregationRule: f.form('Segregation Rule', [
            f.section('Rule Details', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description')
            ]),
            f.section('Conflicting Functions', [
                ...f.text('conflictingFunctionA', 'Function A', true),
                ...f.text('conflictingFunctionB', 'Function B', true),
                ...f.select('riskLevel', 'Risk Level', enums.SEVERITY_LEVEL),
                ...f.textarea('riskDescription', 'Risk Description')
            ]),
            f.section('Mitigation & Status', [
                ...f.reference('controlId', 'Mitigating Control', 'CompControl'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.checkbox('isActive', 'Active')
            ])
        ])
    };

})();
