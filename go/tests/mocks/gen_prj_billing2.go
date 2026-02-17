/*
(c) 2025 Sharon Aicler (saichler@gmail.com)

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

// gen_prj_billing2.go
// Generates:
// - PrjInvoiceLine
// - PrjRevenueRecognition
// - PrjProjectBudget

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/prj"
)

var invoiceDescriptions = []string{
	"Professional services for project development",
	"Consulting hours for requirements analysis",
	"Technical architecture and design services",
	"Software development services",
	"Quality assurance and testing services",
	"Project management services",
	"Training and documentation services",
	"System integration services",
	"Support and maintenance services",
	"Data migration services",
}

var budgetNames = []string{
	"Labor Budget", "Materials Budget", "Travel Budget",
	"Software Licenses", "Hardware Budget", "Training Budget",
	"Consulting Budget", "Contingency Reserve", "Equipment Budget",
	"Infrastructure Budget", "Development Budget", "Testing Budget",
	"Deployment Budget", "Support Budget", "Documentation Budget",
	"Phase 1 Budget", "Phase 2 Budget", "Phase 3 Budget",
	"Q1 Budget", "Q2 Budget", "Q3 Budget",
	"Annual Budget", "Project Reserve", "Overhead Budget",
	"Vendor Budget", "Subcontractor Budget", "Facilities Budget",
	"Communication Budget", "Risk Reserve", "Change Budget",
}

// generateInvoiceLines creates invoice line items
func generateInvoiceLines(store *MockDataStore) []*prj.PrjInvoiceLine {
	lineTypes := []string{"time", "expense", "milestone", "fixed"}
	units := []string{"hours", "days", "units", "each"}

	count := 75
	lines := make([]*prj.PrjInvoiceLine, count)

	for i := 0; i < count; i++ {
		projectID := pickRef(store.PrjProjectIDs, i)

		taskID := pickRef(store.PrjTaskIDs, i)

		// Optional references to timesheet or expense entries
		timesheetEntryID := ""
		if i%3 == 0 && len(store.PrjTimesheetEntryIDs) > 0 {
			timesheetEntryID = store.PrjTimesheetEntryIDs[i%len(store.PrjTimesheetEntryIDs)]
		}

		expenseEntryID := ""
		if i%4 == 0 && len(store.PrjExpenseEntryIDs) > 0 {
			expenseEntryID = store.PrjExpenseEntryIDs[i%len(store.PrjExpenseEntryIDs)]
		}

		billingMilestoneID := ""
		if i%5 == 0 && len(store.PrjBillingMilestoneIDs) > 0 {
			billingMilestoneID = store.PrjBillingMilestoneIDs[i%len(store.PrjBillingMilestoneIDs)]
		}

		lineType := lineTypes[i%len(lineTypes)]
		unit := units[i%len(units)]

		// Quantity based on line type
		var quantity float64
		if lineType == "time" {
			quantity = float64(rand.Intn(80) + 8)
		} else if lineType == "expense" {
			quantity = float64(rand.Intn(10) + 1)
		} else {
			quantity = 1.0
		}

		// Unit price: $50 to $300 for time, $100 to $5000 for others
		var unitPriceAmount int64
		if lineType == "time" {
			unitPriceAmount = int64(rand.Intn(25000) + 5000)
		} else {
			unitPriceAmount = int64(rand.Intn(490000) + 10000)
		}

		amount := int64(float64(unitPriceAmount) * quantity)
		taxRate := float64(rand.Intn(10)+5) / 100
		taxAmount := int64(float64(amount) * taxRate)
		totalAmount := amount + taxAmount

		// 80% taxable, 20% not taxable
		isTaxable := i < count*80/100

		lines[i] = &prj.PrjInvoiceLine{
			LineId:             genID("pil", i),
			ProjectId:          projectID,
			TaskId:             taskID,
			TimesheetEntryId:   timesheetEntryID,
			ExpenseEntryId:     expenseEntryID,
			BillingMilestoneId: billingMilestoneID,
			LineNumber:         int32((i % 5) + 1),
			Description:        invoiceDescriptions[i%len(invoiceDescriptions)],
			Quantity:           quantity,
			Unit:               unit,
			UnitPrice:          money(store, unitPriceAmount),
			Amount:             money(store, amount),
			TaxAmount:          money(store, taxAmount),
			TotalAmount:        money(store, totalAmount),
			LineType:           lineType,
			IsTaxable:          isTaxable,
			AuditInfo:          createAuditInfo(),
		}
	}
	return lines
}

// generateRevenueRecognitions creates revenue recognition records
func generateRevenueRecognitions(store *MockDataStore) []*prj.PrjRevenueRecognition {
	methods := []prj.PrjRevenueRecognitionMethod{
		prj.PrjRevenueRecognitionMethod_PRJ_REVENUE_RECOGNITION_METHOD_PERCENTAGE_OF_COMPLETION,
		prj.PrjRevenueRecognitionMethod_PRJ_REVENUE_RECOGNITION_METHOD_PERCENTAGE_OF_COMPLETION,
		prj.PrjRevenueRecognitionMethod_PRJ_REVENUE_RECOGNITION_METHOD_COMPLETED_CONTRACT,
		prj.PrjRevenueRecognitionMethod_PRJ_REVENUE_RECOGNITION_METHOD_AS_INVOICED,
	}

	count := 30
	recognitions := make([]*prj.PrjRevenueRecognition, count)

	for i := 0; i < count; i++ {
		projectID := pickRef(store.PrjProjectIDs, i)

		invoiceID := pickRef(store.PrjProjectInvoiceIDs, i)

		recognitionDate := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		periodStart := recognitionDate.AddDate(0, 0, -recognitionDate.Day()+1)
		periodEnd := periodStart.AddDate(0, 1, -1)

		// Amounts
		recognizedAmount := int64(rand.Intn(100000)+10000) * 100
		deferredAmount := int64(rand.Intn(50000)+5000) * 100
		cumulativeRecognized := recognizedAmount + int64(rand.Intn(200000))*100

		method := methods[i%len(methods)]
		percentComplete := float64(rand.Intn(80) + 10)

		// 70% posted, 30% not posted
		isPosted := i < count*70/100
		var postedDate int64
		if isPosted {
			postedDate = recognitionDate.AddDate(0, 0, rand.Intn(5)).Unix()
		}

		// GL account references
		glAccount := ""
		deferredGlAccount := ""
		if len(store.AccountIDs) > 0 {
			glAccount = store.AccountIDs[i%len(store.AccountIDs)]
			deferredGlAccount = store.AccountIDs[(i+1)%len(store.AccountIDs)]
		}

		recognitions[i] = &prj.PrjRevenueRecognition{
			RecognitionId:        genID("prr", i),
			ProjectId:            projectID,
			InvoiceId:            invoiceID,
			RecognitionDate:      recognitionDate.Unix(),
			PeriodStart:          periodStart.Unix(),
			PeriodEnd:            periodEnd.Unix(),
			RecognizedAmount:     money(store, recognizedAmount),
			DeferredAmount:       money(store, deferredAmount),
			CumulativeRecognized: money(store, cumulativeRecognized),
			Method:               method,
			PercentComplete:      percentComplete,
			GlAccount:            glAccount,
			DeferredGlAccount:    deferredGlAccount,
			Notes:                fmt.Sprintf("Revenue recognition for period %d", i+1),
			IsPosted:             isPosted,
			PostedDate:           postedDate,
			AuditInfo:            createAuditInfo(),
		}
	}
	return recognitions
}

// generateProjectBudgets creates project budget records
func generateProjectBudgets(store *MockDataStore) []*prj.PrjProjectBudget {
	budgetTypes := []string{"Labor", "Materials", "Travel", "Software", "Hardware", "Other"}

	count := 30
	budgets := make([]*prj.PrjProjectBudget, count)

	for i := 0; i < count; i++ {
		projectID := pickRef(store.PrjProjectIDs, i)

		phaseID := ""
		if i%2 == 0 && len(store.PrjPhaseIDs) > 0 {
			phaseID = store.PrjPhaseIDs[i%len(store.PrjPhaseIDs)]
		}

		periodStart := time.Now().AddDate(0, -rand.Intn(6), 0)
		periodEnd := periodStart.AddDate(0, 6, 0)

		// Budget amounts
		budgetedAmount := int64(rand.Intn(200000)+20000) * 100
		actualAmount := budgetedAmount * int64(rand.Intn(80)+30) / 100
		committedAmount := actualAmount + int64(rand.Intn(20000))*100
		remainingAmount := budgetedAmount - actualAmount

		// Hours (primarily for labor budgets)
		budgetedHours := float64(rand.Intn(500) + 100)
		actualHours := budgetedHours * float64(rand.Intn(80)+30) / 100
		remainingHours := budgetedHours - actualHours

		// 75% approved, 25% pending approval
		isApproved := i < count*75/100
		var approvedBy string
		var approvedDate int64
		if isApproved && len(store.ManagerIDs) > 0 {
			approvedBy = store.ManagerIDs[i%len(store.ManagerIDs)]
			approvedDate = periodStart.AddDate(0, 0, -rand.Intn(14)).Unix()
		}

		budgets[i] = &prj.PrjProjectBudget{
			BudgetId:        genID("ppb", i),
			ProjectId:       projectID,
			Name:            budgetNames[i%len(budgetNames)],
			Description:     fmt.Sprintf("Budget: %s", budgetNames[i%len(budgetNames)]),
			BudgetType:      budgetTypes[i%len(budgetTypes)],
			PhaseId:         phaseID,
			BudgetedAmount:  money(store, budgetedAmount),
			CommittedAmount: money(store, committedAmount),
			ActualAmount:    money(store, actualAmount),
			RemainingAmount: money(store, remainingAmount),
			BudgetedHours:   budgetedHours,
			ActualHours:     actualHours,
			RemainingHours:  remainingHours,
			PeriodStart:     periodStart.Unix(),
			PeriodEnd:       periodEnd.Unix(),
			IsApproved:      isApproved,
			ApprovedBy:      approvedBy,
			ApprovedDate:    approvedDate,
			Version:         int32(rand.Intn(3) + 1),
			AuditInfo:       createAuditInfo(),
		}
	}
	return budgets
}
