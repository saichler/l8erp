/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */

package services

import (
	"github.com/saichler/l8types/go/ifs"
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
)

func collectSCMActivations(creds, dbname string, nic ifs.IVNic) []func() {
	return []func(){
		// Procurement
		func() { purchasereqs.Activate(creds, dbname, nic) },
		func() { rfqs.Activate(creds, dbname, nic) },
		func() { purchaseorders.Activate(creds, dbname, nic) },
		func() { blanketorders.Activate(creds, dbname, nic) },
		func() { supplierscorecards.Activate(creds, dbname, nic) },
		// Inventory Management
		func() { items.Activate(creds, dbname, nic) },
		func() { itemcategories.Activate(creds, dbname, nic) },
		func() { cyclecounts.Activate(creds, dbname, nic) },
		// Warehouse Management
		func() { warehouses.Activate(creds, dbname, nic) },
		func() { receivingorders.Activate(creds, dbname, nic) },
		func() { waveplans.Activate(creds, dbname, nic) },
		func() { dockschedules.Activate(creds, dbname, nic) },
		// Logistics and Transportation
		func() { carriers.Activate(creds, dbname, nic) },
		func() { freightrates.Activate(creds, dbname, nic) },
		func() { shipments.Activate(creds, dbname, nic) },
		func() { routes.Activate(creds, dbname, nic) },
		func() { loadplans.Activate(creds, dbname, nic) },
		func() { returnauths.Activate(creds, dbname, nic) },
		// Demand Planning
		func() { demandforecasts.Activate(creds, dbname, nic) },
		func() { forecastmodels.Activate(creds, dbname, nic) },
		func() { demandplans.Activate(creds, dbname, nic) },
		func() { promoplans.Activate(creds, dbname, nic) },
		func() { newproductplans.Activate(creds, dbname, nic) },
		// Supply Planning
		func() { materialreqs.Activate(creds, dbname, nic) },
		func() { distributionreqs.Activate(creds, dbname, nic) },
		func() { supplyplans.Activate(creds, dbname, nic) },
		func() { suppliercollabs.Activate(creds, dbname, nic) },
		func() { safetystocks.Activate(creds, dbname, nic) },
		func() { leadtimes.Activate(creds, dbname, nic) },
	}
}
