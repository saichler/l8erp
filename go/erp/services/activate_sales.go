/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */

package services

import (
	"github.com/saichler/l8types/go/ifs"
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
)

func collectSalesActivations(creds, dbname string, nic ifs.IVNic) []func() {
	return []func(){
		// Customer Management
		func() { customerhierarchies.Activate(creds, dbname, nic) },
		func() { customersegments.Activate(creds, dbname, nic) },
		func() { customercontracts.Activate(creds, dbname, nic) },
		func() { partnerchannels.Activate(creds, dbname, nic) },
		// Sales Orders
		func() { salesquotations.Activate(creds, dbname, nic) },
		func() { salesorders.Activate(creds, dbname, nic) },
		func() { returnorders.Activate(creds, dbname, nic) },
		// Pricing
		func() { pricelists.Activate(creds, dbname, nic) },
		func() { discountrules.Activate(creds, dbname, nic) },
		func() { promotionalprices.Activate(creds, dbname, nic) },
		// Shipping and Delivery
		func() { deliveryorders.Activate(creds, dbname, nic) },
		// Billing
		func() { billingschedules.Activate(creds, dbname, nic) },
		func() { revenueschedules.Activate(creds, dbname, nic) },
		// Sales Analytics
		func() { salestargets.Activate(creds, dbname, nic) },
		func() { salesterritories.Activate(creds, dbname, nic) },
		func() { commissionplans.Activate(creds, dbname, nic) },
		func() { salesforecasts.Activate(creds, dbname, nic) },
	}
}
