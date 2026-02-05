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
// E-Commerce Orders Module - Enum Definitions

(function() {
    'use strict';

    window.EcomOrders = window.EcomOrders || {};
    EcomOrders.enums = {};

    // ORDER STATUS
    EcomOrders.enums.ORDER_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Confirmed',
        3: 'Processing',
        4: 'Shipped',
        5: 'Delivered',
        6: 'Cancelled',
        7: 'Refunded'
    };

    EcomOrders.enums.ORDER_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active',
        6: 'layer8d-status-terminated',
        7: 'layer8d-status-inactive'
    };

    // PAYMENT STATUS
    EcomOrders.enums.PAYMENT_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Authorized',
        3: 'Captured',
        4: 'Failed',
        5: 'Refunded'
    };

    EcomOrders.enums.PAYMENT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-inactive'
    };

    // RETURN STATUS
    EcomOrders.enums.RETURN_STATUS = {
        0: 'Unspecified',
        1: 'Requested',
        2: 'Approved',
        3: 'Received',
        4: 'Inspected',
        5: 'Refunded',
        6: 'Rejected'
    };

    EcomOrders.enums.RETURN_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active',
        6: 'layer8d-status-terminated'
    };

    // RENDERERS
    EcomOrders.render = {};

    EcomOrders.render.orderStatus = Layer8DRenderers.createStatusRenderer(
        EcomOrders.enums.ORDER_STATUS,
        EcomOrders.enums.ORDER_STATUS_CLASSES
    );

    EcomOrders.render.paymentStatus = Layer8DRenderers.createStatusRenderer(
        EcomOrders.enums.PAYMENT_STATUS,
        EcomOrders.enums.PAYMENT_STATUS_CLASSES
    );

    EcomOrders.render.returnStatus = Layer8DRenderers.createStatusRenderer(
        EcomOrders.enums.RETURN_STATUS,
        EcomOrders.enums.RETURN_STATUS_CLASSES
    );

    EcomOrders.render.date = Layer8DRenderers.renderDate;
    EcomOrders.render.money = Layer8DRenderers.renderMoney;

})();
