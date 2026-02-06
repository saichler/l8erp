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
// Manufacturing Production Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8DRenderers;

    window.MfgProduction = window.MfgProduction || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const WORK_ORDER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Planned', 'planned', 'layer8d-status-pending'],
        ['Released', 'released', 'layer8d-status-active'],
        ['In Progress', 'progress', 'layer8d-status-active'],
        ['On Hold', 'hold', 'layer8d-status-inactive'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Closed', 'closed', 'layer8d-status-inactive'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    const OPERATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['In Progress', 'progress', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Skipped', 'skipped', 'layer8d-status-inactive']
    ]);

    const BATCH_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Created', 'created', 'layer8d-status-pending'],
        ['In Process', 'process', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MfgProduction.enums = {
        WORK_ORDER_STATUS: WORK_ORDER_STATUS.enum,
        WORK_ORDER_STATUS_CLASSES: WORK_ORDER_STATUS.classes,
        OPERATION_STATUS: OPERATION_STATUS.enum,
        OPERATION_STATUS_CLASSES: OPERATION_STATUS.classes,
        BATCH_STATUS: BATCH_STATUS.enum,
        BATCH_STATUS_CLASSES: BATCH_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    MfgProduction.render = {
        workOrderStatus: createStatusRenderer(WORK_ORDER_STATUS.enum, WORK_ORDER_STATUS.classes),
        operationStatus: createStatusRenderer(OPERATION_STATUS.enum, OPERATION_STATUS.classes),
        batchStatus: createStatusRenderer(BATCH_STATUS.enum, BATCH_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
