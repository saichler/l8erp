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
// Uses Layer8EnumFactory for reduced boilerplate

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;

    // Create CoreHR namespace
    window.CoreHR = window.CoreHR || {};
    CoreHR.enums = {};

    // ============================================================================
    // EMPLOYMENT STATUS (with values and classes)
    // ============================================================================
    const EMPLOYMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'layer8d-status-active'],
        ['Inactive', 'inactive', 'layer8d-status-inactive'],
        ['On Leave', 'leave', 'layer8d-status-pending'],
        ['Terminated', 'terminated', 'layer8d-status-terminated'],
        ['Retired', 'retired', 'layer8d-status-inactive'],
        ['Suspended', 'suspended', 'layer8d-status-terminated'],
        ['Pending', 'pending', 'layer8d-status-pending']
    ]);
    CoreHR.enums.EMPLOYMENT_STATUS = EMPLOYMENT_STATUS.enum;
    CoreHR.enums.EMPLOYMENT_STATUS_VALUES = EMPLOYMENT_STATUS.values;
    CoreHR.enums.EMPLOYMENT_STATUS_CLASSES = EMPLOYMENT_STATUS.classes;

    // ============================================================================
    // EMPLOYMENT TYPE (with values and aliases)
    // ============================================================================
    const EMPLOYMENT_TYPE = factory.withValues([
        ['Unspecified', null],
        ['Full-Time', 'full-time'],
        ['Full-Time', 'fulltime'],
        ['Part-Time', 'part-time'],
        ['Part-Time', 'parttime'],
        ['Contract', 'contract'],
        ['Temporary', 'temporary'],
        ['Temporary', 'temp'],
        ['Intern', 'intern'],
        ['Seasonal', 'seasonal'],
        ['Consultant', 'consultant']
    ]);
    CoreHR.enums.EMPLOYMENT_TYPE = EMPLOYMENT_TYPE.enum;
    CoreHR.enums.EMPLOYMENT_TYPE_VALUES = EMPLOYMENT_TYPE.values;

    // ============================================================================
    // PERSONAL ENUMS (simple, no values/classes needed)
    // ============================================================================
    CoreHR.enums.GENDER = factory.simple([
        'Unspecified', 'Male', 'Female', 'Non-Binary', 'Other', 'Prefer Not to Say'
    ]).enum;

    CoreHR.enums.MARITAL_STATUS = factory.simple([
        'Unspecified', 'Single', 'Married', 'Divorced', 'Widowed', 'Domestic Partnership', 'Separated'
    ]).enum;

    // ============================================================================
    // ORGANIZATION TYPE (with values and aliases)
    // ============================================================================
    const ORGANIZATION_TYPE = factory.withValues([
        ['Unspecified', null],
        ['Company', 'company'],
        ['Division', 'division'],
        ['Business Unit', 'business'],
        ['Business Unit', 'unit'],
        ['Region', 'region'],
        ['Cost Center', 'cost'],
        ['Legal Entity', 'legal']
    ]);
    CoreHR.enums.ORGANIZATION_TYPE = ORGANIZATION_TYPE.enum;
    CoreHR.enums.ORGANIZATION_TYPE_VALUES = ORGANIZATION_TYPE.values;

    // ============================================================================
    // POSITION STATUS (with values and classes)
    // ============================================================================
    const POSITION_STATUS = factory.status([
        ['Unspecified', null, ''],
        ['Open', 'open', 'pending'],
        ['Filled', 'filled', 'active'],
        ['Frozen', 'frozen', 'inactive'],
        ['Eliminated', 'eliminated', 'terminated']
    ]);
    CoreHR.enums.POSITION_STATUS = POSITION_STATUS.enum;
    CoreHR.enums.POSITION_STATUS_VALUES = POSITION_STATUS.values;
    CoreHR.enums.POSITION_STATUS_CLASSES = POSITION_STATUS.classes;

    // ============================================================================
    // DOCUMENT TYPE (simple with non-sequential last value)
    // ============================================================================
    // Note: Document type has special index 99 for 'Other' - using manual definition
    CoreHR.enums.DOCUMENT_TYPE = {
        0: 'Unspecified', 1: 'Resume', 2: 'ID Card', 3: 'Passport', 4: 'Drivers License',
        5: 'Work Permit', 6: 'Visa', 7: 'I-9 Form', 8: 'W-4 Form', 9: 'Offer Letter',
        10: 'Contract', 11: 'NDA', 12: 'Certification', 13: 'Degree', 14: 'Performance Review',
        99: 'Other'
    };

    // ============================================================================
    // COMPLIANCE TYPE (simple)
    // ============================================================================
    CoreHR.enums.COMPLIANCE_TYPE = factory.simple([
        'Unspecified', 'I-9', 'EEO', 'VETS-4212', 'ADA', 'Background Check',
        'Drug Test', 'License Verification', 'Education Verification', 'Work Authorization'
    ]).enum;

    // ============================================================================
    // STATUS RENDERERS
    // ============================================================================
    CoreHR.render = {};
    CoreHR.render.employmentStatus = Layer8DRenderers.createStatusRenderer(
        CoreHR.enums.EMPLOYMENT_STATUS, CoreHR.enums.EMPLOYMENT_STATUS_CLASSES
    );
    CoreHR.render.positionStatus = Layer8DRenderers.createStatusRenderer(
        CoreHR.enums.POSITION_STATUS, CoreHR.enums.POSITION_STATUS_CLASSES
    );
    CoreHR.render.employmentType = (type) => Layer8DRenderers.renderEnum(type, CoreHR.enums.EMPLOYMENT_TYPE);
    CoreHR.render.orgType = (type) => Layer8DRenderers.renderEnum(type, CoreHR.enums.ORGANIZATION_TYPE);
    CoreHR.render.documentType = (type) => Layer8DRenderers.renderEnum(type, CoreHR.enums.DOCUMENT_TYPE);
    CoreHR.render.complianceType = (type) => Layer8DRenderers.renderEnum(type, CoreHR.enums.COMPLIANCE_TYPE);
    CoreHR.render.boolean = Layer8DRenderers.renderBoolean;
    CoreHR.render.date = Layer8DRenderers.renderDate;

})();
