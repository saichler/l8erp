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
 * Mobile BI Analytics Module - Column Configurations
 * Desktop Equivalent: bi/analytics/analytics-columns.js
 */
(function() {
    'use strict';

    const enums = MobileBiAnalytics.enums;
    const render = MobileBiAnalytics.render;

    MobileBiAnalytics.columns = {
        BiDataCube: [
            { key: 'cubeId', label: 'ID', sortKey: 'cubeId', filterKey: 'cubeId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'dataSourceId', label: 'Data Source', sortKey: 'dataSourceId' },
            { key: 'refreshSchedule', label: 'Refresh Schedule', sortKey: 'refreshSchedule' },
            { key: 'lastRefresh', label: 'Last Refresh', sortKey: 'lastRefresh', render: (item) => Layer8MRenderers.renderDate(item.lastRefresh) },
            { key: 'rowCount', label: 'Row Count', sortKey: 'rowCount' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        BiAnalysisModel: [
            { key: 'modelId', label: 'ID', sortKey: 'modelId', filterKey: 'modelId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'modelType', label: 'Type', sortKey: 'modelType', filterKey: 'modelType', enumValues: enums.MODEL_TYPE_VALUES, render: (item) => render.modelType(item.modelType) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.MODEL_STATUS_VALUES, render: (item) => render.modelStatus(item.status) },
            { key: 'algorithm', label: 'Algorithm', sortKey: 'algorithm' },
            { key: 'accuracy', label: 'Accuracy', sortKey: 'accuracy', render: (item) => Layer8MRenderers.renderPercentage(item.accuracy) },
            { key: 'trainingDate', label: 'Training Date', sortKey: 'trainingDate', render: (item) => Layer8MRenderers.renderDate(item.trainingDate) },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' }
        ],

        BiPrediction: [
            { key: 'predictionId', label: 'ID', sortKey: 'predictionId', filterKey: 'predictionId' },
            { key: 'modelId', label: 'Model', sortKey: 'modelId', filterKey: 'modelId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'predictionDate', label: 'Prediction Date', sortKey: 'predictionDate', render: (item) => Layer8MRenderers.renderDate(item.predictionDate) },
            { key: 'confidence', label: 'Confidence', sortKey: 'confidence', render: (item) => Layer8MRenderers.renderPercentage(item.confidence) },
            { key: 'predictedBy', label: 'Predicted By', sortKey: 'predictedBy' },
            { key: 'notes', label: 'Notes', sortKey: 'notes' }
        ],

        BiTrendAnalysis: [
            { key: 'analysisId', label: 'ID', sortKey: 'analysisId', filterKey: 'analysisId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'metric', label: 'Metric', sortKey: 'metric' },
            { key: 'timePeriod', label: 'Time Period', sortKey: 'timePeriod' },
            { key: 'direction', label: 'Direction', sortKey: 'direction', filterKey: 'direction', enumValues: enums.TREND_DIRECTION_VALUES, render: (item) => render.trendDirection(item.direction) },
            { key: 'changePercent', label: 'Change %', sortKey: 'changePercent', render: (item) => Layer8MRenderers.renderPercentage(item.changePercent) },
            { key: 'startDate', label: 'Start Date', sortKey: 'startDate', render: (item) => Layer8MRenderers.renderDate(item.startDate) },
            { key: 'endDate', label: 'End Date', sortKey: 'endDate', render: (item) => Layer8MRenderers.renderDate(item.endDate) }
        ],

        BiScenario: [
            { key: 'scenarioId', label: 'ID', sortKey: 'scenarioId', filterKey: 'scenarioId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'scenarioType', label: 'Type', sortKey: 'scenarioType', filterKey: 'scenarioType', enumValues: enums.SCENARIO_TYPE_VALUES, render: (item) => render.scenarioType(item.scenarioType) },
            { key: 'dataSourceId', label: 'Data Source', sortKey: 'dataSourceId' },
            { key: 'createdDate', label: 'Created', sortKey: 'createdDate', render: (item) => Layer8MRenderers.renderDate(item.createdDate) },
            { key: 'createdBy', label: 'Created By', sortKey: 'createdBy' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        BiBenchmark: [
            { key: 'benchmarkId', label: 'ID', sortKey: 'benchmarkId', filterKey: 'benchmarkId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'category', label: 'Category', sortKey: 'category' },
            { key: 'metric', label: 'Metric', sortKey: 'metric' },
            { key: 'internalValue', label: 'Internal Value', sortKey: 'internalValue' },
            { key: 'benchmarkValue', label: 'Benchmark Value', sortKey: 'benchmarkValue' },
            { key: 'variancePercent', label: 'Variance %', sortKey: 'variancePercent', render: (item) => Layer8MRenderers.renderPercentage(item.variancePercent) },
            { key: 'industry', label: 'Industry', sortKey: 'industry' }
        ]
    };

    MobileBiAnalytics.primaryKeys = {
        BiDataCube: 'cubeId', BiAnalysisModel: 'modelId',
        BiPrediction: 'predictionId', BiTrendAnalysis: 'analysisId',
        BiScenario: 'scenarioId', BiBenchmark: 'benchmarkId'
    };

})();
