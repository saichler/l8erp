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
	"fmt"

	"github.com/saichler/l8erp/go/types/prj"
)

// generatePrjPhase1 creates foundation data: templates, expense categories, policies, approval rules
func generatePrjPhase1(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Project Templates...")
	templates := generateProjectTemplates()
	if err := client.post("/erp/90/PrjProjTpl", &prj.PrjProjectTemplateList{List: templates}); err != nil {
		return fmt.Errorf("project templates: %w", err)
	}
	for _, t := range templates {
		store.PrjProjectTemplateIDs = append(store.PrjProjectTemplateIDs, t.TemplateId)
	}
	fmt.Printf(" %d created\n", len(templates))

	fmt.Printf("  Creating Expense Categories...")
	categories := generateExpenseCategories()
	if err := client.post("/erp/90/PrjExpCat", &prj.PrjExpenseCategoryList{List: categories}); err != nil {
		return fmt.Errorf("expense categories: %w", err)
	}
	for _, c := range categories {
		store.PrjExpenseCategoryIDs = append(store.PrjExpenseCategoryIDs, c.CategoryId)
	}
	fmt.Printf(" %d created\n", len(categories))

	fmt.Printf("  Creating Expense Policies...")
	policies := generateExpensePolicies()
	if err := client.post("/erp/90/PrjExpPol", &prj.PrjExpensePolicyList{List: policies}); err != nil {
		return fmt.Errorf("expense policies: %w", err)
	}
	for _, p := range policies {
		store.PrjExpensePolicyIDs = append(store.PrjExpensePolicyIDs, p.PolicyId)
	}
	fmt.Printf(" %d created\n", len(policies))

	fmt.Printf("  Creating Approval Rules...")
	rules := generateApprovalRules(store)
	if err := client.post("/erp/90/PrjApprRl", &prj.PrjApprovalRuleList{List: rules}); err != nil {
		return fmt.Errorf("approval rules: %w", err)
	}
	for _, r := range rules {
		store.PrjApprovalRuleIDs = append(store.PrjApprovalRuleIDs, r.RuleId)
	}
	fmt.Printf(" %d created\n", len(rules))

	return nil
}

// generatePrjPhase2 creates projects and phases
func generatePrjPhase2(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Projects...")
	projects := generateProjects(store)
	if err := client.post("/erp/90/PrjProj", &prj.PrjProjectList{List: projects}); err != nil {
		return fmt.Errorf("projects: %w", err)
	}
	for _, p := range projects {
		store.PrjProjectIDs = append(store.PrjProjectIDs, p.ProjectId)
	}
	fmt.Printf(" %d created\n", len(projects))

	fmt.Printf("  Creating Phases...")
	phases := generatePhases(store)
	if err := client.post("/erp/90/PrjPhase", &prj.PrjPhaseList{List: phases}); err != nil {
		return fmt.Errorf("phases: %w", err)
	}
	for _, p := range phases {
		store.PrjPhaseIDs = append(store.PrjPhaseIDs, p.PhaseId)
	}
	fmt.Printf(" %d created\n", len(phases))

	return nil
}

// generatePrjPhase3 creates resource management data
func generatePrjPhase3(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Resource Pools...")
	pools := generateResourcePools(store)
	if err := client.post("/erp/90/PrjResPool", &prj.PrjResourcePoolList{List: pools}); err != nil {
		return fmt.Errorf("resource pools: %w", err)
	}
	for _, p := range pools {
		store.PrjResourcePoolIDs = append(store.PrjResourcePoolIDs, p.PoolId)
	}
	fmt.Printf(" %d created\n", len(pools))

	fmt.Printf("  Creating Resources...")
	resources := generateResources(store)
	if err := client.post("/erp/90/PrjRes", &prj.PrjResourceList{List: resources}); err != nil {
		return fmt.Errorf("resources: %w", err)
	}
	for _, r := range resources {
		store.PrjResourceIDs = append(store.PrjResourceIDs, r.ResourceId)
	}
	fmt.Printf(" %d created\n", len(resources))

	fmt.Printf("  Creating Resource Skills...")
	skills := generateResourceSkills(store)
	if err := client.post("/erp/90/PrjResSkl", &prj.PrjResourceSkillList{List: skills}); err != nil {
		return fmt.Errorf("resource skills: %w", err)
	}
	for _, s := range skills {
		store.PrjResourceSkillIDs = append(store.PrjResourceSkillIDs, s.SkillId)
	}
	fmt.Printf(" %d created\n", len(skills))

	fmt.Printf("  Creating Capacity Plans...")
	plans := generatePrjCapacityPlans(store)
	if err := client.post("/erp/90/PrjCapPlan", &prj.PrjCapacityPlanList{List: plans}); err != nil {
		return fmt.Errorf("capacity plans: %w", err)
	}
	for _, p := range plans {
		store.PrjCapacityPlanIDs = append(store.PrjCapacityPlanIDs, p.PlanId)
	}
	fmt.Printf(" %d created\n", len(plans))

	return nil
}

// generatePrjPhase4 creates project detail data
func generatePrjPhase4(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Tasks...")
	tasks := generateTasks(store)
	if err := client.post("/erp/90/PrjTask", &prj.PrjTaskList{List: tasks}); err != nil {
		return fmt.Errorf("tasks: %w", err)
	}
	for _, t := range tasks {
		store.PrjTaskIDs = append(store.PrjTaskIDs, t.TaskId)
	}
	fmt.Printf(" %d created\n", len(tasks))

	fmt.Printf("  Creating Milestones...")
	milestones := generateMilestones(store)
	if err := client.post("/erp/90/PrjMilstn", &prj.PrjMilestoneList{List: milestones}); err != nil {
		return fmt.Errorf("milestones: %w", err)
	}
	for _, m := range milestones {
		store.PrjMilestoneIDs = append(store.PrjMilestoneIDs, m.MilestoneId)
	}
	fmt.Printf(" %d created\n", len(milestones))

	fmt.Printf("  Creating Deliverables...")
	deliverables := generateDeliverables(store)
	if err := client.post("/erp/90/PrjDeliv", &prj.PrjDeliverableList{List: deliverables}); err != nil {
		return fmt.Errorf("deliverables: %w", err)
	}
	for _, d := range deliverables {
		store.PrjDeliverableIDs = append(store.PrjDeliverableIDs, d.DeliverableId)
	}
	fmt.Printf(" %d created\n", len(deliverables))

	fmt.Printf("  Creating Dependencies...")
	dependencies := generateDependencies(store)
	if err := client.post("/erp/90/PrjDepend", &prj.PrjDependencyList{List: dependencies}); err != nil {
		return fmt.Errorf("dependencies: %w", err)
	}
	for _, d := range dependencies {
		store.PrjDependencyIDs = append(store.PrjDependencyIDs, d.DependencyId)
	}
	fmt.Printf(" %d created\n", len(dependencies))

	fmt.Printf("  Creating Risks...")
	risks := generateRisks(store)
	if err := client.post("/erp/90/PrjRisk", &prj.PrjRiskList{List: risks}); err != nil {
		return fmt.Errorf("risks: %w", err)
	}
	for _, r := range risks {
		store.PrjRiskIDs = append(store.PrjRiskIDs, r.RiskId)
	}
	fmt.Printf(" %d created\n", len(risks))

	return nil
}

// generatePrjPhase5 creates resource allocation data
func generatePrjPhase5(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Allocations...")
	allocations := generateAllocations(store)
	if err := client.post("/erp/90/PrjAlloc", &prj.PrjAllocationList{List: allocations}); err != nil {
		return fmt.Errorf("allocations: %w", err)
	}
	for _, a := range allocations {
		store.PrjAllocationIDs = append(store.PrjAllocationIDs, a.AllocationId)
	}
	fmt.Printf(" %d created\n", len(allocations))

	fmt.Printf("  Creating Bookings...")
	bookings := generateBookings(store)
	if err := client.post("/erp/90/PrjBooking", &prj.PrjBookingList{List: bookings}); err != nil {
		return fmt.Errorf("bookings: %w", err)
	}
	for _, b := range bookings {
		store.PrjBookingIDs = append(store.PrjBookingIDs, b.BookingId)
	}
	fmt.Printf(" %d created\n", len(bookings))

	fmt.Printf("  Creating Utilizations...")
	utilizations := generateUtilizations(store)
	if err := client.post("/erp/90/PrjUtil", &prj.PrjUtilizationList{List: utilizations}); err != nil {
		return fmt.Errorf("utilizations: %w", err)
	}
	for _, u := range utilizations {
		store.PrjUtilizationIDs = append(store.PrjUtilizationIDs, u.UtilizationId)
	}
	fmt.Printf(" %d created\n", len(utilizations))

	fmt.Printf("  Creating Billing Rates...")
	rates := generateBillingRates(store)
	if err := client.post("/erp/90/PrjBillRt", &prj.PrjBillingRateList{List: rates}); err != nil {
		return fmt.Errorf("billing rates: %w", err)
	}
	for _, r := range rates {
		store.PrjBillingRateIDs = append(store.PrjBillingRateIDs, r.RateId)
	}
	fmt.Printf(" %d created\n", len(rates))

	return nil
}

// generatePrjPhase6 creates time and expense data
func generatePrjPhase6(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Timesheets...")
	timesheets := generatePrjTimesheets(store)
	if err := client.post("/erp/90/PrjTmSheet", &prj.PrjTimesheetList{List: timesheets}); err != nil {
		return fmt.Errorf("timesheets: %w", err)
	}
	for _, t := range timesheets {
		store.PrjTimesheetIDs = append(store.PrjTimesheetIDs, t.TimesheetId)
	}
	fmt.Printf(" %d created\n", len(timesheets))

	fmt.Printf("  Creating Timesheet Entries...")
	entries := generateTimesheetEntries(store)
	if err := client.post("/erp/90/PrjTmEntry", &prj.PrjTimesheetEntryList{List: entries}); err != nil {
		return fmt.Errorf("timesheet entries: %w", err)
	}
	for _, e := range entries {
		store.PrjTimesheetEntryIDs = append(store.PrjTimesheetEntryIDs, e.EntryId)
	}
	fmt.Printf(" %d created\n", len(entries))

	fmt.Printf("  Creating Expense Reports...")
	reports := generateExpenseReports(store)
	if err := client.post("/erp/90/PrjExpRpt", &prj.PrjExpenseReportList{List: reports}); err != nil {
		return fmt.Errorf("expense reports: %w", err)
	}
	for _, r := range reports {
		store.PrjExpenseReportIDs = append(store.PrjExpenseReportIDs, r.ReportId)
	}
	fmt.Printf(" %d created\n", len(reports))

	fmt.Printf("  Creating Expense Entries...")
	expEntries := generateExpenseEntries(store)
	if err := client.post("/erp/90/PrjExpEnt", &prj.PrjExpenseEntryList{List: expEntries}); err != nil {
		return fmt.Errorf("expense entries: %w", err)
	}
	for _, e := range expEntries {
		store.PrjExpenseEntryIDs = append(store.PrjExpenseEntryIDs, e.EntryId)
	}
	fmt.Printf(" %d created\n", len(expEntries))

	return nil
}

// generatePrjPhase7 creates billing data
func generatePrjPhase7(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Billing Schedules...")
	schedules := generateBillingSchedules(store)
	if err := client.post("/erp/90/PrjBillSch", &prj.PrjBillingScheduleList{List: schedules}); err != nil {
		return fmt.Errorf("billing schedules: %w", err)
	}
	for _, s := range schedules {
		store.PrjBillingScheduleIDs = append(store.PrjBillingScheduleIDs, s.ScheduleId)
	}
	fmt.Printf(" %d created\n", len(schedules))

	fmt.Printf("  Creating Project Invoices...")
	invoices := generateProjectInvoices(store)
	if err := client.post("/erp/90/PrjInvoice", &prj.PrjProjectInvoiceList{List: invoices}); err != nil {
		return fmt.Errorf("project invoices: %w", err)
	}
	for _, i := range invoices {
		store.PrjProjectInvoiceIDs = append(store.PrjProjectInvoiceIDs, i.InvoiceId)
	}
	fmt.Printf(" %d created\n", len(invoices))

	fmt.Printf("  Creating Billing Milestones...")
	milestones := generateBillingMilestones(store)
	if err := client.post("/erp/90/PrjBillMls", &prj.PrjBillingMilestoneList{List: milestones}); err != nil {
		return fmt.Errorf("billing milestones: %w", err)
	}
	for _, m := range milestones {
		store.PrjBillingMilestoneIDs = append(store.PrjBillingMilestoneIDs, m.MilestoneId)
	}
	fmt.Printf(" %d created\n", len(milestones))

	fmt.Printf("  Creating Invoice Lines...")
	lines := generateInvoiceLines(store)
	if err := client.post("/erp/90/PrjInvLine", &prj.PrjInvoiceLineList{List: lines}); err != nil {
		return fmt.Errorf("invoice lines: %w", err)
	}
	for _, l := range lines {
		store.PrjInvoiceLineIDs = append(store.PrjInvoiceLineIDs, l.LineId)
	}
	fmt.Printf(" %d created\n", len(lines))

	fmt.Printf("  Creating Revenue Recognitions...")
	recognitions := generateRevenueRecognitions(store)
	if err := client.post("/erp/90/PrjRevRec", &prj.PrjRevenueRecognitionList{List: recognitions}); err != nil {
		return fmt.Errorf("revenue recognitions: %w", err)
	}
	for _, r := range recognitions {
		store.PrjRevenueRecognitionIDs = append(store.PrjRevenueRecognitionIDs, r.RecognitionId)
	}
	fmt.Printf(" %d created\n", len(recognitions))

	fmt.Printf("  Creating Project Budgets...")
	budgets := generateProjectBudgets(store)
	if err := client.post("/erp/90/PrjBudget", &prj.PrjProjectBudgetList{List: budgets}); err != nil {
		return fmt.Errorf("project budgets: %w", err)
	}
	for _, b := range budgets {
		store.PrjProjectBudgetIDs = append(store.PrjProjectBudgetIDs, b.BudgetId)
	}
	fmt.Printf(" %d created\n", len(budgets))

	return nil
}

// generatePrjPhase8 creates analytics data
func generatePrjPhase8(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Status Reports...")
	reports := generateStatusReports(store)
	if err := client.post("/erp/90/PrjStatus", &prj.PrjStatusReportList{List: reports}); err != nil {
		return fmt.Errorf("status reports: %w", err)
	}
	for _, r := range reports {
		store.PrjStatusReportIDs = append(store.PrjStatusReportIDs, r.StatusId)
	}
	fmt.Printf(" %d created\n", len(reports))

	fmt.Printf("  Creating Earned Values...")
	earnedValues := generateEarnedValues(store)
	if err := client.post("/erp/90/PrjEV", &prj.PrjEarnedValueList{List: earnedValues}); err != nil {
		return fmt.Errorf("earned values: %w", err)
	}
	for _, ev := range earnedValues {
		store.PrjEarnedValueIDs = append(store.PrjEarnedValueIDs, ev.EarnedValueId)
	}
	fmt.Printf(" %d created\n", len(earnedValues))

	fmt.Printf("  Creating Budget Variances...")
	variances := generateBudgetVariances(store)
	if err := client.post("/erp/90/PrjBudVar", &prj.PrjBudgetVarianceList{List: variances}); err != nil {
		return fmt.Errorf("budget variances: %w", err)
	}
	for _, v := range variances {
		store.PrjBudgetVarianceIDs = append(store.PrjBudgetVarianceIDs, v.VarianceId)
	}
	fmt.Printf(" %d created\n", len(variances))

	fmt.Printf("  Creating Resource Forecasts...")
	forecasts := generateResourceForecasts(store)
	if err := client.post("/erp/90/PrjResFcst", &prj.PrjResourceForecastList{List: forecasts}); err != nil {
		return fmt.Errorf("resource forecasts: %w", err)
	}
	for _, f := range forecasts {
		store.PrjResourceForecastIDs = append(store.PrjResourceForecastIDs, f.ForecastId)
	}
	fmt.Printf(" %d created\n", len(forecasts))

	fmt.Printf("  Creating Portfolio Views...")
	views := generatePortfolioViews(store)
	if err := client.post("/erp/90/PrjPortflo", &prj.PrjPortfolioViewList{List: views}); err != nil {
		return fmt.Errorf("portfolio views: %w", err)
	}
	for _, v := range views {
		store.PrjPortfolioViewIDs = append(store.PrjPortfolioViewIDs, v.ViewId)
	}
	fmt.Printf(" %d created\n", len(views))

	fmt.Printf("  Creating Project KPIs...")
	kpis := generateProjectKPIs(store)
	if err := client.post("/erp/90/PrjKPI", &prj.PrjProjectKPIList{List: kpis}); err != nil {
		return fmt.Errorf("project KPIs: %w", err)
	}
	for _, k := range kpis {
		store.PrjProjectKPIIDs = append(store.PrjProjectKPIIDs, k.KpiId)
	}
	fmt.Printf(" %d created\n", len(kpis))

	fmt.Printf("  Creating Project Issues...")
	issues := generateProjectIssues(store)
	if err := client.post("/erp/90/PrjIssue", &prj.PrjProjectIssueList{List: issues}); err != nil {
		return fmt.Errorf("project issues: %w", err)
	}
	for _, i := range issues {
		store.PrjProjectIssueIDs = append(store.PrjProjectIssueIDs, i.IssueId)
	}
	fmt.Printf(" %d created\n", len(issues))

	return nil
}
