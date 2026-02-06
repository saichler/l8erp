/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Manufacturing Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    const mfgSvg = `
        <svg class="hcm-illustration" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="mfgGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
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
                <circle cx="190" cy="60" r="20" fill="none" stroke="url(#mfgGradient1)" stroke-width="3" opacity="0.6"/>
                <circle cx="190" cy="60" r="8" fill="url(#mfgGradient1)" opacity="0.4"/>
                <rect x="375" y="40" width="50" height="40" rx="2" fill="url(#mfgGradient1)" opacity="0.5"/>
                <rect x="380" y="30" width="10" height="10" fill="url(#mfgGradient1)" opacity="0.6"/>
                <rect x="395" y="25" width="10" height="15" fill="url(#mfgGradient1)" opacity="0.6"/>
                <rect x="410" y="35" width="10" height="5" fill="url(#mfgGradient1)" opacity="0.6"/>
                <rect x="575" y="55" width="50" height="10" rx="2" fill="url(#mfgGradient1)" opacity="0.5"/>
                <circle cx="585" cy="60" r="6" fill="#0ea5e9" opacity="0.6"/>
                <circle cx="600" cy="60" r="6" fill="#0ea5e9" opacity="0.5"/>
                <circle cx="615" cy="60" r="6" fill="#0ea5e9" opacity="0.4"/>
                <rect x="775" y="45" width="30" height="30" rx="3" fill="url(#mfgGradient1)" opacity="0.5"/>
                <path d="M 782,60 L 788,66 L 798,54" fill="none" stroke="#fff" stroke-width="2" opacity="0.6"/>
                <rect x="975" y="55" width="8" height="25" rx="1" fill="url(#mfgGradient1)" opacity="0.5"/>
                <rect x="988" y="45" width="8" height="35" rx="1" fill="url(#mfgGradient1)" opacity="0.6"/>
                <rect x="1001" y="50" width="8" height="30" rx="1" fill="url(#mfgGradient1)" opacity="0.7"/>
            </g>
            <path d="M 210,60 Q 290,45 375,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 425,60 Q 500,75 575,60" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 625,60 Q 700,45 775,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 805,60 Q 890,75 975,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <circle cx="290" cy="52" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="700" cy="52" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
            </circle>
        </svg>`;

    Layer8SectionConfigs.register('manufacturing', {
        title: 'Manufacturing',
        subtitle: 'Engineering, Production, Shop Floor, Quality, Planning & Costing',
        icon: '🏭',
        svgContent: mfgSvg,
        initFn: 'initializeMfg',
        modules: [
            {
                key: 'engineering', label: 'Engineering', icon: '📐',
                services: [
                    { key: 'boms', label: 'BOMs', icon: '📋', isDefault: true },
                    { key: 'bom-lines', label: 'BOM Lines', icon: '📝' },
                    { key: 'routings', label: 'Routings', icon: '🔄' },
                    { key: 'routing-ops', label: 'Routing Ops', icon: '⚙️' },
                    { key: 'change-orders', label: 'Change Orders', icon: '📑' },
                    { key: 'change-details', label: 'ECO Details', icon: '📄' }
                ]
            },
            {
                key: 'production', label: 'Production', icon: '🏭', isDefault: true,
                services: [
                    { key: 'work-orders', label: 'Work Orders', icon: '📦', isDefault: true },
                    { key: 'wo-operations', label: 'WO Operations', icon: '⚙️' },
                    { key: 'prod-orders', label: 'Prod Orders', icon: '📋' },
                    { key: 'prod-lines', label: 'Prod Lines', icon: '📝' },
                    { key: 'batches', label: 'Batches', icon: '📦' },
                    { key: 'consumptions', label: 'Consumptions', icon: '📉' }
                ]
            },
            {
                key: 'shopfloor', label: 'Shop Floor', icon: '🔧',
                services: [
                    { key: 'work-centers', label: 'Work Centers', icon: '🏭', isDefault: true },
                    { key: 'wc-capacity', label: 'WC Capacity', icon: '📊' },
                    { key: 'labor', label: 'Labor Entries', icon: '👷' },
                    { key: 'machine', label: 'Machine Entries', icon: '⚙️' },
                    { key: 'shifts', label: 'Shift Schedules', icon: '📅' },
                    { key: 'downtime', label: 'Downtime', icon: '⏸️' }
                ]
            },
            {
                key: 'quality', label: 'Quality', icon: '✅',
                services: [
                    { key: 'plans', label: 'Quality Plans', icon: '📋', isDefault: true },
                    { key: 'inspection-points', label: 'Insp Points', icon: '🎯' },
                    { key: 'inspections', label: 'Inspections', icon: '🔍' },
                    { key: 'test-results', label: 'Test Results', icon: '📊' },
                    { key: 'ncrs', label: 'NCRs', icon: '⚠️' },
                    { key: 'ncr-actions', label: 'NCR Actions', icon: '📝' }
                ]
            },
            {
                key: 'planning', label: 'Planning', icon: '📈',
                services: [
                    { key: 'mrp-runs', label: 'MRP Runs', icon: '🔄', isDefault: true },
                    { key: 'mrp-requirements', label: 'MRP Reqs', icon: '📋' },
                    { key: 'capacity-plans', label: 'Capacity Plans', icon: '📊' },
                    { key: 'capacity-loads', label: 'Capacity Loads', icon: '📈' },
                    { key: 'schedules', label: 'Prod Schedules', icon: '📅' },
                    { key: 'schedule-blocks', label: 'Sched Blocks', icon: '🗓️' }
                ]
            },
            {
                key: 'costing', label: 'Costing', icon: '💰',
                services: [
                    { key: 'standard-costs', label: 'Standard Costs', icon: '💵', isDefault: true },
                    { key: 'cost-rollups', label: 'Cost Rollups', icon: '📊' },
                    { key: 'actual-costs', label: 'Actual Costs', icon: '💰' },
                    { key: 'variances', label: 'Variances', icon: '📉' },
                    { key: 'overheads', label: 'Overheads', icon: '🏢' },
                    { key: 'overhead-allocs', label: 'OH Allocations', icon: '📋' }
                ]
            }
        ]
    });
})();
