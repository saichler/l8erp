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
package mocks

import (

	"github.com/saichler/l8erp/go/types/hcm"
)

// Phase 5: Transaction & Additional Objects
func generatePhase5(client *HCMClient, store *MockDataStore) error {
	// PayrollRun
	payrollRuns := generatePayrollRuns(store)
	if err := runOp(client, "Payroll Runs", "/erp/30/PayRun", &hcm.PayrollRunList{List: payrollRuns}, extractIDs(payrollRuns, func(v interface{}) string { return v.(*hcm.PayrollRun).PayrollRunId }), &store.PayrollRunIDs); err != nil {
		return err
	}

	// Payslip
	payslips := generatePayslips(store)
	if err := runOp(client, "Payslips", "/erp/30/Payslip", &hcm.PayslipList{List: payslips}, extractIDs(payslips, func(v interface{}) string { return v.(*hcm.Payslip).PayslipId }), &store.PayslipIDs); err != nil {
		return err
	}

	// TaxWithholding
	taxWithholdings := generateTaxWithholdings(store)
	if err := runOp(client, "Tax Withholdings", "/erp/30/TaxWith", &hcm.TaxWithholdingList{List: taxWithholdings}, extractIDs(taxWithholdings, func(v interface{}) string { return v.(*hcm.TaxWithholding).WithholdingId }), &store.TaxWithholdingIDs); err != nil {
		return err
	}

	// DirectDeposit
	directDeposits := generateDirectDeposits(store)
	if err := runOp(client, "Direct Deposits", "/erp/30/DirDep", &hcm.DirectDepositList{List: directDeposits}, extractIDs(directDeposits, func(v interface{}) string { return v.(*hcm.DirectDeposit).DirectDepositId }), &store.DirectDepositIDs); err != nil {
		return err
	}

	// Garnishment (only a few employees)
	garnishments := generateGarnishments(store)
	if err := runOp(client, "Garnishments", "/erp/30/Garnish", &hcm.GarnishmentList{List: garnishments}, extractIDs(garnishments, func(v interface{}) string { return v.(*hcm.Garnishment).GarnishmentId }), &store.GarnishmentIDs); err != nil {
		return err
	}

	// YearEndDocument
	yearEndDocs := generateYearEndDocuments(store)
	if err := runOp(client, "Year-End Documents", "/erp/30/YrEndDoc", &hcm.YearEndDocumentList{List: yearEndDocs}, extractIDs(yearEndDocs, func(v interface{}) string { return v.(*hcm.YearEndDocument).DocumentId }), &store.YearEndDocumentIDs); err != nil {
		return err
	}

	// LeaveRequest
	leaveRequests := generateLeaveRequests(store)
	if err := runOp(client, "Leave Requests", "/erp/30/LeaveReq", &hcm.LeaveRequestList{List: leaveRequests}, extractIDs(leaveRequests, func(v interface{}) string { return v.(*hcm.LeaveRequest).RequestId }), &store.LeaveRequestIDs); err != nil {
		return err
	}

	// Schedule
	schedules := generateSchedules(store)
	if err := runOp(client, "Schedules", "/erp/30/Schedule", &hcm.ScheduleList{List: schedules}, extractIDs(schedules, func(v interface{}) string { return v.(*hcm.Schedule).ScheduleId }), &store.ScheduleIDs); err != nil {
		return err
	}

	// Absence
	absences := generateAbsences(store)
	if err := runOp(client, "Absences", "/erp/30/Absence", &hcm.AbsenceList{List: absences}, extractIDs(absences, func(v interface{}) string { return v.(*hcm.Absence).AbsenceId }), &store.AbsenceIDs); err != nil {
		return err
	}

	// Dependent
	dependents := generateDependents(store)
	if err := runOp(client, "Dependents", "/erp/30/Dependent", &hcm.DependentList{List: dependents}, extractIDs(dependents, func(v interface{}) string { return v.(*hcm.Dependent).DependentId }), &store.DependentIDs); err != nil {
		return err
	}

	// LifeEvent
	lifeEvents := generateLifeEvents(store)
	if err := runOp(client, "Life Events", "/erp/30/LifeEvent", &hcm.LifeEventList{List: lifeEvents}, extractIDs(lifeEvents, func(v interface{}) string { return v.(*hcm.LifeEvent).LifeEventId }), &store.LifeEventIDs); err != nil {
		return err
	}

	// COBRAEvent
	cobraEvents := generateCOBRAEvents(store)
	if err := runOp(client, "COBRA Events", "/erp/30/COBRAEvt", &hcm.COBRAEventList{List: cobraEvents}, extractIDs(cobraEvents, func(v interface{}) string { return v.(*hcm.COBRAEvent).CobraEventId }), &store.COBRAEventIDs); err != nil {
		return err
	}

	// ComplianceRecord
	complianceRecords := generateComplianceRecords(store)
	if err := runOp(client, "Compliance Records", "/erp/30/CompRec", &hcm.ComplianceRecordList{List: complianceRecords}, extractIDs(complianceRecords, func(v interface{}) string { return v.(*hcm.ComplianceRecord).RecordId }), &store.ComplianceRecordIDs); err != nil {
		return err
	}

	// MeritIncrease
	meritIncreases := generateMeritIncreases(store)
	if err := runOp(client, "Merit Increases", "/erp/30/MeritInc", &hcm.MeritIncreaseList{List: meritIncreases}, extractIDs(meritIncreases, func(v interface{}) string { return v.(*hcm.MeritIncrease).IncreaseId }), &store.MeritIncreaseIDs); err != nil {
		return err
	}

	// BonusPayment
	bonusPayments := generateBonusPayments(store)
	if err := runOp(client, "Bonus Payments", "/erp/30/BonusPay", &hcm.BonusPaymentList{List: bonusPayments}, extractIDs(bonusPayments, func(v interface{}) string { return v.(*hcm.BonusPayment).PaymentId }), &store.BonusPaymentIDs); err != nil {
		return err
	}

	// EquityGrant
	equityGrants := generateEquityGrants(store)
	if err := runOp(client, "Equity Grants", "/erp/30/EqGrant", &hcm.EquityGrantList{List: equityGrants}, extractIDs(equityGrants, func(v interface{}) string { return v.(*hcm.EquityGrant).GrantId }), &store.EquityGrantIDs); err != nil {
		return err
	}

	// CompensationStatement
	compStatements := generateCompensationStatements(store)
	if err := runOp(client, "Compensation Statements", "/erp/30/CompStmt", &hcm.CompensationStatementList{List: compStatements}, extractIDs(compStatements, func(v interface{}) string { return v.(*hcm.CompensationStatement).StatementId }), &store.CompStatementIDs); err != nil {
		return err
	}

	// MarketBenchmark
	benchmarks := generateMarketBenchmarks(store)
	if err := runOp(client, "Market Benchmarks", "/erp/30/MktBench", &hcm.MarketBenchmarkList{List: benchmarks}, extractIDs(benchmarks, func(v interface{}) string { return v.(*hcm.MarketBenchmark).BenchmarkId }), &store.MarketBenchmarkIDs); err != nil {
		return err
	}

	// CourseEnrollment
	courseEnrollments := generateCourseEnrollments(store)
	if err := runOp(client, "Course Enrollments", "/erp/30/CrsEnrol", &hcm.CourseEnrollmentList{List: courseEnrollments}, extractIDs(courseEnrollments, func(v interface{}) string { return v.(*hcm.CourseEnrollment).EnrollmentId }), &store.CourseEnrollmentIDs); err != nil {
		return err
	}

	// EmployeeCertification
	empCertifications := generateEmployeeCertifications(store)
	if err := runOp(client, "Employee Certifications", "/erp/30/EmpCert", &hcm.EmployeeCertificationList{List: empCertifications}, extractIDs(empCertifications, func(v interface{}) string { return v.(*hcm.EmployeeCertification).EmployeeCertificationId }), &store.EmpCertificationIDs); err != nil {
		return err
	}

	// TrainingRecord
	trainingRecords := generateTrainingRecords(store)
	if err := runOp(client, "Training Records", "/erp/30/TrnRec", &hcm.TrainingRecordList{List: trainingRecords}, extractIDs(trainingRecords, func(v interface{}) string { return v.(*hcm.TrainingRecord).RecordId }), &store.TrainingRecordIDs); err != nil {
		return err
	}

	// Feedback
	feedback := generateFeedback(store)
	if err := runOp(client, "Feedback", "/erp/30/Feedback", &hcm.FeedbackList{List: feedback}, extractIDs(feedback, func(v interface{}) string { return v.(*hcm.Feedback).FeedbackId }), &store.FeedbackIDs); err != nil {
		return err
	}

	// OnboardingTask
	onboardingTasks := generateOnboardingTasks(store)
	if err := runOp(client, "Onboarding Tasks", "/erp/30/OnbrdTsk", &hcm.OnboardingTaskList{List: onboardingTasks}, extractIDs(onboardingTasks, func(v interface{}) string { return v.(*hcm.OnboardingTask).TaskId }), &store.OnboardingTaskIDs); err != nil {
		return err
	}

	return nil
}

// Phase 6: Talent Acquisition
func generatePhase6(client *HCMClient, store *MockDataStore) error {
	// JobRequisition
	requisitions := generateJobRequisitions(store)
	if err := runOp(client, "Job Requisitions", "/erp/30/JobReq", &hcm.JobRequisitionList{List: requisitions}, extractIDs(requisitions, func(v interface{}) string { return v.(*hcm.JobRequisition).RequisitionId }), &store.JobRequisitionIDs); err != nil {
		return err
	}

	// Applicant
	applicants := generateApplicants(store)
	if err := runOp(client, "Applicants", "/erp/30/Applicant", &hcm.ApplicantList{List: applicants}, extractIDs(applicants, func(v interface{}) string { return v.(*hcm.Applicant).ApplicantId }), &store.ApplicantIDs); err != nil {
		return err
	}

	// Application
	applications := generateApplications(store)
	if err := runOp(client, "Applications", "/erp/30/Applctn", &hcm.ApplicationList{List: applications}, extractIDs(applications, func(v interface{}) string { return v.(*hcm.Application).ApplicationId }), &store.ApplicationIDs); err != nil {
		return err
	}

	// SuccessionPlan
	successionPlans := generateSuccessionPlans(store)
	if err := runOp(client, "Succession Plans", "/erp/30/SuccPlan", &hcm.SuccessionPlanList{List: successionPlans}, extractIDs(successionPlans, func(v interface{}) string { return v.(*hcm.SuccessionPlan).PlanId }), &store.SuccessionPlanIDs); err != nil {
		return err
	}

	// CareerPath
	careerPaths := generateCareerPaths(store)
	if err := runOp(client, "Career Paths", "/erp/30/CarPath", &hcm.CareerPathList{List: careerPaths}, extractIDs(careerPaths, func(v interface{}) string { return v.(*hcm.CareerPath).CareerPathId }), &store.CareerPathIDs); err != nil {
		return err
	}

	return nil
}
