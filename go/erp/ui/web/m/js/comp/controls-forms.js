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
 * Mobile COMP Controls Module - Form Configurations
 * Desktop Equivalent: comp/controls/controls-forms.js
 */
(function() {
    'use strict';

    const enums = MobileCompControls.enums;

    MobileCompControls.forms = {
        CompControl: {
            title: 'Control',
            sections: [
                {
                    title: 'Control Details',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'controlType', label: 'Control Type', type: 'select', options: enums.CONTROL_TYPE },
                        { key: 'processArea', label: 'Process Area', type: 'text' }
                    ]
                },
                {
                    title: 'Classification',
                    fields: [
                        { key: 'departmentId', label: 'Department', type: 'reference', lookupModel: 'HcmDepartment' },
                        { key: 'isKeyControl', label: 'Key Control', type: 'checkbox' },
                        { key: 'isAutomated', label: 'Automated', type: 'checkbox' },
                        { key: 'objective', label: 'Objective', type: 'textarea' }
                    ]
                },
                {
                    title: 'Testing & Ownership',
                    fields: [
                        { key: 'testFrequencyDays', label: 'Test Frequency (Days)', type: 'number' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        CompControlAssessment: {
            title: 'Control Assessment',
            sections: [
                {
                    title: 'Assessment Details',
                    fields: [
                        { key: 'controlId', label: 'Control', type: 'reference', lookupModel: 'CompControl', required: true },
                        { key: 'assessmentDate', label: 'Assessment Date', type: 'date', required: true },
                        { key: 'assessorId', label: 'Assessor', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'effectiveness', label: 'Effectiveness', type: 'select', options: enums.CONTROL_EFFECTIVENESS }
                    ]
                },
                {
                    title: 'Testing',
                    fields: [
                        { key: 'testProcedure', label: 'Test Procedure', type: 'textarea' },
                        { key: 'sampleSize', label: 'Sample Size', type: 'number' },
                        { key: 'exceptionsFound', label: 'Exceptions Found', type: 'number' }
                    ]
                },
                {
                    title: 'Results & Next Steps',
                    fields: [
                        { key: 'findings', label: 'Findings', type: 'textarea' },
                        { key: 'recommendations', label: 'Recommendations', type: 'textarea' },
                        { key: 'nextAssessmentDate', label: 'Next Assessment Date', type: 'date' }
                    ]
                }
            ]
        },

        CompPolicyDocument: {
            title: 'Policy Document',
            sections: [
                {
                    title: 'Document Details',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'policyType', label: 'Policy Type', type: 'text' },
                        { key: 'departmentId', label: 'Department', type: 'reference', lookupModel: 'HcmDepartment' }
                    ]
                },
                {
                    title: 'Version & Status',
                    fields: [
                        { key: 'version', label: 'Version', type: 'text' },
                        { key: 'status', label: 'Status', type: 'text' },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'expiryDate', label: 'Expiry Date', type: 'date' }
                    ]
                },
                {
                    title: 'Approval & Review',
                    fields: [
                        { key: 'approvedBy', label: 'Approved By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'approvalDate', label: 'Approval Date', type: 'date' },
                        { key: 'nextReviewDate', label: 'Next Review Date', type: 'date' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        },

        CompApprovalMatrix: {
            title: 'Approval Matrix',
            sections: [
                {
                    title: 'Matrix Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'transactionType', label: 'Transaction Type', type: 'text', required: true },
                        { key: 'departmentId', label: 'Department', type: 'reference', lookupModel: 'HcmDepartment' }
                    ]
                },
                {
                    title: 'Approval Rules',
                    fields: [
                        { key: 'minAmount', label: 'Minimum Amount', type: 'number' },
                        { key: 'maxAmount', label: 'Maximum Amount', type: 'number' },
                        { key: 'requiredApprovals', label: 'Required Approvals', type: 'number' },
                        { key: 'requiresSequential', label: 'Sequential Approval', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Escalation & Status',
                    fields: [
                        { key: 'escalationDays', label: 'Escalation Days', type: 'number' },
                        { key: 'priority', label: 'Priority', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        CompSegregationRule: {
            title: 'Segregation Rule',
            sections: [
                {
                    title: 'Rule Details',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                },
                {
                    title: 'Conflicting Functions',
                    fields: [
                        { key: 'conflictingFunctionA', label: 'Function A', type: 'text', required: true },
                        { key: 'conflictingFunctionB', label: 'Function B', type: 'text', required: true },
                        { key: 'riskLevel', label: 'Risk Level', type: 'select', options: enums.SEVERITY_LEVEL },
                        { key: 'riskDescription', label: 'Risk Description', type: 'textarea' }
                    ]
                },
                {
                    title: 'Mitigation & Status',
                    fields: [
                        { key: 'controlId', label: 'Mitigating Control', type: 'reference', lookupModel: 'CompControl' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        }
    };

})();
