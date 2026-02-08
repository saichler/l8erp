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
 * Mobile Core HR Module - Column Configurations
 * Desktop Equivalent: hcm/core-hr/core-hr-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileCoreHR.enums;
    const render = MobileCoreHR.render;

    MobileCoreHR.columns = {
        Employee: [
            ...col.id('employeeId'),
            ...col.col('employeeNumber', 'Emp #'),
            ...col.custom('name', 'Name', (item) => Layer8MRenderers.renderEmployeeName(item), { sortKey: 'lastName', filterKey: 'lastName' }),
            ...col.status('employmentStatus', 'Status', enums.EMPLOYMENT_STATUS_VALUES, render.employmentStatus),
            ...col.status('employmentType', 'Type', enums.EMPLOYMENT_TYPE_VALUES, render.employmentType),
            ...col.date('hireDate', 'Hire Date')
        ],

        Organization: [
            ...col.id('organizationId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.status('organizationType', 'Type', enums.ORGANIZATION_TYPE_VALUES, render.orgType),
            ...col.col('legalName', 'Legal Name'),
            ...col.boolean('isActive', 'Active')
        ],

        Department: [
            ...col.id('departmentId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.col('managerId', 'Manager ID'),
            ...col.boolean('isActive', 'Active')
        ],

        Position: [
            ...col.id('positionId'),
            ...col.col('positionCode', 'Code'),
            ...col.col('title', 'Title'),
            ...col.col('departmentId', 'Dept ID'),
            ...col.status('status', 'Status', enums.POSITION_STATUS_VALUES, render.positionStatus),
            ...col.custom('headcount', 'Headcount', (item) => Layer8MRenderers.renderCount(item.filledCount, item.headcount)),
            ...col.boolean('isManager', 'Manager')
        ],

        Job: [
            ...col.id('jobId'),
            ...col.col('jobCode', 'Code'),
            ...col.col('title', 'Title'),
            ...col.col('jobFamilyId', 'Family'),
            ...col.col('jobLevel', 'Level'),
            ...col.boolean('isFlsaExempt', 'FLSA Exempt', { trueText: 'Exempt', falseText: 'Non-Exempt' }),
            ...col.boolean('isActive', 'Active')
        ],

        JobFamily: [
            ...col.id('jobFamilyId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.boolean('isActive', 'Active')
        ],

        EmployeeDocument: [
            ...col.id('documentId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('name', 'Name'),
            ...col.enum('documentType', 'Type', null, render.documentType),
            ...col.date('uploadDate', 'Uploaded'),
            ...col.date('expirationDate', 'Expires'),
            ...col.boolean('isVerified', 'Verified')
        ],

        ComplianceRecord: [
            ...col.id('recordId'),
            ...col.col('employeeId', 'Employee'),
            ...col.enum('complianceType', 'Type', null, render.complianceType),
            ...col.col('status', 'Status'),
            ...col.date('dueDate', 'Due Date'),
            ...col.date('completionDate', 'Completed'),
            ...col.date('expirationDate', 'Expires')
        ]
    };

    MobileCoreHR.primaryKeys = {
        Employee: 'employeeId',
        Organization: 'organizationId',
        Department: 'departmentId',
        Position: 'positionId',
        Job: 'jobId',
        JobFamily: 'jobFamilyId',
        EmployeeDocument: 'documentId',
        ComplianceRecord: 'recordId'
    };

})();
