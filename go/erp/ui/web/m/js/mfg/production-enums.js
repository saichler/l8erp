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
 * Mobile Manufacturing Production Module - Enum Definitions
 * Desktop Equivalent: mfg/production/production-enums.js
 */
(function() {
    'use strict';

    window.MobileMfgProduction = window.MobileMfgProduction || {};
    MobileMfgProduction.enums = {};

    // WORK ORDER STATUS
    MobileMfgProduction.enums.WORK_ORDER_STATUS = {
        0: 'Unspecified', 1: 'Planned', 2: 'Released', 3: 'In Progress', 4: 'On Hold', 5: 'Completed', 6: 'Closed', 7: 'Cancelled'
    };
    MobileMfgProduction.enums.WORK_ORDER_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-inactive', 5: 'status-active', 6: 'status-inactive', 7: 'status-terminated'
    };

    // OPERATION STATUS
    MobileMfgProduction.enums.OPERATION_STATUS = {
        0: 'Unspecified', 1: 'Pending', 2: 'In Progress', 3: 'Completed', 4: 'Skipped'
    };
    MobileMfgProduction.enums.OPERATION_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-inactive'
    };

    // BATCH STATUS
    MobileMfgProduction.enums.BATCH_STATUS = {
        0: 'Unspecified', 1: 'Created', 2: 'In Process', 3: 'Completed', 4: 'Rejected'
    };
    MobileMfgProduction.enums.BATCH_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-terminated'
    };

    // RENDER FUNCTIONS
    MobileMfgProduction.render = {
        workOrderStatus: Layer8MRenderers.createStatusRenderer(
            MobileMfgProduction.enums.WORK_ORDER_STATUS,
            MobileMfgProduction.enums.WORK_ORDER_STATUS_CLASSES
        ),
        operationStatus: Layer8MRenderers.createStatusRenderer(
            MobileMfgProduction.enums.OPERATION_STATUS,
            MobileMfgProduction.enums.OPERATION_STATUS_CLASSES
        ),
        batchStatus: Layer8MRenderers.createStatusRenderer(
            MobileMfgProduction.enums.BATCH_STATUS,
            MobileMfgProduction.enums.BATCH_STATUS_CLASSES
        ),
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
