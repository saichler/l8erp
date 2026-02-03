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
// Sales Orders Module - Enum Definitions
// All enum constants and value mappings for Sales Orders models

(function() {
    'use strict';

    // Create SalesOrders namespace
    window.SalesOrders = window.SalesOrders || {};
    SalesOrders.enums = {};

    // ============================================================================
    // QUOTATION STATUS
    // ============================================================================

    SalesOrders.enums.QUOTATION_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Sent',
        3: 'Accepted',
        4: 'Rejected',
        5: 'Expired',
        6: 'Cancelled'
    };

    SalesOrders.enums.QUOTATION_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-inactive',
        6: 'layer8d-status-inactive'
    };

    // ============================================================================
    // SALES ORDER STATUS
    // ============================================================================

    SalesOrders.enums.ORDER_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Confirmed',
        3: 'In Progress',
        4: 'Partially Shipped',
        5: 'Shipped',
        6: 'Delivered',
        7: 'Cancelled'
    };

    SalesOrders.enums.ORDER_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-pending',
        5: 'layer8d-status-active',
        6: 'layer8d-status-active',
        7: 'layer8d-status-terminated'
    };

    // ============================================================================
    // RETURN STATUS
    // ============================================================================

    SalesOrders.enums.RETURN_STATUS = {
        0: 'Unspecified',
        1: 'Requested',
        2: 'Approved',
        3: 'Received',
        4: 'Inspected',
        5: 'Processed',
        6: 'Rejected'
    };

    SalesOrders.enums.RETURN_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-pending',
        5: 'layer8d-status-active',
        6: 'layer8d-status-terminated'
    };

    // ============================================================================
    // ALLOCATION STATUS
    // ============================================================================

    SalesOrders.enums.ALLOCATION_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Allocated',
        3: 'Partially Allocated',
        4: 'Released',
        5: 'Cancelled'
    };

    SalesOrders.enums.ALLOCATION_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-active',
        5: 'layer8d-status-inactive'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    SalesOrders.render = {};

    SalesOrders.render.quotationStatus = Layer8DRenderers.createStatusRenderer(
        SalesOrders.enums.QUOTATION_STATUS,
        SalesOrders.enums.QUOTATION_STATUS_CLASSES
    );

    SalesOrders.render.orderStatus = Layer8DRenderers.createStatusRenderer(
        SalesOrders.enums.ORDER_STATUS,
        SalesOrders.enums.ORDER_STATUS_CLASSES
    );

    SalesOrders.render.returnStatus = Layer8DRenderers.createStatusRenderer(
        SalesOrders.enums.RETURN_STATUS,
        SalesOrders.enums.RETURN_STATUS_CLASSES
    );

    SalesOrders.render.allocationStatus = Layer8DRenderers.createStatusRenderer(
        SalesOrders.enums.ALLOCATION_STATUS,
        SalesOrders.enums.ALLOCATION_STATUS_CLASSES
    );

    SalesOrders.render.date = Layer8DRenderers.renderDate;
    SalesOrders.render.money = Layer8DRenderers.renderMoney;

})();
