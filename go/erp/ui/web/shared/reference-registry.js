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
/**
 * ERP Reference Registry
 * Central configuration for all reference/lookup fields.
 * Used by erp-forms.js to auto-configure reference pickers.
 *
 * NOTE: Endpoints are NOT stored here - they are auto-discovered
 * from HCM.modules (or future Financial.modules, SCM.modules, etc.)
 * based on the modelName.
 *
 * Future modules (Financial, SCM, Manufacturing, etc.) add their models here.
 */
(function() {
    'use strict';

    window.ERPReferenceRegistry = {
        // ========================================
        // Core HR Models
        // ========================================
        Employee: {
            idColumn: 'employeeId',
            displayColumn: 'lastName',
            selectColumns: ['employeeId', 'lastName', 'firstName'],
            displayFormat: function(item) {
                return item.lastName + ', ' + item.firstName;
            },
            displayLabel: 'Name'
        },
        Organization: {
            idColumn: 'organizationId',
            displayColumn: 'name'
        },
        Department: {
            idColumn: 'departmentId',
            displayColumn: 'name'
        },
        Position: {
            idColumn: 'positionId',
            displayColumn: 'title'
        },
        Job: {
            idColumn: 'jobId',
            displayColumn: 'title'
        },
        JobFamily: {
            idColumn: 'jobFamilyId',
            displayColumn: 'name'
        },
        EmployeeDocument: {
            idColumn: 'documentId',
            displayColumn: 'name'
        },
        ComplianceRecord: {
            idColumn: 'recordId',
            displayColumn: 'recordId'
        },

        // ========================================
        // Time & Attendance Models
        // ========================================
        Timesheet: {
            idColumn: 'timesheetId',
            displayColumn: 'timesheetId'
        },
        LeaveRequest: {
            idColumn: 'requestId',
            displayColumn: 'requestId'
        },
        LeaveBalance: {
            idColumn: 'balanceId',
            displayColumn: 'balanceId'
        },
        LeavePolicy: {
            idColumn: 'policyId',
            displayColumn: 'name'
        },
        Shift: {
            idColumn: 'shiftId',
            displayColumn: 'name'
        },
        Schedule: {
            idColumn: 'scheduleId',
            displayColumn: 'scheduleId'
        },
        Holiday: {
            idColumn: 'holidayId',
            displayColumn: 'name'
        },
        Absence: {
            idColumn: 'absenceId',
            displayColumn: 'absenceId'
        },

        // ========================================
        // Benefits Models
        // ========================================
        BenefitPlan: {
            idColumn: 'planId',
            displayColumn: 'name'
        },
        BenefitEnrollment: {
            idColumn: 'enrollmentId',
            displayColumn: 'enrollmentId'
        },
        Carrier: {
            idColumn: 'carrierId',
            displayColumn: 'name'
        },
        Dependent: {
            idColumn: 'dependentId',
            displayColumn: 'firstName',
            selectColumns: ['dependentId', 'firstName', 'lastName'],
            displayFormat: function(item) {
                return item.lastName + ', ' + item.firstName;
            },
            displayLabel: 'Name'
        },
        LifeEvent: {
            idColumn: 'eventId',
            displayColumn: 'eventType'
        },
        COBRAEvent: {
            idColumn: 'cobraEventId',
            displayColumn: 'cobraEventId'
        },

        // ========================================
        // Talent Management Models
        // ========================================
        PerformanceReview: {
            idColumn: 'reviewId',
            displayColumn: 'reviewId'
        },
        Goal: {
            idColumn: 'goalId',
            displayColumn: 'title'
        },
        Feedback: {
            idColumn: 'feedbackId',
            displayColumn: 'feedbackId'
        },
        CareerPath: {
            idColumn: 'careerPathId',
            displayColumn: 'name'
        },
        SuccessionPlan: {
            idColumn: 'planId',
            displayColumn: 'planId'
        },
        JobRequisition: {
            idColumn: 'requisitionId',
            displayColumn: 'title'
        },
        Applicant: {
            idColumn: 'applicantId',
            displayColumn: 'lastName',
            selectColumns: ['applicantId', 'lastName', 'firstName'],
            displayFormat: function(item) {
                return item.lastName + ', ' + item.firstName;
            },
            displayLabel: 'Name'
        },
        Application: {
            idColumn: 'applicationId',
            displayColumn: 'applicationId'
        },
        OnboardingTask: {
            idColumn: 'taskId',
            displayColumn: 'name'
        },

        // ========================================
        // Learning Models
        // ========================================
        Course: {
            idColumn: 'courseId',
            displayColumn: 'title'
        },
        CourseSession: {
            idColumn: 'sessionId',
            displayColumn: 'sessionId'
        },
        CourseEnrollment: {
            idColumn: 'enrollmentId',
            displayColumn: 'enrollmentId'
        },
        Certification: {
            idColumn: 'certificationId',
            displayColumn: 'name'
        },
        EmployeeCertification: {
            idColumn: 'employeeCertificationId',
            displayColumn: 'employeeCertificationId'
        },
        Skill: {
            idColumn: 'skillId',
            displayColumn: 'name'
        },
        EmployeeSkill: {
            idColumn: 'employeeSkillId',
            displayColumn: 'employeeSkillId'
        },
        TrainingRecord: {
            idColumn: 'recordId',
            displayColumn: 'trainingName'
        },

        // ========================================
        // Compensation Models
        // ========================================
        SalaryStructure: {
            idColumn: 'structureId',
            displayColumn: 'name'
        },
        SalaryGrade: {
            idColumn: 'gradeId',
            displayColumn: 'name'
        },
        EmployeeCompensation: {
            idColumn: 'compensationId',
            displayColumn: 'compensationId'
        },
        MeritIncrease: {
            idColumn: 'increaseId',
            displayColumn: 'increaseId'
        },
        MeritCycle: {
            idColumn: 'cycleId',
            displayColumn: 'name'
        },
        BonusPlan: {
            idColumn: 'planId',
            displayColumn: 'name'
        },
        BonusPayment: {
            idColumn: 'paymentId',
            displayColumn: 'paymentId'
        },
        EquityGrant: {
            idColumn: 'grantId',
            displayColumn: 'grantNumber'
        },
        CompensationStatement: {
            idColumn: 'statementId',
            displayColumn: 'statementId'
        },
        MarketBenchmark: {
            idColumn: 'benchmarkId',
            displayColumn: 'jobTitle'
        },

        // ========================================
        // Payroll Models
        // ========================================
        PayStructure: {
            idColumn: 'structureId',
            displayColumn: 'name'
        },
        PayComponent: {
            idColumn: 'componentId',
            displayColumn: 'name'
        },
        PayrollRun: {
            idColumn: 'payrollRunId',
            displayColumn: 'payrollRunId'
        },
        Payslip: {
            idColumn: 'payslipId',
            displayColumn: 'payslipId'
        },
        TaxWithholding: {
            idColumn: 'withholdingId',
            displayColumn: 'withholdingId'
        },
        DirectDeposit: {
            idColumn: 'depositId',
            displayColumn: 'depositId'
        },
        Garnishment: {
            idColumn: 'garnishmentId',
            displayColumn: 'garnishmentId'
        },
        YearEndDocument: {
            idColumn: 'documentId',
            displayColumn: 'documentType'
        },

        // ========================================
        // Financial Management - General Ledger
        // ========================================
        Account: {
            idColumn: 'accountId',
            displayColumn: 'name',
            selectColumns: ['accountId', 'accountNumber', 'name'],
            displayFormat: function(item) {
                return item.accountNumber + ' - ' + item.name;
            },
            displayLabel: 'Account'
        },
        JournalEntry: {
            idColumn: 'journalEntryId',
            displayColumn: 'entryNumber'
        },
        JournalEntryLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        FiscalYear: {
            idColumn: 'fiscalYearId',
            displayColumn: 'yearName',
            selectColumns: ['fiscalYearId', 'yearName']
        },
        FiscalPeriod: {
            idColumn: 'fiscalPeriodId',
            displayColumn: 'periodName',
            selectColumns: ['fiscalPeriodId', 'periodName']
        },
        Currency: {
            idColumn: 'currencyId',
            displayColumn: 'name',
            selectColumns: ['currencyId', 'code', 'name'],
            displayFormat: function(item) {
                return item.code + ' - ' + item.name;
            },
            displayLabel: 'Currency'
        },
        ExchangeRate: {
            idColumn: 'exchangeRateId',
            displayColumn: 'exchangeRateId'
        },
        AccountBalance: {
            idColumn: 'balanceId',
            displayColumn: 'balanceId'
        },

        // ========================================
        // Financial Management - Accounts Payable
        // ========================================
        Vendor: {
            idColumn: 'vendorId',
            displayColumn: 'name',
            selectColumns: ['vendorId', 'vendorNumber', 'name'],
            displayFormat: function(item) {
                return item.vendorNumber + ' - ' + item.name;
            },
            displayLabel: 'Vendor'
        },
        VendorContact: {
            idColumn: 'contactId',
            displayColumn: 'contactName'
        },
        PurchaseInvoice: {
            idColumn: 'invoiceId',
            displayColumn: 'invoiceNumber'
        },
        PurchaseInvoiceLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        PaymentSchedule: {
            idColumn: 'scheduleId',
            displayColumn: 'scheduleId'
        },
        VendorPayment: {
            idColumn: 'paymentId',
            displayColumn: 'paymentNumber'
        },
        PaymentAllocation: {
            idColumn: 'allocationId',
            displayColumn: 'allocationId'
        },
        VendorStatement: {
            idColumn: 'statementId',
            displayColumn: 'statementId'
        },

        // ========================================
        // Financial Management - Accounts Receivable
        // ========================================
        Customer: {
            idColumn: 'customerId',
            displayColumn: 'name',
            selectColumns: ['customerId', 'customerNumber', 'name'],
            displayFormat: function(item) {
                return item.customerNumber + ' - ' + item.name;
            },
            displayLabel: 'Customer'
        },
        CustomerContact: {
            idColumn: 'contactId',
            displayColumn: 'contactName'
        },
        SalesInvoice: {
            idColumn: 'invoiceId',
            displayColumn: 'invoiceNumber'
        },
        SalesInvoiceLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        CustomerPayment: {
            idColumn: 'paymentId',
            displayColumn: 'paymentNumber'
        },
        PaymentApplication: {
            idColumn: 'applicationId',
            displayColumn: 'applicationId'
        },
        CreditMemo: {
            idColumn: 'creditMemoId',
            displayColumn: 'memoNumber'
        },
        DunningLetter: {
            idColumn: 'letterId',
            displayColumn: 'letterId'
        },

        // ========================================
        // Financial Management - Cash Management
        // ========================================
        BankAccount: {
            idColumn: 'bankAccountId',
            displayColumn: 'accountName',
            selectColumns: ['bankAccountId', 'accountName', 'bankName'],
            displayFormat: function(item) {
                return item.bankName + ' - ' + item.accountName;
            },
            displayLabel: 'Bank Account'
        },
        BankTransaction: {
            idColumn: 'transactionId',
            displayColumn: 'transactionId'
        },
        BankReconciliation: {
            idColumn: 'reconciliationId',
            displayColumn: 'reconciliationId'
        },
        CashForecast: {
            idColumn: 'forecastId',
            displayColumn: 'forecastId'
        },
        FundTransfer: {
            idColumn: 'transferId',
            displayColumn: 'transferId'
        },
        PettyCash: {
            idColumn: 'pettyCashId',
            displayColumn: 'pettyCashId'
        },

        // ========================================
        // Financial Management - Fixed Assets
        // ========================================
        Asset: {
            idColumn: 'assetId',
            displayColumn: 'name',
            selectColumns: ['assetId', 'assetNumber', 'name'],
            displayFormat: function(item) {
                return item.assetNumber + ' - ' + item.name;
            },
            displayLabel: 'Asset'
        },
        AssetCategory: {
            idColumn: 'categoryId',
            displayColumn: 'name',
            selectColumns: ['categoryId', 'name']
        },
        DepreciationSchedule: {
            idColumn: 'scheduleId',
            displayColumn: 'scheduleId'
        },
        AssetDisposal: {
            idColumn: 'disposalId',
            displayColumn: 'disposalId'
        },
        AssetTransfer: {
            idColumn: 'transferId',
            displayColumn: 'transferId'
        },
        AssetMaintenance: {
            idColumn: 'maintenanceId',
            displayColumn: 'maintenanceId'
        },
        AssetRevaluation: {
            idColumn: 'revaluationId',
            displayColumn: 'revaluationId'
        },

        // ========================================
        // Financial Management - Budgeting
        // ========================================
        Budget: {
            idColumn: 'budgetId',
            displayColumn: 'budgetName',
            selectColumns: ['budgetId', 'budgetName']
        },
        BudgetLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        BudgetTransfer: {
            idColumn: 'transferId',
            displayColumn: 'transferId'
        },
        BudgetScenario: {
            idColumn: 'scenarioId',
            displayColumn: 'name'
        },
        CapitalExpenditure: {
            idColumn: 'capexId',
            displayColumn: 'name'
        },
        Forecast: {
            idColumn: 'forecastId',
            displayColumn: 'forecastId'
        },

        // ========================================
        // Financial Management - Tax
        // ========================================
        TaxCode: {
            idColumn: 'taxCodeId',
            displayColumn: 'name',
            selectColumns: ['taxCodeId', 'code', 'name'],
            displayFormat: function(item) {
                return item.code + ' - ' + item.name;
            },
            displayLabel: 'Tax Code'
        },
        TaxJurisdiction: {
            idColumn: 'jurisdictionId',
            displayColumn: 'name'
        },
        TaxRule: {
            idColumn: 'ruleId',
            displayColumn: 'name'
        },
        TaxReturn: {
            idColumn: 'returnId',
            displayColumn: 'returnId'
        },
        TaxExemption: {
            idColumn: 'exemptionId',
            displayColumn: 'exemptionId'
        },
        WithholdingTaxConfig: {
            idColumn: 'configId',
            displayColumn: 'name'
        }

        // ========================================
        // SCM - Procurement Models
        // ========================================
        PurchaseOrder: {
            idColumn: 'purchaseOrderId',
            displayColumn: 'orderNumber',
            selectColumns: ['purchaseOrderId', 'orderNumber'],
            displayLabel: 'Purchase Order'
        },
        PurchaseOrderLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        PurchaseRequisition: {
            idColumn: 'requisitionId',
            displayColumn: 'requisitionNumber',
            selectColumns: ['requisitionId', 'requisitionNumber'],
            displayLabel: 'Requisition'
        },
        RequisitionLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        SupplierContract: {
            idColumn: 'contractId',
            displayColumn: 'contractNumber',
            selectColumns: ['contractId', 'contractNumber'],
            displayLabel: 'Contract'
        },
        ContractTerm: {
            idColumn: 'termId',
            displayColumn: 'termId'
        },
        RequestForQuote: {
            idColumn: 'rfqId',
            displayColumn: 'rfqNumber',
            selectColumns: ['rfqId', 'rfqNumber'],
            displayLabel: 'RFQ'
        },

        // ========================================
        // SCM - Inventory Models
        // ========================================
        Item: {
            idColumn: 'itemId',
            displayColumn: 'name',
            selectColumns: ['itemId', 'itemNumber', 'name'],
            displayFormat: function(item) {
                return item.itemNumber + ' - ' + item.name;
            },
            displayLabel: 'Item'
        },
        ItemCategory: {
            idColumn: 'categoryId',
            displayColumn: 'name'
        },
        InventoryLocation: {
            idColumn: 'locationId',
            displayColumn: 'name'
        },
        StockLevel: {
            idColumn: 'stockLevelId',
            displayColumn: 'stockLevelId'
        },
        StockMovement: {
            idColumn: 'movementId',
            displayColumn: 'movementId'
        },
        InventoryCount: {
            idColumn: 'countId',
            displayColumn: 'countId'
        },
        LotSerial: {
            idColumn: 'lotSerialId',
            displayColumn: 'lotNumber'
        },
        ItemPricing: {
            idColumn: 'pricingId',
            displayColumn: 'pricingId'
        },

        // ========================================
        // SCM - Warehouse Management Models
        // ========================================
        Warehouse: {
            idColumn: 'warehouseId',
            displayColumn: 'name',
            selectColumns: ['warehouseId', 'warehouseCode', 'name'],
            displayFormat: function(item) {
                return item.warehouseCode + ' - ' + item.name;
            },
            displayLabel: 'Warehouse'
        },
        Zone: {
            idColumn: 'zoneId',
            displayColumn: 'name'
        },
        Bin: {
            idColumn: 'binId',
            displayColumn: 'binCode'
        },
        ReceivingOrder: {
            idColumn: 'receivingOrderId',
            displayColumn: 'orderNumber'
        },
        ReceivingLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        PickOrder: {
            idColumn: 'pickOrderId',
            displayColumn: 'orderNumber'
        },
        PickLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        PackOrder: {
            idColumn: 'packOrderId',
            displayColumn: 'orderNumber'
        },
        PackLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },

        // ========================================
        // SCM - Logistics & Transportation Models
        // ========================================
        ShipmentCarrier: {
            idColumn: 'carrierId',
            displayColumn: 'name',
            selectColumns: ['carrierId', 'carrierCode', 'name'],
            displayFormat: function(item) {
                return item.carrierCode + ' - ' + item.name;
            },
            displayLabel: 'Carrier'
        },
        Shipment: {
            idColumn: 'shipmentId',
            displayColumn: 'shipmentNumber',
            selectColumns: ['shipmentId', 'shipmentNumber'],
            displayLabel: 'Shipment'
        },
        ShipmentLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        FreightRate: {
            idColumn: 'rateId',
            displayColumn: 'rateId'
        },
        DeliveryRoute: {
            idColumn: 'routeId',
            displayColumn: 'name'
        },
        RouteStop: {
            idColumn: 'stopId',
            displayColumn: 'stopId'
        },
        ReturnOrder: {
            idColumn: 'returnOrderId',
            displayColumn: 'orderNumber'
        },
        ReturnLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },

        // ========================================
        // SCM - Demand Planning Models
        // ========================================
        DemandForecast: {
            idColumn: 'forecastId',
            displayColumn: 'forecastName',
            selectColumns: ['forecastId', 'forecastName'],
            displayLabel: 'Forecast'
        },
        ForecastItem: {
            idColumn: 'forecastItemId',
            displayColumn: 'forecastItemId'
        },
        DemandHistory: {
            idColumn: 'historyId',
            displayColumn: 'historyId'
        },
        SeasonalProfile: {
            idColumn: 'profileId',
            displayColumn: 'name'
        },
        PromotionImpact: {
            idColumn: 'impactId',
            displayColumn: 'impactId'
        },
        ConsensusAdjustment: {
            idColumn: 'adjustmentId',
            displayColumn: 'adjustmentId'
        },

        // ========================================
        // SCM - Supply Planning Models
        // ========================================
        SupplyPlan: {
            idColumn: 'planId',
            displayColumn: 'planName',
            selectColumns: ['planId', 'planName'],
            displayLabel: 'Supply Plan'
        },
        PlannedOrder: {
            idColumn: 'plannedOrderId',
            displayColumn: 'orderNumber'
        },
        MRPRun: {
            idColumn: 'mrpRunId',
            displayColumn: 'mrpRunId'
        },
        MRPException: {
            idColumn: 'exceptionId',
            displayColumn: 'exceptionId'
        },
        SafetyStock: {
            idColumn: 'safetyStockId',
            displayColumn: 'safetyStockId'
        },
        ReorderRule: {
            idColumn: 'ruleId',
            displayColumn: 'ruleName'
        }

        // ========================================
        // Future: Manufacturing, Sales models
        // ========================================
    };

})();
