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

    const col = window.Layer8ColumnFactory;
    const { escapeHtml } = Layer8DUtils;
    const { renderEnum } = Layer8DRenderers;
    const enums = window.Benefits.enums;
    const internal = window.Benefits._internal;

    window.Benefits.columns = {
        BenefitPlan: [
            ...col.id('planId'),
            ...col.basic(['code', 'name']),
            ...col.enum('planType', 'Type', enums.BENEFIT_PLAN_TYPE_VALUES, (v) => renderEnum(v, enums.BENEFIT_PLAN_TYPE)),
            ...col.enum('category', 'Category', enums.BENEFIT_PLAN_CATEGORY_VALUES, (v) => renderEnum(v, enums.BENEFIT_PLAN_CATEGORY)),
            ...col.col('planYear', 'Year'),
            ...col.boolean('isActive', 'Active')
        ],

        BenefitEnrollment: [
            ...col.id('enrollmentId'),
            ...col.basic([['employeeId', 'Employee'], ['planId', 'Plan']]),
            ...col.enum('status', 'Status', enums.ENROLLMENT_STATUS_VALUES, internal.renderEnrollmentStatus),
            ...col.enum('reason', 'Reason', enums.ENROLLMENT_REASON_VALUES, (v) => renderEnum(v, enums.ENROLLMENT_REASON)),
            ...col.date('coverageStartDate', 'Coverage Start'),
            ...col.money('employeeCostPerPeriod', 'Employee Cost'),
            ...col.custom('coveredDependentIds', 'Dependents', (item) => item.coveredDependentIds ? item.coveredDependentIds.length : 0, { sortKey: false })
        ],

        Carrier: [
            ...col.id('carrierId'),
            ...col.basic(['code', 'name']),
            ...col.enum('carrierType', 'Type', enums.CARRIER_TYPE_VALUES, (v) => renderEnum(v, enums.CARRIER_TYPE)),
            ...col.basic(['phone', 'website']),
            ...col.boolean('isActive', 'Active')
        ],

        Dependent: [
            ...col.id('dependentId'),
            ...col.col('employeeId', 'Employee'),
            ...col.custom('name', 'Name', (item) => `${escapeHtml(item.firstName || '')} ${escapeHtml(item.lastName || '')}`.trim(), { sortKey: 'lastName', filterKey: 'lastName' }),
            ...col.enum('relationship', 'Relationship', enums.DEPENDENT_RELATIONSHIP_VALUES, (v) => renderEnum(v, enums.DEPENDENT_RELATIONSHIP)),
            ...col.date('dateOfBirth', 'Date of Birth'),
            ...col.enum('verificationStatus', 'Verified', enums.VERIFICATION_STATUS_VALUES, internal.renderVerificationStatus)
        ],

        LifeEvent: [
            ...col.id('lifeEventId'),
            ...col.col('employeeId', 'Employee'),
            ...col.enum('eventType', 'Event Type', enums.LIFE_EVENT_TYPE_VALUES, (v) => renderEnum(v, enums.LIFE_EVENT_TYPE)),
            ...col.date('eventDate', 'Event Date'),
            ...col.date('enrollmentDeadline', 'Deadline'),
            ...col.enum('status', 'Status', enums.LIFE_EVENT_STATUS_VALUES, internal.renderLifeEventStatus)
        ],

        COBRAEvent: [
            ...col.id('cobraEventId'),
            ...col.col('employeeId', 'Employee'),
            ...col.enum('eventType', 'Event Type', enums.COBRA_EVENT_TYPE_VALUES, (v) => renderEnum(v, enums.COBRA_EVENT_TYPE)),
            ...col.date('qualifyingEventDate', 'Event Date'),
            ...col.enum('status', 'Status', enums.COBRA_STATUS_VALUES, internal.renderCOBRAStatus),
            ...col.col('coverageMonths', 'Months'),
            ...col.money('totalMonthlyCost', 'Monthly Cost')
        ]
    };
})();
