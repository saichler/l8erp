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

    const col = window.Layer8ColumnFactory;
    const enums = MobileCompControls.enums;
    const render = MobileCompControls.render;

    MobileCompControls.columns = {
        CompControl: [
            ...col.id('controlId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.status('controlType', 'Type', enums.CONTROL_TYPE_VALUES, render.controlType),
            ...col.col('processArea', 'Process Area'),
            ...col.col('departmentId', 'Department'),
            ...col.boolean('isKeyControl', 'Key Control'),
            ...col.boolean('isAutomated', 'Automated'),
            ...col.custom('testFrequencyDays', 'Test Freq', (item) => item.testFrequencyDays ? item.testFrequencyDays + ' days' : '-'),
            ...col.col('ownerId', 'Owner'),
            ...col.boolean('isActive', 'Active')
        ],

        CompPolicyDocument: [
            ...col.id('policyId'),
            ...col.col('code', 'Code'),
            ...col.col('title', 'Title'),
            ...col.col('policyType', 'Type'),
            ...col.col('departmentId', 'Department'),
            ...col.col('version', 'Version'),
            ...col.col('status', 'Status'),
            ...col.date('effectiveDate', 'Effective Date'),
            ...col.date('nextReviewDate', 'Next Review'),
            ...col.col('ownerId', 'Owner')
        ],

        CompApprovalMatrix: [
            ...col.id('matrixId'),
            ...col.col('name', 'Name'),
            ...col.col('transactionType', 'Transaction Type'),
            ...col.col('departmentId', 'Department'),
            ...col.col('requiredApprovals', 'Required Approvals'),
            ...col.boolean('requiresSequential', 'Sequential'),
            ...col.col('escalationDays', 'Escalation Days'),
            ...col.col('priority', 'Priority'),
            ...col.boolean('isActive', 'Active')
        ],

    };

    MobileCompControls.primaryKeys = {
        CompControl: 'controlId',
        CompPolicyDocument: 'policyId',
        CompApprovalMatrix: 'matrixId'
    };

})();
