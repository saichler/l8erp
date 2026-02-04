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
// BI Analytics Module - Form Definitions

(function() {
    'use strict';

    window.BiAnalytics = window.BiAnalytics || {};

    const enums = BiAnalytics.enums;

    BiAnalytics.forms = {
        BiDataCube: {
            title: 'Data Cube',
            sections: [
                {
                    title: 'Cube Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'dataSourceId', label: 'Data Source', type: 'reference', lookupModel: 'BiDataSource' },
                        { key: 'refreshSchedule', label: 'Refresh Schedule', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Configuration',
                    fields: [
                        { key: 'dimensions', label: 'Dimensions (comma separated)', type: 'text' },
                        { key: 'measures', label: 'Measures (comma separated)', type: 'text' }
                    ]
                },
                {
                    title: 'Status',
                    fields: [
                        { key: 'lastRefresh', label: 'Last Refresh', type: 'date' },
                        { key: 'rowCount', label: 'Row Count', type: 'number' }
                    ]
                }
            ]
        },

        BiAnalysisModel: {
            title: 'Analysis Model',
            sections: [
                {
                    title: 'Model Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'modelType', label: 'Model Type', type: 'select', options: enums.MODEL_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.MODEL_STATUS },
                        { key: 'dataSourceId', label: 'Data Source', type: 'reference', lookupModel: 'BiDataSource' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Configuration',
                    fields: [
                        { key: 'algorithm', label: 'Algorithm', type: 'text' },
                        { key: 'targetVariable', label: 'Target Variable', type: 'text' },
                        { key: 'featureVariables', label: 'Feature Variables (comma separated)', type: 'text' },
                        { key: 'hyperparameters', label: 'Hyperparameters (JSON)', type: 'textarea' }
                    ]
                },
                {
                    title: 'Performance Metrics',
                    fields: [
                        { key: 'accuracy', label: 'Accuracy', type: 'number' },
                        { key: 'precisionScore', label: 'Precision Score', type: 'number' },
                        { key: 'recallScore', label: 'Recall Score', type: 'number' },
                        { key: 'trainingDate', label: 'Training Date', type: 'date' },
                        { key: 'lastPrediction', label: 'Last Prediction', type: 'date' }
                    ]
                }
            ]
        },

        BiPrediction: {
            title: 'Prediction',
            sections: [
                {
                    title: 'Prediction Details',
                    fields: [
                        { key: 'modelId', label: 'Model', type: 'reference', lookupModel: 'BiAnalysisModel', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'predictionDate', label: 'Prediction Date', type: 'date' },
                        { key: 'predictedBy', label: 'Predicted By', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Data',
                    fields: [
                        { key: 'inputData', label: 'Input Data (JSON)', type: 'textarea' },
                        { key: 'outputData', label: 'Output Data (JSON)', type: 'textarea' },
                        { key: 'confidence', label: 'Confidence', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        BiTrendAnalysis: {
            title: 'Trend Analysis',
            sections: [
                {
                    title: 'Analysis Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'dataSourceId', label: 'Data Source', type: 'reference', lookupModel: 'BiDataSource' },
                        { key: 'metric', label: 'Metric', type: 'text', required: true },
                        { key: 'timePeriod', label: 'Time Period', type: 'text' },
                        { key: 'analyzedBy', label: 'Analyzed By', type: 'reference', lookupModel: 'Employee' }
                    ]
                },
                {
                    title: 'Date Range',
                    fields: [
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'analysisDate', label: 'Analysis Date', type: 'date' }
                    ]
                },
                {
                    title: 'Results',
                    fields: [
                        { key: 'direction', label: 'Direction', type: 'select', options: enums.TREND_DIRECTION },
                        { key: 'slope', label: 'Slope', type: 'number' },
                        { key: 'rSquared', label: 'R-Squared', type: 'number' },
                        { key: 'changePercent', label: 'Change %', type: 'number' },
                        { key: 'analysisResult', label: 'Analysis Result (JSON)', type: 'textarea' }
                    ]
                }
            ]
        },

        BiScenario: {
            title: 'Scenario',
            sections: [
                {
                    title: 'Scenario Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'scenarioType', label: 'Scenario Type', type: 'select', options: enums.SCENARIO_TYPE },
                        { key: 'baseScenarioId', label: 'Base Scenario', type: 'reference', lookupModel: 'BiScenario' },
                        { key: 'dataSourceId', label: 'Data Source', type: 'reference', lookupModel: 'BiDataSource' },
                        { key: 'createdBy', label: 'Created By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Configuration',
                    fields: [
                        { key: 'assumptions', label: 'Assumptions (JSON)', type: 'textarea' },
                        { key: 'variables', label: 'Variables (JSON)', type: 'textarea' },
                        { key: 'results', label: 'Results (JSON)', type: 'textarea' }
                    ]
                },
                {
                    title: 'Metadata',
                    fields: [
                        { key: 'createdDate', label: 'Created Date', type: 'date' }
                    ]
                }
            ]
        },

        BiBenchmark: {
            title: 'Benchmark',
            sections: [
                {
                    title: 'Benchmark Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'category', label: 'Category', type: 'text' },
                        { key: 'metric', label: 'Metric', type: 'text', required: true },
                        { key: 'benchmarkSource', label: 'Benchmark Source', type: 'text' }
                    ]
                },
                {
                    title: 'Values',
                    fields: [
                        { key: 'internalValue', label: 'Internal Value', type: 'number' },
                        { key: 'benchmarkValue', label: 'Benchmark Value', type: 'number' },
                        { key: 'variance', label: 'Variance', type: 'number' },
                        { key: 'variancePercent', label: 'Variance %', type: 'number' }
                    ]
                },
                {
                    title: 'Context',
                    fields: [
                        { key: 'industry', label: 'Industry', type: 'text' },
                        { key: 'region', label: 'Region', type: 'text' },
                        { key: 'periodStart', label: 'Period Start', type: 'date' },
                        { key: 'periodEnd', label: 'Period End', type: 'date' },
                        { key: 'lastUpdated', label: 'Last Updated', type: 'date' }
                    ]
                }
            ]
        }
    };

    BiAnalytics.primaryKeys = {
        BiDataCube: 'cubeId',
        BiAnalysisModel: 'modelId',
        BiPrediction: 'predictionId',
        BiTrendAnalysis: 'analysisId',
        BiScenario: 'scenarioId',
        BiBenchmark: 'benchmarkId'
    };

})();
