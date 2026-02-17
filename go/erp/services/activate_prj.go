/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */

package services

import (
	"github.com/saichler/l8types/go/ifs"
	// Planning
	"github.com/saichler/l8erp/go/erp/prj/projects"
	"github.com/saichler/l8erp/go/erp/prj/projecttemplates"
	// Resources
	"github.com/saichler/l8erp/go/erp/prj/allocations"
	"github.com/saichler/l8erp/go/erp/prj/bookings"
	"github.com/saichler/l8erp/go/erp/prj/capacityplans"
	"github.com/saichler/l8erp/go/erp/prj/resourcepools"
	"github.com/saichler/l8erp/go/erp/prj/resources"
	"github.com/saichler/l8erp/go/erp/prj/utilizations"
	// Time & Expense
	"github.com/saichler/l8erp/go/erp/prj/approvalrules"
	"github.com/saichler/l8erp/go/erp/prj/expensecategories"
	"github.com/saichler/l8erp/go/erp/prj/expensepolicies"
	"github.com/saichler/l8erp/go/erp/prj/expensereports"
	"github.com/saichler/l8erp/go/erp/prj/timesheets"
	// Billing
	"github.com/saichler/l8erp/go/erp/prj/billingrates"
	"github.com/saichler/l8erp/go/erp/prj/billingschedules"
	"github.com/saichler/l8erp/go/erp/prj/projectbudgets"
	"github.com/saichler/l8erp/go/erp/prj/projectinvoices"
	"github.com/saichler/l8erp/go/erp/prj/revenuerecognitions"
	// Analytics
	"github.com/saichler/l8erp/go/erp/prj/portfolioviews"
	"github.com/saichler/l8erp/go/erp/prj/projectkpis"
	"github.com/saichler/l8erp/go/erp/prj/projectstatuses"
)

func ActivatePrjServices(creds, dbname string, nic ifs.IVNic) {
	// Planning
	projects.Activate(creds, dbname, nic)
	projecttemplates.Activate(creds, dbname, nic)
	// Resources
	resourcepools.Activate(creds, dbname, nic)
	resources.Activate(creds, dbname, nic)
	allocations.Activate(creds, dbname, nic)
	bookings.Activate(creds, dbname, nic)
	capacityplans.Activate(creds, dbname, nic)
	utilizations.Activate(creds, dbname, nic)
	// Time & Expense
	timesheets.Activate(creds, dbname, nic)
	expensereports.Activate(creds, dbname, nic)
	approvalrules.Activate(creds, dbname, nic)
	expensecategories.Activate(creds, dbname, nic)
	expensepolicies.Activate(creds, dbname, nic)
	// Billing
	billingrates.Activate(creds, dbname, nic)
	billingschedules.Activate(creds, dbname, nic)
	projectinvoices.Activate(creds, dbname, nic)
	revenuerecognitions.Activate(creds, dbname, nic)
	projectbudgets.Activate(creds, dbname, nic)
	// Analytics
	projectstatuses.Activate(creds, dbname, nic)
	portfolioviews.Activate(creds, dbname, nic)
	projectkpis.Activate(creds, dbname, nic)
}
