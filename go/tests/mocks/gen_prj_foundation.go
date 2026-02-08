/*
(C) 2025 Sharon Aicler (saichler@gmail.com)

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
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/prj"
)

// generateProjectTemplates creates project template records
func generateProjectTemplates(store *MockDataStore) []*prj.PrjProjectTemplate {
	projectTypes := []prj.PrjProjectType{
		prj.PrjProjectType_PRJ_PROJECT_TYPE_INTERNAL,
		prj.PrjProjectType_PRJ_PROJECT_TYPE_CLIENT,
		prj.PrjProjectType_PRJ_PROJECT_TYPE_FIXED_PRICE,
		prj.PrjProjectType_PRJ_PROJECT_TYPE_TIME_AND_MATERIALS,
		prj.PrjProjectType_PRJ_PROJECT_TYPE_RETAINER,
		prj.PrjProjectType_PRJ_PROJECT_TYPE_CAPITAL,
		prj.PrjProjectType_PRJ_PROJECT_TYPE_CLIENT,
		prj.PrjProjectType_PRJ_PROJECT_TYPE_FIXED_PRICE,
		prj.PrjProjectType_PRJ_PROJECT_TYPE_TIME_AND_MATERIALS,
	}

	billingTypes := []prj.PrjBillingType{
		prj.PrjBillingType_PRJ_BILLING_TYPE_NOT_BILLABLE,
		prj.PrjBillingType_PRJ_BILLING_TYPE_TIME_AND_MATERIALS,
		prj.PrjBillingType_PRJ_BILLING_TYPE_FIXED_PRICE,
		prj.PrjBillingType_PRJ_BILLING_TYPE_TIME_AND_MATERIALS,
		prj.PrjBillingType_PRJ_BILLING_TYPE_RETAINER,
		prj.PrjBillingType_PRJ_BILLING_TYPE_MILESTONE,
		prj.PrjBillingType_PRJ_BILLING_TYPE_TIME_AND_MATERIALS,
		prj.PrjBillingType_PRJ_BILLING_TYPE_FIXED_PRICE,
		prj.PrjBillingType_PRJ_BILLING_TYPE_RETAINER,
	}

	templates := make([]*prj.PrjProjectTemplate, len(prjTemplateNames))
	for i, name := range prjTemplateNames {
		// Estimated hours between 100 and 2000
		estimatedHours := float64(rand.Intn(1901) + 100)
		// Budget between $10,000 and $500,000 (in cents)
		budgetAmount := int64(rand.Intn(49000001) + 1000000)

		templates[i] = &prj.PrjProjectTemplate{
			TemplateId:            genID("ptmpl", i),
			Name:                  name,
			Description:           fmt.Sprintf("Project template for %s engagements", name),
			ProjectType:           projectTypes[i%len(projectTypes)],
			DefaultEstimatedHours: estimatedHours,
			DefaultBudget: money(store, budgetAmount),
			DefaultBillingType: billingTypes[i%len(billingTypes)],
			IsActive:           true,
			AuditInfo:          createAuditInfo(),
		}
	}
	return templates
}

// generateExpenseCategories creates expense category records
func generateExpenseCategories(store *MockDataStore) []*prj.PrjExpenseCategory {
	expenseTypes := []prj.PrjExpenseType{
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_TRAVEL,
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_LODGING,
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_MEALS,
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_TRANSPORTATION,
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_SOFTWARE,
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_EQUIPMENT,
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_OTHER,
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_OTHER,
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_MATERIALS,
		prj.PrjExpenseType_PRJ_EXPENSE_TYPE_OTHER,
	}

	// Default limits in cents (ranging from $50 to $5000)
	defaultLimits := []int64{
		200000, // Travel: $2000
		50000,  // Lodging: $500
		7500,   // Meals: $75
		20000,  // Transportation: $200
		100000, // Software: $1000
		500000, // Hardware: $5000
		25000,  // Training: $250
		100000, // Consulting: $1000
		5000,   // Office Supplies: $50
		10000,  // Communication: $100
	}

	requiresReceipt := []bool{true, true, false, true, true, true, true, true, false, true}

	categories := make([]*prj.PrjExpenseCategory, len(prjExpenseCategoryNames))
	for i, name := range prjExpenseCategoryNames {
		categories[i] = &prj.PrjExpenseCategory{
			CategoryId:            genID("pexcat", i),
			Name:                  name,
			Description:           fmt.Sprintf("Expense category for %s related costs", name),
			GlAccount:             fmt.Sprintf("5%03d", 70+i),
			ExpenseType:           expenseTypes[i%len(expenseTypes)],
			DefaultLimit: money(store, defaultLimits[i%len(defaultLimits)]),
			RequiresReceipt:       requiresReceipt[i%len(requiresReceipt)],
			IsBillableDefault:     i < 7, // First 7 categories billable by default
			IsReimbursableDefault: true,
			IsActive:              true,
			SortOrder:             int32(i + 1),
			AuditInfo:             createAuditInfo(),
		}
	}
	return categories
}

// generateExpensePolicies creates expense policy records
func generateExpensePolicies(store *MockDataStore) []*prj.PrjExpensePolicy {
	// Daily meal limits in cents
	dailyMealLimits := []int64{7500, 15000, 10000, 5000, 10000, 0}
	// Daily lodging limits in cents
	dailyLodgingLimits := []int64{20000, 50000, 30000, 15000, 25000, 0}
	// Mileage rates in cents per mile
	mileageRates := []int64{67, 67, 58, 58, 67, 0}
	// Max single expense in cents
	maxSingleExpenses := []int64{50000, 100000, 75000, 25000, 50000, 500000}
	// Receipt thresholds in cents
	receiptThresholds := []int64{2500, 5000, 2500, 1500, 2500, 10000}
	// Advance approval thresholds in cents
	advanceThresholds := []int64{100000, 200000, 150000, 50000, 100000, 500000}

	policies := make([]*prj.PrjExpensePolicy, len(prjExpensePolicyNames))
	for i, name := range prjExpensePolicyNames {
		effectiveDate := time.Now().AddDate(0, -rand.Intn(12), 0)
		expiryDate := effectiveDate.AddDate(2, 0, 0)

		policies[i] = &prj.PrjExpensePolicy{
			PolicyId:    genID("pexpol", i),
			Name:        name,
			Description: fmt.Sprintf("Expense reimbursement policy: %s", name),
			DailyMealLimit: money(store, dailyMealLimits[i%len(dailyMealLimits)]),
			DailyLodgingLimit: money(store, dailyLodgingLimits[i%len(dailyLodgingLimits)]),
			MileageRate: money(store, mileageRates[i%len(mileageRates)]),
			MaxSingleExpense: money(store, maxSingleExpenses[i%len(maxSingleExpenses)]),
			ReceiptRequiredAbove: true,
			ReceiptThreshold: money(store, receiptThresholds[i%len(receiptThresholds)]),
			AdvanceApprovalRequired: i > 0, // First policy doesn't require advance approval
			AdvanceApprovalThreshold: money(store, advanceThresholds[i%len(advanceThresholds)]),
			SubmissionDeadlineDays: int32(30 + rand.Intn(31)),
			IsActive:               true,
			EffectiveDate:          effectiveDate.Unix(),
			ExpiryDate:             expiryDate.Unix(),
			AuditInfo:              createAuditInfo(),
		}
	}
	return policies
}

// generateApprovalRules creates approval rule records
func generateApprovalRules(store *MockDataStore) []*prj.PrjApprovalRule {
	approvalTypes := []prj.PrjApprovalType{
		prj.PrjApprovalType_PRJ_APPROVAL_TYPE_TIMESHEET,
		prj.PrjApprovalType_PRJ_APPROVAL_TYPE_EXPENSE,
		prj.PrjApprovalType_PRJ_APPROVAL_TYPE_INVOICE,
		prj.PrjApprovalType_PRJ_APPROVAL_TYPE_BUDGET,
		prj.PrjApprovalType_PRJ_APPROVAL_TYPE_TIMESHEET,
		prj.PrjApprovalType_PRJ_APPROVAL_TYPE_EXPENSE,
	}

	ruleNames := []string{
		"Standard Timesheet Approval",
		"Standard Expense Approval",
		"Invoice Approval",
		"Budget Change Approval",
		"Overtime Timesheet Approval",
		"High Value Expense Approval",
	}

	ruleDescriptions := []string{
		"Approval rule for standard weekly timesheets",
		"Approval rule for expense reports up to $500",
		"Approval rule for client invoices",
		"Approval rule for project budget changes",
		"Approval rule for timesheets with overtime hours",
		"Approval rule for expenses over $500",
	}

	// Threshold amounts in cents
	thresholdAmounts := []int64{0, 50000, 100000, 50000, 0, 50000}
	// Threshold hours
	thresholdHours := []float64{40.0, 0.0, 0.0, 0.0, 50.0, 0.0}

	approverRoles := []string{
		"Project Manager",
		"Finance Manager",
		"Account Manager",
		"Executive",
		"Project Manager",
		"Finance Director",
	}

	rules := make([]*prj.PrjApprovalRule, 6)
	for i := 0; i < 6; i++ {
		// Get an approver from managers if available
		approverId := pickRef(store.ManagerIDs, i)

		// Distribution: 60% require manager approval, 40% require PM approval
		requiresManager := i < 4
		requiresPM := i >= 2

		rules[i] = &prj.PrjApprovalRule{
			RuleId:       genID("papprv", i),
			Name:         ruleNames[i],
			Description:  ruleDescriptions[i],
			ApprovalType: approvalTypes[i],
			ThresholdAmount: money(store, thresholdAmounts[i]),
			ThresholdHours:                 thresholdHours[i],
			ApproverId:                     approverId,
			ApproverRole:                   approverRoles[i],
			RequiresManagerApproval:        requiresManager,
			RequiresProjectManagerApproval: requiresPM,
			ApprovalLevels:                 int32(1 + i/2),
			IsActive:                       true,
			Priority:                       int32(i + 1),
			AuditInfo:                      createAuditInfo(),
		}
	}
	return rules
}
