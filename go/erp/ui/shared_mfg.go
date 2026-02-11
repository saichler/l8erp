package ui

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8types/go/ifs"
)

func registerMfgTypes(resources ifs.IResources) {
	// Engineering
	common.RegisterType[mfg.MfgBom, mfg.MfgBomList](resources, "BomId")
	common.RegisterType[mfg.MfgRouting, mfg.MfgRoutingList](resources, "RoutingId")
	common.RegisterType[mfg.MfgEngChangeOrder, mfg.MfgEngChangeOrderList](resources, "ChangeOrderId")

	// Production
	common.RegisterType[mfg.MfgWorkOrder, mfg.MfgWorkOrderList](resources, "WorkOrderId")
	common.RegisterType[mfg.MfgProductionOrder, mfg.MfgProductionOrderList](resources, "ProdOrderId")

	// Shop Floor
	common.RegisterType[mfg.MfgWorkCenter, mfg.MfgWorkCenterList](resources, "WorkCenterId")
	common.RegisterType[mfg.MfgWorkCenterCap, mfg.MfgWorkCenterCapList](resources, "CapacityId")
	common.RegisterType[mfg.MfgShiftSchedule, mfg.MfgShiftScheduleList](resources, "ScheduleId")
	common.RegisterType[mfg.MfgDowntimeEvent, mfg.MfgDowntimeEventList](resources, "EventId")

	// Quality
	common.RegisterType[mfg.MfgQualityPlan, mfg.MfgQualityPlanList](resources, "PlanId")
	common.RegisterType[mfg.MfgQualityInspection, mfg.MfgQualityInspectionList](resources, "InspectionId")
	common.RegisterType[mfg.MfgNCR, mfg.MfgNCRList](resources, "NcrId")

	// Planning
	common.RegisterType[mfg.MfgMrpRun, mfg.MfgMrpRunList](resources, "RunId")
	common.RegisterType[mfg.MfgCapacityPlan, mfg.MfgCapacityPlanList](resources, "PlanId")
	common.RegisterType[mfg.MfgProdSchedule, mfg.MfgProdScheduleList](resources, "ScheduleId")

	// Costing
	common.RegisterType[mfg.MfgStandardCost, mfg.MfgStandardCostList](resources, "CostId")
	common.RegisterType[mfg.MfgCostRollup, mfg.MfgCostRollupList](resources, "RollupId")
	common.RegisterType[mfg.MfgOverhead, mfg.MfgOverheadList](resources, "OverheadId")
}
