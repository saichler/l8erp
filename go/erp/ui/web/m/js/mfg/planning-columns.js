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
 * Mobile Manufacturing Planning Module - Column Definitions
 * Desktop Equivalent: mfg/planning/planning-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    window.MobileMfgPlanning = window.MobileMfgPlanning || {};
    const render = MobileMfgPlanning.render;

    MobileMfgPlanning.columns = {
        MfgMrpRun: [
            ...col.id('runId'),
            ...col.col('runNumber', 'Run #'),
            ...col.col('description', 'Description'),
            ...col.date('runDate', 'Run Date'),
            ...col.enum('status', 'Status', null, render.mrpStatus)
        ],
        MfgCapacityPlan: [
            ...col.id('planId'),
            ...col.col('planNumber', 'Plan #'),
            ...col.col('description', 'Description'),
            ...col.date('planningStart', 'Planning Start'),
            ...col.date('planningEnd', 'Planning End')
        ],
        MfgProdSchedule: [
            ...col.id('scheduleId'),
            ...col.col('scheduleNumber', 'Schedule #'),
            ...col.date('scheduleStart', 'Start Date'),
            ...col.date('scheduleEnd', 'End Date'),
            ...col.enum('status', 'Status', null, render.scheduleStatus)
        ],
    };

})();
