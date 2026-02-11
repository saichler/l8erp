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
    ...refMfg.simple('MfgRouting', 'routingId', 'routingNumber', 'Routing'),

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

    // ========================================
    // MFG - Quality Models
    // ========================================
    ...refMfg.simple('MfgQualityPlan', 'planId', 'planNumber', 'Quality Plan'),
    ...refMfg.simple('MfgQualityInspection', 'inspectionId', 'inspectionNumber', 'Inspection'),
    ...refMfg.simple('MfgNCR', 'ncrId', 'ncrNumber', 'NCR'),

    // ========================================
    // MFG - Planning Models
    // ========================================
    ...refMfg.idOnly('MfgMrpRun', 'runId'),

    // ========================================
    // MFG - Costing Models
    // ========================================
    ...refMfg.idOnly('MfgCostRollup', 'rollupId'),

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

};
