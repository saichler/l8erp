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
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8erp/go/types/scm"
	"strconv"

	"github.com/saichler/l8bus/go/overlay/health"
	"github.com/saichler/l8bus/go/overlay/vnic"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8utils/go/utils/ipsegment"
	"github.com/saichler/l8web/go/web/server"
)

func main() {
	startWebServer(2773, "/data/probler")
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

	registerFinTypes(resources)
	registerScmTypes(resources)
	registerSalesTypes(resources)
	registerMfgTypes(resources)
	registerCrmTypes(resources)
	registerPrjTypes(resources)
}

func registerFinTypes(resources ifs.IResources) {
	// General Ledger
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.Account{}, "AccountId")
	resources.Registry().Register(&fin.AccountList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.JournalEntry{}, "JournalEntryId")
	resources.Registry().Register(&fin.JournalEntryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.JournalEntryLine{}, "LineId")
	resources.Registry().Register(&fin.JournalEntryLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.FiscalYear{}, "FiscalYearId")
	resources.Registry().Register(&fin.FiscalYearList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.FiscalPeriod{}, "FiscalPeriodId")
	resources.Registry().Register(&fin.FiscalPeriodList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.Currency{}, "CurrencyId")
	resources.Registry().Register(&fin.CurrencyList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.ExchangeRate{}, "ExchangeRateId")
	resources.Registry().Register(&fin.ExchangeRateList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.AccountBalance{}, "BalanceId")
	resources.Registry().Register(&fin.AccountBalanceList{})

	// Accounts Payable
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.Vendor{}, "VendorId")
	resources.Registry().Register(&fin.VendorList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.VendorContact{}, "ContactId")
	resources.Registry().Register(&fin.VendorContactList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.PurchaseInvoice{}, "InvoiceId")
	resources.Registry().Register(&fin.PurchaseInvoiceList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.PurchaseInvoiceLine{}, "LineId")
	resources.Registry().Register(&fin.PurchaseInvoiceLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.PaymentSchedule{}, "ScheduleId")
	resources.Registry().Register(&fin.PaymentScheduleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.VendorPayment{}, "PaymentId")
	resources.Registry().Register(&fin.VendorPaymentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.PaymentAllocation{}, "AllocationId")
	resources.Registry().Register(&fin.PaymentAllocationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.VendorStatement{}, "StatementId")
	resources.Registry().Register(&fin.VendorStatementList{})

	// Accounts Receivable
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.Customer{}, "CustomerId")
	resources.Registry().Register(&fin.CustomerList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.CustomerContact{}, "ContactId")
	resources.Registry().Register(&fin.CustomerContactList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.SalesInvoice{}, "InvoiceId")
	resources.Registry().Register(&fin.SalesInvoiceList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.SalesInvoiceLine{}, "LineId")
	resources.Registry().Register(&fin.SalesInvoiceLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.CustomerPayment{}, "PaymentId")
	resources.Registry().Register(&fin.CustomerPaymentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.PaymentApplication{}, "ApplicationId")
	resources.Registry().Register(&fin.PaymentApplicationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.CreditMemo{}, "CreditMemoId")
	resources.Registry().Register(&fin.CreditMemoList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.DunningLetter{}, "LetterId")
	resources.Registry().Register(&fin.DunningLetterList{})

	// Cash Management
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.BankAccount{}, "BankAccountId")
	resources.Registry().Register(&fin.BankAccountList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.BankTransaction{}, "TransactionId")
	resources.Registry().Register(&fin.BankTransactionList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.BankReconciliation{}, "ReconciliationId")
	resources.Registry().Register(&fin.BankReconciliationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.CashForecast{}, "ForecastId")
	resources.Registry().Register(&fin.CashForecastList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.FundTransfer{}, "TransferId")
	resources.Registry().Register(&fin.FundTransferList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.PettyCash{}, "PettyCashId")
	resources.Registry().Register(&fin.PettyCashList{})

	// Fixed Assets
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.Asset{}, "AssetId")
	resources.Registry().Register(&fin.AssetList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.AssetCategory{}, "CategoryId")
	resources.Registry().Register(&fin.AssetCategoryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.DepreciationSchedule{}, "ScheduleId")
	resources.Registry().Register(&fin.DepreciationScheduleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.AssetDisposal{}, "DisposalId")
	resources.Registry().Register(&fin.AssetDisposalList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.AssetTransfer{}, "TransferId")
	resources.Registry().Register(&fin.AssetTransferList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.AssetMaintenance{}, "MaintenanceId")
	resources.Registry().Register(&fin.AssetMaintenanceList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.AssetRevaluation{}, "RevaluationId")
	resources.Registry().Register(&fin.AssetRevaluationList{})

	// Budgeting
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.Budget{}, "BudgetId")
	resources.Registry().Register(&fin.BudgetList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.BudgetLine{}, "LineId")
	resources.Registry().Register(&fin.BudgetLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.BudgetTransfer{}, "TransferId")
	resources.Registry().Register(&fin.BudgetTransferList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.BudgetScenario{}, "ScenarioId")
	resources.Registry().Register(&fin.BudgetScenarioList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.CapitalExpenditure{}, "CapexId")
	resources.Registry().Register(&fin.CapitalExpenditureList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.Forecast{}, "ForecastId")
	resources.Registry().Register(&fin.ForecastList{})

	// Tax
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.TaxCode{}, "TaxCodeId")
	resources.Registry().Register(&fin.TaxCodeList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.TaxJurisdiction{}, "JurisdictionId")
	resources.Registry().Register(&fin.TaxJurisdictionList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.TaxRule{}, "RuleId")
	resources.Registry().Register(&fin.TaxRuleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.TaxReturn{}, "ReturnId")
	resources.Registry().Register(&fin.TaxReturnList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.TaxExemption{}, "ExemptionId")
	resources.Registry().Register(&fin.TaxExemptionList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&fin.WithholdingTaxConfig{}, "ConfigId")
	resources.Registry().Register(&fin.WithholdingTaxConfigList{})
}

func registerScmTypes(resources ifs.IResources) {
	// Procurement
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmPurchaseRequisition{}, "RequisitionId")
	resources.Registry().Register(&scm.ScmPurchaseRequisitionList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmRequisitionLine{}, "LineId")
	resources.Registry().Register(&scm.ScmRequisitionLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmRequestForQuotation{}, "RfqId")
	resources.Registry().Register(&scm.ScmRequestForQuotationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmPurchaseOrder{}, "PurchaseOrderId")
	resources.Registry().Register(&scm.ScmPurchaseOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmPurchaseOrderLine{}, "LineId")
	resources.Registry().Register(&scm.ScmPurchaseOrderLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmBlanketOrder{}, "BlanketOrderId")
	resources.Registry().Register(&scm.ScmBlanketOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmSupplierScorecard{}, "ScorecardId")
	resources.Registry().Register(&scm.ScmSupplierScorecardList{})

	// Inventory Management
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmItem{}, "ItemId")
	resources.Registry().Register(&scm.ScmItemList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmItemCategory{}, "CategoryId")
	resources.Registry().Register(&scm.ScmItemCategoryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmStockMovement{}, "MovementId")
	resources.Registry().Register(&scm.ScmStockMovementList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmLotNumber{}, "LotId")
	resources.Registry().Register(&scm.ScmLotNumberList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmSerialNumber{}, "SerialId")
	resources.Registry().Register(&scm.ScmSerialNumberList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmCycleCount{}, "CycleCountId")
	resources.Registry().Register(&scm.ScmCycleCountList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmReorderPoint{}, "ReorderPointId")
	resources.Registry().Register(&scm.ScmReorderPointList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmInventoryValuation{}, "ValuationId")
	resources.Registry().Register(&scm.ScmInventoryValuationList{})

	// Warehouse Management
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmWarehouse{}, "WarehouseId")
	resources.Registry().Register(&scm.ScmWarehouseList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmBin{}, "BinId")
	resources.Registry().Register(&scm.ScmBinList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmReceivingOrder{}, "ReceivingOrderId")
	resources.Registry().Register(&scm.ScmReceivingOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmPutawayTask{}, "TaskId")
	resources.Registry().Register(&scm.ScmPutawayTaskList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmPickTask{}, "TaskId")
	resources.Registry().Register(&scm.ScmPickTaskList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmPackTask{}, "TaskId")
	resources.Registry().Register(&scm.ScmPackTaskList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmShipTask{}, "TaskId")
	resources.Registry().Register(&scm.ScmShipTaskList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmWavePlan{}, "WavePlanId")
	resources.Registry().Register(&scm.ScmWavePlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmDockSchedule{}, "ScheduleId")
	resources.Registry().Register(&scm.ScmDockScheduleList{})

	// Logistics and Transportation
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmCarrier{}, "CarrierId")
	resources.Registry().Register(&scm.ScmCarrierList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmFreightRate{}, "RateId")
	resources.Registry().Register(&scm.ScmFreightRateList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmShipment{}, "ShipmentId")
	resources.Registry().Register(&scm.ScmShipmentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmRoute{}, "RouteId")
	resources.Registry().Register(&scm.ScmRouteList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmLoadPlan{}, "LoadPlanId")
	resources.Registry().Register(&scm.ScmLoadPlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmDeliveryProof{}, "ProofId")
	resources.Registry().Register(&scm.ScmDeliveryProofList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmFreightAudit{}, "AuditId")
	resources.Registry().Register(&scm.ScmFreightAuditList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmReturnAuthorization{}, "RmaId")
	resources.Registry().Register(&scm.ScmReturnAuthorizationList{})

	// Demand Planning
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmDemandForecast{}, "ForecastId")
	resources.Registry().Register(&scm.ScmDemandForecastList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmForecastModel{}, "ModelId")
	resources.Registry().Register(&scm.ScmForecastModelList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmDemandPlan{}, "PlanId")
	resources.Registry().Register(&scm.ScmDemandPlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmPromotionalPlan{}, "PlanId")
	resources.Registry().Register(&scm.ScmPromotionalPlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmNewProductPlan{}, "PlanId")
	resources.Registry().Register(&scm.ScmNewProductPlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmForecastAccuracy{}, "AccuracyId")
	resources.Registry().Register(&scm.ScmForecastAccuracyList{})

	// Supply Planning
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmMaterialRequirement{}, "RequirementId")
	resources.Registry().Register(&scm.ScmMaterialRequirementList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmDistributionRequirement{}, "RequirementId")
	resources.Registry().Register(&scm.ScmDistributionRequirementList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmSupplyPlan{}, "PlanId")
	resources.Registry().Register(&scm.ScmSupplyPlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmSupplierCollaboration{}, "CollaborationId")
	resources.Registry().Register(&scm.ScmSupplierCollaborationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmSafetyStock{}, "SafetyStockId")
	resources.Registry().Register(&scm.ScmSafetyStockList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&scm.ScmLeadTime{}, "LeadTimeId")
	resources.Registry().Register(&scm.ScmLeadTimeList{})
}

func registerSalesTypes(resources ifs.IResources) {
	// Customer Management
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesCustomerHierarchy{}, "HierarchyId")
	resources.Registry().Register(&sales.SalesCustomerHierarchyList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesCustomerSegment{}, "SegmentId")
	resources.Registry().Register(&sales.SalesCustomerSegmentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesCustomerContract{}, "ContractId")
	resources.Registry().Register(&sales.SalesCustomerContractList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesPartnerChannel{}, "PartnerId")
	resources.Registry().Register(&sales.SalesPartnerChannelList{})

	// Orders
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesQuotation{}, "QuotationId")
	resources.Registry().Register(&sales.SalesQuotationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesQuotationLine{}, "LineId")
	resources.Registry().Register(&sales.SalesQuotationLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesOrder{}, "SalesOrderId")
	resources.Registry().Register(&sales.SalesOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesOrderLine{}, "LineId")
	resources.Registry().Register(&sales.SalesOrderLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesOrderAllocation{}, "AllocationId")
	resources.Registry().Register(&sales.SalesOrderAllocationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesBackOrder{}, "BackOrderId")
	resources.Registry().Register(&sales.SalesBackOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesReturnOrder{}, "ReturnOrderId")
	resources.Registry().Register(&sales.SalesReturnOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesReturnOrderLine{}, "LineId")
	resources.Registry().Register(&sales.SalesReturnOrderLineList{})

	// Pricing
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesPriceList{}, "PriceListId")
	resources.Registry().Register(&sales.SalesPriceListList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesPriceListEntry{}, "EntryId")
	resources.Registry().Register(&sales.SalesPriceListEntryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesCustomerPrice{}, "CustomerPriceId")
	resources.Registry().Register(&sales.SalesCustomerPriceList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesDiscountRule{}, "RuleId")
	resources.Registry().Register(&sales.SalesDiscountRuleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesPromotionalPrice{}, "PromoId")
	resources.Registry().Register(&sales.SalesPromotionalPriceList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesQuantityBreak{}, "BreakId")
	resources.Registry().Register(&sales.SalesQuantityBreakList{})

	// Shipping and Delivery
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesDeliveryOrder{}, "DeliveryOrderId")
	resources.Registry().Register(&sales.SalesDeliveryOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesDeliveryLine{}, "LineId")
	resources.Registry().Register(&sales.SalesDeliveryLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesPickRelease{}, "PickReleaseId")
	resources.Registry().Register(&sales.SalesPickReleaseList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesPackingSlip{}, "PackingSlipId")
	resources.Registry().Register(&sales.SalesPackingSlipList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesShippingDoc{}, "DocId")
	resources.Registry().Register(&sales.SalesShippingDocList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesDeliveryConfirm{}, "ConfirmId")
	resources.Registry().Register(&sales.SalesDeliveryConfirmList{})

	// Billing
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesBillingSchedule{}, "ScheduleId")
	resources.Registry().Register(&sales.SalesBillingScheduleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesBillingMilestone{}, "MilestoneId")
	resources.Registry().Register(&sales.SalesBillingMilestoneList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesRevenueSchedule{}, "ScheduleId")
	resources.Registry().Register(&sales.SalesRevenueScheduleList{})

	// Analytics
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesTarget{}, "TargetId")
	resources.Registry().Register(&sales.SalesTargetList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesTerritory{}, "TerritoryId")
	resources.Registry().Register(&sales.SalesTerritoryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesTerritoryAssign{}, "AssignmentId")
	resources.Registry().Register(&sales.SalesTerritoryAssignList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesCommissionPlan{}, "PlanId")
	resources.Registry().Register(&sales.SalesCommissionPlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesCommissionCalc{}, "CalcId")
	resources.Registry().Register(&sales.SalesCommissionCalcList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesForecast{}, "ForecastId")
	resources.Registry().Register(&sales.SalesForecastList{})
}

func registerMfgTypes(resources ifs.IResources) {
	// Engineering
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgBom{}, "BomId")
	resources.Registry().Register(&mfg.MfgBomList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgBomLine{}, "LineId")
	resources.Registry().Register(&mfg.MfgBomLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgRouting{}, "RoutingId")
	resources.Registry().Register(&mfg.MfgRoutingList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgRoutingOperation{}, "OperationId")
	resources.Registry().Register(&mfg.MfgRoutingOperationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgEngChangeOrder{}, "ChangeOrderId")
	resources.Registry().Register(&mfg.MfgEngChangeOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgEngChangeDetail{}, "DetailId")
	resources.Registry().Register(&mfg.MfgEngChangeDetailList{})

	// Production
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgWorkOrder{}, "WorkOrderId")
	resources.Registry().Register(&mfg.MfgWorkOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgWorkOrderOp{}, "OperationId")
	resources.Registry().Register(&mfg.MfgWorkOrderOpList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgProductionOrder{}, "ProdOrderId")
	resources.Registry().Register(&mfg.MfgProductionOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgProdOrderLine{}, "LineId")
	resources.Registry().Register(&mfg.MfgProdOrderLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgProdBatch{}, "BatchId")
	resources.Registry().Register(&mfg.MfgProdBatchList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgProdConsumption{}, "ConsumptionId")
	resources.Registry().Register(&mfg.MfgProdConsumptionList{})

	// Shop Floor
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgWorkCenter{}, "WorkCenterId")
	resources.Registry().Register(&mfg.MfgWorkCenterList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgWorkCenterCap{}, "CapacityId")
	resources.Registry().Register(&mfg.MfgWorkCenterCapList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgLaborEntry{}, "EntryId")
	resources.Registry().Register(&mfg.MfgLaborEntryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgMachineEntry{}, "EntryId")
	resources.Registry().Register(&mfg.MfgMachineEntryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgShiftSchedule{}, "ScheduleId")
	resources.Registry().Register(&mfg.MfgShiftScheduleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgDowntimeEvent{}, "EventId")
	resources.Registry().Register(&mfg.MfgDowntimeEventList{})

	// Quality
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgQualityPlan{}, "PlanId")
	resources.Registry().Register(&mfg.MfgQualityPlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgInspectionPoint{}, "PointId")
	resources.Registry().Register(&mfg.MfgInspectionPointList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgQualityInspection{}, "InspectionId")
	resources.Registry().Register(&mfg.MfgQualityInspectionList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgTestResult{}, "ResultId")
	resources.Registry().Register(&mfg.MfgTestResultList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgNCR{}, "NcrId")
	resources.Registry().Register(&mfg.MfgNCRList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgNCRAction{}, "ActionId")
	resources.Registry().Register(&mfg.MfgNCRActionList{})

	// Planning
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgMrpRun{}, "RunId")
	resources.Registry().Register(&mfg.MfgMrpRunList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgMrpRequirement{}, "RequirementId")
	resources.Registry().Register(&mfg.MfgMrpRequirementList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgCapacityPlan{}, "PlanId")
	resources.Registry().Register(&mfg.MfgCapacityPlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgCapacityLoad{}, "LoadId")
	resources.Registry().Register(&mfg.MfgCapacityLoadList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgProdSchedule{}, "ScheduleId")
	resources.Registry().Register(&mfg.MfgProdScheduleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgScheduleBlock{}, "BlockId")
	resources.Registry().Register(&mfg.MfgScheduleBlockList{})

	// Costing
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgStandardCost{}, "CostId")
	resources.Registry().Register(&mfg.MfgStandardCostList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgCostRollup{}, "RollupId")
	resources.Registry().Register(&mfg.MfgCostRollupList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgActualCost{}, "ActualCostId")
	resources.Registry().Register(&mfg.MfgActualCostList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgCostVariance{}, "VarianceId")
	resources.Registry().Register(&mfg.MfgCostVarianceList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgOverhead{}, "OverheadId")
	resources.Registry().Register(&mfg.MfgOverheadList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&mfg.MfgOverheadAlloc{}, "AllocationId")
	resources.Registry().Register(&mfg.MfgOverheadAllocList{})
}

func registerCrmTypes(resources ifs.IResources) {
	// Lead Management
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmLead{}, "LeadId")
	resources.Registry().Register(&crm.CrmLeadList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmLeadSource{}, "SourceId")
	resources.Registry().Register(&crm.CrmLeadSourceList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmLeadScore{}, "ScoreId")
	resources.Registry().Register(&crm.CrmLeadScoreList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmLeadActivity{}, "ActivityId")
	resources.Registry().Register(&crm.CrmLeadActivityList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmLeadAssign{}, "AssignmentId")
	resources.Registry().Register(&crm.CrmLeadAssignList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmLeadConversion{}, "ConversionId")
	resources.Registry().Register(&crm.CrmLeadConversionList{})

	// Opportunity Management
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmOpportunity{}, "OpportunityId")
	resources.Registry().Register(&crm.CrmOpportunityList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmOppStage{}, "StageId")
	resources.Registry().Register(&crm.CrmOppStageList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmOppCompetitor{}, "CompetitorId")
	resources.Registry().Register(&crm.CrmOppCompetitorList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmOppProduct{}, "LineId")
	resources.Registry().Register(&crm.CrmOppProductList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmOppTeam{}, "MemberId")
	resources.Registry().Register(&crm.CrmOppTeamList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmOppActivity{}, "ActivityId")
	resources.Registry().Register(&crm.CrmOppActivityList{})

	// Account Management
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmAccount{}, "AccountId")
	resources.Registry().Register(&crm.CrmAccountList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmContact{}, "ContactId")
	resources.Registry().Register(&crm.CrmContactList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmInteraction{}, "InteractionId")
	resources.Registry().Register(&crm.CrmInteractionList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmRelationship{}, "RelationshipId")
	resources.Registry().Register(&crm.CrmRelationshipList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmHealthScore{}, "ScoreId")
	resources.Registry().Register(&crm.CrmHealthScoreList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmAccountPlan{}, "PlanId")
	resources.Registry().Register(&crm.CrmAccountPlanList{})

	// Marketing
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmCampaign{}, "CampaignId")
	resources.Registry().Register(&crm.CrmCampaignList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmCampaignMember{}, "MemberId")
	resources.Registry().Register(&crm.CrmCampaignMemberList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmEmailTemplate{}, "TemplateId")
	resources.Registry().Register(&crm.CrmEmailTemplateList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmMarketingList{}, "ListId")
	resources.Registry().Register(&crm.CrmMarketingListList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmCampaignResponse{}, "ResponseId")
	resources.Registry().Register(&crm.CrmCampaignResponseList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmCampaignROI{}, "RoiId")
	resources.Registry().Register(&crm.CrmCampaignROIList{})

	// Customer Service
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmCase{}, "CaseId")
	resources.Registry().Register(&crm.CrmCaseList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmCaseComment{}, "CommentId")
	resources.Registry().Register(&crm.CrmCaseCommentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmKBArticle{}, "ArticleId")
	resources.Registry().Register(&crm.CrmKBArticleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmSLA{}, "SlaId")
	resources.Registry().Register(&crm.CrmSLAList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmEscalation{}, "EscalationId")
	resources.Registry().Register(&crm.CrmEscalationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmSurvey{}, "SurveyId")
	resources.Registry().Register(&crm.CrmSurveyList{})

	// Field Service
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmServiceOrder{}, "OrderId")
	resources.Registry().Register(&crm.CrmServiceOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmTechnician{}, "TechnicianId")
	resources.Registry().Register(&crm.CrmTechnicianList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmServiceContract{}, "ContractId")
	resources.Registry().Register(&crm.CrmServiceContractList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmServiceSchedule{}, "ScheduleId")
	resources.Registry().Register(&crm.CrmServiceScheduleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmServicePart{}, "PartId")
	resources.Registry().Register(&crm.CrmServicePartList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&crm.CrmServiceVisit{}, "VisitId")
	resources.Registry().Register(&crm.CrmServiceVisitList{})
}

func registerPrjTypes(resources ifs.IResources) {
	// Planning
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjProject{}, "ProjectId")
	resources.Registry().Register(&prj.PrjProjectList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjProjectTemplate{}, "TemplateId")
	resources.Registry().Register(&prj.PrjProjectTemplateList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjPhase{}, "PhaseId")
	resources.Registry().Register(&prj.PrjPhaseList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjTask{}, "TaskId")
	resources.Registry().Register(&prj.PrjTaskList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjMilestone{}, "MilestoneId")
	resources.Registry().Register(&prj.PrjMilestoneList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjDeliverable{}, "DeliverableId")
	resources.Registry().Register(&prj.PrjDeliverableList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjDependency{}, "DependencyId")
	resources.Registry().Register(&prj.PrjDependencyList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjRisk{}, "RiskId")
	resources.Registry().Register(&prj.PrjRiskList{})

	// Resources
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjResourcePool{}, "PoolId")
	resources.Registry().Register(&prj.PrjResourcePoolList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjResource{}, "ResourceId")
	resources.Registry().Register(&prj.PrjResourceList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjResourceSkill{}, "SkillId")
	resources.Registry().Register(&prj.PrjResourceSkillList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjAllocation{}, "AllocationId")
	resources.Registry().Register(&prj.PrjAllocationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjBooking{}, "BookingId")
	resources.Registry().Register(&prj.PrjBookingList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjCapacityPlan{}, "PlanId")
	resources.Registry().Register(&prj.PrjCapacityPlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjUtilization{}, "UtilizationId")
	resources.Registry().Register(&prj.PrjUtilizationList{})

	// Time & Expense
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjTimesheet{}, "TimesheetId")
	resources.Registry().Register(&prj.PrjTimesheetList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjTimesheetEntry{}, "EntryId")
	resources.Registry().Register(&prj.PrjTimesheetEntryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjExpenseReport{}, "ReportId")
	resources.Registry().Register(&prj.PrjExpenseReportList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjExpenseEntry{}, "EntryId")
	resources.Registry().Register(&prj.PrjExpenseEntryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjApprovalRule{}, "RuleId")
	resources.Registry().Register(&prj.PrjApprovalRuleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjExpenseCategory{}, "CategoryId")
	resources.Registry().Register(&prj.PrjExpenseCategoryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjExpensePolicy{}, "PolicyId")
	resources.Registry().Register(&prj.PrjExpensePolicyList{})

	// Billing
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjBillingRate{}, "RateId")
	resources.Registry().Register(&prj.PrjBillingRateList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjBillingSchedule{}, "ScheduleId")
	resources.Registry().Register(&prj.PrjBillingScheduleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjBillingMilestone{}, "MilestoneId")
	resources.Registry().Register(&prj.PrjBillingMilestoneList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjProjectInvoice{}, "InvoiceId")
	resources.Registry().Register(&prj.PrjProjectInvoiceList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjInvoiceLine{}, "LineId")
	resources.Registry().Register(&prj.PrjInvoiceLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjRevenueRecognition{}, "RecognitionId")
	resources.Registry().Register(&prj.PrjRevenueRecognitionList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjProjectBudget{}, "BudgetId")
	resources.Registry().Register(&prj.PrjProjectBudgetList{})

	// Analytics
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjStatusReport{}, "StatusId")
	resources.Registry().Register(&prj.PrjStatusReportList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjEarnedValue{}, "EarnedValueId")
	resources.Registry().Register(&prj.PrjEarnedValueList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjBudgetVariance{}, "VarianceId")
	resources.Registry().Register(&prj.PrjBudgetVarianceList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjResourceForecast{}, "ForecastId")
	resources.Registry().Register(&prj.PrjResourceForecastList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjPortfolioView{}, "ViewId")
	resources.Registry().Register(&prj.PrjPortfolioViewList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjProjectKPI{}, "KpiId")
	resources.Registry().Register(&prj.PrjProjectKPIList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&prj.PrjProjectIssue{}, "IssueId")
	resources.Registry().Register(&prj.PrjProjectIssueList{})
}
