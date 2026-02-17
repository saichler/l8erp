package tests

import (
	"github.com/saichler/l8erp/go/erp/prj/allocations"
	"github.com/saichler/l8erp/go/erp/prj/approvalrules"
	"github.com/saichler/l8erp/go/erp/prj/billingrates"
	"github.com/saichler/l8erp/go/erp/prj/billingschedules"
	"github.com/saichler/l8erp/go/erp/prj/bookings"
	"github.com/saichler/l8erp/go/erp/prj/capacityplans"
	"github.com/saichler/l8erp/go/erp/prj/expensecategories"
	"github.com/saichler/l8erp/go/erp/prj/expensepolicies"
	"github.com/saichler/l8erp/go/erp/prj/expensereports"
	"github.com/saichler/l8erp/go/erp/prj/portfolioviews"
	"github.com/saichler/l8erp/go/erp/prj/projectbudgets"
	"github.com/saichler/l8erp/go/erp/prj/projectinvoices"
	"github.com/saichler/l8erp/go/erp/prj/projectkpis"
	"github.com/saichler/l8erp/go/erp/prj/projects"
	"github.com/saichler/l8erp/go/erp/prj/projectstatuses"
	"github.com/saichler/l8erp/go/erp/prj/projecttemplates"
	"github.com/saichler/l8erp/go/erp/prj/resourcepools"
	"github.com/saichler/l8erp/go/erp/prj/resources"
	"github.com/saichler/l8erp/go/erp/prj/revenuerecognitions"
	"github.com/saichler/l8erp/go/erp/prj/timesheets"
	"github.com/saichler/l8erp/go/erp/prj/utilizations"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceGettersPRJ(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if _, err := allocations.PrjAllocation("test-id", vnic); err != nil {
		log.Fail(t, "PrjAllocation getter failed: ", err.Error())
	}
	if _, err := approvalrules.PrjApprovalRule("test-id", vnic); err != nil {
		log.Fail(t, "PrjApprovalRule getter failed: ", err.Error())
	}
	if _, err := billingrates.PrjBillingRate("test-id", vnic); err != nil {
		log.Fail(t, "PrjBillingRate getter failed: ", err.Error())
	}
	if _, err := billingschedules.PrjBillingSchedule("test-id", vnic); err != nil {
		log.Fail(t, "PrjBillingSchedule getter failed: ", err.Error())
	}
	if _, err := bookings.PrjBooking("test-id", vnic); err != nil {
		log.Fail(t, "PrjBooking getter failed: ", err.Error())
	}
	if _, err := capacityplans.PrjCapacityPlan("test-id", vnic); err != nil {
		log.Fail(t, "PrjCapacityPlan getter failed: ", err.Error())
	}
	if _, err := expensecategories.PrjExpenseCategory("test-id", vnic); err != nil {
		log.Fail(t, "PrjExpenseCategory getter failed: ", err.Error())
	}
	if _, err := expensepolicies.PrjExpensePolicy("test-id", vnic); err != nil {
		log.Fail(t, "PrjExpensePolicy getter failed: ", err.Error())
	}
	if _, err := expensereports.PrjExpenseReport("test-id", vnic); err != nil {
		log.Fail(t, "PrjExpenseReport getter failed: ", err.Error())
	}
	if _, err := portfolioviews.PrjPortfolioView("test-id", vnic); err != nil {
		log.Fail(t, "PrjPortfolioView getter failed: ", err.Error())
	}
	if _, err := projectbudgets.PrjProjectBudget("test-id", vnic); err != nil {
		log.Fail(t, "PrjProjectBudget getter failed: ", err.Error())
	}
	if _, err := projectinvoices.PrjProjectInvoice("test-id", vnic); err != nil {
		log.Fail(t, "PrjProjectInvoice getter failed: ", err.Error())
	}
	if _, err := projectkpis.PrjProjectKPI("test-id", vnic); err != nil {
		log.Fail(t, "PrjProjectKPI getter failed: ", err.Error())
	}
	if _, err := projects.PrjProject("test-id", vnic); err != nil {
		log.Fail(t, "PrjProject getter failed: ", err.Error())
	}
	if _, err := projectstatuses.PrjStatusReport("test-id", vnic); err != nil {
		log.Fail(t, "PrjStatusReport getter failed: ", err.Error())
	}
	if _, err := projecttemplates.PrjProjectTemplate("test-id", vnic); err != nil {
		log.Fail(t, "PrjProjectTemplate getter failed: ", err.Error())
	}
	if _, err := resourcepools.PrjResourcePool("test-id", vnic); err != nil {
		log.Fail(t, "PrjResourcePool getter failed: ", err.Error())
	}
	if _, err := resources.PrjResource("test-id", vnic); err != nil {
		log.Fail(t, "PrjResource getter failed: ", err.Error())
	}
	if _, err := revenuerecognitions.PrjRevenueRecognition("test-id", vnic); err != nil {
		log.Fail(t, "PrjRevenueRecognition getter failed: ", err.Error())
	}
	if _, err := timesheets.PrjTimesheet("test-id", vnic); err != nil {
		log.Fail(t, "PrjTimesheet getter failed: ", err.Error())
	}
	if _, err := utilizations.PrjUtilization("test-id", vnic); err != nil {
		log.Fail(t, "PrjUtilization getter failed: ", err.Error())
	}
}
