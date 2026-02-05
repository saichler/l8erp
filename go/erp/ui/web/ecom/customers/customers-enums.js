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
// E-Commerce Customers Module - Enum Definitions

(function() {
    'use strict';

    window.EcomCustomers = window.EcomCustomers || {};
    EcomCustomers.enums = {};

    // CUSTOMER TYPE
    EcomCustomers.enums.CUSTOMER_TYPE = {
        0: 'Unspecified',
        1: 'Guest',
        2: 'Registered',
        3: 'VIP',
        4: 'Wholesale'
    };

    EcomCustomers.enums.CUSTOMER_TYPE_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active'
    };

    // CART STATUS
    EcomCustomers.enums.CART_STATUS = {
        0: 'Unspecified',
        1: 'Active',
        2: 'Abandoned',
        3: 'Converted',
        4: 'Expired'
    };

    EcomCustomers.enums.CART_STATUS_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // RENDERERS
    EcomCustomers.render = {};

    EcomCustomers.render.customerType = Layer8DRenderers.createStatusRenderer(
        EcomCustomers.enums.CUSTOMER_TYPE,
        EcomCustomers.enums.CUSTOMER_TYPE_CLASSES
    );

    EcomCustomers.render.cartStatus = Layer8DRenderers.createStatusRenderer(
        EcomCustomers.enums.CART_STATUS,
        EcomCustomers.enums.CART_STATUS_CLASSES
    );

    EcomCustomers.render.date = Layer8DRenderers.renderDate;
    EcomCustomers.render.money = Layer8DRenderers.renderMoney;

})();
