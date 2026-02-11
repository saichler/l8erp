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
 * Mobile Manufacturing Shop Floor Module - Column Definitions
 * Desktop Equivalent: mfg/shopfloor/shopfloor-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    window.MobileMfgShopFloor = window.MobileMfgShopFloor || {};
    const render = MobileMfgShopFloor.render;

    MobileMfgShopFloor.columns = {
        MfgWorkCenter: [
            ...col.id('workCenterId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.enum('workCenterType', 'Type', null, render.workCenterType),
            ...col.col('hourlyRate', 'Hourly Rate'),
            ...col.col('efficiencyPercent', 'Efficiency %'),
            ...col.boolean('isActive', 'Active')
        ],
        MfgWorkCenterCap: [
            ...col.id('capacityId'),
            ...col.col('workCenterId', 'Work Center'),
            ...col.date('effectiveDate', 'Effective Date'),
            ...col.col('availableHours', 'Available Hrs'),
            ...col.col('capacityUnits', 'Capacity Units')
        ],
        MfgShiftSchedule: [
            ...col.id('scheduleId'),
            ...col.col('name', 'Name'),
            ...col.enum('shiftType', 'Type', null, render.shiftType),
            ...col.col('startTime', 'Start Time'),
            ...col.col('endTime', 'End Time'),
            ...col.boolean('isActive', 'Active')
        ],
        MfgDowntimeEvent: [
            ...col.id('eventId'),
            ...col.col('workCenterId', 'Work Center'),
            ...col.date('startTime', 'Start Time'),
            ...col.date('endTime', 'End Time'),
            ...col.col('durationMinutes', 'Duration (min)'),
            ...col.enum('reasonCode', 'Reason Code', null, render.downtimeReason)
        ]
    };

})();
