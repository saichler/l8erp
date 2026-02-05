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
 * Mobile COMP Controls Module - Enum Definitions
 * Desktop Equivalent: comp/controls/controls-enums.js
 */
(function() {
    'use strict';

    window.MobileCompControls = window.MobileCompControls || {};
    MobileCompControls.enums = {};

    // ============================================================================
    // CONTROL TYPE
    // ============================================================================

    MobileCompControls.enums.CONTROL_TYPE = {
        0: 'Unspecified', 1: 'Preventive', 2: 'Detective', 3: 'Corrective',
        4: 'Compensating', 5: 'Directive'
    };
    MobileCompControls.enums.CONTROL_TYPE_VALUES = {
        'preventive': 1, 'detective': 2, 'corrective': 3, 'compensating': 4, 'directive': 5
    };
    MobileCompControls.enums.CONTROL_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-pending',
        4: 'status-pending', 5: 'status-inactive'
    };

    // ============================================================================
    // CONTROL EFFECTIVENESS
    // ============================================================================

    MobileCompControls.enums.CONTROL_EFFECTIVENESS = {
        0: 'Unspecified', 1: 'Effective', 2: 'Partially Effective', 3: 'Ineffective', 4: 'Not Tested'
    };
    MobileCompControls.enums.CONTROL_EFFECTIVENESS_VALUES = {
        'effective': 1, 'partiallyeffective': 2, 'ineffective': 3, 'nottested': 4
    };
    MobileCompControls.enums.CONTROL_EFFECTIVENESS_CLASSES = {
        1: 'status-active', 2: 'status-pending', 3: 'status-terminated', 4: 'status-inactive'
    };

    // ============================================================================
    // SEVERITY LEVEL (for segregation rules risk level)
    // ============================================================================

    MobileCompControls.enums.SEVERITY_LEVEL = {
        0: 'Unspecified', 1: 'Critical', 2: 'High', 3: 'Medium', 4: 'Low', 5: 'Informational'
    };
    MobileCompControls.enums.SEVERITY_LEVEL_VALUES = {
        'critical': 1, 'high': 2, 'medium': 3, 'low': 4, 'informational': 5
    };
    MobileCompControls.enums.SEVERITY_LEVEL_CLASSES = {
        1: 'status-terminated', 2: 'status-terminated', 3: 'status-pending',
        4: 'status-active', 5: 'status-inactive'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCompControls.render = {
        controlType: Layer8MRenderers.createStatusRenderer(
            MobileCompControls.enums.CONTROL_TYPE,
            MobileCompControls.enums.CONTROL_TYPE_CLASSES
        ),
        controlEffectiveness: Layer8MRenderers.createStatusRenderer(
            MobileCompControls.enums.CONTROL_EFFECTIVENESS,
            MobileCompControls.enums.CONTROL_EFFECTIVENESS_CLASSES
        ),
        severityLevel: Layer8MRenderers.createStatusRenderer(
            MobileCompControls.enums.SEVERITY_LEVEL,
            MobileCompControls.enums.SEVERITY_LEVEL_CLASSES
        ),
        date: Layer8MRenderers.renderDate
    };

})();
