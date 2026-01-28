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
