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
 * Mobile Manufacturing Production Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: mfg/production/production-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileMfgProduction = window.MobileMfgProduction || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const WORK_ORDER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Planned', 'planned', 'status-pending'],
        ['Released', 'released', 'status-active'],
        ['In Progress', 'progress', 'status-active'],
        ['On Hold', 'hold', 'status-inactive'],
        ['Completed', 'completed', 'status-active'],
        ['Closed', 'closed', 'status-inactive'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    const OPERATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['In Progress', 'progress', 'status-active'],
        ['Completed', 'completed', 'status-active'],
        ['Skipped', 'skipped', 'status-inactive']
    ]);

    const BATCH_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Created', 'created', 'status-pending'],
        ['In Process', 'process', 'status-active'],
        ['Completed', 'completed', 'status-active'],
        ['Rejected', 'rejected', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileMfgProduction.enums = {
        WORK_ORDER_STATUS: WORK_ORDER_STATUS.enum,
        WORK_ORDER_STATUS_VALUES: WORK_ORDER_STATUS.values,
        WORK_ORDER_STATUS_CLASSES: WORK_ORDER_STATUS.classes,
        OPERATION_STATUS: OPERATION_STATUS.enum,
        OPERATION_STATUS_VALUES: OPERATION_STATUS.values,
        OPERATION_STATUS_CLASSES: OPERATION_STATUS.classes,
        BATCH_STATUS: BATCH_STATUS.enum,
        BATCH_STATUS_VALUES: BATCH_STATUS.values,
        BATCH_STATUS_CLASSES: BATCH_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileMfgProduction.render = {
        workOrderStatus: createStatusRenderer(WORK_ORDER_STATUS.enum, WORK_ORDER_STATUS.classes),
        operationStatus: createStatusRenderer(OPERATION_STATUS.enum, OPERATION_STATUS.classes),
        batchStatus: createStatusRenderer(BATCH_STATUS.enum, BATCH_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
