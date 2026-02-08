package ui

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8types/go/ifs"
)

func registerMfgTypes(resources ifs.IResources) {
	// Engineering
	common.RegisterType[mfg.MfgBom, mfg.MfgBomList](resources, "BomId")
	common.RegisterType[mfg.MfgBomLine, mfg.MfgBomLineList](resources, "LineId")
	common.RegisterType[mfg.MfgRouting, mfg.MfgRoutingList](resources, "RoutingId")
	common.RegisterType[mfg.MfgRoutingOperation, mfg.MfgRoutingOperationList](resources, "OperationId")
	common.RegisterType[mfg.MfgEngChangeOrder, mfg.MfgEngChangeOrderList](resources, "ChangeOrderId")
	common.RegisterType[mfg.MfgEngChangeDetail, mfg.MfgEngChangeDetailList](resources, "DetailId")

	// Production
	common.RegisterType[mfg.MfgWorkOrder, mfg.MfgWorkOrderList](resources, "WorkOrderId")
	common.RegisterType[mfg.MfgWorkOrderOp, mfg.MfgWorkOrderOpList](resources, "OperationId")
	common.RegisterType[mfg.MfgProductionOrder, mfg.MfgProductionOrderList](resources, "ProdOrderId")
	common.RegisterType[mfg.MfgProdOrderLine, mfg.MfgProdOrderLineList](resources, "LineId")
	common.RegisterType[mfg.MfgProdBatch, mfg.MfgProdBatchList](resources, "BatchId")
	common.RegisterType[mfg.MfgProdConsumption, mfg.MfgProdConsumptionList](resources, "ConsumptionId")

	// Shop Floor
	common.RegisterType[mfg.MfgWorkCenter, mfg.MfgWorkCenterList](resources, "WorkCenterId")
	common.RegisterType[mfg.MfgWorkCenterCap, mfg.MfgWorkCenterCapList](resources, "CapacityId")
	common.RegisterType[mfg.MfgLaborEntry, mfg.MfgLaborEntryList](resources, "EntryId")
	common.RegisterType[mfg.MfgMachineEntry, mfg.MfgMachineEntryList](resources, "EntryId")
	common.RegisterType[mfg.MfgShiftSchedule, mfg.MfgShiftScheduleList](resources, "ScheduleId")
	common.RegisterType[mfg.MfgDowntimeEvent, mfg.MfgDowntimeEventList](resources, "EventId")

	// Quality
	common.RegisterType[mfg.MfgQualityPlan, mfg.MfgQualityPlanList](resources, "PlanId")
	common.RegisterType[mfg.MfgInspectionPoint, mfg.MfgInspectionPointList](resources, "PointId")
	common.RegisterType[mfg.MfgQualityInspection, mfg.MfgQualityInspectionList](resources, "InspectionId")
	common.RegisterType[mfg.MfgTestResult, mfg.MfgTestResultList](resources, "ResultId")
	common.RegisterType[mfg.MfgNCR, mfg.MfgNCRList](resources, "NcrId")
	common.RegisterType[mfg.MfgNCRAction, mfg.MfgNCRActionList](resources, "ActionId")

	// Planning
	common.RegisterType[mfg.MfgMrpRun, mfg.MfgMrpRunList](resources, "RunId")
	common.RegisterType[mfg.MfgMrpRequirement, mfg.MfgMrpRequirementList](resources, "RequirementId")
	common.RegisterType[mfg.MfgCapacityPlan, mfg.MfgCapacityPlanList](resources, "PlanId")
	common.RegisterType[mfg.MfgCapacityLoad, mfg.MfgCapacityLoadList](resources, "LoadId")
	common.RegisterType[mfg.MfgProdSchedule, mfg.MfgProdScheduleList](resources, "ScheduleId")
	common.RegisterType[mfg.MfgScheduleBlock, mfg.MfgScheduleBlockList](resources, "BlockId")

	// Costing
	common.RegisterType[mfg.MfgStandardCost, mfg.MfgStandardCostList](resources, "CostId")
	common.RegisterType[mfg.MfgCostRollup, mfg.MfgCostRollupList](resources, "RollupId")
	common.RegisterType[mfg.MfgActualCost, mfg.MfgActualCostList](resources, "ActualCostId")
	common.RegisterType[mfg.MfgCostVariance, mfg.MfgCostVarianceList](resources, "VarianceId")
	common.RegisterType[mfg.MfgOverhead, mfg.MfgOverheadList](resources, "OverheadId")
	common.RegisterType[mfg.MfgOverheadAlloc, mfg.MfgOverheadAllocList](resources, "AllocationId")
}
