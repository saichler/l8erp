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

func testServiceHandlersMFG(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if h, ok := actualcosts.MfgActualCosts(vnic); !ok || h == nil {
		log.Fail(t, "MfgActualCost service handler not found")
	}
	if h, ok := bomlines.MfgBomLines(vnic); !ok || h == nil {
		log.Fail(t, "MfgBomLine service handler not found")
	}
	if h, ok := boms.MfgBoms(vnic); !ok || h == nil {
		log.Fail(t, "MfgBom service handler not found")
	}
	if h, ok := capacityloads.MfgCapacityLoads(vnic); !ok || h == nil {
		log.Fail(t, "MfgCapacityLoad service handler not found")
	}
	if h, ok := capacityplans.MfgCapacityPlans(vnic); !ok || h == nil {
		log.Fail(t, "MfgCapacityPlan service handler not found")
	}
	if h, ok := costrollups.MfgCostRollups(vnic); !ok || h == nil {
		log.Fail(t, "MfgCostRollup service handler not found")
	}
	if h, ok := costvariances.MfgCostVariances(vnic); !ok || h == nil {
		log.Fail(t, "MfgCostVariance service handler not found")
	}
	if h, ok := downtimeevents.MfgDowntimeEvents(vnic); !ok || h == nil {
		log.Fail(t, "MfgDowntimeEvent service handler not found")
	}
	if h, ok := engchangedetails.MfgEngChangeDetails(vnic); !ok || h == nil {
		log.Fail(t, "MfgEngChangeDetail service handler not found")
	}
	if h, ok := engchangeorders.MfgEngChangeOrders(vnic); !ok || h == nil {
		log.Fail(t, "MfgEngChangeOrder service handler not found")
	}
	if h, ok := inspectionpoints.MfgInspectionPoints(vnic); !ok || h == nil {
		log.Fail(t, "MfgInspectionPoint service handler not found")
	}
	if h, ok := laborentries.MfgLaborEntries(vnic); !ok || h == nil {
		log.Fail(t, "MfgLaborEntry service handler not found")
	}
	if h, ok := machineentries.MfgMachineEntries(vnic); !ok || h == nil {
		log.Fail(t, "MfgMachineEntry service handler not found")
	}
	if h, ok := mrprequirements.MfgMrpRequirements(vnic); !ok || h == nil {
		log.Fail(t, "MfgMrpRequirement service handler not found")
	}
	if h, ok := mrpruns.MfgMrpRuns(vnic); !ok || h == nil {
		log.Fail(t, "MfgMrpRun service handler not found")
	}
	if h, ok := ncractions.MfgNCRActions(vnic); !ok || h == nil {
		log.Fail(t, "MfgNCRAction service handler not found")
	}
	if h, ok := ncrs.MfgNCRs(vnic); !ok || h == nil {
		log.Fail(t, "MfgNCR service handler not found")
	}
	if h, ok := overheadallocs.MfgOverheadAllocs(vnic); !ok || h == nil {
		log.Fail(t, "MfgOverheadAlloc service handler not found")
	}
	if h, ok := overheads.MfgOverheads(vnic); !ok || h == nil {
		log.Fail(t, "MfgOverhead service handler not found")
	}
	if h, ok := prodbatches.MfgProdBatches(vnic); !ok || h == nil {
		log.Fail(t, "MfgProdBatch service handler not found")
	}
	if h, ok := prodconsumptions.MfgProdConsumptions(vnic); !ok || h == nil {
		log.Fail(t, "MfgProdConsumption service handler not found")
	}
	if h, ok := prodorderlines.MfgProdOrderLines(vnic); !ok || h == nil {
		log.Fail(t, "MfgProdOrderLine service handler not found")
	}
	if h, ok := prodschedules.MfgProdSchedules(vnic); !ok || h == nil {
		log.Fail(t, "MfgProdSchedule service handler not found")
	}
	if h, ok := productionorders.MfgProductionOrders(vnic); !ok || h == nil {
		log.Fail(t, "MfgProductionOrder service handler not found")
	}
	if h, ok := qualityinspections.MfgQualityInspections(vnic); !ok || h == nil {
		log.Fail(t, "MfgQualityInspection service handler not found")
	}
	if h, ok := qualityplans.MfgQualityPlans(vnic); !ok || h == nil {
		log.Fail(t, "MfgQualityPlan service handler not found")
	}
	if h, ok := routingoperations.MfgRoutingOperations(vnic); !ok || h == nil {
		log.Fail(t, "MfgRoutingOperation service handler not found")
	}
	if h, ok := routings.MfgRoutings(vnic); !ok || h == nil {
		log.Fail(t, "MfgRouting service handler not found")
	}
	if h, ok := scheduleblocks.MfgScheduleBlocks(vnic); !ok || h == nil {
		log.Fail(t, "MfgScheduleBlock service handler not found")
	}
	if h, ok := shiftschedules.MfgShiftSchedules(vnic); !ok || h == nil {
		log.Fail(t, "MfgShiftSchedule service handler not found")
	}
	if h, ok := standardcosts.MfgStandardCosts(vnic); !ok || h == nil {
		log.Fail(t, "MfgStandardCost service handler not found")
	}
	if h, ok := testresults.MfgTestResults(vnic); !ok || h == nil {
		log.Fail(t, "MfgTestResult service handler not found")
	}
	if h, ok := workcentercaps.MfgWorkCenterCaps(vnic); !ok || h == nil {
		log.Fail(t, "MfgWorkCenterCap service handler not found")
	}
	if h, ok := workcenters.MfgWorkCenters(vnic); !ok || h == nil {
		log.Fail(t, "MfgWorkCenter service handler not found")
	}
	if h, ok := workorderops.MfgWorkOrderOps(vnic); !ok || h == nil {
		log.Fail(t, "MfgWorkOrderOp service handler not found")
	}
	if h, ok := workorders.MfgWorkOrders(vnic); !ok || h == nil {
		log.Fail(t, "MfgWorkOrder service handler not found")
	}
}
