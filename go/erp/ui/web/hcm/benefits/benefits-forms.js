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
// Benefits Module - Form Definitions
// Part 3 of 4 - Load after benefits-columns.js

(function() {
    'use strict';

    // Get enums from benefits-enums.js
    const enums = window.Benefits.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    const BENEFITS_FORMS = {
        BenefitPlan: {
            title: 'Benefit Plan',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'organizationId', label: 'Organization', type: 'reference', lookupModel: 'Organization' },
                        { key: 'carrierId', label: 'Carrier', type: 'reference', lookupModel: 'Carrier' },
                        { key: 'planType', label: 'Plan Type', type: 'select', options: enums.BENEFIT_PLAN_TYPE, required: true },
                        { key: 'category', label: 'Category', type: 'select', options: enums.BENEFIT_PLAN_CATEGORY, required: true },
                        { key: 'planYear', label: 'Plan Year', type: 'number', required: true }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'openEnrollmentStart', label: 'Open Enrollment Start', type: 'date' },
                        { key: 'openEnrollmentEnd', label: 'Open Enrollment End', type: 'date' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Documents',
                    fields: [
                        { key: 'planDocumentUrl', label: 'Plan Document URL', type: 'url' },
                        { key: 'summaryDocumentUrl', label: 'Summary Document URL', type: 'url' }
                    ]
                }
            ]
        },

        BenefitEnrollment: {
            title: 'Benefit Enrollment',
            sections: [
                {
                    title: 'Enrollment Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'planId', label: 'Benefit Plan', type: 'reference', lookupModel: 'BenefitPlan', required: true },
                        { key: 'coverageOptionId', label: 'Coverage Option', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ENROLLMENT_STATUS, required: true },
                        { key: 'reason', label: 'Reason', type: 'select', options: enums.ENROLLMENT_REASON, required: true },
                        { key: 'lifeEventId', label: 'Life Event', type: 'reference', lookupModel: 'LifeEvent' }
                    ]
                },
                {
                    title: 'Coverage Dates',
                    fields: [
                        { key: 'coverageStartDate', label: 'Coverage Start', type: 'date', required: true },
                        { key: 'coverageEndDate', label: 'Coverage End', type: 'date' },
                        { key: 'enrollmentDate', label: 'Enrollment Date', type: 'date' }
                    ]
                },
                {
                    title: 'Primary Care (Medical Plans)',
                    fields: [
                        { key: 'primaryCareProvider', label: 'Primary Care Provider', type: 'text' },
                        { key: 'primaryCareProviderId', label: 'Provider ID', type: 'text' }
                    ]
                }
            ]
        },

        Carrier: {
            title: 'Carrier',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'carrierType', label: 'Type', type: 'select', options: enums.CARRIER_TYPE, required: true },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Contact Information',
                    fields: [
                        { key: 'phone', label: 'Phone', type: 'phone' },
                        { key: 'fax', label: 'Fax', type: 'phone' },
                        { key: 'email', label: 'Email', type: 'email' },
                        { key: 'website', label: 'Website', type: 'url' },
                        { key: 'contactName', label: 'Contact Name', type: 'text' }
                    ]
                },
                {
                    title: 'Account Information',
                    fields: [
                        { key: 'employerGroupNumber', label: 'Employer Group Number', type: 'text' },
                        { key: 'billingAccountNumber', label: 'Billing Account Number', type: 'text' },
                        { key: 'ediPayerId', label: 'EDI Payer ID', type: 'text' }
                    ]
                }
            ]
        },

        Dependent: {
            title: 'Dependent',
            sections: [
                {
                    title: 'Personal Information',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'firstName', label: 'First Name', type: 'text', required: true },
                        { key: 'middleName', label: 'Middle Name', type: 'text' },
                        { key: 'lastName', label: 'Last Name', type: 'text', required: true },
                        { key: 'relationship', label: 'Relationship', type: 'select', options: enums.DEPENDENT_RELATIONSHIP, required: true },
                        { key: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
                        { key: 'gender', label: 'Gender', type: 'select', options: { 0: 'Unspecified', 1: 'Male', 2: 'Female', 3: 'Non-Binary', 4: 'Other', 5: 'Prefer Not to Say' } }
                    ]
                },
                {
                    title: 'Additional Information',
                    fields: [
                        { key: 'isStudent', label: 'Student', type: 'checkbox' },
                        { key: 'isDisabled', label: 'Disabled', type: 'checkbox' },
                        { key: 'isTobaccoUser', label: 'Tobacco User', type: 'checkbox' },
                        { key: 'coverageEndDate', label: 'Coverage End Date', type: 'date' },
                        { key: 'verificationStatus', label: 'Verification Status', type: 'select', options: enums.VERIFICATION_STATUS }
                    ]
                }
            ]
        },

        LifeEvent: {
            title: 'Life Event',
            sections: [
                {
                    title: 'Event Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'eventType', label: 'Event Type', type: 'select', options: enums.LIFE_EVENT_TYPE, required: true },
                        { key: 'eventDate', label: 'Event Date', type: 'date', required: true },
                        { key: 'reportedDate', label: 'Reported Date', type: 'date' },
                        { key: 'enrollmentDeadline', label: 'Enrollment Deadline', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.LIFE_EVENT_STATUS, required: true },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                },
                {
                    title: 'Approval',
                    fields: [
                        { key: 'approvedBy', label: 'Approved By', type: 'text' },
                        { key: 'approvedDate', label: 'Approved Date', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        COBRAEvent: {
            title: 'COBRA Event',
            sections: [
                {
                    title: 'Event Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'eventType', label: 'Event Type', type: 'select', options: enums.COBRA_EVENT_TYPE, required: true },
                        { key: 'qualifyingEventDate', label: 'Qualifying Event Date', type: 'date', required: true },
                        { key: 'notificationDate', label: 'Notification Date', type: 'date' },
                        { key: 'electionDeadline', label: 'Election Deadline', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.COBRA_STATUS, required: true }
                    ]
                },
                {
                    title: 'Coverage Period',
                    fields: [
                        { key: 'coverageStartDate', label: 'Coverage Start', type: 'date' },
                        { key: 'coverageEndDate', label: 'Coverage End', type: 'date' },
                        { key: 'coverageMonths', label: 'Coverage Months', type: 'number' }
                    ]
                },
                {
                    title: 'Premium Information',
                    fields: [
                        { key: 'adminFeePercentage', label: 'Admin Fee', type: 'percentage' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    const BENEFITS_PRIMARY_KEYS = {
        BenefitPlan: 'planId',
        BenefitEnrollment: 'enrollmentId',
        Carrier: 'carrierId',
        Dependent: 'dependentId',
        LifeEvent: 'lifeEventId',
        COBRAEvent: 'cobraEventId'
    };

    // ============================================================================
    // EXPORT FORMS TO NAMESPACE
    // ============================================================================

    window.Benefits.forms = BENEFITS_FORMS;
    window.Benefits.primaryKeys = BENEFITS_PRIMARY_KEYS;

})();
