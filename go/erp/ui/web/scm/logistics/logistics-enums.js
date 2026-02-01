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
// Logistics Module - Enum Definitions
// All enum constants and value mappings for Logistics models

(function() {
    'use strict';

    // Create Logistics namespace
    window.Logistics = window.Logistics || {};
    Logistics.enums = {};

    // ============================================================================
    // CARRIER TYPE
    // ============================================================================

    Logistics.enums.CARRIER_TYPE = {
        0: 'Unspecified',
        1: 'Trucking',
        2: 'Rail',
        3: 'Ocean',
        4: 'Air',
        5: 'Courier',
        6: 'Intermodal'
    };

    // ============================================================================
    // SHIPMENT STATUS
    // ============================================================================

    Logistics.enums.SHIPMENT_STATUS = {
        0: 'Unspecified',
        1: 'Planned',
        2: 'Picked Up',
        3: 'In Transit',
        4: 'Delivered',
        5: 'Returned',
        6: 'Cancelled'
    };

    Logistics.enums.SHIPMENT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-terminated',
        6: 'layer8d-status-inactive'
    };

    // ============================================================================
    // TASK STATUS
    // ============================================================================

    Logistics.enums.TASK_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'In Progress',
        3: 'Completed',
        4: 'Cancelled'
    };

    Logistics.enums.TASK_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    // Create render functions using shared utilities
    Logistics.render = {};

    Logistics.render.carrierType = (type) => Layer8DRenderers.renderEnum(type, Logistics.enums.CARRIER_TYPE);

    Logistics.render.shipmentStatus = Layer8DRenderers.createStatusRenderer(
        Logistics.enums.SHIPMENT_STATUS,
        Logistics.enums.SHIPMENT_STATUS_CLASSES
    );

    Logistics.render.taskStatus = Layer8DRenderers.createStatusRenderer(
        Logistics.enums.TASK_STATUS,
        Logistics.enums.TASK_STATUS_CLASSES
    );

    Logistics.render.boolean = Layer8DRenderers.renderBoolean;
    Logistics.render.date = Layer8DRenderers.renderDate;
    Logistics.render.money = Layer8DRenderers.renderMoney;

})();
