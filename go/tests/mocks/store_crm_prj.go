/*
© 2025 Sharon Aicler (saichler@gmail.com)
CRM and PRJ module ID stores for mock data generation
*/
package main

// CRMStore holds generated IDs for CRM module
type CRMStore struct {
	// CRM Phase 1: Leads Foundation
	CrmLeadSourceIDs []string
	CrmLeadScoreIDs  []string
	CrmLeadAssignIDs []string

	// CRM Phase 2: Leads
	CrmLeadIDs           []string
	CrmLeadActivityIDs   []string
	CrmLeadConversionIDs []string

	// CRM Phase 3: Opportunities Foundation
	CrmOppStageIDs []string

	// CRM Phase 4: Opportunities
	CrmOpportunityIDs   []string
	CrmOppCompetitorIDs []string
	CrmOppProductIDs    []string
	CrmOppTeamIDs       []string
	CrmOppActivityIDs   []string

	// CRM Phase 5: Accounts
	CrmAccountIDs      []string
	CrmContactIDs      []string
	CrmInteractionIDs  []string
	CrmRelationshipIDs []string
	CrmHealthScoreIDs  []string
	CrmAccountPlanIDs  []string

	// CRM Phase 6: Marketing
	CrmCampaignIDs         []string
	CrmCampaignMemberIDs   []string
	CrmEmailTemplateIDs    []string
	CrmMarketingListIDs    []string
	CrmCampaignResponseIDs []string
	CrmCampaignROIIDs      []string

	// CRM Phase 7: Customer Service
	CrmSLAIDs         []string
	CrmEscalationIDs  []string
	CrmCaseIDs        []string
	CrmCaseCommentIDs []string
	CrmKBArticleIDs   []string
	CrmSurveyIDs      []string

	// CRM Phase 8: Field Service
	CrmTechnicianIDs      []string
	CrmServiceContractIDs []string
	CrmServiceOrderIDs    []string
	CrmServiceScheduleIDs []string
	CrmServicePartIDs     []string
	CrmServiceVisitIDs    []string
}

// PRJStore holds generated IDs for PRJ module
type PRJStore struct {
	// PRJ Phase 1: Foundation
	PrjProjectTemplateIDs []string
	PrjExpenseCategoryIDs []string
	PrjExpensePolicyIDs   []string
	PrjApprovalRuleIDs    []string

	// PRJ Phase 2: Projects & Phases
	PrjProjectIDs []string
	PrjPhaseIDs   []string

	// PRJ Phase 3: Resources
	PrjResourcePoolIDs  []string
	PrjResourceIDs      []string
	PrjResourceSkillIDs []string
	PrjCapacityPlanIDs  []string

	// PRJ Phase 4: Project Details
	PrjTaskIDs        []string
	PrjMilestoneIDs   []string
	PrjDeliverableIDs []string
	PrjDependencyIDs  []string
	PrjRiskIDs        []string

	// PRJ Phase 5: Resource Management
	PrjAllocationIDs  []string
	PrjBookingIDs     []string
	PrjUtilizationIDs []string
	PrjBillingRateIDs []string

	// PRJ Phase 6: Time & Expense
	PrjTimesheetIDs      []string
	PrjTimesheetEntryIDs []string
	PrjExpenseReportIDs  []string
	PrjExpenseEntryIDs   []string

	// PRJ Phase 7: Billing
	PrjBillingScheduleIDs    []string
	PrjBillingMilestoneIDs   []string
	PrjProjectInvoiceIDs     []string
	PrjInvoiceLineIDs        []string
	PrjRevenueRecognitionIDs []string
	PrjProjectBudgetIDs      []string

	// PRJ Phase 8: Analytics
	PrjStatusReportIDs     []string
	PrjEarnedValueIDs      []string
	PrjBudgetVarianceIDs   []string
	PrjResourceForecastIDs []string
	PrjPortfolioViewIDs    []string
	PrjProjectKPIIDs       []string
	PrjProjectIssueIDs     []string
}
