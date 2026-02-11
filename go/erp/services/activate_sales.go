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

func ActivateSalesServices(creds, dbname string, nic ifs.IVNic) {
	// Customer Management
	customerhierarchies.Activate(creds, dbname, nic)
	customersegments.Activate(creds, dbname, nic)
	customercontracts.Activate(creds, dbname, nic)
	partnerchannels.Activate(creds, dbname, nic)
	// Sales Orders
	salesquotations.Activate(creds, dbname, nic)
	salesorders.Activate(creds, dbname, nic)
	returnorders.Activate(creds, dbname, nic)
	// Pricing
	pricelists.Activate(creds, dbname, nic)
	discountrules.Activate(creds, dbname, nic)
	promotionalprices.Activate(creds, dbname, nic)
	// Shipping and Delivery
	deliveryorders.Activate(creds, dbname, nic)
	// Billing
	billingschedules.Activate(creds, dbname, nic)
	revenueschedules.Activate(creds, dbname, nic)
	// Sales Analytics
	salestargets.Activate(creds, dbname, nic)
	salesterritories.Activate(creds, dbname, nic)
	commissionplans.Activate(creds, dbname, nic)
	salesforecasts.Activate(creds, dbname, nic)
}
