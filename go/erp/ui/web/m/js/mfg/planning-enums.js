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
 * Mobile Manufacturing Planning Module - Enum Definitions
 * Desktop Equivalent: mfg/planning/planning-enums.js
 */
(function() {
    'use strict';

    window.MobileMfgPlanning = window.MobileMfgPlanning || {};
    MobileMfgPlanning.enums = {};

    // MRP RUN STATUS
    MobileMfgPlanning.enums.MRP_STATUS = {
        0: 'Unspecified', 1: 'Pending', 2: 'Running', 3: 'Completed', 4: 'Failed', 5: 'Cancelled'
    };
    MobileMfgPlanning.enums.MRP_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-terminated', 5: 'status-inactive'
    };

    // REQUIREMENT TYPE
    MobileMfgPlanning.enums.REQUIREMENT_TYPE = {
        0: 'Unspecified', 1: 'Planned Order', 2: 'Purchase Requisition', 3: 'Transfer Order',
        4: 'Reschedule In', 5: 'Reschedule Out', 6: 'Cancel'
    };

    // SCHEDULE STATUS
    MobileMfgPlanning.enums.SCHEDULE_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Published', 3: 'Locked', 4: 'Archived'
    };
    MobileMfgPlanning.enums.SCHEDULE_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-inactive', 4: 'status-inactive'
    };

    // RENDER FUNCTIONS
    MobileMfgPlanning.render = {
        mrpStatus: Layer8MRenderers.createStatusRenderer(
            MobileMfgPlanning.enums.MRP_STATUS,
            MobileMfgPlanning.enums.MRP_STATUS_CLASSES
        ),
        requirementType: function(type) { return MobileMfgPlanning.enums.REQUIREMENT_TYPE[type] || 'Unknown'; },
        scheduleStatus: Layer8MRenderers.createStatusRenderer(
            MobileMfgPlanning.enums.SCHEDULE_STATUS,
            MobileMfgPlanning.enums.SCHEDULE_STATUS_CLASSES
        ),
        date: Layer8MRenderers.renderDate
    };

})();
