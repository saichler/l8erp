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
// BI Analytics Module - Enum Definitions

(function() {
    'use strict';

    window.BiAnalytics = window.BiAnalytics || {};
    BiAnalytics.enums = {};

    // MODEL TYPE
    BiAnalytics.enums.MODEL_TYPE = {
        0: 'Unspecified',
        1: 'Regression',
        2: 'Classification',
        3: 'Clustering',
        4: 'Time Series',
        5: 'Anomaly Detection'
    };

    BiAnalytics.enums.MODEL_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-active',
        5: 'layer8d-status-inactive'
    };

    // MODEL STATUS
    BiAnalytics.enums.MODEL_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Training',
        3: 'Validated',
        4: 'Deployed',
        5: 'Retired'
    };

    BiAnalytics.enums.MODEL_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-terminated'
    };

    // SCENARIO TYPE
    BiAnalytics.enums.SCENARIO_TYPE = {
        0: 'Unspecified',
        1: 'Baseline',
        2: 'Optimistic',
        3: 'Pessimistic',
        4: 'Custom'
    };

    BiAnalytics.enums.SCENARIO_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive',
        4: 'layer8d-status-pending'
    };

    // TREND DIRECTION
    BiAnalytics.enums.TREND_DIRECTION = {
        0: 'Unspecified',
        1: 'Up',
        2: 'Down',
        3: 'Flat'
    };

    BiAnalytics.enums.TREND_DIRECTION_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-terminated',
        3: 'layer8d-status-pending'
    };

    // RENDERERS
    BiAnalytics.render = {};

    BiAnalytics.render.modelType = Layer8DRenderers.createStatusRenderer(
        BiAnalytics.enums.MODEL_TYPE,
        BiAnalytics.enums.MODEL_TYPE_CLASSES
    );

    BiAnalytics.render.modelStatus = Layer8DRenderers.createStatusRenderer(
        BiAnalytics.enums.MODEL_STATUS,
        BiAnalytics.enums.MODEL_STATUS_CLASSES
    );

    BiAnalytics.render.scenarioType = Layer8DRenderers.createStatusRenderer(
        BiAnalytics.enums.SCENARIO_TYPE,
        BiAnalytics.enums.SCENARIO_TYPE_CLASSES
    );

    BiAnalytics.render.trendDirection = Layer8DRenderers.createStatusRenderer(
        BiAnalytics.enums.TREND_DIRECTION,
        BiAnalytics.enums.TREND_DIRECTION_CLASSES
    );

    BiAnalytics.render.date = Layer8DRenderers.renderDate;
    BiAnalytics.render.percent = Layer8DRenderers.renderPercent;

})();
