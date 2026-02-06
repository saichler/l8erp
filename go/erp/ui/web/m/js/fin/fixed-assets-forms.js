/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Mobile Fixed Assets Module - Form Configurations
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MobileFixedAssets = window.MobileFixedAssets || {};

    const f = window.Layer8FormFactory;
    const enums = MobileFixedAssets.enums;

    MobileFixedAssets.forms = {
        Asset: f.form('Asset', [
            f.section('Asset Information', [
                ...f.text('assetNumber', 'Asset Number', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('categoryId', 'Category', 'AssetCategory', true),
                ...f.select('status', 'Status', enums.ASSET_STATUS),
                ...f.money('acquisitionCost', 'Acquisition Cost', true),
                ...f.date('acquisitionDate', 'Acquisition Date', true),
                ...f.text('location', 'Location'),
                ...f.text('serialNumber', 'Serial Number')
            ])
        ]),

        AssetCategory: f.form('Asset Category', [
            f.section('Category Information', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('depreciationMethod', 'Depreciation Method', enums.DEPRECIATION_METHOD, true),
                ...f.number('usefulLife', 'Useful Life (Years)', true),
                ...f.number('salvageValuePercent', 'Salvage Value %')
            ])
        ]),

        DepreciationSchedule: f.form('Depreciation Schedule', [
            f.section('Schedule Details', [
                ...f.reference('assetId', 'Asset', 'Asset', true),
                ...f.date('periodDate', 'Period Date', true),
                ...f.money('depreciationAmount', 'Depreciation Amount'),
                ...f.money('accumulatedDepreciation', 'Accumulated Depreciation'),
                ...f.money('bookValue', 'Book Value')
            ])
        ]),

        AssetDisposal: f.form('Asset Disposal', [
            f.section('Disposal Details', [
                ...f.reference('assetId', 'Asset', 'Asset', true),
                ...f.date('disposalDate', 'Disposal Date', true),
                ...f.select('disposalMethod', 'Disposal Method', enums.DISPOSAL_METHOD, true),
                ...f.money('salePrice', 'Sale Price'),
                ...f.money('bookValueAtDisposal', 'Book Value at Disposal'),
                ...f.money('gainLoss', 'Gain/Loss'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        AssetTransfer: f.form('Asset Transfer', [
            f.section('Transfer Details', [
                ...f.reference('assetId', 'Asset', 'Asset', true),
                ...f.text('fromDepartment', 'From Department', true),
                ...f.text('toDepartment', 'To Department', true),
                ...f.date('transferDate', 'Transfer Date', true),
                ...f.textarea('reason', 'Reason')
            ])
        ]),

        AssetMaintenance: f.form('Asset Maintenance', [
            f.section('Maintenance Details', [
                ...f.reference('assetId', 'Asset', 'Asset', true),
                ...f.select('maintenanceType', 'Maintenance Type', enums.MAINTENANCE_TYPE, true),
                ...f.date('scheduledDate', 'Scheduled Date', true),
                ...f.date('completedDate', 'Completed Date'),
                ...f.select('status', 'Status', enums.MAINTENANCE_STATUS),
                ...f.money('cost', 'Cost'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        AssetRevaluation: f.form('Asset Revaluation', [
            f.section('Revaluation Details', [
                ...f.reference('assetId', 'Asset', 'Asset', true),
                ...f.date('revaluationDate', 'Revaluation Date', true),
                ...f.money('oldValue', 'Old Value'),
                ...f.money('newValue', 'New Value', true),
                ...f.money('adjustmentAmount', 'Adjustment Amount'),
                ...f.textarea('reason', 'Reason')
            ])
        ])
    };

})();
