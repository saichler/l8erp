/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Manufacturing Engineering Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MfgEngineering = window.MfgEngineering || {};

    const f = window.Layer8FormFactory;
    const enums = MfgEngineering.enums;

    MfgEngineering.forms = {
        MfgBom: f.form('Bill of Materials', [
            f.section('BOM Details', [
                ...f.text('bomNumber', 'BOM Number', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.textarea('description', 'Description'),
                ...f.select('bomType', 'BOM Type', enums.BOM_TYPE),
                ...f.select('status', 'Status', enums.BOM_STATUS),
                ...f.text('revision', 'Revision'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.number('baseQuantity', 'Base Quantity'),
                ...f.text('unitOfMeasure', 'UOM'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgBomLine: f.form('BOM Line', [
            f.section('Line Details', [
                ...f.reference('bomId', 'BOM', 'MfgBom', true),
                ...f.reference('componentItemId', 'Component', 'ScmItem', true),
                ...f.number('quantityPer', 'Quantity Per', true),
                ...f.text('unitOfMeasure', 'UOM'),
                ...f.number('lineNumber', 'Line Number'),
                ...f.number('scrapPercent', 'Scrap %'),
                ...f.reference('operationId', 'Operation', 'MfgRoutingOperation'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgRouting: f.form('Routing', [
            f.section('Routing Details', [
                ...f.text('routingNumber', 'Routing Number', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.textarea('description', 'Description'),
                ...f.select('status', 'Status', enums.ROUTING_STATUS),
                ...f.text('revision', 'Revision'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgRoutingOperation: f.form('Routing Operation', [
            f.section('Operation Details', [
                ...f.reference('routingId', 'Routing', 'MfgRouting', true),
                ...f.number('operationNumber', 'Operation #', true),
                ...f.text('operationName', 'Operation Name'),
                ...f.reference('workCenterId', 'Work Center', 'MfgWorkCenter', true),
                ...f.textarea('description', 'Description'),
                ...f.number('setupTime', 'Setup Time (hrs)'),
                ...f.number('runTime', 'Run Time (hrs)'),
                ...f.number('moveTime', 'Move Time (hrs)'),
                ...f.number('queueTime', 'Queue Time (hrs)')
            ])
        ]),

        MfgEngChangeOrder: f.form('Engineering Change Order', [
            f.section('ECO Details', [
                ...f.text('ecoNumber', 'ECO Number', true),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.select('status', 'Status', enums.ECO_STATUS),
                ...f.reference('requestedBy', 'Requested By', 'Employee'),
                ...f.date('requestDate', 'Request Date'),
                ...f.date('requiredDate', 'Required Date'),
                ...f.number('priority', 'Priority'),
                ...f.textarea('reason', 'Reason'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgEngChangeDetail: f.form('ECO Detail', [
            f.section('Change Details', [
                ...f.reference('changeOrderId', 'ECO', 'MfgEngChangeOrder', true),
                ...f.text('changeType', 'Change Type'),
                ...f.text('affectedId', 'Affected ID'),
                ...f.textarea('description', 'Description', true),
                ...f.text('oldValue', 'Old Value'),
                ...f.text('newValue', 'New Value'),
                ...f.text('oldRevision', 'Old Revision'),
                ...f.text('newRevision', 'New Revision'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

    MfgEngineering.primaryKeys = {
        MfgBom: 'bomId',
        MfgBomLine: 'lineId',
        MfgRouting: 'routingId',
        MfgRoutingOperation: 'operationId',
        MfgEngChangeOrder: 'changeOrderId',
        MfgEngChangeDetail: 'detailId'
    };

})();
