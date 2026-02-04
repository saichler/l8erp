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
 * Mobile Manufacturing Quality Module - Enum Definitions
 * Desktop Equivalent: mfg/quality/quality-enums.js
 */
(function() {
    'use strict';

    window.MobileMfgQuality = window.MobileMfgQuality || {};
    MobileMfgQuality.enums = {};

    // INSPECTION TYPE
    MobileMfgQuality.enums.INSPECTION_TYPE = {
        0: 'Unspecified', 1: 'Incoming', 2: 'In-Process', 3: 'Final', 4: 'Receiving', 5: 'Periodic'
    };

    // INSPECTION RESULT
    MobileMfgQuality.enums.INSPECTION_RESULT = {
        0: 'Unspecified', 1: 'Pass', 2: 'Fail', 3: 'Conditional', 4: 'Pending'
    };
    MobileMfgQuality.enums.INSPECTION_RESULT_CLASSES = {
        1: 'status-active', 2: 'status-terminated', 3: 'status-pending', 4: 'status-inactive'
    };

    // NCR STATUS
    MobileMfgQuality.enums.NCR_STATUS = {
        0: 'Unspecified', 1: 'Open', 2: 'Under Investigation', 3: 'Pending Disposition', 4: 'In Corrective Action', 5: 'Closed', 6: 'Cancelled'
    };
    MobileMfgQuality.enums.NCR_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-pending', 4: 'status-active', 5: 'status-inactive', 6: 'status-inactive'
    };

    // NCR DISPOSITION
    MobileMfgQuality.enums.NCR_DISPOSITION = {
        0: 'Unspecified', 1: 'Use As Is', 2: 'Rework', 3: 'Repair', 4: 'Scrap', 5: 'Return to Vendor', 6: 'Deviate'
    };

    // NCR SEVERITY
    MobileMfgQuality.enums.NCR_SEVERITY = {
        0: 'Unspecified', 1: 'Critical', 2: 'Major', 3: 'Minor', 4: 'Cosmetic'
    };
    MobileMfgQuality.enums.NCR_SEVERITY_CLASSES = {
        1: 'status-terminated', 2: 'status-pending', 3: 'status-inactive', 4: 'status-inactive'
    };

    // RENDER FUNCTIONS
    MobileMfgQuality.render = {
        inspectionType: function(type) { return MobileMfgQuality.enums.INSPECTION_TYPE[type] || 'Unknown'; },
        inspectionResult: Layer8MRenderers.createStatusRenderer(
            MobileMfgQuality.enums.INSPECTION_RESULT,
            MobileMfgQuality.enums.INSPECTION_RESULT_CLASSES
        ),
        ncrStatus: Layer8MRenderers.createStatusRenderer(
            MobileMfgQuality.enums.NCR_STATUS,
            MobileMfgQuality.enums.NCR_STATUS_CLASSES
        ),
        ncrSeverity: Layer8MRenderers.createStatusRenderer(
            MobileMfgQuality.enums.NCR_SEVERITY,
            MobileMfgQuality.enums.NCR_SEVERITY_CLASSES
        ),
        ncrDisposition: function(disp) { return MobileMfgQuality.enums.NCR_DISPOSITION[disp] || 'Unknown'; },
        date: Layer8MRenderers.renderDate
    };

})();
