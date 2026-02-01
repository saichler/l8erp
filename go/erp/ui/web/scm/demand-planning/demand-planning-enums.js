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
// Demand Planning Module - Enum Definitions
// All enum constants and value mappings for Demand Planning models

(function() {
    'use strict';

    // Create ScmDemandPlanning namespace
    window.ScmDemandPlanning = window.ScmDemandPlanning || {};
    ScmDemandPlanning.enums = {};

    // ============================================================================
    // FORECAST METHOD
    // ============================================================================

    ScmDemandPlanning.enums.FORECAST_METHOD = {
        0: 'Unspecified',
        1: 'Moving Average',
        2: 'Exponential Smoothing',
        3: 'Regression',
        4: 'Seasonal',
        5: 'Causal'
    };

    // ============================================================================
    // TASK STATUS
    // ============================================================================

    ScmDemandPlanning.enums.TASK_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'In Progress',
        3: 'Completed',
        4: 'Cancelled'
    };

    ScmDemandPlanning.enums.TASK_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    // Create render functions using shared utilities
    ScmDemandPlanning.render = {};

    ScmDemandPlanning.render.forecastMethod = (type) => Layer8DRenderers.renderEnum(type, ScmDemandPlanning.enums.FORECAST_METHOD);

    ScmDemandPlanning.render.taskStatus = Layer8DRenderers.createStatusRenderer(
        ScmDemandPlanning.enums.TASK_STATUS,
        ScmDemandPlanning.enums.TASK_STATUS_CLASSES
    );

    ScmDemandPlanning.render.boolean = Layer8DRenderers.renderBoolean;
    ScmDemandPlanning.render.date = Layer8DRenderers.renderDate;
    ScmDemandPlanning.render.money = Layer8DRenderers.renderMoney;

})();
