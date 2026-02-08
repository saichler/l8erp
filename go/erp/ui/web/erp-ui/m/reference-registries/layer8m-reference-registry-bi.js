/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - BI Module
 * Reference configurations for Business Intelligence models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refBiM = window.Layer8RefFactory;

window.Layer8MReferenceRegistryBI = {
    // ========================================
    // Reporting
    // ========================================
    ...refBiM.batch([
        ['BiReport', 'reportId', 'name'],
        ['BiReportTemplate', 'templateId', 'name'],
        ['BiReportSchedule', 'scheduleId', 'name']
    ]),
    ...refBiM.batchIdOnly([
        ['BiReportExecution', 'executionId'],
        ['BiReportAccess', 'accessId'],
        ['BiReportSubscription', 'subscriptionId']
    ]),

    // ========================================
    // Dashboards
    // ========================================
    ...refBiM.batch([
        ['BiDashboard', 'dashboardId', 'name'],
        ['BiDashboardWidget', 'widgetId', 'name'],
        ['BiKPI', 'kpiId', 'name'],
        ['BiKPIThreshold', 'thresholdId', 'name'],
        ['BiDrilldown', 'drilldownId', 'name']
    ]),
    ...refBiM.idOnly('BiDashboardShare', 'shareId'),

    // ========================================
    // Analytics
    // ========================================
    ...refBiM.batch([
        ['BiDataCube', 'cubeId', 'name'],
        ['BiAnalysisModel', 'modelId', 'name'],
        ['BiPrediction', 'predictionId', 'name'],
        ['BiTrendAnalysis', 'analysisId', 'name'],
        ['BiScenario', 'scenarioId', 'name'],
        ['BiBenchmark', 'benchmarkId', 'name']
    ]),

    // ========================================
    // Data Management
    // ========================================
    ...refBiM.batch([
        ['BiDataSource', 'sourceId', 'name'],
        ['BiETLJob', 'jobId', 'name'],
        ['BiETLSchedule', 'scheduleId', 'name'],
        ['BiDataQualityRule', 'ruleId', 'name'],
        ['BiMasterDataConfig', 'configId', 'name'],
        ['BiDataGovernance', 'governanceId', 'name']
    ])
};

// Register with the central registry
Layer8MReferenceRegistry.register(window.Layer8MReferenceRegistryBI);
