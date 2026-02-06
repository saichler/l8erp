/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Manufacturing Engineering Module - Form Definitions
 * Desktop Equivalent: mfg/engineering/engineering-forms.js
 */
(function() {
    'use strict';

    window.MobileMfgEngineering = window.MobileMfgEngineering || {};
    const f = window.Layer8FormFactory;
    const enums = MobileMfgEngineering.enums;

    MobileMfgEngineering.forms = {
        MfgBom: f.form('Bill of Materials', [
            f.section('BOM Details', [
                ...f.text('bomNumber', 'BOM Number', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.textarea('description', 'Description'),
                ...f.select('bomType', 'BOM Type', enums.BOM_TYPE),
                ...f.select('status', 'Status', enums.BOM_STATUS),
                ...f.text('revision', 'Revision'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.number('baseQuantity', 'Base Quantity'),
                ...f.text('unitOfMeasure', 'UOM'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),
        MfgBomLine: f.form('BOM Line', [
            f.section('Line Details', [
                ...f.reference('bomId', 'BOM', 'MfgBom', true),
                ...f.reference('componentItemId', 'Component', 'ScmItem', true),
                ...f.number('quantity', 'Quantity', true),
                ...f.text('unitOfMeasure', 'UOM'),
                ...f.number('sequenceNumber', 'Sequence'),
                ...f.number('scrapPercent', 'Scrap %')
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
                ...f.textarea('notes', 'Notes')
            ])
        ]),
        MfgRoutingOperation: f.form('Routing Operation', [
            f.section('Operation Details', [
                ...f.reference('routingId', 'Routing', 'MfgRouting', true),
                ...f.number('operationNumber', 'Operation #', true),
                ...f.reference('workCenterId', 'Work Center', 'MfgWorkCenter', true),
                ...f.textarea('description', 'Description'),
                ...f.number('setupTime', 'Setup Time (hrs)'),
                ...f.number('runTime', 'Run Time (hrs)')
            ])
        ]),
        MfgEngChangeOrder: f.form('Engineering Change Order', [
            f.section('ECO Details', [
                ...f.text('ecoNumber', 'ECO Number', true),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.select('changeType', 'Change Type', enums.ECO_CHANGE_TYPE),
                ...f.select('status', 'Status', enums.ECO_STATUS),
                ...f.date('requestDate', 'Request Date'),
                ...f.date('targetDate', 'Target Date'),
                ...f.textarea('reason', 'Reason')
            ])
        ]),
        MfgEngChangeDetail: f.form('ECO Detail', [
            f.section('Change Details', [
                ...f.reference('changeOrderId', 'ECO', 'MfgEngChangeOrder', true),
                ...f.reference('affectedItemId', 'Affected Item', 'ScmItem'),
                ...f.textarea('changeDescription', 'Change Description', true),
                ...f.text('oldValue', 'Old Value'),
                ...f.text('newValue', 'New Value')
            ])
        ])
    };

    MobileMfgEngineering.primaryKeys = {
        MfgBom: 'bomId', MfgBomLine: 'lineId', MfgRouting: 'routingId',
        MfgRoutingOperation: 'operationId', MfgEngChangeOrder: 'changeOrderId', MfgEngChangeDetail: 'detailId'
    };

})();
