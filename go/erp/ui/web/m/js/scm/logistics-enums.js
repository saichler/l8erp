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
 * Mobile Logistics Module - Enum Definitions
 * Desktop Equivalent: scm/logistics/logistics-enums.js
 */
(function() {
    'use strict';

    window.MobileLogistics = window.MobileLogistics || {};
    MobileLogistics.enums = {};

    // ============================================================================
    // CARRIER TYPE
    // ============================================================================

    MobileLogistics.enums.CARRIER_TYPE = {
        0: 'Unspecified', 1: 'Trucking', 2: 'Rail', 3: 'Ocean',
        4: 'Air', 5: 'Courier', 6: 'Intermodal'
    };
    MobileLogistics.enums.CARRIER_TYPE_VALUES = {
        'trucking': 1, 'truck': 1, 'rail': 2, 'ocean': 3,
        'air': 4, 'courier': 5, 'intermodal': 6
    };

    // ============================================================================
    // SHIPMENT STATUS
    // ============================================================================

    MobileLogistics.enums.SHIPMENT_STATUS = {
        0: 'Unspecified', 1: 'Planned', 2: 'Picked Up', 3: 'In Transit',
        4: 'Delivered', 5: 'Returned', 6: 'Cancelled'
    };
    MobileLogistics.enums.SHIPMENT_STATUS_VALUES = {
        'planned': 1, 'picked': 2, 'transit': 3, 'in': 3,
        'delivered': 4, 'returned': 5, 'cancelled': 6
    };
    MobileLogistics.enums.SHIPMENT_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active',
        4: 'status-active', 5: 'status-terminated', 6: 'status-inactive'
    };

    // ============================================================================
    // TASK STATUS
    // ============================================================================

    MobileLogistics.enums.TASK_STATUS = {
        0: 'Unspecified', 1: 'Pending', 2: 'In Progress', 3: 'Completed', 4: 'Cancelled'
    };
    MobileLogistics.enums.TASK_STATUS_VALUES = {
        'pending': 1, 'progress': 2, 'in': 2, 'completed': 3, 'cancelled': 4
    };
    MobileLogistics.enums.TASK_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-terminated'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileLogistics.render = {
        carrierType: (v) => MobileRenderers.renderEnum(v, MobileLogistics.enums.CARRIER_TYPE),
        shipmentStatus: MobileRenderers.createStatusRenderer(
            MobileLogistics.enums.SHIPMENT_STATUS,
            MobileLogistics.enums.SHIPMENT_STATUS_CLASSES
        ),
        taskStatus: MobileRenderers.createStatusRenderer(
            MobileLogistics.enums.TASK_STATUS,
            MobileLogistics.enums.TASK_STATUS_CLASSES
        ),
        boolean: MobileRenderers.renderBoolean,
        date: MobileRenderers.renderDate,
        money: MobileRenderers.renderMoney
    };

})();
