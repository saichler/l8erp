/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 *
 * Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package main

import (
	"fmt"
	"github.com/saichler/l8bus/go/overlay/vnic"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/fin/accountbalances"
	"github.com/saichler/l8erp/go/erp/fin/accounts"
	"github.com/saichler/l8erp/go/erp/fin/assetcategories"
	"github.com/saichler/l8erp/go/erp/fin/assetdisposals"
	"github.com/saichler/l8erp/go/erp/fin/assetmaintenance"
	"github.com/saichler/l8erp/go/erp/fin/assetrevaluations"
	"github.com/saichler/l8erp/go/erp/fin/assets"
	"github.com/saichler/l8erp/go/erp/fin/assettransfers"
	"github.com/saichler/l8erp/go/erp/fin/bankaccounts"
	"github.com/saichler/l8erp/go/erp/fin/bankreconciliations"
	"github.com/saichler/l8erp/go/erp/fin/banktransactions"
	"github.com/saichler/l8erp/go/erp/fin/budgetlines"
	"github.com/saichler/l8erp/go/erp/fin/budgets"
	"github.com/saichler/l8erp/go/erp/fin/budgetscenarios"
	"github.com/saichler/l8erp/go/erp/fin/budgettransfers"
	"github.com/saichler/l8erp/go/erp/fin/capitalexpenditures"
	"github.com/saichler/l8erp/go/erp/fin/cashforecasts"
	"github.com/saichler/l8erp/go/erp/fin/creditmemos"
	"github.com/saichler/l8erp/go/erp/fin/currencies"
	"github.com/saichler/l8erp/go/erp/fin/customercontacts"
	"github.com/saichler/l8erp/go/erp/fin/customerpayments"
	"github.com/saichler/l8erp/go/erp/fin/customers"
	"github.com/saichler/l8erp/go/erp/fin/depreciationschedules"
	"github.com/saichler/l8erp/go/erp/fin/dunningletters"
	"github.com/saichler/l8erp/go/erp/fin/exchangerates"
	"github.com/saichler/l8erp/go/erp/fin/fiscalperiods"
	"github.com/saichler/l8erp/go/erp/fin/fiscalyears"
	"github.com/saichler/l8erp/go/erp/fin/forecasts"
	"github.com/saichler/l8erp/go/erp/fin/fundtransfers"
	"github.com/saichler/l8erp/go/erp/fin/journalentries"
	"github.com/saichler/l8erp/go/erp/fin/journalentrylines"
	"github.com/saichler/l8erp/go/erp/fin/paymentallocations"
	"github.com/saichler/l8erp/go/erp/fin/paymentapplications"
	"github.com/saichler/l8erp/go/erp/fin/paymentschedules"
	"github.com/saichler/l8erp/go/erp/fin/pettycash"
	"github.com/saichler/l8erp/go/erp/fin/purchaseinvoicelines"
	"github.com/saichler/l8erp/go/erp/fin/purchaseinvoices"
	"github.com/saichler/l8erp/go/erp/fin/salesinvoicelines"
	"github.com/saichler/l8erp/go/erp/fin/salesinvoices"
	"github.com/saichler/l8erp/go/erp/fin/taxcodes"
	"github.com/saichler/l8erp/go/erp/fin/taxexemptions"
	"github.com/saichler/l8erp/go/erp/fin/taxjurisdictions"
	"github.com/saichler/l8erp/go/erp/fin/taxreturns"
	"github.com/saichler/l8erp/go/erp/fin/taxrules"
	"github.com/saichler/l8erp/go/erp/fin/vendorcontacts"
	"github.com/saichler/l8erp/go/erp/fin/vendorpayments"
	"github.com/saichler/l8erp/go/erp/fin/vendors"
	"github.com/saichler/l8erp/go/erp/fin/vendorstatements"
	"github.com/saichler/l8erp/go/erp/fin/withholdingtaxconfigs"
	"github.com/saichler/l8erp/go/erp/scm/bins"
	"github.com/saichler/l8erp/go/erp/scm/blanketorders"
	"github.com/saichler/l8erp/go/erp/scm/cyclecounts"
	"github.com/saichler/l8erp/go/erp/scm/deliveryproofs"
	"github.com/saichler/l8erp/go/erp/scm/demandforecasts"
	"github.com/saichler/l8erp/go/erp/scm/demandplans"
	"github.com/saichler/l8erp/go/erp/scm/distributionreqs"
	"github.com/saichler/l8erp/go/erp/scm/dockschedules"
	"github.com/saichler/l8erp/go/erp/scm/forecastaccuracies"
	"github.com/saichler/l8erp/go/erp/scm/forecastmodels"
	"github.com/saichler/l8erp/go/erp/scm/freightaudits"
	"github.com/saichler/l8erp/go/erp/scm/freightrates"
	"github.com/saichler/l8erp/go/erp/scm/inventoryvaluations"
	"github.com/saichler/l8erp/go/erp/scm/itemcategories"
	"github.com/saichler/l8erp/go/erp/scm/items"
	"github.com/saichler/l8erp/go/erp/scm/leadtimes"
	"github.com/saichler/l8erp/go/erp/scm/loadplans"
	"github.com/saichler/l8erp/go/erp/scm/lotnumbers"
	"github.com/saichler/l8erp/go/erp/scm/materialreqs"
	"github.com/saichler/l8erp/go/erp/scm/newproductplans"
	"github.com/saichler/l8erp/go/erp/scm/packtasks"
	"github.com/saichler/l8erp/go/erp/scm/picktasks"
	"github.com/saichler/l8erp/go/erp/scm/polines"
	"github.com/saichler/l8erp/go/erp/scm/promoplans"
	"github.com/saichler/l8erp/go/erp/scm/purchaseorders"
	"github.com/saichler/l8erp/go/erp/scm/purchasereqs"
	"github.com/saichler/l8erp/go/erp/scm/putawaytasks"
	"github.com/saichler/l8erp/go/erp/scm/receivingorders"
	"github.com/saichler/l8erp/go/erp/scm/reorderpoints"
	"github.com/saichler/l8erp/go/erp/scm/requisitionlines"
	"github.com/saichler/l8erp/go/erp/scm/returnauths"
	"github.com/saichler/l8erp/go/erp/scm/rfqs"
	"github.com/saichler/l8erp/go/erp/scm/routes"
	"github.com/saichler/l8erp/go/erp/scm/safetystocks"
	"github.com/saichler/l8erp/go/erp/scm/serialnumbers"
	"github.com/saichler/l8erp/go/erp/scm/shipments"
	"github.com/saichler/l8erp/go/erp/scm/shiptasks"
	"github.com/saichler/l8erp/go/erp/scm/stockmovements"
	"github.com/saichler/l8erp/go/erp/scm/suppliercollabs"
	"github.com/saichler/l8erp/go/erp/scm/supplierscorecards"
	"github.com/saichler/l8erp/go/erp/scm/supplyplans"
	"github.com/saichler/l8erp/go/erp/scm/warehouses"
	"github.com/saichler/l8erp/go/erp/scm/waveplans"
	"github.com/saichler/l8types/go/ifs"
	"os/exec"
	"time"

	// Core HR
	"github.com/saichler/l8erp/go/erp/hcm/compliancerecords"
	"github.com/saichler/l8erp/go/erp/hcm/departments"
	"github.com/saichler/l8erp/go/erp/hcm/employeedocuments"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/erp/hcm/jobfamilies"
	"github.com/saichler/l8erp/go/erp/hcm/jobs"
	"github.com/saichler/l8erp/go/erp/hcm/organizations"
	"github.com/saichler/l8erp/go/erp/hcm/positions"

	// Payroll
	"github.com/saichler/l8erp/go/erp/hcm/directdeposits"
	"github.com/saichler/l8erp/go/erp/hcm/garnishments"
	"github.com/saichler/l8erp/go/erp/hcm/paycomponents"
	"github.com/saichler/l8erp/go/erp/hcm/payrollruns"
	"github.com/saichler/l8erp/go/erp/hcm/payslips"
	"github.com/saichler/l8erp/go/erp/hcm/paystructures"
	"github.com/saichler/l8erp/go/erp/hcm/taxwithholdings"
	"github.com/saichler/l8erp/go/erp/hcm/yearenddocuments"

	// Benefits
	"github.com/saichler/l8erp/go/erp/hcm/benefitenrollments"
	"github.com/saichler/l8erp/go/erp/hcm/benefitplans"
	"github.com/saichler/l8erp/go/erp/hcm/carriers"
	"github.com/saichler/l8erp/go/erp/hcm/cobraevents"
	"github.com/saichler/l8erp/go/erp/hcm/dependents"
	"github.com/saichler/l8erp/go/erp/hcm/lifeevents"

	// Time & Attendance
	"github.com/saichler/l8erp/go/erp/hcm/absences"
	"github.com/saichler/l8erp/go/erp/hcm/holidays"
	"github.com/saichler/l8erp/go/erp/hcm/leavebalances"
	"github.com/saichler/l8erp/go/erp/hcm/leavepolicies"
	"github.com/saichler/l8erp/go/erp/hcm/leaverequests"
	"github.com/saichler/l8erp/go/erp/hcm/schedules"
	"github.com/saichler/l8erp/go/erp/hcm/shifts"
	"github.com/saichler/l8erp/go/erp/hcm/timesheets"

	// Talent
	"github.com/saichler/l8erp/go/erp/hcm/applicants"
	"github.com/saichler/l8erp/go/erp/hcm/applications"
	"github.com/saichler/l8erp/go/erp/hcm/careerpaths"
	"github.com/saichler/l8erp/go/erp/hcm/feedbacks"
	"github.com/saichler/l8erp/go/erp/hcm/goals"
	"github.com/saichler/l8erp/go/erp/hcm/jobrequisitions"
	"github.com/saichler/l8erp/go/erp/hcm/onboardingtasks"
	"github.com/saichler/l8erp/go/erp/hcm/performancereviews"
	"github.com/saichler/l8erp/go/erp/hcm/successionplans"

	// Learning
	"github.com/saichler/l8erp/go/erp/hcm/certifications"
	"github.com/saichler/l8erp/go/erp/hcm/courseenrollments"
	"github.com/saichler/l8erp/go/erp/hcm/courses"
	"github.com/saichler/l8erp/go/erp/hcm/coursesessions"
	"github.com/saichler/l8erp/go/erp/hcm/employeecertifications"
	"github.com/saichler/l8erp/go/erp/hcm/employeeskills"
	"github.com/saichler/l8erp/go/erp/hcm/skills"
	"github.com/saichler/l8erp/go/erp/hcm/trainingrecords"

	// Compensation
	"github.com/saichler/l8erp/go/erp/hcm/bonuspayments"
	"github.com/saichler/l8erp/go/erp/hcm/bonusplans"
	"github.com/saichler/l8erp/go/erp/hcm/compensationstatements"
	"github.com/saichler/l8erp/go/erp/hcm/employeecompensations"
	"github.com/saichler/l8erp/go/erp/hcm/equitygrants"
	"github.com/saichler/l8erp/go/erp/hcm/marketbenchmarks"
	"github.com/saichler/l8erp/go/erp/hcm/meritcycles"
	"github.com/saichler/l8erp/go/erp/hcm/meritincreases"
	"github.com/saichler/l8erp/go/erp/hcm/salarygrades"
	"github.com/saichler/l8erp/go/erp/hcm/salarystructures"
)

func main() {
	res := common.CreateResources("hcm")
	ifs.SetNetworkMode(ifs.NETWORK_K8s)
	nic := vnic.NewVirtualNetworkInterface(res, nil)
	nic.Start()
	nic.WaitForConnection()

	//Start postgres
	startDb(nic)

	activateHCMServices(nic)
	activateFinServices(nic)
	activateSCMServices(nic)

	common.WaitForSignal(res)
}

func activateSCMServices(nic ifs.IVNic) {
	// Procurement
	purchasereqs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	requisitionlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	rfqs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	purchaseorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	polines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	blanketorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	supplierscorecards.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Inventory Management
	items.Activate(common.DB_CREDS, common.DB_NAME, nic)
	itemcategories.Activate(common.DB_CREDS, common.DB_NAME, nic)
	stockmovements.Activate(common.DB_CREDS, common.DB_NAME, nic)
	lotnumbers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	serialnumbers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	cyclecounts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	reorderpoints.Activate(common.DB_CREDS, common.DB_NAME, nic)
	inventoryvaluations.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Warehouse Management
	warehouses.Activate(common.DB_CREDS, common.DB_NAME, nic)
	bins.Activate(common.DB_CREDS, common.DB_NAME, nic)
	receivingorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	putawaytasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
	picktasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
	packtasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
	shiptasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
	waveplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	dockschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Logistics and Transportation
	carriers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	freightrates.Activate(common.DB_CREDS, common.DB_NAME, nic)
	shipments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	routes.Activate(common.DB_CREDS, common.DB_NAME, nic)
	loadplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	deliveryproofs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	freightaudits.Activate(common.DB_CREDS, common.DB_NAME, nic)
	returnauths.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Demand Planning
	demandforecasts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	forecastmodels.Activate(common.DB_CREDS, common.DB_NAME, nic)
	demandplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	promoplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	newproductplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	forecastaccuracies.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Supply Planning
	materialreqs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	distributionreqs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	supplyplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	suppliercollabs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	safetystocks.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leadtimes.Activate(common.DB_CREDS, common.DB_NAME, nic)
}

func activateHCMServices(nic ifs.IVNic) {
	// Core HR
	employees.Activate(common.DB_CREDS, common.DB_NAME, nic)
	organizations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	departments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	positions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	jobs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	jobfamilies.Activate(common.DB_CREDS, common.DB_NAME, nic)
	employeedocuments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	compliancerecords.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Payroll
	paystructures.Activate(common.DB_CREDS, common.DB_NAME, nic)
	paycomponents.Activate(common.DB_CREDS, common.DB_NAME, nic)
	payrollruns.Activate(common.DB_CREDS, common.DB_NAME, nic)
	payslips.Activate(common.DB_CREDS, common.DB_NAME, nic)
	taxwithholdings.Activate(common.DB_CREDS, common.DB_NAME, nic)
	directdeposits.Activate(common.DB_CREDS, common.DB_NAME, nic)
	garnishments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	yearenddocuments.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Benefits
	benefitplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	benefitenrollments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	dependents.Activate(common.DB_CREDS, common.DB_NAME, nic)
	lifeevents.Activate(common.DB_CREDS, common.DB_NAME, nic)
	carriers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	cobraevents.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Time & Attendance
	timesheets.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leaverequests.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leavebalances.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leavepolicies.Activate(common.DB_CREDS, common.DB_NAME, nic)
	shifts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	schedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	holidays.Activate(common.DB_CREDS, common.DB_NAME, nic)
	absences.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Talent
	jobrequisitions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	applicants.Activate(common.DB_CREDS, common.DB_NAME, nic)
	applications.Activate(common.DB_CREDS, common.DB_NAME, nic)
	onboardingtasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
	performancereviews.Activate(common.DB_CREDS, common.DB_NAME, nic)
	goals.Activate(common.DB_CREDS, common.DB_NAME, nic)
	successionplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	careerpaths.Activate(common.DB_CREDS, common.DB_NAME, nic)
	feedbacks.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Learning
	courses.Activate(common.DB_CREDS, common.DB_NAME, nic)
	coursesessions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	courseenrollments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	certifications.Activate(common.DB_CREDS, common.DB_NAME, nic)
	employeecertifications.Activate(common.DB_CREDS, common.DB_NAME, nic)
	skills.Activate(common.DB_CREDS, common.DB_NAME, nic)
	employeeskills.Activate(common.DB_CREDS, common.DB_NAME, nic)
	trainingrecords.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Compensation
	salarygrades.Activate(common.DB_CREDS, common.DB_NAME, nic)
	salarystructures.Activate(common.DB_CREDS, common.DB_NAME, nic)
	employeecompensations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	meritincreases.Activate(common.DB_CREDS, common.DB_NAME, nic)
	meritcycles.Activate(common.DB_CREDS, common.DB_NAME, nic)
	bonusplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	bonuspayments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	equitygrants.Activate(common.DB_CREDS, common.DB_NAME, nic)
	compensationstatements.Activate(common.DB_CREDS, common.DB_NAME, nic)
	marketbenchmarks.Activate(common.DB_CREDS, common.DB_NAME, nic)
}

func activateFinServices(nic ifs.IVNic) {
	// General Ledger
	accounts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	journalentries.Activate(common.DB_CREDS, common.DB_NAME, nic)
	journalentrylines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	fiscalyears.Activate(common.DB_CREDS, common.DB_NAME, nic)
	fiscalperiods.Activate(common.DB_CREDS, common.DB_NAME, nic)
	currencies.Activate(common.DB_CREDS, common.DB_NAME, nic)
	exchangerates.Activate(common.DB_CREDS, common.DB_NAME, nic)
	accountbalances.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Accounts Payable
	vendors.Activate(common.DB_CREDS, common.DB_NAME, nic)
	vendorcontacts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	purchaseinvoices.Activate(common.DB_CREDS, common.DB_NAME, nic)
	purchaseinvoicelines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	paymentschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	vendorpayments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	paymentallocations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	vendorstatements.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Accounts Receivable
	customers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	customercontacts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	salesinvoices.Activate(common.DB_CREDS, common.DB_NAME, nic)
	salesinvoicelines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	customerpayments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	paymentapplications.Activate(common.DB_CREDS, common.DB_NAME, nic)
	creditmemos.Activate(common.DB_CREDS, common.DB_NAME, nic)
	dunningletters.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Cash Management
	bankaccounts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	banktransactions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	bankreconciliations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	cashforecasts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	fundtransfers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	pettycash.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Fixed Assets
	assets.Activate(common.DB_CREDS, common.DB_NAME, nic)
	assetcategories.Activate(common.DB_CREDS, common.DB_NAME, nic)
	depreciationschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	assetdisposals.Activate(common.DB_CREDS, common.DB_NAME, nic)
	assettransfers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	assetmaintenance.Activate(common.DB_CREDS, common.DB_NAME, nic)
	assetrevaluations.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Budgeting and Planning
	budgets.Activate(common.DB_CREDS, common.DB_NAME, nic)
	budgetlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	budgettransfers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	budgetscenarios.Activate(common.DB_CREDS, common.DB_NAME, nic)
	capitalexpenditures.Activate(common.DB_CREDS, common.DB_NAME, nic)
	forecasts.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Tax Management
	taxcodes.Activate(common.DB_CREDS, common.DB_NAME, nic)
	taxjurisdictions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	taxrules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	taxreturns.Activate(common.DB_CREDS, common.DB_NAME, nic)
	taxexemptions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	withholdingtaxconfigs.Activate(common.DB_CREDS, common.DB_NAME, nic)
}

func startDb(nic ifs.IVNic) {
	_, user, pass, _, err := nic.Resources().Security().Credential(common.DB_CREDS, common.DB_NAME, nic.Resources())
	if err != nil {
		panic(common.DB_CREDS + " " + err.Error())
	}
	fmt.Println("/start-postgres.sh", common.DB_NAME, user, pass)
	cmd := exec.Command("nohup", "/start-postgres.sh", common.DB_NAME, user, pass)
	out, err := cmd.Output()
	if err != nil {
		panic(err)
	}
	fmt.Println(string(out))
	time.Sleep(time.Second * 5)
}
