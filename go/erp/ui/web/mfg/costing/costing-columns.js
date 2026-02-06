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

    const col = window.Layer8ColumnFactory;
    const render = MfgCosting.render;

    MfgCosting.columns = {
        MfgStandardCost: [
            ...col.id('costId'),
            ...col.col('itemId', 'Item'),
            ...col.date('effectiveDate', 'Effective'),
            ...col.money('materialCost', 'Material'),
            ...col.money('laborCost', 'Labor'),
            ...col.money('overheadCost', 'Overhead'),
            ...col.money('totalCost', 'Total')
        ],

        MfgCostRollup: [
            ...col.id('rollupId'),
            ...col.basic([['rollupNumber', 'Rollup #'], 'name']),
            ...col.date('runDate', 'Run Date'),
            ...col.custom('status', 'Status', (item) => render.rollupStatus(item.status))
        ],

        MfgActualCost: [
            ...col.id('actualCostId'),
            ...col.basic([['workOrderId', 'Work Order'], ['itemId', 'Item']]),
            ...col.custom('costElementType', 'Type', (item) => render.costElementType(item.costElementType)),
            ...col.money('actualAmount', 'Amount'),
            ...col.date('postingDate', 'Posting Date')
        ],

        MfgCostVariance: [
            ...col.id('varianceId'),
            ...col.col('workOrderId', 'Work Order'),
            ...col.custom('varianceType', 'Type', (item) => render.varianceType(item.varianceType)),
            ...col.money('standardAmount', 'Standard'),
            ...col.money('actualAmount', 'Actual'),
            ...col.money('varianceAmount', 'Variance')
        ],

        MfgOverhead: [
            ...col.id('overheadId'),
            ...col.basic(['code', 'name']),
            ...col.custom('allocationMethod', 'Method', (item) => render.allocationMethod(item.allocationMethod)),
            ...col.col('rate', 'Rate')
        ],

        MfgOverheadAlloc: [
            ...col.id('allocationId'),
            ...col.basic([['overheadId', 'Overhead'], ['workOrderId', 'Work Order'], ['workCenterId', 'Work Center']]),
            ...col.date('allocationDate', 'Date'),
            ...col.money('allocatedAmount', 'Amount')
        ]
    };
})();
