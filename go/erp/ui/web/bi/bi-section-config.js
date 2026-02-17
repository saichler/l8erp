/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Business Intelligence Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    Layer8SectionConfigs.register('bi', {
        title: 'Business Intelligence',
        subtitle: 'Reporting, Dashboards, Analytics & Data Management',
        icon: '📊',
        svgContent: Layer8SvgFactory.generate('analytics'),
        initFn: 'initializeBi',
        modules: [
            {
                key: 'reporting', label: 'Reporting', icon: '📊', isDefault: true,
                services: [
                    { key: 'reports', label: 'Reports', icon: '📋', isDefault: true },
                    { key: 'report-templates', label: 'Report Templates', icon: '📄' }
                ]
            },
            {
                key: 'dashboards', label: 'Dashboards', icon: '📈',
                services: [
                    { key: 'dashboards', label: 'Dashboards', icon: '🖥️', isDefault: true },
                    { key: 'kpis', label: 'KPIs', icon: '🎯' }
                ]
            },
            {
                key: 'analytics', label: 'Analytics', icon: '📉',
                services: [
                    { key: 'data-cubes', label: 'Data Cubes', icon: '🧊', isDefault: true },
                    { key: 'analysis-models', label: 'Analysis Models', icon: '🔬' },
                    { key: 'trend-analyses', label: 'Trend Analyses', icon: '📈' },
                    { key: 'scenarios', label: 'Scenarios', icon: '🎭' },
                    { key: 'benchmarks', label: 'Benchmarks', icon: '📏' }
                ]
            },
            {
                key: 'datamanagement', label: 'Data Management', icon: '🗄️',
                services: [
                    { key: 'data-sources', label: 'Data Sources', icon: '🔌', isDefault: true },
                    { key: 'etl-jobs', label: 'ETL Jobs', icon: '⚙️' },
                    { key: 'data-quality-rules', label: 'Data Quality Rules', icon: '✅' },
                    { key: 'master-data-configs', label: 'Master Data Configs', icon: '🗃️' },
                    { key: 'data-governances', label: 'Data Governance', icon: '📜' }
                ]
            }
        ]
    });
})();
