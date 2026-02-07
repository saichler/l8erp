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
/**
 * Mobile Manufacturing Engineering Module - Column Definitions
 * Desktop Equivalent: mfg/engineering/engineering-columns.js
 */
(function() {
    'use strict';

    window.MobileMfgEngineering = window.MobileMfgEngineering || {};
    const render = MobileMfgEngineering.render;
    const enums = MobileMfgEngineering.enums;

    MobileMfgEngineering.columns = {
        MfgBom: [
            { key: 'bomId', label: 'ID', sortKey: 'bomId' },
            { key: 'bomNumber', label: 'BOM #', sortKey: 'bomNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'revision', label: 'Rev', sortKey: 'revision' },
            { key: 'bomType', label: 'Type', sortKey: 'bomType', render: (item) => enums.BOM_TYPE[item.bomType] || 'Unknown' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.bomStatus(item.status) }
        ],
        MfgBomLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId' },
            { key: 'bomId', label: 'BOM', sortKey: 'bomId' },
            { key: 'componentItemId', label: 'Component', sortKey: 'componentItemId' },
            { key: 'quantityPer', label: 'Qty Per', sortKey: 'quantityPer' },
            { key: 'unitOfMeasure', label: 'UOM', sortKey: 'unitOfMeasure' },
            { key: 'lineNumber', label: 'Line #', sortKey: 'lineNumber' }
        ],
        MfgRouting: [
            { key: 'routingId', label: 'ID', sortKey: 'routingId' },
            { key: 'routingNumber', label: 'Routing #', sortKey: 'routingNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'revision', label: 'Rev', sortKey: 'revision' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.routingStatus(item.status) }
        ],
        MfgRoutingOperation: [
            { key: 'operationId', label: 'ID', sortKey: 'operationId' },
            { key: 'routingId', label: 'Routing', sortKey: 'routingId' },
            { key: 'operationNumber', label: 'Op #', sortKey: 'operationNumber' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'setupTime', label: 'Setup (hrs)', sortKey: 'setupTime' },
            { key: 'runTime', label: 'Run (hrs)', sortKey: 'runTime' }
        ],
        MfgEngChangeOrder: [
            { key: 'changeOrderId', label: 'ID', sortKey: 'changeOrderId' },
            { key: 'ecoNumber', label: 'ECO #', sortKey: 'ecoNumber' },
            { key: 'title', label: 'Title', sortKey: 'title' },
            { key: 'priority', label: 'Priority', sortKey: 'priority' },
            { key: 'requestDate', label: 'Request Date', sortKey: 'requestDate', render: (item) => render.date(item.requestDate) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.ecoStatus(item.status) }
        ],
        MfgEngChangeDetail: [
            { key: 'detailId', label: 'ID', sortKey: 'detailId' },
            { key: 'changeOrderId', label: 'ECO', sortKey: 'changeOrderId' },
            { key: 'affectedId', label: 'Affected', sortKey: 'affectedId' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'oldValue', label: 'Old Value', sortKey: 'oldValue' },
            { key: 'newValue', label: 'New Value', sortKey: 'newValue' }
        ]
    };

})();
