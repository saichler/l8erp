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
 * Mobile Manufacturing Shop Floor Module - Enum Definitions
 * Desktop Equivalent: mfg/shopfloor/shopfloor-enums.js
 */
(function() {
    'use strict';

    window.MobileMfgShopFloor = window.MobileMfgShopFloor || {};
    MobileMfgShopFloor.enums = {};

    // WORK CENTER TYPE
    MobileMfgShopFloor.enums.WORK_CENTER_TYPE = {
        0: 'Unspecified', 1: 'Machine', 2: 'Labor', 3: 'Assembly', 4: 'Inspection', 5: 'Packaging'
    };

    // SHIFT TYPE
    MobileMfgShopFloor.enums.SHIFT_TYPE = {
        0: 'Unspecified', 1: 'Day', 2: 'Evening', 3: 'Night', 4: 'Rotating'
    };

    // DOWNTIME REASON
    MobileMfgShopFloor.enums.DOWNTIME_REASON = {
        0: 'Unspecified', 1: 'Planned Maintenance', 2: 'Breakdown', 3: 'Setup/Changeover', 4: 'Material Shortage', 5: 'Quality Issue', 6: 'No Orders', 7: 'Other'
    };
    MobileMfgShopFloor.enums.DOWNTIME_REASON_CLASSES = {
        1: 'status-pending', 2: 'status-terminated', 3: 'status-pending', 4: 'status-inactive', 5: 'status-terminated', 6: 'status-inactive', 7: 'status-inactive'
    };

    // RENDER FUNCTIONS
    MobileMfgShopFloor.render = {
        workCenterType: function(type) { return MobileMfgShopFloor.enums.WORK_CENTER_TYPE[type] || 'Unknown'; },
        shiftType: function(type) { return MobileMfgShopFloor.enums.SHIFT_TYPE[type] || 'Unknown'; },
        downtimeReason: Layer8MRenderers.createStatusRenderer(
            MobileMfgShopFloor.enums.DOWNTIME_REASON,
            MobileMfgShopFloor.enums.DOWNTIME_REASON_CLASSES
        ),
        date: Layer8MRenderers.renderDate,
        boolean: function(val) { return val ? '<span class="status-badge status-active">Yes</span>' : '<span class="status-badge status-inactive">No</span>'; }
    };

})();
