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

    const col = window.Layer8ColumnFactory;
    const render = MfgEngineering.render;
    const enums = MfgEngineering.enums;

    MfgEngineering.columns = {
        MfgBom: [
            ...col.id('bomId'),
            ...col.basic([['bomNumber', 'BOM #'], ['itemId', 'Item'], 'description', 'revision']),
            ...col.custom('bomType', 'Type', (item) => enums.BOM_TYPE[item.bomType] || 'Unknown'),
            ...col.custom('status', 'Status', (item) => render.bomStatus(item.status))
        ],

        MfgBomLine: [
            ...col.id('lineId'),
            ...col.basic([['bomId', 'BOM'], ['componentItemId', 'Component']]),
            ...col.col('quantity', 'Qty'),
            ...col.basic([['unitOfMeasure', 'UOM'], ['sequenceNumber', 'Seq #']])
        ],

        MfgRouting: [
            ...col.id('routingId'),
            ...col.basic([['routingNumber', 'Routing #'], ['itemId', 'Item'], 'description', 'revision']),
            ...col.custom('status', 'Status', (item) => render.routingStatus(item.status))
        ],

        MfgRoutingOperation: [
            ...col.id('operationId'),
            ...col.basic([['routingId', 'Routing'], ['operationNumber', 'Op #'], ['workCenterId', 'Work Center'], 'description']),
            ...col.basic([['setupTime', 'Setup (hrs)'], ['runTime', 'Run (hrs)']])
        ],

        MfgEngChangeOrder: [
            ...col.id('changeOrderId'),
            ...col.basic([['ecoNumber', 'ECO #'], 'title']),
            ...col.custom('changeType', 'Type', (item) => enums.ECO_CHANGE_TYPE[item.changeType] || 'Unknown'),
            ...col.date('requestDate', 'Request Date'),
            ...col.custom('status', 'Status', (item) => render.ecoStatus(item.status))
        ],

        MfgEngChangeDetail: [
            ...col.id('detailId'),
            ...col.basic([['changeOrderId', 'ECO'], ['affectedItemId', 'Item'], ['changeDescription', 'Change']]),
            ...col.basic([['oldValue', 'Old Value'], ['newValue', 'New Value']])
        ]
    };
})();
