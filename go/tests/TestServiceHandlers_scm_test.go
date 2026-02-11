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

func testServiceHandlersSCM(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if h, ok := blanketorders.BlanketOrders(vnic); !ok || h == nil {
		log.Fail(t, "BlanketOrder service handler not found")
	}
	if h, ok := carriers.Carriers(vnic); !ok || h == nil {
		log.Fail(t, "Carrier service handler not found")
	}
	if h, ok := cyclecounts.CycleCounts(vnic); !ok || h == nil {
		log.Fail(t, "CycleCount service handler not found")
	}
	if h, ok := demandforecasts.DemandForecasts(vnic); !ok || h == nil {
		log.Fail(t, "DemandForecast service handler not found")
	}
	if h, ok := demandplans.DemandPlans(vnic); !ok || h == nil {
		log.Fail(t, "DemandPlan service handler not found")
	}
	if h, ok := distributionreqs.DistributionRequirements(vnic); !ok || h == nil {
		log.Fail(t, "DistributionRequirement service handler not found")
	}
	if h, ok := dockschedules.DockSchedules(vnic); !ok || h == nil {
		log.Fail(t, "DockSchedule service handler not found")
	}
	if h, ok := forecastmodels.ForecastModels(vnic); !ok || h == nil {
		log.Fail(t, "ForecastModel service handler not found")
	}
	if h, ok := freightrates.FreightRates(vnic); !ok || h == nil {
		log.Fail(t, "FreightRate service handler not found")
	}
	if h, ok := itemcategories.ItemCategories(vnic); !ok || h == nil {
		log.Fail(t, "ItemCategory service handler not found")
	}
	if h, ok := items.Items(vnic); !ok || h == nil {
		log.Fail(t, "Item service handler not found")
	}
	if h, ok := leadtimes.LeadTimes(vnic); !ok || h == nil {
		log.Fail(t, "LeadTime service handler not found")
	}
	if h, ok := loadplans.LoadPlans(vnic); !ok || h == nil {
		log.Fail(t, "LoadPlan service handler not found")
	}
	if h, ok := materialreqs.MaterialRequirements(vnic); !ok || h == nil {
		log.Fail(t, "MaterialRequirement service handler not found")
	}
	if h, ok := newproductplans.NewProductPlans(vnic); !ok || h == nil {
		log.Fail(t, "NewProductPlan service handler not found")
	}
	if h, ok := promoplans.PromotionalPlans(vnic); !ok || h == nil {
		log.Fail(t, "PromotionalPlan service handler not found")
	}
	if h, ok := purchaseorders.PurchaseOrders(vnic); !ok || h == nil {
		log.Fail(t, "PurchaseOrder service handler not found")
	}
	if h, ok := purchasereqs.PurchaseRequisitions(vnic); !ok || h == nil {
		log.Fail(t, "PurchaseRequisition service handler not found")
	}
	if h, ok := receivingorders.ReceivingOrders(vnic); !ok || h == nil {
		log.Fail(t, "ReceivingOrder service handler not found")
	}
	if h, ok := returnauths.ReturnAuthorizations(vnic); !ok || h == nil {
		log.Fail(t, "ReturnAuthorization service handler not found")
	}
	if h, ok := rfqs.Rfqs(vnic); !ok || h == nil {
		log.Fail(t, "RequestForQuotation service handler not found")
	}
	if h, ok := routes.Routes(vnic); !ok || h == nil {
		log.Fail(t, "Route service handler not found")
	}
	if h, ok := safetystocks.SafetyStocks(vnic); !ok || h == nil {
		log.Fail(t, "SafetyStock service handler not found")
	}
	if h, ok := shipments.Shipments(vnic); !ok || h == nil {
		log.Fail(t, "Shipment service handler not found")
	}
	if h, ok := suppliercollabs.SupplierCollaborations(vnic); !ok || h == nil {
		log.Fail(t, "SupplierCollaboration service handler not found")
	}
	if h, ok := supplierscorecards.SupplierScorecards(vnic); !ok || h == nil {
		log.Fail(t, "SupplierScorecard service handler not found")
	}
	if h, ok := supplyplans.SupplyPlans(vnic); !ok || h == nil {
		log.Fail(t, "SupplyPlan service handler not found")
	}
	if h, ok := warehouses.Warehouses(vnic); !ok || h == nil {
		log.Fail(t, "Warehouse service handler not found")
	}
	if h, ok := waveplans.WavePlans(vnic); !ok || h == nil {
		log.Fail(t, "WavePlan service handler not found")
	}
}
