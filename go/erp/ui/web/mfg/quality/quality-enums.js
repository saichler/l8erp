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
// Manufacturing Quality Module - Enum Definitions

(function() {
    'use strict';

    window.MfgQuality = window.MfgQuality || {};
    MfgQuality.enums = {};

    // INSPECTION TYPE
    MfgQuality.enums.INSPECTION_TYPE = {
        0: 'Unspecified',
        1: 'Incoming',
        2: 'In-Process',
        3: 'Final',
        4: 'Receiving',
        5: 'Periodic'
    };

    // INSPECTION RESULT
    MfgQuality.enums.INSPECTION_RESULT = {
        0: 'Unspecified',
        1: 'Pass',
        2: 'Fail',
        3: 'Conditional',
        4: 'Pending'
    };

    MfgQuality.enums.INSPECTION_RESULT_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-terminated',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-inactive'
    };

    // NCR STATUS
    MfgQuality.enums.NCR_STATUS = {
        0: 'Unspecified',
        1: 'Open',
        2: 'Under Investigation',
        3: 'Pending Disposition',
        4: 'In Corrective Action',
        5: 'Closed',
        6: 'Cancelled'
    };

    MfgQuality.enums.NCR_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-active',
        5: 'layer8d-status-inactive',
        6: 'layer8d-status-inactive'
    };

    // NCR DISPOSITION
    MfgQuality.enums.NCR_DISPOSITION = {
        0: 'Unspecified',
        1: 'Use As Is',
        2: 'Rework',
        3: 'Repair',
        4: 'Scrap',
        5: 'Return to Vendor',
        6: 'Deviate'
    };

    // NCR SEVERITY
    MfgQuality.enums.NCR_SEVERITY = {
        0: 'Unspecified',
        1: 'Critical',
        2: 'Major',
        3: 'Minor',
        4: 'Cosmetic'
    };

    MfgQuality.enums.NCR_SEVERITY_CLASSES = {
        1: 'layer8d-status-terminated',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-inactive',
        4: 'layer8d-status-inactive'
    };

    // RENDERERS
    MfgQuality.render = {};

    MfgQuality.render.inspectionType = function(type) {
        return MfgQuality.enums.INSPECTION_TYPE[type] || 'Unknown';
    };

    MfgQuality.render.inspectionResult = Layer8DRenderers.createStatusRenderer(
        MfgQuality.enums.INSPECTION_RESULT,
        MfgQuality.enums.INSPECTION_RESULT_CLASSES
    );

    MfgQuality.render.ncrStatus = Layer8DRenderers.createStatusRenderer(
        MfgQuality.enums.NCR_STATUS,
        MfgQuality.enums.NCR_STATUS_CLASSES
    );

    MfgQuality.render.ncrSeverity = Layer8DRenderers.createStatusRenderer(
        MfgQuality.enums.NCR_SEVERITY,
        MfgQuality.enums.NCR_SEVERITY_CLASSES
    );

    MfgQuality.render.date = Layer8DRenderers.renderDate;

})();
