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

func testServiceGettersHCM(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if _, err := absences.Absence("test-id", vnic); err != nil {
		log.Fail(t, "Absence getter failed: ", err.Error())
	}
	if _, err := applicants.Applicant("test-id", vnic); err != nil {
		log.Fail(t, "Applicant getter failed: ", err.Error())
	}
	if _, err := applications.Application("test-id", vnic); err != nil {
		log.Fail(t, "Application getter failed: ", err.Error())
	}
	if _, err := benefitenrollments.BenefitEnrollment("test-id", vnic); err != nil {
		log.Fail(t, "BenefitEnrollment getter failed: ", err.Error())
	}
	if _, err := benefitplans.BenefitPlan("test-id", vnic); err != nil {
		log.Fail(t, "BenefitPlan getter failed: ", err.Error())
	}
	if _, err := bonuspayments.BonusPayment("test-id", vnic); err != nil {
		log.Fail(t, "BonusPayment getter failed: ", err.Error())
	}
	if _, err := bonusplans.BonusPlan("test-id", vnic); err != nil {
		log.Fail(t, "BonusPlan getter failed: ", err.Error())
	}
	if _, err := careerpaths.CareerPath("test-id", vnic); err != nil {
		log.Fail(t, "CareerPath getter failed: ", err.Error())
	}
	if _, err := carriers.Carrier("test-id", vnic); err != nil {
		log.Fail(t, "Carrier getter failed: ", err.Error())
	}
	if _, err := certifications.Certification("test-id", vnic); err != nil {
		log.Fail(t, "Certification getter failed: ", err.Error())
	}
	if _, err := cobraevents.COBRAEvent("test-id", vnic); err != nil {
		log.Fail(t, "COBRAEvent getter failed: ", err.Error())
	}
	if _, err := compensationstatements.CompensationStatement("test-id", vnic); err != nil {
		log.Fail(t, "CompensationStatement getter failed: ", err.Error())
	}
	if _, err := compliancerecords.ComplianceRecord("test-id", vnic); err != nil {
		log.Fail(t, "ComplianceRecord getter failed: ", err.Error())
	}
	if _, err := courseenrollments.CourseEnrollment("test-id", vnic); err != nil {
		log.Fail(t, "CourseEnrollment getter failed: ", err.Error())
	}
	if _, err := courses.Course("test-id", vnic); err != nil {
		log.Fail(t, "Course getter failed: ", err.Error())
	}
	if _, err := coursesessions.CourseSession("test-id", vnic); err != nil {
		log.Fail(t, "CourseSession getter failed: ", err.Error())
	}
	if _, err := departments.Department("test-id", vnic); err != nil {
		log.Fail(t, "Department getter failed: ", err.Error())
	}
	if _, err := dependents.Dependent("test-id", vnic); err != nil {
		log.Fail(t, "Dependent getter failed: ", err.Error())
	}
	if _, err := directdeposits.DirectDeposit("test-id", vnic); err != nil {
		log.Fail(t, "DirectDeposit getter failed: ", err.Error())
	}
	if _, err := employeecertifications.EmployeeCertification("test-id", vnic); err != nil {
		log.Fail(t, "EmployeeCertification getter failed: ", err.Error())
	}
	if _, err := employeecompensations.EmployeeCompensation("test-id", vnic); err != nil {
		log.Fail(t, "EmployeeCompensation getter failed: ", err.Error())
	}
	if _, err := employeedocuments.EmployeeDocument("test-id", vnic); err != nil {
		log.Fail(t, "EmployeeDocument getter failed: ", err.Error())
	}
	if _, err := employees.Employee("test-id", vnic); err != nil {
		log.Fail(t, "Employee getter failed: ", err.Error())
	}
	if _, err := employeeskills.EmployeeSkill("test-id", vnic); err != nil {
		log.Fail(t, "EmployeeSkill getter failed: ", err.Error())
	}
	if _, err := equitygrants.EquityGrant("test-id", vnic); err != nil {
		log.Fail(t, "EquityGrant getter failed: ", err.Error())
	}
	if _, err := feedbacks.Feedback("test-id", vnic); err != nil {
		log.Fail(t, "Feedback getter failed: ", err.Error())
	}
	if _, err := garnishments.Garnishment("test-id", vnic); err != nil {
		log.Fail(t, "Garnishment getter failed: ", err.Error())
	}
	if _, err := goals.Goal("test-id", vnic); err != nil {
		log.Fail(t, "Goal getter failed: ", err.Error())
	}
	if _, err := holidays.Holiday("test-id", vnic); err != nil {
		log.Fail(t, "Holiday getter failed: ", err.Error())
	}
	if _, err := jobfamilies.JobFamily("test-id", vnic); err != nil {
		log.Fail(t, "JobFamily getter failed: ", err.Error())
	}
	if _, err := jobrequisitions.JobRequisition("test-id", vnic); err != nil {
		log.Fail(t, "JobRequisition getter failed: ", err.Error())
	}
	if _, err := jobs.Job("test-id", vnic); err != nil {
		log.Fail(t, "Job getter failed: ", err.Error())
	}
	if _, err := leavebalances.LeaveBalance("test-id", vnic); err != nil {
		log.Fail(t, "LeaveBalance getter failed: ", err.Error())
	}
	if _, err := leavepolicies.LeavePolicy("test-id", vnic); err != nil {
		log.Fail(t, "LeavePolicy getter failed: ", err.Error())
	}
	if _, err := leaverequests.LeaveRequest("test-id", vnic); err != nil {
		log.Fail(t, "LeaveRequest getter failed: ", err.Error())
	}
	if _, err := lifeevents.LifeEvent("test-id", vnic); err != nil {
		log.Fail(t, "LifeEvent getter failed: ", err.Error())
	}
	if _, err := marketbenchmarks.MarketBenchmark("test-id", vnic); err != nil {
		log.Fail(t, "MarketBenchmark getter failed: ", err.Error())
	}
	if _, err := meritcycles.MeritCycle("test-id", vnic); err != nil {
		log.Fail(t, "MeritCycle getter failed: ", err.Error())
	}
	if _, err := meritincreases.MeritIncrease("test-id", vnic); err != nil {
		log.Fail(t, "MeritIncrease getter failed: ", err.Error())
	}
	if _, err := onboardingtasks.OnboardingTask("test-id", vnic); err != nil {
		log.Fail(t, "OnboardingTask getter failed: ", err.Error())
	}
	if _, err := organizations.Organization("test-id", vnic); err != nil {
		log.Fail(t, "Organization getter failed: ", err.Error())
	}
	if _, err := paycomponents.PayComponent("test-id", vnic); err != nil {
		log.Fail(t, "PayComponent getter failed: ", err.Error())
	}
	if _, err := payrollruns.PayrollRun("test-id", vnic); err != nil {
		log.Fail(t, "PayrollRun getter failed: ", err.Error())
	}
	if _, err := payslips.Payslip("test-id", vnic); err != nil {
		log.Fail(t, "Payslip getter failed: ", err.Error())
	}
	if _, err := paystructures.PayStructure("test-id", vnic); err != nil {
		log.Fail(t, "PayStructure getter failed: ", err.Error())
	}
	if _, err := performancereviews.PerformanceReview("test-id", vnic); err != nil {
		log.Fail(t, "PerformanceReview getter failed: ", err.Error())
	}
	if _, err := positions.Position("test-id", vnic); err != nil {
		log.Fail(t, "Position getter failed: ", err.Error())
	}
	if _, err := salarygrades.SalaryGrade("test-id", vnic); err != nil {
		log.Fail(t, "SalaryGrade getter failed: ", err.Error())
	}
	if _, err := salarystructures.SalaryStructure("test-id", vnic); err != nil {
		log.Fail(t, "SalaryStructure getter failed: ", err.Error())
	}
	if _, err := schedules.Schedule("test-id", vnic); err != nil {
		log.Fail(t, "Schedule getter failed: ", err.Error())
	}
	if _, err := shifts.Shift("test-id", vnic); err != nil {
		log.Fail(t, "Shift getter failed: ", err.Error())
	}
	if _, err := skills.Skill("test-id", vnic); err != nil {
		log.Fail(t, "Skill getter failed: ", err.Error())
	}
	if _, err := successionplans.SuccessionPlan("test-id", vnic); err != nil {
		log.Fail(t, "SuccessionPlan getter failed: ", err.Error())
	}
	if _, err := taxwithholdings.TaxWithholding("test-id", vnic); err != nil {
		log.Fail(t, "TaxWithholding getter failed: ", err.Error())
	}
	if _, err := timesheets.Timesheet("test-id", vnic); err != nil {
		log.Fail(t, "Timesheet getter failed: ", err.Error())
	}
	if _, err := trainingrecords.TrainingRecord("test-id", vnic); err != nil {
		log.Fail(t, "TrainingRecord getter failed: ", err.Error())
	}
	if _, err := yearenddocuments.YearEndDocument("test-id", vnic); err != nil {
		log.Fail(t, "YearEndDocument getter failed: ", err.Error())
	}
}
