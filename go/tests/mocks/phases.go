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
	jobFamilies := generateJobFamilies()
	if err := runOp(client, "Job Families", "/erp/30/JobFamily", &hcm.JobFamilyList{List: jobFamilies}, extractIDs(jobFamilies, func(e *hcm.JobFamily) string { return e.JobFamilyId }), &store.JobFamilyIDs); err != nil {
		return err
	}

	// Generate Carriers
	carriers := generateCarriers()
	if err := runOp(client, "Carriers", "/erp/30/Carrier", &hcm.CarrierList{List: carriers}, extractIDs(carriers, func(e *hcm.Carrier) string { return e.CarrierId }), &store.CarrierIDs); err != nil {
		return err
	}

	// Generate Certifications
	certifications := generateCertifications()
	if err := runOp(client, "Certifications", "/erp/30/Cert", &hcm.CertificationList{List: certifications}, extractIDs(certifications, func(e *hcm.Certification) string { return e.CertificationId }), &store.CertificationIDs); err != nil {
		return err
	}

	// Generate Skills
	skills := generateSkills()
	if err := runOp(client, "Skills", "/erp/30/Skill", &hcm.SkillList{List: skills}, extractIDs(skills, func(e *hcm.Skill) string { return e.SkillId }), &store.SkillIDs); err != nil {
		return err
	}

	return nil
}

// Phase 2: Core Organizational Structure
func generatePhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Organizations (hierarchical)
	organizations := generateOrganizations()
	if err := runOp(client, "Organizations", "/erp/30/Org", &hcm.OrganizationList{List: organizations}, extractIDs(organizations, func(e *hcm.Organization) string { return e.OrganizationId }), &store.OrganizationIDs); err != nil {
		return err
	}

	// Generate Jobs
	jobs := generateJobs(store)
	if err := runOp(client, "Jobs", "/erp/30/Job", &hcm.JobList{List: jobs}, extractIDs(jobs, func(e *hcm.Job) string { return e.JobId }), &store.JobIDs); err != nil {
		return err
	}

	// Generate Departments
	departments := generateDepartments(store)
	if err := runOp(client, "Departments", "/erp/30/Dept", &hcm.DepartmentList{List: departments}, extractIDs(departments, func(e *hcm.Department) string { return e.DepartmentId }), &store.DepartmentIDs); err != nil {
		return err
	}

	// Generate Positions
	positions := generatePositions(store)
	if err := runOp(client, "Positions", "/erp/30/Position", &hcm.PositionList{List: positions}, extractIDs(positions, func(e *hcm.Position) string { return e.PositionId }), &store.PositionIDs); err != nil {
		return err
	}

	return nil
}

// Phase 3: Employees & Configuration
func generatePhase3(client *HCMClient, store *MockDataStore) error {
	// Generate Employees (managers first, then others)
	employees := generateEmployees(store)
	if err := runOp(client, "Employees", "/erp/30/Employee", &hcm.EmployeeList{List: employees}, extractIDs(employees, func(e *hcm.Employee) string { return e.EmployeeId }), &store.EmployeeIDs); err != nil {
		return err
	}
	// First 10 employees are managers (including CEO)
	store.ManagerIDs = store.EmployeeIDs[:minInt(10, len(store.EmployeeIDs))]
	fmt.Printf(" %d created\n", len(employees))

	// Generate Pay Structures
	payStructures := generatePayStructures(store)
	if err := runOp(client, "Pay Structures", "/erp/30/PayStruct", &hcm.PayStructureList{List: payStructures}, extractIDs(payStructures, func(e *hcm.PayStructure) string { return e.PayStructureId }), &store.PayStructureIDs); err != nil {
		return err
	}

	// Generate Pay Components
	payComponents := generatePayComponents(store)
	if err := runOp(client, "Pay Components", "/erp/30/PayComp", &hcm.PayComponentList{List: payComponents}, extractIDs(payComponents, func(e *hcm.PayComponent) string { return e.ComponentId }), &store.PayComponentIDs); err != nil {
		return err
	}

	// Generate Leave Policies
	leavePolicies := generateLeavePolicies(store)
	if err := runOp(client, "Leave Policies", "/erp/30/LeavePol", &hcm.LeavePolicyList{List: leavePolicies}, extractIDs(leavePolicies, func(e *hcm.LeavePolicy) string { return e.PolicyId }), &store.LeavePolicyIDs); err != nil {
		return err
	}

	// Generate Shifts
	shifts := generateShifts()
	if err := runOp(client, "Shifts", "/erp/30/Shift", &hcm.ShiftList{List: shifts}, extractIDs(shifts, func(e *hcm.Shift) string { return e.ShiftId }), &store.ShiftIDs); err != nil {
		return err
	}

	// Generate Holidays
	holidays := generateHolidays(store)
	if err := runOp(client, "Holidays", "/erp/30/Holiday", &hcm.HolidayList{List: holidays}, extractIDs(holidays, func(e *hcm.Holiday) string { return e.HolidayId }), &store.HolidayIDs); err != nil {
		return err
	}

	// Generate Benefit Plans
	benefitPlans := generateBenefitPlans(store)
	if err := runOp(client, "Benefit Plans", "/erp/30/BenPlan", &hcm.BenefitPlanList{List: benefitPlans}, extractIDs(benefitPlans, func(e *hcm.BenefitPlan) string { return e.PlanId }), &store.BenefitPlanIDs); err != nil {
		return err
	}

	// Generate Salary Structures
	salaryStructures := generateSalaryStructures(store)
	if err := runOp(client, "Salary Structures", "/erp/30/SalStrct", &hcm.SalaryStructureList{List: salaryStructures}, extractIDs(salaryStructures, func(e *hcm.SalaryStructure) string { return e.StructureId }), &store.SalaryStructureIDs); err != nil {
		return err
	}

	// Generate Salary Grades
	salaryGrades := generateSalaryGrades(store)
	if err := runOp(client, "Salary Grades", "/erp/30/SalGrade", &hcm.SalaryGradeList{List: salaryGrades}, extractIDs(salaryGrades, func(e *hcm.SalaryGrade) string { return e.GradeId }), &store.SalaryGradeIDs); err != nil {
		return err
	}

	// Generate Bonus Plans
	bonusPlans := generateBonusPlans(store)
	if err := runOp(client, "Bonus Plans", "/erp/30/BonusPlan", &hcm.BonusPlanList{List: bonusPlans}, extractIDs(bonusPlans, func(e *hcm.BonusPlan) string { return e.PlanId }), &store.BonusPlanIDs); err != nil {
		return err
	}

	// Generate Merit Cycles
	meritCycles := generateMeritCycles(store)
	if err := runOp(client, "Merit Cycles", "/erp/30/MrtCycle", &hcm.MeritCycleList{List: meritCycles}, extractIDs(meritCycles, func(e *hcm.MeritCycle) string { return e.CycleId }), &store.MeritCycleIDs); err != nil {
		return err
	}

	// Generate Courses
	courses := generateCourses(store)
	if err := runOp(client, "Courses", "/erp/30/Course", &hcm.CourseList{List: courses}, extractIDs(courses, func(e *hcm.Course) string { return e.CourseId }), &store.CourseIDs); err != nil {
		return err
	}

	// Generate Course Sessions
	sessions := generateCourseSessions(store)
	if err := runOp(client, "Course Sessions", "/erp/30/CrsSess", &hcm.CourseSessionList{List: sessions}, extractIDs(sessions, func(e *hcm.CourseSession) string { return e.SessionId }), &store.CourseSessionIDs); err != nil {
		return err
	}

	return nil
}

// Phase 4: Employee-Dependent Objects
func generatePhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Employee Documents
	documents := generateEmployeeDocuments(store)
	if err := runOp(client, "Employee Documents", "/erp/30/EmpDoc", &hcm.EmployeeDocumentList{List: documents}, nil, nil); err != nil {
		return err
	}

	// Generate Timesheets
	timesheets := generateTimesheets(store)
	if err := runOp(client, "Timesheets", "/erp/30/Timesheet", &hcm.TimesheetList{List: timesheets}, nil, nil); err != nil {
		return err
	}

	// Generate Leave Balances
	leaveBalances := generateLeaveBalances(store)
	if err := runOp(client, "Leave Balances", "/erp/30/LeaveBal", &hcm.LeaveBalanceList{List: leaveBalances}, nil, nil); err != nil {
		return err
	}

	// Generate Benefit Enrollments
	enrollments := generateBenefitEnrollments(store)
	if err := runOp(client, "Benefit Enrollments", "/erp/30/BenEnrol", &hcm.BenefitEnrollmentList{List: enrollments}, nil, nil); err != nil {
		return err
	}

	// Generate Employee Skills
	empSkills := generateEmployeeSkills(store)
	if err := runOp(client, "Employee Skills", "/erp/30/EmpSkill", &hcm.EmployeeSkillList{List: empSkills}, nil, nil); err != nil {
		return err
	}

	// Generate Performance Reviews
	reviews := generatePerformanceReviews(store)
	if err := runOp(client, "Performance Reviews", "/erp/30/PerfRevw", &hcm.PerformanceReviewList{List: reviews}, extractIDs(reviews, func(e *hcm.PerformanceReview) string { return e.ReviewId }), &store.PerformanceReviewIDs); err != nil {
		return err
	}

	// Generate Goals
	goals := generateGoals(store)
	if err := runOp(client, "Goals", "/erp/30/Goal", &hcm.GoalList{List: goals}, nil, nil); err != nil {
		return err
	}

	// Generate Employee Compensation
	empComp := generateEmployeeCompensation(store)
	if err := runOp(client, "Employee Compensation", "/erp/30/EmpComp", &hcm.EmployeeCompensationList{List: empComp}, nil, nil); err != nil {
		return err
	}

	return nil
}
