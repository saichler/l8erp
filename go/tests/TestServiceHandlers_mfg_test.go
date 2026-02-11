package tests

import (
	"github.com/saichler/l8erp/go/erp/mfg/boms"
	"github.com/saichler/l8erp/go/erp/mfg/capacityplans"
	"github.com/saichler/l8erp/go/erp/mfg/costrollups"
	"github.com/saichler/l8erp/go/erp/mfg/downtimeevents"
	"github.com/saichler/l8erp/go/erp/mfg/engchangeorders"
	"github.com/saichler/l8erp/go/erp/mfg/mrpruns"
	"github.com/saichler/l8erp/go/erp/mfg/ncrs"
	"github.com/saichler/l8erp/go/erp/mfg/overheads"
	"github.com/saichler/l8erp/go/erp/mfg/prodschedules"
	"github.com/saichler/l8erp/go/erp/mfg/productionorders"
	"github.com/saichler/l8erp/go/erp/mfg/qualityinspections"
	"github.com/saichler/l8erp/go/erp/mfg/qualityplans"
	"github.com/saichler/l8erp/go/erp/mfg/routings"
	"github.com/saichler/l8erp/go/erp/mfg/shiftschedules"
	"github.com/saichler/l8erp/go/erp/mfg/standardcosts"
	"github.com/saichler/l8erp/go/erp/mfg/workcentercaps"
	"github.com/saichler/l8erp/go/erp/mfg/workcenters"
	"github.com/saichler/l8erp/go/erp/mfg/workorders"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceHandlersMFG(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if h, ok := boms.MfgBoms(vnic); !ok || h == nil {
		log.Fail(t, "MfgBom service handler not found")
	}
	if h, ok := routings.MfgRoutings(vnic); !ok || h == nil {
		log.Fail(t, "MfgRouting service handler not found")
	}
	if h, ok := engchangeorders.MfgEngChangeOrders(vnic); !ok || h == nil {
		log.Fail(t, "MfgEngChangeOrder service handler not found")
	}
	if h, ok := workorders.MfgWorkOrders(vnic); !ok || h == nil {
		log.Fail(t, "MfgWorkOrder service handler not found")
	}
	if h, ok := productionorders.MfgProductionOrders(vnic); !ok || h == nil {
		log.Fail(t, "MfgProductionOrder service handler not found")
	}
	if h, ok := workcenters.MfgWorkCenters(vnic); !ok || h == nil {
		log.Fail(t, "MfgWorkCenter service handler not found")
	}
	if h, ok := workcentercaps.MfgWorkCenterCaps(vnic); !ok || h == nil {
		log.Fail(t, "MfgWorkCenterCap service handler not found")
	}
	if h, ok := shiftschedules.MfgShiftSchedules(vnic); !ok || h == nil {
		log.Fail(t, "MfgShiftSchedule service handler not found")
	}
	if h, ok := downtimeevents.MfgDowntimeEvents(vnic); !ok || h == nil {
		log.Fail(t, "MfgDowntimeEvent service handler not found")
	}
	if h, ok := qualityplans.MfgQualityPlans(vnic); !ok || h == nil {
		log.Fail(t, "MfgQualityPlan service handler not found")
	}
	if h, ok := qualityinspections.MfgQualityInspections(vnic); !ok || h == nil {
		log.Fail(t, "MfgQualityInspection service handler not found")
	}
	if h, ok := ncrs.MfgNCRs(vnic); !ok || h == nil {
		log.Fail(t, "MfgNCR service handler not found")
	}
	if h, ok := mrpruns.MfgMrpRuns(vnic); !ok || h == nil {
		log.Fail(t, "MfgMrpRun service handler not found")
	}
	if h, ok := capacityplans.MfgCapacityPlans(vnic); !ok || h == nil {
		log.Fail(t, "MfgCapacityPlan service handler not found")
	}
	if h, ok := prodschedules.MfgProdSchedules(vnic); !ok || h == nil {
		log.Fail(t, "MfgProdSchedule service handler not found")
	}
	if h, ok := standardcosts.MfgStandardCosts(vnic); !ok || h == nil {
		log.Fail(t, "MfgStandardCost service handler not found")
	}
	if h, ok := costrollups.MfgCostRollups(vnic); !ok || h == nil {
		log.Fail(t, "MfgCostRollup service handler not found")
	}
	if h, ok := overheads.MfgOverheads(vnic); !ok || h == nil {
		log.Fail(t, "MfgOverhead service handler not found")
	}
}
