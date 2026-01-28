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
// Core HR Module - Column Configurations
// Table column definitions for all Core HR models

(function() {
    'use strict';

    // Ensure CoreHR namespace exists
    window.CoreHR = window.CoreHR || {};

    const { escapeHtml } = ERPUtils;
    const { renderBoolean, renderDate } = ERPRenderers;
    const enums = CoreHR.enums;
    const render = CoreHR.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    CoreHR.columns = {
        Employee: [
            { key: 'employeeId', label: 'ID', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'employeeNumber', label: 'Emp #', sortKey: 'employeeNumber', filterKey: 'employeeNumber' },
            {
                key: 'name',
                label: 'Name',
                sortKey: 'lastName',
                filterKey: 'lastName',
                render: (item) => {
                    const name = `${item.firstName || ''} ${item.lastName || ''}`.trim();
                    return `<a href="#" class="emp-name-link" onclick="EmployeeDetail.open('${item.employeeId}'); return false;">${escapeHtml(name)}</a>`;
                }
            },
            {
                key: 'employmentStatus',
                label: 'Status',
                sortKey: 'employmentStatus',
                filterKey: 'employmentStatus',
                enumValues: enums.EMPLOYMENT_STATUS_VALUES,
                render: (item) => render.employmentStatus(item.employmentStatus)
            },
            {
                key: 'employmentType',
                label: 'Type',
                sortKey: 'employmentType',
                filterKey: 'employmentType',
                enumValues: enums.EMPLOYMENT_TYPE_VALUES,
                render: (item) => render.employmentType(item.employmentType)
            },
            {
                key: 'hireDate',
                label: 'Hire Date',
                sortKey: 'hireDate',
                render: (item) => renderDate(item.hireDate)
            }
        ],

        Organization: [
            { key: 'organizationId', label: 'ID', sortKey: 'organizationId', filterKey: 'organizationId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'organizationType',
                label: 'Type',
                sortKey: 'organizationType',
                filterKey: 'organizationType',
                enumValues: enums.ORGANIZATION_TYPE_VALUES,
                render: (item) => render.orgType(item.organizationType)
            },
            { key: 'legalName', label: 'Legal Name', sortKey: 'legalName', filterKey: 'legalName' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        Department: [
            { key: 'departmentId', label: 'ID', sortKey: 'departmentId', filterKey: 'departmentId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            { key: 'managerId', label: 'Manager ID', sortKey: 'managerId', filterKey: 'managerId' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        Position: [
            { key: 'positionId', label: 'ID', sortKey: 'positionId', filterKey: 'positionId' },
            { key: 'positionCode', label: 'Code', sortKey: 'positionCode', filterKey: 'positionCode' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'departmentId', label: 'Dept ID', sortKey: 'departmentId', filterKey: 'departmentId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.POSITION_STATUS_VALUES,
                render: (item) => render.positionStatus(item.status)
            },
            {
                key: 'headcount',
                label: 'Headcount',
                sortKey: 'headcount',
                render: (item) => `${item.filledCount || 0}/${item.headcount || 0}`
            },
            {
                key: 'isManager',
                label: 'Manager',
                sortKey: 'isManager',
                render: (item) => renderBoolean(item.isManager)
            }
        ],

        Job: [
            { key: 'jobId', label: 'ID', sortKey: 'jobId', filterKey: 'jobId' },
            { key: 'jobCode', label: 'Code', sortKey: 'jobCode', filterKey: 'jobCode' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'jobFamilyId', label: 'Family', sortKey: 'jobFamilyId', filterKey: 'jobFamilyId' },
            { key: 'jobLevel', label: 'Level', sortKey: 'jobLevel', filterKey: 'jobLevel' },
            {
                key: 'isFlsaExempt',
                label: 'FLSA Exempt',
                sortKey: 'isFlsaExempt',
                render: (item) => renderBoolean(item.isFlsaExempt, { trueText: 'Exempt', falseText: 'Non-Exempt' })
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        JobFamily: [
            { key: 'jobFamilyId', label: 'ID', sortKey: 'jobFamilyId', filterKey: 'jobFamilyId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        EmployeeDocument: [
            { key: 'documentId', label: 'ID', sortKey: 'documentId', filterKey: 'documentId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'documentType',
                label: 'Type',
                sortKey: 'documentType',
                filterKey: 'documentType',
                render: (item) => render.documentType(item.documentType)
            },
            {
                key: 'uploadDate',
                label: 'Uploaded',
                sortKey: 'uploadDate',
                render: (item) => renderDate(item.uploadDate)
            },
            {
                key: 'expirationDate',
                label: 'Expires',
                sortKey: 'expirationDate',
                render: (item) => renderDate(item.expirationDate)
            },
            {
                key: 'isVerified',
                label: 'Verified',
                sortKey: 'isVerified',
                render: (item) => renderBoolean(item.isVerified)
            }
        ],

        ComplianceRecord: [
            { key: 'recordId', label: 'ID', sortKey: 'recordId', filterKey: 'recordId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            {
                key: 'complianceType',
                label: 'Type',
                sortKey: 'complianceType',
                filterKey: 'complianceType',
                render: (item) => render.complianceType(item.complianceType)
            },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status' },
            {
                key: 'dueDate',
                label: 'Due Date',
                sortKey: 'dueDate',
                render: (item) => renderDate(item.dueDate)
            },
            {
                key: 'completionDate',
                label: 'Completed',
                sortKey: 'completionDate',
                render: (item) => renderDate(item.completionDate)
            },
            {
                key: 'expirationDate',
                label: 'Expires',
                sortKey: 'expirationDate',
                render: (item) => renderDate(item.expirationDate)
            }
        ]
    };

})();
