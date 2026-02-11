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
 * Mobile Manufacturing Quality Module - Column Definitions
 * Desktop Equivalent: mfg/quality/quality-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    window.MobileMfgQuality = window.MobileMfgQuality || {};
    const render = MobileMfgQuality.render;

    MobileMfgQuality.columns = {
        MfgQualityPlan: [
            ...col.id('planId'),
            ...col.col('planNumber', 'Plan #'),
            ...col.col('name', 'Name'),
            ...col.col('itemId', 'Item'),
            ...col.col('revision', 'Rev'),
            ...col.date('effectiveDate', 'Effective')
        ],
        MfgQualityInspection: [
            ...col.id('inspectionId'),
            ...col.col('inspectionNumber', 'Insp #'),
            ...col.col('workOrderId', 'Work Order'),
            ...col.col('planId', 'Plan'),
            ...col.date('inspectionDate', 'Date'),
            ...col.enum('overallResult', 'Result', null, render.inspectionResult)
        ],
        MfgNCR: [
            ...col.id('ncrId'),
            ...col.col('ncrNumber', 'NCR #'),
            ...col.col('itemId', 'Item'),
            ...col.col('workOrderId', 'Work Order'),
            ...col.enum('severity', 'Severity', null, render.ncrSeverity),
            ...col.date('reportedDate', 'Reported Date'),
            ...col.enum('status', 'Status', null, render.ncrStatus)
        ],
    };

})();
