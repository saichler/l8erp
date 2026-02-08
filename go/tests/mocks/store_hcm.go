/*
© 2025 Sharon Aicler (saichler@gmail.com)
HCM module ID store for mock data generation
*/
package mocks

// HCMStore holds generated IDs for HCM module
type HCMStore struct {
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
}
