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

// runAllPhases executes all module phases in dependency order
func runAllPhases(client *HCMClient, store *MockDataStore) {
	// FIN Module Phases (must run before HCM — HCM needs CurrencyIDs)
	runFINPhases(client, store)

	// HCM Module Phases
	runHCMPhases(client, store)

	// SCM Module Phases
	runSCMPhases(client, store)

	// Sales Module Phases
	runSalesPhases(client, store)

	// MFG Module Phases
	runMFGPhases(client, store)

	// CRM Module Phases
	runCRMPhases(client, store)

	// PRJ Module Phases
	runPRJPhases(client, store)

	// BI Module Phases
	runBIPhases(client, store)

	// DOC Module Phases
	runDOCPhases(client, store)

	// ECOM Module Phases
	runECOMPhases(client, store)

	// COMP Module Phases
	runCOMPPhases(client, store)
}
