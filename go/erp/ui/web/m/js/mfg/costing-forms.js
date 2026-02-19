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
                ...f.money('overheadCost', 'Overhead Cost'),
                ...f.money('outsideProcessingCost', 'Outside Processing Cost'),
                ...f.money('totalCost', 'Total Cost'),
                ...f.reference('currencyId', 'Currency', 'Currency'),
                ...f.textarea('notes', 'Notes'),
                ...f.text('costVersion', 'Cost Version'),
                ...f.text('costMethod', 'Cost Method'),
                ...f.checkbox('isCurrent', 'Current'),
            ])
        ]),
        MfgCostRollup: f.form('Cost Rollup', [
            f.section('Rollup Details', [
                ...f.text('rollupNumber', 'Rollup Number', true),
                ...f.textarea('description', 'Description'),
                ...f.date('runDate', 'Run Date'),
                ...f.select('status', 'Status', enums.ROLLUP_STATUS),
                ...f.textarea('notes', 'Notes'),
                ...f.text('costVersion', 'Cost Version'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.text('runBy', 'Run By'),
                ...f.number('itemsProcessed', 'Items Processed'),
                ...f.number('bomsProcessed', 'Boms Processed'),
            ])
        ]),
        MfgOverhead: f.form('Overhead', [
            f.section('Overhead Details', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('allocationMethod', 'Allocation Method', enums.ALLOCATION_METHOD),
                ...f.number('rate', 'Rate'),
                ...f.text('costCenter', 'Cost Center'),
                ...f.checkbox('isActive', 'Active'),
                ...f.textarea('notes', 'Notes'),
                ...f.text('rateUnit', 'Rate Unit'),
                ...f.text('currencyId', 'Currency'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('expiryDate', 'Expiry Date'),
            ]),
            f.section('Allocations', [
                ...f.inlineTable('allocations', 'Overhead Allocations', [
                    { key: 'allocationId', label: 'ID', hidden: true },
                    { key: 'workOrderId', label: 'Work Order', type: 'text' },
                    { key: 'workCenterId', label: 'Work Center', type: 'text' },
                    { key: 'allocationBase', label: 'Base', type: 'number' },
                    { key: 'rate', label: 'Rate', type: 'number' },
                    { key: 'allocatedAmount', label: 'Amount', type: 'money' }
                ])
            ])
        ])
    };

    MobileMfgCosting.primaryKeys = {
        MfgStandardCost: 'costId', MfgCostRollup: 'rollupId', MfgOverhead: 'overheadId'
    };

})();
