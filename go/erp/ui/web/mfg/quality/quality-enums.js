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
// Manufacturing Quality Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8DRenderers;

    window.MfgQuality = window.MfgQuality || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const INSPECTION_TYPE = factory.simple([
        'Unspecified', 'Incoming', 'In-Process', 'Final', 'Receiving', 'Periodic'
    ]);

    const INSPECTION_RESULT = factory.create([
        ['Unspecified', null, ''],
        ['Pass', 'pass', 'layer8d-status-active'],
        ['Fail', 'fail', 'layer8d-status-terminated'],
        ['Conditional', 'conditional', 'layer8d-status-pending'],
        ['Pending', 'pending', 'layer8d-status-inactive']
    ]);

    const NCR_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Open', 'open', 'layer8d-status-pending'],
        ['Under Investigation', 'investigation', 'layer8d-status-active'],
        ['Pending Disposition', 'disposition', 'layer8d-status-pending'],
        ['In Corrective Action', 'corrective', 'layer8d-status-active'],
        ['Closed', 'closed', 'layer8d-status-inactive'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    const NCR_DISPOSITION = factory.simple([
        'Unspecified', 'Use As Is', 'Rework', 'Repair', 'Scrap',
        'Return to Vendor', 'Deviate'
    ]);

    const NCR_SEVERITY = factory.create([
        ['Unspecified', null, ''],
        ['Critical', 'critical', 'layer8d-status-terminated'],
        ['Major', 'major', 'layer8d-status-pending'],
        ['Minor', 'minor', 'layer8d-status-inactive'],
        ['Cosmetic', 'cosmetic', 'layer8d-status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MfgQuality.enums = {
        INSPECTION_TYPE: INSPECTION_TYPE.enum,
        INSPECTION_RESULT: INSPECTION_RESULT.enum,
        INSPECTION_RESULT_CLASSES: INSPECTION_RESULT.classes,
        NCR_STATUS: NCR_STATUS.enum,
        NCR_STATUS_CLASSES: NCR_STATUS.classes,
        NCR_DISPOSITION: NCR_DISPOSITION.enum,
        NCR_SEVERITY: NCR_SEVERITY.enum,
        NCR_SEVERITY_CLASSES: NCR_SEVERITY.classes,
        BOM_STATUS: window.MfgEngineering.enums.BOM_STATUS
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    MfgQuality.render = {
        inspectionType: (v) => renderEnum(v, INSPECTION_TYPE.enum),
        inspectionResult: createStatusRenderer(INSPECTION_RESULT.enum, INSPECTION_RESULT.classes),
        ncrStatus: createStatusRenderer(NCR_STATUS.enum, NCR_STATUS.classes),
        ncrDisposition: (v) => renderEnum(v, NCR_DISPOSITION.enum),
        ncrSeverity: createStatusRenderer(NCR_SEVERITY.enum, NCR_SEVERITY.classes),
        date: renderDate
    };

})();
