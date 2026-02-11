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

    const col = window.Layer8ColumnFactory;
    window.MobileMfgEngineering = window.MobileMfgEngineering || {};
    const render = MobileMfgEngineering.render;
    const enums = MobileMfgEngineering.enums;

    MobileMfgEngineering.columns = {
        MfgBom: [
            ...col.id('bomId'),
            ...col.col('bomNumber', 'BOM #'),
            ...col.col('itemId', 'Item'),
            ...col.col('description', 'Description'),
            ...col.col('revision', 'Rev'),
            ...col.enum('bomType', 'Type', null, (v) => enums.BOM_TYPE[v] || 'Unknown'),
            ...col.enum('status', 'Status', null, render.bomStatus)
        ],
        MfgRouting: [
            ...col.id('routingId'),
            ...col.col('routingNumber', 'Routing #'),
            ...col.col('itemId', 'Item'),
            ...col.col('description', 'Description'),
            ...col.col('revision', 'Rev'),
            ...col.enum('status', 'Status', null, render.routingStatus)
        ],
        MfgEngChangeOrder: [
            ...col.id('changeOrderId'),
            ...col.col('ecoNumber', 'ECO #'),
            ...col.col('title', 'Title'),
            ...col.col('priority', 'Priority'),
            ...col.date('requestDate', 'Request Date'),
            ...col.enum('status', 'Status', null, render.ecoStatus)
        ],
    };

})();
