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
// Demand Planning Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    window.ScmDemandPlanning = window.ScmDemandPlanning || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const FORECAST_METHOD = factory.simple([
        'Unspecified', 'Moving Average', 'Exponential Smoothing', 'Regression', 'Seasonal', 'Causal'
    ]);

    const TASK_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['In Progress', 'progress', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    window.ScmDemandPlanning.enums = {
        FORECAST_METHOD: FORECAST_METHOD.enum,
        TASK_STATUS: TASK_STATUS.enum,
        TASK_STATUS_CLASSES: TASK_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderTaskStatus = createStatusRenderer(TASK_STATUS.enum, TASK_STATUS.classes);

    window.ScmDemandPlanning.render = {
        forecastMethod: (v) => renderEnum(v, FORECAST_METHOD.enum),
        taskStatus: renderTaskStatus,
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
