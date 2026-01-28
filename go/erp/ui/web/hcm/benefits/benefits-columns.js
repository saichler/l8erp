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
// Benefits Module - Column Configurations
// Part 2 of 4 - Load after benefits-enums.js

(function() {
    'use strict';

    // Import shared utilities
    const { escapeHtml } = ERPUtils;
    const { renderEnum, renderBoolean, renderDate, renderMoney } = ERPRenderers;

    // Get enums and render functions from benefits-enums.js
    const enums = window.Benefits.enums;
    const internal = window.Benefits._internal;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    const BENEFITS_COLUMNS = {
        BenefitPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'planType',
                label: 'Type',
                sortKey: 'planType',
                filterKey: 'planType',
                enumValues: enums.BENEFIT_PLAN_TYPE_VALUES,
                render: (item) => renderEnum(item.planType, enums.BENEFIT_PLAN_TYPE)
            },
            {
                key: 'category',
                label: 'Category',
                sortKey: 'category',
                filterKey: 'category',
                enumValues: enums.BENEFIT_PLAN_CATEGORY_VALUES,
                render: (item) => renderEnum(item.category, enums.BENEFIT_PLAN_CATEGORY)
            },
            { key: 'planYear', label: 'Year', sortKey: 'planYear', filterKey: 'planYear' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        BenefitEnrollment: [
            { key: 'enrollmentId', label: 'ID', sortKey: 'enrollmentId', filterKey: 'enrollmentId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'planId', label: 'Plan', sortKey: 'planId', filterKey: 'planId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.ENROLLMENT_STATUS_VALUES,
                render: (item) => internal.renderEnrollmentStatus(item.status)
            },
            {
                key: 'reason',
                label: 'Reason',
                sortKey: 'reason',
                filterKey: 'reason',
                enumValues: enums.ENROLLMENT_REASON_VALUES,
                render: (item) => renderEnum(item.reason, enums.ENROLLMENT_REASON)
            },
            {
                key: 'coverageStartDate',
                label: 'Coverage Start',
                sortKey: 'coverageStartDate',
                render: (item) => renderDate(item.coverageStartDate)
            },
            {
                key: 'employeeCostPerPeriod',
                label: 'Employee Cost',
                sortKey: 'employeeCostPerPeriod',
                render: (item) => renderMoney(item.employeeCostPerPeriod)
            }
        ],

        Carrier: [
            { key: 'carrierId', label: 'ID', sortKey: 'carrierId', filterKey: 'carrierId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'carrierType',
                label: 'Type',
                sortKey: 'carrierType',
                filterKey: 'carrierType',
                enumValues: enums.CARRIER_TYPE_VALUES,
                render: (item) => renderEnum(item.carrierType, enums.CARRIER_TYPE)
            },
            { key: 'phone', label: 'Phone', sortKey: 'phone', filterKey: 'phone' },
            { key: 'website', label: 'Website', sortKey: 'website', filterKey: 'website' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        Dependent: [
            { key: 'dependentId', label: 'ID', sortKey: 'dependentId', filterKey: 'dependentId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            {
                key: 'name',
                label: 'Name',
                sortKey: 'lastName',
                filterKey: 'lastName',
                render: (item) => `${escapeHtml(item.firstName || '')} ${escapeHtml(item.lastName || '')}`.trim()
            },
            {
                key: 'relationship',
                label: 'Relationship',
                sortKey: 'relationship',
                filterKey: 'relationship',
                enumValues: enums.DEPENDENT_RELATIONSHIP_VALUES,
                render: (item) => renderEnum(item.relationship, enums.DEPENDENT_RELATIONSHIP)
            },
            {
                key: 'dateOfBirth',
                label: 'Date of Birth',
                sortKey: 'dateOfBirth',
                render: (item) => renderDate(item.dateOfBirth)
            },
            {
                key: 'verificationStatus',
                label: 'Verified',
                sortKey: 'verificationStatus',
                filterKey: 'verificationStatus',
                enumValues: enums.VERIFICATION_STATUS_VALUES,
                render: (item) => internal.renderVerificationStatus(item.verificationStatus)
            }
        ],

        LifeEvent: [
            { key: 'lifeEventId', label: 'ID', sortKey: 'lifeEventId', filterKey: 'lifeEventId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            {
                key: 'eventType',
                label: 'Event Type',
                sortKey: 'eventType',
                filterKey: 'eventType',
                enumValues: enums.LIFE_EVENT_TYPE_VALUES,
                render: (item) => renderEnum(item.eventType, enums.LIFE_EVENT_TYPE)
            },
            {
                key: 'eventDate',
                label: 'Event Date',
                sortKey: 'eventDate',
                render: (item) => renderDate(item.eventDate)
            },
            {
                key: 'enrollmentDeadline',
                label: 'Deadline',
                sortKey: 'enrollmentDeadline',
                render: (item) => renderDate(item.enrollmentDeadline)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.LIFE_EVENT_STATUS_VALUES,
                render: (item) => internal.renderLifeEventStatus(item.status)
            }
        ],

        COBRAEvent: [
            { key: 'cobraEventId', label: 'ID', sortKey: 'cobraEventId', filterKey: 'cobraEventId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            {
                key: 'eventType',
                label: 'Event Type',
                sortKey: 'eventType',
                filterKey: 'eventType',
                enumValues: enums.COBRA_EVENT_TYPE_VALUES,
                render: (item) => renderEnum(item.eventType, enums.COBRA_EVENT_TYPE)
            },
            {
                key: 'qualifyingEventDate',
                label: 'Event Date',
                sortKey: 'qualifyingEventDate',
                render: (item) => renderDate(item.qualifyingEventDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.COBRA_STATUS_VALUES,
                render: (item) => internal.renderCOBRAStatus(item.status)
            },
            { key: 'coverageMonths', label: 'Months', sortKey: 'coverageMonths' },
            {
                key: 'totalMonthlyCost',
                label: 'Monthly Cost',
                sortKey: 'totalMonthlyCost',
                render: (item) => renderMoney(item.totalMonthlyCost)
            }
        ]
    };

    // ============================================================================
    // EXPORT COLUMNS TO NAMESPACE
    // ============================================================================

    window.Benefits.columns = BENEFITS_COLUMNS;

})();
