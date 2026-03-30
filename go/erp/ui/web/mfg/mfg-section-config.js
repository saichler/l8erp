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
                    { key: 'routings', label: 'Routings', icon: '🔄' },
                    { key: 'change-orders', label: 'Change Orders', icon: '📑' }
                ]
            },
            {
                key: 'production', label: 'Production', icon: '🏭', isDefault: true,
                services: [
                    { key: 'work-orders', label: 'Work Orders', icon: '📦', isDefault: true },
                    { key: 'prod-orders', label: 'Prod Orders', icon: '📋' }
                ]
            },
            {
                key: 'shopfloor', label: 'Shop Floor', icon: '🔧',
                services: [
                    { key: 'work-centers', label: 'Work Centers', icon: '🏭', isDefault: true },
                    { key: 'wc-capacity', label: 'WC Capacity', icon: '📊' },
                    { key: 'shifts', label: 'Shift Schedules', icon: '📅' },
                    { key: 'downtime', label: 'Downtime', icon: '⏸️' }
                ]
            },
            {
                key: 'quality', label: 'Quality', icon: '✅',
                services: [
                    { key: 'plans', label: 'Quality Plans', icon: '📋', isDefault: true },
                    { key: 'inspections', label: 'Inspections', icon: '🔍' },
                    { key: 'ncrs', label: 'NCRs', icon: '⚠️' }
                ]
            },
            {
                key: 'planning', label: 'Planning', icon: '📈',
                services: [
                    { key: 'mrp-runs', label: 'MRP Runs', icon: '🔄', isDefault: true },
                    { key: 'capacity-plans', label: 'Capacity Plans', icon: '📊' },
                    { key: 'schedules', label: 'Prod Schedules', icon: '📅' }
                ]
            },
            {
                key: 'costing', label: 'Costing', icon: '💰',
                services: [
                    { key: 'standard-costs', label: 'Standard Costs', icon: '💵', isDefault: true },
                    { key: 'cost-rollups', label: 'Cost Rollups', icon: '📊' },
                    { key: 'overheads', label: 'Overheads', icon: '🏢' }
                ]
            },
            {
                key: 'reports',
                label: 'Reports',
                icon: '📊',
                services: [
                    { key: 'module-reports', label: 'Module Reports', icon: '📊', isDefault: true }
                ]
            }
        ]
    });
})();
