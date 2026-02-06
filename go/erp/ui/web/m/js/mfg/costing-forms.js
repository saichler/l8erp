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
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Manufacturing Costing Module - Form Definitions
 * Desktop Equivalent: mfg/costing/costing-forms.js
 */
(function() {
    'use strict';

    window.MobileMfgCosting = window.MobileMfgCosting || {};
    const f = window.Layer8FormFactory;
    const enums = MobileMfgCosting.enums;

    MobileMfgCosting.forms = {
        MfgStandardCost: f.form('Standard Cost', [
            f.section('Cost Details', [
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.money('materialCost', 'Material Cost'),
                ...f.money('laborCost', 'Labor Cost'),
                ...f.money('machineCost', 'Machine Cost'),
                ...f.money('overheadCost', 'Overhead Cost'),
                ...f.money('subcontractingCost', 'Subcontracting Cost'),
                ...f.text('currencyCode', 'Currency'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),
        MfgCostRollup: f.form('Cost Rollup', [
            f.section('Rollup Details', [
                ...f.text('rollupNumber', 'Rollup Number', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.date('runDate', 'Run Date'),
                ...f.select('status', 'Status', enums.ROLLUP_STATUS),
                ...f.textarea('notes', 'Notes')
            ])
        ]),
        MfgActualCost: f.form('Actual Cost', [
            f.section('Cost Details', [
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder', true),
                ...f.reference('itemId', 'Item', 'ScmItem'),
                ...f.select('costElementType', 'Cost Element', enums.COST_ELEMENT_TYPE),
                ...f.money('actualAmount', 'Actual Amount', true),
                ...f.number('actualQuantity', 'Quantity'),
                ...f.date('postingDate', 'Posting Date'),
                ...f.text('sourceDocument', 'Source Document'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),
        MfgCostVariance: f.form('Cost Variance', [
            f.section('Variance Details', [
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder', true),
                ...f.select('varianceType', 'Variance Type', enums.VARIANCE_TYPE),
                ...f.money('standardAmount', 'Standard Amount'),
                ...f.money('actualAmount', 'Actual Amount'),
                ...f.money('varianceAmount', 'Variance Amount'),
                ...f.number('variancePercent', 'Variance %'),
                ...f.date('calculationDate', 'Calculation Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),
        MfgOverhead: f.form('Overhead', [
            f.section('Overhead Details', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('allocationMethod', 'Allocation Method', enums.ALLOCATION_METHOD),
                ...f.number('rate', 'Rate'),
                ...f.reference('accountId', 'GL Account', 'FinAccount'),
                ...f.checkbox('isActive', 'Active'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),
        MfgOverheadAlloc: f.form('Overhead Allocation', [
            f.section('Allocation Details', [
                ...f.reference('overheadId', 'Overhead', 'MfgOverhead', true),
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder'),
                ...f.reference('workCenterId', 'Work Center', 'MfgWorkCenter'),
                ...f.date('allocationDate', 'Allocation Date', true),
                ...f.number('allocationBase', 'Allocation Base'),
                ...f.money('allocatedAmount', 'Allocated Amount', true),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

    MobileMfgCosting.primaryKeys = {
        MfgStandardCost: 'costId', MfgCostRollup: 'rollupId', MfgActualCost: 'actualCostId',
        MfgCostVariance: 'varianceId', MfgOverhead: 'overheadId', MfgOverheadAlloc: 'allocationId'
    };

})();
