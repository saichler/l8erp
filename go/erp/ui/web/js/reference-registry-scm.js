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
 * ERP Reference Registry - SCM Models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refScm = window.Layer8RefFactory;

window.Layer8DReferenceRegistrySCM = {
    // ========================================
    // SCM - Procurement Models
    // ========================================
    ...refScm.simple('ScmPurchaseOrder', 'purchaseOrderId', 'orderNumber', 'Purchase Order'),
    ...refScm.simple('ScmPurchaseRequisition', 'requisitionId', 'requisitionNumber', 'Requisition'),
    ...refScm.simple('ScmSupplierContract', 'contractId', 'contractNumber', 'Contract'),
    ...refScm.idOnly('ScmContractTerm', 'termId'),
    ...refScm.simple('ScmRequestForQuote', 'rfqId', 'rfqNumber', 'RFQ'),

    // ========================================
    // SCM - Inventory Models
    // ========================================
    ...refScm.coded('ScmItem', 'itemId', 'itemNumber', 'name'),
    ...refScm.batch([
        ['ScmItemCategory', 'categoryId', 'name'],
        ['ScmInventoryLocation', 'locationId', 'name']
    ]),
    ...refScm.batchIdOnly([
        ['ScmStockLevel', 'stockLevelId'],
        ['ScmInventoryCount', 'countId'],
        ['ScmItemPricing', 'pricingId']
    ]),

    // ========================================
    // SCM - Warehouse Management Models
    // ========================================
    ...refScm.coded('ScmWarehouse', 'warehouseId', 'code', 'name'),
    ...refScm.simple('ScmZone', 'zoneId', 'name'),
    ...refScm.idOnly('ScmReceivingOrder', 'receivingOrderId'),

    // ========================================
    // SCM - Logistics & Transportation Models
    // ========================================
    ...refScm.coded('ScmShipmentCarrier', 'carrierId', 'code', 'name'),
    ...refScm.simple('ScmShipment', 'shipmentId', 'shipmentNumber', 'Shipment'),
    ...refScm.idOnly('ScmShipmentLine', 'lineId'),
    ...refScm.idOnly('ScmFreightRate', 'rateId'),
    ...refScm.simple('ScmDeliveryRoute', 'routeId', 'name'),
    ...refScm.idOnly('ScmRouteStop', 'stopId'),
    ...refScm.simple('ScmReturnAuthorization', 'rmaId', 'rmaNumber', 'RMA'),

    // ========================================
    // SCM - Demand Planning Models
    // ========================================
    ...refScm.simple('ScmDemandForecast', 'forecastId', 'forecastId', 'Forecast'),
    ...refScm.batchIdOnly([
        ['ScmForecastItem', 'forecastItemId'],
        ['ScmDemandHistory', 'historyId'],
        ['ScmPromotionImpact', 'impactId'],
        ['ScmConsensusAdjustment', 'adjustmentId']
    ]),
    ...refScm.simple('ScmSeasonalProfile', 'profileId', 'name'),

    // ========================================
    // SCM - Supply Planning Models
    // ========================================
    ...refScm.simple('ScmSupplyPlan', 'planId', 'name', 'Supply Plan'),
    ...refScm.batchIdOnly([
        ['ScmMRPRun', 'mrpRunId'],
        ['ScmMRPException', 'exceptionId'],
        ['ScmSafetyStock', 'safetyStockId']
    ]),
    ...refScm.simple('ScmReorderRule', 'ruleId', 'ruleName'),

    // ========================================
    // SCM - Additional Models
    // ========================================
    ...refScm.simple('ScmCarrier', 'carrierId', 'name', 'Carrier'),
    ...refScm.idOnly('ScmWavePlan', 'wavePlanId')
};
