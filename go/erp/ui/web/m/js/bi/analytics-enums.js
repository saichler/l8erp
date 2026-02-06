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
 * Mobile BI Analytics Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: bi/analytics/analytics-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderPercent } = Layer8MRenderers;

    window.MobileBiAnalytics = window.MobileBiAnalytics || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const MODEL_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Regression', 'regression', 'status-active'],
        ['Classification', 'classification', 'status-active'],
        ['Clustering', 'clustering', 'status-pending'],
        ['Time Series', 'timeseries', 'status-active'],
        ['Anomaly Detection', 'anomalydetection', 'status-inactive']
    ]);

    const MODEL_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Training', 'training', 'status-pending'],
        ['Validated', 'validated', 'status-active'],
        ['Deployed', 'deployed', 'status-active'],
        ['Retired', 'retired', 'status-terminated']
    ]);

    const SCENARIO_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Baseline', 'baseline', 'status-active'],
        ['Optimistic', 'optimistic', 'status-active'],
        ['Pessimistic', 'pessimistic', 'status-inactive'],
        ['Custom', 'custom', 'status-pending']
    ]);

    const TREND_DIRECTION = factory.create([
        ['Unspecified', null, ''],
        ['Up', 'up', 'status-active'],
        ['Down', 'down', 'status-terminated'],
        ['Flat', 'flat', 'status-pending']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileBiAnalytics.enums = {
        MODEL_TYPE: MODEL_TYPE.enum,
        MODEL_TYPE_VALUES: MODEL_TYPE.values,
        MODEL_TYPE_CLASSES: MODEL_TYPE.classes,
        MODEL_STATUS: MODEL_STATUS.enum,
        MODEL_STATUS_VALUES: MODEL_STATUS.values,
        MODEL_STATUS_CLASSES: MODEL_STATUS.classes,
        SCENARIO_TYPE: SCENARIO_TYPE.enum,
        SCENARIO_TYPE_VALUES: SCENARIO_TYPE.values,
        SCENARIO_TYPE_CLASSES: SCENARIO_TYPE.classes,
        TREND_DIRECTION: TREND_DIRECTION.enum,
        TREND_DIRECTION_VALUES: TREND_DIRECTION.values,
        TREND_DIRECTION_CLASSES: TREND_DIRECTION.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileBiAnalytics.render = {
        modelType: createStatusRenderer(MODEL_TYPE.enum, MODEL_TYPE.classes),
        modelStatus: createStatusRenderer(MODEL_STATUS.enum, MODEL_STATUS.classes),
        scenarioType: createStatusRenderer(SCENARIO_TYPE.enum, SCENARIO_TYPE.classes),
        trendDirection: createStatusRenderer(TREND_DIRECTION.enum, TREND_DIRECTION.classes),
        date: renderDate,
        percent: renderPercent
    };

})();
