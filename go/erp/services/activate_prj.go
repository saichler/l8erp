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

func collectPrjActivations(creds, dbname string, nic ifs.IVNic) []func() {
	return []func(){
		// Planning
		func() { projects.Activate(creds, dbname, nic) },
		func() { projecttemplates.Activate(creds, dbname, nic) },
		// Resources
		func() { resourcepools.Activate(creds, dbname, nic) },
		func() { resources.Activate(creds, dbname, nic) },
		func() { allocations.Activate(creds, dbname, nic) },
		func() { bookings.Activate(creds, dbname, nic) },
		func() { capacityplans.Activate(creds, dbname, nic) },
		func() { utilizations.Activate(creds, dbname, nic) },
		// Time & Expense
		func() { timesheets.Activate(creds, dbname, nic) },
		func() { expensereports.Activate(creds, dbname, nic) },
		func() { approvalrules.Activate(creds, dbname, nic) },
		func() { expensecategories.Activate(creds, dbname, nic) },
		func() { expensepolicies.Activate(creds, dbname, nic) },
		// Billing
		func() { billingrates.Activate(creds, dbname, nic) },
		func() { billingschedules.Activate(creds, dbname, nic) },
		func() { projectinvoices.Activate(creds, dbname, nic) },
		func() { revenuerecognitions.Activate(creds, dbname, nic) },
		func() { projectbudgets.Activate(creds, dbname, nic) },
		// Analytics
		func() { projectstatuses.Activate(creds, dbname, nic) },
		func() { portfolioviews.Activate(creds, dbname, nic) },
		func() { projectkpis.Activate(creds, dbname, nic) },
	}
}
