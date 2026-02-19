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
package mocks

import (
	"fmt"

	"github.com/saichler/l8erp/go/types/prj"
)

// generatePrjPhase5 creates time and expense data with embedded entries
func generatePrjPhase5(client *HCMClient, store *MockDataStore) error {
	// Generate timesheets and embed entries
	timesheets := generatePrjTimesheets(store)
	store.PrjTimesheetIDs = extractIDs(timesheets, func(e *prj.PrjTimesheet) string { return e.TimesheetId })
	entries := generateTimesheetEntries(store)
	store.PrjTimesheetEntryIDs = extractIDs(entries, func(e *prj.PrjTimesheetEntry) string { return e.EntryId })
	fmt.Printf("  Generated %d timesheet entries\n", len(entries))
	for i, e := range entries {
		timesheets[i%len(timesheets)].Entries = append(timesheets[i%len(timesheets)].Entries, e)
	}
	if err := runOp(client, "Timesheets", "/erp/90/PrjTmSheet", &prj.PrjTimesheetList{List: timesheets}, store.PrjTimesheetIDs, nil); err != nil {
		return err
	}

	// Generate expense reports and embed entries
	reports := generateExpenseReports(store)
	store.PrjExpenseReportIDs = extractIDs(reports, func(e *prj.PrjExpenseReport) string { return e.ReportId })
	expEntries := generateExpenseEntries(store)
	store.PrjExpenseEntryIDs = extractIDs(expEntries, func(e *prj.PrjExpenseEntry) string { return e.EntryId })
	fmt.Printf("  Generated %d expense entries\n", len(expEntries))
	for i, e := range expEntries {
		reports[i%len(reports)].Entries = append(reports[i%len(reports)].Entries, e)
	}
	if err := runOp(client, "Expense Reports", "/erp/90/PrjExpRpt", &prj.PrjExpenseReportList{List: reports}, store.PrjExpenseReportIDs, nil); err != nil {
		return err
	}

	return nil
}

// generatePrjPhase6 creates billing data with embedded milestones and lines
func generatePrjPhase6(client *HCMClient, store *MockDataStore) error {
	// Generate billing schedules and embed milestones
	schedules := generateBillingSchedules(store)
	store.PrjBillingScheduleIDs = extractIDs(schedules, func(e *prj.PrjBillingSchedule) string { return e.ScheduleId })
	milestones := generateBillingMilestones(store)
	store.PrjBillingMilestoneIDs = extractIDs(milestones, func(e *prj.PrjBillingMilestone) string { return e.MilestoneId })
	fmt.Printf("  Generated %d billing milestones\n", len(milestones))
	for i, m := range milestones {
		schedules[i%len(schedules)].Milestones = append(schedules[i%len(schedules)].Milestones, m)
	}
	if err := runOp(client, "Billing Schedules", "/erp/90/PrjBillSch", &prj.PrjBillingScheduleList{List: schedules}, store.PrjBillingScheduleIDs, nil); err != nil {
		return err
	}

	// Generate invoices and embed lines
	invoices := generateProjectInvoices(store)
	store.PrjProjectInvoiceIDs = extractIDs(invoices, func(e *prj.PrjProjectInvoice) string { return e.InvoiceId })
	lines := generateInvoiceLines(store)
	fmt.Printf("  Generated %d invoice lines\n", len(lines))
	for i, l := range lines {
		invoices[i%len(invoices)].Lines = append(invoices[i%len(invoices)].Lines, l)
	}
	if err := runOp(client, "Project Invoices", "/erp/90/PrjInvoice", &prj.PrjProjectInvoiceList{List: invoices}, store.PrjProjectInvoiceIDs, nil); err != nil {
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

// generatePrjPhase7 creates analytics data (Prime Objects only)
func generatePrjPhase7(client *HCMClient, store *MockDataStore) error {
	reports := generateStatusReports(store)
	if err := runOp(client, "Status Reports", "/erp/90/PrjStatus", &prj.PrjStatusReportList{List: reports}, extractIDs(reports, func(e *prj.PrjStatusReport) string { return e.StatusId }), &store.PrjStatusReportIDs); err != nil {
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

	return nil
}
