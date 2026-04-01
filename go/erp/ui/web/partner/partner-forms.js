/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Partner Portal — form definitions (writable forms only)
(function() {
    'use strict';

    var PTNR = window.PTNR = window.PTNR || {};
    var f = Layer8FormFactory;

    PTNR.forms = {
        // Partners can register leads
        CrmLead: f.form('Register Lead', [
            f.section('Lead Information', [
                ...f.text('firstName', 'First Name', true),
                ...f.text('lastName', 'Last Name', true),
                ...f.text('company', 'Company'),
                ...f.text('email', 'Email'),
                ...f.text('phone', 'Phone'),
                ...f.text('title', 'Title'),
                ...f.textarea('description', 'Description')
            ])
        ]),

        // Partners can update opportunities
        CrmOpportunity: f.form('Opportunity', [
            f.section('Opportunity Details', [
                ...f.text('name', 'Name', true),
                ...f.money('amount', 'Amount'),
                ...f.select('stage', 'Stage', PTNR.enums.SALES_STAGE),
                ...f.number('probability', 'Probability %'),
                ...f.date('closeDate', 'Close Date'),
                ...f.textarea('nextStep', 'Next Step'),
                ...f.textarea('description', 'Description')
            ])
        ]),

        // Partners can create quotations
        SalesQuotation: f.form('Quotation', [
            f.section('Quotation Details', [
                ...f.text('quotationNumber', 'Quotation #', false, { isReadOnly: true }),
                ...f.date('quotationDate', 'Date'),
                ...f.date('validUntil', 'Valid Until'),
                ...f.text('paymentTerms', 'Payment Terms'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

    // Primary keys for all models
    PTNR.primaryKeys = {
        CrmLead: 'leadId',
        CrmOpportunity: 'opportunityId',
        CrmLeadSource: 'sourceId',
        SalesQuotation: 'quotationId',
        SalesOrder: 'salesOrderId',
        CrmCampaign: 'campaignId',
        CrmMarketingList: 'listId',
        SalesCommissionPlan: 'planId',
        SalesPartnerChannel: 'partnerId'
    };
})();
