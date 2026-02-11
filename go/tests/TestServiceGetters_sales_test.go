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

func testServiceGettersSALES(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if _, err := billingschedules.BillingSchedule("test-id", vnic); err != nil {
		log.Fail(t, "BillingSchedule getter failed: ", err.Error())
	}
	if _, err := commissionplans.CommissionPlan("test-id", vnic); err != nil {
		log.Fail(t, "CommissionPlan getter failed: ", err.Error())
	}
	if _, err := customercontracts.CustomerContract("test-id", vnic); err != nil {
		log.Fail(t, "CustomerContract getter failed: ", err.Error())
	}
	if _, err := customerhierarchies.CustomerHierarchy("test-id", vnic); err != nil {
		log.Fail(t, "CustomerHierarchy getter failed: ", err.Error())
	}
	if _, err := customersegments.CustomerSegment("test-id", vnic); err != nil {
		log.Fail(t, "CustomerSegment getter failed: ", err.Error())
	}
	if _, err := deliveryorders.DeliveryOrder("test-id", vnic); err != nil {
		log.Fail(t, "DeliveryOrder getter failed: ", err.Error())
	}
	if _, err := discountrules.DiscountRule("test-id", vnic); err != nil {
		log.Fail(t, "DiscountRule getter failed: ", err.Error())
	}
	if _, err := partnerchannels.PartnerChannel("test-id", vnic); err != nil {
		log.Fail(t, "PartnerChannel getter failed: ", err.Error())
	}
	if _, err := pricelists.PriceList("test-id", vnic); err != nil {
		log.Fail(t, "PriceList getter failed: ", err.Error())
	}
	if _, err := promotionalprices.PromotionalPrice("test-id", vnic); err != nil {
		log.Fail(t, "PromotionalPrice getter failed: ", err.Error())
	}
	if _, err := returnorders.ReturnOrder("test-id", vnic); err != nil {
		log.Fail(t, "ReturnOrder getter failed: ", err.Error())
	}
	if _, err := revenueschedules.RevenueSchedule("test-id", vnic); err != nil {
		log.Fail(t, "RevenueSchedule getter failed: ", err.Error())
	}
	if _, err := salesforecasts.SalesForecast("test-id", vnic); err != nil {
		log.Fail(t, "SalesForecast getter failed: ", err.Error())
	}
	if _, err := salesorders.SalesOrder("test-id", vnic); err != nil {
		log.Fail(t, "SalesOrder getter failed: ", err.Error())
	}
	if _, err := salesquotations.SalesQuotation("test-id", vnic); err != nil {
		log.Fail(t, "SalesQuotation getter failed: ", err.Error())
	}
	if _, err := salestargets.SalesTarget("test-id", vnic); err != nil {
		log.Fail(t, "SalesTarget getter failed: ", err.Error())
	}
	if _, err := salesterritories.SalesTerritory("test-id", vnic); err != nil {
		log.Fail(t, "SalesTerritory getter failed: ", err.Error())
	}
}
