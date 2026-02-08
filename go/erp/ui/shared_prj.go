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
	common.RegisterType[prj.PrjPhase, prj.PrjPhaseList](resources, "PhaseId")
	common.RegisterType[prj.PrjTask, prj.PrjTaskList](resources, "TaskId")
	common.RegisterType[prj.PrjMilestone, prj.PrjMilestoneList](resources, "MilestoneId")
	common.RegisterType[prj.PrjDeliverable, prj.PrjDeliverableList](resources, "DeliverableId")
	common.RegisterType[prj.PrjDependency, prj.PrjDependencyList](resources, "DependencyId")
	common.RegisterType[prj.PrjRisk, prj.PrjRiskList](resources, "RiskId")

	// Resources
	common.RegisterType[prj.PrjResourcePool, prj.PrjResourcePoolList](resources, "PoolId")
	common.RegisterType[prj.PrjResource, prj.PrjResourceList](resources, "ResourceId")
	common.RegisterType[prj.PrjResourceSkill, prj.PrjResourceSkillList](resources, "SkillId")
	common.RegisterType[prj.PrjAllocation, prj.PrjAllocationList](resources, "AllocationId")
	common.RegisterType[prj.PrjBooking, prj.PrjBookingList](resources, "BookingId")
	common.RegisterType[prj.PrjCapacityPlan, prj.PrjCapacityPlanList](resources, "PlanId")
	common.RegisterType[prj.PrjUtilization, prj.PrjUtilizationList](resources, "UtilizationId")

	// Time & Expense
	common.RegisterType[prj.PrjTimesheet, prj.PrjTimesheetList](resources, "TimesheetId")
	common.RegisterType[prj.PrjTimesheetEntry, prj.PrjTimesheetEntryList](resources, "EntryId")
	common.RegisterType[prj.PrjExpenseReport, prj.PrjExpenseReportList](resources, "ReportId")
	common.RegisterType[prj.PrjExpenseEntry, prj.PrjExpenseEntryList](resources, "EntryId")
	common.RegisterType[prj.PrjApprovalRule, prj.PrjApprovalRuleList](resources, "RuleId")
	common.RegisterType[prj.PrjExpenseCategory, prj.PrjExpenseCategoryList](resources, "CategoryId")
	common.RegisterType[prj.PrjExpensePolicy, prj.PrjExpensePolicyList](resources, "PolicyId")

	// Billing
	common.RegisterType[prj.PrjBillingRate, prj.PrjBillingRateList](resources, "RateId")
	common.RegisterType[prj.PrjBillingSchedule, prj.PrjBillingScheduleList](resources, "ScheduleId")
	common.RegisterType[prj.PrjBillingMilestone, prj.PrjBillingMilestoneList](resources, "MilestoneId")
	common.RegisterType[prj.PrjProjectInvoice, prj.PrjProjectInvoiceList](resources, "InvoiceId")
	common.RegisterType[prj.PrjInvoiceLine, prj.PrjInvoiceLineList](resources, "LineId")
	common.RegisterType[prj.PrjRevenueRecognition, prj.PrjRevenueRecognitionList](resources, "RecognitionId")
	common.RegisterType[prj.PrjProjectBudget, prj.PrjProjectBudgetList](resources, "BudgetId")

	// Analytics
	common.RegisterType[prj.PrjStatusReport, prj.PrjStatusReportList](resources, "StatusId")
	common.RegisterType[prj.PrjEarnedValue, prj.PrjEarnedValueList](resources, "EarnedValueId")
	common.RegisterType[prj.PrjBudgetVariance, prj.PrjBudgetVarianceList](resources, "VarianceId")
	common.RegisterType[prj.PrjResourceForecast, prj.PrjResourceForecastList](resources, "ForecastId")
	common.RegisterType[prj.PrjPortfolioView, prj.PrjPortfolioViewList](resources, "ViewId")
	common.RegisterType[prj.PrjProjectKPI, prj.PrjProjectKPIList](resources, "KpiId")
	common.RegisterType[prj.PrjProjectIssue, prj.PrjProjectIssueList](resources, "IssueId")
}
