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

// MockDataStore holds generated IDs for reference
type MockDataStore struct {
	// Phase 1: Foundation
	JobFamilyIDs     []string
	CarrierIDs       []string
	CertificationIDs []string
	SkillIDs         []string

	// Phase 2: Core Organizational
	OrganizationIDs []string
	JobIDs          []string
	DepartmentIDs   []string
	PositionIDs     []string

	// Phase 3: Employees & Config
	EmployeeIDs        []string
	ManagerIDs         []string // Subset of employees who are managers
	PayStructureIDs    []string
	PayComponentIDs    []string
	LeavePolicyIDs     []string
	ShiftIDs           []string
	HolidayIDs         []string
	BenefitPlanIDs     []string
	SalaryStructureIDs []string
	SalaryGradeIDs     []string
	BonusPlanIDs       []string
	MeritCycleIDs      []string
	CourseIDs          []string
	CourseSessionIDs   []string

	// Phase 4: Employee-Dependent
	DocumentIDs             []string
	TimesheetIDs            []string
	LeaveBalanceIDs         []string
	BenefitEnrollmentIDs    []string
	EmployeeSkillIDs        []string
	PerformanceReviewIDs    []string
	GoalIDs                 []string
	EmployeeCompensationIDs []string

	// Phase 5: Transaction Objects
	PayrollRunIDs       []string
	PayslipIDs          []string
	TaxWithholdingIDs   []string
	DirectDepositIDs    []string
	GarnishmentIDs      []string
	YearEndDocumentIDs  []string
	LeaveRequestIDs     []string
	ScheduleIDs         []string
	AbsenceIDs          []string
	DependentIDs        []string
	LifeEventIDs        []string
	COBRAEventIDs       []string
	ComplianceRecordIDs []string
	MeritIncreaseIDs    []string
	BonusPaymentIDs     []string
	EquityGrantIDs      []string
	CompStatementIDs    []string
	MarketBenchmarkIDs  []string
	CourseEnrollmentIDs []string
	EmpCertificationIDs []string
	TrainingRecordIDs   []string
	FeedbackIDs         []string
	OnboardingTaskIDs   []string

	// Phase 6: Talent Acquisition
	JobRequisitionIDs []string
	ApplicantIDs      []string
	ApplicationIDs    []string
	SuccessionPlanIDs []string
	CareerPathIDs     []string

	// FIN Phase 1: Foundation
	CurrencyIDs        []string
	FiscalYearIDs      []string
	AssetCategoryIDs   []string
	TaxJurisdictionIDs []string

	// FIN Phase 2: Core Financial
	FiscalPeriodIDs []string
	AccountIDs      []string
	TaxCodeIDs      []string

	// FIN Phase 3: Entity Master
	VendorIDs          []string
	VendorContactIDs   []string
	CustomerIDs        []string
	CustomerContactIDs []string
	BankAccountIDs     []string
	ExchangeRateIDs    []string

	// FIN Phase 4: Configuration
	TaxRuleIDs        []string
	TaxExemptionIDs   []string
	WHTaxConfigIDs    []string
	BudgetIDs         []string
	BudgetLineIDs     []string
	BudgetTransferIDs []string
	BudgetScenarioIDs []string
	CapExIDs          []string
	ForecastIDs       []string

	// FIN Phase 5: AP Transactions
	PurchaseInvoiceIDs     []string
	PurchaseInvoiceLineIDs []string
	PaymentScheduleIDs     []string
	VendorPaymentIDs       []string
	PaymentAllocationIDs   []string
	VendorStatementIDs     []string

	// FIN Phase 6: AR Transactions
	SalesInvoiceIDs     []string
	SalesInvoiceLineIDs []string
	CustomerPaymentIDs  []string
	PaymentAppIDs       []string
	CreditMemoIDs       []string
	DunningLetterIDs    []string

	// FIN Phase 7: GL Transactions
	JournalEntryIDs     []string
	JournalEntryLineIDs []string
	AccountBalanceIDs   []string

	// FIN Phase 8: Cash & Assets
	BankTransactionIDs  []string
	BankReconIDs        []string
	CashForecastIDs     []string
	FundTransferIDs     []string
	PettyCashIDs        []string
	AssetIDs            []string
	DepreciationIDs     []string
	AssetDisposalIDs    []string
	AssetTransferIDs    []string
	AssetMaintenanceIDs []string
	AssetRevaluationIDs []string

	// FIN Phase 9: Tax Filing
	TaxReturnIDs []string
}
