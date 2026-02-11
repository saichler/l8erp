package tests

import (
	"github.com/saichler/l8erp/go/erp/sales/billingschedules"
	"github.com/saichler/l8erp/go/erp/sales/commissionplans"
	"github.com/saichler/l8erp/go/erp/sales/customercontracts"
	"github.com/saichler/l8erp/go/erp/sales/customerhierarchies"
	"github.com/saichler/l8erp/go/erp/sales/customersegments"
	"github.com/saichler/l8erp/go/erp/sales/deliveryorders"
	"github.com/saichler/l8erp/go/erp/sales/discountrules"
	"github.com/saichler/l8erp/go/erp/sales/partnerchannels"
	"github.com/saichler/l8erp/go/erp/sales/pricelists"
	"github.com/saichler/l8erp/go/erp/sales/promotionalprices"
	"github.com/saichler/l8erp/go/erp/sales/returnorders"
	"github.com/saichler/l8erp/go/erp/sales/revenueschedules"
	"github.com/saichler/l8erp/go/erp/sales/salesforecasts"
	"github.com/saichler/l8erp/go/erp/sales/salesorders"
	"github.com/saichler/l8erp/go/erp/sales/salesquotations"
	"github.com/saichler/l8erp/go/erp/sales/salestargets"
	"github.com/saichler/l8erp/go/erp/sales/salesterritories"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceHandlersSALES(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if h, ok := billingschedules.BillingSchedules(vnic); !ok || h == nil {
		log.Fail(t, "BillingSchedule service handler not found")
	}
	if h, ok := commissionplans.CommissionPlans(vnic); !ok || h == nil {
		log.Fail(t, "CommissionPlan service handler not found")
	}
	if h, ok := customercontracts.CustomerContracts(vnic); !ok || h == nil {
		log.Fail(t, "CustomerContract service handler not found")
	}
	if h, ok := customerhierarchies.CustomerHierarchies(vnic); !ok || h == nil {
		log.Fail(t, "CustomerHierarchy service handler not found")
	}
	if h, ok := customersegments.CustomerSegments(vnic); !ok || h == nil {
		log.Fail(t, "CustomerSegment service handler not found")
	}
	if h, ok := deliveryorders.DeliveryOrders(vnic); !ok || h == nil {
		log.Fail(t, "DeliveryOrder service handler not found")
	}
	if h, ok := discountrules.DiscountRules(vnic); !ok || h == nil {
		log.Fail(t, "DiscountRule service handler not found")
	}
	if h, ok := partnerchannels.PartnerChannels(vnic); !ok || h == nil {
		log.Fail(t, "PartnerChannel service handler not found")
	}
	if h, ok := pricelists.PriceLists(vnic); !ok || h == nil {
		log.Fail(t, "PriceList service handler not found")
	}
	if h, ok := promotionalprices.PromotionalPrices(vnic); !ok || h == nil {
		log.Fail(t, "PromotionalPrice service handler not found")
	}
	if h, ok := returnorders.ReturnOrders(vnic); !ok || h == nil {
		log.Fail(t, "ReturnOrder service handler not found")
	}
	if h, ok := revenueschedules.RevenueSchedules(vnic); !ok || h == nil {
		log.Fail(t, "RevenueSchedule service handler not found")
	}
	if h, ok := salesforecasts.SalesForecasts(vnic); !ok || h == nil {
		log.Fail(t, "SalesForecast service handler not found")
	}
	if h, ok := salesorders.SalesOrders(vnic); !ok || h == nil {
		log.Fail(t, "SalesOrder service handler not found")
	}
	if h, ok := salesquotations.SalesQuotations(vnic); !ok || h == nil {
		log.Fail(t, "SalesQuotation service handler not found")
	}
	if h, ok := salestargets.SalesTargets(vnic); !ok || h == nil {
		log.Fail(t, "SalesTarget service handler not found")
	}
	if h, ok := salesterritories.SalesTerritories(vnic); !ok || h == nil {
		log.Fail(t, "SalesTerritory service handler not found")
	}
}
