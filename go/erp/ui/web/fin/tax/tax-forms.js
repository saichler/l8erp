/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Tax Management Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.TaxManagement = window.TaxManagement || {};

    const f = window.Layer8FormFactory;
    const enums = TaxManagement.enums;

    TaxManagement.forms = {
        TaxCode: f.form('Tax Code', [
            f.section('Tax Code Information', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('taxType', 'Tax Type', enums.TAX_TYPE, true),
                ...f.number('rate', 'Rate (%)', true),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        TaxJurisdiction: f.form('Tax Jurisdiction', [
            f.section('Jurisdiction Information', [
                ...f.text('name', 'Name', true),
                ...f.select('level', 'Level', enums.JURISDICTION_LEVEL, true),
                ...f.text('countryCode', 'Country Code', true),
                ...f.text('stateCode', 'State Code'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        TaxRule: f.form('Tax Rule', [
            f.section('Rule Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('taxCodeId', 'Tax Code', 'TaxCode', true),
                ...f.reference('jurisdictionId', 'Jurisdiction', 'TaxJurisdiction', true),
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('endDate', 'End Date')
            ])
        ]),

        TaxExemption: f.form('Tax Exemption', [
            f.section('Exemption Details', [
                ...f.text('exemptionNumber', 'Exemption Number', true),
                ...f.reference('taxCodeId', 'Tax Code', 'TaxCode', true),
                ...f.textarea('reason', 'Reason', true),
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('expirationDate', 'Expiration Date'),
                ...f.url('documentUrl', 'Document URL')
            ])
        ])
    };

    TaxManagement.primaryKeys = {
        TaxCode: 'taxCodeId',
        TaxJurisdiction: 'jurisdictionId',
        TaxRule: 'ruleId',
        TaxExemption: 'exemptionId'
    };

})();
