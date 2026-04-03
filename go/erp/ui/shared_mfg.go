package ui

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8types/go/ifs"
)

func registerMfgTypes(resources ifs.IResources) {
	// Engineering
	common.RegisterType(resources, &mfg.MfgBom{}, &mfg.MfgBomList{}, "BomId")
	common.RegisterType(resources, &mfg.MfgRouting{}, &mfg.MfgRoutingList{}, "RoutingId")
	common.RegisterType(resources, &mfg.MfgEngChangeOrder{}, &mfg.MfgEngChangeOrderList{}, "ChangeOrderId")

	// Production
	common.RegisterType(resources, &mfg.MfgWorkOrder{}, &mfg.MfgWorkOrderList{}, "WorkOrderId")
	common.RegisterType(resources, &mfg.MfgProductionOrder{}, &mfg.MfgProductionOrderList{}, "ProdOrderId")

	// Shop Floor
	common.RegisterType(resources, &mfg.MfgWorkCenter{}, &mfg.MfgWorkCenterList{}, "WorkCenterId")
	common.RegisterType(resources, &mfg.MfgWorkCenterCap{}, &mfg.MfgWorkCenterCapList{}, "CapacityId")
	common.RegisterType(resources, &mfg.MfgShiftSchedule{}, &mfg.MfgShiftScheduleList{}, "ScheduleId")
	common.RegisterType(resources, &mfg.MfgDowntimeEvent{}, &mfg.MfgDowntimeEventList{}, "EventId")

	// Quality
	common.RegisterType(resources, &mfg.MfgQualityPlan{}, &mfg.MfgQualityPlanList{}, "PlanId")
	common.RegisterType(resources, &mfg.MfgQualityInspection{}, &mfg.MfgQualityInspectionList{}, "InspectionId")
	common.RegisterType(resources, &mfg.MfgNCR{}, &mfg.MfgNCRList{}, "NcrId")

	// Planning
	common.RegisterType(resources, &mfg.MfgMrpRun{}, &mfg.MfgMrpRunList{}, "RunId")
	common.RegisterType(resources, &mfg.MfgCapacityPlan{}, &mfg.MfgCapacityPlanList{}, "PlanId")
	common.RegisterType(resources, &mfg.MfgProdSchedule{}, &mfg.MfgProdScheduleList{}, "ScheduleId")

	// Costing
	common.RegisterType(resources, &mfg.MfgStandardCost{}, &mfg.MfgStandardCostList{}, "CostId")
	common.RegisterType(resources, &mfg.MfgCostRollup{}, &mfg.MfgCostRollupList{}, "RollupId")
	common.RegisterType(resources, &mfg.MfgOverhead{}, &mfg.MfgOverheadList{}, "OverheadId")
}
