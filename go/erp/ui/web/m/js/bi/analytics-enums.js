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
 * Mobile BI Analytics Module - Enum Definitions
 * Desktop Equivalent: bi/analytics/analytics-enums.js
 */
(function() {
    'use strict';

    window.MobileBiAnalytics = window.MobileBiAnalytics || {};
    MobileBiAnalytics.enums = {};

    // ============================================================================
    // MODEL TYPE
    // ============================================================================

    MobileBiAnalytics.enums.MODEL_TYPE = {
        0: 'Unspecified', 1: 'Regression', 2: 'Classification', 3: 'Clustering', 4: 'Time Series', 5: 'Anomaly Detection'
    };
    MobileBiAnalytics.enums.MODEL_TYPE_VALUES = {
        'regression': 1, 'classification': 2, 'clustering': 3, 'time series': 4, 'anomaly detection': 5
    };
    MobileBiAnalytics.enums.MODEL_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-pending', 4: 'status-active', 5: 'status-inactive'
    };

    // ============================================================================
    // MODEL STATUS
    // ============================================================================

    MobileBiAnalytics.enums.MODEL_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Training', 3: 'Validated', 4: 'Deployed', 5: 'Retired'
    };
    MobileBiAnalytics.enums.MODEL_STATUS_VALUES = {
        'draft': 1, 'training': 2, 'validated': 3, 'deployed': 4, 'retired': 5
    };
    MobileBiAnalytics.enums.MODEL_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active', 4: 'status-active', 5: 'status-terminated'
    };

    // ============================================================================
    // SCENARIO TYPE
    // ============================================================================

    MobileBiAnalytics.enums.SCENARIO_TYPE = {
        0: 'Unspecified', 1: 'Baseline', 2: 'Optimistic', 3: 'Pessimistic', 4: 'Custom'
    };
    MobileBiAnalytics.enums.SCENARIO_TYPE_VALUES = {
        'baseline': 1, 'optimistic': 2, 'pessimistic': 3, 'custom': 4
    };
    MobileBiAnalytics.enums.SCENARIO_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-inactive', 4: 'status-pending'
    };

    // ============================================================================
    // TREND DIRECTION
    // ============================================================================

    MobileBiAnalytics.enums.TREND_DIRECTION = {
        0: 'Unspecified', 1: 'Up', 2: 'Down', 3: 'Flat'
    };
    MobileBiAnalytics.enums.TREND_DIRECTION_VALUES = {
        'up': 1, 'down': 2, 'flat': 3
    };
    MobileBiAnalytics.enums.TREND_DIRECTION_CLASSES = {
        1: 'status-active', 2: 'status-terminated', 3: 'status-pending'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileBiAnalytics.render = {
        modelType: Layer8MRenderers.createStatusRenderer(
            MobileBiAnalytics.enums.MODEL_TYPE,
            MobileBiAnalytics.enums.MODEL_TYPE_CLASSES
        ),
        modelStatus: Layer8MRenderers.createStatusRenderer(
            MobileBiAnalytics.enums.MODEL_STATUS,
            MobileBiAnalytics.enums.MODEL_STATUS_CLASSES
        ),
        scenarioType: Layer8MRenderers.createStatusRenderer(
            MobileBiAnalytics.enums.SCENARIO_TYPE,
            MobileBiAnalytics.enums.SCENARIO_TYPE_CLASSES
        ),
        trendDirection: Layer8MRenderers.createStatusRenderer(
            MobileBiAnalytics.enums.TREND_DIRECTION,
            MobileBiAnalytics.enums.TREND_DIRECTION_CLASSES
        ),
        date: Layer8MRenderers.renderDate,
        percent: Layer8MRenderers.renderPercent
    };

})();
