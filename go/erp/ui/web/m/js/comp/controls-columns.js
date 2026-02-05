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
 * Mobile COMP Controls Module - Column Configurations
 * Desktop Equivalent: comp/controls/controls-columns.js
 */
(function() {
    'use strict';

    const enums = MobileCompControls.enums;
    const render = MobileCompControls.render;

    MobileCompControls.columns = {
        CompControl: [
            { key: 'controlId', label: 'ID', sortKey: 'controlId', filterKey: 'controlId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'controlType', label: 'Type', sortKey: 'controlType', filterKey: 'controlType', enumValues: enums.CONTROL_TYPE_VALUES, render: (item) => render.controlType(item.controlType) },
            { key: 'processArea', label: 'Process Area', sortKey: 'processArea' },
            { key: 'departmentId', label: 'Department', sortKey: 'departmentId' },
            { key: 'isKeyControl', label: 'Key Control', sortKey: 'isKeyControl', render: (item) => item.isKeyControl ? 'Yes' : 'No' },
            { key: 'isAutomated', label: 'Automated', sortKey: 'isAutomated', render: (item) => item.isAutomated ? 'Yes' : 'No' },
            { key: 'testFrequencyDays', label: 'Test Freq', sortKey: 'testFrequencyDays', render: (item) => item.testFrequencyDays ? item.testFrequencyDays + ' days' : '-' },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        CompControlAssessment: [
            { key: 'assessmentId', label: 'ID', sortKey: 'assessmentId', filterKey: 'assessmentId' },
            { key: 'controlId', label: 'Control', sortKey: 'controlId', filterKey: 'controlId' },
            { key: 'assessmentDate', label: 'Assessment Date', sortKey: 'assessmentDate', render: (item) => render.date(item.assessmentDate) },
            { key: 'assessorId', label: 'Assessor', sortKey: 'assessorId' },
            { key: 'effectiveness', label: 'Effectiveness', sortKey: 'effectiveness', filterKey: 'effectiveness', enumValues: enums.CONTROL_EFFECTIVENESS_VALUES, render: (item) => render.controlEffectiveness(item.effectiveness) },
            { key: 'sampleSize', label: 'Sample Size', sortKey: 'sampleSize' },
            { key: 'exceptionsFound', label: 'Exceptions', sortKey: 'exceptionsFound' },
            { key: 'nextAssessmentDate', label: 'Next Assessment', sortKey: 'nextAssessmentDate', render: (item) => render.date(item.nextAssessmentDate) }
        ],

        CompPolicyDocument: [
            { key: 'policyId', label: 'ID', sortKey: 'policyId', filterKey: 'policyId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'policyType', label: 'Type', sortKey: 'policyType' },
            { key: 'departmentId', label: 'Department', sortKey: 'departmentId' },
            { key: 'version', label: 'Version', sortKey: 'version' },
            { key: 'status', label: 'Status', sortKey: 'status' },
            { key: 'effectiveDate', label: 'Effective Date', sortKey: 'effectiveDate', render: (item) => render.date(item.effectiveDate) },
            { key: 'nextReviewDate', label: 'Next Review', sortKey: 'nextReviewDate', render: (item) => render.date(item.nextReviewDate) },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' }
        ],

        CompApprovalMatrix: [
            { key: 'matrixId', label: 'ID', sortKey: 'matrixId', filterKey: 'matrixId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'transactionType', label: 'Transaction Type', sortKey: 'transactionType' },
            { key: 'departmentId', label: 'Department', sortKey: 'departmentId' },
            { key: 'requiredApprovals', label: 'Required Approvals', sortKey: 'requiredApprovals' },
            { key: 'requiresSequential', label: 'Sequential', sortKey: 'requiresSequential', render: (item) => item.requiresSequential ? 'Yes' : 'No' },
            { key: 'escalationDays', label: 'Escalation Days', sortKey: 'escalationDays' },
            { key: 'priority', label: 'Priority', sortKey: 'priority' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        CompSegregationRule: [
            { key: 'ruleId', label: 'ID', sortKey: 'ruleId', filterKey: 'ruleId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'conflictingFunctionA', label: 'Function A', sortKey: 'conflictingFunctionA' },
            { key: 'conflictingFunctionB', label: 'Function B', sortKey: 'conflictingFunctionB' },
            { key: 'riskLevel', label: 'Risk Level', sortKey: 'riskLevel', filterKey: 'riskLevel', enumValues: enums.SEVERITY_LEVEL_VALUES, render: (item) => render.severityLevel(item.riskLevel) },
            { key: 'controlId', label: 'Control', sortKey: 'controlId' },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ]
    };

    MobileCompControls.primaryKeys = {
        CompControl: 'controlId',
        CompControlAssessment: 'assessmentId',
        CompPolicyDocument: 'policyId',
        CompApprovalMatrix: 'matrixId',
        CompSegregationRule: 'ruleId'
    };

})();
