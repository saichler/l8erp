/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Manufacturing Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    Layer8SectionConfigs.register('manufacturing', {
        title: 'Manufacturing',
        subtitle: 'Engineering, Production, Shop Floor, Quality, Planning & Costing',
        icon: '🏭',
        svgContent: Layer8SvgFactory.generate('manufacturing'),
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
