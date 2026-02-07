/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Payroll Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    const f = window.Layer8FormFactory;
    const enums = window.Payroll.enums;

    window.Payroll.forms = {
        PayStructure: f.form('Pay Structure', [
            f.section('Basic Information', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.reference('currencyId', 'Currency', 'Currency', true),
                ...f.select('payFrequency', 'Pay Frequency', enums.PAY_FREQUENCY, true),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Dates', [
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('endDate', 'End Date')
            ])
        ]),

        PayComponent: f.form('Pay Component', [
            f.section('Component Details', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.select('componentType', 'Type', enums.PAY_COMPONENT_TYPE, true),
                ...f.select('category', 'Category', enums.PAY_COMPONENT_CATEGORY),
                ...f.select('calculationType', 'Calculation', enums.CALCULATION_TYPE, true)
            ]),
            f.section('Calculation Settings', [
                ...f.number('rate', 'Rate/Percentage'),
                ...f.number('hoursMultiplier', 'Hours Multiplier'),
                ...f.checkbox('isTaxable', 'Taxable'),
                ...f.checkbox('isPreTax', 'Pre-Tax'),
                ...f.checkbox('affectsOvertime', 'Affects Overtime'),
                ...f.checkbox('isActive', 'Active'),
                ...f.number('displayOrder', 'Display Order')
            ])
        ]),

        PayrollRun: f.form('Payroll Run', [
            f.section('Run Details', [
                ...f.text('name', 'Name', true),
                ...f.reference('organizationId', 'Organization', 'Organization', true),
                ...f.select('runType', 'Run Type', enums.PAYROLL_RUN_TYPE, true),
                ...f.select('status', 'Status', enums.PAYROLL_RUN_STATUS, true),
                ...f.date('scheduledDate', 'Scheduled Date'),
                ...f.date('paymentDate', 'Payment Date', true),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        Payslip: f.form('Payslip', [
            f.section('Payslip Details', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.reference('payrollRunId', 'Payroll Run', 'PayrollRun', true),
                ...f.date('paymentDate', 'Payment Date', true)
            ]),
            f.section('Hours', [
                ...f.number('regularHours', 'Regular Hours'),
                ...f.number('overtimeHours', 'Overtime Hours'),
                ...f.number('ptoHours', 'PTO Hours'),
                ...f.number('holidayHours', 'Holiday Hours')
            ])
        ]),

        TaxWithholding: f.form('Tax Withholding', [
            f.section('Tax Information', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.select('taxType', 'Tax Type', enums.TAX_TYPE, true),
                ...f.text('taxJurisdiction', 'Jurisdiction', true),
                ...f.text('formVersion', 'Form Version'),
                ...f.select('filingStatus', 'Filing Status', enums.FILING_STATUS, true),
                ...f.number('allowances', 'Allowances'),
                ...f.checkbox('useNewW4', 'Use 2020+ W-4'),
                ...f.checkbox('exempt', 'Exempt'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('signedDate', 'Signed Date')
            ])
        ]),

        DirectDeposit: f.form('Direct Deposit', [
            f.section('Account Information', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.text('accountName', 'Account Name'),
                ...f.text('bankName', 'Bank Name', true),
                ...f.text('routingNumber', 'Routing Number', true),
                ...f.select('accountType', 'Account Type', enums.ACCOUNT_TYPE, true),
                ...f.select('depositType', 'Deposit Type', enums.DEPOSIT_TYPE, true),
                ...f.number('percentage', 'Percentage'),
                ...f.number('priority', 'Priority'),
                ...f.checkbox('isActive', 'Active'),
                ...f.checkbox('isPrenoteComplete', 'Prenote Complete'),
                ...f.date('effectiveDate', 'Effective Date')
            ])
        ]),

        Garnishment: f.form('Garnishment', [
            f.section('Garnishment Details', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.select('garnishmentType', 'Type', enums.GARNISHMENT_TYPE, true),
                ...f.text('caseNumber', 'Case Number', true),
                ...f.text('issuingAuthority', 'Issuing Authority'),
                ...f.text('payeeName', 'Payee Name', true),
                ...f.textarea('payeeAddress', 'Payee Address'),
                ...f.select('status', 'Status', enums.GARNISHMENT_STATUS, true)
            ]),
            f.section('Amount Details', [
                ...f.number('percentage', 'Percentage'),
                ...f.number('priority', 'Priority'),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        YearEndDocument: f.form('Year-End Document', [
            f.section('Document Details', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.number('taxYear', 'Tax Year', true),
                ...f.select('documentType', 'Document Type', enums.YEAR_END_DOC_TYPE, true),
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.select('status', 'Status', enums.YEAR_END_DOC_STATUS, true),
                ...f.date('issuedDate', 'Issued Date'),
                ...f.checkbox('isCorrected', 'Is Correction'),
                ...f.text('originalDocumentId', 'Original Document ID'),
                ...f.url('fileUrl', 'File URL')
            ])
        ])
    };

    window.Payroll.primaryKeys = {
        PayStructure: 'payStructureId', PayComponent: 'componentId', PayrollRun: 'payrollRunId',
        Payslip: 'payslipId', TaxWithholding: 'withholdingId', DirectDeposit: 'directDepositId',
        Garnishment: 'garnishmentId', YearEndDocument: 'documentId'
    };

})();
