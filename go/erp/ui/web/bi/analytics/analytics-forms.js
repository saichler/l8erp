/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// BI Analytics Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.BiAnalytics = window.BiAnalytics || {};

    const f = window.Layer8FormFactory;
    const enums = BiAnalytics.enums;

    BiAnalytics.forms = {
        BiDataCube: f.form('Data Cube', [
            f.section('Cube Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('dataSourceId', 'Data Source', 'BiDataSource'),
                ...f.text('refreshSchedule', 'Refresh Schedule'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Configuration', [
                ...f.text('dimensions', 'Dimensions (comma separated)'),
                ...f.text('measures', 'Measures (comma separated)')
            ]),
            f.section('Status', [
                ...f.date('lastRefresh', 'Last Refresh'),
                ...f.number('rowCount', 'Row Count')
            ])
        ]),

        BiAnalysisModel: f.form('Analysis Model', [
            f.section('Model Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('modelType', 'Model Type', enums.MODEL_TYPE),
                ...f.select('status', 'Status', enums.MODEL_STATUS),
                ...f.reference('dataSourceId', 'Data Source', 'BiDataSource'),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ]),
            f.section('Configuration', [
                ...f.text('algorithm', 'Algorithm'),
                ...f.text('targetVariable', 'Target Variable'),
                ...f.text('featureVariables', 'Feature Variables (comma separated)'),
                ...f.textarea('hyperparameters', 'Hyperparameters (JSON)')
            ]),
            f.section('Performance Metrics', [
                ...f.number('accuracy', 'Accuracy'),
                ...f.number('precisionScore', 'Precision Score'),
                ...f.number('recallScore', 'Recall Score'),
                ...f.date('trainingDate', 'Training Date'),
                ...f.date('lastPrediction', 'Last Prediction')
            ]),
            f.section('Predictions', [
                ...f.inlineTable('predictions', 'Predictions', [
                    { key: 'predictionId', label: 'ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'confidence', label: 'Confidence', type: 'number' },
                    { key: 'predictedBy', label: 'Predicted By', type: 'text' },
                    { key: 'notes', label: 'Notes', type: 'text' }
                ])
            ])
        ]),

        BiTrendAnalysis: f.form('Trend Analysis', [
            f.section('Analysis Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('dataSourceId', 'Data Source', 'BiDataSource'),
                ...f.text('metric', 'Metric', true),
                ...f.text('timePeriod', 'Time Period'),
                ...f.reference('analyzedBy', 'Analyzed By', 'Employee')
            ]),
            f.section('Date Range', [
                ...f.date('startDate', 'Start Date'),
                ...f.date('endDate', 'End Date'),
                ...f.date('analysisDate', 'Analysis Date')
            ]),
            f.section('Results', [
                ...f.select('direction', 'Direction', enums.TREND_DIRECTION),
                ...f.number('slope', 'Slope'),
                ...f.number('rSquared', 'R-Squared'),
                ...f.number('changePercent', 'Change %'),
                ...f.textarea('analysisResult', 'Analysis Result (JSON)')
            ])
        ]),

        BiScenario: f.form('Scenario', [
            f.section('Scenario Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('scenarioType', 'Scenario Type', enums.SCENARIO_TYPE),
                ...f.reference('baseScenarioId', 'Base Scenario', 'BiScenario'),
                ...f.reference('dataSourceId', 'Data Source', 'BiDataSource'),
                ...f.reference('createdBy', 'Created By', 'Employee'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Configuration', [
                ...f.textarea('assumptions', 'Assumptions (JSON)'),
                ...f.textarea('variables', 'Variables (JSON)'),
                ...f.textarea('results', 'Results (JSON)')
            ]),
            f.section('Metadata', [
                ...f.date('createdDate', 'Created Date')
            ])
        ]),

        BiBenchmark: f.form('Benchmark', [
            f.section('Benchmark Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('category', 'Category'),
                ...f.text('metric', 'Metric', true),
                ...f.text('benchmarkSource', 'Benchmark Source')
            ]),
            f.section('Values', [
                ...f.number('internalValue', 'Internal Value'),
                ...f.number('benchmarkValue', 'Benchmark Value'),
                ...f.number('variance', 'Variance'),
                ...f.number('variancePercent', 'Variance %')
            ]),
            f.section('Context', [
                ...f.text('industry', 'Industry'),
                ...f.text('region', 'Region'),
                ...f.date('periodStart', 'Period Start'),
                ...f.date('periodEnd', 'Period End'),
                ...f.date('lastUpdated', 'Last Updated')
            ])
        ])
    };

    BiAnalytics.primaryKeys = {
        BiDataCube: 'cubeId',
        BiAnalysisModel: 'modelId',
        BiTrendAnalysis: 'analysisId',
        BiScenario: 'scenarioId',
        BiBenchmark: 'benchmarkId'
    };

})();
