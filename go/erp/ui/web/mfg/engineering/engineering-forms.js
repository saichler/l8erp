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
// Manufacturing Engineering Module - Form Definitions

(function() {
    'use strict';

    window.MfgEngineering = window.MfgEngineering || {};

    const enums = MfgEngineering.enums;

    MfgEngineering.forms = {
        MfgBom: {
            title: 'Bill of Materials',
            sections: [
                {
                    title: 'BOM Details',
                    fields: [
                        { key: 'bomNumber', label: 'BOM Number', type: 'text', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'bomType', label: 'BOM Type', type: 'select', options: enums.BOM_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.BOM_STATUS },
                        { key: 'revision', label: 'Revision', type: 'text' },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
                        { key: 'baseQuantity', label: 'Base Quantity', type: 'number' },
                        { key: 'unitOfMeasure', label: 'UOM', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        MfgBomLine: {
            title: 'BOM Line',
            sections: [
                {
                    title: 'Line Details',
                    fields: [
                        { key: 'bomId', label: 'BOM', type: 'reference', lookupModel: 'MfgBom', required: true },
                        { key: 'componentItemId', label: 'Component', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'unitOfMeasure', label: 'UOM', type: 'text' },
                        { key: 'sequenceNumber', label: 'Sequence', type: 'number' },
                        { key: 'scrapPercent', label: 'Scrap %', type: 'number' },
                        { key: 'operationId', label: 'Operation', type: 'reference', lookupModel: 'MfgRoutingOperation' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        MfgRouting: {
            title: 'Routing',
            sections: [
                {
                    title: 'Routing Details',
                    fields: [
                        { key: 'routingNumber', label: 'Routing Number', type: 'text', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ROUTING_STATUS },
                        { key: 'revision', label: 'Revision', type: 'text' },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        MfgRoutingOperation: {
            title: 'Routing Operation',
            sections: [
                {
                    title: 'Operation Details',
                    fields: [
                        { key: 'routingId', label: 'Routing', type: 'reference', lookupModel: 'MfgRouting', required: true },
                        { key: 'operationNumber', label: 'Operation #', type: 'number', required: true },
                        { key: 'workCenterId', label: 'Work Center', type: 'reference', lookupModel: 'MfgWorkCenter', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'setupTime', label: 'Setup Time (hrs)', type: 'number' },
                        { key: 'runTime', label: 'Run Time (hrs)', type: 'number' },
                        { key: 'moveTime', label: 'Move Time (hrs)', type: 'number' },
                        { key: 'queueTime', label: 'Queue Time (hrs)', type: 'number' }
                    ]
                }
            ]
        },

        MfgEngChangeOrder: {
            title: 'Engineering Change Order',
            sections: [
                {
                    title: 'ECO Details',
                    fields: [
                        { key: 'ecoNumber', label: 'ECO Number', type: 'text', required: true },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'changeType', label: 'Change Type', type: 'select', options: enums.ECO_CHANGE_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ECO_STATUS },
                        { key: 'requestedBy', label: 'Requested By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'requestDate', label: 'Request Date', type: 'date' },
                        { key: 'targetDate', label: 'Target Date', type: 'date' },
                        { key: 'priority', label: 'Priority', type: 'text' },
                        { key: 'reason', label: 'Reason', type: 'textarea' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        MfgEngChangeDetail: {
            title: 'ECO Detail',
            sections: [
                {
                    title: 'Change Details',
                    fields: [
                        { key: 'changeOrderId', label: 'ECO', type: 'reference', lookupModel: 'MfgEngChangeOrder', required: true },
                        { key: 'affectedItemId', label: 'Affected Item', type: 'reference', lookupModel: 'ScmItem' },
                        { key: 'affectedBomId', label: 'Affected BOM', type: 'reference', lookupModel: 'MfgBom' },
                        { key: 'affectedRoutingId', label: 'Affected Routing', type: 'reference', lookupModel: 'MfgRouting' },
                        { key: 'changeDescription', label: 'Change Description', type: 'textarea', required: true },
                        { key: 'oldValue', label: 'Old Value', type: 'text' },
                        { key: 'newValue', label: 'New Value', type: 'text' }
                    ]
                }
            ]
        }
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
