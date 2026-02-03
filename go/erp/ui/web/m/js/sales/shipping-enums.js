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
 * Mobile Sales Shipping Module - Enum Definitions
 * Desktop Equivalent: sales/shipping/shipping-enums.js
 */
(function() {
    'use strict';

    window.MobileSalesShipping = window.MobileSalesShipping || {};
    MobileSalesShipping.enums = {};

    // ============================================================================
    // DELIVERY STATUS
    // ============================================================================

    MobileSalesShipping.enums.DELIVERY_STATUS = {
        0: 'Unspecified', 1: 'Planned', 2: 'Picking', 3: 'Packed', 4: 'Shipped', 5: 'Delivered', 6: 'Failed'
    };
    MobileSalesShipping.enums.DELIVERY_STATUS_VALUES = {
        'planned': 1, 'picking': 2, 'packed': 3, 'shipped': 4, 'delivered': 5, 'failed': 6
    };
    MobileSalesShipping.enums.DELIVERY_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active', 4: 'status-active', 5: 'status-active', 6: 'status-terminated'
    };

    // ============================================================================
    // PICK STATUS
    // ============================================================================

    MobileSalesShipping.enums.PICK_STATUS = {
        0: 'Unspecified', 1: 'Open', 2: 'Released', 3: 'In Progress', 4: 'Completed', 5: 'Cancelled'
    };
    MobileSalesShipping.enums.PICK_STATUS_VALUES = {
        'open': 1, 'released': 2, 'in progress': 3, 'progress': 3, 'completed': 4, 'cancelled': 5
    };
    MobileSalesShipping.enums.PICK_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-pending', 4: 'status-active', 5: 'status-inactive'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileSalesShipping.render = {
        deliveryStatus: Layer8MRenderers.createStatusRenderer(
            MobileSalesShipping.enums.DELIVERY_STATUS,
            MobileSalesShipping.enums.DELIVERY_STATUS_CLASSES
        ),
        pickStatus: Layer8MRenderers.createStatusRenderer(
            MobileSalesShipping.enums.PICK_STATUS,
            MobileSalesShipping.enums.PICK_STATUS_CLASSES
        ),
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
