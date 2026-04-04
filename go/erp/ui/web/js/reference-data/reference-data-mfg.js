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
 * Shared Reference Data - Manufacturing Models
 * Used by both desktop and mobile reference registries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    window.ReferenceDataMfg = {
        // ========================================
        // MFG - Engineering Models
        // ========================================
        ...ref.simple('MfgBom', 'bomId', 'bomNumber', 'BOM'),
        ...ref.simple('MfgRouting', 'routingId', 'routingNumber', 'Routing'),

        // ========================================
        // MFG - Shop Floor Models
        // ========================================
        ...ref.coded('MfgWorkCenter', 'workCenterId', 'code', 'name'),

        // ========================================
        // MFG - Production Models
        // ========================================
        ...ref.simple('MfgWorkOrder', 'workOrderId', 'workOrderNumber', 'Work Order'),
        ...ref.simple('MfgProductionOrder', 'prodOrderId', 'orderNumber', 'Production Order'),

        // ========================================
        // MFG - Quality Models
        // ========================================
        ...ref.simple('MfgQualityInspection', 'inspectionId', 'inspectionNumber', 'Inspection'),
        ...ref.simple('MfgNCR', 'ncrId', 'ncrNumber', 'NCR'),

        // ========================================
        // MFG - Planning Models
        // ========================================
        ...ref.simple('MfgCapacityPlan', 'planId', 'planNumber', 'Capacity Plan'),
        ...ref.simple('MfgProdSchedule', 'scheduleId', 'scheduleNumber', 'Production Schedule'),

        // ========================================
        // MFG - Costing Models
        // ========================================
        ...ref.idOnly('MfgCostRollup', 'rollupId')
    };
})();
