/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.LendProducts = window.LendProducts || {};
    var f = window.Layer8FormFactory;
    var enums = LendProducts.enums;

    LendProducts.forms = {
        LendProduct: f.form('Lending Product', [
            f.section('Product Information', [
                ...f.text('productCode', 'Product Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('productType', 'Product Type', enums.PRODUCT_TYPE, true),
                ...f.select('status', 'Status', enums.PRODUCT_STATUS),
                ...f.select('interestType', 'Interest Type', enums.INTEREST_TYPE),
                ...f.select('paymentFrequency', 'Payment Frequency', enums.FREQUENCY),
                ...f.checkbox('isActive', 'Active'),
            ]),
            f.section('Interest & Fees', [
                ...f.number('baseInterestRate', 'Base Interest Rate %'),
                ...f.number('minInterestRate', 'Min Interest Rate %'),
                ...f.number('maxInterestRate', 'Max Interest Rate %'),
                ...f.number('originationFeePct', 'Origination Fee %'),
                ...f.number('lateFeePct', 'Late Fee %'),
                ...f.number('gracePeriodDays', 'Grace Period (Days)'),
                ...f.checkbox('prepaymentPenalty', 'Prepayment Penalty'),
            ]),
            f.section('Loan Limits', [
                ...f.money('minLoanAmount', 'Min Loan Amount'),
                ...f.money('maxLoanAmount', 'Max Loan Amount'),
                ...f.number('minTermMonths', 'Min Term (Months)'),
                ...f.number('maxTermMonths', 'Max Term (Months)'),
                ...f.number('minCreditScore', 'Min Credit Score'),
                ...f.checkbox('collateralRequired', 'Collateral Required'),
            ]),
            f.section('Accounting', [
                ...f.reference('glReceivableAccountId', 'GL Receivable Account', 'Account'),
                ...f.reference('glInterestIncomeAccountId', 'GL Interest Income Account', 'Account'),
                ...f.reference('glFeeIncomeAccountId', 'GL Fee Income Account', 'Account'),
                ...f.reference('currencyId', 'Currency', 'Currency'),
            ]),
            f.section('Audit', [...f.audit()])
        ]),

        LendApplication: f.form('Loan Application', [
            f.section('Application Information', [
                ...f.text('applicationNumber', 'Application #'),
                ...f.reference('productId', 'Product', 'LendProduct', true),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.select('status', 'Status', enums.APPLICATION_STATUS),
                ...f.text('purpose', 'Purpose'),
            ]),
            f.section('Request Details', [
                ...f.money('requestedAmount', 'Requested Amount'),
                ...f.number('requestedTermMonths', 'Requested Term (Months)'),
                ...f.number('proposedInterestRate', 'Proposed Interest Rate %'),
            ]),
            f.section('Decision', [
                ...f.money('approvedAmount', 'Approved Amount'),
                ...f.number('approvedTermMonths', 'Approved Term (Months)'),
                ...f.number('creditScore', 'Credit Score'),
                ...f.number('debtToIncomeRatio', 'Debt-to-Income Ratio'),
                ...f.textarea('denialReason', 'Denial Reason'),
            ]),
            f.section('People & Dates', [
                ...f.reference('loanOfficerId', 'Loan Officer', 'Employee'),
                ...f.reference('reviewerId', 'Reviewer', 'Employee'),
                ...f.date('applicationDate', 'Application Date'),
                ...f.date('reviewDate', 'Review Date'),
                ...f.date('decisionDate', 'Decision Date'),
                ...f.textarea('notes', 'Notes'),
            ]),
            f.section('Documents', [
                ...f.inlineTable('documents', 'Application Documents', [
                    { key: 'documentId', label: 'ID', hidden: true },
                    { key: 'documentType', label: 'Type', type: 'text' },
                    { key: 'fileName', label: 'File Name', type: 'text' },
                    { key: 'isVerified', label: 'Verified', type: 'checkbox' },
                    { key: 'notes', label: 'Notes', type: 'text' }
                ])
            ]),
            f.section('Audit', [...f.audit()])
        ]),
    };
})();
