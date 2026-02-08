package main

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
	common.RegisterType[bi.BiReportSchedule, bi.BiReportScheduleList](resources, "ScheduleId")
	common.RegisterType[bi.BiReportExecution, bi.BiReportExecutionList](resources, "ExecutionId")
	common.RegisterType[bi.BiReportAccess, bi.BiReportAccessList](resources, "AccessId")
	common.RegisterType[bi.BiReportSubscription, bi.BiReportSubscriptionList](resources, "SubscriptionId")

	// Dashboards
	common.RegisterType[bi.BiDashboard, bi.BiDashboardList](resources, "DashboardId")
	common.RegisterType[bi.BiDashboardWidget, bi.BiDashboardWidgetList](resources, "WidgetId")
	common.RegisterType[bi.BiKPI, bi.BiKPIList](resources, "KpiId")
	common.RegisterType[bi.BiKPIThreshold, bi.BiKPIThresholdList](resources, "ThresholdId")
	common.RegisterType[bi.BiDrilldown, bi.BiDrilldownList](resources, "DrilldownId")
	common.RegisterType[bi.BiDashboardShare, bi.BiDashboardShareList](resources, "ShareId")

	// Analytics
	common.RegisterType[bi.BiDataCube, bi.BiDataCubeList](resources, "CubeId")
	common.RegisterType[bi.BiAnalysisModel, bi.BiAnalysisModelList](resources, "ModelId")
	common.RegisterType[bi.BiPrediction, bi.BiPredictionList](resources, "PredictionId")
	common.RegisterType[bi.BiTrendAnalysis, bi.BiTrendAnalysisList](resources, "AnalysisId")
	common.RegisterType[bi.BiScenario, bi.BiScenarioList](resources, "ScenarioId")
	common.RegisterType[bi.BiBenchmark, bi.BiBenchmarkList](resources, "BenchmarkId")

	// Data Management
	common.RegisterType[bi.BiDataSource, bi.BiDataSourceList](resources, "SourceId")
	common.RegisterType[bi.BiETLJob, bi.BiETLJobList](resources, "JobId")
	common.RegisterType[bi.BiETLSchedule, bi.BiETLScheduleList](resources, "ScheduleId")
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
	common.RegisterType[doc.DocDocumentVersion, doc.DocDocumentVersionList](resources, "VersionId")

	// Workflow
	common.RegisterType[doc.DocCheckout, doc.DocCheckoutList](resources, "CheckoutId")
	common.RegisterType[doc.DocApprovalWorkflow, doc.DocApprovalWorkflowList](resources, "WorkflowId")
	common.RegisterType[doc.DocWorkflowStep, doc.DocWorkflowStepList](resources, "StepId")
	common.RegisterType[doc.DocSignature, doc.DocSignatureList](resources, "SignatureId")
	common.RegisterType[doc.DocReviewComment, doc.DocReviewCommentList](resources, "CommentId")

	// Integration
	common.RegisterType[doc.DocAttachment, doc.DocAttachmentList](resources, "AttachmentId")
	common.RegisterType[doc.DocTemplate, doc.DocTemplateList](resources, "TemplateId")
	common.RegisterType[doc.DocTemplateField, doc.DocTemplateFieldList](resources, "FieldId")
	common.RegisterType[doc.DocEmailCapture, doc.DocEmailCaptureList](resources, "CaptureId")
	common.RegisterType[doc.DocScanJob, doc.DocScanJobList](resources, "ScanJobId")

	// Compliance
	common.RegisterType[doc.DocRetentionPolicy, doc.DocRetentionPolicyList](resources, "PolicyId")
	common.RegisterType[doc.DocLegalHold, doc.DocLegalHoldList](resources, "HoldId")
	common.RegisterType[doc.DocAccessLog, doc.DocAccessLogList](resources, "LogId")
	common.RegisterType[doc.DocArchiveJob, doc.DocArchiveJobList](resources, "JobId")
	common.RegisterType[doc.DocAuditTrail, doc.DocAuditTrailList](resources, "TrailId")
}

func registerEcomTypes(resources ifs.IResources) {
	// Catalog
	common.RegisterType[ecom.EcomProduct, ecom.EcomProductList](resources, "ProductId")
	common.RegisterType[ecom.EcomCategory, ecom.EcomCategoryList](resources, "CategoryId")
	common.RegisterType[ecom.EcomAttribute, ecom.EcomAttributeList](resources, "AttributeId")
	common.RegisterType[ecom.EcomImage, ecom.EcomImageList](resources, "ImageId")
	common.RegisterType[ecom.EcomVariant, ecom.EcomVariantList](resources, "VariantId")

	// Orders
	common.RegisterType[ecom.EcomOrder, ecom.EcomOrderList](resources, "OrderId")
	common.RegisterType[ecom.EcomOrderLine, ecom.EcomOrderLineList](resources, "LineId")
	common.RegisterType[ecom.EcomOrderStatusHistory, ecom.EcomOrderStatusHistoryList](resources, "StatusId")
	common.RegisterType[ecom.EcomReturn, ecom.EcomReturnList](resources, "ReturnId")
	common.RegisterType[ecom.EcomReturnLine, ecom.EcomReturnLineList](resources, "LineId")

	// Customers
	common.RegisterType[ecom.EcomCustomer, ecom.EcomCustomerList](resources, "CustomerId")
	common.RegisterType[ecom.EcomCustomerAddress, ecom.EcomCustomerAddressList](resources, "AddressId")
	common.RegisterType[ecom.EcomWishlist, ecom.EcomWishlistList](resources, "WishlistId")
	common.RegisterType[ecom.EcomWishlistItem, ecom.EcomWishlistItemList](resources, "ItemId")
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
	common.RegisterType[comp.CompRequirement, comp.CompRequirementList](resources, "RequirementId")
	common.RegisterType[comp.CompComplianceStatus, comp.CompComplianceStatusList](resources, "StatusId")
	common.RegisterType[comp.CompCertification, comp.CompCertificationList](resources, "CertificationId")
	common.RegisterType[comp.CompViolationRecord, comp.CompViolationRecordList](resources, "ViolationId")

	// Internal Controls
	common.RegisterType[comp.CompControl, comp.CompControlList](resources, "ControlId")
	common.RegisterType[comp.CompControlAssessment, comp.CompControlAssessmentList](resources, "AssessmentId")
	common.RegisterType[comp.CompPolicyDocument, comp.CompPolicyDocumentList](resources, "PolicyId")
	common.RegisterType[comp.CompApprovalMatrix, comp.CompApprovalMatrixList](resources, "MatrixId")
	common.RegisterType[comp.CompSegregationRule, comp.CompSegregationRuleList](resources, "RuleId")

	// Risk Management
	common.RegisterType[comp.CompRiskRegister, comp.CompRiskRegisterList](resources, "RiskId")
	common.RegisterType[comp.CompRiskAssessment, comp.CompRiskAssessmentList](resources, "AssessmentId")
	common.RegisterType[comp.CompIncident, comp.CompIncidentList](resources, "IncidentId")
	common.RegisterType[comp.CompMitigationPlan, comp.CompMitigationPlanList](resources, "PlanId")
	common.RegisterType[comp.CompInsurancePolicy, comp.CompInsurancePolicyList](resources, "PolicyId")

	// Audit Management
	common.RegisterType[comp.CompAuditSchedule, comp.CompAuditScheduleList](resources, "ScheduleId")
	common.RegisterType[comp.CompAuditFinding, comp.CompAuditFindingList](resources, "FindingId")
	common.RegisterType[comp.CompRemediationAction, comp.CompRemediationActionList](resources, "ActionId")
	common.RegisterType[comp.CompAuditReport, comp.CompAuditReportList](resources, "ReportId")
	common.RegisterType[comp.CompComplianceReport, comp.CompComplianceReportList](resources, "ReportId")
}

func registerSysTypes(resources ifs.IResources) {
	common.RegisterType[sys.SysModuleConfig, sys.SysModuleConfigList](resources, "ConfigId")
}
