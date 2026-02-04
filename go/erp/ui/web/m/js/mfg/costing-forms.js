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
 * Mobile Manufacturing Costing Module - Form Definitions
 * Desktop Equivalent: mfg/costing/costing-forms.js
 */
(function() {
    'use strict';

    window.MobileMfgCosting = window.MobileMfgCosting || {};
    const enums = MobileMfgCosting.enums;

    MobileMfgCosting.forms = {
        MfgStandardCost: {
            title: 'Standard Cost',
            sections: [{ title: 'Cost Details', fields: [
                { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
                { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
                { key: 'materialCost', label: 'Material Cost', type: 'currency' },
                { key: 'laborCost', label: 'Labor Cost', type: 'currency' },
                { key: 'machineCost', label: 'Machine Cost', type: 'currency' },
                { key: 'overheadCost', label: 'Overhead Cost', type: 'currency' },
                { key: 'subcontractingCost', label: 'Subcontracting Cost', type: 'currency' },
                { key: 'currencyCode', label: 'Currency', type: 'text' },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        },
        MfgCostRollup: {
            title: 'Cost Rollup',
            sections: [{ title: 'Rollup Details', fields: [
                { key: 'rollupNumber', label: 'Rollup Number', type: 'text', required: true },
                { key: 'name', label: 'Name', type: 'text', required: true },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'runDate', label: 'Run Date', type: 'date' },
                { key: 'status', label: 'Status', type: 'select', options: enums.ROLLUP_STATUS },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        },
        MfgActualCost: {
            title: 'Actual Cost',
            sections: [{ title: 'Cost Details', fields: [
                { key: 'workOrderId', label: 'Work Order', type: 'reference', lookupModel: 'MfgWorkOrder', required: true },
                { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem' },
                { key: 'costElementType', label: 'Cost Element', type: 'select', options: enums.COST_ELEMENT_TYPE },
                { key: 'actualAmount', label: 'Actual Amount', type: 'currency', required: true },
                { key: 'actualQuantity', label: 'Quantity', type: 'number' },
                { key: 'postingDate', label: 'Posting Date', type: 'date' },
                { key: 'sourceDocument', label: 'Source Document', type: 'text' },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        },
        MfgCostVariance: {
            title: 'Cost Variance',
            sections: [{ title: 'Variance Details', fields: [
                { key: 'workOrderId', label: 'Work Order', type: 'reference', lookupModel: 'MfgWorkOrder', required: true },
                { key: 'varianceType', label: 'Variance Type', type: 'select', options: enums.VARIANCE_TYPE },
                { key: 'standardAmount', label: 'Standard Amount', type: 'currency' },
                { key: 'actualAmount', label: 'Actual Amount', type: 'currency' },
                { key: 'varianceAmount', label: 'Variance Amount', type: 'currency' },
                { key: 'variancePercent', label: 'Variance %', type: 'number' },
                { key: 'calculationDate', label: 'Calculation Date', type: 'date' },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        },
        MfgOverhead: {
            title: 'Overhead',
            sections: [{ title: 'Overhead Details', fields: [
                { key: 'code', label: 'Code', type: 'text', required: true },
                { key: 'name', label: 'Name', type: 'text', required: true },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'allocationMethod', label: 'Allocation Method', type: 'select', options: enums.ALLOCATION_METHOD },
                { key: 'rate', label: 'Rate', type: 'number' },
                { key: 'accountId', label: 'GL Account', type: 'reference', lookupModel: 'FinAccount' },
                { key: 'isActive', label: 'Active', type: 'checkbox' },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        },
        MfgOverheadAlloc: {
            title: 'Overhead Allocation',
            sections: [{ title: 'Allocation Details', fields: [
                { key: 'overheadId', label: 'Overhead', type: 'reference', lookupModel: 'MfgOverhead', required: true },
                { key: 'workOrderId', label: 'Work Order', type: 'reference', lookupModel: 'MfgWorkOrder' },
                { key: 'workCenterId', label: 'Work Center', type: 'reference', lookupModel: 'MfgWorkCenter' },
                { key: 'allocationDate', label: 'Allocation Date', type: 'date', required: true },
                { key: 'allocationBase', label: 'Allocation Base', type: 'number' },
                { key: 'allocatedAmount', label: 'Allocated Amount', type: 'currency', required: true },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        }
    };

    MobileMfgCosting.primaryKeys = {
        MfgStandardCost: 'costId', MfgCostRollup: 'rollupId', MfgActualCost: 'actualCostId',
        MfgCostVariance: 'varianceId', MfgOverhead: 'overheadId', MfgOverheadAlloc: 'allocationId'
    };

})();
