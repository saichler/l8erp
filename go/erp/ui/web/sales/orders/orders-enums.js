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
// Sales Orders Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8DRenderers;

    window.SalesOrders = window.SalesOrders || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const QUOTATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Sent', 'sent', 'layer8d-status-active'],
        ['Accepted', 'accepted', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-terminated'],
        ['Expired', 'expired', 'layer8d-status-inactive'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    const ORDER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Confirmed', 'confirmed', 'layer8d-status-active'],
        ['In Progress', 'progress', 'layer8d-status-active'],
        ['Partially Shipped', 'partial', 'layer8d-status-pending'],
        ['Shipped', 'shipped', 'layer8d-status-active'],
        ['Delivered', 'delivered', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    const RETURN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Requested', 'requested', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Received', 'received', 'layer8d-status-active'],
        ['Inspected', 'inspected', 'layer8d-status-pending'],
        ['Processed', 'processed', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-terminated']
    ]);

    const ALLOCATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Allocated', 'allocated', 'layer8d-status-active'],
        ['Partially Allocated', 'partial', 'layer8d-status-pending'],
        ['Released', 'released', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    SalesOrders.enums = {
        QUOTATION_STATUS: QUOTATION_STATUS.enum,
        QUOTATION_STATUS_CLASSES: QUOTATION_STATUS.classes,
        ORDER_STATUS: ORDER_STATUS.enum,
        ORDER_STATUS_CLASSES: ORDER_STATUS.classes,
        RETURN_STATUS: RETURN_STATUS.enum,
        RETURN_STATUS_CLASSES: RETURN_STATUS.classes,
        ALLOCATION_STATUS: ALLOCATION_STATUS.enum,
        ALLOCATION_STATUS_CLASSES: ALLOCATION_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    SalesOrders.render = {
        quotationStatus: createStatusRenderer(QUOTATION_STATUS.enum, QUOTATION_STATUS.classes),
        orderStatus: createStatusRenderer(ORDER_STATUS.enum, ORDER_STATUS.classes),
        returnStatus: createStatusRenderer(RETURN_STATUS.enum, RETURN_STATUS.classes),
        allocationStatus: createStatusRenderer(ALLOCATION_STATUS.enum, ALLOCATION_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
