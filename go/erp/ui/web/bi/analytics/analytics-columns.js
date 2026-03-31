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
// BI Analytics Module - Column Configurations

(function() {
    'use strict';

    window.BiAnalytics = window.BiAnalytics || {};

    const col = window.Layer8ColumnFactory;
    const { renderPercentage } = Layer8DRenderers;
    const render = BiAnalytics.render;

    BiAnalytics.columns = {
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
            ...col.enum('modelType', 'Type', null, render.modelType),
            ...col.enum('status', 'Status', null, render.modelStatus),
            ...col.col('algorithm', 'Algorithm'),
            ...col.custom('accuracy', 'Accuracy', (item) => renderPercentage(item.accuracy)),
            ...col.date('trainingDate', 'Training Date'),
            ...col.col('ownerId', 'Owner')
        ],

        BiTrendAnalysis: [
            ...col.id('analysisId'),
            ...col.col('name', 'Name'),
            ...col.col('metric', 'Metric'),
            ...col.col('timePeriod', 'Time Period'),
            ...col.enum('direction', 'Direction', null, render.trendDirection),
            ...col.custom('changePercent', 'Change %', (item) => renderPercentage(item.changePercent)),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date')
        ],

        BiScenario: [
            ...col.id('scenarioId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.enum('scenarioType', 'Type', null, render.scenarioType),
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
            ...col.custom('variancePercent', 'Variance %', (item) => renderPercentage(item.variancePercent)),
            ...col.col('industry', 'Industry')
        ]
    };

})();
