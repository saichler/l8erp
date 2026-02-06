/*
 * PRJ (Projects) service activations
 */

package main

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"

	// Planning
	"github.com/saichler/l8erp/go/erp/prj/deliverables"
	"github.com/saichler/l8erp/go/erp/prj/dependencies"
	"github.com/saichler/l8erp/go/erp/prj/milestones"
	"github.com/saichler/l8erp/go/erp/prj/phases"
	"github.com/saichler/l8erp/go/erp/prj/projects"
	"github.com/saichler/l8erp/go/erp/prj/projecttemplates"
	"github.com/saichler/l8erp/go/erp/prj/risks"
	"github.com/saichler/l8erp/go/erp/prj/tasks"

	// Resources
	"github.com/saichler/l8erp/go/erp/prj/allocations"
	"github.com/saichler/l8erp/go/erp/prj/bookings"
	"github.com/saichler/l8erp/go/erp/prj/capacityplans"
	"github.com/saichler/l8erp/go/erp/prj/resourcepools"
	"github.com/saichler/l8erp/go/erp/prj/resources"
	"github.com/saichler/l8erp/go/erp/prj/resourceskills"
	"github.com/saichler/l8erp/go/erp/prj/utilizations"

	// Time & Expense
	"github.com/saichler/l8erp/go/erp/prj/approvalrules"
	"github.com/saichler/l8erp/go/erp/prj/expensecategories"
	"github.com/saichler/l8erp/go/erp/prj/expenseentries"
	"github.com/saichler/l8erp/go/erp/prj/expensepolicies"
	"github.com/saichler/l8erp/go/erp/prj/expensereports"
	"github.com/saichler/l8erp/go/erp/prj/timesheetentries"
	"github.com/saichler/l8erp/go/erp/prj/timesheets"

	// Billing
	"github.com/saichler/l8erp/go/erp/prj/billingmilestones"
	"github.com/saichler/l8erp/go/erp/prj/billingrates"
	"github.com/saichler/l8erp/go/erp/prj/billingschedules"
	"github.com/saichler/l8erp/go/erp/prj/invoicelines"
	"github.com/saichler/l8erp/go/erp/prj/projectbudgets"
	"github.com/saichler/l8erp/go/erp/prj/projectinvoices"
	"github.com/saichler/l8erp/go/erp/prj/revenuerecognitions"

	// Analytics
	"github.com/saichler/l8erp/go/erp/prj/budgetvariances"
	"github.com/saichler/l8erp/go/erp/prj/earnedvalues"
	"github.com/saichler/l8erp/go/erp/prj/portfolioviews"
	"github.com/saichler/l8erp/go/erp/prj/projectissues"
	"github.com/saichler/l8erp/go/erp/prj/projectkpis"
	"github.com/saichler/l8erp/go/erp/prj/projectstatuses"
	"github.com/saichler/l8erp/go/erp/prj/resourceforecasts"
)

func activatePrjServices(nic ifs.IVNic) {
	// Planning
	projects.Activate(common.DB_CREDS, common.DB_NAME, nic)
	projecttemplates.Activate(common.DB_CREDS, common.DB_NAME, nic)
	phases.Activate(common.DB_CREDS, common.DB_NAME, nic)
	tasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
	milestones.Activate(common.DB_CREDS, common.DB_NAME, nic)
	deliverables.Activate(common.DB_CREDS, common.DB_NAME, nic)
	dependencies.Activate(common.DB_CREDS, common.DB_NAME, nic)
	risks.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Resources
	resourcepools.Activate(common.DB_CREDS, common.DB_NAME, nic)
	resources.Activate(common.DB_CREDS, common.DB_NAME, nic)
	resourceskills.Activate(common.DB_CREDS, common.DB_NAME, nic)
	allocations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	bookings.Activate(common.DB_CREDS, common.DB_NAME, nic)
	capacityplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	utilizations.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Time & Expense
	timesheets.Activate(common.DB_CREDS, common.DB_NAME, nic)
	timesheetentries.Activate(common.DB_CREDS, common.DB_NAME, nic)
	expensereports.Activate(common.DB_CREDS, common.DB_NAME, nic)
	expenseentries.Activate(common.DB_CREDS, common.DB_NAME, nic)
	approvalrules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	expensecategories.Activate(common.DB_CREDS, common.DB_NAME, nic)
	expensepolicies.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Billing
	billingrates.Activate(common.DB_CREDS, common.DB_NAME, nic)
	billingschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	billingmilestones.Activate(common.DB_CREDS, common.DB_NAME, nic)
	projectinvoices.Activate(common.DB_CREDS, common.DB_NAME, nic)
	invoicelines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	revenuerecognitions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	projectbudgets.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Analytics
	projectstatuses.Activate(common.DB_CREDS, common.DB_NAME, nic)
	earnedvalues.Activate(common.DB_CREDS, common.DB_NAME, nic)
	budgetvariances.Activate(common.DB_CREDS, common.DB_NAME, nic)
	resourceforecasts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	portfolioviews.Activate(common.DB_CREDS, common.DB_NAME, nic)
	projectkpis.Activate(common.DB_CREDS, common.DB_NAME, nic)
	projectissues.Activate(common.DB_CREDS, common.DB_NAME, nic)
}
