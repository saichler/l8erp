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
// Logistics Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    window.Logistics = window.Logistics || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const CARRIER_TYPE = factory.simple([
        'Unspecified', 'Trucking', 'Rail', 'Ocean', 'Air', 'Courier', 'Intermodal'
    ]);

    const SHIPMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Planned', 'planned', 'layer8d-status-pending'],
        ['Picked Up', 'pickedup', 'layer8d-status-active'],
        ['In Transit', 'transit', 'layer8d-status-active'],
        ['Delivered', 'delivered', 'layer8d-status-active'],
        ['Returned', 'returned', 'layer8d-status-terminated'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    const TASK_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['In Progress', 'progress', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    window.Logistics.enums = {
        CARRIER_TYPE: CARRIER_TYPE.enum,
        SHIPMENT_STATUS: SHIPMENT_STATUS.enum,
        SHIPMENT_STATUS_CLASSES: SHIPMENT_STATUS.classes,
        TASK_STATUS: TASK_STATUS.enum,
        TASK_STATUS_CLASSES: TASK_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderShipmentStatus = createStatusRenderer(SHIPMENT_STATUS.enum, SHIPMENT_STATUS.classes);
    const renderTaskStatus = createStatusRenderer(TASK_STATUS.enum, TASK_STATUS.classes);

    window.Logistics.render = {
        carrierType: (v) => renderEnum(v, CARRIER_TYPE.enum),
        shipmentStatus: renderShipmentStatus,
        taskStatus: renderTaskStatus,
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
