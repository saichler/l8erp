/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */

package services

import (
	"github.com/saichler/l8types/go/ifs"
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

func collectHCMActivations(creds, dbname string, nic ifs.IVNic) []func() {
	return []func(){
		// Core HR
		func() { employees.Activate(creds, dbname, nic) },
		func() { organizations.Activate(creds, dbname, nic) },
		func() { departments.Activate(creds, dbname, nic) },
		func() { positions.Activate(creds, dbname, nic) },
		func() { jobs.Activate(creds, dbname, nic) },
		func() { jobfamilies.Activate(creds, dbname, nic) },
		func() { employeedocuments.Activate(creds, dbname, nic) },
		func() { compliancerecords.Activate(creds, dbname, nic) },
		// Payroll
		func() { paystructures.Activate(creds, dbname, nic) },
		func() { paycomponents.Activate(creds, dbname, nic) },
		func() { payrollruns.Activate(creds, dbname, nic) },
		func() { payslips.Activate(creds, dbname, nic) },
		func() { taxwithholdings.Activate(creds, dbname, nic) },
		func() { directdeposits.Activate(creds, dbname, nic) },
		func() { garnishments.Activate(creds, dbname, nic) },
		func() { yearenddocuments.Activate(creds, dbname, nic) },
		// Benefits
		func() { benefitplans.Activate(creds, dbname, nic) },
		func() { benefitenrollments.Activate(creds, dbname, nic) },
		func() { dependents.Activate(creds, dbname, nic) },
		func() { lifeevents.Activate(creds, dbname, nic) },
		func() { carriers.Activate(creds, dbname, nic) },
		func() { cobraevents.Activate(creds, dbname, nic) },
		// Time & Attendance
		func() { timesheets.Activate(creds, dbname, nic) },
		func() { leaverequests.Activate(creds, dbname, nic) },
		func() { leavebalances.Activate(creds, dbname, nic) },
		func() { leavepolicies.Activate(creds, dbname, nic) },
		func() { shifts.Activate(creds, dbname, nic) },
		func() { schedules.Activate(creds, dbname, nic) },
		func() { holidays.Activate(creds, dbname, nic) },
		func() { absences.Activate(creds, dbname, nic) },
		// Talent
		func() { jobrequisitions.Activate(creds, dbname, nic) },
		func() { applicants.Activate(creds, dbname, nic) },
		func() { applications.Activate(creds, dbname, nic) },
		func() { onboardingtasks.Activate(creds, dbname, nic) },
		func() { performancereviews.Activate(creds, dbname, nic) },
		func() { goals.Activate(creds, dbname, nic) },
		func() { successionplans.Activate(creds, dbname, nic) },
		func() { careerpaths.Activate(creds, dbname, nic) },
		func() { feedbacks.Activate(creds, dbname, nic) },
		// Learning
		func() { courses.Activate(creds, dbname, nic) },
		func() { coursesessions.Activate(creds, dbname, nic) },
		func() { courseenrollments.Activate(creds, dbname, nic) },
		func() { certifications.Activate(creds, dbname, nic) },
		func() { employeecertifications.Activate(creds, dbname, nic) },
		func() { skills.Activate(creds, dbname, nic) },
		func() { employeeskills.Activate(creds, dbname, nic) },
		func() { trainingrecords.Activate(creds, dbname, nic) },
		// Compensation
		func() { salarygrades.Activate(creds, dbname, nic) },
		func() { salarystructures.Activate(creds, dbname, nic) },
		func() { employeecompensations.Activate(creds, dbname, nic) },
		func() { meritincreases.Activate(creds, dbname, nic) },
		func() { meritcycles.Activate(creds, dbname, nic) },
		func() { bonusplans.Activate(creds, dbname, nic) },
		func() { bonuspayments.Activate(creds, dbname, nic) },
		func() { equitygrants.Activate(creds, dbname, nic) },
		func() { compensationstatements.Activate(creds, dbname, nic) },
		func() { marketbenchmarks.Activate(creds, dbname, nic) },
	}
}
