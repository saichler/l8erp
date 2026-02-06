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
 * Mobile Logistics Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: scm/logistics/logistics-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileLogistics = window.MobileLogistics || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const CARRIER_TYPE = factory.withValues([
        ['Unspecified', null], ['Trucking', 'trucking'], ['Rail', 'rail'],
        ['Ocean', 'ocean'], ['Air', 'air'], ['Courier', 'courier'], ['Intermodal', 'intermodal']
    ]);

    const SHIPMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Planned', 'planned', 'status-pending'],
        ['Picked Up', 'picked', 'status-active'],
        ['In Transit', 'transit', 'status-active'],
        ['Delivered', 'delivered', 'status-active'],
        ['Returned', 'returned', 'status-terminated'],
        ['Cancelled', 'cancelled', 'status-inactive']
    ]);

    const TASK_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['In Progress', 'progress', 'status-active'],
        ['Completed', 'completed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileLogistics.enums = {
        CARRIER_TYPE: CARRIER_TYPE.enum,
        CARRIER_TYPE_VALUES: CARRIER_TYPE.values,
        SHIPMENT_STATUS: SHIPMENT_STATUS.enum,
        SHIPMENT_STATUS_VALUES: SHIPMENT_STATUS.values,
        SHIPMENT_STATUS_CLASSES: SHIPMENT_STATUS.classes,
        TASK_STATUS: TASK_STATUS.enum,
        TASK_STATUS_VALUES: TASK_STATUS.values,
        TASK_STATUS_CLASSES: TASK_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileLogistics.render = {
        carrierType: (v) => renderEnum(v, CARRIER_TYPE.enum),
        shipmentStatus: createStatusRenderer(SHIPMENT_STATUS.enum, SHIPMENT_STATUS.classes),
        taskStatus: createStatusRenderer(TASK_STATUS.enum, TASK_STATUS.classes),
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
