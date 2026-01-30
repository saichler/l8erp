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

    // Create DemandPlanning namespace
    window.DemandPlanning = window.DemandPlanning || {};
    DemandPlanning.enums = {};

    // ============================================================================
    // FORECAST METHOD
    // ============================================================================

    DemandPlanning.enums.FORECAST_METHOD = {
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

    DemandPlanning.enums.TASK_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'In Progress',
        3: 'Completed',
        4: 'Cancelled'
    };

    DemandPlanning.enums.TASK_STATUS_CLASSES = {
        1: 'erp-status-pending',
        2: 'erp-status-active',
        3: 'erp-status-active',
        4: 'erp-status-terminated'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    // Create render functions using shared utilities
    DemandPlanning.render = {};

    DemandPlanning.render.forecastMethod = (type) => ERPRenderers.renderEnum(type, DemandPlanning.enums.FORECAST_METHOD);

    DemandPlanning.render.taskStatus = ERPRenderers.createStatusRenderer(
        DemandPlanning.enums.TASK_STATUS,
        DemandPlanning.enums.TASK_STATUS_CLASSES
    );

    DemandPlanning.render.boolean = ERPRenderers.renderBoolean;
    DemandPlanning.render.date = ERPRenderers.renderDate;
    DemandPlanning.render.money = ERPRenderers.renderMoney;

})();
