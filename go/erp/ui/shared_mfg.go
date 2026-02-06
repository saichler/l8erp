package main

import (
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8types/go/ifs"
)

func registerMfgTypes(resources ifs.IResources) {
	// Engineering
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgBom{}, "BomId")
	resources.Registry().Register(&mfg.MfgBomList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgBomLine{}, "LineId")
	resources.Registry().Register(&mfg.MfgBomLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgRouting{}, "RoutingId")
	resources.Registry().Register(&mfg.MfgRoutingList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgRoutingOperation{}, "OperationId")
	resources.Registry().Register(&mfg.MfgRoutingOperationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgEngChangeOrder{}, "ChangeOrderId")
	resources.Registry().Register(&mfg.MfgEngChangeOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgEngChangeDetail{}, "DetailId")
	resources.Registry().Register(&mfg.MfgEngChangeDetailList{})

	// Production
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgWorkOrder{}, "WorkOrderId")
	resources.Registry().Register(&mfg.MfgWorkOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgWorkOrderOp{}, "OperationId")
	resources.Registry().Register(&mfg.MfgWorkOrderOpList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgProductionOrder{}, "ProdOrderId")
	resources.Registry().Register(&mfg.MfgProductionOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgProdOrderLine{}, "LineId")
	resources.Registry().Register(&mfg.MfgProdOrderLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgProdBatch{}, "BatchId")
	resources.Registry().Register(&mfg.MfgProdBatchList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgProdConsumption{}, "ConsumptionId")
	resources.Registry().Register(&mfg.MfgProdConsumptionList{})

	// Shop Floor
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgWorkCenter{}, "WorkCenterId")
	resources.Registry().Register(&mfg.MfgWorkCenterList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgWorkCenterCap{}, "CapacityId")
	resources.Registry().Register(&mfg.MfgWorkCenterCapList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgLaborEntry{}, "EntryId")
	resources.Registry().Register(&mfg.MfgLaborEntryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgMachineEntry{}, "EntryId")
	resources.Registry().Register(&mfg.MfgMachineEntryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgShiftSchedule{}, "ScheduleId")
	resources.Registry().Register(&mfg.MfgShiftScheduleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgDowntimeEvent{}, "EventId")
	resources.Registry().Register(&mfg.MfgDowntimeEventList{})

	// Quality
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgQualityPlan{}, "PlanId")
	resources.Registry().Register(&mfg.MfgQualityPlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgInspectionPoint{}, "PointId")
	resources.Registry().Register(&mfg.MfgInspectionPointList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgQualityInspection{}, "InspectionId")
	resources.Registry().Register(&mfg.MfgQualityInspectionList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgTestResult{}, "ResultId")
	resources.Registry().Register(&mfg.MfgTestResultList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgNCR{}, "NcrId")
	resources.Registry().Register(&mfg.MfgNCRList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgNCRAction{}, "ActionId")
	resources.Registry().Register(&mfg.MfgNCRActionList{})

	// Planning
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgMrpRun{}, "RunId")
	resources.Registry().Register(&mfg.MfgMrpRunList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgMrpRequirement{}, "RequirementId")
	resources.Registry().Register(&mfg.MfgMrpRequirementList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgCapacityPlan{}, "PlanId")
	resources.Registry().Register(&mfg.MfgCapacityPlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgCapacityLoad{}, "LoadId")
	resources.Registry().Register(&mfg.MfgCapacityLoadList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgProdSchedule{}, "ScheduleId")
	resources.Registry().Register(&mfg.MfgProdScheduleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgScheduleBlock{}, "BlockId")
	resources.Registry().Register(&mfg.MfgScheduleBlockList{})

	// Costing
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgStandardCost{}, "CostId")
	resources.Registry().Register(&mfg.MfgStandardCostList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgCostRollup{}, "RollupId")
	resources.Registry().Register(&mfg.MfgCostRollupList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgActualCost{}, "ActualCostId")
	resources.Registry().Register(&mfg.MfgActualCostList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgCostVariance{}, "VarianceId")
	resources.Registry().Register(&mfg.MfgCostVarianceList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgOverhead{}, "OverheadId")
	resources.Registry().Register(&mfg.MfgOverheadList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgOverheadAlloc{}, "AllocationId")
	resources.Registry().Register(&mfg.MfgOverheadAllocList{})
}
