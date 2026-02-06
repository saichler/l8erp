/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// Manufacturing Module - Configuration
// Module definitions and service mappings

(function() {
    'use strict';

    // Create Mfg namespace
    window.Mfg = window.Mfg || {};

    // Manufacturing Module Configuration
    // IMPORTANT: All endpoints must match ServiceName from *Service.go files
    // Verified with: grep "ServiceName = " go/erp/mfg/*/*.go
    Mfg.modules = {
        'engineering': {
            label: 'Engineering',
            icon: '📐',
            services: [
                { key: 'boms', label: 'BOMs', icon: '📋', endpoint: '/70/MfgBom', model: 'MfgBom' },
                { key: 'bom-lines', label: 'BOM Lines', icon: '📝', endpoint: '/70/MfgBomLine', model: 'MfgBomLine' },
                { key: 'routings', label: 'Routings', icon: '🔄', endpoint: '/70/MfgRouting', model: 'MfgRouting' },
                { key: 'routing-ops', label: 'Routing Ops', icon: '⚙️', endpoint: '/70/MfgRtngOp', model: 'MfgRoutingOperation' },
                { key: 'change-orders', label: 'Change Orders', icon: '📑', endpoint: '/70/MfgECO', model: 'MfgEngChangeOrder' },
                { key: 'change-details', label: 'ECO Details', icon: '📄', endpoint: '/70/MfgECODtl', model: 'MfgEngChangeDetail' }
            ]
        },
        'production': {
            label: 'Production',
            icon: '🏭',
            services: [
                { key: 'work-orders', label: 'Work Orders', icon: '📦', endpoint: '/70/MfgWorkOrd', model: 'MfgWorkOrder' },
                { key: 'wo-operations', label: 'WO Operations', icon: '⚙️', endpoint: '/70/MfgWOOp', model: 'MfgWorkOrderOp' },
                { key: 'prod-orders', label: 'Prod Orders', icon: '📋', endpoint: '/70/MfgProdOrd', model: 'MfgProductionOrder' },
                { key: 'prod-lines', label: 'Prod Lines', icon: '📝', endpoint: '/70/MfgPOLine', model: 'MfgProdOrderLine' },
                { key: 'batches', label: 'Batches', icon: '📦', endpoint: '/70/MfgBatch', model: 'MfgProdBatch' },
                { key: 'consumptions', label: 'Consumptions', icon: '📉', endpoint: '/70/MfgConsump', model: 'MfgProdConsumption' }
            ]
        },
        'shopfloor': {
            label: 'Shop Floor',
            icon: '🔧',
            services: [
                { key: 'work-centers', label: 'Work Centers', icon: '🏭', endpoint: '/70/MfgWorkCtr', model: 'MfgWorkCenter' },
                { key: 'wc-capacity', label: 'WC Capacity', icon: '📊', endpoint: '/70/MfgWCCap', model: 'MfgWorkCenterCap' },
                { key: 'labor', label: 'Labor Entries', icon: '👷', endpoint: '/70/MfgLabor', model: 'MfgLaborEntry' },
                { key: 'machine', label: 'Machine Entries', icon: '⚙️', endpoint: '/70/MfgMachine', model: 'MfgMachineEntry' },
                { key: 'shifts', label: 'Shift Schedules', icon: '📅', endpoint: '/70/MfgShift', model: 'MfgShiftSchedule' },
                { key: 'downtime', label: 'Downtime', icon: '⏸️', endpoint: '/70/MfgDowntm', model: 'MfgDowntimeEvent' }
            ]
        },
        'quality': {
            label: 'Quality',
            icon: '✅',
            services: [
                { key: 'plans', label: 'Quality Plans', icon: '📋', endpoint: '/70/MfgQCPlan', model: 'MfgQualityPlan' },
                { key: 'inspection-points', label: 'Insp Points', icon: '🎯', endpoint: '/70/MfgInspPt', model: 'MfgInspectionPoint' },
                { key: 'inspections', label: 'Inspections', icon: '🔍', endpoint: '/70/MfgQCInsp', model: 'MfgQualityInspection' },
                { key: 'test-results', label: 'Test Results', icon: '📊', endpoint: '/70/MfgTestRes', model: 'MfgTestResult' },
                { key: 'ncrs', label: 'NCRs', icon: '⚠️', endpoint: '/70/MfgNCR', model: 'MfgNCR' },
                { key: 'ncr-actions', label: 'NCR Actions', icon: '📝', endpoint: '/70/MfgNCRAct', model: 'MfgNCRAction' }
            ]
        },
        'planning': {
            label: 'Planning',
            icon: '📈',
            services: [
                { key: 'mrp-runs', label: 'MRP Runs', icon: '🔄', endpoint: '/70/MfgMrpRun', model: 'MfgMrpRun' },
                { key: 'mrp-requirements', label: 'MRP Reqs', icon: '📋', endpoint: '/70/MfgMrpReq', model: 'MfgMrpRequirement' },
                { key: 'capacity-plans', label: 'Capacity Plans', icon: '📊', endpoint: '/70/MfgCapPlan', model: 'MfgCapacityPlan' },
                { key: 'capacity-loads', label: 'Capacity Loads', icon: '📈', endpoint: '/70/MfgCapLoad', model: 'MfgCapacityLoad' },
                { key: 'schedules', label: 'Prod Schedules', icon: '📅', endpoint: '/70/MfgProdSch', model: 'MfgProdSchedule' },
                { key: 'schedule-blocks', label: 'Sched Blocks', icon: '🗓️', endpoint: '/70/MfgSchBlk', model: 'MfgScheduleBlock' }
            ]
        },
        'costing': {
            label: 'Costing',
            icon: '💰',
            services: [
                { key: 'standard-costs', label: 'Standard Costs', icon: '💵', endpoint: '/70/MfgStdCost', model: 'MfgStandardCost' },
                { key: 'cost-rollups', label: 'Cost Rollups', icon: '📊', endpoint: '/70/MfgRollup', model: 'MfgCostRollup' },
                { key: 'actual-costs', label: 'Actual Costs', icon: '💰', endpoint: '/70/MfgActCost', model: 'MfgActualCost' },
                { key: 'variances', label: 'Variances', icon: '📉', endpoint: '/70/MfgCostVar', model: 'MfgCostVariance' },
                { key: 'overheads', label: 'Overheads', icon: '🏢', endpoint: '/70/MfgOverhd', model: 'MfgOverhead' },
                { key: 'overhead-allocs', label: 'OH Allocations', icon: '📋', endpoint: '/70/MfgOHAlloc', model: 'MfgOverheadAlloc' }
            ]
        }
    };

    // Sub-module namespaces for service registry
    Mfg.submodules = ['MfgEngineering', 'MfgProduction', 'MfgShopFloor', 'MfgQuality', 'MfgPlanning', 'MfgCosting'];

    // Render status badge (delegates to shared utility)
    Mfg.renderStatus = Layer8DUtils.renderStatus;

})();
