/*
© 2025 Sharon Aicler (saichler@gmail.com)
BI, DOC, ECOM, COMP module ID stores for mock data generation
*/
package mocks

// BIStore holds generated IDs for BI module
type BIStore struct {
	// BI Phase 1: Foundation (Reporting & Dashboards)
	BiReportIDs         []string
	BiReportTemplateIDs []string
	BiDashboardIDs      []string
	BiKPIIDs            []string

	// BI Phase 2: Report Management
	BiReportScheduleIDs     []string
	BiReportExecutionIDs    []string
	BiReportAccessIDs       []string
	BiReportSubscriptionIDs []string

	// BI Phase 3: Dashboard Management
	BiDashboardWidgetIDs []string
	BiKPIThresholdIDs    []string
	BiDrilldownIDs       []string
	BiDashboardShareIDs  []string

	// BI Phase 4: Analytics
	BiDataCubeIDs      []string
	BiAnalysisModelIDs []string
	BiPredictionIDs    []string
	BiTrendAnalysisIDs []string
	BiScenarioIDs      []string
	BiBenchmarkIDs     []string

	// BI Phase 5: Data Management
	BiDataSourceIDs       []string
	BiETLJobIDs           []string
	BiETLScheduleIDs      []string
	BiDataQualityRuleIDs  []string
	BiMasterDataConfigIDs []string
	BiDataGovernanceIDs   []string
}

// DOCStore holds generated IDs for DOC module
type DOCStore struct {
	// DOC Phase 1: Storage Foundation
	DocFolderIDs   []string
	DocCategoryIDs []string
	DocTagIDs      []string

	// DOC Phase 2: Documents & Versions
	DocDocumentIDs []string
	DocVersionIDs  []string

	// DOC Phase 3: Workflow
	DocCheckoutIDs         []string
	DocApprovalWorkflowIDs []string
	DocWorkflowStepIDs     []string
	DocSignatureIDs        []string
	DocReviewCommentIDs    []string

	// DOC Phase 4: Integration
	DocAttachmentIDs    []string
	DocTemplateIDs      []string
	DocTemplateFieldIDs []string
	DocEmailCaptureIDs  []string
	DocScanJobIDs       []string

	// DOC Phase 5: Compliance
	DocRetentionPolicyIDs []string
	DocLegalHoldIDs       []string
	DocAccessLogIDs       []string
	DocArchiveJobIDs      []string
	DocAuditTrailIDs      []string
}

// ECOMStore holds generated IDs for ECOM module
type ECOMStore struct {
	// ECOM Phase 1: Catalog Foundation
	EcomCategoryIDs  []string
	EcomAttributeIDs []string

	// ECOM Phase 2: Products
	EcomProductIDs []string
	EcomImageIDs   []string
	EcomVariantIDs []string

	// ECOM Phase 3: Customers
	EcomCustomerIDs []string
	EcomAddressIDs  []string
	EcomWishlistIDs []string
	EcomWishItemIDs []string
	EcomCartIDs     []string

	// ECOM Phase 4: Promotions & Methods
	EcomPromotionIDs []string
	EcomCouponIDs    []string
	EcomPriceRuleIDs []string
	EcomShippingIDs  []string
	EcomPaymentIDs   []string

	// ECOM Phase 5: Orders
	EcomOrderIDs       []string
	EcomOrderLineIDs   []string
	EcomOrderStatusIDs []string
	EcomReturnIDs      []string
	EcomReturnLineIDs  []string
}

// COMPStore holds generated IDs for COMP module
type COMPStore struct {
	// COMP Phase 1: Foundation (Configuration)
	CompRegulationIDs      []string
	CompControlIDs         []string
	CompPolicyDocumentIDs  []string
	CompInsurancePolicyIDs []string

	// COMP Phase 2: Core (Requirements, Matrices, Rules, Risks, Schedules)
	CompRequirementIDs     []string
	CompApprovalMatrixIDs  []string
	CompSegregationRuleIDs []string
	CompRiskRegisterIDs    []string
	CompAuditScheduleIDs   []string

	// COMP Phase 3: Assessments
	CompComplianceStatusIDs  []string
	CompControlAssessmentIDs []string
	CompCertificationIDs     []string
	CompRiskAssessmentIDs    []string
	CompMitigationPlanIDs    []string

	// COMP Phase 4: Events (Violations, Incidents, Findings)
	CompViolationRecordIDs []string
	CompIncidentIDs        []string
	CompAuditFindingIDs    []string

	// COMP Phase 5: Reports (Remediation, Audit Reports, Compliance Reports)
	CompRemediationActionIDs []string
	CompAuditReportIDs       []string
	CompComplianceReportIDs  []string
}
