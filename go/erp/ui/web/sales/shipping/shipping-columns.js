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

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = SalesShipping.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    SalesShipping.columns = {
        SalesDeliveryOrder: [
            { key: 'deliveryOrderId', label: 'ID', sortKey: 'deliveryOrderId', filterKey: 'deliveryOrderId' },
            { key: 'deliveryNumber', label: 'Delivery #', sortKey: 'deliveryNumber', filterKey: 'deliveryNumber' },
            { key: 'salesOrderId', label: 'Order', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            {
                key: 'plannedShipDate',
                label: 'Planned',
                sortKey: 'plannedShipDate',
                render: (item) => renderDate(item.plannedShipDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.deliveryStatus(item.status)
            }
        ]
    };

})();
