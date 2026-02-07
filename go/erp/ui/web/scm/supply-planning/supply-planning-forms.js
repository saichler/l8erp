/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Supply Planning Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.ScmSupplyPlanning = window.ScmSupplyPlanning || {};

    const f = window.Layer8FormFactory;
    const enums = ScmSupplyPlanning.enums;

    ScmSupplyPlanning.forms = {
        ScmMaterialRequirement: f.form('Material Requirement', [
            f.section('Requirement Details', [
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.number('requiredQuantity', 'Required Quantity', true),
                ...f.date('requiredDate', 'Required Date', true),
                ...f.select('planningMethod', 'Planning Method', enums.PLANNING_METHOD),
                ...f.text('source', 'Source'),
                ...f.select('status', 'Status', enums.TASK_STATUS),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        ScmDistributionRequirement: f.form('Distribution Requirement', [
            f.section('Distribution Details', [
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.reference('sourceWarehouseId', 'Source Warehouse', 'ScmWarehouse', true),
                ...f.reference('destinationWarehouseId', 'Destination Warehouse', 'ScmWarehouse', true),
                ...f.number('requiredQuantity', 'Required Quantity', true),
                ...f.date('requiredDate', 'Required Date', true),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        ScmSupplyPlan: f.form('Supply Plan', [
            f.section('Plan Details', [
                ...f.text('name', 'Plan Name', true),
                ...f.date('planPeriod.startDate', 'Start Date', true),
                ...f.date('planPeriod.endDate', 'End Date', true),
                ...f.text('createdBy', 'Created By'),
                ...f.select('status', 'Status', enums.TASK_STATUS),
                ...f.textarea('description', 'Description')
            ])
        ]),

        ScmSupplierCollaboration: f.form('Supplier Collaboration', [
            f.section('Collaboration Details', [
                ...f.reference('vendorId', 'Vendor', 'Vendor', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.number('minOrderQuantity', 'Min Order Quantity', true),
                ...f.checkbox('leadTimeAgreed', 'Lead Time Agreed'),
                ...f.select('status', 'Status', enums.TASK_STATUS),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        ScmSafetyStock: f.form('Safety Stock', [
            f.section('Safety Stock Details', [
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse', true),
                ...f.number('safetyStockQuantity', 'Safety Stock Quantity', true),
                ...f.text('calculationMethod', 'Calculation Method'),
                ...f.number('serviceLevel', 'Service Level %'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        ScmLeadTime: f.form('Lead Time', [
            f.section('Lead Time Details', [
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.reference('vendorId', 'Vendor', 'Vendor', true),
                ...f.number('leadTimeDays', 'Lead Time (days)', true),
                ...f.number('transitDays', 'Transit (days)'),
                ...f.number('totalDays', 'Total (days)'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

    ScmSupplyPlanning.primaryKeys = {
        ScmMaterialRequirement: 'requirementId',
        ScmDistributionRequirement: 'requirementId',
        ScmSupplyPlan: 'planId',
        ScmSupplierCollaboration: 'collaborationId',
        ScmSafetyStock: 'safetyStockId',
        ScmLeadTime: 'leadTimeId'
    };

})();
