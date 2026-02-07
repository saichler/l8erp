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
 * Mobile Manufacturing Costing Module - Column Definitions
 * Desktop Equivalent: mfg/costing/costing-columns.js
 */
(function() {
    'use strict';

    window.MobileMfgCosting = window.MobileMfgCosting || {};
    const render = MobileMfgCosting.render;

    MobileMfgCosting.columns = {
        MfgStandardCost: [
            { key: 'costId', label: 'ID', sortKey: 'costId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            { key: 'effectiveDate', label: 'Effective', sortKey: 'effectiveDate', render: (item) => render.date(item.effectiveDate) },
            { key: 'materialCost', label: 'Material', sortKey: 'materialCost', render: (item) => render.money(item.materialCost) },
            { key: 'laborCost', label: 'Labor', sortKey: 'laborCost', render: (item) => render.money(item.laborCost) },
            { key: 'overheadCost', label: 'Overhead', sortKey: 'overheadCost', render: (item) => render.money(item.overheadCost) },
            { key: 'totalCost', label: 'Total', sortKey: 'totalCost', render: (item) => render.money(item.totalCost) }
        ],
        MfgCostRollup: [
            { key: 'rollupId', label: 'ID', sortKey: 'rollupId' },
            { key: 'rollupNumber', label: 'Rollup #', sortKey: 'rollupNumber' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'runDate', label: 'Run Date', sortKey: 'runDate', render: (item) => render.date(item.runDate) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.rollupStatus(item.status) }
        ],
        MfgActualCost: [
            { key: 'actualCostId', label: 'ID', sortKey: 'actualCostId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            { key: 'costType', label: 'Cost Type', sortKey: 'costType' },
            { key: 'costElement', label: 'Cost Element', sortKey: 'costElement', render: (item) => render.costElementType(item.costElement) },
            { key: 'amount', label: 'Amount', sortKey: 'amount', render: (item) => render.money(item.amount) },
            { key: 'transactionDate', label: 'Transaction Date', sortKey: 'transactionDate', render: (item) => render.date(item.transactionDate) }
        ],
        MfgCostVariance: [
            { key: 'varianceId', label: 'ID', sortKey: 'varianceId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            { key: 'varianceType', label: 'Type', sortKey: 'varianceType', render: (item) => render.varianceType(item.varianceType) },
            { key: 'standardCost', label: 'Standard', sortKey: 'standardCost', render: (item) => render.money(item.standardCost) },
            { key: 'actualCost', label: 'Actual', sortKey: 'actualCost', render: (item) => render.money(item.actualCost) },
            { key: 'varianceAmount', label: 'Variance', sortKey: 'varianceAmount', render: (item) => render.money(item.varianceAmount) }
        ],
        MfgOverhead: [
            { key: 'overheadId', label: 'ID', sortKey: 'overheadId' },
            { key: 'code', label: 'Code', sortKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            { key: 'allocationMethod', label: 'Method', sortKey: 'allocationMethod', render: (item) => render.allocationMethod(item.allocationMethod) },
            { key: 'rate', label: 'Rate', sortKey: 'rate' }
        ],
        MfgOverheadAlloc: [
            { key: 'allocationId', label: 'ID', sortKey: 'allocationId' },
            { key: 'overheadId', label: 'Overhead', sortKey: 'overheadId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            { key: 'allocationDate', label: 'Date', sortKey: 'allocationDate', render: (item) => render.date(item.allocationDate) },
            { key: 'allocatedAmount', label: 'Amount', sortKey: 'allocatedAmount', render: (item) => render.money(item.allocatedAmount) }
        ]
    };

})();
