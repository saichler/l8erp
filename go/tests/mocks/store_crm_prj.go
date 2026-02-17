/*
© 2025 Sharon Aicler (saichler@gmail.com)
CRM and PRJ module ID stores for mock data generation
*/
package mocks

// CRMStore holds generated IDs for CRM module
type CRMStore struct {
	// CRM Phase 1: Leads Foundation
	CrmLeadSourceIDs []string
	CrmLeadScoreIDs  []string
	CrmLeadAssignIDs []string

	// CRM Phase 2: Opportunity Stages
	CrmOppStageIDs []string

	// CRM Phase 3: Accounts & Contacts
	CrmAccountIDs []string
	CrmContactIDs []string

	// CRM Phase 4: Marketing
	CrmCampaignIDs      []string
	CrmEmailTemplateIDs []string
	CrmMarketingListIDs []string

	// CRM Phase 5: Opportunities
	CrmOpportunityIDs []string

	// CRM Phase 6: Leads
	CrmLeadIDs []string

	// CRM Phase 7: Account Management
	CrmInteractionIDs  []string
	CrmRelationshipIDs []string

	// CRM Phase 8: Customer Service
	CrmSLAIDs        []string
	CrmEscalationIDs []string
	CrmCaseIDs       []string
	CrmKBArticleIDs  []string
	CrmSurveyIDs     []string

	// CRM Phase 9: Field Service
	CrmTechnicianIDs      []string
	CrmServiceContractIDs []string
	CrmServiceOrderIDs    []string
	CrmServiceScheduleIDs []string
}

// PRJStore holds generated IDs for PRJ module
type PRJStore struct {
	// PRJ Phase 1: Foundation
	PrjProjectTemplateIDs []string
	PrjExpenseCategoryIDs []string
	PrjExpensePolicyIDs   []string
	PrjApprovalRuleIDs    []string

	// PRJ Phase 2: Projects (with embedded phases, tasks, milestones, deliverables, dependencies, risks, issues, budget variances, earned values, resource forecasts)
	PrjProjectIDs []string
	PrjPhaseIDs   []string // extracted for cross-ref by Allocation, ProjectBudget, BudgetVariance, TimesheetEntry
	PrjTaskIDs    []string // extracted for cross-ref by Allocation, Deliverable, Dependency, TimesheetEntry, ExpenseEntry, ProjectIssue, InvoiceLine
	PrjMilestoneIDs []string // extracted for cross-ref by Deliverable, BillingMilestone
	PrjRiskIDs      []string // extracted for cross-ref by ProjectIssue

	// PRJ Phase 3: Resources (with embedded skills)
	PrjResourcePoolIDs []string
	PrjResourceIDs     []string
	PrjCapacityPlanIDs []string

	// PRJ Phase 4: Resource Management
	PrjAllocationIDs  []string
	PrjBookingIDs     []string
	PrjUtilizationIDs []string
	PrjBillingRateIDs []string

	// PRJ Phase 5: Time & Expense (with embedded entries)
	PrjTimesheetIDs      []string
	PrjTimesheetEntryIDs []string // extracted for cross-ref by InvoiceLine
	PrjExpenseReportIDs  []string
	PrjExpenseEntryIDs   []string // extracted for cross-ref by InvoiceLine

	// PRJ Phase 6: Billing (with embedded milestones, lines)
	PrjBillingScheduleIDs    []string
	PrjBillingMilestoneIDs   []string // extracted for cross-ref by InvoiceLine
	PrjProjectInvoiceIDs     []string
	PrjRevenueRecognitionIDs []string
	PrjProjectBudgetIDs      []string

	// PRJ Phase 7: Analytics
	PrjStatusReportIDs  []string
	PrjPortfolioViewIDs []string
	PrjProjectKPIIDs    []string
}
