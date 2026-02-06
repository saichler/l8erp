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
	runAllPhases(client, store)

	// Print summary
	printSummary(store)
}
