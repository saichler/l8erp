/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 *
 * Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package main

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"strconv"

	"github.com/saichler/l8bus/go/overlay/health"
	"github.com/saichler/l8bus/go/overlay/vnic"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8utils/go/utils/ipsegment"
	"github.com/saichler/l8web/go/web/server"
)

func main() {
	startWebServer(2443, "/data/probler")
}

func startWebServer(port int, cert string) {
	serverConfig := &server.RestServerConfig{
		Host:           ipsegment.MachineIP,
		Port:           port,
		Authentication: true,
		CertName:       cert,
		Prefix:         common.PREFIX,
	}
	svr, err := server.NewRestServer(serverConfig)
	if err != nil {
		panic(err)
	}

	nic1 := createVnic(common.ERP_VNET)
	//nic2 := createVnic(common.LOGS_VNET)

	hs, ok := nic1.Resources().Services().ServiceHandler(health.ServiceName, 0)
	if ok {
		ws := hs.WebService()
		svr.RegisterWebService(ws, nic1)
	}

	//Activate the webpoints service
	sla := ifs.NewServiceLevelAgreement(&server.WebService{}, ifs.WebService, 0, false, nil)
	sla.SetArgs(svr)
	nic1.Resources().Services().Activate(sla, nic1)

	nic1.Resources().Logger().Info("Web Server Started!")

	svr.Start()
}

func createVnic(vnet uint32) ifs.IVNic {
	resources := common.CreateResources("web-" + strconv.Itoa(int(vnet)))
	resources.SysConfig().VnetPort = vnet

	registerTypes(resources)

	nic := vnic.NewVirtualNetworkInterface(resources, nil)
	nic.Resources().SysConfig().KeepAliveIntervalSeconds = 60
	nic.Start()
	nic.WaitForConnection()

	return nic
}

func registerTypes(resources ifs.IResources) {
	// Core HR
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Employee{}, "EmployeeId")
	resources.Registry().Register(&hcm.EmployeeList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Position{}, "PositionId")
	resources.Registry().Register(&hcm.PositionList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Job{}, "JobId")
	resources.Registry().Register(&hcm.JobList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.JobFamily{}, "JobFamilyId")
	resources.Registry().Register(&hcm.JobFamilyList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Organization{}, "OrganizationId")
	resources.Registry().Register(&hcm.OrganizationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Department{}, "DepartmentId")
	resources.Registry().Register(&hcm.DepartmentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.EmployeeDocument{}, "DocumentId")
	resources.Registry().Register(&hcm.EmployeeDocumentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.ComplianceRecord{}, "RecordId")
	resources.Registry().Register(&hcm.ComplianceRecordList{})

	// Payroll
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.PayStructure{}, "PayStructureId")
	resources.Registry().Register(&hcm.PayStructureList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.PayComponent{}, "ComponentId")
	resources.Registry().Register(&hcm.PayComponentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.PayrollRun{}, "PayrollRunId")
	resources.Registry().Register(&hcm.PayrollRunList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Payslip{}, "PayslipId")
	resources.Registry().Register(&hcm.PayslipList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.TaxWithholding{}, "WithholdingId")
	resources.Registry().Register(&hcm.TaxWithholdingList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.DirectDeposit{}, "DirectDepositId")
	resources.Registry().Register(&hcm.DirectDepositList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Garnishment{}, "GarnishmentId")
	resources.Registry().Register(&hcm.GarnishmentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.YearEndDocument{}, "DocumentId")
	resources.Registry().Register(&hcm.YearEndDocumentList{})

	// Benefits
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.BenefitPlan{}, "PlanId")
	resources.Registry().Register(&hcm.BenefitPlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.BenefitEnrollment{}, "EnrollmentId")
	resources.Registry().Register(&hcm.BenefitEnrollmentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Carrier{}, "CarrierId")
	resources.Registry().Register(&hcm.CarrierList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Dependent{}, "DependentId")
	resources.Registry().Register(&hcm.DependentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.LifeEvent{}, "LifeEventId")
	resources.Registry().Register(&hcm.LifeEventList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.COBRAEvent{}, "CobraEventId")
	resources.Registry().Register(&hcm.COBRAEventList{})

	// Time & Attendance
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Timesheet{}, "TimesheetId")
	resources.Registry().Register(&hcm.TimesheetList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.LeaveRequest{}, "RequestId")
	resources.Registry().Register(&hcm.LeaveRequestList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.LeaveBalance{}, "BalanceId")
	resources.Registry().Register(&hcm.LeaveBalanceList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.LeavePolicy{}, "PolicyId")
	resources.Registry().Register(&hcm.LeavePolicyList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Shift{}, "ShiftId")
	resources.Registry().Register(&hcm.ShiftList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Schedule{}, "ScheduleId")
	resources.Registry().Register(&hcm.ScheduleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Holiday{}, "HolidayId")
	resources.Registry().Register(&hcm.HolidayList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Absence{}, "AbsenceId")
	resources.Registry().Register(&hcm.AbsenceList{})

	// Talent
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.PerformanceReview{}, "ReviewId")
	resources.Registry().Register(&hcm.PerformanceReviewList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Goal{}, "GoalId")
	resources.Registry().Register(&hcm.GoalList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Feedback{}, "FeedbackId")
	resources.Registry().Register(&hcm.FeedbackList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.CareerPath{}, "CareerPathId")
	resources.Registry().Register(&hcm.CareerPathList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.SuccessionPlan{}, "PlanId")
	resources.Registry().Register(&hcm.SuccessionPlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.JobRequisition{}, "RequisitionId")
	resources.Registry().Register(&hcm.JobRequisitionList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Applicant{}, "ApplicantId")
	resources.Registry().Register(&hcm.ApplicantList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Application{}, "ApplicationId")
	resources.Registry().Register(&hcm.ApplicationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.OnboardingTask{}, "TaskId")
	resources.Registry().Register(&hcm.OnboardingTaskList{})

	// Learning
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Course{}, "CourseId")
	resources.Registry().Register(&hcm.CourseList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.CourseSession{}, "SessionId")
	resources.Registry().Register(&hcm.CourseSessionList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.CourseEnrollment{}, "EnrollmentId")
	resources.Registry().Register(&hcm.CourseEnrollmentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Certification{}, "CertificationId")
	resources.Registry().Register(&hcm.CertificationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.EmployeeCertification{}, "EmployeeCertificationId")
	resources.Registry().Register(&hcm.EmployeeCertificationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.Skill{}, "SkillId")
	resources.Registry().Register(&hcm.SkillList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.EmployeeSkill{}, "EmployeeSkillId")
	resources.Registry().Register(&hcm.EmployeeSkillList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.TrainingRecord{}, "RecordId")
	resources.Registry().Register(&hcm.TrainingRecordList{})

	// Compensation
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.SalaryGrade{}, "GradeId")
	resources.Registry().Register(&hcm.SalaryGradeList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.SalaryStructure{}, "StructureId")
	resources.Registry().Register(&hcm.SalaryStructureList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.EmployeeCompensation{}, "CompensationId")
	resources.Registry().Register(&hcm.EmployeeCompensationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.MeritIncrease{}, "IncreaseId")
	resources.Registry().Register(&hcm.MeritIncreaseList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.MeritCycle{}, "CycleId")
	resources.Registry().Register(&hcm.MeritCycleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.BonusPlan{}, "PlanId")
	resources.Registry().Register(&hcm.BonusPlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.BonusPayment{}, "PaymentId")
	resources.Registry().Register(&hcm.BonusPaymentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.EquityGrant{}, "GrantId")
	resources.Registry().Register(&hcm.EquityGrantList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.CompensationStatement{}, "StatementId")
	resources.Registry().Register(&hcm.CompensationStatementList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&hcm.MarketBenchmark{}, "BenchmarkId")
	resources.Registry().Register(&hcm.MarketBenchmarkList{})
}
