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
// BI Analytics Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderPercentage } = Layer8DRenderers;

    window.BiAnalytics = window.BiAnalytics || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const MODEL_TYPE = factory.simple([
        'Unspecified', 'Regression', 'Classification', 'Clustering',
        'Time Series', 'Anomaly Detection'
    ]);

    const MODEL_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Training', 'training', 'layer8d-status-pending'],
        ['Validated', 'validated', 'layer8d-status-active'],
        ['Deployed', 'deployed', 'layer8d-status-active'],
        ['Retired', 'retired', 'layer8d-status-terminated']
    ]);

    const SCENARIO_TYPE = factory.simple([
        'Unspecified', 'Baseline', 'Optimistic', 'Pessimistic', 'Custom'
    ]);

    const TREND_DIRECTION = factory.create([
        ['Unspecified', null, ''],
        ['Up', 'up', 'layer8d-status-active'],
        ['Down', 'down', 'layer8d-status-terminated'],
        ['Flat', 'flat', 'layer8d-status-pending']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    BiAnalytics.enums = {
        MODEL_TYPE: MODEL_TYPE.enum,
        MODEL_STATUS: MODEL_STATUS.enum,
        MODEL_STATUS_CLASSES: MODEL_STATUS.classes,
        SCENARIO_TYPE: SCENARIO_TYPE.enum,
        TREND_DIRECTION: TREND_DIRECTION.enum,
        TREND_DIRECTION_CLASSES: TREND_DIRECTION.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    BiAnalytics.render = {
        modelType: (v) => renderEnum(v, MODEL_TYPE.enum),
        modelStatus: createStatusRenderer(MODEL_STATUS.enum, MODEL_STATUS.classes),
        scenarioType: (v) => renderEnum(v, SCENARIO_TYPE.enum),
        trendDirection: createStatusRenderer(TREND_DIRECTION.enum, TREND_DIRECTION.classes),
        date: renderDate,
        percent: renderPercentage
    };

})();
