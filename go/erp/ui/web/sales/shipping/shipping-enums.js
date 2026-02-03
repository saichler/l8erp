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
// Sales Shipping Module - Enum Definitions
// All enum constants and value mappings for Sales Shipping models

(function() {
    'use strict';

    // Create SalesShipping namespace
    window.SalesShipping = window.SalesShipping || {};
    SalesShipping.enums = {};

    // ============================================================================
    // DELIVERY STATUS
    // ============================================================================

    SalesShipping.enums.DELIVERY_STATUS = {
        0: 'Unspecified',
        1: 'Planned',
        2: 'Picking',
        3: 'Packed',
        4: 'Shipped',
        5: 'Delivered',
        6: 'Failed'
    };

    SalesShipping.enums.DELIVERY_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active',
        6: 'layer8d-status-terminated'
    };

    // ============================================================================
    // PICK STATUS
    // ============================================================================

    SalesShipping.enums.PICK_STATUS = {
        0: 'Unspecified',
        1: 'Open',
        2: 'Released',
        3: 'In Progress',
        4: 'Completed',
        5: 'Cancelled'
    };

    SalesShipping.enums.PICK_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-active',
        5: 'layer8d-status-inactive'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    SalesShipping.render = {};

    SalesShipping.render.deliveryStatus = Layer8DRenderers.createStatusRenderer(
        SalesShipping.enums.DELIVERY_STATUS,
        SalesShipping.enums.DELIVERY_STATUS_CLASSES
    );

    SalesShipping.render.pickStatus = Layer8DRenderers.createStatusRenderer(
        SalesShipping.enums.PICK_STATUS,
        SalesShipping.enums.PICK_STATUS_CLASSES
    );

    SalesShipping.render.date = Layer8DRenderers.renderDate;
    SalesShipping.render.money = Layer8DRenderers.renderMoney;

})();
