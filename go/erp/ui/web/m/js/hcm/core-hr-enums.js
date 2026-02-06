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
 * Mobile Core HR Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: hcm/core-hr/core-hr-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderPhone, renderSSN } = Layer8MRenderers;

    window.MobileCoreHR = window.MobileCoreHR || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const EMPLOYMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'status-active'],
        ['Inactive', 'inactive', 'status-inactive'],
        ['On Leave', 'leave', 'status-pending'],
        ['Terminated', 'terminated', 'status-terminated'],
        ['Retired', 'retired', 'status-inactive'],
        ['Suspended', 'suspended', 'status-terminated'],
        ['Pending', 'pending', 'status-pending']
    ]);

    const EMPLOYMENT_TYPE = factory.withValues([
        ['Unspecified', null],
        ['Full-Time', 'full-time'],
        ['Part-Time', 'part-time'],
        ['Contract', 'contract'],
        ['Temporary', 'temporary'],
        ['Intern', 'intern'],
        ['Seasonal', 'seasonal'],
        ['Consultant', 'consultant']
    ]);

    const GENDER = factory.simple([
        'Unspecified', 'Male', 'Female', 'Non-Binary', 'Other', 'Prefer Not to Say'
    ]);

    const MARITAL_STATUS = factory.simple([
        'Unspecified', 'Single', 'Married', 'Divorced', 'Widowed', 'Domestic Partnership', 'Separated'
    ]);

    const ORGANIZATION_TYPE = factory.withValues([
        ['Unspecified', null],
        ['Company', 'company'],
        ['Division', 'division'],
        ['Business Unit', 'business'],
        ['Region', 'region'],
        ['Cost Center', 'cost'],
        ['Legal Entity', 'legal']
    ]);

    const POSITION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Open', 'open', 'status-pending'],
        ['Filled', 'filled', 'status-active'],
        ['Frozen', 'frozen', 'status-inactive'],
        ['Eliminated', 'eliminated', 'status-terminated']
    ]);

    const DOCUMENT_TYPE = factory.withValues([
        ['Unspecified', null],
        ['Resume', 'resume'],
        ['ID Card', 'id'],
        ['Passport', 'passport'],
        ['Drivers License', 'license'],
        ['Work Permit', 'permit'],
        ['Visa', 'visa'],
        ['I-9 Form', 'i-9'],
        ['W-4 Form', 'w-4'],
        ['Offer Letter', 'offer'],
        ['Contract', 'contract'],
        ['NDA', 'nda'],
        ['Certification', 'certification'],
        ['Degree', 'degree'],
        ['Performance Review', 'review'],
        ['Other', 'other']
    ]);

    const COMPLIANCE_TYPE = factory.withValues([
        ['Unspecified', null],
        ['I-9', 'i-9'],
        ['EEO', 'eeo'],
        ['VETS-4212', 'vets'],
        ['ADA', 'ada'],
        ['Background Check', 'background'],
        ['Drug Test', 'drug'],
        ['License Verification', 'license'],
        ['Education Verification', 'education'],
        ['Work Authorization', 'work']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileCoreHR.enums = {
        EMPLOYMENT_STATUS: EMPLOYMENT_STATUS.enum,
        EMPLOYMENT_STATUS_VALUES: EMPLOYMENT_STATUS.values,
        EMPLOYMENT_STATUS_CLASSES: EMPLOYMENT_STATUS.classes,
        EMPLOYMENT_TYPE: EMPLOYMENT_TYPE.enum,
        EMPLOYMENT_TYPE_VALUES: EMPLOYMENT_TYPE.values,
        GENDER: GENDER.enum,
        MARITAL_STATUS: MARITAL_STATUS.enum,
        ORGANIZATION_TYPE: ORGANIZATION_TYPE.enum,
        ORGANIZATION_TYPE_VALUES: ORGANIZATION_TYPE.values,
        POSITION_STATUS: POSITION_STATUS.enum,
        POSITION_STATUS_VALUES: POSITION_STATUS.values,
        POSITION_STATUS_CLASSES: POSITION_STATUS.classes,
        DOCUMENT_TYPE: DOCUMENT_TYPE.enum,
        DOCUMENT_TYPE_VALUES: DOCUMENT_TYPE.values,
        COMPLIANCE_TYPE: COMPLIANCE_TYPE.enum,
        COMPLIANCE_TYPE_VALUES: COMPLIANCE_TYPE.values
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCoreHR.render = {
        employmentStatus: createStatusRenderer(EMPLOYMENT_STATUS.enum, EMPLOYMENT_STATUS.classes),
        positionStatus: createStatusRenderer(POSITION_STATUS.enum, POSITION_STATUS.classes),
        employmentType: (type) => renderEnum(type, EMPLOYMENT_TYPE.enum),
        gender: (gender) => renderEnum(gender, GENDER.enum),
        maritalStatus: (status) => renderEnum(status, MARITAL_STATUS.enum),
        orgType: (type) => renderEnum(type, ORGANIZATION_TYPE.enum),
        documentType: (type) => renderEnum(type, DOCUMENT_TYPE.enum),
        complianceType: (type) => renderEnum(type, COMPLIANCE_TYPE.enum),
        boolean: renderBoolean,
        date: renderDate,
        phone: renderPhone,
        ssn: renderSSN
    };

})();
