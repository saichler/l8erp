/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Business Intelligence Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    const biSvg = `
        <svg class="hcm-illustration" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="biGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:0.4" />
                    <stop offset="100%" style="stop-color:#0284c7;stop-opacity:0.2" />
                </linearGradient>
            </defs>
            <g opacity="0.1">
                <line x1="0" y1="30" x2="1200" y2="30" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="0" y1="60" x2="1200" y2="60" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="0" y1="90" x2="1200" y2="90" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="200" y1="0" x2="200" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="400" y1="0" x2="400" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="600" y1="0" x2="600" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="800" y1="0" x2="800" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="1000" y1="0" x2="1000" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
            </g>
            <g class="people-animation">
                <rect x="175" y="55" width="8" height="25" rx="1" fill="url(#biGradient1)" opacity="0.5"/>
                <rect x="188" y="45" width="8" height="35" rx="1" fill="url(#biGradient1)" opacity="0.6"/>
                <rect x="201" y="50" width="8" height="30" rx="1" fill="url(#biGradient1)" opacity="0.7"/>
                <rect x="214" y="40" width="8" height="40" rx="1" fill="url(#biGradient1)" opacity="0.5"/>
                <circle cx="400" cy="60" r="25" fill="none" stroke="url(#biGradient1)" stroke-width="8" opacity="0.4"/>
                <path d="M 400,35 L 400,60 L 420,60" fill="none" stroke="#0ea5e9" stroke-width="3" opacity="0.5"/>
                <rect x="575" y="40" width="50" height="40" rx="4" fill="url(#biGradient1)" opacity="0.6"/>
                <polyline points="580,70 590,55 600,65 610,45 620,60" fill="none" stroke="#fff" stroke-width="2" opacity="0.5"/>
                <rect x="775" y="45" width="50" height="30" rx="3" fill="url(#biGradient1)" opacity="0.5"/>
                <rect x="780" y="50" width="20" height="8" fill="#fff" opacity="0.3"/>
                <rect x="805" y="50" width="15" height="8" fill="#fff" opacity="0.2"/>
                <rect x="780" y="62" width="40" height="8" fill="#fff" opacity="0.3"/>
                <circle cx="1000" cy="60" r="20" fill="url(#biGradient1)" opacity="0.6"/>
                <text x="1000" y="66" text-anchor="middle" fill="#fff" font-size="16" font-weight="bold" opacity="0.6">?</text>
            </g>
            <path d="M 222,60 Q 300,45 375,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 425,60 Q 500,75 575,60" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 625,60 Q 700,45 775,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 825,60 Q 900,70 980,60" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <circle cx="300" cy="52" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="700" cy="52" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
            </circle>
        </svg>`;

    Layer8SectionConfigs.register('bi', {
        title: 'Business Intelligence',
        subtitle: 'Reporting, Dashboards, Analytics & Data Management',
        icon: '📊',
        svgContent: biSvg,
        initFn: 'initializeBi',
        modules: [
            {
                key: 'reporting', label: 'Reporting', icon: '📊', isDefault: true,
                services: [
                    { key: 'reports', label: 'Reports', icon: '📋', isDefault: true },
                    { key: 'report-templates', label: 'Report Templates', icon: '📄' },
                    { key: 'report-schedules', label: 'Report Schedules', icon: '🗓️' },
                    { key: 'report-executions', label: 'Report Executions', icon: '▶️' },
                    { key: 'report-accesses', label: 'Report Access', icon: '🔐' },
                    { key: 'report-subscriptions', label: 'Subscriptions', icon: '📬' }
                ]
            },
            {
                key: 'dashboards', label: 'Dashboards', icon: '📈',
                services: [
                    { key: 'dashboards', label: 'Dashboards', icon: '🖥️', isDefault: true },
                    { key: 'dashboard-widgets', label: 'Widgets', icon: '🧩' },
                    { key: 'kpis', label: 'KPIs', icon: '🎯' },
                    { key: 'kpi-thresholds', label: 'KPI Thresholds', icon: '⚖️' },
                    { key: 'drilldowns', label: 'Drilldowns', icon: '🔍' },
                    { key: 'dashboard-shares', label: 'Dashboard Shares', icon: '🔗' }
                ]
            },
            {
                key: 'analytics', label: 'Analytics', icon: '📉',
                services: [
                    { key: 'data-cubes', label: 'Data Cubes', icon: '🧊', isDefault: true },
                    { key: 'analysis-models', label: 'Analysis Models', icon: '🔬' },
                    { key: 'predictions', label: 'Predictions', icon: '🔮' },
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
                    { key: 'etl-schedules', label: 'ETL Schedules', icon: '🗓️' },
                    { key: 'data-quality-rules', label: 'Data Quality Rules', icon: '✅' },
                    { key: 'master-data-configs', label: 'Master Data Configs', icon: '🗃️' },
                    { key: 'data-governances', label: 'Data Governance', icon: '📜' }
                ]
            }
        ]
    });
})();
