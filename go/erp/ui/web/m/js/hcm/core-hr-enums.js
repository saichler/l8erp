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
 * Mobile Core HR Module - Enum Definitions
 * Desktop Equivalent: hcm/core-hr/core-hr-enums.js
 */
(function() {
    'use strict';

    window.MobileCoreHR = window.MobileCoreHR || {};
    MobileCoreHR.enums = {};

    // ============================================================================
    // EMPLOYMENT STATUS
    // ============================================================================

    MobileCoreHR.enums.EMPLOYMENT_STATUS = {
        0: 'Unspecified',
        1: 'Active',
        2: 'Inactive',
        3: 'On Leave',
        4: 'Terminated',
        5: 'Retired',
        6: 'Suspended',
        7: 'Pending'
    };

    MobileCoreHR.enums.EMPLOYMENT_STATUS_VALUES = {
        'active': 1,
        'inactive': 2,
        'leave': 3,
        'terminated': 4,
        'retired': 5,
        'suspended': 6,
        'pending': 7
    };

    MobileCoreHR.enums.EMPLOYMENT_STATUS_CLASSES = {
        1: 'status-active',
        2: 'status-inactive',
        3: 'status-pending',
        4: 'status-terminated',
        5: 'status-inactive',
        6: 'status-terminated',
        7: 'status-pending'
    };

    // ============================================================================
    // EMPLOYMENT TYPE
    // ============================================================================

    MobileCoreHR.enums.EMPLOYMENT_TYPE = {
        0: 'Unspecified',
        1: 'Full-Time',
        2: 'Part-Time',
        3: 'Contract',
        4: 'Temporary',
        5: 'Intern',
        6: 'Seasonal',
        7: 'Consultant'
    };

    MobileCoreHR.enums.EMPLOYMENT_TYPE_VALUES = {
        'full-time': 1,
        'fulltime': 1,
        'part-time': 2,
        'parttime': 2,
        'contract': 3,
        'temporary': 4,
        'temp': 4,
        'intern': 5,
        'seasonal': 6,
        'consultant': 7
    };

    // ============================================================================
    // PERSONAL ENUMS
    // ============================================================================

    MobileCoreHR.enums.GENDER = {
        0: 'Unspecified',
        1: 'Male',
        2: 'Female',
        3: 'Non-Binary',
        4: 'Other',
        5: 'Prefer Not to Say'
    };

    MobileCoreHR.enums.MARITAL_STATUS = {
        0: 'Unspecified',
        1: 'Single',
        2: 'Married',
        3: 'Divorced',
        4: 'Widowed',
        5: 'Domestic Partnership',
        6: 'Separated'
    };

    // ============================================================================
    // ORGANIZATION TYPE
    // ============================================================================

    MobileCoreHR.enums.ORGANIZATION_TYPE = {
        0: 'Unspecified',
        1: 'Company',
        2: 'Division',
        3: 'Business Unit',
        4: 'Region',
        5: 'Cost Center',
        6: 'Legal Entity'
    };

    MobileCoreHR.enums.ORGANIZATION_TYPE_VALUES = {
        'company': 1,
        'division': 2,
        'business': 3,
        'unit': 3,
        'region': 4,
        'cost': 5,
        'legal': 6
    };

    // ============================================================================
    // POSITION STATUS
    // ============================================================================

    MobileCoreHR.enums.POSITION_STATUS = {
        0: 'Unspecified',
        1: 'Open',
        2: 'Filled',
        3: 'Frozen',
        4: 'Eliminated'
    };

    MobileCoreHR.enums.POSITION_STATUS_VALUES = {
        'open': 1,
        'filled': 2,
        'frozen': 3,
        'eliminated': 4
    };

    MobileCoreHR.enums.POSITION_STATUS_CLASSES = {
        1: 'status-pending',
        2: 'status-active',
        3: 'status-inactive',
        4: 'status-terminated'
    };

    // ============================================================================
    // DOCUMENT TYPE
    // ============================================================================

    MobileCoreHR.enums.DOCUMENT_TYPE = {
        0: 'Unspecified',
        1: 'Resume',
        2: 'ID Card',
        3: 'Passport',
        4: 'Drivers License',
        5: 'Work Permit',
        6: 'Visa',
        7: 'I-9 Form',
        8: 'W-4 Form',
        9: 'Offer Letter',
        10: 'Contract',
        11: 'NDA',
        12: 'Certification',
        13: 'Degree',
        14: 'Performance Review',
        99: 'Other'
    };

    MobileCoreHR.enums.DOCUMENT_TYPE_VALUES = {
        'resume': 1,
        'id': 2,
        'passport': 3,
        'license': 4,
        'permit': 5,
        'visa': 6,
        'i-9': 7,
        'w-4': 8,
        'offer': 9,
        'contract': 10,
        'nda': 11,
        'certification': 12,
        'degree': 13,
        'review': 14,
        'other': 99
    };

    // ============================================================================
    // COMPLIANCE TYPE
    // ============================================================================

    MobileCoreHR.enums.COMPLIANCE_TYPE = {
        0: 'Unspecified',
        1: 'I-9',
        2: 'EEO',
        3: 'VETS-4212',
        4: 'ADA',
        5: 'Background Check',
        6: 'Drug Test',
        7: 'License Verification',
        8: 'Education Verification',
        9: 'Work Authorization'
    };

    MobileCoreHR.enums.COMPLIANCE_TYPE_VALUES = {
        'i-9': 1,
        'i9': 1,
        'eeo': 2,
        'vets': 3,
        'ada': 4,
        'background': 5,
        'drug': 6,
        'license': 7,
        'education': 8,
        'work': 9,
        'authorization': 9
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCoreHR.render = {
        employmentStatus: MobileRenderers.createStatusRenderer(
            MobileCoreHR.enums.EMPLOYMENT_STATUS,
            MobileCoreHR.enums.EMPLOYMENT_STATUS_CLASSES
        ),
        positionStatus: MobileRenderers.createStatusRenderer(
            MobileCoreHR.enums.POSITION_STATUS,
            MobileCoreHR.enums.POSITION_STATUS_CLASSES
        ),
        employmentType: (type) => MobileRenderers.renderEnum(type, MobileCoreHR.enums.EMPLOYMENT_TYPE),
        gender: (gender) => MobileRenderers.renderEnum(gender, MobileCoreHR.enums.GENDER),
        maritalStatus: (status) => MobileRenderers.renderEnum(status, MobileCoreHR.enums.MARITAL_STATUS),
        orgType: (type) => MobileRenderers.renderEnum(type, MobileCoreHR.enums.ORGANIZATION_TYPE),
        documentType: (type) => MobileRenderers.renderEnum(type, MobileCoreHR.enums.DOCUMENT_TYPE),
        complianceType: (type) => MobileRenderers.renderEnum(type, MobileCoreHR.enums.COMPLIANCE_TYPE),
        boolean: MobileRenderers.renderBoolean,
        date: MobileRenderers.renderDate,
        phone: MobileRenderers.renderPhone,
        ssn: MobileRenderers.renderSSN
    };

})();
