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
// Manufacturing Engineering Module - Column Configurations

(function() {
    'use strict';

    window.MfgEngineering = window.MfgEngineering || {};

    const { renderDate } = Layer8DRenderers;
    const render = MfgEngineering.render;
    const enums = MfgEngineering.enums;

    MfgEngineering.columns = {
        MfgBom: [
            { key: 'bomId', label: 'ID', sortKey: 'bomId', filterKey: 'bomId' },
            { key: 'bomNumber', label: 'BOM #', sortKey: 'bomNumber', filterKey: 'bomNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'revision', label: 'Rev', sortKey: 'revision' },
            {
                key: 'bomType',
                label: 'Type',
                sortKey: 'bomType',
                render: (item) => enums.BOM_TYPE[item.bomType] || 'Unknown'
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.bomStatus(item.status)
            }
        ],

        MfgBomLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'bomId', label: 'BOM', sortKey: 'bomId', filterKey: 'bomId' },
            { key: 'componentItemId', label: 'Component', sortKey: 'componentItemId', filterKey: 'componentItemId' },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' },
            { key: 'unitOfMeasure', label: 'UOM', sortKey: 'unitOfMeasure' },
            { key: 'sequenceNumber', label: 'Seq #', sortKey: 'sequenceNumber' }
        ],

        MfgRouting: [
            { key: 'routingId', label: 'ID', sortKey: 'routingId', filterKey: 'routingId' },
            { key: 'routingNumber', label: 'Routing #', sortKey: 'routingNumber', filterKey: 'routingNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'revision', label: 'Rev', sortKey: 'revision' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.routingStatus(item.status)
            }
        ],

        MfgRoutingOperation: [
            { key: 'operationId', label: 'ID', sortKey: 'operationId', filterKey: 'operationId' },
            { key: 'routingId', label: 'Routing', sortKey: 'routingId', filterKey: 'routingId' },
            { key: 'operationNumber', label: 'Op #', sortKey: 'operationNumber' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'setupTime', label: 'Setup (hrs)', sortKey: 'setupTime' },
            { key: 'runTime', label: 'Run (hrs)', sortKey: 'runTime' }
        ],

        MfgEngChangeOrder: [
            { key: 'changeOrderId', label: 'ID', sortKey: 'changeOrderId', filterKey: 'changeOrderId' },
            { key: 'ecoNumber', label: 'ECO #', sortKey: 'ecoNumber', filterKey: 'ecoNumber' },
            { key: 'title', label: 'Title', sortKey: 'title' },
            {
                key: 'changeType',
                label: 'Type',
                sortKey: 'changeType',
                render: (item) => enums.ECO_CHANGE_TYPE[item.changeType] || 'Unknown'
            },
            {
                key: 'requestDate',
                label: 'Request Date',
                sortKey: 'requestDate',
                render: (item) => renderDate(item.requestDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.ecoStatus(item.status)
            }
        ],

        MfgEngChangeDetail: [
            { key: 'detailId', label: 'ID', sortKey: 'detailId', filterKey: 'detailId' },
            { key: 'changeOrderId', label: 'ECO', sortKey: 'changeOrderId', filterKey: 'changeOrderId' },
            { key: 'affectedItemId', label: 'Item', sortKey: 'affectedItemId' },
            { key: 'changeDescription', label: 'Change', sortKey: 'changeDescription' },
            { key: 'oldValue', label: 'Old Value', sortKey: 'oldValue' },
            { key: 'newValue', label: 'New Value', sortKey: 'newValue' }
        ]
    };

})();
