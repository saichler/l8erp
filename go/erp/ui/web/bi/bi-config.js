/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// BI Module Configuration - Uses Layer8ModuleConfigFactory
Layer8ModuleConfigFactory.create({
    namespace: 'Bi',
    modules: {
        'reporting': {
            label: 'Reporting', icon: '📊',
            services: [
                { key: 'reports', label: 'Reports', icon: '📋', endpoint: '/35/BiReport', model: 'BiReport' },
                { key: 'report-templates', label: 'Report Templates', icon: '📄', endpoint: '/35/BiRptTpl', model: 'BiReportTemplate' }
            ]
        },
        'dashboards': {
            label: 'Dashboards', icon: '📈',
            services: [
                { key: 'dashboards', label: 'Dashboards', icon: '🖥️', endpoint: '/35/BiDashbrd', model: 'BiDashboard' },
                { key: 'kpis', label: 'KPIs', icon: '🎯', endpoint: '/35/BiKPI', model: 'BiKPI' }
            ]
        },
        'analytics': {
            label: 'Analytics', icon: '📉',
            services: [
                { key: 'data-cubes', label: 'Data Cubes', icon: '🧊', endpoint: '/35/BiCube', model: 'BiDataCube' },
                { key: 'analysis-models', label: 'Analysis Models', icon: '🔬', endpoint: '/35/BiAnaModel', model: 'BiAnalysisModel' },
                { key: 'trend-analyses', label: 'Trend Analyses', icon: '📈', endpoint: '/35/BiTrend', model: 'BiTrendAnalysis' },
                { key: 'scenarios', label: 'Scenarios', icon: '🎭', endpoint: '/35/BiScenario', model: 'BiScenario' },
                { key: 'benchmarks', label: 'Benchmarks', icon: '📏', endpoint: '/35/BiBenchmrk', model: 'BiBenchmark' }
            ]
        },
        'datamanagement': {
            label: 'Data Management', icon: '🗄️',
            services: [
                { key: 'data-sources', label: 'Data Sources', icon: '🔌', endpoint: '/35/BiDataSrc', model: 'BiDataSource' },
                { key: 'etl-jobs', label: 'ETL Jobs', icon: '⚙️', endpoint: '/35/BiETLJob', model: 'BiETLJob' },
                { key: 'data-quality-rules', label: 'Data Quality Rules', icon: '✅', endpoint: '/35/BiDQRule', model: 'BiDataQualityRule' },
                { key: 'master-data-configs', label: 'Master Data Configs', icon: '🗃️', endpoint: '/35/BiMDConfig', model: 'BiMasterDataConfig' },
                { key: 'data-governances', label: 'Data Governance', icon: '📜', endpoint: '/35/BiDataGov', model: 'BiDataGovernance' }
            ]
        }
    },
    submodules: ['BiReporting', 'BiDashboards', 'BiAnalytics', 'BiDataManagement']
});
