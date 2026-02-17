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
package mocks

import "fmt"

// printSummary prints the final summary of all generated mock data
func PrintSummary(store *MockDataStore) {
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
}

func printSCMSummary(store *MockDataStore) {
	fmt.Printf("\nSCM Summary:\n")
	fmt.Printf("  - Item Categories: %d\n", len(store.ItemCategoryIDs))
	fmt.Printf("  - Warehouses: %d\n", len(store.SCMWarehouseIDs))
	fmt.Printf("  - Items: %d\n", len(store.ItemIDs))
	fmt.Printf("  - Purchase Requisitions: %d\n", len(store.PurchaseRequisitionIDs))
	fmt.Printf("  - Purchase Orders: %d\n", len(store.SCMPurchaseOrderIDs))
	fmt.Printf("  - Receiving Orders: %d\n", len(store.ReceivingOrderIDs))
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
	fmt.Printf("  - Projects (with phases/tasks/milestones/risks/issues/etc): %d\n", len(store.PrjProjectIDs))
	fmt.Printf("  - Resources (with skills): %d\n", len(store.PrjResourceIDs))
	fmt.Printf("  - Timesheets (with entries): %d\n", len(store.PrjTimesheetIDs))
	fmt.Printf("  - Expense Reports (with entries): %d\n", len(store.PrjExpenseReportIDs))
	fmt.Printf("  - Project Invoices (with lines): %d\n", len(store.PrjProjectInvoiceIDs))
	fmt.Printf("  - Billing Schedules (with milestones): %d\n", len(store.PrjBillingScheduleIDs))
	fmt.Printf("  - Project Budgets: %d\n", len(store.PrjProjectBudgetIDs))
	fmt.Printf("  - Status Reports: %d\n", len(store.PrjStatusReportIDs))
}

func printBISummary(store *MockDataStore) {
	fmt.Printf("\nBI Summary:\n")
	fmt.Printf("  - Reports (with embedded executions, access, subscriptions, schedules): %d\n", len(store.BiReportIDs))
	fmt.Printf("  - Report Templates: %d\n", len(store.BiReportTemplateIDs))
	fmt.Printf("  - Dashboards (with embedded widgets, shares, drilldowns): %d\n", len(store.BiDashboardIDs))
	fmt.Printf("  - KPIs (with embedded thresholds): %d\n", len(store.BiKPIIDs))
	fmt.Printf("  - Data Cubes: %d\n", len(store.BiDataCubeIDs))
	fmt.Printf("  - Analysis Models (with embedded predictions): %d\n", len(store.BiAnalysisModelIDs))
	fmt.Printf("  - Data Sources: %d\n", len(store.BiDataSourceIDs))
	fmt.Printf("  - ETL Jobs (with embedded schedules): %d\n", len(store.BiETLJobIDs))
	fmt.Printf("  - Data Quality Rules: %d\n", len(store.BiDataQualityRuleIDs))
	fmt.Printf("  - Data Governance: %d\n", len(store.BiDataGovernanceIDs))
}

func printDOCSummary(store *MockDataStore) {
	fmt.Printf("\nDOC Summary:\n")
	fmt.Printf("  - Retention Policies: %d\n", len(store.DocRetentionPolicyIDs))
	fmt.Printf("  - Folders: %d\n", len(store.DocFolderIDs))
	fmt.Printf("  - Categories: %d\n", len(store.DocCategoryIDs))
	fmt.Printf("  - Tags: %d\n", len(store.DocTagIDs))
	fmt.Printf("  - Documents (with embedded versions, checkouts, comments, signatures, attachments, access logs, audit trails): %d\n", len(store.DocDocumentIDs))
	fmt.Printf("  - Approval Workflows (with embedded steps): %d\n", len(store.DocApprovalWorkflowIDs))
	fmt.Printf("  - Templates (with embedded fields): %d\n", len(store.DocTemplateIDs))
	fmt.Printf("  - Email Captures: %d\n", len(store.DocEmailCaptureIDs))
	fmt.Printf("  - Scan Jobs: %d\n", len(store.DocScanJobIDs))
	fmt.Printf("  - Legal Holds: %d\n", len(store.DocLegalHoldIDs))
	fmt.Printf("  - Archive Jobs: %d\n", len(store.DocArchiveJobIDs))
}

func printECOMSummary(store *MockDataStore) {
	fmt.Printf("\nECOM Summary:\n")
	fmt.Printf("  - Categories: %d\n", len(store.EcomCategoryIDs))
	fmt.Printf("  - Attributes: %d\n", len(store.EcomAttributeIDs))
	fmt.Printf("  - Products: %d (with embedded images, variants)\n", len(store.EcomProductIDs))
	fmt.Printf("  - Customers: %d (with embedded addresses)\n", len(store.EcomCustomerIDs))
	fmt.Printf("  - Wishlists: %d (with embedded items)\n", len(store.EcomWishlistIDs))
	fmt.Printf("  - Shopping Carts: %d\n", len(store.EcomCartIDs))
	fmt.Printf("  - Promotions: %d\n", len(store.EcomPromotionIDs))
	fmt.Printf("  - Coupons: %d\n", len(store.EcomCouponIDs))
	fmt.Printf("  - Price Rules: %d\n", len(store.EcomPriceRuleIDs))
	fmt.Printf("  - Shipping Methods: %d\n", len(store.EcomShippingIDs))
	fmt.Printf("  - Payment Methods: %d\n", len(store.EcomPaymentIDs))
	fmt.Printf("  - Orders: %d (with embedded lines, status history)\n", len(store.EcomOrderIDs))
	fmt.Printf("  - Returns: %d (with embedded lines)\n", len(store.EcomReturnIDs))
}

func printCOMPSummary(store *MockDataStore) {
	fmt.Printf("\nCOMP Summary:\n")
	fmt.Printf("  - Regulations (with embedded requirements, violations, statuses): %d\n", len(store.CompRegulationIDs))
	fmt.Printf("  - Policy Documents: %d\n", len(store.CompPolicyDocumentIDs))
	fmt.Printf("  - Insurance Policies: %d\n", len(store.CompInsurancePolicyIDs))
	fmt.Printf("  - Approval Matrices: %d\n", len(store.CompApprovalMatrixIDs))
	fmt.Printf("  - Risk Registers (with embedded assessments, mitigation plans): %d\n", len(store.CompRiskRegisterIDs))
	fmt.Printf("  - Audit Schedules (with embedded reports): %d\n", len(store.CompAuditScheduleIDs))
	fmt.Printf("  - Controls (with embedded assessments, segregation rules): %d\n", len(store.CompControlIDs))
	fmt.Printf("  - Certifications: %d\n", len(store.CompCertificationIDs))
	fmt.Printf("  - Incidents: %d\n", len(store.CompIncidentIDs))
	fmt.Printf("  - Audit Findings (with embedded remediation actions): %d\n", len(store.CompAuditFindingIDs))
	fmt.Printf("  - Compliance Reports: %d\n", len(store.CompComplianceReportIDs))
}
