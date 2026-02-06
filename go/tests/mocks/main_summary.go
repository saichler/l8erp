/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package main

import "fmt"

// printSummary prints the final summary of all generated mock data
func printSummary(store *MockDataStore) {
	fmt.Printf("\n=======================\n")
	fmt.Printf("Mock data generation complete!\n")

	printHCMSummary(store)
	printFINSummary(store)
	printSCMSummary(store)
	printSalesSummary(store)
	printMFGSummary(store)
	printCRMSummary(store)
	printPRJSummary(store)
	printBISummary(store)
	printDOCSummary(store)
	printECOMSummary(store)
	printCOMPSummary(store)
}

func printHCMSummary(store *MockDataStore) {
	fmt.Printf("\nHCM Summary:\n")
	fmt.Printf("  - Job Families: %d\n", len(store.JobFamilyIDs))
	fmt.Printf("  - Organizations: %d\n", len(store.OrganizationIDs))
	fmt.Printf("  - Departments: %d\n", len(store.DepartmentIDs))
	fmt.Printf("  - Positions: %d\n", len(store.PositionIDs))
	fmt.Printf("  - Employees: %d\n", len(store.EmployeeIDs))
	fmt.Printf("  - Courses: %d\n", len(store.CourseIDs))
	fmt.Printf("  - Payroll Runs: %d\n", len(store.PayrollRunIDs))
	fmt.Printf("  - Payslips: %d\n", len(store.PayslipIDs))
	fmt.Printf("  - Job Requisitions: %d\n", len(store.JobRequisitionIDs))
	fmt.Printf("  - Applicants: %d\n", len(store.ApplicantIDs))
}

func printFINSummary(store *MockDataStore) {
	fmt.Printf("\nFIN Summary:\n")
	fmt.Printf("  - Currencies: %d\n", len(store.CurrencyIDs))
	fmt.Printf("  - Fiscal Years: %d\n", len(store.FiscalYearIDs))
	fmt.Printf("  - Accounts: %d\n", len(store.AccountIDs))
	fmt.Printf("  - Vendors: %d\n", len(store.VendorIDs))
	fmt.Printf("  - Customers: %d\n", len(store.CustomerIDs))
	fmt.Printf("  - Bank Accounts: %d\n", len(store.BankAccountIDs))
	fmt.Printf("  - Budgets: %d\n", len(store.BudgetIDs))
	fmt.Printf("  - Purchase Invoices: %d\n", len(store.PurchaseInvoiceIDs))
	fmt.Printf("  - Sales Invoices: %d\n", len(store.SalesInvoiceIDs))
	fmt.Printf("  - Journal Entries: %d\n", len(store.JournalEntryIDs))
	fmt.Printf("  - Assets: %d\n", len(store.AssetIDs))
	fmt.Printf("  - Tax Returns: %d\n", len(store.TaxReturnIDs))
}

func printSCMSummary(store *MockDataStore) {
	fmt.Printf("\nSCM Summary:\n")
	fmt.Printf("  - Item Categories: %d\n", len(store.ItemCategoryIDs))
	fmt.Printf("  - Warehouses: %d\n", len(store.SCMWarehouseIDs))
	fmt.Printf("  - Items: %d\n", len(store.ItemIDs))
	fmt.Printf("  - Purchase Requisitions: %d\n", len(store.PurchaseRequisitionIDs))
	fmt.Printf("  - Purchase Orders: %d\n", len(store.SCMPurchaseOrderIDs))
	fmt.Printf("  - Receiving Orders: %d\n", len(store.ReceivingOrderIDs))
	fmt.Printf("  - Stock Movements: %d\n", len(store.StockMovementIDs))
	fmt.Printf("  - Shipments: %d\n", len(store.ShipmentIDs))
	fmt.Printf("  - Demand Forecasts: %d\n", len(store.DemandForecastIDs))
	fmt.Printf("  - Supply Plans: %d\n", len(store.SupplyPlanIDs))
	fmt.Printf("  - Safety Stocks: %d\n", len(store.SafetyStockIDs))
	fmt.Printf("  - Lead Times: %d\n", len(store.LeadTimeIDs))
}

func printSalesSummary(store *MockDataStore) {
	fmt.Printf("\nSales Summary:\n")
	fmt.Printf("  - Territories: %d\n", len(store.SalesTerritoryIDs))
	fmt.Printf("  - Price Lists: %d\n", len(store.SalesPriceListIDs))
	fmt.Printf("  - Channel Partners: %d\n", len(store.SalesPartnerChannelIDs))
	fmt.Printf("  - Customer Contracts: %d\n", len(store.SalesCustomerContractIDs))
	fmt.Printf("  - Quotations: %d\n", len(store.SalesQuotationIDs))
	fmt.Printf("  - Sales Orders: %d\n", len(store.SalesOrderIDs))
	fmt.Printf("  - Sales Returns: %d\n", len(store.SalesReturnOrderIDs))
	fmt.Printf("  - Delivery Orders: %d\n", len(store.SalesDeliveryOrderIDs))
	fmt.Printf("  - Billing Schedules: %d\n", len(store.SalesBillingScheduleIDs))
	fmt.Printf("  - Commission Plans: %d\n", len(store.SalesCommissionPlanIDs))
	fmt.Printf("  - Sales Targets: %d\n", len(store.SalesTargetIDs))
	fmt.Printf("  - Sales Forecasts: %d\n", len(store.SalesForecastIDs))
}

func printMFGSummary(store *MockDataStore) {
	fmt.Printf("\nMFG Summary:\n")
	fmt.Printf("  - Work Centers: %d\n", len(store.MfgWorkCenterIDs))
	fmt.Printf("  - BOMs: %d\n", len(store.MfgBomIDs))
	fmt.Printf("  - Routings: %d\n", len(store.MfgRoutingIDs))
	fmt.Printf("  - Engineering Change Orders: %d\n", len(store.MfgEngChangeOrderIDs))
	fmt.Printf("  - Work Orders: %d\n", len(store.MfgWorkOrderIDs))
	fmt.Printf("  - Production Orders: %d\n", len(store.MfgProductionOrderIDs))
	fmt.Printf("  - Production Batches: %d\n", len(store.MfgProdBatchIDs))
	fmt.Printf("  - Quality Plans: %d\n", len(store.MfgQualityPlanIDs))
	fmt.Printf("  - Quality Inspections: %d\n", len(store.MfgQualityInspectionIDs))
	fmt.Printf("  - NCRs: %d\n", len(store.MfgNCRIDs))
	fmt.Printf("  - MRP Runs: %d\n", len(store.MfgMrpRunIDs))
	fmt.Printf("  - Capacity Plans: %d\n", len(store.MfgCapacityPlanIDs))
	fmt.Printf("  - Standard Costs: %d\n", len(store.MfgStandardCostIDs))
	fmt.Printf("  - Overheads: %d\n", len(store.MfgOverheadIDs))
}

func printCRMSummary(store *MockDataStore) {
	fmt.Printf("\nCRM Summary:\n")
	fmt.Printf("  - Lead Sources: %d\n", len(store.CrmLeadSourceIDs))
	fmt.Printf("  - Leads: %d\n", len(store.CrmLeadIDs))
	fmt.Printf("  - Accounts: %d\n", len(store.CrmAccountIDs))
	fmt.Printf("  - Contacts: %d\n", len(store.CrmContactIDs))
	fmt.Printf("  - Opportunities: %d\n", len(store.CrmOpportunityIDs))
	fmt.Printf("  - Campaigns: %d\n", len(store.CrmCampaignIDs))
	fmt.Printf("  - Cases: %d\n", len(store.CrmCaseIDs))
	fmt.Printf("  - KB Articles: %d\n", len(store.CrmKBArticleIDs))
	fmt.Printf("  - Technicians: %d\n", len(store.CrmTechnicianIDs))
	fmt.Printf("  - Service Contracts: %d\n", len(store.CrmServiceContractIDs))
	fmt.Printf("  - Service Orders: %d\n", len(store.CrmServiceOrderIDs))
	fmt.Printf("  - Surveys: %d\n", len(store.CrmSurveyIDs))
}

func printPRJSummary(store *MockDataStore) {
	fmt.Printf("\nPRJ Summary:\n")
	fmt.Printf("  - Project Templates: %d\n", len(store.PrjProjectTemplateIDs))
	fmt.Printf("  - Projects: %d\n", len(store.PrjProjectIDs))
	fmt.Printf("  - Phases: %d\n", len(store.PrjPhaseIDs))
	fmt.Printf("  - Tasks: %d\n", len(store.PrjTaskIDs))
	fmt.Printf("  - Milestones: %d\n", len(store.PrjMilestoneIDs))
	fmt.Printf("  - Resources: %d\n", len(store.PrjResourceIDs))
	fmt.Printf("  - Timesheets: %d\n", len(store.PrjTimesheetIDs))
	fmt.Printf("  - Expense Reports: %d\n", len(store.PrjExpenseReportIDs))
	fmt.Printf("  - Project Invoices: %d\n", len(store.PrjProjectInvoiceIDs))
	fmt.Printf("  - Project Budgets: %d\n", len(store.PrjProjectBudgetIDs))
	fmt.Printf("  - Status Reports: %d\n", len(store.PrjStatusReportIDs))
	fmt.Printf("  - Project Issues: %d\n", len(store.PrjProjectIssueIDs))
}

func printBISummary(store *MockDataStore) {
	fmt.Printf("\nBI Summary:\n")
	fmt.Printf("  - Reports: %d\n", len(store.BiReportIDs))
	fmt.Printf("  - Report Templates: %d\n", len(store.BiReportTemplateIDs))
	fmt.Printf("  - Dashboards: %d\n", len(store.BiDashboardIDs))
	fmt.Printf("  - Dashboard Widgets: %d\n", len(store.BiDashboardWidgetIDs))
	fmt.Printf("  - KPIs: %d\n", len(store.BiKPIIDs))
	fmt.Printf("  - Data Cubes: %d\n", len(store.BiDataCubeIDs))
	fmt.Printf("  - Analysis Models: %d\n", len(store.BiAnalysisModelIDs))
	fmt.Printf("  - Predictions: %d\n", len(store.BiPredictionIDs))
	fmt.Printf("  - Data Sources: %d\n", len(store.BiDataSourceIDs))
	fmt.Printf("  - ETL Jobs: %d\n", len(store.BiETLJobIDs))
	fmt.Printf("  - Data Quality Rules: %d\n", len(store.BiDataQualityRuleIDs))
	fmt.Printf("  - Data Governance: %d\n", len(store.BiDataGovernanceIDs))
}

func printDOCSummary(store *MockDataStore) {
	fmt.Printf("\nDOC Summary:\n")
	fmt.Printf("  - Folders: %d\n", len(store.DocFolderIDs))
	fmt.Printf("  - Categories: %d\n", len(store.DocCategoryIDs))
	fmt.Printf("  - Tags: %d\n", len(store.DocTagIDs))
	fmt.Printf("  - Documents: %d\n", len(store.DocDocumentIDs))
	fmt.Printf("  - Document Versions: %d\n", len(store.DocVersionIDs))
	fmt.Printf("  - Checkouts: %d\n", len(store.DocCheckoutIDs))
	fmt.Printf("  - Approval Workflows: %d\n", len(store.DocApprovalWorkflowIDs))
	fmt.Printf("  - Workflow Steps: %d\n", len(store.DocWorkflowStepIDs))
	fmt.Printf("  - Signatures: %d\n", len(store.DocSignatureIDs))
	fmt.Printf("  - Review Comments: %d\n", len(store.DocReviewCommentIDs))
	fmt.Printf("  - Attachments: %d\n", len(store.DocAttachmentIDs))
	fmt.Printf("  - Templates: %d\n", len(store.DocTemplateIDs))
	fmt.Printf("  - Template Fields: %d\n", len(store.DocTemplateFieldIDs))
	fmt.Printf("  - Email Captures: %d\n", len(store.DocEmailCaptureIDs))
	fmt.Printf("  - Scan Jobs: %d\n", len(store.DocScanJobIDs))
	fmt.Printf("  - Retention Policies: %d\n", len(store.DocRetentionPolicyIDs))
	fmt.Printf("  - Legal Holds: %d\n", len(store.DocLegalHoldIDs))
	fmt.Printf("  - Access Logs: %d\n", len(store.DocAccessLogIDs))
	fmt.Printf("  - Archive Jobs: %d\n", len(store.DocArchiveJobIDs))
	fmt.Printf("  - Audit Trails: %d\n", len(store.DocAuditTrailIDs))
}

func printECOMSummary(store *MockDataStore) {
	fmt.Printf("\nECOM Summary:\n")
	fmt.Printf("  - Categories: %d\n", len(store.EcomCategoryIDs))
	fmt.Printf("  - Attributes: %d\n", len(store.EcomAttributeIDs))
	fmt.Printf("  - Products: %d\n", len(store.EcomProductIDs))
	fmt.Printf("  - Product Images: %d\n", len(store.EcomImageIDs))
	fmt.Printf("  - Product Variants: %d\n", len(store.EcomVariantIDs))
	fmt.Printf("  - Customers: %d\n", len(store.EcomCustomerIDs))
	fmt.Printf("  - Customer Addresses: %d\n", len(store.EcomAddressIDs))
	fmt.Printf("  - Wishlists: %d\n", len(store.EcomWishlistIDs))
	fmt.Printf("  - Shopping Carts: %d\n", len(store.EcomCartIDs))
	fmt.Printf("  - Promotions: %d\n", len(store.EcomPromotionIDs))
	fmt.Printf("  - Coupons: %d\n", len(store.EcomCouponIDs))
	fmt.Printf("  - Price Rules: %d\n", len(store.EcomPriceRuleIDs))
	fmt.Printf("  - Shipping Methods: %d\n", len(store.EcomShippingIDs))
	fmt.Printf("  - Payment Methods: %d\n", len(store.EcomPaymentIDs))
	fmt.Printf("  - Orders: %d\n", len(store.EcomOrderIDs))
	fmt.Printf("  - Order Lines: %d\n", len(store.EcomOrderLineIDs))
	fmt.Printf("  - Returns: %d\n", len(store.EcomReturnIDs))
}

func printCOMPSummary(store *MockDataStore) {
	fmt.Printf("\nCOMP Summary:\n")
	fmt.Printf("  - Regulations: %d\n", len(store.CompRegulationIDs))
	fmt.Printf("  - Controls: %d\n", len(store.CompControlIDs))
	fmt.Printf("  - Policy Documents: %d\n", len(store.CompPolicyDocumentIDs))
	fmt.Printf("  - Insurance Policies: %d\n", len(store.CompInsurancePolicyIDs))
	fmt.Printf("  - Requirements: %d\n", len(store.CompRequirementIDs))
	fmt.Printf("  - Approval Matrices: %d\n", len(store.CompApprovalMatrixIDs))
	fmt.Printf("  - Segregation Rules: %d\n", len(store.CompSegregationRuleIDs))
	fmt.Printf("  - Risk Registers: %d\n", len(store.CompRiskRegisterIDs))
	fmt.Printf("  - Audit Schedules: %d\n", len(store.CompAuditScheduleIDs))
	fmt.Printf("  - Compliance Statuses: %d\n", len(store.CompComplianceStatusIDs))
	fmt.Printf("  - Control Assessments: %d\n", len(store.CompControlAssessmentIDs))
	fmt.Printf("  - Certifications: %d\n", len(store.CompCertificationIDs))
	fmt.Printf("  - Risk Assessments: %d\n", len(store.CompRiskAssessmentIDs))
	fmt.Printf("  - Mitigation Plans: %d\n", len(store.CompMitigationPlanIDs))
	fmt.Printf("  - Violation Records: %d\n", len(store.CompViolationRecordIDs))
	fmt.Printf("  - Incidents: %d\n", len(store.CompIncidentIDs))
	fmt.Printf("  - Audit Findings: %d\n", len(store.CompAuditFindingIDs))
	fmt.Printf("  - Remediation Actions: %d\n", len(store.CompRemediationActionIDs))
	fmt.Printf("  - Audit Reports: %d\n", len(store.CompAuditReportIDs))
	fmt.Printf("  - Compliance Reports: %d\n", len(store.CompComplianceReportIDs))
}
