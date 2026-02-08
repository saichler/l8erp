package tests

import (
	"github.com/saichler/l8erp/go/erp/prj/allocations"
	"github.com/saichler/l8erp/go/erp/prj/approvalrules"
	"github.com/saichler/l8erp/go/erp/prj/billingmilestones"
	"github.com/saichler/l8erp/go/erp/prj/billingrates"
	"github.com/saichler/l8erp/go/erp/prj/billingschedules"
	"github.com/saichler/l8erp/go/erp/prj/bookings"
	"github.com/saichler/l8erp/go/erp/prj/budgetvariances"
	"github.com/saichler/l8erp/go/erp/prj/capacityplans"
	"github.com/saichler/l8erp/go/erp/prj/deliverables"
	"github.com/saichler/l8erp/go/erp/prj/dependencies"
	"github.com/saichler/l8erp/go/erp/prj/earnedvalues"
	"github.com/saichler/l8erp/go/erp/prj/expensecategories"
	"github.com/saichler/l8erp/go/erp/prj/expenseentries"
	"github.com/saichler/l8erp/go/erp/prj/expensepolicies"
	"github.com/saichler/l8erp/go/erp/prj/expensereports"
	"github.com/saichler/l8erp/go/erp/prj/invoicelines"
	"github.com/saichler/l8erp/go/erp/prj/milestones"
	"github.com/saichler/l8erp/go/erp/prj/phases"
	"github.com/saichler/l8erp/go/erp/prj/portfolioviews"
	"github.com/saichler/l8erp/go/erp/prj/projectbudgets"
	"github.com/saichler/l8erp/go/erp/prj/projectinvoices"
	"github.com/saichler/l8erp/go/erp/prj/projectissues"
	"github.com/saichler/l8erp/go/erp/prj/projectkpis"
	"github.com/saichler/l8erp/go/erp/prj/projects"
	"github.com/saichler/l8erp/go/erp/prj/projectstatuses"
	"github.com/saichler/l8erp/go/erp/prj/projecttemplates"
	"github.com/saichler/l8erp/go/erp/prj/resourceforecasts"
	"github.com/saichler/l8erp/go/erp/prj/resourcepools"
	"github.com/saichler/l8erp/go/erp/prj/resourceskills"
	"github.com/saichler/l8erp/go/erp/prj/resources"
	"github.com/saichler/l8erp/go/erp/prj/revenuerecognitions"
	"github.com/saichler/l8erp/go/erp/prj/risks"
	"github.com/saichler/l8erp/go/erp/prj/tasks"
	"github.com/saichler/l8erp/go/erp/prj/timesheetentries"
	"github.com/saichler/l8erp/go/erp/prj/timesheets"
	"github.com/saichler/l8erp/go/erp/prj/utilizations"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceHandlersPRJ(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if h, ok := allocations.PrjAllocations(vnic); !ok || h == nil {
		log.Fail(t, "PrjAllocation service handler not found")
	}
	if h, ok := approvalrules.PrjApprovalRules(vnic); !ok || h == nil {
		log.Fail(t, "PrjApprovalRule service handler not found")
	}
	if h, ok := billingmilestones.PrjBillingMilestones(vnic); !ok || h == nil {
		log.Fail(t, "PrjBillingMilestone service handler not found")
	}
	if h, ok := billingrates.PrjBillingRates(vnic); !ok || h == nil {
		log.Fail(t, "PrjBillingRate service handler not found")
	}
	if h, ok := billingschedules.PrjBillingSchedules(vnic); !ok || h == nil {
		log.Fail(t, "PrjBillingSchedule service handler not found")
	}
	if h, ok := bookings.PrjBookings(vnic); !ok || h == nil {
		log.Fail(t, "PrjBooking service handler not found")
	}
	if h, ok := budgetvariances.PrjBudgetVariances(vnic); !ok || h == nil {
		log.Fail(t, "PrjBudgetVariance service handler not found")
	}
	if h, ok := capacityplans.PrjCapacityPlans(vnic); !ok || h == nil {
		log.Fail(t, "PrjCapacityPlan service handler not found")
	}
	if h, ok := deliverables.PrjDeliverables(vnic); !ok || h == nil {
		log.Fail(t, "PrjDeliverable service handler not found")
	}
	if h, ok := dependencies.PrjDependencies(vnic); !ok || h == nil {
		log.Fail(t, "PrjDependency service handler not found")
	}
	if h, ok := earnedvalues.PrjEarnedValues(vnic); !ok || h == nil {
		log.Fail(t, "PrjEarnedValue service handler not found")
	}
	if h, ok := expensecategories.PrjExpenseCategories(vnic); !ok || h == nil {
		log.Fail(t, "PrjExpenseCategory service handler not found")
	}
	if h, ok := expenseentries.PrjExpenseEntries(vnic); !ok || h == nil {
		log.Fail(t, "PrjExpenseEntry service handler not found")
	}
	if h, ok := expensepolicies.PrjExpensePolicies(vnic); !ok || h == nil {
		log.Fail(t, "PrjExpensePolicy service handler not found")
	}
	if h, ok := expensereports.PrjExpenseReports(vnic); !ok || h == nil {
		log.Fail(t, "PrjExpenseReport service handler not found")
	}
	if h, ok := invoicelines.PrjInvoiceLines(vnic); !ok || h == nil {
		log.Fail(t, "PrjInvoiceLine service handler not found")
	}
	if h, ok := milestones.PrjMilestones(vnic); !ok || h == nil {
		log.Fail(t, "PrjMilestone service handler not found")
	}
	if h, ok := phases.PrjPhases(vnic); !ok || h == nil {
		log.Fail(t, "PrjPhase service handler not found")
	}
	if h, ok := portfolioviews.PrjPortfolioViews(vnic); !ok || h == nil {
		log.Fail(t, "PrjPortfolioView service handler not found")
	}
	if h, ok := projectbudgets.PrjProjectBudgets(vnic); !ok || h == nil {
		log.Fail(t, "PrjProjectBudget service handler not found")
	}
	if h, ok := projectinvoices.PrjProjectInvoices(vnic); !ok || h == nil {
		log.Fail(t, "PrjProjectInvoice service handler not found")
	}
	if h, ok := projectissues.PrjProjectIssues(vnic); !ok || h == nil {
		log.Fail(t, "PrjProjectIssue service handler not found")
	}
	if h, ok := projectkpis.PrjProjectKPIs(vnic); !ok || h == nil {
		log.Fail(t, "PrjProjectKPI service handler not found")
	}
	if h, ok := projects.PrjProjects(vnic); !ok || h == nil {
		log.Fail(t, "PrjProject service handler not found")
	}
	if h, ok := projectstatuses.PrjStatusReports(vnic); !ok || h == nil {
		log.Fail(t, "PrjStatusReport service handler not found")
	}
	if h, ok := projecttemplates.PrjProjectTemplates(vnic); !ok || h == nil {
		log.Fail(t, "PrjProjectTemplate service handler not found")
	}
	if h, ok := resourceforecasts.PrjResourceForecasts(vnic); !ok || h == nil {
		log.Fail(t, "PrjResourceForecast service handler not found")
	}
	if h, ok := resourcepools.PrjResourcePools(vnic); !ok || h == nil {
		log.Fail(t, "PrjResourcePool service handler not found")
	}
	if h, ok := resourceskills.PrjResourceSkills(vnic); !ok || h == nil {
		log.Fail(t, "PrjResourceSkill service handler not found")
	}
	if h, ok := resources.PrjResources(vnic); !ok || h == nil {
		log.Fail(t, "PrjResource service handler not found")
	}
	if h, ok := revenuerecognitions.PrjRevenueRecognitions(vnic); !ok || h == nil {
		log.Fail(t, "PrjRevenueRecognition service handler not found")
	}
	if h, ok := risks.PrjRisks(vnic); !ok || h == nil {
		log.Fail(t, "PrjRisk service handler not found")
	}
	if h, ok := tasks.PrjTasks(vnic); !ok || h == nil {
		log.Fail(t, "PrjTask service handler not found")
	}
	if h, ok := timesheetentries.PrjTimesheetEntries(vnic); !ok || h == nil {
		log.Fail(t, "PrjTimesheetEntry service handler not found")
	}
	if h, ok := timesheets.PrjTimesheets(vnic); !ok || h == nil {
		log.Fail(t, "PrjTimesheet service handler not found")
	}
	if h, ok := utilizations.PrjUtilizations(vnic); !ok || h == nil {
		log.Fail(t, "PrjUtilization service handler not found")
	}
}
