package tests

import (
	"github.com/saichler/l8erp/go/erp/hcm/absences"
	"github.com/saichler/l8erp/go/erp/hcm/applicants"
	"github.com/saichler/l8erp/go/erp/hcm/applications"
	"github.com/saichler/l8erp/go/erp/hcm/benefitenrollments"
	"github.com/saichler/l8erp/go/erp/hcm/benefitplans"
	"github.com/saichler/l8erp/go/erp/hcm/bonuspayments"
	"github.com/saichler/l8erp/go/erp/hcm/bonusplans"
	"github.com/saichler/l8erp/go/erp/hcm/careerpaths"
	"github.com/saichler/l8erp/go/erp/hcm/carriers"
	"github.com/saichler/l8erp/go/erp/hcm/certifications"
	"github.com/saichler/l8erp/go/erp/hcm/cobraevents"
	"github.com/saichler/l8erp/go/erp/hcm/compensationstatements"
	"github.com/saichler/l8erp/go/erp/hcm/compliancerecords"
	"github.com/saichler/l8erp/go/erp/hcm/courseenrollments"
	"github.com/saichler/l8erp/go/erp/hcm/courses"
	"github.com/saichler/l8erp/go/erp/hcm/coursesessions"
	"github.com/saichler/l8erp/go/erp/hcm/departments"
	"github.com/saichler/l8erp/go/erp/hcm/dependents"
	"github.com/saichler/l8erp/go/erp/hcm/directdeposits"
	"github.com/saichler/l8erp/go/erp/hcm/employeecertifications"
	"github.com/saichler/l8erp/go/erp/hcm/employeecompensations"
	"github.com/saichler/l8erp/go/erp/hcm/employeedocuments"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/erp/hcm/employeeskills"
	"github.com/saichler/l8erp/go/erp/hcm/equitygrants"
	"github.com/saichler/l8erp/go/erp/hcm/feedbacks"
	"github.com/saichler/l8erp/go/erp/hcm/garnishments"
	"github.com/saichler/l8erp/go/erp/hcm/goals"
	"github.com/saichler/l8erp/go/erp/hcm/holidays"
	"github.com/saichler/l8erp/go/erp/hcm/jobfamilies"
	"github.com/saichler/l8erp/go/erp/hcm/jobrequisitions"
	"github.com/saichler/l8erp/go/erp/hcm/jobs"
	"github.com/saichler/l8erp/go/erp/hcm/leavebalances"
	"github.com/saichler/l8erp/go/erp/hcm/leavepolicies"
	"github.com/saichler/l8erp/go/erp/hcm/leaverequests"
	"github.com/saichler/l8erp/go/erp/hcm/lifeevents"
	"github.com/saichler/l8erp/go/erp/hcm/marketbenchmarks"
	"github.com/saichler/l8erp/go/erp/hcm/meritcycles"
	"github.com/saichler/l8erp/go/erp/hcm/meritincreases"
	"github.com/saichler/l8erp/go/erp/hcm/onboardingtasks"
	"github.com/saichler/l8erp/go/erp/hcm/organizations"
	"github.com/saichler/l8erp/go/erp/hcm/paycomponents"
	"github.com/saichler/l8erp/go/erp/hcm/payrollruns"
	"github.com/saichler/l8erp/go/erp/hcm/payslips"
	"github.com/saichler/l8erp/go/erp/hcm/paystructures"
	"github.com/saichler/l8erp/go/erp/hcm/performancereviews"
	"github.com/saichler/l8erp/go/erp/hcm/positions"
	"github.com/saichler/l8erp/go/erp/hcm/salarygrades"
	"github.com/saichler/l8erp/go/erp/hcm/salarystructures"
	"github.com/saichler/l8erp/go/erp/hcm/schedules"
	"github.com/saichler/l8erp/go/erp/hcm/shifts"
	"github.com/saichler/l8erp/go/erp/hcm/skills"
	"github.com/saichler/l8erp/go/erp/hcm/successionplans"
	"github.com/saichler/l8erp/go/erp/hcm/taxwithholdings"
	"github.com/saichler/l8erp/go/erp/hcm/timesheets"
	"github.com/saichler/l8erp/go/erp/hcm/trainingrecords"
	"github.com/saichler/l8erp/go/erp/hcm/yearenddocuments"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceHandlersHCM(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if h, ok := absences.Absences(vnic); !ok || h == nil {
		log.Fail(t, "Absence service handler not found")
	}
	if h, ok := applicants.Applicants(vnic); !ok || h == nil {
		log.Fail(t, "Applicant service handler not found")
	}
	if h, ok := applications.Applications(vnic); !ok || h == nil {
		log.Fail(t, "Application service handler not found")
	}
	if h, ok := benefitenrollments.BenefitEnrollments(vnic); !ok || h == nil {
		log.Fail(t, "BenefitEnrollment service handler not found")
	}
	if h, ok := benefitplans.BenefitPlans(vnic); !ok || h == nil {
		log.Fail(t, "BenefitPlan service handler not found")
	}
	if h, ok := bonuspayments.BonusPayments(vnic); !ok || h == nil {
		log.Fail(t, "BonusPayment service handler not found")
	}
	if h, ok := bonusplans.BonusPlans(vnic); !ok || h == nil {
		log.Fail(t, "BonusPlan service handler not found")
	}
	if h, ok := careerpaths.CareerPaths(vnic); !ok || h == nil {
		log.Fail(t, "CareerPath service handler not found")
	}
	if h, ok := carriers.Carriers(vnic); !ok || h == nil {
		log.Fail(t, "Carrier service handler not found")
	}
	if h, ok := certifications.Certifications(vnic); !ok || h == nil {
		log.Fail(t, "Certification service handler not found")
	}
	if h, ok := cobraevents.COBRAEvents(vnic); !ok || h == nil {
		log.Fail(t, "COBRAEvent service handler not found")
	}
	if h, ok := compensationstatements.CompensationStatements(vnic); !ok || h == nil {
		log.Fail(t, "CompensationStatement service handler not found")
	}
	if h, ok := compliancerecords.ComplianceRecords(vnic); !ok || h == nil {
		log.Fail(t, "ComplianceRecord service handler not found")
	}
	if h, ok := courseenrollments.CourseEnrollments(vnic); !ok || h == nil {
		log.Fail(t, "CourseEnrollment service handler not found")
	}
	if h, ok := courses.Courses(vnic); !ok || h == nil {
		log.Fail(t, "Course service handler not found")
	}
	if h, ok := coursesessions.CourseSessions(vnic); !ok || h == nil {
		log.Fail(t, "CourseSession service handler not found")
	}
	if h, ok := departments.Departments(vnic); !ok || h == nil {
		log.Fail(t, "Department service handler not found")
	}
	if h, ok := dependents.Dependents(vnic); !ok || h == nil {
		log.Fail(t, "Dependent service handler not found")
	}
	if h, ok := directdeposits.DirectDeposits(vnic); !ok || h == nil {
		log.Fail(t, "DirectDeposit service handler not found")
	}
	if h, ok := employeecertifications.EmployeeCertifications(vnic); !ok || h == nil {
		log.Fail(t, "EmployeeCertification service handler not found")
	}
	if h, ok := employeecompensations.EmployeeCompensations(vnic); !ok || h == nil {
		log.Fail(t, "EmployeeCompensation service handler not found")
	}
	if h, ok := employeedocuments.EmployeeDocuments(vnic); !ok || h == nil {
		log.Fail(t, "EmployeeDocument service handler not found")
	}
	if h, ok := employees.Employees(vnic); !ok || h == nil {
		log.Fail(t, "Employee service handler not found")
	}
	if h, ok := employeeskills.EmployeeSkills(vnic); !ok || h == nil {
		log.Fail(t, "EmployeeSkill service handler not found")
	}
	if h, ok := equitygrants.EquityGrants(vnic); !ok || h == nil {
		log.Fail(t, "EquityGrant service handler not found")
	}
	if h, ok := feedbacks.Feedbacks(vnic); !ok || h == nil {
		log.Fail(t, "Feedback service handler not found")
	}
	if h, ok := garnishments.Garnishments(vnic); !ok || h == nil {
		log.Fail(t, "Garnishment service handler not found")
	}
	if h, ok := goals.Goals(vnic); !ok || h == nil {
		log.Fail(t, "Goal service handler not found")
	}
	if h, ok := holidays.Holidays(vnic); !ok || h == nil {
		log.Fail(t, "Holiday service handler not found")
	}
	if h, ok := jobfamilies.JobFamilies(vnic); !ok || h == nil {
		log.Fail(t, "JobFamily service handler not found")
	}
	if h, ok := jobrequisitions.JobRequisitions(vnic); !ok || h == nil {
		log.Fail(t, "JobRequisition service handler not found")
	}
	if h, ok := jobs.Jobs(vnic); !ok || h == nil {
		log.Fail(t, "Job service handler not found")
	}
	if h, ok := leavebalances.LeaveBalances(vnic); !ok || h == nil {
		log.Fail(t, "LeaveBalance service handler not found")
	}
	if h, ok := leavepolicies.LeavePolicies(vnic); !ok || h == nil {
		log.Fail(t, "LeavePolicy service handler not found")
	}
	if h, ok := leaverequests.LeaveRequests(vnic); !ok || h == nil {
		log.Fail(t, "LeaveRequest service handler not found")
	}
	if h, ok := lifeevents.LifeEvents(vnic); !ok || h == nil {
		log.Fail(t, "LifeEvent service handler not found")
	}
	if h, ok := marketbenchmarks.MarketBenchmarks(vnic); !ok || h == nil {
		log.Fail(t, "MarketBenchmark service handler not found")
	}
	if h, ok := meritcycles.MeritCycles(vnic); !ok || h == nil {
		log.Fail(t, "MeritCycle service handler not found")
	}
	if h, ok := meritincreases.MeritIncreases(vnic); !ok || h == nil {
		log.Fail(t, "MeritIncrease service handler not found")
	}
	if h, ok := onboardingtasks.OnboardingTasks(vnic); !ok || h == nil {
		log.Fail(t, "OnboardingTask service handler not found")
	}
	if h, ok := organizations.Organizations(vnic); !ok || h == nil {
		log.Fail(t, "Organization service handler not found")
	}
	if h, ok := paycomponents.PayComponents(vnic); !ok || h == nil {
		log.Fail(t, "PayComponent service handler not found")
	}
	if h, ok := payrollruns.PayrollRuns(vnic); !ok || h == nil {
		log.Fail(t, "PayrollRun service handler not found")
	}
	if h, ok := payslips.Payslips(vnic); !ok || h == nil {
		log.Fail(t, "Payslip service handler not found")
	}
	if h, ok := paystructures.PayStructures(vnic); !ok || h == nil {
		log.Fail(t, "PayStructure service handler not found")
	}
	if h, ok := performancereviews.PerformanceReviews(vnic); !ok || h == nil {
		log.Fail(t, "PerformanceReview service handler not found")
	}
	if h, ok := positions.Positions(vnic); !ok || h == nil {
		log.Fail(t, "Position service handler not found")
	}
	if h, ok := salarygrades.SalaryGrades(vnic); !ok || h == nil {
		log.Fail(t, "SalaryGrade service handler not found")
	}
	if h, ok := salarystructures.SalaryStructures(vnic); !ok || h == nil {
		log.Fail(t, "SalaryStructure service handler not found")
	}
	if h, ok := schedules.Schedules(vnic); !ok || h == nil {
		log.Fail(t, "Schedule service handler not found")
	}
	if h, ok := shifts.Shifts(vnic); !ok || h == nil {
		log.Fail(t, "Shift service handler not found")
	}
	if h, ok := skills.Skills(vnic); !ok || h == nil {
		log.Fail(t, "Skill service handler not found")
	}
	if h, ok := successionplans.SuccessionPlans(vnic); !ok || h == nil {
		log.Fail(t, "SuccessionPlan service handler not found")
	}
	if h, ok := taxwithholdings.TaxWithholdings(vnic); !ok || h == nil {
		log.Fail(t, "TaxWithholding service handler not found")
	}
	if h, ok := timesheets.Timesheets(vnic); !ok || h == nil {
		log.Fail(t, "Timesheet service handler not found")
	}
	if h, ok := trainingrecords.TrainingRecords(vnic); !ok || h == nil {
		log.Fail(t, "TrainingRecord service handler not found")
	}
	if h, ok := yearenddocuments.YearEndDocuments(vnic); !ok || h == nil {
		log.Fail(t, "YearEndDocument service handler not found")
	}
}
