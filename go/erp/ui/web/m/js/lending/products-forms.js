/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Lending Products Module - Form Configurations
 * Desktop Equivalent: lending/products/products-forms.js
 */
(function() {
    'use strict';
    window.MobileLendProducts = window.MobileLendProducts || {};
    var f = window.Layer8FormFactory;
    var enums = MobileLendProducts.enums;

    MobileLendProducts.forms = {
        LendProduct: f.form('Loan Product', [
            f.section('Product Information', [
                ...f.text('productCode', 'Product Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('productType', 'Product Type', enums.PRODUCT_TYPE, true),
                ...f.select('status', 'Status', enums.PRODUCT_STATUS),
                ...f.checkbox('isActive', 'Active'),
            ]),
            f.section('Terms', [
                ...f.select('interestType', 'Interest Type', enums.INTEREST_TYPE),
                ...f.number('defaultInterestRate', 'Default Interest Rate %'),
                ...f.number('minInterestRate', 'Min Interest Rate %'),
                ...f.number('maxInterestRate', 'Max Interest Rate %'),
                ...f.select('defaultPaymentFrequency', 'Payment Frequency', enums.FREQUENCY),
                ...f.number('minTermMonths', 'Min Term (Months)'),
                ...f.number('maxTermMonths', 'Max Term (Months)'),
                ...f.money('minAmount', 'Min Amount'),
                ...f.money('maxAmount', 'Max Amount'),
            ]),
            f.section('Fees', [
                ...f.money('originationFee', 'Origination Fee'),
                ...f.money('lateFee', 'Late Fee'),
                ...f.money('prepaymentPenalty', 'Prepayment Penalty'),
                ...f.number('gracePeriodDays', 'Grace Period (Days)'),
                ...f.checkbox('requiresCollateral', 'Requires Collateral'),
                ...f.textarea('eligibilityCriteria', 'Eligibility Criteria'),
            ]),
            f.section('Audit', [...f.audit()])
        ]),

        LendApplication: f.form('Loan Application', [
            f.section('Application Information', [
                ...f.text('applicationNumber', 'Application Number'),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.reference('productId', 'Product', 'LendProduct', true),
                ...f.select('status', 'Status', enums.APPLICATION_STATUS),
                ...f.reference('loanOfficerId', 'Loan Officer', 'Employee'),
            ]),
            f.section('Financials', [
                ...f.money('requestedAmount', 'Requested Amount'),
                ...f.money('approvedAmount', 'Approved Amount'),
                ...f.number('requestedTermMonths', 'Requested Term (Months)'),
                ...f.number('offeredInterestRate', 'Offered Interest Rate %'),
                ...f.number('creditScore', 'Credit Score'),
                ...f.money('annualIncome', 'Annual Income'),
                ...f.money('monthlyDebt', 'Monthly Debt'),
                ...f.number('debtToIncomeRatio', 'Debt-to-Income Ratio'),
            ]),
            f.section('Dates', [
                ...f.date('applicationDate', 'Application Date'),
                ...f.date('decisionDate', 'Decision Date'),
                ...f.date('expirationDate', 'Expiration Date'),
                ...f.textarea('denialReason', 'Denial Reason'),
                ...f.textarea('conditions', 'Conditions'),
                ...f.textarea('notes', 'Notes'),
            ]),
            f.section('Documents', [
                ...f.inlineTable('documents', 'Application Documents', [
                    { key: 'documentId', label: 'ID', hidden: true },
                    { key: 'documentType', label: 'Type', type: 'text' },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'status', label: 'Status', type: 'text' },
                    { key: 'receivedDate', label: 'Received', type: 'date' }
                ])
            ]),
            f.section('Audit', [...f.audit()])
        ]),
    };
})();
