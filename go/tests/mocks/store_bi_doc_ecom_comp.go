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

	// BI Phase 2: Analytics
	BiDataCubeIDs      []string
	BiAnalysisModelIDs []string
	BiTrendAnalysisIDs []string
	BiScenarioIDs      []string
	BiBenchmarkIDs     []string

	// BI Phase 3: Data Management
	BiDataSourceIDs       []string
	BiETLJobIDs           []string
	BiDataQualityRuleIDs  []string
	BiMasterDataConfigIDs []string
	BiDataGovernanceIDs   []string
}

// DOCStore holds generated IDs for DOC module
type DOCStore struct {
	// DOC Phase 1: Compliance Foundation
	DocRetentionPolicyIDs []string

	// DOC Phase 2: Storage Foundation
	DocFolderIDs   []string
	DocCategoryIDs []string
	DocTagIDs      []string

	// DOC Phase 3: Documents (with embedded versions, checkouts, comments, signatures, attachments, access logs, audit trails)
	DocDocumentIDs []string

	// DOC Phase 4: Workflow (with embedded steps)
	DocApprovalWorkflowIDs []string

	// DOC Phase 5: Templates (with embedded fields), Email Captures, Scan Jobs
	DocTemplateIDs     []string
	DocEmailCaptureIDs []string
	DocScanJobIDs      []string

	// DOC Phase 6: Compliance
	DocLegalHoldIDs  []string
	DocArchiveJobIDs []string
}

// ECOMStore holds generated IDs for ECOM module
type ECOMStore struct {
	// ECOM Phase 1: Catalog Foundation
	EcomCategoryIDs  []string
	EcomAttributeIDs []string

	// ECOM Phase 2: Products (embeds: images, variants)
	EcomProductIDs []string

	// ECOM Phase 3: Customers (embeds: addresses, wishlist items)
	EcomCustomerIDs []string
	EcomWishlistIDs []string
	EcomCartIDs     []string

	// ECOM Phase 4: Promotions & Methods
	EcomPromotionIDs []string
	EcomCouponIDs    []string
	EcomPriceRuleIDs []string
	EcomShippingIDs  []string
	EcomPaymentIDs   []string

	// ECOM Phase 5: Orders (embeds: lines, status_history, return lines)
	EcomOrderIDs  []string
	EcomReturnIDs []string
}

// COMPStore holds generated IDs for COMP module
type COMPStore struct {
	// COMP Phase 1: Foundation
	CompRegulationIDs      []string // with embedded requirements (which embed violations, statuses)
	CompControlIDs         []string // with embedded assessments, segregation_rules
	CompPolicyDocumentIDs  []string
	CompInsurancePolicyIDs []string

	// COMP Phase 2: Core
	CompApprovalMatrixIDs []string
	CompRiskRegisterIDs   []string // with embedded assessments, mitigation_plans
	CompAuditScheduleIDs  []string // with embedded reports

	// COMP Phase 3: Events
	CompCertificationIDs []string
	CompIncidentIDs      []string
	CompAuditFindingIDs  []string // with embedded remediation actions

	// COMP Phase 4: Compliance Reports
	CompComplianceReportIDs []string
}
