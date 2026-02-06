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
 * Mobile Manufacturing Quality Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: mfg/quality/quality-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8MRenderers;

    window.MobileMfgQuality = window.MobileMfgQuality || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const INSPECTION_TYPE = factory.simple([
        'Unspecified', 'Incoming', 'In-Process', 'Final', 'Receiving', 'Periodic'
    ]);

    const INSPECTION_RESULT = factory.create([
        ['Unspecified', null, ''],
        ['Pass', 'pass', 'status-active'],
        ['Fail', 'fail', 'status-terminated'],
        ['Conditional', 'conditional', 'status-pending'],
        ['Pending', 'pending', 'status-inactive']
    ]);

    const NCR_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Open', 'open', 'status-pending'],
        ['Under Investigation', 'investigation', 'status-active'],
        ['Pending Disposition', 'disposition', 'status-pending'],
        ['In Corrective Action', 'corrective', 'status-active'],
        ['Closed', 'closed', 'status-inactive'],
        ['Cancelled', 'cancelled', 'status-inactive']
    ]);

    const NCR_DISPOSITION = factory.simple([
        'Unspecified', 'Use As Is', 'Rework', 'Repair', 'Scrap', 'Return to Vendor', 'Deviate'
    ]);

    const NCR_SEVERITY = factory.create([
        ['Unspecified', null, ''],
        ['Critical', 'critical', 'status-terminated'],
        ['Major', 'major', 'status-pending'],
        ['Minor', 'minor', 'status-inactive'],
        ['Cosmetic', 'cosmetic', 'status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileMfgQuality.enums = {
        INSPECTION_TYPE: INSPECTION_TYPE.enum,
        INSPECTION_RESULT: INSPECTION_RESULT.enum,
        INSPECTION_RESULT_VALUES: INSPECTION_RESULT.values,
        INSPECTION_RESULT_CLASSES: INSPECTION_RESULT.classes,
        NCR_STATUS: NCR_STATUS.enum,
        NCR_STATUS_VALUES: NCR_STATUS.values,
        NCR_STATUS_CLASSES: NCR_STATUS.classes,
        NCR_DISPOSITION: NCR_DISPOSITION.enum,
        NCR_SEVERITY: NCR_SEVERITY.enum,
        NCR_SEVERITY_VALUES: NCR_SEVERITY.values,
        NCR_SEVERITY_CLASSES: NCR_SEVERITY.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileMfgQuality.render = {
        inspectionType: (type) => renderEnum(type, INSPECTION_TYPE.enum),
        inspectionResult: createStatusRenderer(INSPECTION_RESULT.enum, INSPECTION_RESULT.classes),
        ncrStatus: createStatusRenderer(NCR_STATUS.enum, NCR_STATUS.classes),
        ncrSeverity: createStatusRenderer(NCR_SEVERITY.enum, NCR_SEVERITY.classes),
        ncrDisposition: (disp) => renderEnum(disp, NCR_DISPOSITION.enum),
        date: renderDate
    };

})();
