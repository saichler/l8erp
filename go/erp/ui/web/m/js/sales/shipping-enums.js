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
 * Mobile Sales Shipping Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: sales/shipping/shipping-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileSalesShipping = window.MobileSalesShipping || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const DELIVERY_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Planned', 'planned', 'status-pending'],
        ['Picking', 'picking', 'status-pending'],
        ['Packed', 'packed', 'status-active'],
        ['Shipped', 'shipped', 'status-active'],
        ['Delivered', 'delivered', 'status-active'],
        ['Failed', 'failed', 'status-terminated']
    ]);

    const PICK_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Open', 'open', 'status-pending'],
        ['Released', 'released', 'status-active'],
        ['In Progress', 'in progress', 'status-pending'],
        ['Completed', 'completed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileSalesShipping.enums = {
        DELIVERY_STATUS: DELIVERY_STATUS.enum,
        DELIVERY_STATUS_VALUES: DELIVERY_STATUS.values,
        DELIVERY_STATUS_CLASSES: DELIVERY_STATUS.classes,
        PICK_STATUS: PICK_STATUS.enum,
        PICK_STATUS_VALUES: PICK_STATUS.values,
        PICK_STATUS_CLASSES: PICK_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileSalesShipping.render = {
        deliveryStatus: createStatusRenderer(DELIVERY_STATUS.enum, DELIVERY_STATUS.classes),
        pickStatus: createStatusRenderer(PICK_STATUS.enum, PICK_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
