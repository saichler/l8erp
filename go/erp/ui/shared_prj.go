package ui

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8types/go/ifs"
)

func registerPrjTypes(resources ifs.IResources) {
	// Planning
	common.RegisterType(resources, &prj.PrjProject{}, &prj.PrjProjectList{}, "ProjectId")
	common.RegisterType(resources, &prj.PrjProjectTemplate{}, &prj.PrjProjectTemplateList{}, "TemplateId")

	// Resources
	common.RegisterType(resources, &prj.PrjResourcePool{}, &prj.PrjResourcePoolList{}, "PoolId")
	common.RegisterType(resources, &prj.PrjResource{}, &prj.PrjResourceList{}, "ResourceId")
	common.RegisterType(resources, &prj.PrjAllocation{}, &prj.PrjAllocationList{}, "AllocationId")
	common.RegisterType(resources, &prj.PrjBooking{}, &prj.PrjBookingList{}, "BookingId")
	common.RegisterType(resources, &prj.PrjCapacityPlan{}, &prj.PrjCapacityPlanList{}, "PlanId")
	common.RegisterType(resources, &prj.PrjUtilization{}, &prj.PrjUtilizationList{}, "UtilizationId")

	// Time & Expense
	common.RegisterType(resources, &prj.PrjTimesheet{}, &prj.PrjTimesheetList{}, "TimesheetId")
	common.RegisterType(resources, &prj.PrjExpenseReport{}, &prj.PrjExpenseReportList{}, "ReportId")
	common.RegisterType(resources, &prj.PrjApprovalRule{}, &prj.PrjApprovalRuleList{}, "RuleId")
	common.RegisterType(resources, &prj.PrjExpenseCategory{}, &prj.PrjExpenseCategoryList{}, "CategoryId")
	common.RegisterType(resources, &prj.PrjExpensePolicy{}, &prj.PrjExpensePolicyList{}, "PolicyId")

	// Billing
	common.RegisterType(resources, &prj.PrjBillingRate{}, &prj.PrjBillingRateList{}, "RateId")
	common.RegisterType(resources, &prj.PrjBillingSchedule{}, &prj.PrjBillingScheduleList{}, "ScheduleId")
	common.RegisterType(resources, &prj.PrjProjectInvoice{}, &prj.PrjProjectInvoiceList{}, "InvoiceId")
	common.RegisterType(resources, &prj.PrjRevenueRecognition{}, &prj.PrjRevenueRecognitionList{}, "RecognitionId")
	common.RegisterType(resources, &prj.PrjProjectBudget{}, &prj.PrjProjectBudgetList{}, "BudgetId")

	// Analytics
	common.RegisterType(resources, &prj.PrjStatusReport{}, &prj.PrjStatusReportList{}, "StatusId")
	common.RegisterType(resources, &prj.PrjPortfolioView{}, &prj.PrjPortfolioViewList{}, "ViewId")
	common.RegisterType(resources, &prj.PrjProjectKPI{}, &prj.PrjProjectKPIList{}, "KpiId")
}
