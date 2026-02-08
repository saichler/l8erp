package tests

import (
	"github.com/saichler/l8erp/go/erp/mfg/actualcosts"
	"github.com/saichler/l8erp/go/erp/mfg/bomlines"
	"github.com/saichler/l8erp/go/erp/mfg/boms"
	"github.com/saichler/l8erp/go/erp/mfg/capacityloads"
	"github.com/saichler/l8erp/go/erp/mfg/capacityplans"
	"github.com/saichler/l8erp/go/erp/mfg/costrollups"
	"github.com/saichler/l8erp/go/erp/mfg/costvariances"
	"github.com/saichler/l8erp/go/erp/mfg/downtimeevents"
	"github.com/saichler/l8erp/go/erp/mfg/engchangedetails"
	"github.com/saichler/l8erp/go/erp/mfg/engchangeorders"
	"github.com/saichler/l8erp/go/erp/mfg/inspectionpoints"
	"github.com/saichler/l8erp/go/erp/mfg/laborentries"
	"github.com/saichler/l8erp/go/erp/mfg/machineentries"
	"github.com/saichler/l8erp/go/erp/mfg/mrprequirements"
	"github.com/saichler/l8erp/go/erp/mfg/mrpruns"
	"github.com/saichler/l8erp/go/erp/mfg/ncractions"
	"github.com/saichler/l8erp/go/erp/mfg/ncrs"
	"github.com/saichler/l8erp/go/erp/mfg/overheadallocs"
	"github.com/saichler/l8erp/go/erp/mfg/overheads"
	"github.com/saichler/l8erp/go/erp/mfg/prodbatches"
	"github.com/saichler/l8erp/go/erp/mfg/prodconsumptions"
	"github.com/saichler/l8erp/go/erp/mfg/prodorderlines"
	"github.com/saichler/l8erp/go/erp/mfg/prodschedules"
	"github.com/saichler/l8erp/go/erp/mfg/productionorders"
	"github.com/saichler/l8erp/go/erp/mfg/qualityinspections"
	"github.com/saichler/l8erp/go/erp/mfg/qualityplans"
	"github.com/saichler/l8erp/go/erp/mfg/routingoperations"
	"github.com/saichler/l8erp/go/erp/mfg/routings"
	"github.com/saichler/l8erp/go/erp/mfg/scheduleblocks"
	"github.com/saichler/l8erp/go/erp/mfg/shiftschedules"
	"github.com/saichler/l8erp/go/erp/mfg/standardcosts"
	"github.com/saichler/l8erp/go/erp/mfg/testresults"
	"github.com/saichler/l8erp/go/erp/mfg/workcentercaps"
	"github.com/saichler/l8erp/go/erp/mfg/workcenters"
	"github.com/saichler/l8erp/go/erp/mfg/workorderops"
	"github.com/saichler/l8erp/go/erp/mfg/workorders"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceGettersMFG(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if _, err := actualcosts.MfgActualCost("test-id", vnic); err != nil {
		log.Fail(t, "MfgActualCost getter failed: ", err.Error())
	}
	if _, err := bomlines.MfgBomLine("test-id", vnic); err != nil {
		log.Fail(t, "MfgBomLine getter failed: ", err.Error())
	}
	if _, err := boms.MfgBom("test-id", vnic); err != nil {
		log.Fail(t, "MfgBom getter failed: ", err.Error())
	}
	if _, err := capacityloads.MfgCapacityLoad("test-id", vnic); err != nil {
		log.Fail(t, "MfgCapacityLoad getter failed: ", err.Error())
	}
	if _, err := capacityplans.MfgCapacityPlan("test-id", vnic); err != nil {
		log.Fail(t, "MfgCapacityPlan getter failed: ", err.Error())
	}
	if _, err := costrollups.MfgCostRollup("test-id", vnic); err != nil {
		log.Fail(t, "MfgCostRollup getter failed: ", err.Error())
	}
	if _, err := costvariances.MfgCostVariance("test-id", vnic); err != nil {
		log.Fail(t, "MfgCostVariance getter failed: ", err.Error())
	}
	if _, err := downtimeevents.MfgDowntimeEvent("test-id", vnic); err != nil {
		log.Fail(t, "MfgDowntimeEvent getter failed: ", err.Error())
	}
	if _, err := engchangedetails.MfgEngChangeDetail("test-id", vnic); err != nil {
		log.Fail(t, "MfgEngChangeDetail getter failed: ", err.Error())
	}
	if _, err := engchangeorders.MfgEngChangeOrder("test-id", vnic); err != nil {
		log.Fail(t, "MfgEngChangeOrder getter failed: ", err.Error())
	}
	if _, err := inspectionpoints.MfgInspectionPoint("test-id", vnic); err != nil {
		log.Fail(t, "MfgInspectionPoint getter failed: ", err.Error())
	}
	if _, err := laborentries.MfgLaborEntry("test-id", vnic); err != nil {
		log.Fail(t, "MfgLaborEntry getter failed: ", err.Error())
	}
	if _, err := machineentries.MfgMachineEntry("test-id", vnic); err != nil {
		log.Fail(t, "MfgMachineEntry getter failed: ", err.Error())
	}
	if _, err := mrprequirements.MfgMrpRequirement("test-id", vnic); err != nil {
		log.Fail(t, "MfgMrpRequirement getter failed: ", err.Error())
	}
	if _, err := mrpruns.MfgMrpRun("test-id", vnic); err != nil {
		log.Fail(t, "MfgMrpRun getter failed: ", err.Error())
	}
	if _, err := ncractions.MfgNCRAction("test-id", vnic); err != nil {
		log.Fail(t, "MfgNCRAction getter failed: ", err.Error())
	}
	if _, err := ncrs.MfgNCR("test-id", vnic); err != nil {
		log.Fail(t, "MfgNCR getter failed: ", err.Error())
	}
	if _, err := overheadallocs.MfgOverheadAlloc("test-id", vnic); err != nil {
		log.Fail(t, "MfgOverheadAlloc getter failed: ", err.Error())
	}
	if _, err := overheads.MfgOverhead("test-id", vnic); err != nil {
		log.Fail(t, "MfgOverhead getter failed: ", err.Error())
	}
	if _, err := prodbatches.MfgProdBatch("test-id", vnic); err != nil {
		log.Fail(t, "MfgProdBatch getter failed: ", err.Error())
	}
	if _, err := prodconsumptions.MfgProdConsumption("test-id", vnic); err != nil {
		log.Fail(t, "MfgProdConsumption getter failed: ", err.Error())
	}
	if _, err := prodorderlines.MfgProdOrderLine("test-id", vnic); err != nil {
		log.Fail(t, "MfgProdOrderLine getter failed: ", err.Error())
	}
	if _, err := prodschedules.MfgProdSchedule("test-id", vnic); err != nil {
		log.Fail(t, "MfgProdSchedule getter failed: ", err.Error())
	}
	if _, err := productionorders.MfgProductionOrder("test-id", vnic); err != nil {
		log.Fail(t, "MfgProductionOrder getter failed: ", err.Error())
	}
	if _, err := qualityinspections.MfgQualityInspection("test-id", vnic); err != nil {
		log.Fail(t, "MfgQualityInspection getter failed: ", err.Error())
	}
	if _, err := qualityplans.MfgQualityPlan("test-id", vnic); err != nil {
		log.Fail(t, "MfgQualityPlan getter failed: ", err.Error())
	}
	if _, err := routingoperations.MfgRoutingOperation("test-id", vnic); err != nil {
		log.Fail(t, "MfgRoutingOperation getter failed: ", err.Error())
	}
	if _, err := routings.MfgRouting("test-id", vnic); err != nil {
		log.Fail(t, "MfgRouting getter failed: ", err.Error())
	}
	if _, err := scheduleblocks.MfgScheduleBlock("test-id", vnic); err != nil {
		log.Fail(t, "MfgScheduleBlock getter failed: ", err.Error())
	}
	if _, err := shiftschedules.MfgShiftSchedule("test-id", vnic); err != nil {
		log.Fail(t, "MfgShiftSchedule getter failed: ", err.Error())
	}
	if _, err := standardcosts.MfgStandardCost("test-id", vnic); err != nil {
		log.Fail(t, "MfgStandardCost getter failed: ", err.Error())
	}
	if _, err := testresults.MfgTestResult("test-id", vnic); err != nil {
		log.Fail(t, "MfgTestResult getter failed: ", err.Error())
	}
	if _, err := workcentercaps.MfgWorkCenterCap("test-id", vnic); err != nil {
		log.Fail(t, "MfgWorkCenterCap getter failed: ", err.Error())
	}
	if _, err := workcenters.MfgWorkCenter("test-id", vnic); err != nil {
		log.Fail(t, "MfgWorkCenter getter failed: ", err.Error())
	}
	if _, err := workorderops.MfgWorkOrderOp("test-id", vnic); err != nil {
		log.Fail(t, "MfgWorkOrderOp getter failed: ", err.Error())
	}
	if _, err := workorders.MfgWorkOrder("test-id", vnic); err != nil {
		log.Fail(t, "MfgWorkOrder getter failed: ", err.Error())
	}
}
