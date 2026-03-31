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
// Sales Shipping Module - Column Configurations
// Table column definitions for all Sales Shipping models

(function() {
    'use strict';

    window.SalesShipping = window.SalesShipping || {};

    const col = window.Layer8ColumnFactory;
    const render = SalesShipping.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    SalesShipping.columns = {
        SalesDeliveryOrder: [
            ...col.id('deliveryOrderId'),
            ...col.col('deliveryNumber', 'Delivery #'),
            ...col.col('salesOrderId', 'Order'),
            ...col.col('customerId', 'Customer'),
            ...col.date('plannedShipDate', 'Planned'),
            ...col.enum('status', 'Status', null, render.deliveryStatus),
        ]
    };

})();
