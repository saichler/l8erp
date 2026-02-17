package ui

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8types/go/ifs"
)

func registerPrjTypes(resources ifs.IResources) {
	// Planning
	common.RegisterType[prj.PrjProject, prj.PrjProjectList](resources, "ProjectId")
	common.RegisterType[prj.PrjProjectTemplate, prj.PrjProjectTemplateList](resources, "TemplateId")

	// Resources
	common.RegisterType[prj.PrjResourcePool, prj.PrjResourcePoolList](resources, "PoolId")
	common.RegisterType[prj.PrjResource, prj.PrjResourceList](resources, "ResourceId")
	common.RegisterType[prj.PrjAllocation, prj.PrjAllocationList](resources, "AllocationId")
	common.RegisterType[prj.PrjBooking, prj.PrjBookingList](resources, "BookingId")
	common.RegisterType[prj.PrjCapacityPlan, prj.PrjCapacityPlanList](resources, "PlanId")
	common.RegisterType[prj.PrjUtilization, prj.PrjUtilizationList](resources, "UtilizationId")

	// Time & Expense
	common.RegisterType[prj.PrjTimesheet, prj.PrjTimesheetList](resources, "TimesheetId")
	common.RegisterType[prj.PrjExpenseReport, prj.PrjExpenseReportList](resources, "ReportId")
	common.RegisterType[prj.PrjApprovalRule, prj.PrjApprovalRuleList](resources, "RuleId")
	common.RegisterType[prj.PrjExpenseCategory, prj.PrjExpenseCategoryList](resources, "CategoryId")
	common.RegisterType[prj.PrjExpensePolicy, prj.PrjExpensePolicyList](resources, "PolicyId")

	// Billing
	common.RegisterType[prj.PrjBillingRate, prj.PrjBillingRateList](resources, "RateId")
	common.RegisterType[prj.PrjBillingSchedule, prj.PrjBillingScheduleList](resources, "ScheduleId")
	common.RegisterType[prj.PrjProjectInvoice, prj.PrjProjectInvoiceList](resources, "InvoiceId")
	common.RegisterType[prj.PrjRevenueRecognition, prj.PrjRevenueRecognitionList](resources, "RecognitionId")
	common.RegisterType[prj.PrjProjectBudget, prj.PrjProjectBudgetList](resources, "BudgetId")

	// Analytics
	common.RegisterType[prj.PrjStatusReport, prj.PrjStatusReportList](resources, "StatusId")
	common.RegisterType[prj.PrjPortfolioView, prj.PrjPortfolioViewList](resources, "ViewId")
	common.RegisterType[prj.PrjProjectKPI, prj.PrjProjectKPIList](resources, "KpiId")
}
