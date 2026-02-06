/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Navigation Configuration - Financial and HCM Modules
 */
(function() {
    'use strict';

    window.LAYER8M_NAV_CONFIG_FIN_HCM = {
        // FIN Sub-Modules (Level 2)
        financial: {
            subModules: [
                { key: 'general-ledger', label: 'General Ledger', icon: 'financial' },
                { key: 'accounts-payable', label: 'Accounts Payable', icon: 'financial' },
                { key: 'accounts-receivable', label: 'Accounts Receivable', icon: 'financial' },
                { key: 'cash-management', label: 'Cash Management', icon: 'financial' },
                { key: 'fixed-assets', label: 'Fixed Assets', icon: 'financial' },
                { key: 'budgeting', label: 'Budgeting', icon: 'financial' },
                { key: 'tax-management', label: 'Tax Management', icon: 'financial' }
            ],

            // Services for each sub-module (Level 3) - EXACT order from desktop fin-config.js
            services: {
                'general-ledger': [
                    { key: 'accounts', label: 'Accounts', icon: 'financial', endpoint: '/40/Account', model: 'Account', idField: 'accountId' },
                    { key: 'journal-entries', label: 'Journal Entries', icon: 'financial', endpoint: '/40/JrnlEntry', model: 'JournalEntry', idField: 'journalEntryId' },
                    { key: 'journal-entry-lines', label: 'Entry Lines', icon: 'financial', endpoint: '/40/JrnlLine', model: 'JournalEntryLine', idField: 'lineId' },
                    { key: 'fiscal-years', label: 'Fiscal Years', icon: 'financial', endpoint: '/40/FiscalYr', model: 'FiscalYear', idField: 'fiscalYearId' },
                    { key: 'fiscal-periods', label: 'Fiscal Periods', icon: 'financial', endpoint: '/40/FiscalPd', model: 'FiscalPeriod', idField: 'fiscalPeriodId' },
                    { key: 'currencies', label: 'Currencies', icon: 'financial', endpoint: '/40/Currency', model: 'Currency', idField: 'currencyId' },
                    { key: 'exchange-rates', label: 'Exchange Rates', icon: 'financial', endpoint: '/40/XchgRate', model: 'ExchangeRate', idField: 'exchangeRateId' },
                    { key: 'account-balances', label: 'Balances', icon: 'financial', endpoint: '/40/AcctBal', model: 'AccountBalance', idField: 'balanceId' }
                ],
                'accounts-payable': [
                    { key: 'vendors', label: 'Vendors', icon: 'financial', endpoint: '/40/Vendor', model: 'Vendor', idField: 'vendorId' },
                    { key: 'vendor-contacts', label: 'Vendor Contacts', icon: 'financial', endpoint: '/40/VndrCont', model: 'VendorContact', idField: 'contactId' },
                    { key: 'purchase-invoices', label: 'Purchase Invoices', icon: 'financial', endpoint: '/40/PurchInv', model: 'PurchaseInvoice', idField: 'invoiceId' },
                    { key: 'purchase-invoice-lines', label: 'Invoice Lines', icon: 'financial', endpoint: '/40/PurchLine', model: 'PurchaseInvoiceLine', idField: 'lineId' },
                    { key: 'payment-schedules', label: 'Payment Schedules', icon: 'financial', endpoint: '/40/PmtSched', model: 'PaymentSchedule', idField: 'scheduleId' },
                    { key: 'vendor-payments', label: 'Vendor Payments', icon: 'financial', endpoint: '/40/VndrPmt', model: 'VendorPayment', idField: 'paymentId' },
                    { key: 'payment-allocations', label: 'Payment Allocations', icon: 'financial', endpoint: '/40/PmtAlloc', model: 'PaymentAllocation', idField: 'allocationId' },
                    { key: 'vendor-statements', label: 'Vendor Statements', icon: 'financial', endpoint: '/40/VndrStmt', model: 'VendorStatement', idField: 'statementId' }
                ],
                'accounts-receivable': [
                    { key: 'customers', label: 'Customers', icon: 'financial', endpoint: '/40/Customer', model: 'Customer', idField: 'customerId' },
                    { key: 'customer-contacts', label: 'Customer Contacts', icon: 'financial', endpoint: '/40/CustCont', model: 'CustomerContact', idField: 'contactId' },
                    { key: 'sales-invoices', label: 'Sales Invoices', icon: 'financial', endpoint: '/40/SalesInv', model: 'SalesInvoice', idField: 'invoiceId' },
                    { key: 'sales-invoice-lines', label: 'Invoice Lines', icon: 'financial', endpoint: '/40/SalesLine', model: 'SalesInvoiceLine', idField: 'lineId' },
                    { key: 'customer-payments', label: 'Customer Payments', icon: 'financial', endpoint: '/40/CustPmt', model: 'CustomerPayment', idField: 'paymentId' },
                    { key: 'payment-applications', label: 'Payment Apps', icon: 'financial', endpoint: '/40/PmtApp', model: 'PaymentApplication', idField: 'applicationId' },
                    { key: 'credit-memos', label: 'Credit Memos', icon: 'financial', endpoint: '/40/CrdtMemo', model: 'CreditMemo', idField: 'creditMemoId' },
                    { key: 'dunning-letters', label: 'Dunning Letters', icon: 'financial', endpoint: '/40/DunLtr', model: 'DunningLetter', idField: 'letterId' }
                ],
                'cash-management': [
                    { key: 'bank-accounts', label: 'Bank Accounts', icon: 'financial', endpoint: '/40/BankAcct', model: 'BankAccount', idField: 'bankAccountId' },
                    { key: 'bank-transactions', label: 'Transactions', icon: 'financial', endpoint: '/40/BankTxn', model: 'BankTransaction', idField: 'transactionId' },
                    { key: 'bank-reconciliations', label: 'Reconciliations', icon: 'financial', endpoint: '/40/BankRec', model: 'BankReconciliation', idField: 'reconciliationId' },
                    { key: 'cash-forecasts', label: 'Cash Forecasts', icon: 'financial', endpoint: '/40/CashFcst', model: 'CashForecast', idField: 'forecastId' },
                    { key: 'fund-transfers', label: 'Fund Transfers', icon: 'financial', endpoint: '/40/FundXfer', model: 'FundTransfer', idField: 'transferId' },
                    { key: 'petty-cash', label: 'Petty Cash', icon: 'financial', endpoint: '/40/PettyCash', model: 'PettyCash', idField: 'pettyCashId' }
                ],
                'fixed-assets': [
                    { key: 'assets', label: 'Assets', icon: 'financial', endpoint: '/40/Asset', model: 'Asset', idField: 'assetId' },
                    { key: 'asset-categories', label: 'Categories', icon: 'financial', endpoint: '/40/AstCat', model: 'AssetCategory', idField: 'categoryId' },
                    { key: 'depreciation-schedules', label: 'Depreciation', icon: 'financial', endpoint: '/40/DeprSched', model: 'DepreciationSchedule', idField: 'scheduleId' },
                    { key: 'asset-disposals', label: 'Disposals', icon: 'financial', endpoint: '/40/AstDisp', model: 'AssetDisposal', idField: 'disposalId' },
                    { key: 'asset-transfers', label: 'Transfers', icon: 'financial', endpoint: '/40/AstXfer', model: 'AssetTransfer', idField: 'transferId' },
                    { key: 'asset-maintenance', label: 'Maintenance', icon: 'financial', endpoint: '/40/AstMaint', model: 'AssetMaintenance', idField: 'maintenanceId' },
                    { key: 'asset-revaluations', label: 'Revaluations', icon: 'financial', endpoint: '/40/AstReval', model: 'AssetRevaluation', idField: 'revaluationId' }
                ],
                'budgeting': [
                    { key: 'budgets', label: 'Budgets', icon: 'financial', endpoint: '/40/Budget', model: 'Budget', idField: 'budgetId' },
                    { key: 'budget-lines', label: 'Budget Lines', icon: 'financial', endpoint: '/40/BdgtLine', model: 'BudgetLine', idField: 'lineId' },
                    { key: 'budget-transfers', label: 'Budget Transfers', icon: 'financial', endpoint: '/40/BdgtXfer', model: 'BudgetTransfer', idField: 'transferId' },
                    { key: 'budget-scenarios', label: 'Scenarios', icon: 'financial', endpoint: '/40/BdgtScen', model: 'BudgetScenario', idField: 'scenarioId' },
                    { key: 'capital-expenditures', label: 'Capital Expenditures', icon: 'financial', endpoint: '/40/CapEx', model: 'CapitalExpenditure', idField: 'capexId' },
                    { key: 'forecasts', label: 'Forecasts', icon: 'financial', endpoint: '/40/Forecast', model: 'Forecast', idField: 'forecastId' }
                ],
                'tax-management': [
                    { key: 'tax-codes', label: 'Tax Codes', icon: 'financial', endpoint: '/40/TaxCode', model: 'TaxCode', idField: 'taxCodeId' },
                    { key: 'tax-jurisdictions', label: 'Jurisdictions', icon: 'financial', endpoint: '/40/TaxJuris', model: 'TaxJurisdiction', idField: 'jurisdictionId' },
                    { key: 'tax-rules', label: 'Tax Rules', icon: 'financial', endpoint: '/40/TaxRule', model: 'TaxRule', idField: 'ruleId' },
                    { key: 'tax-returns', label: 'Tax Returns', icon: 'financial', endpoint: '/40/TaxRtn', model: 'TaxReturn', idField: 'returnId' },
                    { key: 'tax-exemptions', label: 'Exemptions', icon: 'financial', endpoint: '/40/TaxExmpt', model: 'TaxExemption', idField: 'exemptionId' },
                    { key: 'withholding-tax-configs', label: 'Withholding Configs', icon: 'financial', endpoint: '/40/WhtTxCfg', model: 'WithholdingTaxConfig', idField: 'configId' }
                ]
            }
        },

        // HCM Sub-Modules (Level 2)
        hcm: {
            subModules: [
                { key: 'core-hr', label: 'Core HR', icon: 'employees' },
                { key: 'payroll', label: 'Payroll', icon: 'financial' },
                { key: 'benefits', label: 'Benefits', icon: 'benefits' },
                { key: 'time', label: 'Time', icon: 'time' },
                { key: 'talent', label: 'Talent', icon: 'talent' },
                { key: 'learning', label: 'Learning', icon: 'learning' },
                { key: 'compensation', label: 'Compensation', icon: 'compensation' }
            ],

            // Services for each sub-module (Level 3) - EXACT order from desktop hcm-config.js
            services: {
                'core-hr': [
                    { key: 'employees', label: 'Employees', icon: 'employees', endpoint: '/30/Employee', model: 'Employee', idField: 'employeeId' },
                    { key: 'positions', label: 'Positions', icon: 'positions', endpoint: '/30/Position', model: 'Position', idField: 'positionId' },
                    { key: 'jobs', label: 'Jobs', icon: 'jobs', endpoint: '/30/Job', model: 'Job', idField: 'jobId' },
                    { key: 'job-families', label: 'Job Families', icon: 'job-families', endpoint: '/30/JobFamily', model: 'JobFamily', idField: 'jobFamilyId' },
                    { key: 'organizations', label: 'Organizations', icon: 'organizations', endpoint: '/30/Org', model: 'Organization', idField: 'organizationId' },
                    { key: 'departments', label: 'Departments', icon: 'departments', endpoint: '/30/Dept', model: 'Department', idField: 'departmentId' },
                    { key: 'documents', label: 'Documents', icon: 'documents', endpoint: '/30/EmpDoc', model: 'EmployeeDocument', idField: 'documentId' },
                    { key: 'compliance', label: 'Compliance', icon: 'compliance', endpoint: '/30/CompRec', model: 'ComplianceRecord', idField: 'recordId' }
                ],
                'payroll': [
                    { key: 'pay-structures', label: 'Pay Structures', icon: 'pay-structures', endpoint: '/30/PayStruct', model: 'PayStructure', idField: 'payStructureId' },
                    { key: 'pay-components', label: 'Pay Components', icon: 'pay-components', endpoint: '/30/PayComp', model: 'PayComponent', idField: 'payComponentId' },
                    { key: 'payroll-runs', label: 'Payroll Runs', icon: 'payroll-runs', endpoint: '/30/PayRun', model: 'PayrollRun', idField: 'payrollRunId' },
                    { key: 'payslips', label: 'Payslips', icon: 'payslips', endpoint: '/30/Payslip', model: 'Payslip', idField: 'payslipId' },
                    { key: 'tax-withholdings', label: 'Tax Withholdings', icon: 'tax-withholdings', endpoint: '/30/TaxWith', model: 'TaxWithholding', idField: 'taxWithholdingId' },
                    { key: 'direct-deposits', label: 'Direct Deposits', icon: 'direct-deposits', endpoint: '/30/DirDep', model: 'DirectDeposit', idField: 'directDepositId' },
                    { key: 'garnishments', label: 'Garnishments', icon: 'garnishments', endpoint: '/30/Garnish', model: 'Garnishment', idField: 'garnishmentId' },
                    { key: 'year-end-docs', label: 'Year-End Docs', icon: 'year-end-docs', endpoint: '/30/YrEndDoc', model: 'YearEndDocument', idField: 'documentId' }
                ],
                'benefits': [
                    { key: 'benefit-plans', label: 'Benefit Plans', icon: 'benefit-plans', endpoint: '/30/BenPlan', model: 'BenefitPlan', idField: 'benefitPlanId' },
                    { key: 'enrollments', label: 'Enrollments', icon: 'enrollments', endpoint: '/30/BenEnrol', model: 'BenefitEnrollment', idField: 'enrollmentId' },
                    { key: 'carriers', label: 'Carriers', icon: 'carriers', endpoint: '/30/Carrier', model: 'Carrier', idField: 'carrierId' },
                    { key: 'dependents', label: 'Dependents', icon: 'dependents', endpoint: '/30/Dependent', model: 'Dependent', idField: 'dependentId' },
                    { key: 'life-events', label: 'Life Events', icon: 'life-events', endpoint: '/30/LifeEvent', model: 'LifeEvent', idField: 'lifeEventId' },
                    { key: 'cobra-events', label: 'COBRA Events', icon: 'cobra-events', endpoint: '/30/COBRAEvt', model: 'COBRAEvent', idField: 'cobraEventId' }
                ],
                'time': [
                    { key: 'timesheets', label: 'Timesheets', icon: 'timesheets', endpoint: '/30/Timesheet', model: 'Timesheet', idField: 'timesheetId' },
                    { key: 'leave-requests', label: 'Leave Requests', icon: 'leave-requests', endpoint: '/30/LeaveReq', model: 'LeaveRequest', idField: 'leaveRequestId' },
                    { key: 'leave-balances', label: 'Leave Balances', icon: 'leave-balances', endpoint: '/30/LeaveBal', model: 'LeaveBalance', idField: 'leaveBalanceId' },
                    { key: 'leave-policies', label: 'Leave Policies', icon: 'leave-policies', endpoint: '/30/LeavePol', model: 'LeavePolicy', idField: 'leavePolicyId' },
                    { key: 'shifts', label: 'Shifts', icon: 'shifts', endpoint: '/30/Shift', model: 'Shift', idField: 'shiftId' },
                    { key: 'schedules', label: 'Schedules', icon: 'schedules', endpoint: '/30/Schedule', model: 'Schedule', idField: 'scheduleId' },
                    { key: 'holidays', label: 'Holidays', icon: 'holidays', endpoint: '/30/Holiday', model: 'Holiday', idField: 'holidayId' },
                    { key: 'absences', label: 'Absences', icon: 'absences', endpoint: '/30/Absence', model: 'Absence', idField: 'absenceId' }
                ],
                'talent': [
                    { key: 'reviews', label: 'Reviews', icon: 'reviews', endpoint: '/30/PerfRevw', model: 'PerformanceReview', idField: 'reviewId' },
                    { key: 'goals', label: 'Goals', icon: 'goals', endpoint: '/30/Goal', model: 'Goal', idField: 'goalId' },
                    { key: 'feedback', label: 'Feedback', icon: 'feedback', endpoint: '/30/Feedback', model: 'Feedback', idField: 'feedbackId' },
                    { key: 'career-paths', label: 'Career Paths', icon: 'career-paths', endpoint: '/30/CarPath', model: 'CareerPath', idField: 'careerPathId' },
                    { key: 'succession', label: 'Succession Plans', icon: 'succession', endpoint: '/30/SuccPlan', model: 'SuccessionPlan', idField: 'successionPlanId' },
                    { key: 'requisitions', label: 'Requisitions', icon: 'requisitions', endpoint: '/30/JobReq', model: 'JobRequisition', idField: 'requisitionId' },
                    { key: 'applicants', label: 'Applicants', icon: 'applicants', endpoint: '/30/Applicant', model: 'Applicant', idField: 'applicantId' },
                    { key: 'applications', label: 'Applications', icon: 'applications', endpoint: '/30/Applctn', model: 'Application', idField: 'applicationId' },
                    { key: 'onboarding', label: 'Onboarding', icon: 'onboarding', endpoint: '/30/OnbrdTsk', model: 'OnboardingTask', idField: 'taskId' }
                ],
                'learning': [
                    { key: 'courses', label: 'Courses', icon: 'courses', endpoint: '/30/Course', model: 'Course', idField: 'courseId' },
                    { key: 'sessions', label: 'Sessions', icon: 'sessions', endpoint: '/30/CrsSess', model: 'CourseSession', idField: 'sessionId' },
                    { key: 'course-enrollments', label: 'Enrollments', icon: 'enrollments', endpoint: '/30/CrsEnrol', model: 'CourseEnrollment', idField: 'enrollmentId' },
                    { key: 'certifications', label: 'Certifications', icon: 'certifications', endpoint: '/30/Cert', model: 'Certification', idField: 'certificationId' },
                    { key: 'emp-certifications', label: 'Emp. Certs', icon: 'emp-certifications', endpoint: '/30/EmpCert', model: 'EmployeeCertification', idField: 'empCertificationId' },
                    { key: 'skills', label: 'Skills', icon: 'skills', endpoint: '/30/Skill', model: 'Skill', idField: 'skillId' },
                    { key: 'emp-skills', label: 'Emp. Skills', icon: 'emp-skills', endpoint: '/30/EmpSkill', model: 'EmployeeSkill', idField: 'empSkillId' },
                    { key: 'training-records', label: 'Training Records', icon: 'training-records', endpoint: '/30/TrnRec', model: 'TrainingRecord', idField: 'recordId' }
                ],
                'compensation': [
                    { key: 'salary-grades', label: 'Salary Grades', icon: 'salary-grades', endpoint: '/30/SalGrade', model: 'SalaryGrade', idField: 'salaryGradeId' },
                    { key: 'salary-structures', label: 'Salary Structures', icon: 'salary-structures', endpoint: '/30/SalStrct', model: 'SalaryStructure', idField: 'salaryStructureId' },
                    { key: 'emp-compensation', label: 'Emp. Compensation', icon: 'emp-compensation', endpoint: '/30/EmpComp', model: 'EmployeeCompensation', idField: 'empCompensationId' },
                    { key: 'merit-increases', label: 'Merit Increases', icon: 'merit-increases', endpoint: '/30/MeritInc', model: 'MeritIncrease', idField: 'meritIncreaseId' },
                    { key: 'merit-cycles', label: 'Merit Cycles', icon: 'merit-cycles', endpoint: '/30/MrtCycle', model: 'MeritCycle', idField: 'meritCycleId' },
                    { key: 'bonus-plans', label: 'Bonus Plans', icon: 'bonus-plans', endpoint: '/30/BonusPlan', model: 'BonusPlan', idField: 'bonusPlanId' },
                    { key: 'bonus-payments', label: 'Bonus Payments', icon: 'bonus-payments', endpoint: '/30/BonusPay', model: 'BonusPayment', idField: 'bonusPaymentId' },
                    { key: 'equity-grants', label: 'Equity Grants', icon: 'equity-grants', endpoint: '/30/EqGrant', model: 'EquityGrant', idField: 'equityGrantId' },
                    { key: 'comp-statements', label: 'Comp. Statements', icon: 'comp-statements', endpoint: '/30/CompStmt', model: 'CompensationStatement', idField: 'statementId' },
                    { key: 'market-benchmarks', label: 'Market Benchmarks', icon: 'market-benchmarks', endpoint: '/30/MktBench', model: 'MarketBenchmark', idField: 'benchmarkId' }
                ]
            }
        }
    };
})();
