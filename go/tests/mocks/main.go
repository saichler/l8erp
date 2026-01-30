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
}
