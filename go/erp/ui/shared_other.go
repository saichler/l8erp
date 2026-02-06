package main

import (
	"github.com/saichler/l8erp/go/types/bi"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8erp/go/types/doc"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8types/go/ifs"
)

func registerBiTypes(resources ifs.IResources) {
	// Reporting
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiReport{}, "ReportId")
	resources.Registry().Register(&bi.BiReportList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiReportTemplate{}, "TemplateId")
	resources.Registry().Register(&bi.BiReportTemplateList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiReportSchedule{}, "ScheduleId")
	resources.Registry().Register(&bi.BiReportScheduleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiReportExecution{}, "ExecutionId")
	resources.Registry().Register(&bi.BiReportExecutionList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiReportAccess{}, "AccessId")
	resources.Registry().Register(&bi.BiReportAccessList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiReportSubscription{}, "SubscriptionId")
	resources.Registry().Register(&bi.BiReportSubscriptionList{})

	// Dashboards
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiDashboard{}, "DashboardId")
	resources.Registry().Register(&bi.BiDashboardList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiDashboardWidget{}, "WidgetId")
	resources.Registry().Register(&bi.BiDashboardWidgetList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiKPI{}, "KpiId")
	resources.Registry().Register(&bi.BiKPIList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiKPIThreshold{}, "ThresholdId")
	resources.Registry().Register(&bi.BiKPIThresholdList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiDrilldown{}, "DrilldownId")
	resources.Registry().Register(&bi.BiDrilldownList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiDashboardShare{}, "ShareId")
	resources.Registry().Register(&bi.BiDashboardShareList{})

	// Analytics
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiDataCube{}, "CubeId")
	resources.Registry().Register(&bi.BiDataCubeList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiAnalysisModel{}, "ModelId")
	resources.Registry().Register(&bi.BiAnalysisModelList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiPrediction{}, "PredictionId")
	resources.Registry().Register(&bi.BiPredictionList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiTrendAnalysis{}, "AnalysisId")
	resources.Registry().Register(&bi.BiTrendAnalysisList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiScenario{}, "ScenarioId")
	resources.Registry().Register(&bi.BiScenarioList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiBenchmark{}, "BenchmarkId")
	resources.Registry().Register(&bi.BiBenchmarkList{})

	// Data Management
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiDataSource{}, "SourceId")
	resources.Registry().Register(&bi.BiDataSourceList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiETLJob{}, "JobId")
	resources.Registry().Register(&bi.BiETLJobList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiETLSchedule{}, "ScheduleId")
	resources.Registry().Register(&bi.BiETLScheduleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiDataQualityRule{}, "RuleId")
	resources.Registry().Register(&bi.BiDataQualityRuleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiMasterDataConfig{}, "ConfigId")
	resources.Registry().Register(&bi.BiMasterDataConfigList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&bi.BiDataGovernance{}, "GovernanceId")
	resources.Registry().Register(&bi.BiDataGovernanceList{})
}

func registerDocTypes(resources ifs.IResources) {
	// Storage
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocDocument{}, "DocumentId")
	resources.Registry().Register(&doc.DocDocumentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocFolder{}, "FolderId")
	resources.Registry().Register(&doc.DocFolderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocCategory{}, "CategoryId")
	resources.Registry().Register(&doc.DocCategoryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocTag{}, "TagId")
	resources.Registry().Register(&doc.DocTagList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocDocumentVersion{}, "VersionId")
	resources.Registry().Register(&doc.DocDocumentVersionList{})

	// Workflow
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocCheckout{}, "CheckoutId")
	resources.Registry().Register(&doc.DocCheckoutList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocApprovalWorkflow{}, "WorkflowId")
	resources.Registry().Register(&doc.DocApprovalWorkflowList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocWorkflowStep{}, "StepId")
	resources.Registry().Register(&doc.DocWorkflowStepList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocSignature{}, "SignatureId")
	resources.Registry().Register(&doc.DocSignatureList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocReviewComment{}, "CommentId")
	resources.Registry().Register(&doc.DocReviewCommentList{})

	// Integration
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocAttachment{}, "AttachmentId")
	resources.Registry().Register(&doc.DocAttachmentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocTemplate{}, "TemplateId")
	resources.Registry().Register(&doc.DocTemplateList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocTemplateField{}, "FieldId")
	resources.Registry().Register(&doc.DocTemplateFieldList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocEmailCapture{}, "CaptureId")
	resources.Registry().Register(&doc.DocEmailCaptureList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocScanJob{}, "ScanJobId")
	resources.Registry().Register(&doc.DocScanJobList{})

	// Compliance
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocRetentionPolicy{}, "PolicyId")
	resources.Registry().Register(&doc.DocRetentionPolicyList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocLegalHold{}, "HoldId")
	resources.Registry().Register(&doc.DocLegalHoldList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocAccessLog{}, "LogId")
	resources.Registry().Register(&doc.DocAccessLogList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocArchiveJob{}, "JobId")
	resources.Registry().Register(&doc.DocArchiveJobList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&doc.DocAuditTrail{}, "TrailId")
	resources.Registry().Register(&doc.DocAuditTrailList{})
}

func registerEcomTypes(resources ifs.IResources) {
	// Catalog
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomProduct{}, "ProductId")
	resources.Registry().Register(&ecom.EcomProductList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomCategory{}, "CategoryId")
	resources.Registry().Register(&ecom.EcomCategoryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomAttribute{}, "AttributeId")
	resources.Registry().Register(&ecom.EcomAttributeList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomImage{}, "ImageId")
	resources.Registry().Register(&ecom.EcomImageList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomVariant{}, "VariantId")
	resources.Registry().Register(&ecom.EcomVariantList{})

	// Orders
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomOrder{}, "OrderId")
	resources.Registry().Register(&ecom.EcomOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomOrderLine{}, "LineId")
	resources.Registry().Register(&ecom.EcomOrderLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomOrderStatusHistory{}, "StatusId")
	resources.Registry().Register(&ecom.EcomOrderStatusHistoryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomReturn{}, "ReturnId")
	resources.Registry().Register(&ecom.EcomReturnList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomReturnLine{}, "LineId")
	resources.Registry().Register(&ecom.EcomReturnLineList{})

	// Customers
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomCustomer{}, "CustomerId")
	resources.Registry().Register(&ecom.EcomCustomerList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomCustomerAddress{}, "AddressId")
	resources.Registry().Register(&ecom.EcomCustomerAddressList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomWishlist{}, "WishlistId")
	resources.Registry().Register(&ecom.EcomWishlistList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomWishlistItem{}, "ItemId")
	resources.Registry().Register(&ecom.EcomWishlistItemList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomCart{}, "CartId")
	resources.Registry().Register(&ecom.EcomCartList{})

	// Promotions
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomPromotion{}, "PromotionId")
	resources.Registry().Register(&ecom.EcomPromotionList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomCoupon{}, "CouponId")
	resources.Registry().Register(&ecom.EcomCouponList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomPriceRule{}, "RuleId")
	resources.Registry().Register(&ecom.EcomPriceRuleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomShippingMethod{}, "MethodId")
	resources.Registry().Register(&ecom.EcomShippingMethodList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&ecom.EcomPaymentMethod{}, "MethodId")
	resources.Registry().Register(&ecom.EcomPaymentMethodList{})
}

func registerCompTypes(resources ifs.IResources) {
	// Regulatory
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompRegulation{}, "RegulationId")
	resources.Registry().Register(&comp.CompRegulationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompRequirement{}, "RequirementId")
	resources.Registry().Register(&comp.CompRequirementList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompComplianceStatus{}, "StatusId")
	resources.Registry().Register(&comp.CompComplianceStatusList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompCertification{}, "CertificationId")
	resources.Registry().Register(&comp.CompCertificationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompViolationRecord{}, "ViolationId")
	resources.Registry().Register(&comp.CompViolationRecordList{})

	// Internal Controls
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompControl{}, "ControlId")
	resources.Registry().Register(&comp.CompControlList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompControlAssessment{}, "AssessmentId")
	resources.Registry().Register(&comp.CompControlAssessmentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompPolicyDocument{}, "PolicyId")
	resources.Registry().Register(&comp.CompPolicyDocumentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompApprovalMatrix{}, "MatrixId")
	resources.Registry().Register(&comp.CompApprovalMatrixList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompSegregationRule{}, "RuleId")
	resources.Registry().Register(&comp.CompSegregationRuleList{})

	// Risk Management
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompRiskRegister{}, "RiskId")
	resources.Registry().Register(&comp.CompRiskRegisterList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompRiskAssessment{}, "AssessmentId")
	resources.Registry().Register(&comp.CompRiskAssessmentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompIncident{}, "IncidentId")
	resources.Registry().Register(&comp.CompIncidentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompMitigationPlan{}, "PlanId")
	resources.Registry().Register(&comp.CompMitigationPlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompInsurancePolicy{}, "PolicyId")
	resources.Registry().Register(&comp.CompInsurancePolicyList{})

	// Audit Management
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompAuditSchedule{}, "ScheduleId")
	resources.Registry().Register(&comp.CompAuditScheduleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompAuditFinding{}, "FindingId")
	resources.Registry().Register(&comp.CompAuditFindingList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompRemediationAction{}, "ActionId")
	resources.Registry().Register(&comp.CompRemediationActionList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompAuditReport{}, "ReportId")
	resources.Registry().Register(&comp.CompAuditReportList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&comp.CompComplianceReport{}, "ReportId")
	resources.Registry().Register(&comp.CompComplianceReportList{})
}
