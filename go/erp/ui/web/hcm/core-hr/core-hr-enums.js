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
// Core HR Module - Enum Definitions
// All enum constants and value mappings for Core HR models

(function() {
    'use strict';

    // Create CoreHR namespace
    window.CoreHR = window.CoreHR || {};
    CoreHR.enums = {};

    // ============================================================================
    // EMPLOYMENT STATUS
    // ============================================================================

    CoreHR.enums.EMPLOYMENT_STATUS = {
        0: 'Unspecified',
        1: 'Active',
        2: 'Inactive',
        3: 'On Leave',
        4: 'Terminated',
        5: 'Retired',
        6: 'Suspended',
        7: 'Pending'
    };

    CoreHR.enums.EMPLOYMENT_STATUS_VALUES = {
        'active': 1,
        'inactive': 2,
        'leave': 3,
        'terminated': 4,
        'retired': 5,
        'suspended': 6,
        'pending': 7
    };

    CoreHR.enums.EMPLOYMENT_STATUS_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-inactive',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-inactive',
        6: 'layer8d-status-terminated',
        7: 'layer8d-status-pending'
    };

    // ============================================================================
    // EMPLOYMENT TYPE
    // ============================================================================

    CoreHR.enums.EMPLOYMENT_TYPE = {
        0: 'Unspecified',
        1: 'Full-Time',
        2: 'Part-Time',
        3: 'Contract',
        4: 'Temporary',
        5: 'Intern',
        6: 'Seasonal',
        7: 'Consultant'
    };

    CoreHR.enums.EMPLOYMENT_TYPE_VALUES = {
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

    CoreHR.enums.GENDER = {
        0: 'Unspecified',
        1: 'Male',
        2: 'Female',
        3: 'Non-Binary',
        4: 'Other',
        5: 'Prefer Not to Say'
    };

    CoreHR.enums.MARITAL_STATUS = {
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

    CoreHR.enums.ORGANIZATION_TYPE = {
        0: 'Unspecified',
        1: 'Company',
        2: 'Division',
        3: 'Business Unit',
        4: 'Region',
        5: 'Cost Center',
        6: 'Legal Entity'
    };

    CoreHR.enums.ORGANIZATION_TYPE_VALUES = {
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

    CoreHR.enums.POSITION_STATUS = {
        0: 'Unspecified',
        1: 'Open',
        2: 'Filled',
        3: 'Frozen',
        4: 'Eliminated'
    };

    CoreHR.enums.POSITION_STATUS_VALUES = {
        'open': 1,
        'filled': 2,
        'frozen': 3,
        'eliminated': 4
    };

    CoreHR.enums.POSITION_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive',
        4: 'layer8d-status-terminated'
    };

    // ============================================================================
    // DOCUMENT TYPE
    // ============================================================================

    CoreHR.enums.DOCUMENT_TYPE = {
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

    // ============================================================================
    // COMPLIANCE TYPE
    // ============================================================================

    CoreHR.enums.COMPLIANCE_TYPE = {
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

    // ============================================================================
    // STATUS RENDERERS
    // ============================================================================

    // Create render functions using shared utilities
    CoreHR.render = {};

    CoreHR.render.employmentStatus = Layer8DRenderers.createStatusRenderer(
        CoreHR.enums.EMPLOYMENT_STATUS,
        CoreHR.enums.EMPLOYMENT_STATUS_CLASSES
    );

    CoreHR.render.positionStatus = Layer8DRenderers.createStatusRenderer(
        CoreHR.enums.POSITION_STATUS,
        CoreHR.enums.POSITION_STATUS_CLASSES
    );

    CoreHR.render.employmentType = (type) => Layer8DRenderers.renderEnum(type, CoreHR.enums.EMPLOYMENT_TYPE);
    CoreHR.render.orgType = (type) => Layer8DRenderers.renderEnum(type, CoreHR.enums.ORGANIZATION_TYPE);
    CoreHR.render.documentType = (type) => Layer8DRenderers.renderEnum(type, CoreHR.enums.DOCUMENT_TYPE);
    CoreHR.render.complianceType = (type) => Layer8DRenderers.renderEnum(type, CoreHR.enums.COMPLIANCE_TYPE);
    CoreHR.render.boolean = Layer8DRenderers.renderBoolean;
    CoreHR.render.date = Layer8DRenderers.renderDate;

})();
