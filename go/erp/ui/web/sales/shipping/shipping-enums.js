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
// Sales Shipping Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8DRenderers;

    window.SalesShipping = window.SalesShipping || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const DELIVERY_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Planned', 'planned', 'layer8d-status-pending'],
        ['Picking', 'picking', 'layer8d-status-pending'],
        ['Packed', 'packed', 'layer8d-status-active'],
        ['Shipped', 'shipped', 'layer8d-status-active'],
        ['Delivered', 'delivered', 'layer8d-status-active'],
        ['Failed', 'failed', 'layer8d-status-terminated']
    ]);

    const PICK_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Open', 'open', 'layer8d-status-pending'],
        ['Released', 'released', 'layer8d-status-active'],
        ['In Progress', 'progress', 'layer8d-status-pending'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    SalesShipping.enums = {
        DELIVERY_STATUS: DELIVERY_STATUS.enum,
        DELIVERY_STATUS_CLASSES: DELIVERY_STATUS.classes,
        PICK_STATUS: PICK_STATUS.enum,
        PICK_STATUS_CLASSES: PICK_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    SalesShipping.render = {
        deliveryStatus: createStatusRenderer(DELIVERY_STATUS.enum, DELIVERY_STATUS.classes),
        pickStatus: createStatusRenderer(PICK_STATUS.enum, PICK_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
