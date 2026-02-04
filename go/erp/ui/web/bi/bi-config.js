/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.Bi = window.Bi || {};

    Bi.modules = {
        'reporting': {
            label: 'Reporting',
            icon: '📊',
            services: [
                { key: 'reports', label: 'Reports', icon: '📋', endpoint: '/35/BiReport', model: 'BiReport' },
                { key: 'report-templates', label: 'Report Templates', icon: '📄', endpoint: '/35/BiRptTpl', model: 'BiReportTemplate' },
                { key: 'report-schedules', label: 'Report Schedules', icon: '🗓️', endpoint: '/35/BiRptSched', model: 'BiReportSchedule' },
                { key: 'report-executions', label: 'Report Executions', icon: '▶️', endpoint: '/35/BiRptExec', model: 'BiReportExecution' },
                { key: 'report-accesses', label: 'Report Access', icon: '🔐', endpoint: '/35/BiRptAccs', model: 'BiReportAccess' },
                { key: 'report-subscriptions', label: 'Subscriptions', icon: '📬', endpoint: '/35/BiRptSub', model: 'BiReportSubscription' }
            ]
        },
        'dashboards': {
            label: 'Dashboards',
            icon: '📈',
            services: [
                { key: 'dashboards', label: 'Dashboards', icon: '🖥️', endpoint: '/35/BiDashbrd', model: 'BiDashboard' },
                { key: 'dashboard-widgets', label: 'Widgets', icon: '🧩', endpoint: '/35/BiWidget', model: 'BiDashboardWidget' },
                { key: 'kpis', label: 'KPIs', icon: '🎯', endpoint: '/35/BiKPI', model: 'BiKPI' },
                { key: 'kpi-thresholds', label: 'KPI Thresholds', icon: '⚖️', endpoint: '/35/BiKPIThrs', model: 'BiKPIThreshold' },
                { key: 'drilldowns', label: 'Drilldowns', icon: '🔍', endpoint: '/35/BiDrill', model: 'BiDrilldown' },
                { key: 'dashboard-shares', label: 'Dashboard Shares', icon: '🔗', endpoint: '/35/BiDashShr', model: 'BiDashboardShare' }
            ]
        },
        'analytics': {
            label: 'Analytics',
            icon: '📉',
            services: [
                { key: 'data-cubes', label: 'Data Cubes', icon: '🧊', endpoint: '/35/BiCube', model: 'BiDataCube' },
                { key: 'analysis-models', label: 'Analysis Models', icon: '🔬', endpoint: '/35/BiAnaModel', model: 'BiAnalysisModel' },
                { key: 'predictions', label: 'Predictions', icon: '🔮', endpoint: '/35/BiPredict', model: 'BiPrediction' },
                { key: 'trend-analyses', label: 'Trend Analyses', icon: '📈', endpoint: '/35/BiTrend', model: 'BiTrendAnalysis' },
                { key: 'scenarios', label: 'Scenarios', icon: '🎭', endpoint: '/35/BiScenario', model: 'BiScenario' },
                { key: 'benchmarks', label: 'Benchmarks', icon: '📏', endpoint: '/35/BiBenchmrk', model: 'BiBenchmark' }
            ]
        },
        'datamanagement': {
            label: 'Data Management',
            icon: '🗄️',
            services: [
                { key: 'data-sources', label: 'Data Sources', icon: '🔌', endpoint: '/35/BiDataSrc', model: 'BiDataSource' },
                { key: 'etl-jobs', label: 'ETL Jobs', icon: '⚙️', endpoint: '/35/BiETLJob', model: 'BiETLJob' },
                { key: 'etl-schedules', label: 'ETL Schedules', icon: '🗓️', endpoint: '/35/BiETLSched', model: 'BiETLSchedule' },
                { key: 'data-quality-rules', label: 'Data Quality Rules', icon: '✅', endpoint: '/35/BiDQRule', model: 'BiDataQualityRule' },
                { key: 'master-data-configs', label: 'Master Data Configs', icon: '🗃️', endpoint: '/35/BiMDConfig', model: 'BiMasterDataConfig' },
                { key: 'data-governances', label: 'Data Governance', icon: '📜', endpoint: '/35/BiDataGov', model: 'BiDataGovernance' }
            ]
        }
    };

    Bi.submodules = ['BiReporting', 'BiDashboards', 'BiAnalytics', 'BiDataManagement'];
})();
