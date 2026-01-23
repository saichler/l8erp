package main

import (
	"bytes"
	"crypto/tls"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/saichler/l8erp/go/types/hcm"
)

// HCMClient handles API communication
type HCMClient struct {
	baseURL  string
	token    string
	client   *http.Client
}

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
	DocumentIDs            []string
	TimesheetIDs           []string
	LeaveBalanceIDs        []string
	BenefitEnrollmentIDs   []string
	EmployeeSkillIDs       []string
	PerformanceReviewIDs   []string
	GoalIDs                []string
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

var (
	firstNames = []string{
		"James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda",
		"David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
		"Thomas", "Sarah", "Christopher", "Karen", "Charles", "Lisa", "Daniel", "Nancy",
		"Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley",
		"Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle",
	}

	lastNames = []string{
		"Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
		"Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
		"Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
		"White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker",
	}

	streetNames = []string{
		"Main St", "Oak Ave", "Maple Dr", "Cedar Ln", "Pine Rd", "Elm St", "Park Ave",
		"Washington Blvd", "Lincoln Way", "Jefferson St", "Madison Ave", "Adams Dr",
	}

	cities = []string{
		"New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
		"San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
		"Fort Worth", "Columbus", "Charlotte", "Seattle", "Denver", "Boston", "Portland",
	}

	states = []string{
		"NY", "CA", "IL", "TX", "AZ", "PA", "FL", "OH", "NC", "WA", "CO", "MA", "OR",
	}

	jobFamilyNames = []string{
		"Engineering", "Finance", "Human Resources", "Marketing", "Sales",
		"Operations", "Legal", "Information Technology", "Research & Development",
		"Customer Service", "Quality Assurance", "Product Management",
	}

	jobTitles = map[string][]string{
		"Engineering": {"Software Engineer", "Senior Software Engineer", "Staff Engineer", "Engineering Manager", "Principal Engineer"},
		"Finance": {"Financial Analyst", "Senior Financial Analyst", "Finance Manager", "Controller", "CFO"},
		"Human Resources": {"HR Coordinator", "HR Specialist", "HR Manager", "HR Director", "CHRO"},
		"Marketing": {"Marketing Coordinator", "Marketing Manager", "Brand Manager", "CMO"},
		"Sales": {"Sales Representative", "Account Executive", "Sales Manager", "VP of Sales"},
		"Operations": {"Operations Coordinator", "Operations Manager", "Director of Operations", "COO"},
		"Information Technology": {"IT Support Specialist", "System Administrator", "IT Manager", "CTO"},
	}

	departmentNames = []string{
		"Engineering", "Finance", "Human Resources", "Marketing", "Sales",
		"Operations", "Legal", "IT", "R&D", "Customer Success", "Quality", "Product",
	}

	skillNames = []string{
		"Python", "JavaScript", "Java", "Go", "SQL", "AWS", "Docker", "Kubernetes",
		"Project Management", "Leadership", "Communication", "Data Analysis",
		"Machine Learning", "Cloud Architecture", "Agile Methodology", "Excel",
		"Public Speaking", "Negotiation", "Problem Solving", "Critical Thinking",
	}

	certificationNames = []string{
		"PMP - Project Management Professional",
		"AWS Solutions Architect",
		"Google Cloud Professional",
		"Certified Scrum Master",
		"SHRM-CP",
		"CPA - Certified Public Accountant",
		"Six Sigma Green Belt",
		"CISSP",
		"CompTIA Security+",
		"Microsoft Azure Administrator",
	}

	carrierNames = []string{
		"Blue Cross Blue Shield", "Aetna", "United Healthcare", "Cigna",
		"Kaiser Permanente", "Humana", "MetLife", "Delta Dental",
		"VSP Vision", "Guardian Life",
	}

	courseNames = []string{
		"Leadership Fundamentals", "Effective Communication", "Project Management Basics",
		"Advanced Excel", "Data Analytics Introduction", "Cybersecurity Awareness",
		"Diversity and Inclusion", "Time Management", "Public Speaking",
		"Conflict Resolution", "Team Building", "Strategic Planning",
	}
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

func (c *HCMClient) authenticate(user, password string) error {
	authData := map[string]string{
		"user": user,
		"pass": password,
	}
	body, _ := json.Marshal(authData)

	resp, err := c.client.Post(c.baseURL+"/auth", "application/json", bytes.NewReader(body))
	if err != nil {
		return fmt.Errorf("auth request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		respBody, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("auth failed with status %d: %s", resp.StatusCode, string(respBody))
	}

	var authResp map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&authResp); err != nil {
		return fmt.Errorf("failed to decode auth response: %w", err)
	}

	token, ok := authResp["token"].(string)
	if !ok {
		return fmt.Errorf("token not found in auth response")
	}
	c.token = token
	return nil
}

func (c *HCMClient) post(endpoint string, data interface{}) error {
	body, err := json.Marshal(data)
	if err != nil {
		return fmt.Errorf("failed to marshal data: %w", err)
	}

	req, err := http.NewRequest("POST", c.baseURL+endpoint, bytes.NewReader(body))
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+c.token)

	resp, err := c.client.Do(req)
	if err != nil {
		return fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		respBody, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("request failed with status %d: %s", resp.StatusCode, string(respBody))
	}

	return nil
}

// Phase 1: Foundation Objects (No Dependencies)
func generatePhase1(client *HCMClient, store *MockDataStore) error {
	// Generate Job Families
	fmt.Printf("  Creating Job Families...")
	jobFamilies := generateJobFamilies()
	if err := client.post("/erp/30/JobFamily", &hcm.JobFamilyList{List: jobFamilies}); err != nil {
		return fmt.Errorf("job families: %w", err)
	}
	for _, jf := range jobFamilies {
		store.JobFamilyIDs = append(store.JobFamilyIDs, jf.JobFamilyId)
	}
	fmt.Printf(" %d created\n", len(jobFamilies))

	// Generate Carriers
	fmt.Printf("  Creating Carriers...")
	carriers := generateCarriers()
	if err := client.post("/erp/30/Carrier", &hcm.CarrierList{List: carriers}); err != nil {
		return fmt.Errorf("carriers: %w", err)
	}
	for _, c := range carriers {
		store.CarrierIDs = append(store.CarrierIDs, c.CarrierId)
	}
	fmt.Printf(" %d created\n", len(carriers))

	// Generate Certifications
	fmt.Printf("  Creating Certifications...")
	certifications := generateCertifications()
	if err := client.post("/erp/30/Cert", &hcm.CertificationList{List: certifications}); err != nil {
		return fmt.Errorf("certifications: %w", err)
	}
	for _, c := range certifications {
		store.CertificationIDs = append(store.CertificationIDs, c.CertificationId)
	}
	fmt.Printf(" %d created\n", len(certifications))

	// Generate Skills
	fmt.Printf("  Creating Skills...")
	skills := generateSkills()
	if err := client.post("/erp/30/Skill", &hcm.SkillList{List: skills}); err != nil {
		return fmt.Errorf("skills: %w", err)
	}
	for _, s := range skills {
		store.SkillIDs = append(store.SkillIDs, s.SkillId)
	}
	fmt.Printf(" %d created\n", len(skills))

	return nil
}

// Phase 2: Core Organizational Structure
func generatePhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Organizations (hierarchical)
	fmt.Printf("  Creating Organizations...")
	organizations := generateOrganizations()
	if err := client.post("/erp/30/Org", &hcm.OrganizationList{List: organizations}); err != nil {
		return fmt.Errorf("organizations: %w", err)
	}
	for _, o := range organizations {
		store.OrganizationIDs = append(store.OrganizationIDs, o.OrganizationId)
	}
	fmt.Printf(" %d created\n", len(organizations))

	// Generate Jobs
	fmt.Printf("  Creating Jobs...")
	jobs := generateJobs(store)
	if err := client.post("/erp/30/Job", &hcm.JobList{List: jobs}); err != nil {
		return fmt.Errorf("jobs: %w", err)
	}
	for _, j := range jobs {
		store.JobIDs = append(store.JobIDs, j.JobId)
	}
	fmt.Printf(" %d created\n", len(jobs))

	// Generate Departments
	fmt.Printf("  Creating Departments...")
	departments := generateDepartments(store)
	if err := client.post("/erp/30/Dept", &hcm.DepartmentList{List: departments}); err != nil {
		return fmt.Errorf("departments: %w", err)
	}
	for _, d := range departments {
		store.DepartmentIDs = append(store.DepartmentIDs, d.DepartmentId)
	}
	fmt.Printf(" %d created\n", len(departments))

	// Generate Positions
	fmt.Printf("  Creating Positions...")
	positions := generatePositions(store)
	if err := client.post("/erp/30/Position", &hcm.PositionList{List: positions}); err != nil {
		return fmt.Errorf("positions: %w", err)
	}
	for _, p := range positions {
		store.PositionIDs = append(store.PositionIDs, p.PositionId)
	}
	fmt.Printf(" %d created\n", len(positions))

	return nil
}

// Phase 3: Employees & Configuration
func generatePhase3(client *HCMClient, store *MockDataStore) error {
	// Generate Employees (managers first, then others)
	fmt.Printf("  Creating Employees...")
	employees := generateEmployees(store)
	if err := client.post("/erp/30/Employee", &hcm.EmployeeList{List: employees}); err != nil {
		return fmt.Errorf("employees: %w", err)
	}
	for _, e := range employees {
		store.EmployeeIDs = append(store.EmployeeIDs, e.EmployeeId)
	}
	// First 10 employees are managers
	store.ManagerIDs = store.EmployeeIDs[:min(10, len(store.EmployeeIDs))]
	fmt.Printf(" %d created\n", len(employees))

	// Generate Pay Structures
	fmt.Printf("  Creating Pay Structures...")
	payStructures := generatePayStructures(store)
	if err := client.post("/erp/30/PayStruct", &hcm.PayStructureList{List: payStructures}); err != nil {
		return fmt.Errorf("pay structures: %w", err)
	}
	for _, ps := range payStructures {
		store.PayStructureIDs = append(store.PayStructureIDs, ps.PayStructureId)
	}
	fmt.Printf(" %d created\n", len(payStructures))

	// Generate Pay Components
	fmt.Printf("  Creating Pay Components...")
	payComponents := generatePayComponents(store)
	if err := client.post("/erp/30/PayComp", &hcm.PayComponentList{List: payComponents}); err != nil {
		return fmt.Errorf("pay components: %w", err)
	}
	for _, pc := range payComponents {
		store.PayComponentIDs = append(store.PayComponentIDs, pc.ComponentId)
	}
	fmt.Printf(" %d created\n", len(payComponents))

	// Generate Leave Policies
	fmt.Printf("  Creating Leave Policies...")
	leavePolicies := generateLeavePolicies(store)
	if err := client.post("/erp/30/LeavePol", &hcm.LeavePolicyList{List: leavePolicies}); err != nil {
		return fmt.Errorf("leave policies: %w", err)
	}
	for _, lp := range leavePolicies {
		store.LeavePolicyIDs = append(store.LeavePolicyIDs, lp.PolicyId)
	}
	fmt.Printf(" %d created\n", len(leavePolicies))

	// Generate Shifts
	fmt.Printf("  Creating Shifts...")
	shifts := generateShifts()
	if err := client.post("/erp/30/Shift", &hcm.ShiftList{List: shifts}); err != nil {
		return fmt.Errorf("shifts: %w", err)
	}
	for _, s := range shifts {
		store.ShiftIDs = append(store.ShiftIDs, s.ShiftId)
	}
	fmt.Printf(" %d created\n", len(shifts))

	// Generate Holidays
	fmt.Printf("  Creating Holidays...")
	holidays := generateHolidays(store)
	if err := client.post("/erp/30/Holiday", &hcm.HolidayList{List: holidays}); err != nil {
		return fmt.Errorf("holidays: %w", err)
	}
	for _, h := range holidays {
		store.HolidayIDs = append(store.HolidayIDs, h.HolidayId)
	}
	fmt.Printf(" %d created\n", len(holidays))

	// Generate Benefit Plans
	fmt.Printf("  Creating Benefit Plans...")
	benefitPlans := generateBenefitPlans(store)
	if err := client.post("/erp/30/BenPlan", &hcm.BenefitPlanList{List: benefitPlans}); err != nil {
		return fmt.Errorf("benefit plans: %w", err)
	}
	for _, bp := range benefitPlans {
		store.BenefitPlanIDs = append(store.BenefitPlanIDs, bp.PlanId)
	}
	fmt.Printf(" %d created\n", len(benefitPlans))

	// Generate Salary Structures
	fmt.Printf("  Creating Salary Structures...")
	salaryStructures := generateSalaryStructures(store)
	if err := client.post("/erp/30/SalStrct", &hcm.SalaryStructureList{List: salaryStructures}); err != nil {
		return fmt.Errorf("salary structures: %w", err)
	}
	for _, ss := range salaryStructures {
		store.SalaryStructureIDs = append(store.SalaryStructureIDs, ss.StructureId)
	}
	fmt.Printf(" %d created\n", len(salaryStructures))

	// Generate Salary Grades
	fmt.Printf("  Creating Salary Grades...")
	salaryGrades := generateSalaryGrades(store)
	if err := client.post("/erp/30/SalGrade", &hcm.SalaryGradeList{List: salaryGrades}); err != nil {
		return fmt.Errorf("salary grades: %w", err)
	}
	for _, sg := range salaryGrades {
		store.SalaryGradeIDs = append(store.SalaryGradeIDs, sg.GradeId)
	}
	fmt.Printf(" %d created\n", len(salaryGrades))

	// Generate Bonus Plans
	fmt.Printf("  Creating Bonus Plans...")
	bonusPlans := generateBonusPlans(store)
	if err := client.post("/erp/30/BonusPlan", &hcm.BonusPlanList{List: bonusPlans}); err != nil {
		return fmt.Errorf("bonus plans: %w", err)
	}
	for _, bp := range bonusPlans {
		store.BonusPlanIDs = append(store.BonusPlanIDs, bp.PlanId)
	}
	fmt.Printf(" %d created\n", len(bonusPlans))

	// Generate Merit Cycles
	fmt.Printf("  Creating Merit Cycles...")
	meritCycles := generateMeritCycles(store)
	if err := client.post("/erp/30/MrtCycle", &hcm.MeritCycleList{List: meritCycles}); err != nil {
		return fmt.Errorf("merit cycles: %w", err)
	}
	for _, mc := range meritCycles {
		store.MeritCycleIDs = append(store.MeritCycleIDs, mc.CycleId)
	}
	fmt.Printf(" %d created\n", len(meritCycles))

	// Generate Courses
	fmt.Printf("  Creating Courses...")
	courses := generateCourses(store)
	if err := client.post("/erp/30/Course", &hcm.CourseList{List: courses}); err != nil {
		return fmt.Errorf("courses: %w", err)
	}
	for _, c := range courses {
		store.CourseIDs = append(store.CourseIDs, c.CourseId)
	}
	fmt.Printf(" %d created\n", len(courses))

	// Generate Course Sessions
	fmt.Printf("  Creating Course Sessions...")
	sessions := generateCourseSessions(store)
	if err := client.post("/erp/30/CrsSess", &hcm.CourseSessionList{List: sessions}); err != nil {
		return fmt.Errorf("course sessions: %w", err)
	}
	for _, s := range sessions {
		store.CourseSessionIDs = append(store.CourseSessionIDs, s.SessionId)
	}
	fmt.Printf(" %d created\n", len(sessions))

	return nil
}

// Phase 4: Employee-Dependent Objects
func generatePhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Employee Documents
	fmt.Printf("  Creating Employee Documents...")
	documents := generateEmployeeDocuments(store)
	if err := client.post("/erp/30/EmpDoc", &hcm.EmployeeDocumentList{List: documents}); err != nil {
		return fmt.Errorf("employee documents: %w", err)
	}
	fmt.Printf(" %d created\n", len(documents))

	// Generate Timesheets
	fmt.Printf("  Creating Timesheets...")
	timesheets := generateTimesheets(store)
	if err := client.post("/erp/30/Timesheet", &hcm.TimesheetList{List: timesheets}); err != nil {
		return fmt.Errorf("timesheets: %w", err)
	}
	fmt.Printf(" %d created\n", len(timesheets))

	// Generate Leave Balances
	fmt.Printf("  Creating Leave Balances...")
	leaveBalances := generateLeaveBalances(store)
	if err := client.post("/erp/30/LeaveBal", &hcm.LeaveBalanceList{List: leaveBalances}); err != nil {
		return fmt.Errorf("leave balances: %w", err)
	}
	fmt.Printf(" %d created\n", len(leaveBalances))

	// Generate Benefit Enrollments
	fmt.Printf("  Creating Benefit Enrollments...")
	enrollments := generateBenefitEnrollments(store)
	if err := client.post("/erp/30/BenEnrol", &hcm.BenefitEnrollmentList{List: enrollments}); err != nil {
		return fmt.Errorf("benefit enrollments: %w", err)
	}
	fmt.Printf(" %d created\n", len(enrollments))

	// Generate Employee Skills
	fmt.Printf("  Creating Employee Skills...")
	empSkills := generateEmployeeSkills(store)
	if err := client.post("/erp/30/EmpSkill", &hcm.EmployeeSkillList{List: empSkills}); err != nil {
		return fmt.Errorf("employee skills: %w", err)
	}
	fmt.Printf(" %d created\n", len(empSkills))

	// Generate Performance Reviews
	fmt.Printf("  Creating Performance Reviews...")
	reviews := generatePerformanceReviews(store)
	if err := client.post("/erp/30/PerfRevw", &hcm.PerformanceReviewList{List: reviews}); err != nil {
		return fmt.Errorf("performance reviews: %w", err)
	}
	fmt.Printf(" %d created\n", len(reviews))

	// Generate Goals
	fmt.Printf("  Creating Goals...")
	goals := generateGoals(store)
	if err := client.post("/erp/30/Goal", &hcm.GoalList{List: goals}); err != nil {
		return fmt.Errorf("goals: %w", err)
	}
	fmt.Printf(" %d created\n", len(goals))

	// Generate Employee Compensation
	fmt.Printf("  Creating Employee Compensation...")
	empComp := generateEmployeeCompensation(store)
	if err := client.post("/erp/30/EmpComp", &hcm.EmployeeCompensationList{List: empComp}); err != nil {
		return fmt.Errorf("employee compensation: %w", err)
	}
	fmt.Printf(" %d created\n", len(empComp))

	return nil
}

// Generator functions

func generateJobFamilies() []*hcm.JobFamily {
	families := make([]*hcm.JobFamily, len(jobFamilyNames))
	for i, name := range jobFamilyNames {
		families[i] = &hcm.JobFamily{
			JobFamilyId: fmt.Sprintf("jf-%03d", i+1),
			Name:        name,
			Code:        fmt.Sprintf("JF%03d", i+1),
			Description: fmt.Sprintf("%s job family including related roles and career paths", name),
			IsActive:    true,
			AuditInfo:   createAuditInfo(),
		}
	}
	return families
}

func generateCarriers() []*hcm.Carrier {
	carriers := make([]*hcm.Carrier, len(carrierNames))
	for i, name := range carrierNames {
		carriers[i] = &hcm.Carrier{
			CarrierId:   fmt.Sprintf("car-%03d", i+1),
			Name:        name,
			Code:        fmt.Sprintf("CAR%03d", i+1),
			CarrierType: hcm.CarrierType(rand.Intn(4) + 1),
			ContactName: randomName(),
			Email:       fmt.Sprintf("contact@%s.com", sanitizeEmail(name)),
			Phone:       randomPhone(),
			Website:     fmt.Sprintf("https://www.%s.com", sanitizeEmail(name)),
			IsActive:    true,
			AuditInfo:   createAuditInfo(),
		}
	}
	return carriers
}

func generateCertifications() []*hcm.Certification {
	certs := make([]*hcm.Certification, len(certificationNames))
	for i, name := range certificationNames {
		certs[i] = &hcm.Certification{
			CertificationId:    fmt.Sprintf("cert-%03d", i+1),
			Name:               name,
			Code:               fmt.Sprintf("CERT%03d", i+1),
			IssuingOrganization: getIssuingOrg(name),
			Description:        fmt.Sprintf("Professional certification: %s", name),
			ValidityMonths:     int32(rand.Intn(24) + 12), // 12-36 months
			IsActive:           true,
			AuditInfo:          createAuditInfo(),
		}
	}
	return certs
}

func generateSkills() []*hcm.Skill {
	skills := make([]*hcm.Skill, len(skillNames))
	categories := []hcm.SkillCategory{
		hcm.SkillCategory_SKILL_CATEGORY_TECHNICAL,
		hcm.SkillCategory_SKILL_CATEGORY_SOFT_SKILL,
		hcm.SkillCategory_SKILL_CATEGORY_LEADERSHIP,
		hcm.SkillCategory_SKILL_CATEGORY_DOMAIN,
	}
	for i, name := range skillNames {
		skills[i] = &hcm.Skill{
			SkillId:     fmt.Sprintf("skill-%03d", i+1),
			Name:        name,
			Code:        fmt.Sprintf("SK%03d", i+1),
			Category:    categories[i%len(categories)],
			Description: fmt.Sprintf("Proficiency in %s", name),
			IsActive:    true,
			AuditInfo:   createAuditInfo(),
		}
	}
	return skills
}

func generateOrganizations() []*hcm.Organization {
	orgs := make([]*hcm.Organization, 0)

	// Root organization (company)
	rootOrg := &hcm.Organization{
		OrganizationId:   "org-001",
		Name:             "Acme Corporation",
		Code:             "ACME",
		OrganizationType: hcm.OrganizationType_ORGANIZATION_TYPE_COMPANY,
		LegalName:        "Acme Corporation Inc.",
		TaxId:            "12-3456789",
		IndustryCode:     "541511",
		Addresses:        []*hcm.Address{createAddress()},
		Contacts:         []*hcm.ContactInfo{createContact()},
		IsActive:         true,
		EffectiveDate:    time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
		AuditInfo:        createAuditInfo(),
	}
	orgs = append(orgs, rootOrg)

	// Child organizations (divisions)
	divisions := []string{"North America", "Europe", "Asia Pacific"}
	for i, name := range divisions {
		orgs = append(orgs, &hcm.Organization{
			OrganizationId:       fmt.Sprintf("org-%03d", i+2),
			ParentOrganizationId: "org-001",
			Name:                 name + " Division",
			Code:                 fmt.Sprintf("DIV%d", i+1),
			OrganizationType:     hcm.OrganizationType_ORGANIZATION_TYPE_DIVISION,
			IsActive:             true,
			EffectiveDate:        time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			AuditInfo:            createAuditInfo(),
		})
	}

	return orgs
}

func generateJobs(store *MockDataStore) []*hcm.Job {
	jobs := make([]*hcm.Job, 0)
	jobIndex := 1

	jobLevels := []string{"Entry", "Junior", "Mid", "Senior", "Principal"}
	for i, familyName := range jobFamilyNames {
		if titles, ok := jobTitles[familyName]; ok {
			for j, title := range titles {
				jobs = append(jobs, &hcm.Job{
					JobId:       fmt.Sprintf("job-%03d", jobIndex),
					JobFamilyId: store.JobFamilyIDs[i],
					Title:       title,
					JobCode:     fmt.Sprintf("JOB%03d", jobIndex),
					Description: fmt.Sprintf("Responsible for %s duties and responsibilities", title),
					JobLevel:    jobLevels[j%len(jobLevels)],
					IsActive:    true,
					AuditInfo:   createAuditInfo(),
				})
				jobIndex++
			}
		}
	}

	return jobs
}

func generateDepartments(store *MockDataStore) []*hcm.Department {
	depts := make([]*hcm.Department, len(departmentNames))
	for i, name := range departmentNames {
		depts[i] = &hcm.Department{
			DepartmentId:   fmt.Sprintf("dept-%03d", i+1),
			OrganizationId: store.OrganizationIDs[0],
			Name:           name,
			Code:           fmt.Sprintf("DEPT%03d", i+1),
			Description:    fmt.Sprintf("The %s department", name),
			IsActive:       true,
			EffectiveDate:  time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			AuditInfo:      createAuditInfo(),
		}
	}
	return depts
}

func generatePositions(store *MockDataStore) []*hcm.Position {
	positions := make([]*hcm.Position, 0)
	posIndex := 1

	// Create 3 positions per department
	for _, deptID := range store.DepartmentIDs {
		for j := 0; j < 3; j++ {
			jobID := store.JobIDs[rand.Intn(len(store.JobIDs))]
			positions = append(positions, &hcm.Position{
				PositionId:     fmt.Sprintf("pos-%03d", posIndex),
				DepartmentId:   deptID,
				OrganizationId: store.OrganizationIDs[0],
				JobId:          jobID,
				Title:          fmt.Sprintf("Position %d", posIndex),
				PositionCode:   fmt.Sprintf("POS%03d", posIndex),
				Status:         hcm.PositionStatus_POSITION_STATUS_OPEN,
				Headcount:      1,
				EffectiveDate:  time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
				AuditInfo:      createAuditInfo(),
			})
			posIndex++
		}
	}

	return positions
}

func generateEmployees(store *MockDataStore) []*hcm.Employee {
	employees := make([]*hcm.Employee, 50)

	for i := 0; i < 50; i++ {
		firstName := firstNames[rand.Intn(len(firstNames))]
		lastName := lastNames[rand.Intn(len(lastNames))]
		email := fmt.Sprintf("%s.%s@acme.com", sanitizeEmail(firstName), sanitizeEmail(lastName))

		deptIdx := i % len(store.DepartmentIDs)
		posIdx := i % len(store.PositionIDs)

		var managerID string
		if i >= 10 {
			// Non-managers have a manager
			managerID = fmt.Sprintf("emp-%03d", (i%10)+1)
		}

		employees[i] = &hcm.Employee{
			EmployeeId:       fmt.Sprintf("emp-%03d", i+1),
			EmployeeNumber:   fmt.Sprintf("E%05d", i+1),
			FirstName:        firstName,
			LastName:         lastName,
			PreferredName:    firstName,
			DateOfBirth:      randomBirthDate(),
			Gender:           hcm.Gender(rand.Intn(2) + 1),
			MaritalStatus:    hcm.MaritalStatus(rand.Intn(4) + 1),
			Nationality:      "US",
			Citizenship:      "US",
			NationalId:       randomSSN(),
			NationalIdType:   "SSN",
			Addresses:        []*hcm.Address{createAddress()},
			Contacts: []*hcm.ContactInfo{
				{
					ContactType: hcm.ContactType_CONTACT_TYPE_EMAIL_WORK,
					Value:       email,
					IsPrimary:   true,
				},
				{
					ContactType: hcm.ContactType_CONTACT_TYPE_PHONE_MOBILE,
					Value:       randomPhone(),
					IsPrimary:   false,
				},
			},
			EmploymentStatus: hcm.EmploymentStatus_EMPLOYMENT_STATUS_ACTIVE,
			EmploymentType:   hcm.EmploymentType_EMPLOYMENT_TYPE_FULL_TIME,
			HireDate:         randomHireDate(),
			OrganizationId:   store.OrganizationIDs[0],
			DepartmentId:     store.DepartmentIDs[deptIdx],
			PositionId:       store.PositionIDs[posIdx],
			JobId:            store.JobIDs[rand.Intn(len(store.JobIDs))],
			ManagerId:        managerID,
			AuditInfo:        createAuditInfo(),
		}
	}

	return employees
}

func generatePayStructures(store *MockDataStore) []*hcm.PayStructure {
	structures := []*hcm.PayStructure{
		{
			PayStructureId: "pstr-001",
			OrganizationId: store.OrganizationIDs[0],
			Name:           "Standard Pay Structure",
			Code:           "PSTR001",
			Description:    "Standard compensation structure for all employees",
			CurrencyCode:   "USD",
			PayFrequency:   hcm.PayFrequency_PAY_FREQUENCY_BI_WEEKLY,
			EffectiveDate:  time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			IsActive:       true,
			AuditInfo:      createAuditInfo(),
		},
		{
			PayStructureId: "pstr-002",
			OrganizationId: store.OrganizationIDs[0],
			Name:           "Executive Pay Structure",
			Code:           "PSTR002",
			Description:    "Compensation structure for executives",
			CurrencyCode:   "USD",
			PayFrequency:   hcm.PayFrequency_PAY_FREQUENCY_MONTHLY,
			EffectiveDate:  time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			IsActive:       true,
			AuditInfo:      createAuditInfo(),
		},
	}
	return structures
}

func generatePayComponents(store *MockDataStore) []*hcm.PayComponent {
	components := []*hcm.PayComponent{
		{
			ComponentId:   "pc-001",
			Name:          "Base Salary",
			Code:          "BASE",
			ComponentType: hcm.PayComponentType_PAY_COMPONENT_TYPE_EARNING,
			Description:   "Base salary component",
			IsTaxable:     true,
			IsActive:      true,
			AuditInfo:     createAuditInfo(),
		},
		{
			ComponentId:   "pc-002",
			Name:          "Performance Bonus",
			Code:          "BONUS",
			ComponentType: hcm.PayComponentType_PAY_COMPONENT_TYPE_EARNING,
			Description:   "Annual performance bonus",
			IsTaxable:     true,
			IsActive:      true,
			AuditInfo:     createAuditInfo(),
		},
		{
			ComponentId:   "pc-003",
			Name:          "401k Deduction",
			Code:          "401K",
			ComponentType: hcm.PayComponentType_PAY_COMPONENT_TYPE_DEDUCTION,
			Description:   "401k retirement contribution",
			IsPreTax:      true,
			IsActive:      true,
			AuditInfo:     createAuditInfo(),
		},
		{
			ComponentId:   "pc-004",
			Name:          "Health Insurance",
			Code:          "HEALTH",
			ComponentType: hcm.PayComponentType_PAY_COMPONENT_TYPE_EMPLOYER_CONTRIBUTION,
			Description:   "Health insurance premium - employer contribution",
			IsPreTax:      true,
			IsActive:      true,
			AuditInfo:     createAuditInfo(),
		},
	}
	return components
}

func generateLeavePolicies(store *MockDataStore) []*hcm.LeavePolicy {
	policies := []*hcm.LeavePolicy{
		{
			PolicyId:         "lp-001",
			OrganizationId:   store.OrganizationIDs[0],
			Name:             "Standard PTO Policy",
			Code:             "PTO-STD",
			LeaveType:        hcm.LeaveType_LEAVE_TYPE_PTO,
			Description:      "Standard paid time off policy",
			MaximumAccrual:   120, // 15 days * 8 hours
			AllowCarryover:   true,
			MaximumCarryover: 40, // 5 days * 8 hours
			AccrualRate:      10, // hours per month
			AccrualFrequency: hcm.AccrualFrequency_ACCRUAL_FREQUENCY_MONTHLY,
			RequireApproval:  true,
			AuditInfo:        createAuditInfo(),
		},
		{
			PolicyId:         "lp-002",
			OrganizationId:   store.OrganizationIDs[0],
			Name:             "Sick Leave Policy",
			Code:             "SICK-STD",
			LeaveType:        hcm.LeaveType_LEAVE_TYPE_SICK,
			Description:      "Standard sick leave policy",
			MaximumAccrual:   80, // 10 days * 8 hours
			AllowCarryover:   true,
			MaximumCarryover: 24, // 3 days * 8 hours
			AccrualRate:      6.67, // hours per month
			AccrualFrequency: hcm.AccrualFrequency_ACCRUAL_FREQUENCY_MONTHLY,
			RequireApproval:  true,
			AuditInfo:        createAuditInfo(),
		},
	}
	return policies
}

func generateShifts() []*hcm.Shift {
	// Helper to convert hour to Unix timestamp (seconds from midnight)
	hourToSeconds := func(hour int) int64 {
		return int64(hour * 3600)
	}

	shifts := []*hcm.Shift{
		{
			ShiftId:              "shift-001",
			Name:                 "Day Shift",
			Code:                 "DAY",
			Description:          "Standard day shift 9am-5pm",
			StartTime:            hourToSeconds(9),  // 9:00 AM
			EndTime:              hourToSeconds(17), // 5:00 PM
			DurationHours:        8.0,
			BreakDurationMinutes: 60,
			ShiftType:            hcm.ShiftType_SHIFT_TYPE_DAY,
			IsActive:             true,
			AuditInfo:            createAuditInfo(),
		},
		{
			ShiftId:              "shift-002",
			Name:                 "Swing Shift",
			Code:                 "SWING",
			Description:          "Swing shift 4pm-12am",
			StartTime:            hourToSeconds(16), // 4:00 PM
			EndTime:              hourToSeconds(0),  // 12:00 AM
			DurationHours:        8.0,
			BreakDurationMinutes: 60,
			ShiftType:            hcm.ShiftType_SHIFT_TYPE_DAY,
			IsOvernight:          true,
			IsActive:             true,
			AuditInfo:            createAuditInfo(),
		},
		{
			ShiftId:              "shift-003",
			Name:                 "Night Shift",
			Code:                 "NIGHT",
			Description:          "Night shift 12am-8am",
			StartTime:            hourToSeconds(0), // 12:00 AM
			EndTime:              hourToSeconds(8), // 8:00 AM
			DurationHours:        8.0,
			BreakDurationMinutes: 60,
			ShiftType:            hcm.ShiftType_SHIFT_TYPE_NIGHT,
			IsActive:             true,
			AuditInfo:            createAuditInfo(),
		},
	}
	return shifts
}

func generateHolidays(store *MockDataStore) []*hcm.Holiday {
	holidays := []*hcm.Holiday{
		{HolidayId: "hol-001", OrganizationId: store.OrganizationIDs[0], Name: "New Year's Day", Date: time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(), HolidayType: hcm.HolidayType_HOLIDAY_TYPE_FIXED, IsPaid: true, AuditInfo: createAuditInfo()},
		{HolidayId: "hol-002", OrganizationId: store.OrganizationIDs[0], Name: "MLK Day", Date: time.Date(2025, 1, 20, 0, 0, 0, 0, time.UTC).Unix(), HolidayType: hcm.HolidayType_HOLIDAY_TYPE_FIXED, IsPaid: true, AuditInfo: createAuditInfo()},
		{HolidayId: "hol-003", OrganizationId: store.OrganizationIDs[0], Name: "Presidents Day", Date: time.Date(2025, 2, 17, 0, 0, 0, 0, time.UTC).Unix(), HolidayType: hcm.HolidayType_HOLIDAY_TYPE_FIXED, IsPaid: true, AuditInfo: createAuditInfo()},
		{HolidayId: "hol-004", OrganizationId: store.OrganizationIDs[0], Name: "Memorial Day", Date: time.Date(2025, 5, 26, 0, 0, 0, 0, time.UTC).Unix(), HolidayType: hcm.HolidayType_HOLIDAY_TYPE_FIXED, IsPaid: true, AuditInfo: createAuditInfo()},
		{HolidayId: "hol-005", OrganizationId: store.OrganizationIDs[0], Name: "Independence Day", Date: time.Date(2025, 7, 4, 0, 0, 0, 0, time.UTC).Unix(), HolidayType: hcm.HolidayType_HOLIDAY_TYPE_FIXED, IsPaid: true, AuditInfo: createAuditInfo()},
		{HolidayId: "hol-006", OrganizationId: store.OrganizationIDs[0], Name: "Labor Day", Date: time.Date(2025, 9, 1, 0, 0, 0, 0, time.UTC).Unix(), HolidayType: hcm.HolidayType_HOLIDAY_TYPE_FIXED, IsPaid: true, AuditInfo: createAuditInfo()},
		{HolidayId: "hol-007", OrganizationId: store.OrganizationIDs[0], Name: "Thanksgiving", Date: time.Date(2025, 11, 27, 0, 0, 0, 0, time.UTC).Unix(), HolidayType: hcm.HolidayType_HOLIDAY_TYPE_FIXED, IsPaid: true, AuditInfo: createAuditInfo()},
		{HolidayId: "hol-008", OrganizationId: store.OrganizationIDs[0], Name: "Christmas Day", Date: time.Date(2025, 12, 25, 0, 0, 0, 0, time.UTC).Unix(), HolidayType: hcm.HolidayType_HOLIDAY_TYPE_FIXED, IsPaid: true, AuditInfo: createAuditInfo()},
	}
	return holidays
}

func generateBenefitPlans(store *MockDataStore) []*hcm.BenefitPlan {
	plans := []*hcm.BenefitPlan{
		{
			PlanId:         "bplan-001",
			OrganizationId: store.OrganizationIDs[0],
			CarrierId:      store.CarrierIDs[0],
			Name:           "Gold Health Plan",
			Code:           "HEALTH-GOLD",
			PlanType:       hcm.BenefitPlanType_BENEFIT_PLAN_TYPE_MEDICAL,
			Description:    "Premium health coverage with low deductibles",
			PlanYear:       2025,
			IsActive:       true,
			EffectiveDate:  time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
		},
		{
			PlanId:         "bplan-002",
			OrganizationId: store.OrganizationIDs[0],
			CarrierId:      store.CarrierIDs[0],
			Name:           "Silver Health Plan",
			Code:           "HEALTH-SILVER",
			PlanType:       hcm.BenefitPlanType_BENEFIT_PLAN_TYPE_MEDICAL,
			Description:    "Standard health coverage",
			PlanYear:       2025,
			IsActive:       true,
			EffectiveDate:  time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
		},
		{
			PlanId:         "bplan-003",
			OrganizationId: store.OrganizationIDs[0],
			CarrierId:      store.CarrierIDs[7],
			Name:           "Dental Plan",
			Code:           "DENTAL-STD",
			PlanType:       hcm.BenefitPlanType_BENEFIT_PLAN_TYPE_DENTAL,
			Description:    "Standard dental coverage",
			PlanYear:       2025,
			IsActive:       true,
			EffectiveDate:  time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
		},
		{
			PlanId:         "bplan-004",
			OrganizationId: store.OrganizationIDs[0],
			CarrierId:      store.CarrierIDs[8],
			Name:           "Vision Plan",
			Code:           "VISION-STD",
			PlanType:       hcm.BenefitPlanType_BENEFIT_PLAN_TYPE_VISION,
			Description:    "Standard vision coverage",
			PlanYear:       2025,
			IsActive:       true,
			EffectiveDate:  time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
		},
	}
	return plans
}

func generateSalaryStructures(store *MockDataStore) []*hcm.SalaryStructure {
	structures := []*hcm.SalaryStructure{
		{
			StructureId:    "sstr-001",
			OrganizationId: store.OrganizationIDs[0],
			Name:           "2025 Salary Structure",
			Code:           "SAL2025",
			Description:    "Salary structure for fiscal year 2025",
			CurrencyCode:   "USD",
			PayFrequency:   hcm.PayFrequency_PAY_FREQUENCY_ANNUALLY,
			EffectiveDate:  time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			IsActive:       true,
			AuditInfo:      createAuditInfo(),
		},
	}
	return structures
}

func generateSalaryGrades(store *MockDataStore) []*hcm.SalaryGrade {
	grades := make([]*hcm.SalaryGrade, 0)
	baseRanges := []struct {
		level string
		min   int64 // In cents
		mid   int64
		max   int64
	}{
		{"L1", 4000000, 5000000, 6000000},     // $40k-$60k
		{"L2", 5500000, 7000000, 8500000},     // $55k-$85k
		{"L3", 7500000, 9500000, 11500000},    // $75k-$115k
		{"L4", 10000000, 13000000, 16000000},  // $100k-$160k
		{"L5", 14000000, 18000000, 22000000},  // $140k-$220k
		{"L6", 19000000, 25000000, 31000000},  // $190k-$310k
	}

	for i, r := range baseRanges {
		grades = append(grades, &hcm.SalaryGrade{
			GradeId:           fmt.Sprintf("grade-%03d", i+1),
			OrganizationId:    store.OrganizationIDs[0],
			SalaryStructureId: store.SalaryStructureIDs[0],
			Name:              fmt.Sprintf("Grade %s", r.level),
			GradeCode:         r.level,
			Level:             int32(i + 1),
			Minimum:           &hcm.Money{Amount: r.min, CurrencyCode: "USD"},
			Midpoint:          &hcm.Money{Amount: r.mid, CurrencyCode: "USD"},
			Maximum:           &hcm.Money{Amount: r.max, CurrencyCode: "USD"},
			CurrencyCode:      "USD",
			PayFrequency:      hcm.PayFrequency_PAY_FREQUENCY_ANNUALLY,
			IsActive:          true,
			EffectiveDate:     time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			AuditInfo:         createAuditInfo(),
		})
	}
	return grades
}

func generateBonusPlans(store *MockDataStore) []*hcm.BonusPlan {
	plans := []*hcm.BonusPlan{
		{
			PlanId:            "bonus-001",
			OrganizationId:    store.OrganizationIDs[0],
			Name:              "Annual Performance Bonus",
			Code:              "APB",
			Description:       "Annual bonus based on individual and company performance",
			PlanType:          hcm.BonusPlanType_BONUS_PLAN_TYPE_PERFORMANCE,
			PlanYear:          2025,
			Frequency:         hcm.BonusFrequency_BONUS_FREQUENCY_ANNUAL,
			TargetPercentage:  10.0,
			MaximumPercentage: 20.0,
			EffectiveDate:     time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
		},
		{
			PlanId:            "bonus-002",
			OrganizationId:    store.OrganizationIDs[0],
			Name:              "Quarterly Sales Bonus",
			Code:              "QSB",
			Description:       "Quarterly bonus for sales team based on targets",
			PlanType:          hcm.BonusPlanType_BONUS_PLAN_TYPE_SALES_COMMISSION,
			PlanYear:          2025,
			Frequency:         hcm.BonusFrequency_BONUS_FREQUENCY_QUARTERLY,
			TargetPercentage:  15.0,
			MaximumPercentage: 30.0,
			EffectiveDate:     time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
		},
	}
	return plans
}

func generateMeritCycles(store *MockDataStore) []*hcm.MeritCycle {
	cycles := []*hcm.MeritCycle{
		{
			CycleId:           "mcycle-001",
			OrganizationId:    store.OrganizationIDs[0],
			Name:              "2025 Merit Cycle",
			Year:              2025,
			PlanningStartDate: time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			PlanningEndDate:   time.Date(2025, 3, 31, 0, 0, 0, 0, time.UTC).Unix(),
			EffectiveDate:     time.Date(2025, 4, 1, 0, 0, 0, 0, time.UTC).Unix(),
			BudgetPercentage:  3.5,
			Status:            hcm.MeritCycleStatus_MERIT_CYCLE_STATUS_PLANNING,
			Notes:             "Annual merit increase cycle for 2025",
			AuditInfo:         createAuditInfo(),
		},
	}
	return cycles
}

func generateCourses(store *MockDataStore) []*hcm.Course {
	courses := make([]*hcm.Course, len(courseNames))
	deliveryMethods := []hcm.CourseDeliveryMethod{
		hcm.CourseDeliveryMethod_COURSE_DELIVERY_METHOD_INSTRUCTOR_LED,
		hcm.CourseDeliveryMethod_COURSE_DELIVERY_METHOD_E_LEARNING,
		hcm.CourseDeliveryMethod_COURSE_DELIVERY_METHOD_BLENDED,
	}

	for i, name := range courseNames {
		courses[i] = &hcm.Course{
			CourseId:        fmt.Sprintf("course-%03d", i+1),
			OrganizationId:  store.OrganizationIDs[0],
			Title:           name,
			Code:            fmt.Sprintf("CRS%03d", i+1),
			Description:     fmt.Sprintf("Training course: %s", name),
			DeliveryMethod:  deliveryMethods[i%len(deliveryMethods)],
			DurationMinutes: int32((rand.Intn(4) + 1) * 60), // 1-4 hours
			IsActive:        true,
			AuditInfo:       createAuditInfo(),
		}
	}
	return courses
}

func generateCourseSessions(store *MockDataStore) []*hcm.CourseSession {
	sessions := make([]*hcm.CourseSession, 0)
	sessionIdx := 1

	// Create 2 sessions per course
	for _, courseID := range store.CourseIDs {
		for j := 0; j < 2; j++ {
			startDate := time.Now().AddDate(0, j+1, 0)
			sessions = append(sessions, &hcm.CourseSession{
				SessionId:    fmt.Sprintf("sess-%03d", sessionIdx),
				CourseId:     courseID,
				StartDate:    startDate.Unix(),
				EndDate:      startDate.Add(4 * time.Hour).Unix(),
				Location:     cities[rand.Intn(len(cities))],
				MaxEnrollees: int32(rand.Intn(15) + 10),
				Status:       hcm.SessionStatus_SESSION_STATUS_SCHEDULED,
				AuditInfo:    createAuditInfo(),
			})
			sessionIdx++
		}
	}
	return sessions
}

func generateEmployeeDocuments(store *MockDataStore) []*hcm.EmployeeDocument {
	docs := make([]*hcm.EmployeeDocument, 0)
	docTypes := []hcm.DocumentType{
		hcm.DocumentType_DOCUMENT_TYPE_RESUME,
		hcm.DocumentType_DOCUMENT_TYPE_CONTRACT,
		hcm.DocumentType_DOCUMENT_TYPE_ID_CARD,
	}

	// Create 1-2 documents per employee
	for i, empID := range store.EmployeeIDs {
		numDocs := rand.Intn(2) + 1
		for j := 0; j < numDocs; j++ {
			docType := docTypes[rand.Intn(len(docTypes))]
			docs = append(docs, &hcm.EmployeeDocument{
				DocumentId:   fmt.Sprintf("doc-%03d-%d", i+1, j+1),
				EmployeeId:   empID,
				DocumentType: docType,
				Name:         fmt.Sprintf("%s_%s", empID, docType.String()),
				Description:  fmt.Sprintf("Employee document: %s", docType.String()),
				UploadDate:   time.Now().AddDate(0, -rand.Intn(12), 0).Unix(),
				AuditInfo:    createAuditInfo(),
			})
		}
	}
	return docs
}

func generateTimesheets(store *MockDataStore) []*hcm.Timesheet {
	timesheets := make([]*hcm.Timesheet, 0)
	tsIdx := 1

	// Create 1 timesheet per employee for current week
	weekStart := time.Now().AddDate(0, 0, -int(time.Now().Weekday()))
	weekStart = time.Date(weekStart.Year(), weekStart.Month(), weekStart.Day(), 0, 0, 0, 0, time.UTC)

	for _, empID := range store.EmployeeIDs {
		entries := make([]*hcm.TimeEntry, 5) // Mon-Fri
		for d := 0; d < 5; d++ {
			entries[d] = &hcm.TimeEntry{
				EntryId:    fmt.Sprintf("te-%03d-%d", tsIdx, d+1),
				EmployeeId: empID,
				Date:       weekStart.AddDate(0, 0, d).Unix(),
				Hours:      8.0,
				EntryType:  hcm.TimeEntryType_TIME_ENTRY_TYPE_REGULAR,
			}
		}

		timesheets = append(timesheets, &hcm.Timesheet{
			TimesheetId: fmt.Sprintf("ts-%03d", tsIdx),
			EmployeeId:  empID,
			Period: &hcm.DateRange{
				StartDate: weekStart.Unix(),
				EndDate:   weekStart.AddDate(0, 0, 6).Unix(),
			},
			Status:            hcm.TimesheetStatus_TIMESHEET_STATUS_SUBMITTED,
			TotalRegularHours: 40.0,
			TotalHours:        40.0,
			Entries:           entries,
			AuditInfo:         createAuditInfo(),
		})
		tsIdx++
	}
	return timesheets
}

func generateLeaveBalances(store *MockDataStore) []*hcm.LeaveBalance {
	balances := make([]*hcm.LeaveBalance, 0)
	balIdx := 1

	leaveTypes := []hcm.LeaveType{
		hcm.LeaveType_LEAVE_TYPE_PTO,
		hcm.LeaveType_LEAVE_TYPE_SICK,
	}

	for _, empID := range store.EmployeeIDs {
		for i, policyID := range store.LeavePolicyIDs {
			accrued := float64(rand.Intn(80) + 40)   // 40-120 hours
			used := float64(rand.Intn(20))
			carryover := float64(rand.Intn(16))

			balances = append(balances, &hcm.LeaveBalance{
				BalanceId:       fmt.Sprintf("lbal-%03d", balIdx),
				EmployeeId:      empID,
				LeavePolicyId:   policyID,
				LeaveType:       leaveTypes[i%len(leaveTypes)],
				Year:            2025,
				BeginningBalance: carryover,
				Accrued:         accrued,
				Used:            used,
				Pending:         float64(rand.Intn(8)),
				Available:       carryover + accrued - used,
				Carryover:       carryover,
				AnnualAllowance: 120,
				AuditInfo:       createAuditInfo(),
			})
			balIdx++
		}
	}
	return balances
}

func generateBenefitEnrollments(store *MockDataStore) []*hcm.BenefitEnrollment {
	enrollments := make([]*hcm.BenefitEnrollment, 0)
	enrolIdx := 1

	// Each employee enrolls in 1-2 benefit plans
	for _, empID := range store.EmployeeIDs {
		numPlans := rand.Intn(2) + 1
		usedPlans := make(map[int]bool)

		for j := 0; j < numPlans; j++ {
			planIdx := rand.Intn(len(store.BenefitPlanIDs))
			if usedPlans[planIdx] {
				continue
			}
			usedPlans[planIdx] = true

			enrollments = append(enrollments, &hcm.BenefitEnrollment{
				EnrollmentId:      fmt.Sprintf("benrol-%03d", enrolIdx),
				EmployeeId:        empID,
				PlanId:            store.BenefitPlanIDs[planIdx],
				Status:            hcm.EnrollmentStatus_ENROLLMENT_STATUS_ACTIVE,
				Reason:            hcm.EnrollmentReason_ENROLLMENT_REASON_NEW_HIRE,
				EnrollmentDate:    time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
				CoverageStartDate: time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
				AuditInfo:         createAuditInfo(),
			})
			enrolIdx++
		}
	}
	return enrollments
}

func generateEmployeeSkills(store *MockDataStore) []*hcm.EmployeeSkill {
	skills := make([]*hcm.EmployeeSkill, 0)
	skillIdx := 1

	// Each employee has 3-5 skills
	for _, empID := range store.EmployeeIDs {
		numSkills := rand.Intn(3) + 3
		usedSkills := make(map[int]bool)

		for j := 0; j < numSkills; j++ {
			skillIdxRand := rand.Intn(len(store.SkillIDs))
			if usedSkills[skillIdxRand] {
				continue
			}
			usedSkills[skillIdxRand] = true

			skills = append(skills, &hcm.EmployeeSkill{
				EmployeeSkillId:  fmt.Sprintf("empskill-%03d", skillIdx),
				EmployeeId:       empID,
				SkillId:          store.SkillIDs[skillIdxRand],
				ProficiencyLevel: int32(rand.Intn(4) + 1), // 1-5 scale
				YearsOfExperience: int32(rand.Intn(10) + 1),
				IsPrimarySkill:   j == 0,
				AuditInfo:        createAuditInfo(),
			})
			skillIdx++
		}
	}
	return skills
}

func generatePerformanceReviews(store *MockDataStore) []*hcm.PerformanceReview {
	reviews := make([]*hcm.PerformanceReview, 0)
	reviewIdx := 1

	// Create a review for each non-manager employee
	for i, empID := range store.EmployeeIDs {
		if i < 10 {
			continue // Skip managers
		}

		managerID := store.ManagerIDs[i%len(store.ManagerIDs)]

		reviews = append(reviews, &hcm.PerformanceReview{
			ReviewId:   fmt.Sprintf("review-%03d", reviewIdx),
			EmployeeId: empID,
			ReviewerId: managerID,
			ReviewPeriod: &hcm.DateRange{
				StartDate: time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
				EndDate:   time.Date(2024, 12, 31, 0, 0, 0, 0, time.UTC).Unix(),
			},
			ReviewType:      hcm.ReviewType_REVIEW_TYPE_ANNUAL,
			Status:          hcm.PerformanceReviewStatus_PERFORMANCE_REVIEW_STATUS_COMPLETED,
			OverallRating:   int32(rand.Intn(3) + 2), // 2-4 rating (1-5 scale)
			ManagerComments: "Good performance throughout the year.",
			AuditInfo:       createAuditInfo(),
		})
		reviewIdx++
	}
	return reviews
}

func generateGoals(store *MockDataStore) []*hcm.Goal {
	goals := make([]*hcm.Goal, 0)
	goalIdx := 1
	goalTypes := []string{
		"Increase productivity by 15%",
		"Complete certification",
		"Lead project initiative",
		"Mentor junior team members",
		"Improve customer satisfaction scores",
	}

	for _, empID := range store.EmployeeIDs {
		numGoals := rand.Intn(2) + 2 // 2-3 goals
		for j := 0; j < numGoals; j++ {
			goalType := goalTypes[rand.Intn(len(goalTypes))]
			goals = append(goals, &hcm.Goal{
				GoalId:               fmt.Sprintf("goal-%03d", goalIdx),
				EmployeeId:           empID,
				Title:                goalType,
				Description:          fmt.Sprintf("Employee goal: %s", goalType),
				GoalType:             hcm.GoalType(rand.Intn(3) + 1),
				Priority:             hcm.GoalPriority(rand.Intn(3) + 1),
				Status:               hcm.GoalStatus_GOAL_STATUS_ACTIVE,
				CompletionPercentage: float64(rand.Intn(80) + 10),
				StartDate:            time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
				DueDate:              time.Date(2025, 12, 31, 0, 0, 0, 0, time.UTC).Unix(),
				Weight:               float64(rand.Intn(30) + 20),
				AuditInfo:            createAuditInfo(),
			})
			goalIdx++
		}
	}
	return goals
}

func generateEmployeeCompensation(store *MockDataStore) []*hcm.EmployeeCompensation {
	comps := make([]*hcm.EmployeeCompensation, 0)
	compIdx := 1

	baseSalaries := []float64{55000, 70000, 85000, 100000, 120000, 150000}

	for _, empID := range store.EmployeeIDs {
		baseSalary := baseSalaries[rand.Intn(len(baseSalaries))]
		gradeIdx := 0
		if len(store.SalaryGradeIDs) > 0 {
			gradeIdx = rand.Intn(len(store.SalaryGradeIDs))
		}

		comps = append(comps, &hcm.EmployeeCompensation{
			CompensationId: fmt.Sprintf("comp-%03d", compIdx),
			EmployeeId:     empID,
			SalaryGradeId:  store.SalaryGradeIDs[gradeIdx],
			BaseSalary: &hcm.Money{
				Amount:       int64(baseSalary * 100), // Convert to cents
				CurrencyCode: "USD",
			},
			CurrencyCode:  "USD",
			PayFrequency:  hcm.PayFrequency_PAY_FREQUENCY_BI_WEEKLY,
			EffectiveDate: time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			ChangeReason:  "Annual Compensation Review",
			AuditInfo:     createAuditInfo(),
		})
		compIdx++
	}
	return comps
}

// Phase 5: Transaction & Additional Objects
func generatePhase5(client *HCMClient, store *MockDataStore) error {
	// PayrollRun
	fmt.Printf("  Creating Payroll Runs...")
	payrollRuns := generatePayrollRuns(store)
	if err := client.post("/erp/30/PayRun", &hcm.PayrollRunList{List: payrollRuns}); err != nil {
		return fmt.Errorf("payroll runs: %w", err)
	}
	for _, pr := range payrollRuns {
		store.PayrollRunIDs = append(store.PayrollRunIDs, pr.PayrollRunId)
	}
	fmt.Printf(" %d created\n", len(payrollRuns))

	// Payslip
	fmt.Printf("  Creating Payslips...")
	payslips := generatePayslips(store)
	if err := client.post("/erp/30/Payslip", &hcm.PayslipList{List: payslips}); err != nil {
		return fmt.Errorf("payslips: %w", err)
	}
	for _, ps := range payslips {
		store.PayslipIDs = append(store.PayslipIDs, ps.PayslipId)
	}
	fmt.Printf(" %d created\n", len(payslips))

	// TaxWithholding
	fmt.Printf("  Creating Tax Withholdings...")
	taxWithholdings := generateTaxWithholdings(store)
	if err := client.post("/erp/30/TaxWith", &hcm.TaxWithholdingList{List: taxWithholdings}); err != nil {
		return fmt.Errorf("tax withholdings: %w", err)
	}
	for _, tw := range taxWithholdings {
		store.TaxWithholdingIDs = append(store.TaxWithholdingIDs, tw.WithholdingId)
	}
	fmt.Printf(" %d created\n", len(taxWithholdings))

	// DirectDeposit
	fmt.Printf("  Creating Direct Deposits...")
	directDeposits := generateDirectDeposits(store)
	if err := client.post("/erp/30/DirDep", &hcm.DirectDepositList{List: directDeposits}); err != nil {
		return fmt.Errorf("direct deposits: %w", err)
	}
	for _, dd := range directDeposits {
		store.DirectDepositIDs = append(store.DirectDepositIDs, dd.DirectDepositId)
	}
	fmt.Printf(" %d created\n", len(directDeposits))

	// Garnishment (only a few employees)
	fmt.Printf("  Creating Garnishments...")
	garnishments := generateGarnishments(store)
	if err := client.post("/erp/30/Garnish", &hcm.GarnishmentList{List: garnishments}); err != nil {
		return fmt.Errorf("garnishments: %w", err)
	}
	for _, g := range garnishments {
		store.GarnishmentIDs = append(store.GarnishmentIDs, g.GarnishmentId)
	}
	fmt.Printf(" %d created\n", len(garnishments))

	// YearEndDocument
	fmt.Printf("  Creating Year-End Documents...")
	yearEndDocs := generateYearEndDocuments(store)
	if err := client.post("/erp/30/YrEndDoc", &hcm.YearEndDocumentList{List: yearEndDocs}); err != nil {
		return fmt.Errorf("year-end documents: %w", err)
	}
	for _, yed := range yearEndDocs {
		store.YearEndDocumentIDs = append(store.YearEndDocumentIDs, yed.DocumentId)
	}
	fmt.Printf(" %d created\n", len(yearEndDocs))

	// LeaveRequest
	fmt.Printf("  Creating Leave Requests...")
	leaveRequests := generateLeaveRequests(store)
	if err := client.post("/erp/30/LeaveReq", &hcm.LeaveRequestList{List: leaveRequests}); err != nil {
		return fmt.Errorf("leave requests: %w", err)
	}
	for _, lr := range leaveRequests {
		store.LeaveRequestIDs = append(store.LeaveRequestIDs, lr.RequestId)
	}
	fmt.Printf(" %d created\n", len(leaveRequests))

	// Schedule
	fmt.Printf("  Creating Schedules...")
	schedules := generateSchedules(store)
	if err := client.post("/erp/30/Schedule", &hcm.ScheduleList{List: schedules}); err != nil {
		return fmt.Errorf("schedules: %w", err)
	}
	for _, s := range schedules {
		store.ScheduleIDs = append(store.ScheduleIDs, s.ScheduleId)
	}
	fmt.Printf(" %d created\n", len(schedules))

	// Absence
	fmt.Printf("  Creating Absences...")
	absences := generateAbsences(store)
	if err := client.post("/erp/30/Absence", &hcm.AbsenceList{List: absences}); err != nil {
		return fmt.Errorf("absences: %w", err)
	}
	for _, a := range absences {
		store.AbsenceIDs = append(store.AbsenceIDs, a.AbsenceId)
	}
	fmt.Printf(" %d created\n", len(absences))

	// Dependent
	fmt.Printf("  Creating Dependents...")
	dependents := generateDependents(store)
	if err := client.post("/erp/30/Dependent", &hcm.DependentList{List: dependents}); err != nil {
		return fmt.Errorf("dependents: %w", err)
	}
	for _, d := range dependents {
		store.DependentIDs = append(store.DependentIDs, d.DependentId)
	}
	fmt.Printf(" %d created\n", len(dependents))

	// LifeEvent
	fmt.Printf("  Creating Life Events...")
	lifeEvents := generateLifeEvents(store)
	if err := client.post("/erp/30/LifeEvent", &hcm.LifeEventList{List: lifeEvents}); err != nil {
		return fmt.Errorf("life events: %w", err)
	}
	for _, le := range lifeEvents {
		store.LifeEventIDs = append(store.LifeEventIDs, le.LifeEventId)
	}
	fmt.Printf(" %d created\n", len(lifeEvents))

	// COBRAEvent
	fmt.Printf("  Creating COBRA Events...")
	cobraEvents := generateCOBRAEvents(store)
	if err := client.post("/erp/30/COBRAEvt", &hcm.COBRAEventList{List: cobraEvents}); err != nil {
		return fmt.Errorf("cobra events: %w", err)
	}
	for _, ce := range cobraEvents {
		store.COBRAEventIDs = append(store.COBRAEventIDs, ce.CobraEventId)
	}
	fmt.Printf(" %d created\n", len(cobraEvents))

	// ComplianceRecord
	fmt.Printf("  Creating Compliance Records...")
	complianceRecords := generateComplianceRecords(store)
	if err := client.post("/erp/30/CompRec", &hcm.ComplianceRecordList{List: complianceRecords}); err != nil {
		return fmt.Errorf("compliance records: %w", err)
	}
	for _, cr := range complianceRecords {
		store.ComplianceRecordIDs = append(store.ComplianceRecordIDs, cr.RecordId)
	}
	fmt.Printf(" %d created\n", len(complianceRecords))

	// MeritIncrease
	fmt.Printf("  Creating Merit Increases...")
	meritIncreases := generateMeritIncreases(store)
	if err := client.post("/erp/30/MeritInc", &hcm.MeritIncreaseList{List: meritIncreases}); err != nil {
		return fmt.Errorf("merit increases: %w", err)
	}
	for _, mi := range meritIncreases {
		store.MeritIncreaseIDs = append(store.MeritIncreaseIDs, mi.IncreaseId)
	}
	fmt.Printf(" %d created\n", len(meritIncreases))

	// BonusPayment
	fmt.Printf("  Creating Bonus Payments...")
	bonusPayments := generateBonusPayments(store)
	if err := client.post("/erp/30/BonusPay", &hcm.BonusPaymentList{List: bonusPayments}); err != nil {
		return fmt.Errorf("bonus payments: %w", err)
	}
	for _, bp := range bonusPayments {
		store.BonusPaymentIDs = append(store.BonusPaymentIDs, bp.PaymentId)
	}
	fmt.Printf(" %d created\n", len(bonusPayments))

	// EquityGrant
	fmt.Printf("  Creating Equity Grants...")
	equityGrants := generateEquityGrants(store)
	if err := client.post("/erp/30/EqGrant", &hcm.EquityGrantList{List: equityGrants}); err != nil {
		return fmt.Errorf("equity grants: %w", err)
	}
	for _, eg := range equityGrants {
		store.EquityGrantIDs = append(store.EquityGrantIDs, eg.GrantId)
	}
	fmt.Printf(" %d created\n", len(equityGrants))

	// CompensationStatement
	fmt.Printf("  Creating Compensation Statements...")
	compStatements := generateCompensationStatements(store)
	if err := client.post("/erp/30/CompStmt", &hcm.CompensationStatementList{List: compStatements}); err != nil {
		return fmt.Errorf("compensation statements: %w", err)
	}
	for _, cs := range compStatements {
		store.CompStatementIDs = append(store.CompStatementIDs, cs.StatementId)
	}
	fmt.Printf(" %d created\n", len(compStatements))

	// MarketBenchmark
	fmt.Printf("  Creating Market Benchmarks...")
	benchmarks := generateMarketBenchmarks(store)
	if err := client.post("/erp/30/MktBench", &hcm.MarketBenchmarkList{List: benchmarks}); err != nil {
		return fmt.Errorf("market benchmarks: %w", err)
	}
	for _, mb := range benchmarks {
		store.MarketBenchmarkIDs = append(store.MarketBenchmarkIDs, mb.BenchmarkId)
	}
	fmt.Printf(" %d created\n", len(benchmarks))

	// CourseEnrollment
	fmt.Printf("  Creating Course Enrollments...")
	courseEnrollments := generateCourseEnrollments(store)
	if err := client.post("/erp/30/CrsEnrol", &hcm.CourseEnrollmentList{List: courseEnrollments}); err != nil {
		return fmt.Errorf("course enrollments: %w", err)
	}
	for _, ce := range courseEnrollments {
		store.CourseEnrollmentIDs = append(store.CourseEnrollmentIDs, ce.EnrollmentId)
	}
	fmt.Printf(" %d created\n", len(courseEnrollments))

	// EmployeeCertification
	fmt.Printf("  Creating Employee Certifications...")
	empCertifications := generateEmployeeCertifications(store)
	if err := client.post("/erp/30/EmpCert", &hcm.EmployeeCertificationList{List: empCertifications}); err != nil {
		return fmt.Errorf("employee certifications: %w", err)
	}
	for _, ec := range empCertifications {
		store.EmpCertificationIDs = append(store.EmpCertificationIDs, ec.EmployeeCertificationId)
	}
	fmt.Printf(" %d created\n", len(empCertifications))

	// TrainingRecord
	fmt.Printf("  Creating Training Records...")
	trainingRecords := generateTrainingRecords(store)
	if err := client.post("/erp/30/TrnRec", &hcm.TrainingRecordList{List: trainingRecords}); err != nil {
		return fmt.Errorf("training records: %w", err)
	}
	for _, tr := range trainingRecords {
		store.TrainingRecordIDs = append(store.TrainingRecordIDs, tr.RecordId)
	}
	fmt.Printf(" %d created\n", len(trainingRecords))

	// Feedback
	fmt.Printf("  Creating Feedback...")
	feedback := generateFeedback(store)
	if err := client.post("/erp/30/Feedback", &hcm.FeedbackList{List: feedback}); err != nil {
		return fmt.Errorf("feedback: %w", err)
	}
	for _, f := range feedback {
		store.FeedbackIDs = append(store.FeedbackIDs, f.FeedbackId)
	}
	fmt.Printf(" %d created\n", len(feedback))

	// OnboardingTask
	fmt.Printf("  Creating Onboarding Tasks...")
	onboardingTasks := generateOnboardingTasks(store)
	if err := client.post("/erp/30/OnbrdTsk", &hcm.OnboardingTaskList{List: onboardingTasks}); err != nil {
		return fmt.Errorf("onboarding tasks: %w", err)
	}
	for _, ot := range onboardingTasks {
		store.OnboardingTaskIDs = append(store.OnboardingTaskIDs, ot.TaskId)
	}
	fmt.Printf(" %d created\n", len(onboardingTasks))

	return nil
}

// Phase 6: Talent Acquisition
func generatePhase6(client *HCMClient, store *MockDataStore) error {
	// JobRequisition
	fmt.Printf("  Creating Job Requisitions...")
	requisitions := generateJobRequisitions(store)
	if err := client.post("/erp/30/JobReq", &hcm.JobRequisitionList{List: requisitions}); err != nil {
		return fmt.Errorf("job requisitions: %w", err)
	}
	for _, jr := range requisitions {
		store.JobRequisitionIDs = append(store.JobRequisitionIDs, jr.RequisitionId)
	}
	fmt.Printf(" %d created\n", len(requisitions))

	// Applicant
	fmt.Printf("  Creating Applicants...")
	applicants := generateApplicants(store)
	if err := client.post("/erp/30/Applicant", &hcm.ApplicantList{List: applicants}); err != nil {
		return fmt.Errorf("applicants: %w", err)
	}
	for _, a := range applicants {
		store.ApplicantIDs = append(store.ApplicantIDs, a.ApplicantId)
	}
	fmt.Printf(" %d created\n", len(applicants))

	// Application
	fmt.Printf("  Creating Applications...")
	applications := generateApplications(store)
	if err := client.post("/erp/30/Applctn", &hcm.ApplicationList{List: applications}); err != nil {
		return fmt.Errorf("applications: %w", err)
	}
	for _, a := range applications {
		store.ApplicationIDs = append(store.ApplicationIDs, a.ApplicationId)
	}
	fmt.Printf(" %d created\n", len(applications))

	// SuccessionPlan
	fmt.Printf("  Creating Succession Plans...")
	successionPlans := generateSuccessionPlans(store)
	if err := client.post("/erp/30/SuccPlan", &hcm.SuccessionPlanList{List: successionPlans}); err != nil {
		return fmt.Errorf("succession plans: %w", err)
	}
	for _, sp := range successionPlans {
		store.SuccessionPlanIDs = append(store.SuccessionPlanIDs, sp.PlanId)
	}
	fmt.Printf(" %d created\n", len(successionPlans))

	// CareerPath
	fmt.Printf("  Creating Career Paths...")
	careerPaths := generateCareerPaths(store)
	if err := client.post("/erp/30/CarPath", &hcm.CareerPathList{List: careerPaths}); err != nil {
		return fmt.Errorf("career paths: %w", err)
	}
	for _, cp := range careerPaths {
		store.CareerPathIDs = append(store.CareerPathIDs, cp.CareerPathId)
	}
	fmt.Printf(" %d created\n", len(careerPaths))

	return nil
}

// ============================================================================
// NEW GENERATORS FOR PHASE 5
// ============================================================================

func generatePayrollRuns(store *MockDataStore) []*hcm.PayrollRun {
	runs := make([]*hcm.PayrollRun, 0)
	runIdx := 1

	// Create 12 months of payroll runs for each org
	for _, orgID := range store.OrganizationIDs {
		for month := 1; month <= 12; month++ {
			periodStart := time.Date(2024, time.Month(month), 1, 0, 0, 0, 0, time.UTC)
			periodEnd := periodStart.AddDate(0, 1, -1)
			paymentDate := periodEnd.AddDate(0, 0, 5)

			runs = append(runs, &hcm.PayrollRun{
				PayrollRunId:   fmt.Sprintf("payrun-%03d", runIdx),
				OrganizationId: orgID,
				Name:           fmt.Sprintf("%s %d Payroll", periodStart.Month().String(), 2024),
				PayPeriod: &hcm.PayPeriod{
					StartDate: periodStart.Unix(),
					EndDate:   periodEnd.Unix(),
				},
				Status:         hcm.PayrollRunStatus_PAYROLL_RUN_STATUS_COMPLETED,
				RunType:        hcm.PayrollRunType_PAYROLL_RUN_TYPE_REGULAR,
				ScheduledDate:  periodEnd.Unix(),
				ProcessingDate: periodEnd.Unix(),
				PaymentDate:    paymentDate.Unix(),
				EmployeeCount:  int32(len(store.EmployeeIDs) / len(store.OrganizationIDs)),
				TotalGross:     &hcm.Money{Amount: int64(rand.Intn(500000) + 100000) * 100, CurrencyCode: "USD"},
				TotalNet:       &hcm.Money{Amount: int64(rand.Intn(400000) + 80000) * 100, CurrencyCode: "USD"},
				ProcessedBy:    "System",
				AuditInfo:      createAuditInfo(),
			})
			runIdx++
		}
	}
	return runs
}

func generatePayslips(store *MockDataStore) []*hcm.Payslip {
	slips := make([]*hcm.Payslip, 0)
	slipIdx := 1

	// Create payslips for last 3 months for each employee
	for _, empID := range store.EmployeeIDs {
		for month := 10; month <= 12; month++ {
			periodStart := time.Date(2024, time.Month(month), 1, 0, 0, 0, 0, time.UTC)
			periodEnd := periodStart.AddDate(0, 1, -1)
			paymentDate := periodEnd.AddDate(0, 0, 5)

			grossPay := int64(rand.Intn(8000)+4000) * 100
			taxes := grossPay * 25 / 100
			deductions := grossPay * 10 / 100
			netPay := grossPay - taxes - deductions

			slips = append(slips, &hcm.Payslip{
				PayslipId:    fmt.Sprintf("payslip-%05d", slipIdx),
				PayrollRunId: store.PayrollRunIDs[rand.Intn(len(store.PayrollRunIDs))],
				EmployeeId:   empID,
				PayPeriod: &hcm.PayPeriod{
					StartDate: periodStart.Unix(),
					EndDate:   periodEnd.Unix(),
				},
				PaymentDate:   paymentDate.Unix(),
				RegularHours:  80,
				OvertimeHours: float64(rand.Intn(10)),
				TotalHours:    80 + float64(rand.Intn(10)),
				GrossPay:      &hcm.Money{Amount: grossPay, CurrencyCode: "USD"},
				TotalTaxes:    &hcm.Money{Amount: taxes, CurrencyCode: "USD"},
				TotalDeductions: &hcm.Money{Amount: deductions, CurrencyCode: "USD"},
				NetPay:        &hcm.Money{Amount: netPay, CurrencyCode: "USD"},
				AuditInfo:     createAuditInfo(),
			})
			slipIdx++
		}
	}
	return slips
}

func generateTaxWithholdings(store *MockDataStore) []*hcm.TaxWithholding {
	withholdings := make([]*hcm.TaxWithholding, 0)
	idx := 1

	for _, empID := range store.EmployeeIDs {
		// Federal withholding
		withholdings = append(withholdings, &hcm.TaxWithholding{
			WithholdingId:   fmt.Sprintf("taxwh-%04d", idx),
			EmployeeId:      empID,
			TaxType:         hcm.TaxType_TAX_TYPE_FEDERAL_INCOME,
			TaxJurisdiction: "Federal",
			FormVersion:     "W-4 2024",
			FilingStatus:    hcm.FilingStatus(rand.Intn(3) + 1),
			UseNewW4:        true,
			EffectiveDate:   time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			SignedDate:      time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			AuditInfo:       createAuditInfo(),
		})
		idx++

		// State withholding
		withholdings = append(withholdings, &hcm.TaxWithholding{
			WithholdingId:   fmt.Sprintf("taxwh-%04d", idx),
			EmployeeId:      empID,
			TaxType:         hcm.TaxType_TAX_TYPE_STATE_INCOME,
			TaxJurisdiction: states[rand.Intn(len(states))],
			FilingStatus:    hcm.FilingStatus(rand.Intn(3) + 1),
			EffectiveDate:   time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			SignedDate:      time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			AuditInfo:       createAuditInfo(),
		})
		idx++
	}
	return withholdings
}

func generateDirectDeposits(store *MockDataStore) []*hcm.DirectDeposit {
	deposits := make([]*hcm.DirectDeposit, 0)
	idx := 1
	bankNames := []string{"Chase Bank", "Bank of America", "Wells Fargo", "Citibank", "US Bank", "PNC Bank"}

	for _, empID := range store.EmployeeIDs {
		deposits = append(deposits, &hcm.DirectDeposit{
			DirectDepositId:     fmt.Sprintf("dd-%04d", idx),
			EmployeeId:          empID,
			AccountName:         "Primary Checking",
			BankName:            bankNames[rand.Intn(len(bankNames))],
			RoutingNumber:       fmt.Sprintf("%09d", rand.Intn(900000000)+100000000),
			AccountNumberMasked: fmt.Sprintf("****%04d", rand.Intn(10000)),
			AccountType:         hcm.AccountType_ACCOUNT_TYPE_CHECKING,
			DepositType:         hcm.DepositType_DEPOSIT_TYPE_FULL,
			Priority:            1,
			IsActive:            true,
			IsPrenoteComplete:   true,
			EffectiveDate:       time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			AuditInfo:           createAuditInfo(),
		})
		idx++
	}
	return deposits
}

func generateGarnishments(store *MockDataStore) []*hcm.Garnishment {
	garnishments := make([]*hcm.Garnishment, 0)
	idx := 1

	// Only 5% of employees have garnishments
	numGarnishments := len(store.EmployeeIDs) / 20
	if numGarnishments < 1 {
		numGarnishments = 1
	}

	for i := 0; i < numGarnishments; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		garnishments = append(garnishments, &hcm.Garnishment{
			GarnishmentId:    fmt.Sprintf("garn-%03d", idx),
			EmployeeId:       empID,
			GarnishmentType:  hcm.GarnishmentType(rand.Intn(4) + 1),
			CaseNumber:       fmt.Sprintf("CASE-%06d", rand.Intn(1000000)),
			IssuingAuthority: "State Court",
			PayeeName:        "State Collections",
			TotalAmountOwed:  &hcm.Money{Amount: int64(rand.Intn(10000)+1000) * 100, CurrencyCode: "USD"},
			AmountPerPeriod:  &hcm.Money{Amount: int64(rand.Intn(500)+100) * 100, CurrencyCode: "USD"},
			StartDate:        time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			Priority:         1,
			Status:           hcm.GarnishmentStatus_GARNISHMENT_STATUS_ACTIVE,
			AuditInfo:        createAuditInfo(),
		})
		idx++
	}
	return garnishments
}

func generateYearEndDocuments(store *MockDataStore) []*hcm.YearEndDocument {
	docs := make([]*hcm.YearEndDocument, 0)
	idx := 1

	for _, empID := range store.EmployeeIDs {
		// W-2 for each employee
		docs = append(docs, &hcm.YearEndDocument{
			DocumentId:     fmt.Sprintf("yed-%05d", idx),
			EmployeeId:     empID,
			TaxYear:        2024,
			DocumentType:   hcm.YearEndDocumentType_YEAR_END_DOCUMENT_TYPE_W2,
			OrganizationId: store.OrganizationIDs[rand.Intn(len(store.OrganizationIDs))],
			Status:         hcm.YearEndDocumentStatus_YEAR_END_DOCUMENT_STATUS_ISSUED,
			GeneratedDate:  time.Date(2025, 1, 15, 0, 0, 0, 0, time.UTC).Unix(),
			IssuedDate:     time.Date(2025, 1, 20, 0, 0, 0, 0, time.UTC).Unix(),
			AuditInfo:      createAuditInfo(),
		})
		idx++
	}
	return docs
}

func generateLeaveRequests(store *MockDataStore) []*hcm.LeaveRequest {
	requests := make([]*hcm.LeaveRequest, 0)
	idx := 1

	for _, empID := range store.EmployeeIDs {
		// 1-3 leave requests per employee
		numRequests := rand.Intn(3) + 1
		for j := 0; j < numRequests; j++ {
			startDate := time.Date(2024, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)
			days := rand.Intn(5) + 1
			endDate := startDate.AddDate(0, 0, days)

			requests = append(requests, &hcm.LeaveRequest{
				RequestId:     fmt.Sprintf("leavereq-%05d", idx),
				EmployeeId:    empID,
				LeavePolicyId: store.LeavePolicyIDs[rand.Intn(len(store.LeavePolicyIDs))],
				StartDate:     startDate.Unix(),
				EndDate:       endDate.Unix(),
				TotalDays:     float64(days),
				Status:        hcm.LeaveRequestStatus(rand.Intn(4) + 1),
				Reason:        "Personal time off",
				AuditInfo:     createAuditInfo(),
			})
			idx++
		}
	}
	return requests
}

func generateSchedules(store *MockDataStore) []*hcm.Schedule {
	schedules := make([]*hcm.Schedule, 0)
	idx := 1

	for _, empID := range store.EmployeeIDs {
		periodStart := time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC)
		periodEnd := time.Date(2024, 12, 31, 0, 0, 0, 0, time.UTC)

		schedules = append(schedules, &hcm.Schedule{
			ScheduleId: fmt.Sprintf("sched-%04d", idx),
			EmployeeId: empID,
			Period: &hcm.DateRange{
				StartDate: periodStart.Unix(),
				EndDate:   periodEnd.Unix(),
			},
			Status:              hcm.ScheduleStatus_SCHEDULE_STATUS_PUBLISHED,
			TotalScheduledHours: 2080, // Standard work year
			PublishedDate:       time.Now().Unix(),
			AuditInfo:           createAuditInfo(),
		})
		idx++
	}
	return schedules
}

func generateAbsences(store *MockDataStore) []*hcm.Absence {
	absences := make([]*hcm.Absence, 0)
	idx := 1

	leaveTypes := []hcm.LeaveType{
		hcm.LeaveType_LEAVE_TYPE_PTO,
		hcm.LeaveType_LEAVE_TYPE_VACATION,
		hcm.LeaveType_LEAVE_TYPE_SICK,
		hcm.LeaveType_LEAVE_TYPE_PERSONAL,
	}

	// Some employees have absences
	for i := 0; i < len(store.EmployeeIDs)/2; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		absenceDate := time.Date(2024, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)

		absences = append(absences, &hcm.Absence{
			AbsenceId:   fmt.Sprintf("abs-%04d", idx),
			EmployeeId:  empID,
			Date:        absenceDate.Unix(),
			AbsenceType: leaveTypes[rand.Intn(len(leaveTypes))],
			Hours:       8,
			Status:      hcm.AbsenceStatus_ABSENCE_STATUS_TAKEN,
			AuditInfo:   createAuditInfo(),
		})
		idx++
	}
	return absences
}

func generateDependents(store *MockDataStore) []*hcm.Dependent {
	dependents := make([]*hcm.Dependent, 0)
	idx := 1
	relationships := []hcm.DependentRelationship{
		hcm.DependentRelationship_DEPENDENT_RELATIONSHIP_SPOUSE,
		hcm.DependentRelationship_DEPENDENT_RELATIONSHIP_CHILD,
		hcm.DependentRelationship_DEPENDENT_RELATIONSHIP_DOMESTIC_PARTNER,
	}

	// 60% of employees have dependents
	for i := 0; i < len(store.EmployeeIDs)*6/10; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		numDeps := rand.Intn(3) + 1

		for j := 0; j < numDeps; j++ {
			dependents = append(dependents, &hcm.Dependent{
				DependentId:        fmt.Sprintf("dep-%04d", idx),
				EmployeeId:         empID,
				FirstName:          firstNames[rand.Intn(len(firstNames))],
				LastName:           lastNames[rand.Intn(len(lastNames))],
				Relationship:       relationships[rand.Intn(len(relationships))],
				DateOfBirth:        randomBirthDate(),
				Gender:             hcm.Gender(rand.Intn(2) + 1),
				VerificationStatus: hcm.VerificationStatus_VERIFICATION_STATUS_VERIFIED,
				AuditInfo:          createAuditInfo(),
			})
			idx++
		}
	}
	return dependents
}

func generateLifeEvents(store *MockDataStore) []*hcm.LifeEvent {
	events := make([]*hcm.LifeEvent, 0)
	idx := 1
	eventTypes := []hcm.LifeEventType{
		hcm.LifeEventType_LIFE_EVENT_TYPE_MARRIAGE,
		hcm.LifeEventType_LIFE_EVENT_TYPE_BIRTH,
		hcm.LifeEventType_LIFE_EVENT_TYPE_ADOPTION,
		hcm.LifeEventType_LIFE_EVENT_TYPE_DIVORCE,
	}

	// 20% of employees had life events
	for i := 0; i < len(store.EmployeeIDs)/5; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		eventDate := time.Date(2024, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)

		events = append(events, &hcm.LifeEvent{
			LifeEventId:        fmt.Sprintf("life-%04d", idx),
			EmployeeId:         empID,
			EventType:          eventTypes[rand.Intn(len(eventTypes))],
			EventDate:          eventDate.Unix(),
			Status:             hcm.LifeEventStatus_LIFE_EVENT_STATUS_APPROVED,
			EnrollmentDeadline: eventDate.AddDate(0, 0, 30).Unix(),
			AuditInfo:          createAuditInfo(),
		})
		idx++
	}
	return events
}

func generateCOBRAEvents(store *MockDataStore) []*hcm.COBRAEvent {
	events := make([]*hcm.COBRAEvent, 0)
	idx := 1
	eventTypes := []hcm.COBRAEventType{
		hcm.COBRAEventType_COBRA_EVENT_TYPE_TERMINATION,
		hcm.COBRAEventType_COBRA_EVENT_TYPE_HOURS_REDUCTION,
		hcm.COBRAEventType_COBRA_EVENT_TYPE_DIVORCE,
	}

	// 5% of employees have COBRA events (former employees or dependents)
	numEvents := len(store.EmployeeIDs) / 20
	if numEvents < 1 {
		numEvents = 1
	}

	for i := 0; i < numEvents; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		qualifyingDate := time.Date(2024, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)
		notificationDate := qualifyingDate.AddDate(0, 0, 14)
		monthlyPremium := int64(rand.Intn(1000)+500) * 100

		events = append(events, &hcm.COBRAEvent{
			CobraEventId:        fmt.Sprintf("cobra-%04d", idx),
			EmployeeId:          empID,
			EventType:           eventTypes[rand.Intn(len(eventTypes))],
			QualifyingEventDate: qualifyingDate.Unix(),
			NotificationDate:    notificationDate.Unix(),
			ElectionDeadline:    notificationDate.AddDate(0, 0, 60).Unix(),
			CoverageStartDate:   qualifyingDate.Unix(),
			CoverageEndDate:     qualifyingDate.AddDate(0, 18, 0).Unix(),
			CoverageMonths:      18,
			Status:              hcm.COBRAStatus_COBRA_STATUS_NOTIFIED,
			MonthlyPremium:      &hcm.Money{Amount: monthlyPremium, CurrencyCode: "USD"},
			AdminFeePercentage:  2.0,
			TotalMonthlyCost:    &hcm.Money{Amount: int64(float64(monthlyPremium) * 1.02), CurrencyCode: "USD"},
			AuditInfo:           createAuditInfo(),
		})
		idx++
	}
	return events
}

func generateComplianceRecords(store *MockDataStore) []*hcm.ComplianceRecord {
	records := make([]*hcm.ComplianceRecord, 0)
	idx := 1
	complianceTypes := []hcm.ComplianceType{
		hcm.ComplianceType_COMPLIANCE_TYPE_I9,
		hcm.ComplianceType_COMPLIANCE_TYPE_BACKGROUND_CHECK,
		hcm.ComplianceType_COMPLIANCE_TYPE_DRUG_TEST,
		hcm.ComplianceType_COMPLIANCE_TYPE_WORK_AUTHORIZATION,
	}

	for _, empID := range store.EmployeeIDs {
		records = append(records, &hcm.ComplianceRecord{
			RecordId:       fmt.Sprintf("comp-%04d", idx),
			EmployeeId:     empID,
			ComplianceType: complianceTypes[rand.Intn(len(complianceTypes))],
			Status:         "Compliant",
			DueDate:        randomHireDate(),
			CompletionDate: randomHireDate(),
			ExpirationDate: time.Now().AddDate(1, 0, 0).Unix(),
			AuditInfo:      createAuditInfo(),
		})
		idx++
	}
	return records
}

func generateMeritIncreases(store *MockDataStore) []*hcm.MeritIncrease {
	increases := make([]*hcm.MeritIncrease, 0)
	idx := 1

	if len(store.MeritCycleIDs) == 0 || len(store.PerformanceReviewIDs) == 0 {
		return increases
	}

	// 70% of employees get merit increases
	for i := 0; i < len(store.EmployeeIDs)*7/10; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		currentSalary := int64(rand.Intn(50000)+50000) * 100
		increasePercent := float64(rand.Intn(5)+1) + float64(rand.Intn(100))/100
		proposedIncrease := int64(float64(currentSalary) * increasePercent / 100)

		increases = append(increases, &hcm.MeritIncrease{
			IncreaseId:         fmt.Sprintf("merit-%04d", idx),
			EmployeeId:         empID,
			MeritCycleId:       store.MeritCycleIDs[rand.Intn(len(store.MeritCycleIDs))],
			ReviewId:           store.PerformanceReviewIDs[rand.Intn(len(store.PerformanceReviewIDs))],
			CurrentSalary:      &hcm.Money{Amount: currentSalary, CurrencyCode: "USD"},
			ProposedIncrease:   &hcm.Money{Amount: proposedIncrease, CurrencyCode: "USD"},
			ProposedPercentage: increasePercent,
			NewSalary:          &hcm.Money{Amount: currentSalary + proposedIncrease, CurrencyCode: "USD"},
			EffectiveDate:      time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			Status:             hcm.MeritIncreaseStatus_MERIT_INCREASE_STATUS_APPROVED,
			AuditInfo:          createAuditInfo(),
		})
		idx++
	}
	return increases
}

func generateBonusPayments(store *MockDataStore) []*hcm.BonusPayment {
	payments := make([]*hcm.BonusPayment, 0)
	idx := 1

	if len(store.BonusPlanIDs) == 0 {
		return payments
	}

	// 50% of employees get bonus
	for i := 0; i < len(store.EmployeeIDs)/2; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		bonusAmount := int64(rand.Intn(10000)+1000) * 100
		payments = append(payments, &hcm.BonusPayment{
			PaymentId:    fmt.Sprintf("bonus-%04d", idx),
			EmployeeId:   empID,
			BonusPlanId:  store.BonusPlanIDs[rand.Intn(len(store.BonusPlanIDs))],
			TargetAmount: &hcm.Money{Amount: bonusAmount, CurrencyCode: "USD"},
			ActualAmount: &hcm.Money{Amount: bonusAmount, CurrencyCode: "USD"},
			AwardDate:    time.Date(2024, 12, 15, 0, 0, 0, 0, time.UTC).Unix(),
			PaymentDate:  time.Date(2024, 12, 20, 0, 0, 0, 0, time.UTC).Unix(),
			Status:       hcm.BonusPaymentStatus_BONUS_PAYMENT_STATUS_PAID,
			AuditInfo:    createAuditInfo(),
		})
		idx++
	}
	return payments
}

func generateEquityGrants(store *MockDataStore) []*hcm.EquityGrant {
	grants := make([]*hcm.EquityGrant, 0)
	idx := 1
	grantTypes := []hcm.EquityGrantType{
		hcm.EquityGrantType_EQUITY_GRANT_TYPE_ISO,
		hcm.EquityGrantType_EQUITY_GRANT_TYPE_RSU,
		hcm.EquityGrantType_EQUITY_GRANT_TYPE_NSO,
	}

	// 30% of employees get equity
	for i := 0; i < len(store.EmployeeIDs)*3/10; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		grantDate := time.Date(2024, time.Month(rand.Intn(12)+1), 1, 0, 0, 0, 0, time.UTC)
		sharesGranted := int64(rand.Intn(1000) + 100)

		grants = append(grants, &hcm.EquityGrant{
			GrantId:        fmt.Sprintf("equity-%04d", idx),
			EmployeeId:     empID,
			GrantType:      grantTypes[rand.Intn(len(grantTypes))],
			GrantDate:      grantDate.Unix(),
			SharesGranted:  sharesGranted,
			SharesUnvested: sharesGranted,
			VestStartDate:  grantDate.Unix(),
			Status:         hcm.EquityGrantStatus_EQUITY_GRANT_STATUS_ACTIVE,
			AuditInfo:      createAuditInfo(),
		})
		idx++
	}
	return grants
}

func generateCompensationStatements(store *MockDataStore) []*hcm.CompensationStatement {
	statements := make([]*hcm.CompensationStatement, 0)
	idx := 1

	for _, empID := range store.EmployeeIDs {
		baseSalary := int64(rand.Intn(100000)+50000) * 100
		bonusActual := int64(rand.Intn(20000)+5000) * 100
		benefitsValue := int64(rand.Intn(20000)+10000) * 100

		statements = append(statements, &hcm.CompensationStatement{
			StatementId:          fmt.Sprintf("compstmt-%04d", idx),
			EmployeeId:           empID,
			StatementYear:        2024,
			AsOfDate:             time.Date(2024, 12, 31, 0, 0, 0, 0, time.UTC).Unix(),
			BaseSalary:           &hcm.Money{Amount: baseSalary, CurrencyCode: "USD"},
			BonusActual:          &hcm.Money{Amount: bonusActual, CurrencyCode: "USD"},
			TotalCashCompensation: &hcm.Money{Amount: baseSalary + bonusActual, CurrencyCode: "USD"},
			TotalBenefitsValue:   &hcm.Money{Amount: benefitsValue, CurrencyCode: "USD"},
			TotalCompensation:    &hcm.Money{Amount: baseSalary + bonusActual + benefitsValue, CurrencyCode: "USD"},
			AuditInfo:            createAuditInfo(),
		})
		idx++
	}
	return statements
}

func generateMarketBenchmarks(store *MockDataStore) []*hcm.MarketBenchmark {
	benchmarks := make([]*hcm.MarketBenchmark, 0)
	idx := 1

	for _, jobID := range store.JobIDs {
		benchmarks = append(benchmarks, &hcm.MarketBenchmark{
			BenchmarkId:    fmt.Sprintf("bench-%03d", idx),
			JobId:          jobID,
			OrganizationId: store.OrganizationIDs[rand.Intn(len(store.OrganizationIDs))],
			EffectiveDate:  time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			SurveySource:   "Industry Survey",
			SurveyYear:     2024,
			Market_25Th:    &hcm.Money{Amount: int64(rand.Intn(30000)+40000) * 100, CurrencyCode: "USD"},
			Market_50Th:    &hcm.Money{Amount: int64(rand.Intn(40000)+60000) * 100, CurrencyCode: "USD"},
			Market_75Th:    &hcm.Money{Amount: int64(rand.Intn(50000)+90000) * 100, CurrencyCode: "USD"},
			AuditInfo:      createAuditInfo(),
		})
		idx++
	}
	return benchmarks
}

func generateCourseEnrollments(store *MockDataStore) []*hcm.CourseEnrollment {
	enrollments := make([]*hcm.CourseEnrollment, 0)
	idx := 1

	// 40% of employees enrolled in courses
	for i := 0; i < len(store.EmployeeIDs)*4/10; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		enrollDate := time.Date(2024, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)

		enrollments = append(enrollments, &hcm.CourseEnrollment{
			EnrollmentId: fmt.Sprintf("crsenrol-%04d", idx),
			EmployeeId:   empID,
			CourseId:     store.CourseIDs[rand.Intn(len(store.CourseIDs))],
			SessionId:    store.CourseSessionIDs[rand.Intn(len(store.CourseSessionIDs))],
			EnrolledDate: enrollDate.Unix(),
			Status:       hcm.CourseEnrollmentStatus(rand.Intn(4) + 1),
			AuditInfo:    createAuditInfo(),
		})
		idx++
	}
	return enrollments
}

func generateEmployeeCertifications(store *MockDataStore) []*hcm.EmployeeCertification {
	certs := make([]*hcm.EmployeeCertification, 0)
	idx := 1

	// 30% of employees have certifications
	for i := 0; i < len(store.EmployeeIDs)*3/10; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		issueDate := time.Date(2024-rand.Intn(5), time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)

		certs = append(certs, &hcm.EmployeeCertification{
			EmployeeCertificationId: fmt.Sprintf("empcert-%04d", idx),
			EmployeeId:              empID,
			CertificationId:         store.CertificationIDs[rand.Intn(len(store.CertificationIDs))],
			IssueDate:               issueDate.Unix(),
			ExpirationDate:          issueDate.AddDate(3, 0, 0).Unix(),
			Status:                  hcm.CertificationStatus_CERTIFICATION_STATUS_ACTIVE,
			AuditInfo:               createAuditInfo(),
		})
		idx++
	}
	return certs
}

func generateTrainingRecords(store *MockDataStore) []*hcm.TrainingRecord {
	records := make([]*hcm.TrainingRecord, 0)
	idx := 1
	trainingTypes := []hcm.TrainingType{
		hcm.TrainingType_TRAINING_TYPE_COMPLIANCE,
		hcm.TrainingType_TRAINING_TYPE_SAFETY,
		hcm.TrainingType_TRAINING_TYPE_SECURITY,
		hcm.TrainingType_TRAINING_TYPE_DIVERSITY,
	}

	// 50% of employees have training records
	for i := 0; i < len(store.EmployeeIDs)/2; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		completedDate := time.Date(2024, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)

		records = append(records, &hcm.TrainingRecord{
			RecordId:      fmt.Sprintf("train-%04d", idx),
			EmployeeId:    empID,
			CourseId:      store.CourseIDs[rand.Intn(len(store.CourseIDs))],
			TrainingType:  trainingTypes[rand.Intn(len(trainingTypes))],
			CompletedDate: completedDate.Unix(),
			IsCompliant:   true,
			Score:         int32(rand.Intn(30) + 70),
			Passed:        true,
			AuditInfo:     createAuditInfo(),
		})
		idx++
	}
	return records
}

func generateFeedback(store *MockDataStore) []*hcm.Feedback {
	feedbacks := make([]*hcm.Feedback, 0)
	idx := 1
	feedbackTypes := []hcm.FeedbackType{
		hcm.FeedbackType_FEEDBACK_TYPE_PEER,
		hcm.FeedbackType_FEEDBACK_TYPE_UPWARD,
		hcm.FeedbackType_FEEDBACK_TYPE_CONTINUOUS,
	}

	// Create feedback between employees
	for i := 0; i < len(store.EmployeeIDs)/3; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		providerID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		if empID == providerID {
			continue
		}

		feedbacks = append(feedbacks, &hcm.Feedback{
			FeedbackId:      fmt.Sprintf("fb-%04d", idx),
			EmployeeId:      empID,
			ProviderId:      providerID,
			FeedbackType:    feedbackTypes[rand.Intn(len(feedbackTypes))],
			GeneralComments: "Great collaboration and teamwork.",
			SubmittedDate:   time.Now().AddDate(0, -rand.Intn(6), 0).Unix(),
			Status:          hcm.FeedbackStatus_FEEDBACK_STATUS_SUBMITTED,
			AuditInfo:       createAuditInfo(),
		})
		idx++
	}
	return feedbacks
}

func generateOnboardingTasks(store *MockDataStore) []*hcm.OnboardingTask {
	tasks := make([]*hcm.OnboardingTask, 0)
	idx := 1
	taskNames := []string{
		"Complete I-9 Form",
		"Setup Direct Deposit",
		"Complete Benefits Enrollment",
		"Review Employee Handbook",
		"Complete IT Security Training",
		"Setup Workstation",
	}

	// Recent hires (10% of employees)
	numNewHires := len(store.EmployeeIDs) / 10
	if numNewHires < 1 {
		numNewHires = 1
	}

	for i := 0; i < numNewHires; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		for j, taskName := range taskNames {
			tasks = append(tasks, &hcm.OnboardingTask{
				TaskId:        fmt.Sprintf("onb-%05d", idx),
				EmployeeId:    empID,
				Name:          taskName,
				Description:   fmt.Sprintf("Complete: %s", taskName),
				DueDate:       time.Now().AddDate(0, 0, rand.Intn(30)).Unix(),
				Status:        hcm.OnboardingTaskStatus(rand.Intn(3) + 1),
				SequenceOrder: int32(j + 1),
				AuditInfo:     createAuditInfo(),
			})
			idx++
		}
	}
	return tasks
}

// ============================================================================
// NEW GENERATORS FOR PHASE 6
// ============================================================================

func generateJobRequisitions(store *MockDataStore) []*hcm.JobRequisition {
	requisitions := make([]*hcm.JobRequisition, 0)
	idx := 1

	// Create 10-20 open requisitions
	numReqs := rand.Intn(10) + 10
	for i := 0; i < numReqs; i++ {
		requisitions = append(requisitions, &hcm.JobRequisition{
			RequisitionId:   fmt.Sprintf("req-%03d", idx),
			OrganizationId:  store.OrganizationIDs[rand.Intn(len(store.OrganizationIDs))],
			DepartmentId:    store.DepartmentIDs[rand.Intn(len(store.DepartmentIDs))],
			JobId:           store.JobIDs[rand.Intn(len(store.JobIDs))],
			PositionId:      store.PositionIDs[rand.Intn(len(store.PositionIDs))],
			HiringManagerId: store.ManagerIDs[rand.Intn(len(store.ManagerIDs))],
			Title:           fmt.Sprintf("Open Position %d", idx),
			Status:          hcm.RequisitionStatus(rand.Intn(4) + 1),
			Openings:        int32(rand.Intn(3) + 1),
			TargetStartDate: time.Now().AddDate(0, rand.Intn(3)+1, 0).Unix(),
			AuditInfo:       createAuditInfo(),
		})
		idx++
	}
	return requisitions
}

func generateApplicants(store *MockDataStore) []*hcm.Applicant {
	applicants := make([]*hcm.Applicant, 0)
	idx := 1

	// Create 50-100 applicants
	numApplicants := rand.Intn(50) + 50
	for i := 0; i < numApplicants; i++ {
		applicants = append(applicants, &hcm.Applicant{
			ApplicantId: fmt.Sprintf("app-%04d", idx),
			FirstName:   firstNames[rand.Intn(len(firstNames))],
			LastName:    lastNames[rand.Intn(len(lastNames))],
			Email:       fmt.Sprintf("applicant%d@email.com", idx),
			Phone:       randomPhone(),
			Source:      hcm.ApplicantSource(rand.Intn(6) + 1),
			CreatedDate: time.Now().AddDate(0, 0, -rand.Intn(60)).Unix(),
			AuditInfo:   createAuditInfo(),
		})
		idx++
	}
	return applicants
}

func generateApplications(store *MockDataStore) []*hcm.Application {
	applications := make([]*hcm.Application, 0)
	idx := 1

	if len(store.JobRequisitionIDs) == 0 || len(store.ApplicantIDs) == 0 {
		return applications
	}

	// Each applicant applies to 1-3 positions
	for _, appID := range store.ApplicantIDs {
		numApplications := rand.Intn(3) + 1
		for j := 0; j < numApplications; j++ {
			applications = append(applications, &hcm.Application{
				ApplicationId: fmt.Sprintf("appl-%05d", idx),
				ApplicantId:   appID,
				RequisitionId: store.JobRequisitionIDs[rand.Intn(len(store.JobRequisitionIDs))],
				Status:        hcm.ApplicationStatus(rand.Intn(6) + 1),
				AppliedDate:   time.Now().AddDate(0, 0, -rand.Intn(30)).Unix(),
				AuditInfo:     createAuditInfo(),
			})
			idx++
		}
	}
	return applications
}

func generateSuccessionPlans(store *MockDataStore) []*hcm.SuccessionPlan {
	plans := make([]*hcm.SuccessionPlan, 0)
	idx := 1

	// Create succession plans for key positions (10% of positions)
	numPlans := len(store.PositionIDs) / 10
	if numPlans < 1 {
		numPlans = 1
	}

	for i := 0; i < numPlans; i++ {
		posID := store.PositionIDs[rand.Intn(len(store.PositionIDs))]
		incumbentID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]

		plans = append(plans, &hcm.SuccessionPlan{
			PlanId:         fmt.Sprintf("succ-%03d", idx),
			PositionId:     posID,
			IncumbentId:    incumbentID,
			Status:         hcm.SuccessionPlanStatus(rand.Intn(3) + 1),
			VacancyRisk:    hcm.RiskLevel(rand.Intn(3) + 1),
			ReviewDate:     time.Now().Unix(),
			NextReviewDate: time.Now().AddDate(0, 6, 0).Unix(),
			AuditInfo:      createAuditInfo(),
		})
		idx++
	}
	return plans
}

func generateCareerPaths(store *MockDataStore) []*hcm.CareerPath {
	paths := make([]*hcm.CareerPath, 0)
	idx := 1

	// Create career paths for each job family
	for _, jfID := range store.JobFamilyIDs {
		paths = append(paths, &hcm.CareerPath{
			CareerPathId: fmt.Sprintf("career-%03d", idx),
			JobFamilyId:  jfID,
			Name:         fmt.Sprintf("Career Path %d", idx),
			Description:  "Standard progression path within the job family",
			IsActive:     true,
			AuditInfo:    createAuditInfo(),
		})
		idx++
	}
	return paths
}

// Helper functions

func createAuditInfo() *hcm.AuditInfo {
	now := time.Now().Unix()
	return &hcm.AuditInfo{
		CreatedAt:  now,
		CreatedBy:  "mock-generator",
		ModifiedAt: now,
		ModifiedBy: "mock-generator",
	}
}

func createAddress() *hcm.Address {
	return &hcm.Address{
		AddressType:   hcm.AddressType_ADDRESS_TYPE_WORK,
		Line1:         fmt.Sprintf("%d %s", rand.Intn(9999)+1, streetNames[rand.Intn(len(streetNames))]),
		City:          cities[rand.Intn(len(cities))],
		StateProvince: states[rand.Intn(len(states))],
		PostalCode:    fmt.Sprintf("%05d", rand.Intn(90000)+10000),
		CountryCode:   "US",
		IsPrimary:     true,
	}
}

func createContact() *hcm.ContactInfo {
	return &hcm.ContactInfo{
		ContactType: hcm.ContactType_CONTACT_TYPE_PHONE_WORK,
		Value:       randomPhone(),
		IsPrimary:   true,
	}
}

func randomName() string {
	return fmt.Sprintf("%s %s", firstNames[rand.Intn(len(firstNames))], lastNames[rand.Intn(len(lastNames))])
}

func randomPhone() string {
	return fmt.Sprintf("(%03d) %03d-%04d", rand.Intn(900)+100, rand.Intn(900)+100, rand.Intn(9000)+1000)
}

func randomSSN() string {
	return fmt.Sprintf("%03d-%02d-%04d", rand.Intn(900)+100, rand.Intn(90)+10, rand.Intn(9000)+1000)
}

func randomBirthDate() int64 {
	// Random birth date between 25-60 years ago
	yearsAgo := rand.Intn(35) + 25
	return time.Now().AddDate(-yearsAgo, -rand.Intn(12), -rand.Intn(28)).Unix()
}

func randomHireDate() int64 {
	// Random hire date in the last 10 years
	yearsAgo := rand.Intn(10)
	return time.Now().AddDate(-yearsAgo, -rand.Intn(12), -rand.Intn(28)).Unix()
}

func sanitizeEmail(s string) string {
	result := ""
	for _, c := range s {
		if (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') {
			result += string(c)
		}
	}
	return result
}

func getIssuingOrg(certName string) string {
	orgs := map[string]string{
		"PMP":      "Project Management Institute",
		"AWS":      "Amazon Web Services",
		"Google":   "Google Cloud",
		"Scrum":    "Scrum Alliance",
		"SHRM":     "Society for Human Resource Management",
		"CPA":      "AICPA",
		"Six":      "ASQ",
		"CISSP":    "ISC2",
		"CompTIA":  "CompTIA",
		"Microsoft": "Microsoft",
	}
	for key, org := range orgs {
		if len(certName) >= len(key) && certName[:len(key)] == key {
			return org
		}
	}
	return "Professional Certification Body"
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
