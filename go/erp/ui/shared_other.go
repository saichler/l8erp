package ui

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/bi"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8erp/go/types/doc"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8erp/go/types/sys"
	"github.com/saichler/l8types/go/ifs"
)

func registerBiTypes(resources ifs.IResources) {
	// Reporting
	common.RegisterType[bi.BiReport, bi.BiReportList](resources, "ReportId")
	common.RegisterType[bi.BiReportTemplate, bi.BiReportTemplateList](resources, "TemplateId")

	// Dashboards
	common.RegisterType[bi.BiDashboard, bi.BiDashboardList](resources, "DashboardId")
	common.RegisterType[bi.BiKPI, bi.BiKPIList](resources, "KpiId")

	// Analytics
	common.RegisterType[bi.BiDataCube, bi.BiDataCubeList](resources, "CubeId")
	common.RegisterType[bi.BiAnalysisModel, bi.BiAnalysisModelList](resources, "ModelId")
	common.RegisterType[bi.BiTrendAnalysis, bi.BiTrendAnalysisList](resources, "AnalysisId")
	common.RegisterType[bi.BiScenario, bi.BiScenarioList](resources, "ScenarioId")
	common.RegisterType[bi.BiBenchmark, bi.BiBenchmarkList](resources, "BenchmarkId")

	// Data Management
	common.RegisterType[bi.BiDataSource, bi.BiDataSourceList](resources, "SourceId")
	common.RegisterType[bi.BiETLJob, bi.BiETLJobList](resources, "JobId")
	common.RegisterType[bi.BiDataQualityRule, bi.BiDataQualityRuleList](resources, "RuleId")
	common.RegisterType[bi.BiMasterDataConfig, bi.BiMasterDataConfigList](resources, "ConfigId")
	common.RegisterType[bi.BiDataGovernance, bi.BiDataGovernanceList](resources, "GovernanceId")
}

func registerDocTypes(resources ifs.IResources) {
	// Storage
	common.RegisterType[doc.DocDocument, doc.DocDocumentList](resources, "DocumentId")
	common.RegisterType[doc.DocFolder, doc.DocFolderList](resources, "FolderId")
	common.RegisterType[doc.DocCategory, doc.DocCategoryList](resources, "CategoryId")
	common.RegisterType[doc.DocTag, doc.DocTagList](resources, "TagId")

	// Workflow
	common.RegisterType[doc.DocApprovalWorkflow, doc.DocApprovalWorkflowList](resources, "WorkflowId")

	// Integration
	common.RegisterType[doc.DocTemplate, doc.DocTemplateList](resources, "TemplateId")
	common.RegisterType[doc.DocEmailCapture, doc.DocEmailCaptureList](resources, "CaptureId")
	common.RegisterType[doc.DocScanJob, doc.DocScanJobList](resources, "ScanJobId")

	// Compliance
	common.RegisterType[doc.DocRetentionPolicy, doc.DocRetentionPolicyList](resources, "PolicyId")
	common.RegisterType[doc.DocLegalHold, doc.DocLegalHoldList](resources, "HoldId")
	common.RegisterType[doc.DocArchiveJob, doc.DocArchiveJobList](resources, "JobId")
}

func registerEcomTypes(resources ifs.IResources) {
	// Catalog
	common.RegisterType[ecom.EcomProduct, ecom.EcomProductList](resources, "ProductId")
	common.RegisterType[ecom.EcomCategory, ecom.EcomCategoryList](resources, "CategoryId")
	common.RegisterType[ecom.EcomAttribute, ecom.EcomAttributeList](resources, "AttributeId")

	// Orders
	common.RegisterType[ecom.EcomOrder, ecom.EcomOrderList](resources, "OrderId")
	common.RegisterType[ecom.EcomReturn, ecom.EcomReturnList](resources, "ReturnId")

	// Customers
	common.RegisterType[ecom.EcomCustomer, ecom.EcomCustomerList](resources, "CustomerId")
	common.RegisterType[ecom.EcomWishlist, ecom.EcomWishlistList](resources, "WishlistId")
	common.RegisterType[ecom.EcomCart, ecom.EcomCartList](resources, "CartId")

	// Promotions
	common.RegisterType[ecom.EcomPromotion, ecom.EcomPromotionList](resources, "PromotionId")
	common.RegisterType[ecom.EcomCoupon, ecom.EcomCouponList](resources, "CouponId")
	common.RegisterType[ecom.EcomPriceRule, ecom.EcomPriceRuleList](resources, "RuleId")
	common.RegisterType[ecom.EcomShippingMethod, ecom.EcomShippingMethodList](resources, "MethodId")
	common.RegisterType[ecom.EcomPaymentMethod, ecom.EcomPaymentMethodList](resources, "MethodId")
}

func registerCompTypes(resources ifs.IResources) {
	// Regulatory
	common.RegisterType[comp.CompRegulation, comp.CompRegulationList](resources, "RegulationId")
	common.RegisterType[comp.CompCertification, comp.CompCertificationList](resources, "CertificationId")

	// Internal Controls
	common.RegisterType[comp.CompControl, comp.CompControlList](resources, "ControlId")
	common.RegisterType[comp.CompPolicyDocument, comp.CompPolicyDocumentList](resources, "PolicyId")
	common.RegisterType[comp.CompApprovalMatrix, comp.CompApprovalMatrixList](resources, "MatrixId")

	// Risk Management
	common.RegisterType[comp.CompRiskRegister, comp.CompRiskRegisterList](resources, "RiskId")
	common.RegisterType[comp.CompIncident, comp.CompIncidentList](resources, "IncidentId")
	common.RegisterType[comp.CompInsurancePolicy, comp.CompInsurancePolicyList](resources, "PolicyId")

	// Audit Management
	common.RegisterType[comp.CompAuditSchedule, comp.CompAuditScheduleList](resources, "ScheduleId")
	common.RegisterType[comp.CompAuditFinding, comp.CompAuditFindingList](resources, "FindingId")
	common.RegisterType[comp.CompComplianceReport, comp.CompComplianceReportList](resources, "ReportId")
}

func registerSysTypes(resources ifs.IResources) {
	common.RegisterType[sys.SysModuleConfig, sys.SysModuleConfigList](resources, "ConfigId")
}
