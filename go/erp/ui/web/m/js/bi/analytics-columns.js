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

    const col = window.Layer8ColumnFactory;
    const enums = MobileBiAnalytics.enums;
    const render = MobileBiAnalytics.render;

    MobileBiAnalytics.columns = {
        BiDataCube: [
            ...col.id('cubeId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.col('dataSourceId', 'Data Source'),
            ...col.col('refreshSchedule', 'Refresh Schedule'),
            ...col.date('lastRefresh', 'Last Refresh'),
            ...col.col('rowCount', 'Row Count'),
            ...col.boolean('isActive', 'Active')
        ],

        BiAnalysisModel: [
            ...col.id('modelId'),
            ...col.col('name', 'Name'),
            ...col.status('modelType', 'Type', enums.MODEL_TYPE_VALUES, render.modelType),
            ...col.status('status', 'Status', enums.MODEL_STATUS_VALUES, render.modelStatus),
            ...col.col('algorithm', 'Algorithm'),
            ...col.custom('accuracy', 'Accuracy', (item) => Layer8DRenderers.renderPercentage(item.accuracy)),
            ...col.date('trainingDate', 'Training Date'),
            ...col.col('ownerId', 'Owner')
        ],

        BiTrendAnalysis: [
            ...col.id('analysisId'),
            ...col.col('name', 'Name'),
            ...col.col('metric', 'Metric'),
            ...col.col('timePeriod', 'Time Period'),
            ...col.status('direction', 'Direction', enums.TREND_DIRECTION_VALUES, render.trendDirection),
            ...col.custom('changePercent', 'Change %', (item) => Layer8DRenderers.renderPercentage(item.changePercent)),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date')
        ],

        BiScenario: [
            ...col.id('scenarioId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.status('scenarioType', 'Type', enums.SCENARIO_TYPE_VALUES, render.scenarioType),
            ...col.col('dataSourceId', 'Data Source'),
            ...col.date('createdDate', 'Created'),
            ...col.col('createdBy', 'Created By'),
            ...col.boolean('isActive', 'Active')
        ],

        BiBenchmark: [
            ...col.id('benchmarkId'),
            ...col.col('name', 'Name'),
            ...col.col('category', 'Category'),
            ...col.col('metric', 'Metric'),
            ...col.col('internalValue', 'Internal Value'),
            ...col.col('benchmarkValue', 'Benchmark Value'),
            ...col.custom('variancePercent', 'Variance %', (item) => Layer8DRenderers.renderPercentage(item.variancePercent)),
            ...col.col('industry', 'Industry')
        ]
    };

    MobileBiAnalytics.primaryKeys = {
        BiDataCube: 'cubeId', BiAnalysisModel: 'modelId',
        BiTrendAnalysis: 'analysisId',
        BiScenario: 'scenarioId', BiBenchmark: 'benchmarkId'
    };

})();
