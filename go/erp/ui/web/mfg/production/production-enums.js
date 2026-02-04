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
// Manufacturing Production Module - Enum Definitions

(function() {
    'use strict';

    window.MfgProduction = window.MfgProduction || {};
    MfgProduction.enums = {};

    // WORK ORDER STATUS
    MfgProduction.enums.WORK_ORDER_STATUS = {
        0: 'Unspecified',
        1: 'Planned',
        2: 'Released',
        3: 'In Progress',
        4: 'On Hold',
        5: 'Completed',
        6: 'Closed',
        7: 'Cancelled'
    };

    MfgProduction.enums.WORK_ORDER_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive',
        5: 'layer8d-status-active',
        6: 'layer8d-status-inactive',
        7: 'layer8d-status-terminated'
    };

    // OPERATION STATUS
    MfgProduction.enums.OPERATION_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'In Progress',
        3: 'Completed',
        4: 'Skipped'
    };

    MfgProduction.enums.OPERATION_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive'
    };

    // BATCH STATUS
    MfgProduction.enums.BATCH_STATUS = {
        0: 'Unspecified',
        1: 'Created',
        2: 'In Process',
        3: 'Completed',
        4: 'Rejected'
    };

    MfgProduction.enums.BATCH_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // RENDERERS
    MfgProduction.render = {};

    MfgProduction.render.workOrderStatus = Layer8DRenderers.createStatusRenderer(
        MfgProduction.enums.WORK_ORDER_STATUS,
        MfgProduction.enums.WORK_ORDER_STATUS_CLASSES
    );

    MfgProduction.render.operationStatus = Layer8DRenderers.createStatusRenderer(
        MfgProduction.enums.OPERATION_STATUS,
        MfgProduction.enums.OPERATION_STATUS_CLASSES
    );

    MfgProduction.render.batchStatus = Layer8DRenderers.createStatusRenderer(
        MfgProduction.enums.BATCH_STATUS,
        MfgProduction.enums.BATCH_STATUS_CLASSES
    );

    MfgProduction.render.date = Layer8DRenderers.renderDate;
    MfgProduction.render.money = Layer8DRenderers.renderMoney;

})();
