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
 * Mobile Sales Shipping Module - Column Configurations
 * Desktop Equivalent: sales/shipping/shipping-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileSalesShipping.enums;
    const render = MobileSalesShipping.render;

    MobileSalesShipping.columns = {
        DeliveryOrder: [
            ...col.id('deliveryOrderId'),
            ...col.col('deliveryNumber', 'Delivery #'),
            ...col.col('salesOrderId', 'Order'),
            ...col.col('customerId', 'Customer'),
            ...col.date('plannedShipDate', 'Planned'),
            ...col.status('status', 'Status', enums.DELIVERY_STATUS_VALUES, render.deliveryStatus)
        ]
    };

    MobileSalesShipping.primaryKeys = {
        DeliveryOrder: 'deliveryOrderId'
    };

})();
