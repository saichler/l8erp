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

    const col = window.Layer8ColumnFactory;
    window.MobileMfgCosting = window.MobileMfgCosting || {};
    const render = MobileMfgCosting.render;

    MobileMfgCosting.columns = {
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
            ...col.col('rollupNumber', 'Rollup #'),
            ...col.col('description', 'Description'),
            ...col.date('runDate', 'Run Date'),
            ...col.enum('status', 'Status', null, render.rollupStatus)
        ],
        MfgActualCost: [
            ...col.id('actualCostId'),
            ...col.col('workOrderId', 'Work Order'),
            ...col.col('costType', 'Cost Type'),
            ...col.enum('costElement', 'Cost Element', null, render.costElementType),
            ...col.money('amount', 'Amount'),
            ...col.date('transactionDate', 'Transaction Date')
        ],
        MfgCostVariance: [
            ...col.id('varianceId'),
            ...col.col('workOrderId', 'Work Order'),
            ...col.enum('varianceType', 'Type', null, render.varianceType),
            ...col.money('standardCost', 'Standard'),
            ...col.money('actualCost', 'Actual'),
            ...col.money('varianceAmount', 'Variance')
        ],
        MfgOverhead: [
            ...col.id('overheadId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.enum('allocationMethod', 'Method', null, render.allocationMethod),
            ...col.col('rate', 'Rate')
        ],
        MfgOverheadAlloc: [
            ...col.id('allocationId'),
            ...col.col('overheadId', 'Overhead'),
            ...col.col('workOrderId', 'Work Order'),
            ...col.col('workCenterId', 'Work Center'),
            ...col.date('allocationDate', 'Date'),
            ...col.money('allocatedAmount', 'Amount')
        ]
    };

})();
