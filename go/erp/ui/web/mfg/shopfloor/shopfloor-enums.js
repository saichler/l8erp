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
// Manufacturing Shop Floor Module - Enum Definitions

(function() {
    'use strict';

    window.MfgShopFloor = window.MfgShopFloor || {};
    MfgShopFloor.enums = {};

    // WORK CENTER TYPE
    MfgShopFloor.enums.WORK_CENTER_TYPE = {
        0: 'Unspecified',
        1: 'Machine',
        2: 'Labor',
        3: 'Assembly',
        4: 'Inspection',
        5: 'Packaging'
    };

    // SHIFT TYPE
    MfgShopFloor.enums.SHIFT_TYPE = {
        0: 'Unspecified',
        1: 'Day',
        2: 'Evening',
        3: 'Night',
        4: 'Rotating'
    };

    // DOWNTIME REASON
    MfgShopFloor.enums.DOWNTIME_REASON = {
        0: 'Unspecified',
        1: 'Planned Maintenance',
        2: 'Breakdown',
        3: 'Setup/Changeover',
        4: 'Material Shortage',
        5: 'Quality Issue',
        6: 'No Orders',
        7: 'Other'
    };

    MfgShopFloor.enums.DOWNTIME_REASON_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-terminated',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-inactive',
        5: 'layer8d-status-terminated',
        6: 'layer8d-status-inactive',
        7: 'layer8d-status-inactive'
    };

    // RENDERERS
    MfgShopFloor.render = {};

    MfgShopFloor.render.workCenterType = function(type) {
        return MfgShopFloor.enums.WORK_CENTER_TYPE[type] || 'Unknown';
    };

    MfgShopFloor.render.shiftType = function(type) {
        return MfgShopFloor.enums.SHIFT_TYPE[type] || 'Unknown';
    };

    MfgShopFloor.render.downtimeReason = Layer8DRenderers.createStatusRenderer(
        MfgShopFloor.enums.DOWNTIME_REASON,
        MfgShopFloor.enums.DOWNTIME_REASON_CLASSES
    );

    MfgShopFloor.render.date = Layer8DRenderers.renderDate;
    MfgShopFloor.render.money = Layer8DRenderers.renderMoney;
    MfgShopFloor.render.boolean = function(val) {
        return val ? '<span class="layer8d-status layer8d-status-active">Yes</span>' : '<span class="layer8d-status layer8d-status-inactive">No</span>';
    };

})();
