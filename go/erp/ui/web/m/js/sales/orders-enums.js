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
 * Mobile Sales Orders Module - Enum Definitions
 * Desktop Equivalent: sales/orders/orders-enums.js
 */
(function() {
    'use strict';

    window.MobileSalesOrders = window.MobileSalesOrders || {};
    MobileSalesOrders.enums = {};

    // ============================================================================
    // QUOTATION STATUS
    // ============================================================================

    MobileSalesOrders.enums.QUOTATION_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Sent', 3: 'Accepted', 4: 'Rejected', 5: 'Expired', 6: 'Cancelled'
    };
    MobileSalesOrders.enums.QUOTATION_STATUS_VALUES = {
        'draft': 1, 'sent': 2, 'accepted': 3, 'rejected': 4, 'expired': 5, 'cancelled': 6
    };
    MobileSalesOrders.enums.QUOTATION_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-terminated', 5: 'status-inactive', 6: 'status-inactive'
    };

    // ============================================================================
    // SALES ORDER STATUS
    // ============================================================================

    MobileSalesOrders.enums.ORDER_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Confirmed', 3: 'In Progress', 4: 'Partially Shipped', 5: 'Shipped', 6: 'Delivered', 7: 'Cancelled'
    };
    MobileSalesOrders.enums.ORDER_STATUS_VALUES = {
        'draft': 1, 'confirmed': 2, 'in progress': 3, 'progress': 3, 'partial': 4, 'shipped': 5, 'delivered': 6, 'cancelled': 7
    };
    MobileSalesOrders.enums.ORDER_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-pending', 5: 'status-active', 6: 'status-active', 7: 'status-terminated'
    };

    // ============================================================================
    // RETURN STATUS
    // ============================================================================

    MobileSalesOrders.enums.RETURN_STATUS = {
        0: 'Unspecified', 1: 'Requested', 2: 'Approved', 3: 'Received', 4: 'Inspected', 5: 'Processed', 6: 'Rejected'
    };
    MobileSalesOrders.enums.RETURN_STATUS_VALUES = {
        'requested': 1, 'approved': 2, 'received': 3, 'inspected': 4, 'processed': 5, 'rejected': 6
    };
    MobileSalesOrders.enums.RETURN_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-pending', 5: 'status-active', 6: 'status-terminated'
    };

    // ============================================================================
    // ALLOCATION STATUS
    // ============================================================================

    MobileSalesOrders.enums.ALLOCATION_STATUS = {
        0: 'Unspecified', 1: 'Pending', 2: 'Allocated', 3: 'Partially Allocated', 4: 'Released', 5: 'Cancelled'
    };
    MobileSalesOrders.enums.ALLOCATION_STATUS_VALUES = {
        'pending': 1, 'allocated': 2, 'partial': 3, 'released': 4, 'cancelled': 5
    };
    MobileSalesOrders.enums.ALLOCATION_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-pending', 4: 'status-active', 5: 'status-inactive'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileSalesOrders.render = {
        quotationStatus: Layer8MRenderers.createStatusRenderer(
            MobileSalesOrders.enums.QUOTATION_STATUS,
            MobileSalesOrders.enums.QUOTATION_STATUS_CLASSES
        ),
        orderStatus: Layer8MRenderers.createStatusRenderer(
            MobileSalesOrders.enums.ORDER_STATUS,
            MobileSalesOrders.enums.ORDER_STATUS_CLASSES
        ),
        returnStatus: Layer8MRenderers.createStatusRenderer(
            MobileSalesOrders.enums.RETURN_STATUS,
            MobileSalesOrders.enums.RETURN_STATUS_CLASSES
        ),
        allocationStatus: Layer8MRenderers.createStatusRenderer(
            MobileSalesOrders.enums.ALLOCATION_STATUS,
            MobileSalesOrders.enums.ALLOCATION_STATUS_CLASSES
        ),
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
