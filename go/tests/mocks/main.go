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

import (
	"crypto/tls"
	"flag"
	"fmt"
	"net/http"
	"os"
	"time"
)

func main() {
	address := flag.String("address", "http://localhost:8080", "ERP server address")
	user := flag.String("user", "admin", "Username for authentication")
	password := flag.String("password", "admin", "Password for authentication")
	insecure := flag.Bool("insecure", false, "Skip TLS certificate verification")
	flag.Parse()

	fmt.Printf("ERP Mock Data Generator\n")
	fmt.Printf("=======================\n")
	fmt.Printf("Server: %s\n", *address)
	fmt.Printf("User: %s\n", *user)
	if *insecure {
		fmt.Printf("TLS: Insecure (certificate verification disabled)\n")
	}
	fmt.Printf("\n")

	httpClient := &http.Client{Timeout: 30 * time.Second}
	if *insecure {
		httpClient.Transport = &http.Transport{
			TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
		}
	}

	client := &HCMClient{
		baseURL: *address,
		client:  httpClient,
	}

	// Authenticate
	err := client.authenticate(*user, *password)
	if err != nil {
		fmt.Printf("Authentication failed: %v\n", err)
		os.Exit(1)
	}
	fmt.Printf("Authentication successful\n\n")

	// Initialize data store
	store := &MockDataStore{}

	// Generate and insert mock data in dependency order
	fmt.Printf("Phase 1: Foundation Objects\n")
	fmt.Printf("---------------------------\n")
	if err := generatePhase1(client, store); err != nil {
		fmt.Printf("Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPhase 2: Core Organizational Structure\n")
	fmt.Printf("--------------------------------------\n")
	if err := generatePhase2(client, store); err != nil {
		fmt.Printf("Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPhase 3: Employees & Configuration\n")
	fmt.Printf("-----------------------------------\n")
	if err := generatePhase3(client, store); err != nil {
		fmt.Printf("Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPhase 4: Employee-Dependent Objects\n")
	fmt.Printf("------------------------------------\n")
	if err := generatePhase4(client, store); err != nil {
		fmt.Printf("Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPhase 5: Transaction & Additional Objects\n")
	fmt.Printf("------------------------------------------\n")
	if err := generatePhase5(client, store); err != nil {
		fmt.Printf("Phase 5 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPhase 6: Talent Acquisition\n")
	fmt.Printf("---------------------------\n")
	if err := generatePhase6(client, store); err != nil {
		fmt.Printf("Phase 6 failed: %v\n", err)
		os.Exit(1)
	}

	// FIN Module Phases
	fmt.Printf("\nFIN Phase 1: Foundation\n")
	fmt.Printf("-----------------------\n")
	if err := generateFinPhase1(client, store); err != nil {
		fmt.Printf("FIN Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nFIN Phase 2: Core Financial\n")
	fmt.Printf("---------------------------\n")
	if err := generateFinPhase2(client, store); err != nil {
		fmt.Printf("FIN Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nFIN Phase 3: Entity Master\n")
	fmt.Printf("--------------------------\n")
	if err := generateFinPhase3(client, store); err != nil {
		fmt.Printf("FIN Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nFIN Phase 4: Configuration\n")
	fmt.Printf("--------------------------\n")
	if err := generateFinPhase4(client, store); err != nil {
		fmt.Printf("FIN Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nFIN Phase 5: AP Transactions\n")
	fmt.Printf("----------------------------\n")
	if err := generateFinPhase5(client, store); err != nil {
		fmt.Printf("FIN Phase 5 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nFIN Phase 6: AR Transactions\n")
	fmt.Printf("----------------------------\n")
	if err := generateFinPhase6(client, store); err != nil {
		fmt.Printf("FIN Phase 6 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nFIN Phase 7: GL Transactions\n")
	fmt.Printf("----------------------------\n")
	if err := generateFinPhase7(client, store); err != nil {
		fmt.Printf("FIN Phase 7 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nFIN Phase 8: Cash & Assets\n")
	fmt.Printf("--------------------------\n")
	if err := generateFinPhase8(client, store); err != nil {
		fmt.Printf("FIN Phase 8 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nFIN Phase 9: Tax Filing\n")
	fmt.Printf("-----------------------\n")
	if err := generateFinPhase9(client, store); err != nil {
		fmt.Printf("FIN Phase 9 failed: %v\n", err)
		os.Exit(1)
	}

	// SCM Module Phases
	fmt.Printf("\nSCM Phase 1: Foundation\n")
	fmt.Printf("-----------------------\n")
	if err := generateScmPhase1(client, store); err != nil {
		fmt.Printf("SCM Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSCM Phase 2: Inventory Core\n")
	fmt.Printf("---------------------------\n")
	if err := generateScmPhase2(client, store); err != nil {
		fmt.Printf("SCM Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSCM Phase 3: Procurement\n")
	fmt.Printf("------------------------\n")
	if err := generateScmPhase3(client, store); err != nil {
		fmt.Printf("SCM Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSCM Phase 4: Purchase Orders\n")
	fmt.Printf("----------------------------\n")
	if err := generateScmPhase4(client, store); err != nil {
		fmt.Printf("SCM Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSCM Phase 5: Warehouse Operations\n")
	fmt.Printf("----------------------------------\n")
	if err := generateScmPhase5(client, store); err != nil {
		fmt.Printf("SCM Phase 5 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSCM Phase 6: Inventory Transactions\n")
	fmt.Printf("------------------------------------\n")
	if err := generateScmPhase6(client, store); err != nil {
		fmt.Printf("SCM Phase 6 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSCM Phase 7: Logistics\n")
	fmt.Printf("----------------------\n")
	if err := generateScmPhase7(client, store); err != nil {
		fmt.Printf("SCM Phase 7 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSCM Phase 8: Planning\n")
	fmt.Printf("---------------------\n")
	if err := generateScmPhase8(client, store); err != nil {
		fmt.Printf("SCM Phase 8 failed: %v\n", err)
		os.Exit(1)
	}

	// Sales Module Phases
	fmt.Printf("\nSales Phase 1: Foundation\n")
	fmt.Printf("-------------------------\n")
	if err := generateSalesPhase1(client, store); err != nil {
		fmt.Printf("Sales Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSales Phase 2: Customer & Partners\n")
	fmt.Printf("-----------------------------------\n")
	if err := generateSalesPhase2(client, store); err != nil {
		fmt.Printf("Sales Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSales Phase 3: Pricing Setup\n")
	fmt.Printf("----------------------------\n")
	if err := generateSalesPhase3(client, store); err != nil {
		fmt.Printf("Sales Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSales Phase 4: Quotations\n")
	fmt.Printf("-------------------------\n")
	if err := generateSalesPhase4(client, store); err != nil {
		fmt.Printf("Sales Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSales Phase 5: Orders\n")
	fmt.Printf("---------------------\n")
	if err := generateSalesPhase5(client, store); err != nil {
		fmt.Printf("Sales Phase 5 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSales Phase 6: Shipping\n")
	fmt.Printf("-----------------------\n")
	if err := generateSalesPhase6(client, store); err != nil {
		fmt.Printf("Sales Phase 6 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSales Phase 7: Billing\n")
	fmt.Printf("----------------------\n")
	if err := generateSalesPhase7(client, store); err != nil {
		fmt.Printf("Sales Phase 7 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nSales Phase 8: Analytics\n")
	fmt.Printf("------------------------\n")
	if err := generateSalesPhase8(client, store); err != nil {
		fmt.Printf("Sales Phase 8 failed: %v\n", err)
		os.Exit(1)
	}

	// MFG Module Phases
	fmt.Printf("\nMFG Phase 1: Foundation\n")
	fmt.Printf("-----------------------\n")
	if err := generateMfgPhase1(client, store); err != nil {
		fmt.Printf("MFG Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nMFG Phase 2: Engineering & Quality Plans\n")
	fmt.Printf("-----------------------------------------\n")
	if err := generateMfgPhase2(client, store); err != nil {
		fmt.Printf("MFG Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nMFG Phase 3: Work Orders & Production\n")
	fmt.Printf("--------------------------------------\n")
	if err := generateMfgPhase3(client, store); err != nil {
		fmt.Printf("MFG Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nMFG Phase 4: Shop Floor\n")
	fmt.Printf("-----------------------\n")
	if err := generateMfgPhase4(client, store); err != nil {
		fmt.Printf("MFG Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nMFG Phase 5: Quality Transactions\n")
	fmt.Printf("----------------------------------\n")
	if err := generateMfgPhase5(client, store); err != nil {
		fmt.Printf("MFG Phase 5 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nMFG Phase 6: Planning\n")
	fmt.Printf("---------------------\n")
	if err := generateMfgPhase6(client, store); err != nil {
		fmt.Printf("MFG Phase 6 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nMFG Phase 7: Costing\n")
	fmt.Printf("--------------------\n")
	if err := generateMfgPhase7(client, store); err != nil {
		fmt.Printf("MFG Phase 7 failed: %v\n", err)
		os.Exit(1)
	}

	// CRM Module Phases
	fmt.Printf("\nCRM Phase 1: Leads Foundation\n")
	fmt.Printf("-----------------------------\n")
	if err := generateCrmPhase1(client, store); err != nil {
		fmt.Printf("CRM Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCRM Phase 2: Opportunity Stages\n")
	fmt.Printf("--------------------------------\n")
	if err := generateCrmPhase2(client, store); err != nil {
		fmt.Printf("CRM Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCRM Phase 3: Accounts & Contacts\n")
	fmt.Printf("---------------------------------\n")
	if err := generateCrmPhase3(client, store); err != nil {
		fmt.Printf("CRM Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCRM Phase 4: Marketing\n")
	fmt.Printf("-----------------------\n")
	if err := generateCrmPhase4(client, store); err != nil {
		fmt.Printf("CRM Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCRM Phase 5: Leads\n")
	fmt.Printf("------------------\n")
	if err := generateCrmPhase5(client, store); err != nil {
		fmt.Printf("CRM Phase 5 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCRM Phase 6: Opportunities\n")
	fmt.Printf("--------------------------\n")
	if err := generateCrmPhase6(client, store); err != nil {
		fmt.Printf("CRM Phase 6 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCRM Phase 7: Account Management\n")
	fmt.Printf("--------------------------------\n")
	if err := generateCrmPhase7(client, store); err != nil {
		fmt.Printf("CRM Phase 7 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCRM Phase 8: Customer Service\n")
	fmt.Printf("-----------------------------\n")
	if err := generateCrmPhase8(client, store); err != nil {
		fmt.Printf("CRM Phase 8 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nCRM Phase 9: Field Service\n")
	fmt.Printf("--------------------------\n")
	if err := generateCrmPhase9(client, store); err != nil {
		fmt.Printf("CRM Phase 9 failed: %v\n", err)
		os.Exit(1)
	}

	// PRJ Module Phases
	fmt.Printf("\nPRJ Phase 1: Foundation\n")
	fmt.Printf("-----------------------\n")
	if err := generatePrjPhase1(client, store); err != nil {
		fmt.Printf("PRJ Phase 1 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPRJ Phase 2: Projects & Phases\n")
	fmt.Printf("------------------------------\n")
	if err := generatePrjPhase2(client, store); err != nil {
		fmt.Printf("PRJ Phase 2 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPRJ Phase 3: Resources\n")
	fmt.Printf("----------------------\n")
	if err := generatePrjPhase3(client, store); err != nil {
		fmt.Printf("PRJ Phase 3 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPRJ Phase 4: Project Details\n")
	fmt.Printf("----------------------------\n")
	if err := generatePrjPhase4(client, store); err != nil {
		fmt.Printf("PRJ Phase 4 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPRJ Phase 5: Resource Management\n")
	fmt.Printf("---------------------------------\n")
	if err := generatePrjPhase5(client, store); err != nil {
		fmt.Printf("PRJ Phase 5 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPRJ Phase 6: Time & Expense\n")
	fmt.Printf("---------------------------\n")
	if err := generatePrjPhase6(client, store); err != nil {
		fmt.Printf("PRJ Phase 6 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPRJ Phase 7: Billing\n")
	fmt.Printf("--------------------\n")
	if err := generatePrjPhase7(client, store); err != nil {
		fmt.Printf("PRJ Phase 7 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\nPRJ Phase 8: Analytics\n")
	fmt.Printf("----------------------\n")
	if err := generatePrjPhase8(client, store); err != nil {
		fmt.Printf("PRJ Phase 8 failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("\n=======================\n")
	fmt.Printf("Mock data generation complete!\n")
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
