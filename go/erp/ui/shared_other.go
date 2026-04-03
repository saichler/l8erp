package ui

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/bi"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8erp/go/types/doc"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8erp/go/types/sys"
	l8events "github.com/saichler/l8events/go/types/l8events"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8types/go/types/l8api"
)

func registerBiTypes(resources ifs.IResources) {
	// Reporting
	common.RegisterType(resources, &bi.BiReport{}, &bi.BiReportList{}, "ReportId")
	common.RegisterType(resources, &bi.BiReportTemplate{}, &bi.BiReportTemplateList{}, "TemplateId")

	// Dashboards
	common.RegisterType(resources, &bi.BiDashboard{}, &bi.BiDashboardList{}, "DashboardId")
	common.RegisterType(resources, &bi.BiKPI{}, &bi.BiKPIList{}, "KpiId")

	// Analytics
	common.RegisterType(resources, &bi.BiDataCube{}, &bi.BiDataCubeList{}, "CubeId")
	common.RegisterType(resources, &bi.BiAnalysisModel{}, &bi.BiAnalysisModelList{}, "ModelId")
	common.RegisterType(resources, &bi.BiTrendAnalysis{}, &bi.BiTrendAnalysisList{}, "AnalysisId")
	common.RegisterType(resources, &bi.BiScenario{}, &bi.BiScenarioList{}, "ScenarioId")
	common.RegisterType(resources, &bi.BiBenchmark{}, &bi.BiBenchmarkList{}, "BenchmarkId")

	// Data Management
	common.RegisterType(resources, &bi.BiDataSource{}, &bi.BiDataSourceList{}, "SourceId")
	common.RegisterType(resources, &bi.BiETLJob{}, &bi.BiETLJobList{}, "JobId")
	common.RegisterType(resources, &bi.BiDataQualityRule{}, &bi.BiDataQualityRuleList{}, "RuleId")
	common.RegisterType(resources, &bi.BiMasterDataConfig{}, &bi.BiMasterDataConfigList{}, "ConfigId")
	common.RegisterType(resources, &bi.BiDataGovernance{}, &bi.BiDataGovernanceList{}, "GovernanceId")
}

func registerDocTypes(resources ifs.IResources) {
	// Storage
	common.RegisterType(resources, &doc.DocDocument{}, &doc.DocDocumentList{}, "DocumentId")
	common.RegisterType(resources, &doc.DocFolder{}, &doc.DocFolderList{}, "FolderId")
	common.RegisterType(resources, &doc.DocCategory{}, &doc.DocCategoryList{}, "CategoryId")
	common.RegisterType(resources, &doc.DocTag{}, &doc.DocTagList{}, "TagId")

	// Workflow
	common.RegisterType(resources, &doc.DocApprovalWorkflow{}, &doc.DocApprovalWorkflowList{}, "WorkflowId")

	// Integration
	common.RegisterType(resources, &doc.DocTemplate{}, &doc.DocTemplateList{}, "TemplateId")
	common.RegisterType(resources, &doc.DocEmailCapture{}, &doc.DocEmailCaptureList{}, "CaptureId")
	common.RegisterType(resources, &doc.DocScanJob{}, &doc.DocScanJobList{}, "ScanJobId")

	// Compliance
	common.RegisterType(resources, &doc.DocRetentionPolicy{}, &doc.DocRetentionPolicyList{}, "PolicyId")
	common.RegisterType(resources, &doc.DocLegalHold{}, &doc.DocLegalHoldList{}, "HoldId")
	common.RegisterType(resources, &doc.DocArchiveJob{}, &doc.DocArchiveJobList{}, "JobId")
}

func registerEcomTypes(resources ifs.IResources) {
	// Catalog
	common.RegisterType(resources, &ecom.EcomProduct{}, &ecom.EcomProductList{}, "ProductId")
	common.RegisterType(resources, &ecom.EcomCategory{}, &ecom.EcomCategoryList{}, "CategoryId")
	common.RegisterType(resources, &ecom.EcomAttribute{}, &ecom.EcomAttributeList{}, "AttributeId")

	// Orders
	common.RegisterType(resources, &ecom.EcomOrder{}, &ecom.EcomOrderList{}, "OrderId")
	common.RegisterType(resources, &ecom.EcomReturn{}, &ecom.EcomReturnList{}, "ReturnId")

	// Customers
	common.RegisterType(resources, &ecom.EcomCustomer{}, &ecom.EcomCustomerList{}, "CustomerId")
	common.RegisterType(resources, &ecom.EcomWishlist{}, &ecom.EcomWishlistList{}, "WishlistId")
	common.RegisterType(resources, &ecom.EcomCart{}, &ecom.EcomCartList{}, "CartId")

	// Promotions
	common.RegisterType(resources, &ecom.EcomPromotion{}, &ecom.EcomPromotionList{}, "PromotionId")
	common.RegisterType(resources, &ecom.EcomCoupon{}, &ecom.EcomCouponList{}, "CouponId")
	common.RegisterType(resources, &ecom.EcomPriceRule{}, &ecom.EcomPriceRuleList{}, "RuleId")
	common.RegisterType(resources, &ecom.EcomShippingMethod{}, &ecom.EcomShippingMethodList{}, "MethodId")
	common.RegisterType(resources, &ecom.EcomPaymentMethod{}, &ecom.EcomPaymentMethodList{}, "MethodId")
}

func registerCompTypes(resources ifs.IResources) {
	// Regulatory
	common.RegisterType(resources, &comp.CompRegulation{}, &comp.CompRegulationList{}, "RegulationId")
	common.RegisterType(resources, &comp.CompCertification{}, &comp.CompCertificationList{}, "CertificationId")

	// Internal Controls
	common.RegisterType(resources, &comp.CompControl{}, &comp.CompControlList{}, "ControlId")
	common.RegisterType(resources, &comp.CompPolicyDocument{}, &comp.CompPolicyDocumentList{}, "PolicyId")
	common.RegisterType(resources, &comp.CompApprovalMatrix{}, &comp.CompApprovalMatrixList{}, "MatrixId")

	// Risk Management
	common.RegisterType(resources, &comp.CompRiskRegister{}, &comp.CompRiskRegisterList{}, "RiskId")
	common.RegisterType(resources, &comp.CompIncident{}, &comp.CompIncidentList{}, "IncidentId")
	common.RegisterType(resources, &comp.CompInsurancePolicy{}, &comp.CompInsurancePolicyList{}, "PolicyId")

	// Audit Management
	common.RegisterType(resources, &comp.CompAuditSchedule{}, &comp.CompAuditScheduleList{}, "ScheduleId")
	common.RegisterType(resources, &comp.CompAuditFinding{}, &comp.CompAuditFindingList{}, "FindingId")
	common.RegisterType(resources, &comp.CompComplianceReport{}, &comp.CompComplianceReportList{}, "ReportId")
}

func registerSysTypes(resources ifs.IResources) {
	common.RegisterType(resources, &sys.SysModuleConfig{}, &sys.SysModuleConfigList{}, "ConfigId")
	common.RegisterType(resources, &l8api.L8ImportTemplate{}, &l8api.L8ImportTemplateList{}, "TemplateId")
	common.RegisterType(resources, &l8events.EventRecord{}, &l8events.EventRecordList{}, "EventId")
}
