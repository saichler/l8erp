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
// Manufacturing Planning Module - Enum Definitions

(function() {
    'use strict';

    window.MfgPlanning = window.MfgPlanning || {};
    MfgPlanning.enums = {};

    // MRP RUN STATUS
    MfgPlanning.enums.MRP_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Running',
        3: 'Completed',
        4: 'Failed',
        5: 'Cancelled'
    };

    MfgPlanning.enums.MRP_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-inactive'
    };

    // REQUIREMENT TYPE
    MfgPlanning.enums.REQUIREMENT_TYPE = {
        0: 'Unspecified',
        1: 'Planned Order',
        2: 'Purchase Requisition',
        3: 'Transfer Order',
        4: 'Reschedule In',
        5: 'Reschedule Out',
        6: 'Cancel'
    };

    // SCHEDULE STATUS
    MfgPlanning.enums.SCHEDULE_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Published',
        3: 'Locked',
        4: 'Archived'
    };

    MfgPlanning.enums.SCHEDULE_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive',
        4: 'layer8d-status-inactive'
    };

    // RENDERERS
    MfgPlanning.render = {};

    MfgPlanning.render.mrpStatus = Layer8DRenderers.createStatusRenderer(
        MfgPlanning.enums.MRP_STATUS,
        MfgPlanning.enums.MRP_STATUS_CLASSES
    );

    MfgPlanning.render.requirementType = function(type) {
        return MfgPlanning.enums.REQUIREMENT_TYPE[type] || 'Unknown';
    };

    MfgPlanning.render.scheduleStatus = Layer8DRenderers.createStatusRenderer(
        MfgPlanning.enums.SCHEDULE_STATUS,
        MfgPlanning.enums.SCHEDULE_STATUS_CLASSES
    );

    MfgPlanning.render.date = Layer8DRenderers.renderDate;

})();
