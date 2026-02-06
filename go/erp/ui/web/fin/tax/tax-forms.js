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
                ...f.text('country', 'Country', true),
                ...f.text('stateProvince', 'State/Province'),
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
                ...f.date('expirationDate', 'Expiration Date')
            ])
        ]),

        TaxReturn: f.form('Tax Return', [
            f.section('Return Details', [
                ...f.select('taxType', 'Tax Type', enums.TAX_TYPE, true),
                ...f.text('filingPeriod', 'Filing Period', true),
                ...f.date('dueDate', 'Due Date', true),
                ...f.date('filingDate', 'Filing Date'),
                ...f.select('status', 'Status', enums.TAX_RETURN_STATUS),
                ...f.money('taxLiability', 'Tax Liability'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        TaxExemption: f.form('Tax Exemption', [
            f.section('Exemption Details', [
                ...f.text('entityName', 'Entity Name', true),
                ...f.reference('taxCodeId', 'Tax Code', 'TaxCode', true),
                ...f.textarea('exemptionReason', 'Exemption Reason', true),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date'),
                ...f.text('certificateNumber', 'Certificate Number')
            ])
        ]),

        WithholdingTaxConfig: f.form('Withholding Tax Config', [
            f.section('Configuration Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('taxType', 'Tax Type', enums.TAX_TYPE, true),
                ...f.number('rate', 'Rate (%)', true),
                ...f.money('thresholdAmount', 'Threshold Amount'),
                ...f.checkbox('isActive', 'Active')
            ])
        ])
    };

    TaxManagement.primaryKeys = {
        TaxCode: 'taxCodeId',
        TaxJurisdiction: 'jurisdictionId',
        TaxRule: 'ruleId',
        TaxReturn: 'returnId',
        TaxExemption: 'exemptionId',
        WithholdingTaxConfig: 'configId'
    };

})();
