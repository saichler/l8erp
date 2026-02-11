/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Sales Customers Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.SalesCustomers = window.SalesCustomers || {};

    const f = window.Layer8FormFactory;
    const enums = SalesCustomers.enums;

    SalesCustomers.forms = {
        SalesCustomerHierarchy: f.form('Customer Hierarchy', [
            f.section('Hierarchy Details', [
                ...f.text('name', 'Name', true),
                ...f.reference('parentHierarchyId', 'Parent Hierarchy', 'SalesCustomerHierarchy'),
                ...f.number('level', 'Level'),
                ...f.textarea('description', 'Description')
            ])
        ]),

        SalesCustomerSegment: f.form('Customer Segment', [
            f.section('Segment Details', [
                ...f.text('name', 'Name', true),
                ...f.select('segmentType', 'Type', enums.SEGMENT_TYPE),
                ...f.textarea('description', 'Description'),
                ...f.textarea('criteria', 'Criteria'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        SalesCustomerContract: f.form('Customer Contract', [
            f.section('Contract Details', [
                ...f.text('contractNumber', 'Contract #', true),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.select('status', 'Status', enums.CONTRACT_STATUS),
                ...f.money('contractValue', 'Contract Value'),
                ...f.reference('priceListId', 'Price List', 'SalesPriceList'),
                ...f.text('paymentTerms', 'Payment Terms'),
                ...f.textarea('terms', 'Terms & Conditions'),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('Customer Prices', [
                ...f.inlineTable('prices', 'Customer Prices', [
                    { key: 'customerPriceId', label: 'ID', hidden: true },
                    { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer' },
                    { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                    { key: 'unitPrice', label: 'Price', type: 'money' },
                    { key: 'pricingMethod', label: 'Method', type: 'text' },
                    { key: 'minimumQuantity', label: 'Min Qty', type: 'number' }
                ])
            ])
        ]),

        SalesPartnerChannel: f.form('Partner Channel', [
            f.section('Partner Details', [
                ...f.text('name', 'Name', true),
                ...f.text('partnerType', 'Partner Type', true),
                ...f.text('contactName', 'Contact Name'),
                ...f.text('email', 'Email'),
                ...f.text('phone', 'Phone'),
                ...f.checkbox('isActive', 'Active'),
                ...f.number('commissionRate', 'Commission Rate %'),
                ...f.reference('territoryId', 'Territory', 'SalesTerritory'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

    SalesCustomers.primaryKeys = {
        SalesCustomerHierarchy: 'hierarchyId',
        SalesCustomerSegment: 'segmentId',
        SalesCustomerContract: 'contractId',
        SalesPartnerChannel: 'partnerId'
    };

})();
