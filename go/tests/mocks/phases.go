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
	"fmt"

	"github.com/saichler/l8erp/go/types/hcm"
)

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
	// First 10 employees are managers (including CEO)
	store.ManagerIDs = store.EmployeeIDs[:minInt(10, len(store.EmployeeIDs))]
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
	for _, r := range reviews {
		store.PerformanceReviewIDs = append(store.PerformanceReviewIDs, r.ReviewId)
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
