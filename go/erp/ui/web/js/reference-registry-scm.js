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
 * Registers Procurement, Inventory, Warehouse, Logistics, Demand/Supply Planning models.
 */
window.Layer8DReferenceRegistrySCM = {
    // ========================================
    // SCM - Procurement Models
    // ========================================
    ScmPurchaseOrder: {
        idColumn: 'purchaseOrderId',
        displayColumn: 'orderNumber',
        selectColumns: ['purchaseOrderId', 'orderNumber'],
        displayLabel: 'Purchase Order'
    },
    ScmPurchaseOrderLine: {
        idColumn: 'lineId',
        displayColumn: 'lineId'
    },
    ScmPurchaseRequisition: {
        idColumn: 'requisitionId',
        displayColumn: 'requisitionNumber',
        selectColumns: ['requisitionId', 'requisitionNumber'],
        displayLabel: 'Requisition'
    },
    ScmRequisitionLine: {
        idColumn: 'lineId',
        displayColumn: 'lineId'
    },
    ScmSupplierContract: {
        idColumn: 'contractId',
        displayColumn: 'contractNumber',
        selectColumns: ['contractId', 'contractNumber'],
        displayLabel: 'Contract'
    },
    ScmContractTerm: {
        idColumn: 'termId',
        displayColumn: 'termId'
    },
    ScmRequestForQuote: {
        idColumn: 'rfqId',
        displayColumn: 'rfqNumber',
        selectColumns: ['rfqId', 'rfqNumber'],
        displayLabel: 'RFQ'
    },

    // ========================================
    // SCM - Inventory Models
    // ========================================
    ScmItem: {
        idColumn: 'itemId',
        displayColumn: 'name',
        selectColumns: ['itemId', 'itemNumber', 'name'],
        displayFormat: function(item) {
            return item.itemNumber + ' - ' + item.name;
        },
        displayLabel: 'Item'
    },
    ScmItemCategory: {
        idColumn: 'categoryId',
        displayColumn: 'name'
    },
    ScmInventoryLocation: {
        idColumn: 'locationId',
        displayColumn: 'name'
    },
    ScmStockLevel: {
        idColumn: 'stockLevelId',
        displayColumn: 'stockLevelId'
    },
    ScmStockMovement: {
        idColumn: 'movementId',
        displayColumn: 'movementId'
    },
    ScmInventoryCount: {
        idColumn: 'countId',
        displayColumn: 'countId'
    },
    ScmLotSerial: {
        idColumn: 'lotSerialId',
        displayColumn: 'lotNumber'
    },
    ScmItemPricing: {
        idColumn: 'pricingId',
        displayColumn: 'pricingId'
    },

    // ========================================
    // SCM - Warehouse Management Models
    // ========================================
    ScmWarehouse: {
        idColumn: 'warehouseId',
        displayColumn: 'name',
        selectColumns: ['warehouseId', 'code', 'name'],
        displayFormat: function(item) {
            return item.code + ' - ' + item.name;
        },
        displayLabel: 'Warehouse'
    },
    ScmZone: {
        idColumn: 'zoneId',
        displayColumn: 'name'
    },
    ScmBin: {
        idColumn: 'binId',
        displayColumn: 'binCode'
    },
    ScmReceivingOrder: {
        idColumn: 'receivingOrderId',
        displayColumn: 'orderNumber'
    },
    ScmReceivingLine: {
        idColumn: 'lineId',
        displayColumn: 'lineId'
    },
    ScmPickOrder: {
        idColumn: 'pickOrderId',
        displayColumn: 'orderNumber'
    },
    ScmPickLine: {
        idColumn: 'lineId',
        displayColumn: 'lineId'
    },
    ScmPackOrder: {
        idColumn: 'packOrderId',
        displayColumn: 'orderNumber'
    },
    ScmPackLine: {
        idColumn: 'lineId',
        displayColumn: 'lineId'
    },

    // ========================================
    // SCM - Logistics & Transportation Models
    // ========================================
    ScmShipmentCarrier: {
        idColumn: 'carrierId',
        displayColumn: 'name',
        selectColumns: ['carrierId', 'code', 'name'],
        displayFormat: function(item) {
            return item.code + ' - ' + item.name;
        },
        displayLabel: 'Carrier'
    },
    ScmShipment: {
        idColumn: 'shipmentId',
        displayColumn: 'shipmentNumber',
        selectColumns: ['shipmentId', 'shipmentNumber'],
        displayLabel: 'Shipment'
    },
    ScmShipmentLine: {
        idColumn: 'lineId',
        displayColumn: 'lineId'
    },
    ScmFreightRate: {
        idColumn: 'rateId',
        displayColumn: 'rateId'
    },
    ScmDeliveryRoute: {
        idColumn: 'routeId',
        displayColumn: 'name'
    },
    ScmRouteStop: {
        idColumn: 'stopId',
        displayColumn: 'stopId'
    },
    ScmReturnOrder: {
        idColumn: 'returnOrderId',
        displayColumn: 'orderNumber'
    },
    ScmReturnLine: {
        idColumn: 'lineId',
        displayColumn: 'lineId'
    },

    // ========================================
    // SCM - Demand Planning Models
    // ========================================
    ScmDemandForecast: {
        idColumn: 'forecastId',
        displayColumn: 'forecastId',
        selectColumns: ['forecastId', 'itemId'],
        displayLabel: 'Forecast'
    },
    ScmForecastItem: {
        idColumn: 'forecastItemId',
        displayColumn: 'forecastItemId'
    },
    ScmDemandHistory: {
        idColumn: 'historyId',
        displayColumn: 'historyId'
    },
    ScmSeasonalProfile: {
        idColumn: 'profileId',
        displayColumn: 'name'
    },
    ScmPromotionImpact: {
        idColumn: 'impactId',
        displayColumn: 'impactId'
    },
    ScmConsensusAdjustment: {
        idColumn: 'adjustmentId',
        displayColumn: 'adjustmentId'
    },

    // ========================================
    // SCM - Supply Planning Models
    // ========================================
    ScmSupplyPlan: {
        idColumn: 'planId',
        displayColumn: 'name',
        selectColumns: ['planId', 'name'],
        displayLabel: 'Supply Plan'
    },
    ScmPlannedOrder: {
        idColumn: 'plannedOrderId',
        displayColumn: 'orderNumber'
    },
    ScmMRPRun: {
        idColumn: 'mrpRunId',
        displayColumn: 'mrpRunId'
    },
    ScmMRPException: {
        idColumn: 'exceptionId',
        displayColumn: 'exceptionId'
    },
    ScmSafetyStock: {
        idColumn: 'safetyStockId',
        displayColumn: 'safetyStockId'
    },
    ScmReorderRule: {
        idColumn: 'ruleId',
        displayColumn: 'ruleName'
    }
};
