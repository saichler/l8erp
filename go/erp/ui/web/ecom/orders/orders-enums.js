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
// E-Commerce Orders Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8DRenderers;

    window.EcomOrders = window.EcomOrders || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const ORDER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Confirmed', 'confirmed', 'layer8d-status-active'],
        ['Processing', 'processing', 'layer8d-status-active'],
        ['Shipped', 'shipped', 'layer8d-status-active'],
        ['Delivered', 'delivered', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated'],
        ['Refunded', 'refunded', 'layer8d-status-inactive']
    ]);

    const PAYMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Authorized', 'authorized', 'layer8d-status-active'],
        ['Captured', 'captured', 'layer8d-status-active'],
        ['Failed', 'failed', 'layer8d-status-terminated'],
        ['Refunded', 'refunded', 'layer8d-status-inactive']
    ]);

    const RETURN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Requested', 'requested', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Received', 'received', 'layer8d-status-active'],
        ['Inspected', 'inspected', 'layer8d-status-active'],
        ['Refunded', 'refunded', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    EcomOrders.enums = {
        ORDER_STATUS: ORDER_STATUS.enum,
        ORDER_STATUS_CLASSES: ORDER_STATUS.classes,
        PAYMENT_STATUS: PAYMENT_STATUS.enum,
        PAYMENT_STATUS_CLASSES: PAYMENT_STATUS.classes,
        RETURN_STATUS: RETURN_STATUS.enum,
        RETURN_STATUS_CLASSES: RETURN_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    EcomOrders.render = {
        orderStatus: createStatusRenderer(ORDER_STATUS.enum, ORDER_STATUS.classes),
        paymentStatus: createStatusRenderer(PAYMENT_STATUS.enum, PAYMENT_STATUS.classes),
        returnStatus: createStatusRenderer(RETURN_STATUS.enum, RETURN_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
