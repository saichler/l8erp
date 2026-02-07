/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Payroll Module - Column Configurations
// Part 2 of 3 - Load after payroll-enums.js

(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = window.Payroll.enums;
    const render = window.Payroll.render;

    window.Payroll.columns = {
        PayStructure: [
            ...col.id('payStructureId'),
            ...col.basic(['code', 'name', ['currencyId', 'Currency']]),
            ...col.enum('payFrequency', 'Frequency', enums.PAY_FREQUENCY_VALUES, render.payFrequency),
            ...col.boolean('isActive', 'Active')
        ],

        PayComponent: [
            ...col.id('componentId'),
            ...col.basic(['code', 'name']),
            ...col.enum('componentType', 'Type', enums.PAY_COMPONENT_TYPE_VALUES, render.componentType),
            ...col.enum('calculationType', 'Calculation', enums.CALCULATION_TYPE_VALUES, render.calculationType),
            ...col.boolean('isTaxable', 'Taxable'),
            ...col.boolean('isActive', 'Active')
        ],

        PayrollRun: [
            ...col.id('payrollRunId'),
            ...col.basic(['name']),
            ...col.enum('runType', 'Type', enums.PAYROLL_RUN_TYPE_VALUES, render.payrollRunType),
            ...col.enum('status', 'Status', enums.PAYROLL_RUN_STATUS_VALUES, render.payrollRunStatus),
            ...col.date('paymentDate', 'Payment Date'),
            ...col.col('employeeCount', 'Employees'),
            ...col.money('totalNet', 'Total Net')
        ],

        Payslip: [
            ...col.id('payslipId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('payrollRunId', 'Payroll Run'),
            ...col.date('paymentDate', 'Payment Date'),
            ...col.money('grossPay', 'Gross'),
            ...col.money('totalDeductions', 'Deductions'),
            ...col.money('netPay', 'Net Pay')
        ],

        TaxWithholding: [
            ...col.id('withholdingId'),
            ...col.col('employeeId', 'Employee'),
            ...col.enum('taxType', 'Tax Type', enums.TAX_TYPE_VALUES, render.taxType),
            ...col.col('taxJurisdiction', 'Jurisdiction'),
            ...col.enum('filingStatus', 'Filing Status', enums.FILING_STATUS_VALUES, render.filingStatus),
            ...col.boolean('exempt', 'Exempt')
        ],

        DirectDeposit: [
            ...col.id('directDepositId'),
            ...col.col('employeeId', 'Employee'),
            ...col.basic([['bankName', 'Bank'], ['accountNumberMasked', 'Account']]),
            ...col.enum('accountType', 'Type', enums.ACCOUNT_TYPE_VALUES, render.accountType),
            ...col.enum('depositType', 'Deposit', enums.DEPOSIT_TYPE_VALUES, render.depositType),
            ...col.boolean('isActive', 'Active')
        ],

        Garnishment: [
            ...col.id('garnishmentId'),
            ...col.col('employeeId', 'Employee'),
            ...col.enum('garnishmentType', 'Type', enums.GARNISHMENT_TYPE_VALUES, render.garnishmentType),
            ...col.basic([['caseNumber', 'Case #'], ['payeeName', 'Payee']]),
            ...col.enum('status', 'Status', enums.GARNISHMENT_STATUS_VALUES, render.garnishmentStatus),
            ...col.money('amountPerPeriod', 'Per Period')
        ],

        YearEndDocument: [
            ...col.id('documentId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('taxYear', 'Tax Year'),
            ...col.enum('documentType', 'Type', enums.YEAR_END_DOC_TYPE_VALUES, render.yearEndDocType),
            ...col.enum('status', 'Status', enums.YEAR_END_DOC_STATUS_VALUES, render.yearEndDocStatus),
            ...col.date('issuedDate', 'Issued'),
            ...col.boolean('isCorrected', 'Corrected')
        ]
    };
})();
