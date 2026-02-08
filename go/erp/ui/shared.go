package ui

import (
	"github.com/saichler/l8bus/go/overlay/vnic"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
	"strconv"
)

func CreateVnic(vnet uint32) ifs.IVNic {
	resources := common.CreateResources("web-" + strconv.Itoa(int(vnet)))
	resources.SysConfig().VnetPort = vnet

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
	registerSysTypes(resources)
}

func registerHcmTypes(resources ifs.IResources) {
	// Core HR
	common.RegisterType[hcm.Employee, hcm.EmployeeList](resources, "EmployeeId")
	common.RegisterType[hcm.Position, hcm.PositionList](resources, "PositionId")
	common.RegisterType[hcm.Job, hcm.JobList](resources, "JobId")
	common.RegisterType[hcm.JobFamily, hcm.JobFamilyList](resources, "JobFamilyId")
	common.RegisterType[hcm.Organization, hcm.OrganizationList](resources, "OrganizationId")
	common.RegisterType[hcm.Department, hcm.DepartmentList](resources, "DepartmentId")
	common.RegisterType[hcm.EmployeeDocument, hcm.EmployeeDocumentList](resources, "DocumentId")
	common.RegisterType[hcm.ComplianceRecord, hcm.ComplianceRecordList](resources, "RecordId")

	// Payroll
	common.RegisterType[hcm.PayStructure, hcm.PayStructureList](resources, "PayStructureId")
	common.RegisterType[hcm.PayComponent, hcm.PayComponentList](resources, "ComponentId")
	common.RegisterType[hcm.PayrollRun, hcm.PayrollRunList](resources, "PayrollRunId")
	common.RegisterType[hcm.Payslip, hcm.PayslipList](resources, "PayslipId")
	common.RegisterType[hcm.TaxWithholding, hcm.TaxWithholdingList](resources, "WithholdingId")
	common.RegisterType[hcm.DirectDeposit, hcm.DirectDepositList](resources, "DirectDepositId")
	common.RegisterType[hcm.Garnishment, hcm.GarnishmentList](resources, "GarnishmentId")
	common.RegisterType[hcm.YearEndDocument, hcm.YearEndDocumentList](resources, "DocumentId")

	// Benefits
	common.RegisterType[hcm.BenefitPlan, hcm.BenefitPlanList](resources, "PlanId")
	common.RegisterType[hcm.BenefitEnrollment, hcm.BenefitEnrollmentList](resources, "EnrollmentId")
	common.RegisterType[hcm.Carrier, hcm.CarrierList](resources, "CarrierId")
	common.RegisterType[hcm.Dependent, hcm.DependentList](resources, "DependentId")
	common.RegisterType[hcm.LifeEvent, hcm.LifeEventList](resources, "LifeEventId")
	common.RegisterType[hcm.COBRAEvent, hcm.COBRAEventList](resources, "CobraEventId")

	// Time & Attendance
	common.RegisterType[hcm.Timesheet, hcm.TimesheetList](resources, "TimesheetId")
	common.RegisterType[hcm.LeaveRequest, hcm.LeaveRequestList](resources, "RequestId")
	common.RegisterType[hcm.LeaveBalance, hcm.LeaveBalanceList](resources, "BalanceId")
	common.RegisterType[hcm.LeavePolicy, hcm.LeavePolicyList](resources, "PolicyId")
	common.RegisterType[hcm.Shift, hcm.ShiftList](resources, "ShiftId")
	common.RegisterType[hcm.Schedule, hcm.ScheduleList](resources, "ScheduleId")
	common.RegisterType[hcm.Holiday, hcm.HolidayList](resources, "HolidayId")
	common.RegisterType[hcm.Absence, hcm.AbsenceList](resources, "AbsenceId")

	// Talent
	common.RegisterType[hcm.PerformanceReview, hcm.PerformanceReviewList](resources, "ReviewId")
	common.RegisterType[hcm.Goal, hcm.GoalList](resources, "GoalId")
	common.RegisterType[hcm.Feedback, hcm.FeedbackList](resources, "FeedbackId")
	common.RegisterType[hcm.CareerPath, hcm.CareerPathList](resources, "CareerPathId")
	common.RegisterType[hcm.SuccessionPlan, hcm.SuccessionPlanList](resources, "PlanId")
	common.RegisterType[hcm.JobRequisition, hcm.JobRequisitionList](resources, "RequisitionId")
	common.RegisterType[hcm.Applicant, hcm.ApplicantList](resources, "ApplicantId")
	common.RegisterType[hcm.Application, hcm.ApplicationList](resources, "ApplicationId")
	common.RegisterType[hcm.OnboardingTask, hcm.OnboardingTaskList](resources, "TaskId")

	// Learning
	common.RegisterType[hcm.Course, hcm.CourseList](resources, "CourseId")
	common.RegisterType[hcm.CourseSession, hcm.CourseSessionList](resources, "SessionId")
	common.RegisterType[hcm.CourseEnrollment, hcm.CourseEnrollmentList](resources, "EnrollmentId")
	common.RegisterType[hcm.Certification, hcm.CertificationList](resources, "CertificationId")
	common.RegisterType[hcm.EmployeeCertification, hcm.EmployeeCertificationList](resources, "EmployeeCertificationId")
	common.RegisterType[hcm.Skill, hcm.SkillList](resources, "SkillId")
	common.RegisterType[hcm.EmployeeSkill, hcm.EmployeeSkillList](resources, "EmployeeSkillId")
	common.RegisterType[hcm.TrainingRecord, hcm.TrainingRecordList](resources, "RecordId")

	// Compensation
	common.RegisterType[hcm.SalaryGrade, hcm.SalaryGradeList](resources, "GradeId")
	common.RegisterType[hcm.SalaryStructure, hcm.SalaryStructureList](resources, "StructureId")
	common.RegisterType[hcm.EmployeeCompensation, hcm.EmployeeCompensationList](resources, "CompensationId")
	common.RegisterType[hcm.MeritIncrease, hcm.MeritIncreaseList](resources, "IncreaseId")
	common.RegisterType[hcm.MeritCycle, hcm.MeritCycleList](resources, "CycleId")
	common.RegisterType[hcm.BonusPlan, hcm.BonusPlanList](resources, "PlanId")
	common.RegisterType[hcm.BonusPayment, hcm.BonusPaymentList](resources, "PaymentId")
	common.RegisterType[hcm.EquityGrant, hcm.EquityGrantList](resources, "GrantId")
	common.RegisterType[hcm.CompensationStatement, hcm.CompensationStatementList](resources, "StatementId")
	common.RegisterType[hcm.MarketBenchmark, hcm.MarketBenchmarkList](resources, "BenchmarkId")
}
