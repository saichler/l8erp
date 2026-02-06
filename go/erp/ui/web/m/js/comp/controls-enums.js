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
 * Mobile COMP Controls Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: comp/controls/controls-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8MRenderers;

    window.MobileCompControls = window.MobileCompControls || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const CONTROL_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Preventive', 'preventive', 'status-active'],
        ['Detective', 'detective', 'status-active'],
        ['Corrective', 'corrective', 'status-pending'],
        ['Compensating', 'compensating', 'status-pending'],
        ['Directive', 'directive', 'status-inactive']
    ]);

    const CONTROL_EFFECTIVENESS = factory.create([
        ['Unspecified', null, ''],
        ['Effective', 'effective', 'status-active'],
        ['Partially Effective', 'partiallyeffective', 'status-pending'],
        ['Ineffective', 'ineffective', 'status-terminated'],
        ['Not Tested', 'nottested', 'status-inactive']
    ]);

    const SEVERITY_LEVEL = factory.create([
        ['Unspecified', null, ''],
        ['Critical', 'critical', 'status-terminated'],
        ['High', 'high', 'status-terminated'],
        ['Medium', 'medium', 'status-pending'],
        ['Low', 'low', 'status-active'],
        ['Informational', 'informational', 'status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileCompControls.enums = {
        CONTROL_TYPE: CONTROL_TYPE.enum,
        CONTROL_TYPE_VALUES: CONTROL_TYPE.values,
        CONTROL_TYPE_CLASSES: CONTROL_TYPE.classes,
        CONTROL_EFFECTIVENESS: CONTROL_EFFECTIVENESS.enum,
        CONTROL_EFFECTIVENESS_VALUES: CONTROL_EFFECTIVENESS.values,
        CONTROL_EFFECTIVENESS_CLASSES: CONTROL_EFFECTIVENESS.classes,
        SEVERITY_LEVEL: SEVERITY_LEVEL.enum,
        SEVERITY_LEVEL_VALUES: SEVERITY_LEVEL.values,
        SEVERITY_LEVEL_CLASSES: SEVERITY_LEVEL.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCompControls.render = {
        controlType: createStatusRenderer(CONTROL_TYPE.enum, CONTROL_TYPE.classes),
        controlEffectiveness: createStatusRenderer(CONTROL_EFFECTIVENESS.enum, CONTROL_EFFECTIVENESS.classes),
        severityLevel: createStatusRenderer(SEVERITY_LEVEL.enum, SEVERITY_LEVEL.classes),
        date: renderDate
    };

})();
