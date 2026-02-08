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
 * Mobile Benefits Module - Column Configurations
 * Desktop Equivalent: hcm/benefits/benefits-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileBenefits.enums;
    const render = MobileBenefits.render;

    MobileBenefits.columns = {
        BenefitPlan: [
            ...col.id('planId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.status('planType', 'Type', enums.BENEFIT_PLAN_TYPE_VALUES, render.benefitPlanType),
            ...col.status('category', 'Category', enums.BENEFIT_PLAN_CATEGORY_VALUES, render.benefitPlanCategory),
            ...col.col('planYear', 'Year'),
            ...col.boolean('isActive', 'Active')
        ],

        BenefitEnrollment: [
            ...col.id('enrollmentId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('planId', 'Plan'),
            ...col.status('status', 'Status', enums.ENROLLMENT_STATUS_VALUES, render.enrollmentStatus),
            ...col.status('reason', 'Reason', enums.ENROLLMENT_REASON_VALUES, render.enrollmentReason),
            ...col.date('coverageStartDate', 'Coverage Start'),
            ...col.money('employeeCostPerPeriod', 'Employee Cost'),
            ...col.custom('coveredDependentIds', 'Dependents', (item) => item.coveredDependentIds ? item.coveredDependentIds.length : 0)
        ],

        Carrier: [
            ...col.id('carrierId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.status('carrierType', 'Type', enums.CARRIER_TYPE_VALUES, render.carrierType),
            ...col.col('phone', 'Phone'),
            ...col.col('website', 'Website'),
            ...col.boolean('isActive', 'Active')
        ],

        Dependent: [
            ...col.id('dependentId'),
            ...col.col('employeeId', 'Employee'),
            ...col.custom('name', 'Name', (item) => `${Layer8MUtils.escapeHtml(item.firstName || '')} ${Layer8MUtils.escapeHtml(item.lastName || '')}`.trim(), { sortKey: 'lastName', filterKey: 'lastName' }),
            ...col.status('relationship', 'Relationship', enums.DEPENDENT_RELATIONSHIP_VALUES, render.dependentRelationship),
            ...col.date('dateOfBirth', 'Date of Birth'),
            ...col.status('verificationStatus', 'Verified', enums.VERIFICATION_STATUS_VALUES, render.verificationStatus)
        ],

        LifeEvent: [
            ...col.id('lifeEventId'),
            ...col.col('employeeId', 'Employee'),
            ...col.status('eventType', 'Event Type', enums.LIFE_EVENT_TYPE_VALUES, render.lifeEventType),
            ...col.date('eventDate', 'Event Date'),
            ...col.date('enrollmentDeadline', 'Deadline'),
            ...col.status('status', 'Status', enums.LIFE_EVENT_STATUS_VALUES, render.lifeEventStatus)
        ],

        COBRAEvent: [
            ...col.id('cobraEventId'),
            ...col.col('employeeId', 'Employee'),
            ...col.status('eventType', 'Event Type', enums.COBRA_EVENT_TYPE_VALUES, render.cobraEventType),
            ...col.date('qualifyingEventDate', 'Event Date'),
            ...col.status('status', 'Status', enums.COBRA_STATUS_VALUES, render.cobraStatus),
            ...col.col('coverageMonths', 'Months'),
            ...col.money('totalMonthlyCost', 'Monthly Cost')
        ]
    };

    MobileBenefits.primaryKeys = {
        BenefitPlan: 'planId', BenefitEnrollment: 'enrollmentId', Carrier: 'carrierId',
        Dependent: 'dependentId', LifeEvent: 'lifeEventId', COBRAEvent: 'cobraEventId'
    };

})();
