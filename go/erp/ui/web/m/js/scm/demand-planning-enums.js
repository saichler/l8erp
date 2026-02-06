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
 * Mobile Demand Planning Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: scm/demand-planning/demand-planning-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileScmDemandPlanning = window.MobileScmDemandPlanning || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const FORECAST_METHOD = factory.withValues([
        ['Unspecified', null], ['Moving Average', 'moving'], ['Exponential Smoothing', 'exponential'],
        ['Regression', 'regression'], ['Seasonal', 'seasonal'], ['Causal', 'causal']
    ]);

    const TASK_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['In Progress', 'progress', 'status-active'],
        ['Completed', 'completed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileScmDemandPlanning.enums = {
        FORECAST_METHOD: FORECAST_METHOD.enum,
        FORECAST_METHOD_VALUES: FORECAST_METHOD.values,
        TASK_STATUS: TASK_STATUS.enum,
        TASK_STATUS_VALUES: TASK_STATUS.values,
        TASK_STATUS_CLASSES: TASK_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileScmDemandPlanning.render = {
        forecastMethod: (v) => renderEnum(v, FORECAST_METHOD.enum),
        taskStatus: createStatusRenderer(TASK_STATUS.enum, TASK_STATUS.classes),
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
