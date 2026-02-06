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
 * Mobile Benefits Module - Form Configurations
 * Desktop Equivalent: hcm/benefits/benefits-forms.js
 */
window.MobileBenefits = window.MobileBenefits || {};

(function() {
    'use strict';

    const f = window.Layer8FormFactory;
    const enums = MobileBenefits.enums;

    MobileBenefits.forms = {
        BenefitPlan: f.form('Benefit Plan', [
            f.section('Basic Information', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.reference('carrierId', 'Carrier', 'Carrier'),
                ...f.select('planType', 'Plan Type', enums.BENEFIT_PLAN_TYPE, true),
                ...f.select('category', 'Category', enums.BENEFIT_PLAN_CATEGORY, true),
                ...f.number('planYear', 'Plan Year', true)
            ]),
            f.section('Dates', [
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('endDate', 'End Date'),
                ...f.date('openEnrollmentStart', 'Open Enrollment Start'),
                ...f.date('openEnrollmentEnd', 'Open Enrollment End'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Documents', [
                ...f.url('planDocumentUrl', 'Plan Document URL'),
                ...f.url('summaryDocumentUrl', 'Summary Document URL')
            ])
        ]),

        BenefitEnrollment: f.form('Benefit Enrollment', [
            f.section('Enrollment Details', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.reference('planId', 'Benefit Plan', 'BenefitPlan', true),
                ...f.text('coverageOptionId', 'Coverage Option'),
                ...f.select('status', 'Status', enums.ENROLLMENT_STATUS, true),
                ...f.select('reason', 'Reason', enums.ENROLLMENT_REASON, true),
                ...f.reference('lifeEventId', 'Life Event', 'LifeEvent')
            ]),
            f.section('Coverage Dates', [
                ...f.date('coverageStartDate', 'Coverage Start', true),
                ...f.date('coverageEndDate', 'Coverage End'),
                ...f.date('enrollmentDate', 'Enrollment Date')
            ]),
            f.section('Primary Care (Medical Plans)', [
                ...f.text('primaryCareProvider', 'Primary Care Provider'),
                ...f.text('primaryCareProviderId', 'Provider ID')
            ])
        ]),

        Carrier: f.form('Carrier', [
            f.section('Basic Information', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.select('carrierType', 'Type', enums.CARRIER_TYPE, true),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Contact Information', [
                ...f.phone('phone', 'Phone'),
                ...f.phone('fax', 'Fax'),
                ...f.email('email', 'Email'),
                ...f.url('website', 'Website'),
                ...f.text('contactName', 'Contact Name')
            ]),
            f.section('Account Information', [
                ...f.text('employerGroupNumber', 'Employer Group Number'),
                ...f.text('billingAccountNumber', 'Billing Account Number'),
                ...f.text('ediPayerId', 'EDI Payer ID')
            ])
        ]),

        Dependent: f.form('Dependent', [
            f.section('Personal Information', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.text('firstName', 'First Name', true),
                ...f.text('middleName', 'Middle Name'),
                ...f.text('lastName', 'Last Name', true),
                ...f.select('relationship', 'Relationship', enums.DEPENDENT_RELATIONSHIP, true),
                ...f.date('dateOfBirth', 'Date of Birth', true),
                ...f.select('gender', 'Gender', { 0: 'Unspecified', 1: 'Male', 2: 'Female', 3: 'Non-Binary', 4: 'Other', 5: 'Prefer Not to Say' })
            ]),
            f.section('Additional Information', [
                ...f.checkbox('isStudent', 'Student'),
                ...f.checkbox('isDisabled', 'Disabled'),
                ...f.checkbox('isTobaccoUser', 'Tobacco User'),
                ...f.date('coverageEndDate', 'Coverage End Date'),
                ...f.select('verificationStatus', 'Verification Status', enums.VERIFICATION_STATUS)
            ])
        ]),

        LifeEvent: f.form('Life Event', [
            f.section('Event Details', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.select('eventType', 'Event Type', enums.LIFE_EVENT_TYPE, true),
                ...f.date('eventDate', 'Event Date', true),
                ...f.date('reportedDate', 'Reported Date'),
                ...f.date('enrollmentDeadline', 'Enrollment Deadline'),
                ...f.select('status', 'Status', enums.LIFE_EVENT_STATUS, true),
                ...f.textarea('description', 'Description')
            ]),
            f.section('Approval', [
                ...f.text('approvedBy', 'Approved By'),
                ...f.date('approvedDate', 'Approved Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        COBRAEvent: f.form('COBRA Event', [
            f.section('Event Details', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.select('eventType', 'Event Type', enums.COBRA_EVENT_TYPE, true),
                ...f.date('qualifyingEventDate', 'Qualifying Event Date', true),
                ...f.date('notificationDate', 'Notification Date'),
                ...f.date('electionDeadline', 'Election Deadline'),
                ...f.select('status', 'Status', enums.COBRA_STATUS, true)
            ]),
            f.section('Coverage Period', [
                ...f.date('coverageStartDate', 'Coverage Start'),
                ...f.date('coverageEndDate', 'Coverage End'),
                ...f.number('coverageMonths', 'Coverage Months')
            ]),
            f.section('Premium Information', [
                ...f.percentage('adminFeePercentage', 'Admin Fee'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

})();
