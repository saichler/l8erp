package tests

import (
	"github.com/saichler/l8erp/go/erp/scm/blanketorders"
	"github.com/saichler/l8erp/go/erp/scm/carriers"
	"github.com/saichler/l8erp/go/erp/scm/cyclecounts"
	"github.com/saichler/l8erp/go/erp/scm/demandforecasts"
	"github.com/saichler/l8erp/go/erp/scm/demandplans"
	"github.com/saichler/l8erp/go/erp/scm/distributionreqs"
	"github.com/saichler/l8erp/go/erp/scm/dockschedules"
	"github.com/saichler/l8erp/go/erp/scm/forecastmodels"
	"github.com/saichler/l8erp/go/erp/scm/freightrates"
	"github.com/saichler/l8erp/go/erp/scm/itemcategories"
	"github.com/saichler/l8erp/go/erp/scm/items"
	"github.com/saichler/l8erp/go/erp/scm/leadtimes"
	"github.com/saichler/l8erp/go/erp/scm/loadplans"
	"github.com/saichler/l8erp/go/erp/scm/materialreqs"
	"github.com/saichler/l8erp/go/erp/scm/newproductplans"
	"github.com/saichler/l8erp/go/erp/scm/promoplans"
	"github.com/saichler/l8erp/go/erp/scm/purchaseorders"
	"github.com/saichler/l8erp/go/erp/scm/purchasereqs"
	"github.com/saichler/l8erp/go/erp/scm/receivingorders"
	"github.com/saichler/l8erp/go/erp/scm/returnauths"
	"github.com/saichler/l8erp/go/erp/scm/rfqs"
	"github.com/saichler/l8erp/go/erp/scm/routes"
	"github.com/saichler/l8erp/go/erp/scm/safetystocks"
	"github.com/saichler/l8erp/go/erp/scm/shipments"
	"github.com/saichler/l8erp/go/erp/scm/suppliercollabs"
	"github.com/saichler/l8erp/go/erp/scm/supplierscorecards"
	"github.com/saichler/l8erp/go/erp/scm/supplyplans"
	"github.com/saichler/l8erp/go/erp/scm/warehouses"
	"github.com/saichler/l8erp/go/erp/scm/waveplans"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceGettersSCM(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if _, err := blanketorders.BlanketOrder("test-id", vnic); err != nil {
		log.Fail(t, "BlanketOrder getter failed: ", err.Error())
	}
	if _, err := carriers.Carrier("test-id", vnic); err != nil {
		log.Fail(t, "Carrier getter failed: ", err.Error())
	}
	if _, err := cyclecounts.CycleCount("test-id", vnic); err != nil {
		log.Fail(t, "CycleCount getter failed: ", err.Error())
	}
	if _, err := demandforecasts.DemandForecast("test-id", vnic); err != nil {
		log.Fail(t, "DemandForecast getter failed: ", err.Error())
	}
	if _, err := demandplans.DemandPlan("test-id", vnic); err != nil {
		log.Fail(t, "DemandPlan getter failed: ", err.Error())
	}
	if _, err := distributionreqs.DistributionRequirement("test-id", vnic); err != nil {
		log.Fail(t, "DistributionRequirement getter failed: ", err.Error())
	}
	if _, err := dockschedules.DockSchedule("test-id", vnic); err != nil {
		log.Fail(t, "DockSchedule getter failed: ", err.Error())
	}
	if _, err := forecastmodels.ForecastModel("test-id", vnic); err != nil {
		log.Fail(t, "ForecastModel getter failed: ", err.Error())
	}
	if _, err := freightrates.FreightRate("test-id", vnic); err != nil {
		log.Fail(t, "FreightRate getter failed: ", err.Error())
	}
	if _, err := itemcategories.ItemCategory("test-id", vnic); err != nil {
		log.Fail(t, "ItemCategory getter failed: ", err.Error())
	}
	if _, err := items.Item("test-id", vnic); err != nil {
		log.Fail(t, "Item getter failed: ", err.Error())
	}
	if _, err := leadtimes.LeadTime("test-id", vnic); err != nil {
		log.Fail(t, "LeadTime getter failed: ", err.Error())
	}
	if _, err := loadplans.LoadPlan("test-id", vnic); err != nil {
		log.Fail(t, "LoadPlan getter failed: ", err.Error())
	}
	if _, err := materialreqs.MaterialRequirement("test-id", vnic); err != nil {
		log.Fail(t, "MaterialRequirement getter failed: ", err.Error())
	}
	if _, err := newproductplans.NewProductPlan("test-id", vnic); err != nil {
		log.Fail(t, "NewProductPlan getter failed: ", err.Error())
	}
	if _, err := promoplans.PromotionalPlan("test-id", vnic); err != nil {
		log.Fail(t, "PromotionalPlan getter failed: ", err.Error())
	}
	if _, err := purchaseorders.PurchaseOrder("test-id", vnic); err != nil {
		log.Fail(t, "PurchaseOrder getter failed: ", err.Error())
	}
	if _, err := purchasereqs.PurchaseRequisition("test-id", vnic); err != nil {
		log.Fail(t, "PurchaseRequisition getter failed: ", err.Error())
	}
	if _, err := receivingorders.ReceivingOrder("test-id", vnic); err != nil {
		log.Fail(t, "ReceivingOrder getter failed: ", err.Error())
	}
	if _, err := returnauths.ReturnAuthorization("test-id", vnic); err != nil {
		log.Fail(t, "ReturnAuthorization getter failed: ", err.Error())
	}
	if _, err := rfqs.RequestForQuotation("test-id", vnic); err != nil {
		log.Fail(t, "RequestForQuotation getter failed: ", err.Error())
	}
	if _, err := routes.Route("test-id", vnic); err != nil {
		log.Fail(t, "Route getter failed: ", err.Error())
	}
	if _, err := safetystocks.SafetyStock("test-id", vnic); err != nil {
		log.Fail(t, "SafetyStock getter failed: ", err.Error())
	}
	if _, err := shipments.Shipment("test-id", vnic); err != nil {
		log.Fail(t, "Shipment getter failed: ", err.Error())
	}
	if _, err := suppliercollabs.SupplierCollaboration("test-id", vnic); err != nil {
		log.Fail(t, "SupplierCollaboration getter failed: ", err.Error())
	}
	if _, err := supplierscorecards.SupplierScorecard("test-id", vnic); err != nil {
		log.Fail(t, "SupplierScorecard getter failed: ", err.Error())
	}
	if _, err := supplyplans.SupplyPlan("test-id", vnic); err != nil {
		log.Fail(t, "SupplyPlan getter failed: ", err.Error())
	}
	if _, err := warehouses.Warehouse("test-id", vnic); err != nil {
		log.Fail(t, "Warehouse getter failed: ", err.Error())
	}
	if _, err := waveplans.WavePlan("test-id", vnic); err != nil {
		log.Fail(t, "WavePlan getter failed: ", err.Error())
	}
}
