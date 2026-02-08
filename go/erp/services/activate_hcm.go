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

func ActivateHCMServices(creds, dbname string, nic ifs.IVNic) {
	// Core HR
	employees.Activate(creds, dbname, nic)
	organizations.Activate(creds, dbname, nic)
	departments.Activate(creds, dbname, nic)
	positions.Activate(creds, dbname, nic)
	jobs.Activate(creds, dbname, nic)
	jobfamilies.Activate(creds, dbname, nic)
	employeedocuments.Activate(creds, dbname, nic)
	compliancerecords.Activate(creds, dbname, nic)
	// Payroll
	paystructures.Activate(creds, dbname, nic)
	paycomponents.Activate(creds, dbname, nic)
	payrollruns.Activate(creds, dbname, nic)
	payslips.Activate(creds, dbname, nic)
	taxwithholdings.Activate(creds, dbname, nic)
	directdeposits.Activate(creds, dbname, nic)
	garnishments.Activate(creds, dbname, nic)
	yearenddocuments.Activate(creds, dbname, nic)
	// Benefits
	benefitplans.Activate(creds, dbname, nic)
	benefitenrollments.Activate(creds, dbname, nic)
	dependents.Activate(creds, dbname, nic)
	lifeevents.Activate(creds, dbname, nic)
	carriers.Activate(creds, dbname, nic)
	cobraevents.Activate(creds, dbname, nic)
	// Time & Attendance
	timesheets.Activate(creds, dbname, nic)
	leaverequests.Activate(creds, dbname, nic)
	leavebalances.Activate(creds, dbname, nic)
	leavepolicies.Activate(creds, dbname, nic)
	shifts.Activate(creds, dbname, nic)
	schedules.Activate(creds, dbname, nic)
	holidays.Activate(creds, dbname, nic)
	absences.Activate(creds, dbname, nic)
	// Talent
	jobrequisitions.Activate(creds, dbname, nic)
	applicants.Activate(creds, dbname, nic)
	applications.Activate(creds, dbname, nic)
	onboardingtasks.Activate(creds, dbname, nic)
	performancereviews.Activate(creds, dbname, nic)
	goals.Activate(creds, dbname, nic)
	successionplans.Activate(creds, dbname, nic)
	careerpaths.Activate(creds, dbname, nic)
	feedbacks.Activate(creds, dbname, nic)
	// Learning
	courses.Activate(creds, dbname, nic)
	coursesessions.Activate(creds, dbname, nic)
	courseenrollments.Activate(creds, dbname, nic)
	certifications.Activate(creds, dbname, nic)
	employeecertifications.Activate(creds, dbname, nic)
	skills.Activate(creds, dbname, nic)
	employeeskills.Activate(creds, dbname, nic)
	trainingrecords.Activate(creds, dbname, nic)
	// Compensation
	salarygrades.Activate(creds, dbname, nic)
	salarystructures.Activate(creds, dbname, nic)
	employeecompensations.Activate(creds, dbname, nic)
	meritincreases.Activate(creds, dbname, nic)
	meritcycles.Activate(creds, dbname, nic)
	bonusplans.Activate(creds, dbname, nic)
	bonuspayments.Activate(creds, dbname, nic)
	equitygrants.Activate(creds, dbname, nic)
	compensationstatements.Activate(creds, dbname, nic)
	marketbenchmarks.Activate(creds, dbname, nic)
}
