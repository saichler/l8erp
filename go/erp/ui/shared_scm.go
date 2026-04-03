package ui

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/scm"
	"github.com/saichler/l8types/go/ifs"
)

func registerScmTypes(resources ifs.IResources) {
	// Procurement
	common.RegisterType(resources, &scm.ScmPurchaseRequisition{}, &scm.ScmPurchaseRequisitionList{}, "RequisitionId")
	common.RegisterType(resources, &scm.ScmRequestForQuotation{}, &scm.ScmRequestForQuotationList{}, "RfqId")
	common.RegisterType(resources, &scm.ScmPurchaseOrder{}, &scm.ScmPurchaseOrderList{}, "PurchaseOrderId")
	common.RegisterType(resources, &scm.ScmBlanketOrder{}, &scm.ScmBlanketOrderList{}, "BlanketOrderId")
	common.RegisterType(resources, &scm.ScmSupplierScorecard{}, &scm.ScmSupplierScorecardList{}, "ScorecardId")

	// Inventory Management
	common.RegisterType(resources, &scm.ScmItem{}, &scm.ScmItemList{}, "ItemId")
	common.RegisterType(resources, &scm.ScmItemCategory{}, &scm.ScmItemCategoryList{}, "CategoryId")
	common.RegisterType(resources, &scm.ScmCycleCount{}, &scm.ScmCycleCountList{}, "CycleCountId")

	// Warehouse Management
	common.RegisterType(resources, &scm.ScmWarehouse{}, &scm.ScmWarehouseList{}, "WarehouseId")
	common.RegisterType(resources, &scm.ScmReceivingOrder{}, &scm.ScmReceivingOrderList{}, "ReceivingOrderId")
	common.RegisterType(resources, &scm.ScmWavePlan{}, &scm.ScmWavePlanList{}, "WavePlanId")
	common.RegisterType(resources, &scm.ScmDockSchedule{}, &scm.ScmDockScheduleList{}, "ScheduleId")

	// Logistics and Transportation
	common.RegisterType(resources, &scm.ScmCarrier{}, &scm.ScmCarrierList{}, "CarrierId")
	common.RegisterType(resources, &scm.ScmFreightRate{}, &scm.ScmFreightRateList{}, "RateId")
	common.RegisterType(resources, &scm.ScmShipment{}, &scm.ScmShipmentList{}, "ShipmentId")
	common.RegisterType(resources, &scm.ScmRoute{}, &scm.ScmRouteList{}, "RouteId")
	common.RegisterType(resources, &scm.ScmLoadPlan{}, &scm.ScmLoadPlanList{}, "LoadPlanId")
	common.RegisterType(resources, &scm.ScmReturnAuthorization{}, &scm.ScmReturnAuthorizationList{}, "RmaId")

	// Demand Planning
	common.RegisterType(resources, &scm.ScmDemandForecast{}, &scm.ScmDemandForecastList{}, "ForecastId")
	common.RegisterType(resources, &scm.ScmForecastModel{}, &scm.ScmForecastModelList{}, "ModelId")
	common.RegisterType(resources, &scm.ScmDemandPlan{}, &scm.ScmDemandPlanList{}, "PlanId")
	common.RegisterType(resources, &scm.ScmPromotionalPlan{}, &scm.ScmPromotionalPlanList{}, "PlanId")
	common.RegisterType(resources, &scm.ScmNewProductPlan{}, &scm.ScmNewProductPlanList{}, "PlanId")

	// Supply Planning
	common.RegisterType(resources, &scm.ScmMaterialRequirement{}, &scm.ScmMaterialRequirementList{}, "RequirementId")
	common.RegisterType(resources, &scm.ScmDistributionRequirement{}, &scm.ScmDistributionRequirementList{}, "RequirementId")
	common.RegisterType(resources, &scm.ScmSupplyPlan{}, &scm.ScmSupplyPlanList{}, "PlanId")
	common.RegisterType(resources, &scm.ScmSupplierCollaboration{}, &scm.ScmSupplierCollaborationList{}, "CollaborationId")
	common.RegisterType(resources, &scm.ScmSafetyStock{}, &scm.ScmSafetyStockList{}, "SafetyStockId")
	common.RegisterType(resources, &scm.ScmLeadTime{}, &scm.ScmLeadTimeList{}, "LeadTimeId")
}
