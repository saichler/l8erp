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
                ...f.textarea('controlObjective', 'Control Objective')
            ]),
            f.section('Testing & Ownership', [
                ...f.number('testFrequencyDays', 'Test Frequency (Days)'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Assessments', [
                ...f.inlineTable('assessments', 'Control Assessments', [
                    { key: 'assessmentId', label: 'ID', hidden: true },
                    { key: 'assessmentDate', label: 'Date', type: 'date' },
                    { key: 'assessorId', label: 'Assessor', type: 'reference', lookupModel: 'Employee' },
                    { key: 'effectiveness', label: 'Effectiveness', type: 'select', options: enums.CONTROL_EFFECTIVENESS },
                    { key: 'testPerformed', label: 'Test', type: 'text' },
                    { key: 'recommendations', label: 'Recommendations', type: 'text' }
                ])
            ]),
            f.section('Segregation Rules', [
                ...f.inlineTable('segregationRules', 'Segregation Rules', [
                    { key: 'ruleId', label: 'ID', hidden: true },
                    { key: 'code', label: 'Code', type: 'text' },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'conflictingFunctionA', label: 'Function A', type: 'text' },
                    { key: 'conflictingFunctionB', label: 'Function B', type: 'text' },
                    { key: 'riskLevel', label: 'Risk Level', type: 'text' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ])
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
                ...f.date('reviewDate', 'Review Date')
            ]),
            f.section('Approval & Review', [
                ...f.reference('approverId', 'Approver', 'Employee'),
                ...f.number('reviewFrequencyDays', 'Review Frequency (Days)'),
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
                ...f.number('thresholdMin', 'Threshold Minimum'),
                ...f.number('thresholdMax', 'Threshold Maximum'),
                ...f.number('requiredApprovals', 'Required Approvals'),
                ...f.checkbox('requiresSequential', 'Sequential Approval')
            ]),
            f.section('Escalation & Status', [
                ...f.number('escalationDays', 'Escalation Days'),
                ...f.number('priority', 'Priority'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

    };

})();
