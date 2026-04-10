/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.LendLoans = window.LendLoans || {};
    var f = window.Layer8FormFactory;
    var enums = LendLoans.enums;

    LendLoans.forms = {
        Loan: f.form('Loan', [
            f.section('Loan Information', [
                ...f.text('loanNumber', 'Loan Number'),
                ...f.reference('productId', 'Product', 'LendProduct'),
                ...f.reference('applicationId', 'Application', 'LendApplication'),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.select('status', 'Status', enums.LOAN_STATUS),
            ]),
            f.section('Financials', [
                ...f.money('originalAmount', 'Original Amount'),
                ...f.money('outstandingPrincipal', 'Outstanding Principal'),
                ...f.money('outstandingInterest', 'Outstanding Interest'),
                ...f.money('outstandingFees', 'Outstanding Fees'),
                ...f.money('totalBalance', 'Total Balance'),
                ...f.number('interestRate', 'Interest Rate %'),
                ...f.select('interestType', 'Interest Type', enums.INTEREST_TYPE),
                ...f.select('paymentFrequency', 'Payment Frequency', enums.FREQUENCY),
                ...f.money('paymentAmount', 'Payment Amount'),
            ]),
            f.section('Term & Schedule', [
                ...f.number('termMonths', 'Term (Months)'),
                ...f.date('originationDate', 'Origination Date'),
                ...f.date('maturityDate', 'Maturity Date'),
                ...f.date('firstPaymentDate', 'First Payment Date'),
                ...f.date('nextPaymentDate', 'Next Payment Date'),
                ...f.date('lastPaymentDate', 'Last Payment Date'),
                ...f.number('paymentsMade', 'Payments Made'),
                ...f.number('paymentsRemaining', 'Payments Remaining'),
                ...f.number('daysPastDue', 'Days Past Due'),
            ]),
            f.section('Accounts', [
                ...f.reference('loanOfficerId', 'Loan Officer', 'Employee'),
                ...f.reference('bankAccountId', 'Bank Account', 'BankAccount'),
                ...f.reference('glReceivableAccountId', 'GL Receivable Account', 'Account'),
                ...f.reference('currencyId', 'Currency', 'Currency'),
            ]),
            f.section('Disbursements', [
                ...f.inlineTable('disbursements', 'Disbursements', [
                    { key: 'disbursementId', label: 'ID', hidden: true },
                    { key: 'amount', label: 'Amount', type: 'money' },
                    { key: 'disbursementDate', label: 'Date', type: 'date' },
                    { key: 'status', label: 'Status', type: 'text' },
                    { key: 'method', label: 'Method', type: 'text' },
                    { key: 'referenceNumber', label: 'Reference #', type: 'text' }
                ])
            ]),
            f.section('Fees', [
                ...f.inlineTable('fees', 'Fees', [
                    { key: 'feeId', label: 'ID', hidden: true },
                    { key: 'feeType', label: 'Type', type: 'text' },
                    { key: 'amount', label: 'Amount', type: 'money' },
                    { key: 'dueDate', label: 'Due Date', type: 'date' },
                    { key: 'isPaid', label: 'Paid', type: 'checkbox' }
                ])
            ]),
            f.section('Amortization Schedule', [
                ...f.inlineTable('amortizationSchedule', 'Amortization', [
                    { key: 'periodNumber', label: 'Period', type: 'number' },
                    { key: 'paymentDate', label: 'Date', type: 'date' },
                    { key: 'paymentAmount', label: 'Payment', type: 'money' },
                    { key: 'principalAmount', label: 'Principal', type: 'money' },
                    { key: 'interestAmount', label: 'Interest', type: 'money' },
                    { key: 'remainingBalance', label: 'Balance', type: 'money' }
                ])
            ]),
            f.section('Audit', [...f.audit()])
        ]),

        CreditLine: f.form('Credit Line', [
            f.section('Credit Line Information', [
                ...f.text('creditLineNumber', 'Credit Line Number'),
                ...f.reference('productId', 'Product', 'LendProduct'),
                ...f.reference('applicationId', 'Application', 'LendApplication'),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.select('status', 'Status', enums.CREDIT_LINE_STATUS),
            ]),
            f.section('Financials', [
                ...f.money('creditLimit', 'Credit Limit'),
                ...f.money('availableBalance', 'Available Balance'),
                ...f.money('outstandingBalance', 'Outstanding Balance'),
                ...f.money('accruedInterest', 'Accrued Interest'),
                ...f.number('interestRate', 'Interest Rate %'),
                ...f.select('interestType', 'Interest Type', enums.INTEREST_TYPE),
                ...f.select('paymentFrequency', 'Payment Frequency', enums.FREQUENCY),
                ...f.money('minimumPayment', 'Minimum Payment'),
            ]),
            f.section('Dates', [
                ...f.date('openingDate', 'Opening Date'),
                ...f.date('expirationDate', 'Expiration Date'),
                ...f.date('nextPaymentDate', 'Next Payment Date'),
                ...f.date('lastActivityDate', 'Last Activity Date'),
                ...f.number('daysPastDue', 'Days Past Due'),
            ]),
            f.section('Accounts', [
                ...f.reference('loanOfficerId', 'Loan Officer', 'Employee'),
                ...f.reference('bankAccountId', 'Bank Account', 'BankAccount'),
                ...f.reference('glReceivableAccountId', 'GL Receivable Account', 'Account'),
                ...f.reference('currencyId', 'Currency', 'Currency'),
            ]),
            f.section('Drawdowns', [
                ...f.inlineTable('drawdowns', 'Drawdowns', [
                    { key: 'drawdownId', label: 'ID', hidden: true },
                    { key: 'amount', label: 'Amount', type: 'money' },
                    { key: 'drawdownDate', label: 'Date', type: 'date' },
                    { key: 'purpose', label: 'Purpose', type: 'text' },
                    { key: 'referenceNumber', label: 'Reference #', type: 'text' }
                ])
            ]),
            f.section('Repayments', [
                ...f.inlineTable('repayments', 'Repayments', [
                    { key: 'repaymentId', label: 'ID', hidden: true },
                    { key: 'amount', label: 'Amount', type: 'money' },
                    { key: 'repaymentDate', label: 'Date', type: 'date' },
                    { key: 'referenceNumber', label: 'Reference #', type: 'text' }
                ])
            ]),
            f.section('Audit', [...f.audit()])
        ]),
    };
})();
