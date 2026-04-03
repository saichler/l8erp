package ui

import (
	"github.com/saichler/l8bus/go/overlay/vnic"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8logfusion/go/types/l8logf"
	"github.com/saichler/l8types/go/ifs"
	"strconv"
)

func CreateVnic(vnet uint32) ifs.IVNic {
	resources := common.CreateResources("web-" + strconv.Itoa(int(vnet)))
	resources.SysConfig().VnetPort = vnet

	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&l8logf.L8File{}, "Path", "Name")

	RegisterTypes(resources)

	nic := vnic.NewVirtualNetworkInterface(resources, nil)
	nic.Resources().SysConfig().KeepAliveIntervalSeconds = 60
	nic.Start()
	nic.WaitForConnection()

	return nic
}

func RegisterTypes(resources ifs.IResources) {
	registerHcmTypes(resources)
	registerFinTypes(resources)
	registerScmTypes(resources)
	registerSalesTypes(resources)
	registerMfgTypes(resources)
	registerCrmTypes(resources)
	registerPrjTypes(resources)
	registerBiTypes(resources)
	registerDocTypes(resources)
	registerEcomTypes(resources)
	registerCompTypes(resources)
	registerAiaTypes(resources)
	registerSysTypes(resources)
}

func registerHcmTypes(resources ifs.IResources) {
	// Core HR
	common.RegisterType(resources, &hcm.Employee{}, &hcm.EmployeeList{}, "EmployeeId")
	common.RegisterType(resources, &hcm.Position{}, &hcm.PositionList{}, "PositionId")
	common.RegisterType(resources, &hcm.Job{}, &hcm.JobList{}, "JobId")
	common.RegisterType(resources, &hcm.JobFamily{}, &hcm.JobFamilyList{}, "JobFamilyId")
	common.RegisterType(resources, &hcm.Organization{}, &hcm.OrganizationList{}, "OrganizationId")
	common.RegisterType(resources, &hcm.Department{}, &hcm.DepartmentList{}, "DepartmentId")
	common.RegisterType(resources, &hcm.EmployeeDocument{}, &hcm.EmployeeDocumentList{}, "DocumentId")
	common.RegisterType(resources, &hcm.ComplianceRecord{}, &hcm.ComplianceRecordList{}, "RecordId")

	// Payroll
	common.RegisterType(resources, &hcm.PayStructure{}, &hcm.PayStructureList{}, "PayStructureId")
	common.RegisterType(resources, &hcm.PayComponent{}, &hcm.PayComponentList{}, "ComponentId")
	common.RegisterType(resources, &hcm.PayrollRun{}, &hcm.PayrollRunList{}, "PayrollRunId")
	common.RegisterType(resources, &hcm.Payslip{}, &hcm.PayslipList{}, "PayslipId")
	common.RegisterType(resources, &hcm.TaxWithholding{}, &hcm.TaxWithholdingList{}, "WithholdingId")
	common.RegisterType(resources, &hcm.DirectDeposit{}, &hcm.DirectDepositList{}, "DirectDepositId")
	common.RegisterType(resources, &hcm.Garnishment{}, &hcm.GarnishmentList{}, "GarnishmentId")
	common.RegisterType(resources, &hcm.YearEndDocument{}, &hcm.YearEndDocumentList{}, "DocumentId")

	// Benefits
	common.RegisterType(resources, &hcm.BenefitPlan{}, &hcm.BenefitPlanList{}, "PlanId")
	common.RegisterType(resources, &hcm.BenefitEnrollment{}, &hcm.BenefitEnrollmentList{}, "EnrollmentId")
	common.RegisterType(resources, &hcm.Carrier{}, &hcm.CarrierList{}, "CarrierId")
	common.RegisterType(resources, &hcm.Dependent{}, &hcm.DependentList{}, "DependentId")
	common.RegisterType(resources, &hcm.LifeEvent{}, &hcm.LifeEventList{}, "LifeEventId")
	common.RegisterType(resources, &hcm.COBRAEvent{}, &hcm.COBRAEventList{}, "CobraEventId")

	// Time & Attendance
	common.RegisterType(resources, &hcm.Timesheet{}, &hcm.TimesheetList{}, "TimesheetId")
	common.RegisterType(resources, &hcm.LeaveRequest{}, &hcm.LeaveRequestList{}, "RequestId")
	common.RegisterType(resources, &hcm.LeaveBalance{}, &hcm.LeaveBalanceList{}, "BalanceId")
	common.RegisterType(resources, &hcm.LeavePolicy{}, &hcm.LeavePolicyList{}, "PolicyId")
	common.RegisterType(resources, &hcm.Shift{}, &hcm.ShiftList{}, "ShiftId")
	common.RegisterType(resources, &hcm.Schedule{}, &hcm.ScheduleList{}, "ScheduleId")
	common.RegisterType(resources, &hcm.Holiday{}, &hcm.HolidayList{}, "HolidayId")
	common.RegisterType(resources, &hcm.Absence{}, &hcm.AbsenceList{}, "AbsenceId")

	// Talent
	common.RegisterType(resources, &hcm.PerformanceReview{}, &hcm.PerformanceReviewList{}, "ReviewId")
	common.RegisterType(resources, &hcm.Goal{}, &hcm.GoalList{}, "GoalId")
	common.RegisterType(resources, &hcm.Feedback{}, &hcm.FeedbackList{}, "FeedbackId")
	common.RegisterType(resources, &hcm.CareerPath{}, &hcm.CareerPathList{}, "CareerPathId")
	common.RegisterType(resources, &hcm.SuccessionPlan{}, &hcm.SuccessionPlanList{}, "PlanId")
	common.RegisterType(resources, &hcm.JobRequisition{}, &hcm.JobRequisitionList{}, "RequisitionId")
	common.RegisterType(resources, &hcm.Applicant{}, &hcm.ApplicantList{}, "ApplicantId")
	common.RegisterType(resources, &hcm.Application{}, &hcm.ApplicationList{}, "ApplicationId")
	common.RegisterType(resources, &hcm.OnboardingTask{}, &hcm.OnboardingTaskList{}, "TaskId")

	// Learning
	common.RegisterType(resources, &hcm.Course{}, &hcm.CourseList{}, "CourseId")
	common.RegisterType(resources, &hcm.CourseSession{}, &hcm.CourseSessionList{}, "SessionId")
	common.RegisterType(resources, &hcm.CourseEnrollment{}, &hcm.CourseEnrollmentList{}, "EnrollmentId")
	common.RegisterType(resources, &hcm.Certification{}, &hcm.CertificationList{}, "CertificationId")
	common.RegisterType(resources, &hcm.EmployeeCertification{}, &hcm.EmployeeCertificationList{}, "EmployeeCertificationId")
	common.RegisterType(resources, &hcm.Skill{}, &hcm.SkillList{}, "SkillId")
	common.RegisterType(resources, &hcm.EmployeeSkill{}, &hcm.EmployeeSkillList{}, "EmployeeSkillId")
	common.RegisterType(resources, &hcm.TrainingRecord{}, &hcm.TrainingRecordList{}, "RecordId")

	// Compensation
	common.RegisterType(resources, &hcm.SalaryGrade{}, &hcm.SalaryGradeList{}, "GradeId")
	common.RegisterType(resources, &hcm.SalaryStructure{}, &hcm.SalaryStructureList{}, "StructureId")
	common.RegisterType(resources, &hcm.EmployeeCompensation{}, &hcm.EmployeeCompensationList{}, "CompensationId")
	common.RegisterType(resources, &hcm.MeritIncrease{}, &hcm.MeritIncreaseList{}, "IncreaseId")
	common.RegisterType(resources, &hcm.MeritCycle{}, &hcm.MeritCycleList{}, "CycleId")
	common.RegisterType(resources, &hcm.BonusPlan{}, &hcm.BonusPlanList{}, "PlanId")
	common.RegisterType(resources, &hcm.BonusPayment{}, &hcm.BonusPaymentList{}, "PaymentId")
	common.RegisterType(resources, &hcm.EquityGrant{}, &hcm.EquityGrantList{}, "GrantId")
	common.RegisterType(resources, &hcm.CompensationStatement{}, &hcm.CompensationStatementList{}, "StatementId")
	common.RegisterType(resources, &hcm.MarketBenchmark{}, &hcm.MarketBenchmarkList{}, "BenchmarkId")
}
