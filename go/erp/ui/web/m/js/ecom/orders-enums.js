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
 * Mobile ECOM Orders Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: ecom/orders/orders-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileEcomOrders = window.MobileEcomOrders || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const ORDER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['Confirmed', 'confirmed', 'status-active'],
        ['Processing', 'processing', 'status-active'],
        ['Shipped', 'shipped', 'status-active'],
        ['Delivered', 'delivered', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated'],
        ['Refunded', 'refunded', 'status-inactive']
    ]);

    const PAYMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['Authorized', 'authorized', 'status-active'],
        ['Captured', 'captured', 'status-active'],
        ['Failed', 'failed', 'status-terminated'],
        ['Refunded', 'refunded', 'status-inactive']
    ]);

    const RETURN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Requested', 'requested', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Received', 'received', 'status-active'],
        ['Inspected', 'inspected', 'status-active'],
        ['Refunded', 'refunded', 'status-active'],
        ['Rejected', 'rejected', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileEcomOrders.enums = {
        ORDER_STATUS: ORDER_STATUS.enum,
        ORDER_STATUS_CLASSES: ORDER_STATUS.classes,
        PAYMENT_STATUS: PAYMENT_STATUS.enum,
        PAYMENT_STATUS_CLASSES: PAYMENT_STATUS.classes,
        RETURN_STATUS: RETURN_STATUS.enum,
        RETURN_STATUS_CLASSES: RETURN_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileEcomOrders.render = {
        orderStatus: createStatusRenderer(ORDER_STATUS.enum, ORDER_STATUS.classes),
        paymentStatus: createStatusRenderer(PAYMENT_STATUS.enum, PAYMENT_STATUS.classes),
        returnStatus: createStatusRenderer(RETURN_STATUS.enum, RETURN_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
