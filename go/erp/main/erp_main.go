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
	scmcarriers "github.com/saichler/l8erp/go/erp/scm/carriers"

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

	"github.com/saichler/l8erp/go/erp/sales/customercontracts"
	// Sales - Customer Management
	"github.com/saichler/l8erp/go/erp/sales/customerhierarchies"
	"github.com/saichler/l8erp/go/erp/sales/customersegments"
	"github.com/saichler/l8erp/go/erp/sales/partnerchannels"

	"github.com/saichler/l8erp/go/erp/sales/backorders"
	"github.com/saichler/l8erp/go/erp/sales/orderallocations"
	"github.com/saichler/l8erp/go/erp/sales/quotationlines"
	"github.com/saichler/l8erp/go/erp/sales/returnorderlines"
	"github.com/saichler/l8erp/go/erp/sales/returnorders"
	"github.com/saichler/l8erp/go/erp/sales/salesorderlines"
	"github.com/saichler/l8erp/go/erp/sales/salesorders"
	// Sales - Sales Orders
	"github.com/saichler/l8erp/go/erp/sales/salesquotations"

	"github.com/saichler/l8erp/go/erp/sales/customerprices"
	"github.com/saichler/l8erp/go/erp/sales/discountrules"
	"github.com/saichler/l8erp/go/erp/sales/pricelistentries"
	// Sales - Pricing
	"github.com/saichler/l8erp/go/erp/sales/pricelists"
	"github.com/saichler/l8erp/go/erp/sales/promotionalprices"
	"github.com/saichler/l8erp/go/erp/sales/quantitybreaks"

	"github.com/saichler/l8erp/go/erp/sales/deliveryconfirms"
	"github.com/saichler/l8erp/go/erp/sales/deliverylines"
	// Sales - Shipping and Delivery
	"github.com/saichler/l8erp/go/erp/sales/deliveryorders"
	"github.com/saichler/l8erp/go/erp/sales/packingslips"
	"github.com/saichler/l8erp/go/erp/sales/pickreleases"
	"github.com/saichler/l8erp/go/erp/sales/shippingdocs"

	"github.com/saichler/l8erp/go/erp/sales/billingmilestones"
	// Sales - Billing
	"github.com/saichler/l8erp/go/erp/sales/billingschedules"
	"github.com/saichler/l8erp/go/erp/sales/revenueschedules"

	"github.com/saichler/l8erp/go/erp/sales/commissioncalcs"
	"github.com/saichler/l8erp/go/erp/sales/commissionplans"
	"github.com/saichler/l8erp/go/erp/sales/salesforecasts"
	// Sales - Analytics
	"github.com/saichler/l8erp/go/erp/sales/salestargets"
	"github.com/saichler/l8erp/go/erp/sales/salesterritories"
	"github.com/saichler/l8erp/go/erp/sales/territoryassigns"

	// Manufacturing - Engineering
	"github.com/saichler/l8erp/go/erp/mfg/boms"
	"github.com/saichler/l8erp/go/erp/mfg/bomlines"
	"github.com/saichler/l8erp/go/erp/mfg/routings"
	"github.com/saichler/l8erp/go/erp/mfg/routingoperations"
	"github.com/saichler/l8erp/go/erp/mfg/engchangeorders"
	"github.com/saichler/l8erp/go/erp/mfg/engchangedetails"

	// Manufacturing - Production
	"github.com/saichler/l8erp/go/erp/mfg/workorders"
	"github.com/saichler/l8erp/go/erp/mfg/workorderops"
	"github.com/saichler/l8erp/go/erp/mfg/productionorders"
	"github.com/saichler/l8erp/go/erp/mfg/prodorderlines"
	"github.com/saichler/l8erp/go/erp/mfg/prodbatches"
	"github.com/saichler/l8erp/go/erp/mfg/prodconsumptions"

	// Manufacturing - Shop Floor
	"github.com/saichler/l8erp/go/erp/mfg/workcenters"
	"github.com/saichler/l8erp/go/erp/mfg/workcentercaps"
	"github.com/saichler/l8erp/go/erp/mfg/laborentries"
	"github.com/saichler/l8erp/go/erp/mfg/machineentries"
	"github.com/saichler/l8erp/go/erp/mfg/shiftschedules"
	"github.com/saichler/l8erp/go/erp/mfg/downtimeevents"

	// Manufacturing - Quality
	"github.com/saichler/l8erp/go/erp/mfg/qualityplans"
	"github.com/saichler/l8erp/go/erp/mfg/inspectionpoints"
	"github.com/saichler/l8erp/go/erp/mfg/qualityinspections"
	"github.com/saichler/l8erp/go/erp/mfg/testresults"
	"github.com/saichler/l8erp/go/erp/mfg/ncrs"
	"github.com/saichler/l8erp/go/erp/mfg/ncractions"

	// Manufacturing - Planning
	"github.com/saichler/l8erp/go/erp/mfg/mrpruns"
	"github.com/saichler/l8erp/go/erp/mfg/mrprequirements"
	"github.com/saichler/l8erp/go/erp/mfg/capacityplans"
	"github.com/saichler/l8erp/go/erp/mfg/capacityloads"
	"github.com/saichler/l8erp/go/erp/mfg/prodschedules"
	"github.com/saichler/l8erp/go/erp/mfg/scheduleblocks"

	// Manufacturing - Costing
	"github.com/saichler/l8erp/go/erp/mfg/standardcosts"
	"github.com/saichler/l8erp/go/erp/mfg/costrollups"
	"github.com/saichler/l8erp/go/erp/mfg/actualcosts"
	"github.com/saichler/l8erp/go/erp/mfg/costvariances"
	"github.com/saichler/l8erp/go/erp/mfg/overheads"
	"github.com/saichler/l8erp/go/erp/mfg/overheadallocs"

	// CRM - Lead Management
	"github.com/saichler/l8erp/go/erp/crm/leads"
	"github.com/saichler/l8erp/go/erp/crm/leadsources"
	"github.com/saichler/l8erp/go/erp/crm/leadscores"
	"github.com/saichler/l8erp/go/erp/crm/leadactivities"
	"github.com/saichler/l8erp/go/erp/crm/leadassigns"
	"github.com/saichler/l8erp/go/erp/crm/leadconversions"

	// CRM - Opportunity Management
	"github.com/saichler/l8erp/go/erp/crm/opportunities"
	"github.com/saichler/l8erp/go/erp/crm/oppstages"
	"github.com/saichler/l8erp/go/erp/crm/oppcompetitors"
	"github.com/saichler/l8erp/go/erp/crm/oppproducts"
	"github.com/saichler/l8erp/go/erp/crm/oppteams"
	"github.com/saichler/l8erp/go/erp/crm/oppactivities"

	// CRM - Account Management
	crmaccounts "github.com/saichler/l8erp/go/erp/crm/accounts"
	"github.com/saichler/l8erp/go/erp/crm/contacts"
	"github.com/saichler/l8erp/go/erp/crm/interactions"
	"github.com/saichler/l8erp/go/erp/crm/relationships"
	"github.com/saichler/l8erp/go/erp/crm/healthscores"
	"github.com/saichler/l8erp/go/erp/crm/accountplans"

	// CRM - Marketing
	"github.com/saichler/l8erp/go/erp/crm/campaigns"
	"github.com/saichler/l8erp/go/erp/crm/campaignmembers"
	"github.com/saichler/l8erp/go/erp/crm/emailtemplates"
	"github.com/saichler/l8erp/go/erp/crm/marketinglists"
	"github.com/saichler/l8erp/go/erp/crm/campaignresponses"
	"github.com/saichler/l8erp/go/erp/crm/campaignrois"

	// CRM - Customer Service
	"github.com/saichler/l8erp/go/erp/crm/cases"
	"github.com/saichler/l8erp/go/erp/crm/casecomments"
	"github.com/saichler/l8erp/go/erp/crm/kbarticles"
	"github.com/saichler/l8erp/go/erp/crm/slas"
	"github.com/saichler/l8erp/go/erp/crm/escalations"
	"github.com/saichler/l8erp/go/erp/crm/surveys"

	// CRM - Field Service
	"github.com/saichler/l8erp/go/erp/crm/serviceorders"
	"github.com/saichler/l8erp/go/erp/crm/technicians"
	"github.com/saichler/l8erp/go/erp/crm/servicecontracts"
	"github.com/saichler/l8erp/go/erp/crm/serviceschedules"
	"github.com/saichler/l8erp/go/erp/crm/serviceparts"
	"github.com/saichler/l8erp/go/erp/crm/servicevisits"

	// Projects - Planning
	"github.com/saichler/l8erp/go/erp/prj/projects"
	"github.com/saichler/l8erp/go/erp/prj/projecttemplates"
	"github.com/saichler/l8erp/go/erp/prj/phases"
	"github.com/saichler/l8erp/go/erp/prj/tasks"
	"github.com/saichler/l8erp/go/erp/prj/milestones"
	"github.com/saichler/l8erp/go/erp/prj/deliverables"
	"github.com/saichler/l8erp/go/erp/prj/dependencies"
	"github.com/saichler/l8erp/go/erp/prj/risks"

	// Projects - Resources
	"github.com/saichler/l8erp/go/erp/prj/resourcepools"
	"github.com/saichler/l8erp/go/erp/prj/resources"
	"github.com/saichler/l8erp/go/erp/prj/resourceskills"
	"github.com/saichler/l8erp/go/erp/prj/allocations"
	"github.com/saichler/l8erp/go/erp/prj/bookings"
	prjcapacityplans "github.com/saichler/l8erp/go/erp/prj/capacityplans"
	"github.com/saichler/l8erp/go/erp/prj/utilizations"

	// Projects - Time & Expense
	prjtimesheets "github.com/saichler/l8erp/go/erp/prj/timesheets"
	"github.com/saichler/l8erp/go/erp/prj/timesheetentries"
	"github.com/saichler/l8erp/go/erp/prj/expensereports"
	"github.com/saichler/l8erp/go/erp/prj/expenseentries"
	"github.com/saichler/l8erp/go/erp/prj/approvalrules"
	"github.com/saichler/l8erp/go/erp/prj/expensecategories"
	"github.com/saichler/l8erp/go/erp/prj/expensepolicies"

	// Projects - Billing
	"github.com/saichler/l8erp/go/erp/prj/billingrates"
	prjbillingschedules "github.com/saichler/l8erp/go/erp/prj/billingschedules"
	prjbillingmilestones "github.com/saichler/l8erp/go/erp/prj/billingmilestones"
	"github.com/saichler/l8erp/go/erp/prj/projectinvoices"
	"github.com/saichler/l8erp/go/erp/prj/invoicelines"
	"github.com/saichler/l8erp/go/erp/prj/revenuerecognitions"
	"github.com/saichler/l8erp/go/erp/prj/projectbudgets"

	// Projects - Analytics
	"github.com/saichler/l8erp/go/erp/prj/projectstatuses"
	"github.com/saichler/l8erp/go/erp/prj/earnedvalues"
	"github.com/saichler/l8erp/go/erp/prj/budgetvariances"
	"github.com/saichler/l8erp/go/erp/prj/resourceforecasts"
	"github.com/saichler/l8erp/go/erp/prj/portfolioviews"
	"github.com/saichler/l8erp/go/erp/prj/projectkpis"
	"github.com/saichler/l8erp/go/erp/prj/projectissues"

	// BI - Reporting
	"github.com/saichler/l8erp/go/erp/bi/reports"
	"github.com/saichler/l8erp/go/erp/bi/reporttemplates"
	"github.com/saichler/l8erp/go/erp/bi/reportschedules"
	"github.com/saichler/l8erp/go/erp/bi/reportexecutions"
	"github.com/saichler/l8erp/go/erp/bi/reportaccesses"
	"github.com/saichler/l8erp/go/erp/bi/reportsubscriptions"

	// BI - Dashboards
	"github.com/saichler/l8erp/go/erp/bi/dashboards"
	"github.com/saichler/l8erp/go/erp/bi/dashboardwidgets"
	"github.com/saichler/l8erp/go/erp/bi/kpis"
	"github.com/saichler/l8erp/go/erp/bi/kpithresholds"
	"github.com/saichler/l8erp/go/erp/bi/drilldowns"
	"github.com/saichler/l8erp/go/erp/bi/dashboardshares"

	// BI - Analytics
	"github.com/saichler/l8erp/go/erp/bi/datacubes"
	"github.com/saichler/l8erp/go/erp/bi/analysismodels"
	"github.com/saichler/l8erp/go/erp/bi/predictions"
	"github.com/saichler/l8erp/go/erp/bi/trendanalyses"
	biscenarios "github.com/saichler/l8erp/go/erp/bi/scenarios"
	"github.com/saichler/l8erp/go/erp/bi/benchmarks"

	// BI - Data Management
	"github.com/saichler/l8erp/go/erp/bi/datasources"
	"github.com/saichler/l8erp/go/erp/bi/etljobs"
	"github.com/saichler/l8erp/go/erp/bi/etlschedules"
	"github.com/saichler/l8erp/go/erp/bi/dataqualityrules"
	"github.com/saichler/l8erp/go/erp/bi/masterdataconfigs"
	"github.com/saichler/l8erp/go/erp/bi/datagovernances"
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
	activateSalesServices(nic)
	activateMfgServices(nic)
	activateCrmServices(nic)
	activatePrjServices(nic)
	activateBiServices(nic)

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
	scmcarriers.Activate(common.DB_CREDS, common.DB_NAME, nic)
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
	// When there is no security provider
	if user == "admin" && pass == "admin" {
		common.DB_NAME = "admin"
	}
	fmt.Println("/start-postgres.sh", common.DB_NAME, user, pass)
	var cmd *exec.Cmd
	cmd = exec.Command("nohup", "/start-postgres.sh", common.DB_NAME, user, pass)
	out, err := cmd.Output()
	if err != nil {
		panic(err)
	}
	fmt.Println(string(out))
	time.Sleep(time.Second * 5)
}

func activateSalesServices(nic ifs.IVNic) {
	// Customer Management
	customerhierarchies.Activate(common.DB_CREDS, common.DB_NAME, nic)
	customersegments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	customercontracts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	partnerchannels.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Sales Orders
	salesquotations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	quotationlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	salesorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	salesorderlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	orderallocations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	backorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	returnorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	returnorderlines.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Pricing
	pricelists.Activate(common.DB_CREDS, common.DB_NAME, nic)
	pricelistentries.Activate(common.DB_CREDS, common.DB_NAME, nic)
	customerprices.Activate(common.DB_CREDS, common.DB_NAME, nic)
	discountrules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	promotionalprices.Activate(common.DB_CREDS, common.DB_NAME, nic)
	quantitybreaks.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Shipping and Delivery
	deliveryorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	deliverylines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	pickreleases.Activate(common.DB_CREDS, common.DB_NAME, nic)
	packingslips.Activate(common.DB_CREDS, common.DB_NAME, nic)
	shippingdocs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	deliveryconfirms.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Billing
	billingschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	billingmilestones.Activate(common.DB_CREDS, common.DB_NAME, nic)
	revenueschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Sales Analytics
	salestargets.Activate(common.DB_CREDS, common.DB_NAME, nic)
	salesterritories.Activate(common.DB_CREDS, common.DB_NAME, nic)
	territoryassigns.Activate(common.DB_CREDS, common.DB_NAME, nic)
	commissionplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	commissioncalcs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	salesforecasts.Activate(common.DB_CREDS, common.DB_NAME, nic)
}

func activateMfgServices(nic ifs.IVNic) {
	// Engineering
	boms.Activate(common.DB_CREDS, common.DB_NAME, nic)
	bomlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	routings.Activate(common.DB_CREDS, common.DB_NAME, nic)
	routingoperations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	engchangeorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	engchangedetails.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Production
	workorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	workorderops.Activate(common.DB_CREDS, common.DB_NAME, nic)
	productionorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	prodorderlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	prodbatches.Activate(common.DB_CREDS, common.DB_NAME, nic)
	prodconsumptions.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Shop Floor
	workcenters.Activate(common.DB_CREDS, common.DB_NAME, nic)
	workcentercaps.Activate(common.DB_CREDS, common.DB_NAME, nic)
	laborentries.Activate(common.DB_CREDS, common.DB_NAME, nic)
	machineentries.Activate(common.DB_CREDS, common.DB_NAME, nic)
	shiftschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	downtimeevents.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Quality
	qualityplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	inspectionpoints.Activate(common.DB_CREDS, common.DB_NAME, nic)
	qualityinspections.Activate(common.DB_CREDS, common.DB_NAME, nic)
	testresults.Activate(common.DB_CREDS, common.DB_NAME, nic)
	ncrs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	ncractions.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Planning
	mrpruns.Activate(common.DB_CREDS, common.DB_NAME, nic)
	mrprequirements.Activate(common.DB_CREDS, common.DB_NAME, nic)
	capacityplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	capacityloads.Activate(common.DB_CREDS, common.DB_NAME, nic)
	prodschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	scheduleblocks.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Costing
	standardcosts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	costrollups.Activate(common.DB_CREDS, common.DB_NAME, nic)
	actualcosts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	costvariances.Activate(common.DB_CREDS, common.DB_NAME, nic)
	overheads.Activate(common.DB_CREDS, common.DB_NAME, nic)
	overheadallocs.Activate(common.DB_CREDS, common.DB_NAME, nic)
}

func activateCrmServices(nic ifs.IVNic) {
	// Lead Management
	leads.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leadsources.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leadscores.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leadactivities.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leadassigns.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leadconversions.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Opportunity Management
	opportunities.Activate(common.DB_CREDS, common.DB_NAME, nic)
	oppstages.Activate(common.DB_CREDS, common.DB_NAME, nic)
	oppcompetitors.Activate(common.DB_CREDS, common.DB_NAME, nic)
	oppproducts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	oppteams.Activate(common.DB_CREDS, common.DB_NAME, nic)
	oppactivities.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Account Management
	crmaccounts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	contacts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	interactions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	relationships.Activate(common.DB_CREDS, common.DB_NAME, nic)
	healthscores.Activate(common.DB_CREDS, common.DB_NAME, nic)
	accountplans.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Marketing
	campaigns.Activate(common.DB_CREDS, common.DB_NAME, nic)
	campaignmembers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	emailtemplates.Activate(common.DB_CREDS, common.DB_NAME, nic)
	marketinglists.Activate(common.DB_CREDS, common.DB_NAME, nic)
	campaignresponses.Activate(common.DB_CREDS, common.DB_NAME, nic)
	campaignrois.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Customer Service
	cases.Activate(common.DB_CREDS, common.DB_NAME, nic)
	casecomments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	kbarticles.Activate(common.DB_CREDS, common.DB_NAME, nic)
	slas.Activate(common.DB_CREDS, common.DB_NAME, nic)
	escalations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	surveys.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Field Service
	serviceorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	technicians.Activate(common.DB_CREDS, common.DB_NAME, nic)
	servicecontracts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	serviceschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	serviceparts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	servicevisits.Activate(common.DB_CREDS, common.DB_NAME, nic)
}

func activatePrjServices(nic ifs.IVNic) {
	// Planning
	projects.Activate(common.DB_CREDS, common.DB_NAME, nic)
	projecttemplates.Activate(common.DB_CREDS, common.DB_NAME, nic)
	phases.Activate(common.DB_CREDS, common.DB_NAME, nic)
	tasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
	milestones.Activate(common.DB_CREDS, common.DB_NAME, nic)
	deliverables.Activate(common.DB_CREDS, common.DB_NAME, nic)
	dependencies.Activate(common.DB_CREDS, common.DB_NAME, nic)
	risks.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Resources
	resourcepools.Activate(common.DB_CREDS, common.DB_NAME, nic)
	resources.Activate(common.DB_CREDS, common.DB_NAME, nic)
	resourceskills.Activate(common.DB_CREDS, common.DB_NAME, nic)
	allocations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	bookings.Activate(common.DB_CREDS, common.DB_NAME, nic)
	prjcapacityplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	utilizations.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Time & Expense
	prjtimesheets.Activate(common.DB_CREDS, common.DB_NAME, nic)
	timesheetentries.Activate(common.DB_CREDS, common.DB_NAME, nic)
	expensereports.Activate(common.DB_CREDS, common.DB_NAME, nic)
	expenseentries.Activate(common.DB_CREDS, common.DB_NAME, nic)
	approvalrules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	expensecategories.Activate(common.DB_CREDS, common.DB_NAME, nic)
	expensepolicies.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Billing
	billingrates.Activate(common.DB_CREDS, common.DB_NAME, nic)
	prjbillingschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	prjbillingmilestones.Activate(common.DB_CREDS, common.DB_NAME, nic)
	projectinvoices.Activate(common.DB_CREDS, common.DB_NAME, nic)
	invoicelines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	revenuerecognitions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	projectbudgets.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Analytics
	projectstatuses.Activate(common.DB_CREDS, common.DB_NAME, nic)
	earnedvalues.Activate(common.DB_CREDS, common.DB_NAME, nic)
	budgetvariances.Activate(common.DB_CREDS, common.DB_NAME, nic)
	resourceforecasts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	portfolioviews.Activate(common.DB_CREDS, common.DB_NAME, nic)
	projectkpis.Activate(common.DB_CREDS, common.DB_NAME, nic)
	projectissues.Activate(common.DB_CREDS, common.DB_NAME, nic)
}

func activateBiServices(nic ifs.IVNic) {
	// Reporting
	reports.Activate(common.DB_CREDS, common.DB_NAME, nic)
	reporttemplates.Activate(common.DB_CREDS, common.DB_NAME, nic)
	reportschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	reportexecutions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	reportaccesses.Activate(common.DB_CREDS, common.DB_NAME, nic)
	reportsubscriptions.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Dashboards
	dashboards.Activate(common.DB_CREDS, common.DB_NAME, nic)
	dashboardwidgets.Activate(common.DB_CREDS, common.DB_NAME, nic)
	kpis.Activate(common.DB_CREDS, common.DB_NAME, nic)
	kpithresholds.Activate(common.DB_CREDS, common.DB_NAME, nic)
	drilldowns.Activate(common.DB_CREDS, common.DB_NAME, nic)
	dashboardshares.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Analytics
	datacubes.Activate(common.DB_CREDS, common.DB_NAME, nic)
	analysismodels.Activate(common.DB_CREDS, common.DB_NAME, nic)
	predictions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	trendanalyses.Activate(common.DB_CREDS, common.DB_NAME, nic)
	biscenarios.Activate(common.DB_CREDS, common.DB_NAME, nic)
	benchmarks.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Data Management
	datasources.Activate(common.DB_CREDS, common.DB_NAME, nic)
	etljobs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	etlschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	dataqualityrules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	masterdataconfigs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	datagovernances.Activate(common.DB_CREDS, common.DB_NAME, nic)
}
