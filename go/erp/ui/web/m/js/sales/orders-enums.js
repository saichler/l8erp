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
 * Mobile Sales Orders Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: sales/orders/orders-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileSalesOrders = window.MobileSalesOrders || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const QUOTATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Sent', 'sent', 'status-active'],
        ['Accepted', 'accepted', 'status-active'],
        ['Rejected', 'rejected', 'status-terminated'],
        ['Expired', 'expired', 'status-inactive'],
        ['Cancelled', 'cancelled', 'status-inactive']
    ]);

    const ORDER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Confirmed', 'confirmed', 'status-active'],
        ['In Progress', 'in progress', 'status-active'],
        ['Partially Shipped', 'partial', 'status-pending'],
        ['Shipped', 'shipped', 'status-active'],
        ['Delivered', 'delivered', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    const RETURN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Requested', 'requested', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Received', 'received', 'status-active'],
        ['Inspected', 'inspected', 'status-pending'],
        ['Processed', 'processed', 'status-active'],
        ['Rejected', 'rejected', 'status-terminated']
    ]);

    const ALLOCATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['Allocated', 'allocated', 'status-active'],
        ['Partially Allocated', 'partial', 'status-pending'],
        ['Released', 'released', 'status-active'],
        ['Cancelled', 'cancelled', 'status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileSalesOrders.enums = {
        QUOTATION_STATUS: QUOTATION_STATUS.enum,
        QUOTATION_STATUS_VALUES: QUOTATION_STATUS.values,
        QUOTATION_STATUS_CLASSES: QUOTATION_STATUS.classes,
        ORDER_STATUS: ORDER_STATUS.enum,
        ORDER_STATUS_VALUES: ORDER_STATUS.values,
        ORDER_STATUS_CLASSES: ORDER_STATUS.classes,
        RETURN_STATUS: RETURN_STATUS.enum,
        RETURN_STATUS_VALUES: RETURN_STATUS.values,
        RETURN_STATUS_CLASSES: RETURN_STATUS.classes,
        ALLOCATION_STATUS: ALLOCATION_STATUS.enum,
        ALLOCATION_STATUS_VALUES: ALLOCATION_STATUS.values,
        ALLOCATION_STATUS_CLASSES: ALLOCATION_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileSalesOrders.render = {
        quotationStatus: createStatusRenderer(QUOTATION_STATUS.enum, QUOTATION_STATUS.classes),
        orderStatus: createStatusRenderer(ORDER_STATUS.enum, ORDER_STATUS.classes),
        returnStatus: createStatusRenderer(RETURN_STATUS.enum, RETURN_STATUS.classes),
        allocationStatus: createStatusRenderer(ALLOCATION_STATUS.enum, ALLOCATION_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
