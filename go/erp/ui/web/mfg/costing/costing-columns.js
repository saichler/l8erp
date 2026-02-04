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
// Manufacturing Costing Module - Column Configurations

(function() {
    'use strict';

    window.MfgCosting = window.MfgCosting || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = MfgCosting.render;

    MfgCosting.columns = {
        MfgStandardCost: [
            { key: 'costId', label: 'ID', sortKey: 'costId', filterKey: 'costId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            {
                key: 'effectiveDate',
                label: 'Effective',
                sortKey: 'effectiveDate',
                render: (item) => renderDate(item.effectiveDate)
            },
            {
                key: 'materialCost',
                label: 'Material',
                sortKey: 'materialCost',
                render: (item) => renderMoney(item.materialCost)
            },
            {
                key: 'laborCost',
                label: 'Labor',
                sortKey: 'laborCost',
                render: (item) => renderMoney(item.laborCost)
            },
            {
                key: 'overheadCost',
                label: 'Overhead',
                sortKey: 'overheadCost',
                render: (item) => renderMoney(item.overheadCost)
            },
            {
                key: 'totalCost',
                label: 'Total',
                sortKey: 'totalCost',
                render: (item) => renderMoney(item.totalCost)
            }
        ],

        MfgCostRollup: [
            { key: 'rollupId', label: 'ID', sortKey: 'rollupId', filterKey: 'rollupId' },
            { key: 'rollupNumber', label: 'Rollup #', sortKey: 'rollupNumber', filterKey: 'rollupNumber' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            {
                key: 'runDate',
                label: 'Run Date',
                sortKey: 'runDate',
                render: (item) => renderDate(item.runDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.rollupStatus(item.status)
            }
        ],

        MfgActualCost: [
            { key: 'actualCostId', label: 'ID', sortKey: 'actualCostId', filterKey: 'actualCostId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId', filterKey: 'workOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            {
                key: 'costElementType',
                label: 'Type',
                sortKey: 'costElementType',
                render: (item) => render.costElementType(item.costElementType)
            },
            {
                key: 'actualAmount',
                label: 'Amount',
                sortKey: 'actualAmount',
                render: (item) => renderMoney(item.actualAmount)
            },
            {
                key: 'postingDate',
                label: 'Posting Date',
                sortKey: 'postingDate',
                render: (item) => renderDate(item.postingDate)
            }
        ],

        MfgCostVariance: [
            { key: 'varianceId', label: 'ID', sortKey: 'varianceId', filterKey: 'varianceId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId', filterKey: 'workOrderId' },
            {
                key: 'varianceType',
                label: 'Type',
                sortKey: 'varianceType',
                render: (item) => render.varianceType(item.varianceType)
            },
            {
                key: 'standardAmount',
                label: 'Standard',
                sortKey: 'standardAmount',
                render: (item) => renderMoney(item.standardAmount)
            },
            {
                key: 'actualAmount',
                label: 'Actual',
                sortKey: 'actualAmount',
                render: (item) => renderMoney(item.actualAmount)
            },
            {
                key: 'varianceAmount',
                label: 'Variance',
                sortKey: 'varianceAmount',
                render: (item) => renderMoney(item.varianceAmount)
            }
        ],

        MfgOverhead: [
            { key: 'overheadId', label: 'ID', sortKey: 'overheadId', filterKey: 'overheadId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'allocationMethod',
                label: 'Method',
                sortKey: 'allocationMethod',
                render: (item) => render.allocationMethod(item.allocationMethod)
            },
            { key: 'rate', label: 'Rate', sortKey: 'rate' }
        ],

        MfgOverheadAlloc: [
            { key: 'allocationId', label: 'ID', sortKey: 'allocationId', filterKey: 'allocationId' },
            { key: 'overheadId', label: 'Overhead', sortKey: 'overheadId', filterKey: 'overheadId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            {
                key: 'allocationDate',
                label: 'Date',
                sortKey: 'allocationDate',
                render: (item) => renderDate(item.allocationDate)
            },
            {
                key: 'allocatedAmount',
                label: 'Amount',
                sortKey: 'allocatedAmount',
                render: (item) => renderMoney(item.allocatedAmount)
            }
        ]
    };

})();
