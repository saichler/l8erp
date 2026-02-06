/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - SCM Module
 * Reference configurations for Supply Chain Management models
 */
(function() {
    'use strict';

    window.Layer8MReferenceRegistrySCM = {
        // ========================================
        // SCM - Procurement Models
        // ========================================
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
        ScmRequestForQuotation: {
            idColumn: 'rfqId',
            displayColumn: 'rfqNumber',
            selectColumns: ['rfqId', 'rfqNumber'],
            displayLabel: 'RFQ'
        },
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
        ScmBlanketOrder: {
            idColumn: 'blanketOrderId',
            displayColumn: 'orderNumber',
            selectColumns: ['blanketOrderId', 'orderNumber'],
            displayLabel: 'Blanket Order'
        },
        ScmSupplierScorecard: {
            idColumn: 'scorecardId',
            displayColumn: 'scorecardId'
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
            displayColumn: 'categoryName'
        },
        ScmStockMovement: {
            idColumn: 'movementId',
            displayColumn: 'movementId'
        },
        ScmLotNumber: {
            idColumn: 'lotId',
            displayColumn: 'lotNumber'
        },
        ScmSerialNumber: {
            idColumn: 'serialId',
            displayColumn: 'serialNumber'
        },
        ScmCycleCount: {
            idColumn: 'cycleCountId',
            displayColumn: 'cycleCountId'
        },
        ScmReorderPoint: {
            idColumn: 'reorderPointId',
            displayColumn: 'reorderPointId'
        },
        ScmInventoryValuation: {
            idColumn: 'valuationId',
            displayColumn: 'valuationId'
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
        ScmBin: {
            idColumn: 'binId',
            displayColumn: 'binCode'
        },
        ScmReceivingOrder: {
            idColumn: 'receivingOrderId',
            displayColumn: 'orderNumber'
        },
        ScmPutawayTask: {
            idColumn: 'taskId',
            displayColumn: 'taskId'
        },
        ScmPickTask: {
            idColumn: 'taskId',
            displayColumn: 'taskId'
        },
        ScmPackTask: {
            idColumn: 'taskId',
            displayColumn: 'taskId'
        },
        ScmShipTask: {
            idColumn: 'taskId',
            displayColumn: 'taskId'
        },
        ScmWavePlan: {
            idColumn: 'wavePlanId',
            displayColumn: 'waveName'
        },
        ScmDockSchedule: {
            idColumn: 'scheduleId',
            displayColumn: 'scheduleId'
        },

        // ========================================
        // SCM - Logistics Models
        // ========================================
        ScmCarrier: {
            idColumn: 'carrierId',
            displayColumn: 'name',
            selectColumns: ['carrierId', 'code', 'name'],
            displayFormat: function(item) {
                return item.code + ' - ' + item.name;
            },
            displayLabel: 'Carrier'
        },
        ScmFreightRate: {
            idColumn: 'rateId',
            displayColumn: 'rateId'
        },
        ScmShipment: {
            idColumn: 'shipmentId',
            displayColumn: 'shipmentNumber',
            selectColumns: ['shipmentId', 'shipmentNumber'],
            displayLabel: 'Shipment'
        },
        ScmRoute: {
            idColumn: 'routeId',
            displayColumn: 'name'
        },
        ScmLoadPlan: {
            idColumn: 'loadPlanId',
            displayColumn: 'loadPlanId'
        },
        ScmDeliveryProof: {
            idColumn: 'proofId',
            displayColumn: 'proofId'
        },
        ScmFreightAudit: {
            idColumn: 'auditId',
            displayColumn: 'auditId'
        },
        ScmReturnAuthorization: {
            idColumn: 'rmaId',
            displayColumn: 'rmaNumber',
            selectColumns: ['rmaId', 'rmaNumber'],
            displayLabel: 'RMA'
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
        ScmForecastModel: {
            idColumn: 'modelId',
            displayColumn: 'name'
        },
        ScmDemandPlan: {
            idColumn: 'planId',
            displayColumn: 'name'
        },
        ScmPromotionalPlan: {
            idColumn: 'planId',
            displayColumn: 'planName'
        },
        ScmNewProductPlan: {
            idColumn: 'planId',
            displayColumn: 'productName'
        },
        ScmForecastAccuracy: {
            idColumn: 'accuracyId',
            displayColumn: 'accuracyId'
        },

        // ========================================
        // SCM - Supply Planning Models
        // ========================================
        ScmMaterialRequirement: {
            idColumn: 'requirementId',
            displayColumn: 'requirementId'
        },
        ScmDistributionRequirement: {
            idColumn: 'requirementId',
            displayColumn: 'requirementId'
        },
        ScmSupplyPlan: {
            idColumn: 'planId',
            displayColumn: 'name',
            selectColumns: ['planId', 'name'],
            displayLabel: 'Supply Plan'
        },
        ScmSupplierCollaboration: {
            idColumn: 'collaborationId',
            displayColumn: 'collaborationId'
        },
        ScmSafetyStock: {
            idColumn: 'safetyStockId',
            displayColumn: 'safetyStockId'
        },
        ScmLeadTime: {
            idColumn: 'leadTimeId',
            displayColumn: 'leadTimeId'
        }
    };
})();
