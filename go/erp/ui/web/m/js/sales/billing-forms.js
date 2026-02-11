/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Sales Billing Module - Form Configurations
 * Desktop Equivalent: sales/billing/billing-forms.js
 */
window.MobileSalesBilling = window.MobileSalesBilling || {};

(function() {
    'use strict';

    const f = window.Layer8FormFactory;
    const enums = MobileSalesBilling.enums;

    MobileSalesBilling.forms = {
        BillingSchedule: f.form('Billing Schedule', [
            f.section('Schedule Details', [
                ...f.text('name', 'Name', true),
                ...f.reference('salesOrderId', 'Sales Order', 'SalesOrder', true),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.select('frequency', 'Frequency', enums.BILLING_FREQUENCY, true),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date'),
                ...f.date('nextBillingDate', 'Next Billing Date'),
                ...f.money('totalAmount', 'Total Amount'),
                ...f.money('billedAmount', 'Billed Amount'),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('Milestones', [
                ...f.inlineTable('milestones', 'Billing Milestones', [
                    { key: 'milestoneId', label: 'ID', hidden: true },
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'targetDate', label: 'Target Date', type: 'date' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.MILESTONE_STATUS },
                    { key: 'amount', label: 'Amount', type: 'money' },
                    { key: 'percentage', label: '%', type: 'number' }
                ])
            ])
        ]),

        RevenueSchedule: f.form('Revenue Schedule', [
            f.section('Revenue Details', [
                ...f.reference('salesOrderId', 'Sales Order', 'SalesOrder', true),
                ...f.text('recognitionMethod', 'Recognition Method'),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.money('totalRevenue', 'Total Revenue', true),
                ...f.money('recognizedRevenue', 'Recognized Revenue'),
                ...f.money('deferredRevenue', 'Deferred Revenue'),
                ...f.reference('revenueAccountId', 'Revenue Account', 'Account'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

})();
