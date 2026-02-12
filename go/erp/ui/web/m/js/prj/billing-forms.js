/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Mobile PRJ Billing Module - Form Configurations
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MobilePrjBilling = window.MobilePrjBilling || {};

    const f = window.Layer8FormFactory;
    const enums = MobilePrjBilling.enums;

    MobilePrjBilling.forms = {
        PrjBillingRate: f.form('Billing Rate', [
            f.section('Rate Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('projectId', 'Project', 'PrjProject'),
                ...f.reference('resourceId', 'Resource', 'PrjResource'),
                ...f.text('role', 'Role'),
                ...f.text('skillCategory', 'Skill Category'),
                ...f.money('rate', 'Rate', true),
                ...f.text('rateUnit', 'Rate Unit'),
                ...f.money('overtimeRate', 'Overtime Rate'),
                ...f.date('effectiveFrom', 'Effective From'),
                ...f.date('effectiveUntil', 'Effective Until'),
                ...f.reference('currencyId', 'Currency', 'Currency'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        PrjBillingSchedule: f.form('Billing Schedule', [
            f.section('Schedule Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('billingType', 'Billing Type', enums.BILLING_TYPE),
                ...f.text('billingFrequency', 'Billing Frequency'),
                ...f.number('billingDay', 'Billing Day'),
                ...f.money('fixedAmount', 'Fixed Amount'),
                ...f.money('retainerAmount', 'Retainer Amount'),
                ...f.checkbox('includeExpenses', 'Include Expenses'),
                ...f.number('expenseMarkupPercent', 'Expense Markup %'),
                ...f.date('startDate', 'Start Date'),
                ...f.date('endDate', 'End Date'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Billing Milestones', [
                ...f.inlineTable('milestones', 'Billing Milestones', [
                    { key: 'milestoneId', label: 'ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'amount', label: 'Amount', type: 'money', required: true },
                    { key: 'percentage', label: 'Percentage', type: 'number' },
                    { key: 'dueDate', label: 'Due Date', type: 'date' },
                    { key: 'billedDate', label: 'Billed Date', type: 'date' },
                    { key: 'isBilled', label: 'Billed', type: 'checkbox' }
                ])
            ])
        ]),

        PrjProjectInvoice: f.form('Project Invoice', [
            f.section('Invoice Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.reference('customerId', 'Customer', 'Customer'),
                ...f.text('invoiceNumber', 'Invoice Number', true),
                ...f.text('poNumber', 'PO Number'),
                ...f.date('invoiceDate', 'Invoice Date', true),
                ...f.date('dueDate', 'Due Date'),
                ...f.date('periodStart', 'Period Start'),
                ...f.date('periodEnd', 'Period End'),
                ...f.select('status', 'Status', enums.INVOICE_STATUS),
                ...f.text('paymentTerms', 'Payment Terms'),
                ...f.reference('currencyId', 'Currency', 'Currency')
            ]),
            f.section('Amounts', [
                ...f.money('subtotal', 'Subtotal'),
                ...f.money('taxAmount', 'Tax Amount'),
                ...f.money('totalAmount', 'Total Amount'),
                ...f.money('paidAmount', 'Paid Amount'),
                ...f.money('balanceDue', 'Balance Due')
            ]),
            f.section('Invoice Lines', [
                ...f.inlineTable('lines', 'Invoice Lines', [
                    { key: 'lineId', label: 'Line ID', hidden: true },
                    { key: 'lineNumber', label: 'Line #', type: 'number' },
                    { key: 'description', label: 'Description', type: 'text', required: true },
                    { key: 'quantity', label: 'Qty', type: 'number', required: true },
                    { key: 'unit', label: 'Unit', type: 'text' },
                    { key: 'unitPrice', label: 'Unit Price', type: 'money', required: true },
                    { key: 'amount', label: 'Amount', type: 'money' },
                    { key: 'isTaxable', label: 'Taxable', type: 'checkbox' }
                ])
            ]),
            f.section('Additional Information', [
                ...f.textarea('notes', 'Notes'),
                ...f.date('sentDate', 'Sent Date'),
                ...f.date('paidDate', 'Paid Date')
            ])
        ]),

        PrjRevenueRecognition: f.form('Revenue Recognition', [
            f.section('Recognition Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.reference('invoiceId', 'Invoice', 'PrjProjectInvoice'),
                ...f.select('method', 'Recognition Method', enums.REVENUE_RECOGNITION_METHOD),
                ...f.date('recognitionDate', 'Recognition Date', true),
                ...f.date('periodStart', 'Period Start'),
                ...f.date('periodEnd', 'Period End'),
                ...f.number('percentComplete', 'Percent Complete')
            ]),
            f.section('Amounts', [
                ...f.money('recognizedAmount', 'Recognized Amount'),
                ...f.money('deferredAmount', 'Deferred Amount'),
                ...f.money('cumulativeRecognized', 'Cumulative Recognized')
            ]),
            f.section('GL Information', [
                ...f.text('glAccount', 'GL Account'),
                ...f.text('deferredGlAccount', 'Deferred GL Account'),
                ...f.textarea('notes', 'Notes'),
                ...f.checkbox('isPosted', 'Posted'),
                ...f.date('postedDate', 'Posted Date')
            ])
        ]),

        PrjProjectBudget: f.form('Project Budget', [
            f.section('Budget Details', [
                ...f.reference('projectId', 'Project', 'PrjProject', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('budgetType', 'Budget Type'),
                ...f.text('phaseId', 'Phase ID'),
                ...f.date('periodStart', 'Period Start'),
                ...f.date('periodEnd', 'Period End'),
                ...f.number('version', 'Version')
            ]),
            f.section('Budget Amounts', [
                ...f.money('budgetedAmount', 'Budgeted Amount', true),
                ...f.money('committedAmount', 'Committed Amount'),
                ...f.money('actualAmount', 'Actual Amount'),
                ...f.money('remainingAmount', 'Remaining Amount')
            ]),
            f.section('Hours', [
                ...f.number('budgetedHours', 'Budgeted Hours'),
                ...f.number('actualHours', 'Actual Hours'),
                ...f.number('remainingHours', 'Remaining Hours')
            ]),
            f.section('Approval', [
                ...f.checkbox('isApproved', 'Approved'),
                ...f.reference('approvedBy', 'Approved By', 'Employee'),
                ...f.date('approvedDate', 'Approved Date')
            ])
        ])
    };

})();
