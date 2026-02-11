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
 * Mobile Manufacturing Production Module - Column Definitions
 * Desktop Equivalent: mfg/production/production-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    window.MobileMfgProduction = window.MobileMfgProduction || {};
    const render = MobileMfgProduction.render;

    MobileMfgProduction.columns = {
        MfgWorkOrder: [
            ...col.id('workOrderId'),
            ...col.col('workOrderNumber', 'WO #'),
            ...col.col('itemId', 'Item'),
            ...col.col('quantityOrdered', 'Qty Ordered'),
            ...col.col('quantityCompleted', 'Qty Completed'),
            ...col.date('plannedStartDate', 'Planned Start'),
            ...col.enum('status', 'Status', null, render.workOrderStatus)
        ],
        MfgProductionOrder: [
            ...col.id('prodOrderId'),
            ...col.col('orderNumber', 'Order #'),
            ...col.col('customerId', 'Customer'),
            ...col.date('orderDate', 'Order Date'),
            ...col.date('requiredDate', 'Required'),
            ...col.enum('status', 'Status', null, render.workOrderStatus)
        ],
    };

})();
