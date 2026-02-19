/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Manufacturing Module Configuration - Uses Layer8ModuleConfigFactory
// IMPORTANT: All endpoints must match ServiceName from *Service.go files
Layer8ModuleConfigFactory.create({
    namespace: 'Mfg',
    modules: {
        'engineering': {
            label: 'Engineering', icon: '📐',
            services: [
                { key: 'boms', label: 'BOMs', icon: '📋', endpoint: '/70/MfgBom', model: 'MfgBom', supportedViews: ['table', 'tree'] },
                { key: 'routings', label: 'Routings', icon: '🔄', endpoint: '/70/MfgRouting', model: 'MfgRouting' },
                { key: 'change-orders', label: 'Change Orders', icon: '📑', endpoint: '/70/MfgECO', model: 'MfgEngChangeOrder', supportedViews: ['table', 'kanban'] }
            ]
        },
        'production': {
            label: 'Production', icon: '🏭',
            services: [
                { key: 'work-orders', label: 'Work Orders', icon: '📦', endpoint: '/70/MfgWorkOrd', model: 'MfgWorkOrder', supportedViews: ['table', 'kanban', 'gantt'] },
                { key: 'prod-orders', label: 'Prod Orders', icon: '📋', endpoint: '/70/MfgProdOrd', model: 'MfgProductionOrder', supportedViews: ['table', 'kanban', 'gantt'] }
            ]
        },
        'shopfloor': {
            label: 'Shop Floor', icon: '🔧',
            services: [
                { key: 'work-centers', label: 'Work Centers', icon: '🏭', endpoint: '/70/MfgWorkCtr', model: 'MfgWorkCenter' },
                { key: 'wc-capacity', label: 'WC Capacity', icon: '📊', endpoint: '/70/MfgWCCap', model: 'MfgWorkCenterCap' },
                { key: 'shifts', label: 'Shift Schedules', icon: '📅', endpoint: '/70/MfgShift', model: 'MfgShiftSchedule' },
                { key: 'downtime', label: 'Downtime', icon: '⏸️', endpoint: '/70/MfgDowntm', model: 'MfgDowntimeEvent' }
            ]
        },
        'quality': {
            label: 'Quality', icon: '✅',
            services: [
                { key: 'plans', label: 'Quality Plans', icon: '📋', endpoint: '/70/MfgQCPlan', model: 'MfgQualityPlan' },
                { key: 'inspections', label: 'Inspections', icon: '🔍', endpoint: '/70/MfgQCInsp', model: 'MfgQualityInspection', supportedViews: ['table', 'kanban'] },
                { key: 'ncrs', label: 'NCRs', icon: '⚠️', endpoint: '/70/MfgNCR', model: 'MfgNCR' }
            ]
        },
        'planning': {
            label: 'Planning', icon: '📈',
            services: [
                { key: 'mrp-runs', label: 'MRP Runs', icon: '🔄', endpoint: '/70/MfgMrpRun', model: 'MfgMrpRun' },
                { key: 'capacity-plans', label: 'Capacity Plans', icon: '📊', endpoint: '/70/MfgCapPlan', model: 'MfgCapacityPlan' },
                { key: 'schedules', label: 'Prod Schedules', icon: '📅', endpoint: '/70/MfgProdSch', model: 'MfgProdSchedule', supportedViews: ['table', 'gantt'] }
            ]
        },
        'costing': {
            label: 'Costing', icon: '💰',
            services: [
                { key: 'standard-costs', label: 'Standard Costs', icon: '💵', endpoint: '/70/MfgStdCost', model: 'MfgStandardCost' },
                { key: 'cost-rollups', label: 'Cost Rollups', icon: '📊', endpoint: '/70/MfgRollup', model: 'MfgCostRollup' },
                { key: 'overheads', label: 'Overheads', icon: '🏢', endpoint: '/70/MfgOverhd', model: 'MfgOverhead' }
            ]
        }
    },
    submodules: ['MfgEngineering', 'MfgProduction', 'MfgShopFloor', 'MfgQuality', 'MfgPlanning', 'MfgCosting']
});
