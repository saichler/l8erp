/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package main

import (

	"github.com/saichler/l8erp/go/types/prj"
)

// generatePrjPhase1 creates foundation data: templates, expense categories, policies, approval rules
func generatePrjPhase1(client *HCMClient, store *MockDataStore) error {
	templates := generateProjectTemplates()
	if err := runOp(client, "Project Templates", "/erp/90/PrjProjTpl", &prj.PrjProjectTemplateList{List: templates}, extractIDs(templates, func(e *prj.PrjProjectTemplate) string { return e.TemplateId }), &store.PrjProjectTemplateIDs); err != nil {
		return err
	}

	categories := generateExpenseCategories()
	if err := runOp(client, "Expense Categories", "/erp/90/PrjExpCat", &prj.PrjExpenseCategoryList{List: categories}, extractIDs(categories, func(e *prj.PrjExpenseCategory) string { return e.CategoryId }), &store.PrjExpenseCategoryIDs); err != nil {
		return err
	}

	policies := generateExpensePolicies()
	if err := runOp(client, "Expense Policies", "/erp/90/PrjExpPol", &prj.PrjExpensePolicyList{List: policies}, extractIDs(policies, func(e *prj.PrjExpensePolicy) string { return e.PolicyId }), &store.PrjExpensePolicyIDs); err != nil {
		return err
	}

	rules := generateApprovalRules(store)
	if err := runOp(client, "Approval Rules", "/erp/90/PrjApprRl", &prj.PrjApprovalRuleList{List: rules}, extractIDs(rules, func(e *prj.PrjApprovalRule) string { return e.RuleId }), &store.PrjApprovalRuleIDs); err != nil {
		return err
	}

	return nil
}

// generatePrjPhase2 creates projects and phases
func generatePrjPhase2(client *HCMClient, store *MockDataStore) error {
	projects := generateProjects(store)
	if err := runOp(client, "Projects", "/erp/90/PrjProj", &prj.PrjProjectList{List: projects}, extractIDs(projects, func(e *prj.PrjProject) string { return e.ProjectId }), &store.PrjProjectIDs); err != nil {
		return err
	}

	phases := generatePhases(store)
	if err := runOp(client, "Phases", "/erp/90/PrjPhase", &prj.PrjPhaseList{List: phases}, extractIDs(phases, func(e *prj.PrjPhase) string { return e.PhaseId }), &store.PrjPhaseIDs); err != nil {
		return err
	}

	return nil
}

// generatePrjPhase3 creates resource management data
func generatePrjPhase3(client *HCMClient, store *MockDataStore) error {
	pools := generateResourcePools(store)
	if err := runOp(client, "Resource Pools", "/erp/90/PrjResPool", &prj.PrjResourcePoolList{List: pools}, extractIDs(pools, func(e *prj.PrjResourcePool) string { return e.PoolId }), &store.PrjResourcePoolIDs); err != nil {
		return err
	}

	resources := generateResources(store)
	if err := runOp(client, "Resources", "/erp/90/PrjRes", &prj.PrjResourceList{List: resources}, extractIDs(resources, func(e *prj.PrjResource) string { return e.ResourceId }), &store.PrjResourceIDs); err != nil {
		return err
	}

	skills := generateResourceSkills(store)
	if err := runOp(client, "Resource Skills", "/erp/90/PrjResSkl", &prj.PrjResourceSkillList{List: skills}, extractIDs(skills, func(e *prj.PrjResourceSkill) string { return e.SkillId }), &store.PrjResourceSkillIDs); err != nil {
		return err
	}

	plans := generatePrjCapacityPlans(store)
	if err := runOp(client, "Capacity Plans", "/erp/90/PrjCapPlan", &prj.PrjCapacityPlanList{List: plans}, extractIDs(plans, func(e *prj.PrjCapacityPlan) string { return e.PlanId }), &store.PrjCapacityPlanIDs); err != nil {
		return err
	}

	return nil
}

// generatePrjPhase4 creates project detail data
func generatePrjPhase4(client *HCMClient, store *MockDataStore) error {
	tasks := generateTasks(store)
	if err := runOp(client, "Tasks", "/erp/90/PrjTask", &prj.PrjTaskList{List: tasks}, extractIDs(tasks, func(e *prj.PrjTask) string { return e.TaskId }), &store.PrjTaskIDs); err != nil {
		return err
	}

	milestones := generateMilestones(store)
	if err := runOp(client, "Milestones", "/erp/90/PrjMilstn", &prj.PrjMilestoneList{List: milestones}, extractIDs(milestones, func(e *prj.PrjMilestone) string { return e.MilestoneId }), &store.PrjMilestoneIDs); err != nil {
		return err
	}

	deliverables := generateDeliverables(store)
	if err := runOp(client, "Deliverables", "/erp/90/PrjDeliv", &prj.PrjDeliverableList{List: deliverables}, extractIDs(deliverables, func(e *prj.PrjDeliverable) string { return e.DeliverableId }), &store.PrjDeliverableIDs); err != nil {
		return err
	}

	dependencies := generateDependencies(store)
	if err := runOp(client, "Dependencies", "/erp/90/PrjDepend", &prj.PrjDependencyList{List: dependencies}, extractIDs(dependencies, func(e *prj.PrjDependency) string { return e.DependencyId }), &store.PrjDependencyIDs); err != nil {
		return err
	}

	risks := generateRisks(store)
	if err := runOp(client, "Risks", "/erp/90/PrjRisk", &prj.PrjRiskList{List: risks}, extractIDs(risks, func(e *prj.PrjRisk) string { return e.RiskId }), &store.PrjRiskIDs); err != nil {
		return err
	}

	return nil
}

// generatePrjPhase5 creates resource allocation data
func generatePrjPhase5(client *HCMClient, store *MockDataStore) error {
	allocations := generateAllocations(store)
	if err := runOp(client, "Allocations", "/erp/90/PrjAlloc", &prj.PrjAllocationList{List: allocations}, extractIDs(allocations, func(e *prj.PrjAllocation) string { return e.AllocationId }), &store.PrjAllocationIDs); err != nil {
		return err
	}

	bookings := generateBookings(store)
	if err := runOp(client, "Bookings", "/erp/90/PrjBooking", &prj.PrjBookingList{List: bookings}, extractIDs(bookings, func(e *prj.PrjBooking) string { return e.BookingId }), &store.PrjBookingIDs); err != nil {
		return err
	}

	utilizations := generateUtilizations(store)
	if err := runOp(client, "Utilizations", "/erp/90/PrjUtil", &prj.PrjUtilizationList{List: utilizations}, extractIDs(utilizations, func(e *prj.PrjUtilization) string { return e.UtilizationId }), &store.PrjUtilizationIDs); err != nil {
		return err
	}

	rates := generateBillingRates(store)
	if err := runOp(client, "Billing Rates", "/erp/90/PrjBillRt", &prj.PrjBillingRateList{List: rates}, extractIDs(rates, func(e *prj.PrjBillingRate) string { return e.RateId }), &store.PrjBillingRateIDs); err != nil {
		return err
	}

	return nil
}

// generatePrjPhase6 creates time and expense data
func generatePrjPhase6(client *HCMClient, store *MockDataStore) error {
	timesheets := generatePrjTimesheets(store)
	if err := runOp(client, "Timesheets", "/erp/90/PrjTmSheet", &prj.PrjTimesheetList{List: timesheets}, extractIDs(timesheets, func(e *prj.PrjTimesheet) string { return e.TimesheetId }), &store.PrjTimesheetIDs); err != nil {
		return err
	}

	entries := generateTimesheetEntries(store)
	if err := runOp(client, "Timesheet Entries", "/erp/90/PrjTmEntry", &prj.PrjTimesheetEntryList{List: entries}, extractIDs(entries, func(e *prj.PrjTimesheetEntry) string { return e.EntryId }), &store.PrjTimesheetEntryIDs); err != nil {
		return err
	}

	reports := generateExpenseReports(store)
	if err := runOp(client, "Expense Reports", "/erp/90/PrjExpRpt", &prj.PrjExpenseReportList{List: reports}, extractIDs(reports, func(e *prj.PrjExpenseReport) string { return e.ReportId }), &store.PrjExpenseReportIDs); err != nil {
		return err
	}

	expEntries := generateExpenseEntries(store)
	if err := runOp(client, "Expense Entries", "/erp/90/PrjExpEnt", &prj.PrjExpenseEntryList{List: expEntries}, extractIDs(expEntries, func(e *prj.PrjExpenseEntry) string { return e.EntryId }), &store.PrjExpenseEntryIDs); err != nil {
		return err
	}

	return nil
}

// generatePrjPhase7 creates billing data
func generatePrjPhase7(client *HCMClient, store *MockDataStore) error {
	schedules := generateBillingSchedules(store)
	if err := runOp(client, "Billing Schedules", "/erp/90/PrjBillSch", &prj.PrjBillingScheduleList{List: schedules}, extractIDs(schedules, func(e *prj.PrjBillingSchedule) string { return e.ScheduleId }), &store.PrjBillingScheduleIDs); err != nil {
		return err
	}

	invoices := generateProjectInvoices(store)
	if err := runOp(client, "Project Invoices", "/erp/90/PrjInvoice", &prj.PrjProjectInvoiceList{List: invoices}, extractIDs(invoices, func(e *prj.PrjProjectInvoice) string { return e.InvoiceId }), &store.PrjProjectInvoiceIDs); err != nil {
		return err
	}

	milestones := generateBillingMilestones(store)
	if err := runOp(client, "Billing Milestones", "/erp/90/PrjBillMls", &prj.PrjBillingMilestoneList{List: milestones}, extractIDs(milestones, func(e *prj.PrjBillingMilestone) string { return e.MilestoneId }), &store.PrjBillingMilestoneIDs); err != nil {
		return err
	}

	lines := generateInvoiceLines(store)
	if err := runOp(client, "Invoice Lines", "/erp/90/PrjInvLine", &prj.PrjInvoiceLineList{List: lines}, extractIDs(lines, func(e *prj.PrjInvoiceLine) string { return e.LineId }), &store.PrjInvoiceLineIDs); err != nil {
		return err
	}

	recognitions := generateRevenueRecognitions(store)
	if err := runOp(client, "Revenue Recognitions", "/erp/90/PrjRevRec", &prj.PrjRevenueRecognitionList{List: recognitions}, extractIDs(recognitions, func(e *prj.PrjRevenueRecognition) string { return e.RecognitionId }), &store.PrjRevenueRecognitionIDs); err != nil {
		return err
	}

	budgets := generateProjectBudgets(store)
	if err := runOp(client, "Project Budgets", "/erp/90/PrjBudget", &prj.PrjProjectBudgetList{List: budgets}, extractIDs(budgets, func(e *prj.PrjProjectBudget) string { return e.BudgetId }), &store.PrjProjectBudgetIDs); err != nil {
		return err
	}

	return nil
}

// generatePrjPhase8 creates analytics data
func generatePrjPhase8(client *HCMClient, store *MockDataStore) error {
	reports := generateStatusReports(store)
	if err := runOp(client, "Status Reports", "/erp/90/PrjStatus", &prj.PrjStatusReportList{List: reports}, extractIDs(reports, func(e *prj.PrjStatusReport) string { return e.StatusId }), &store.PrjStatusReportIDs); err != nil {
		return err
	}

	earnedValues := generateEarnedValues(store)
	if err := runOp(client, "Earned Values", "/erp/90/PrjEV", &prj.PrjEarnedValueList{List: earnedValues}, extractIDs(earnedValues, func(e *prj.PrjEarnedValue) string { return e.EarnedValueId }), &store.PrjEarnedValueIDs); err != nil {
		return err
	}

	variances := generateBudgetVariances(store)
	if err := runOp(client, "Budget Variances", "/erp/90/PrjBudVar", &prj.PrjBudgetVarianceList{List: variances}, extractIDs(variances, func(e *prj.PrjBudgetVariance) string { return e.VarianceId }), &store.PrjBudgetVarianceIDs); err != nil {
		return err
	}

	forecasts := generateResourceForecasts(store)
	if err := runOp(client, "Resource Forecasts", "/erp/90/PrjResFcst", &prj.PrjResourceForecastList{List: forecasts}, extractIDs(forecasts, func(e *prj.PrjResourceForecast) string { return e.ForecastId }), &store.PrjResourceForecastIDs); err != nil {
		return err
	}

	views := generatePortfolioViews(store)
	if err := runOp(client, "Portfolio Views", "/erp/90/PrjPortflo", &prj.PrjPortfolioViewList{List: views}, extractIDs(views, func(e *prj.PrjPortfolioView) string { return e.ViewId }), &store.PrjPortfolioViewIDs); err != nil {
		return err
	}

	kpis := generateProjectKPIs(store)
	if err := runOp(client, "Project KPIs", "/erp/90/PrjKPI", &prj.PrjProjectKPIList{List: kpis}, extractIDs(kpis, func(e *prj.PrjProjectKPI) string { return e.KpiId }), &store.PrjProjectKPIIDs); err != nil {
		return err
	}

	issues := generateProjectIssues(store)
	if err := runOp(client, "Project Issues", "/erp/90/PrjIssue", &prj.PrjProjectIssueList{List: issues}, extractIDs(issues, func(e *prj.PrjProjectIssue) string { return e.IssueId }), &store.PrjProjectIssueIDs); err != nil {
		return err
	}

	return nil
}
