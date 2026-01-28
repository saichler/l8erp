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

	fmt.Printf("HCM Mock Data Generator\n")
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

	fmt.Printf("\n=======================\n")
	fmt.Printf("Mock data generation complete!\n")
	fmt.Printf("Summary:\n")
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
