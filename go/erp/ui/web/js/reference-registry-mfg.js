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
/**
 * ERP Reference Registry - MFG Models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refMfg = window.Layer8RefFactory;

window.Layer8DReferenceRegistryMFG = {
    // ========================================
    // MFG - Engineering Models
    // ========================================
    ...refMfg.simple('MfgBom', 'bomId', 'bomNumber', 'BOM'),
    ...refMfg.idOnly('MfgBomLine', 'lineId'),
    ...refMfg.simple('MfgRouting', 'routingId', 'routingNumber', 'Routing'),
    ...refMfg.idOnly('MfgRoutingOperation', 'operationId'),
    ...refMfg.idOnly('MfgEco', 'ecoId'),

    // ========================================
    // MFG - Shop Floor Models
    // ========================================
    ...refMfg.coded('MfgWorkCenter', 'workCenterId', 'code', 'name'),
    ...refMfg.simple('MfgShift', 'shiftId', 'name', 'Shift'),
    ...refMfg.idOnly('MfgShiftSchedule', 'scheduleId'),
    ...refMfg.idOnly('MfgDowntimeRecord', 'downtimeId'),

    // ========================================
    // MFG - Production Models
    // ========================================
    ...refMfg.simple('MfgWorkOrder', 'workOrderId', 'workOrderNumber', 'Work Order'),
    ...refMfg.idOnly('MfgWorkOrderOperation', 'operationId'),
    ...refMfg.simple('MfgBatch', 'batchId', 'batchNumber', 'Batch'),

    // ========================================
    // MFG - Quality Models
    // ========================================
    ...refMfg.simple('MfgQualityPlan', 'planId', 'planNumber', 'Quality Plan'),
    ...refMfg.idOnly('MfgQualityPlanItem', 'itemId'),
    ...refMfg.simple('MfgInspection', 'inspectionId', 'inspectionNumber', 'Inspection'),
    ...refMfg.idOnly('MfgInspectionResult', 'resultId'),
    ...refMfg.simple('MfgNcr', 'ncrId', 'ncrNumber', 'NCR'),

    // ========================================
    // MFG - Planning Models
    // ========================================
    ...refMfg.idOnly('MfgMrpRun', 'runId'),
    ...refMfg.idOnly('MfgMrpRequirement', 'requirementId'),
    ...refMfg.idOnly('MfgScheduleLine', 'lineId'),

    // ========================================
    // MFG - Costing Models
    // ========================================
    ...refMfg.simple('MfgCostElement', 'elementId', 'name', 'Cost Element'),
    ...refMfg.idOnly('MfgCostRollup', 'rollupId'),
    ...refMfg.idOnly('MfgCostVariance', 'varianceId'),
    ...refMfg.idOnly('MfgOverheadAllocation', 'allocationId'),

    // ========================================
    // MFG - Additional Engineering Models
    // ========================================
    ...refMfg.simple('MfgEngChangeOrder', 'changeOrderId', 'ecoNumber', 'ECO'),

    // ========================================
    // MFG - Additional Planning Models
    // ========================================
    ...refMfg.simple('MfgCapacityPlan', 'planId', 'planNumber', 'Capacity Plan'),
    ...refMfg.simple('MfgProdSchedule', 'scheduleId', 'scheduleNumber', 'Production Schedule'),

    // ========================================
    // MFG - Additional Production Models
    // ========================================
    ...refMfg.simple('MfgProductionOrder', 'prodOrderId', 'orderNumber', 'Production Order'),

    // ========================================
    // MFG - Additional Quality Models
    // ========================================
    ...refMfg.idOnly('MfgInspectionPoint', 'pointId'),
    ...refMfg.simple('MfgNCR', 'ncrId', 'ncrNumber', 'NCR'),
    ...refMfg.simple('MfgQualityInspection', 'inspectionId', 'inspectionNumber', 'Quality Inspection')
};
