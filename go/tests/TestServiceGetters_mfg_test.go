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

func testServiceGettersMFG(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if _, err := boms.MfgBom("test-id", vnic); err != nil {
		log.Fail(t, "MfgBom getter failed: ", err.Error())
	}
	if _, err := routings.MfgRouting("test-id", vnic); err != nil {
		log.Fail(t, "MfgRouting getter failed: ", err.Error())
	}
	if _, err := engchangeorders.MfgEngChangeOrder("test-id", vnic); err != nil {
		log.Fail(t, "MfgEngChangeOrder getter failed: ", err.Error())
	}
	if _, err := workorders.MfgWorkOrder("test-id", vnic); err != nil {
		log.Fail(t, "MfgWorkOrder getter failed: ", err.Error())
	}
	if _, err := productionorders.MfgProductionOrder("test-id", vnic); err != nil {
		log.Fail(t, "MfgProductionOrder getter failed: ", err.Error())
	}
	if _, err := workcenters.MfgWorkCenter("test-id", vnic); err != nil {
		log.Fail(t, "MfgWorkCenter getter failed: ", err.Error())
	}
	if _, err := workcentercaps.MfgWorkCenterCap("test-id", vnic); err != nil {
		log.Fail(t, "MfgWorkCenterCap getter failed: ", err.Error())
	}
	if _, err := shiftschedules.MfgShiftSchedule("test-id", vnic); err != nil {
		log.Fail(t, "MfgShiftSchedule getter failed: ", err.Error())
	}
	if _, err := downtimeevents.MfgDowntimeEvent("test-id", vnic); err != nil {
		log.Fail(t, "MfgDowntimeEvent getter failed: ", err.Error())
	}
	if _, err := qualityplans.MfgQualityPlan("test-id", vnic); err != nil {
		log.Fail(t, "MfgQualityPlan getter failed: ", err.Error())
	}
	if _, err := qualityinspections.MfgQualityInspection("test-id", vnic); err != nil {
		log.Fail(t, "MfgQualityInspection getter failed: ", err.Error())
	}
	if _, err := ncrs.MfgNCR("test-id", vnic); err != nil {
		log.Fail(t, "MfgNCR getter failed: ", err.Error())
	}
	if _, err := mrpruns.MfgMrpRun("test-id", vnic); err != nil {
		log.Fail(t, "MfgMrpRun getter failed: ", err.Error())
	}
	if _, err := capacityplans.MfgCapacityPlan("test-id", vnic); err != nil {
		log.Fail(t, "MfgCapacityPlan getter failed: ", err.Error())
	}
	if _, err := prodschedules.MfgProdSchedule("test-id", vnic); err != nil {
		log.Fail(t, "MfgProdSchedule getter failed: ", err.Error())
	}
	if _, err := standardcosts.MfgStandardCost("test-id", vnic); err != nil {
		log.Fail(t, "MfgStandardCost getter failed: ", err.Error())
	}
	if _, err := costrollups.MfgCostRollup("test-id", vnic); err != nil {
		log.Fail(t, "MfgCostRollup getter failed: ", err.Error())
	}
	if _, err := overheads.MfgOverhead("test-id", vnic); err != nil {
		log.Fail(t, "MfgOverhead getter failed: ", err.Error())
	}
}
