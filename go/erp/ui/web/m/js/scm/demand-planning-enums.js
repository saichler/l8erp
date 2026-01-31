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
 * Mobile Demand Planning Module - Enum Definitions
 * Desktop Equivalent: scm/demand-planning/demand-planning-enums.js
 */
(function() {
    'use strict';

    window.MobileScmDemandPlanning = window.MobileScmDemandPlanning || {};
    MobileScmDemandPlanning.enums = {};

    // ============================================================================
    // FORECAST METHOD
    // ============================================================================

    MobileScmDemandPlanning.enums.FORECAST_METHOD = {
        0: 'Unspecified', 1: 'Moving Average', 2: 'Exponential Smoothing',
        3: 'Regression', 4: 'Seasonal', 5: 'Causal'
    };
    MobileScmDemandPlanning.enums.FORECAST_METHOD_VALUES = {
        'moving': 1, 'average': 1, 'exponential': 2, 'smoothing': 2,
        'regression': 3, 'seasonal': 4, 'causal': 5
    };

    // ============================================================================
    // TASK STATUS
    // ============================================================================

    MobileScmDemandPlanning.enums.TASK_STATUS = {
        0: 'Unspecified', 1: 'Pending', 2: 'In Progress', 3: 'Completed', 4: 'Cancelled'
    };
    MobileScmDemandPlanning.enums.TASK_STATUS_VALUES = {
        'pending': 1, 'progress': 2, 'in': 2, 'completed': 3, 'cancelled': 4
    };
    MobileScmDemandPlanning.enums.TASK_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-terminated'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileScmDemandPlanning.render = {
        forecastMethod: (v) => MobileRenderers.renderEnum(v, MobileScmDemandPlanning.enums.FORECAST_METHOD),
        taskStatus: MobileRenderers.createStatusRenderer(
            MobileScmDemandPlanning.enums.TASK_STATUS,
            MobileScmDemandPlanning.enums.TASK_STATUS_CLASSES
        ),
        boolean: MobileRenderers.renderBoolean,
        date: MobileRenderers.renderDate,
        money: MobileRenderers.renderMoney
    };

})();
