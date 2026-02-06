package main

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/scm"
	"github.com/saichler/l8types/go/ifs"
)

func registerScmTypes(resources ifs.IResources) {
	// Procurement
	common.RegisterType[scm.ScmPurchaseRequisition, scm.ScmPurchaseRequisitionList](resources, "RequisitionId")
	common.RegisterType[scm.ScmRequisitionLine, scm.ScmRequisitionLineList](resources, "LineId")
	common.RegisterType[scm.ScmRequestForQuotation, scm.ScmRequestForQuotationList](resources, "RfqId")
	common.RegisterType[scm.ScmPurchaseOrder, scm.ScmPurchaseOrderList](resources, "PurchaseOrderId")
	common.RegisterType[scm.ScmPurchaseOrderLine, scm.ScmPurchaseOrderLineList](resources, "LineId")
	common.RegisterType[scm.ScmBlanketOrder, scm.ScmBlanketOrderList](resources, "BlanketOrderId")
	common.RegisterType[scm.ScmSupplierScorecard, scm.ScmSupplierScorecardList](resources, "ScorecardId")

	// Inventory Management
	common.RegisterType[scm.ScmItem, scm.ScmItemList](resources, "ItemId")
	common.RegisterType[scm.ScmItemCategory, scm.ScmItemCategoryList](resources, "CategoryId")
	common.RegisterType[scm.ScmStockMovement, scm.ScmStockMovementList](resources, "MovementId")
	common.RegisterType[scm.ScmLotNumber, scm.ScmLotNumberList](resources, "LotId")
	common.RegisterType[scm.ScmSerialNumber, scm.ScmSerialNumberList](resources, "SerialId")
	common.RegisterType[scm.ScmCycleCount, scm.ScmCycleCountList](resources, "CycleCountId")
	common.RegisterType[scm.ScmReorderPoint, scm.ScmReorderPointList](resources, "ReorderPointId")
	common.RegisterType[scm.ScmInventoryValuation, scm.ScmInventoryValuationList](resources, "ValuationId")

	// Warehouse Management
	common.RegisterType[scm.ScmWarehouse, scm.ScmWarehouseList](resources, "WarehouseId")
	common.RegisterType[scm.ScmBin, scm.ScmBinList](resources, "BinId")
	common.RegisterType[scm.ScmReceivingOrder, scm.ScmReceivingOrderList](resources, "ReceivingOrderId")
	common.RegisterType[scm.ScmPutawayTask, scm.ScmPutawayTaskList](resources, "TaskId")
	common.RegisterType[scm.ScmPickTask, scm.ScmPickTaskList](resources, "TaskId")
	common.RegisterType[scm.ScmPackTask, scm.ScmPackTaskList](resources, "TaskId")
	common.RegisterType[scm.ScmShipTask, scm.ScmShipTaskList](resources, "TaskId")
	common.RegisterType[scm.ScmWavePlan, scm.ScmWavePlanList](resources, "WavePlanId")
	common.RegisterType[scm.ScmDockSchedule, scm.ScmDockScheduleList](resources, "ScheduleId")

	// Logistics and Transportation
	common.RegisterType[scm.ScmCarrier, scm.ScmCarrierList](resources, "CarrierId")
	common.RegisterType[scm.ScmFreightRate, scm.ScmFreightRateList](resources, "RateId")
	common.RegisterType[scm.ScmShipment, scm.ScmShipmentList](resources, "ShipmentId")
	common.RegisterType[scm.ScmRoute, scm.ScmRouteList](resources, "RouteId")
	common.RegisterType[scm.ScmLoadPlan, scm.ScmLoadPlanList](resources, "LoadPlanId")
	common.RegisterType[scm.ScmDeliveryProof, scm.ScmDeliveryProofList](resources, "ProofId")
	common.RegisterType[scm.ScmFreightAudit, scm.ScmFreightAuditList](resources, "AuditId")
	common.RegisterType[scm.ScmReturnAuthorization, scm.ScmReturnAuthorizationList](resources, "RmaId")

	// Demand Planning
	common.RegisterType[scm.ScmDemandForecast, scm.ScmDemandForecastList](resources, "ForecastId")
	common.RegisterType[scm.ScmForecastModel, scm.ScmForecastModelList](resources, "ModelId")
	common.RegisterType[scm.ScmDemandPlan, scm.ScmDemandPlanList](resources, "PlanId")
	common.RegisterType[scm.ScmPromotionalPlan, scm.ScmPromotionalPlanList](resources, "PlanId")
	common.RegisterType[scm.ScmNewProductPlan, scm.ScmNewProductPlanList](resources, "PlanId")
	common.RegisterType[scm.ScmForecastAccuracy, scm.ScmForecastAccuracyList](resources, "AccuracyId")

	// Supply Planning
	common.RegisterType[scm.ScmMaterialRequirement, scm.ScmMaterialRequirementList](resources, "RequirementId")
	common.RegisterType[scm.ScmDistributionRequirement, scm.ScmDistributionRequirementList](resources, "RequirementId")
	common.RegisterType[scm.ScmSupplyPlan, scm.ScmSupplyPlanList](resources, "PlanId")
	common.RegisterType[scm.ScmSupplierCollaboration, scm.ScmSupplierCollaborationList](resources, "CollaborationId")
	common.RegisterType[scm.ScmSafetyStock, scm.ScmSafetyStockList](resources, "SafetyStockId")
	common.RegisterType[scm.ScmLeadTime, scm.ScmLeadTimeList](resources, "LeadTimeId")
}
