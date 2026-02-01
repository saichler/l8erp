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
// Fixed Assets Module - Column Configurations
// Table column definitions for all Fixed Assets models

(function() {
    'use strict';

    // Ensure FixedAssets namespace exists
    window.FixedAssets = window.FixedAssets || {};

    const { renderBoolean, renderDate, renderMoney } = Layer8DRenderers;
    const enums = FixedAssets.enums;
    const render = FixedAssets.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    FixedAssets.columns = {
        Asset: [
            { key: 'assetId', label: 'ID', sortKey: 'assetId', filterKey: 'assetId' },
            { key: 'assetNumber', label: 'Asset #', sortKey: 'assetNumber', filterKey: 'assetNumber' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'categoryId', label: 'Category', sortKey: 'categoryId', filterKey: 'categoryId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.assetStatus(item.status)
            },
            {
                key: 'acquisitionCost',
                label: 'Acquisition Cost',
                sortKey: 'acquisitionCost',
                render: (item) => renderMoney(item.acquisitionCost)
            },
            {
                key: 'acquisitionDate',
                label: 'Acquisition Date',
                sortKey: 'acquisitionDate',
                render: (item) => renderDate(item.acquisitionDate)
            }
        ],

        AssetCategory: [
            { key: 'categoryId', label: 'ID', sortKey: 'categoryId', filterKey: 'categoryId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            {
                key: 'depreciationMethod',
                label: 'Depreciation Method',
                sortKey: 'depreciationMethod',
                render: (item) => render.depreciationMethod(item.depreciationMethod)
            },
            { key: 'usefulLife', label: 'Useful Life', sortKey: 'usefulLife' }
        ],

        DepreciationSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'assetId', label: 'Asset', sortKey: 'assetId', filterKey: 'assetId' },
            {
                key: 'periodDate',
                label: 'Period Date',
                sortKey: 'periodDate',
                render: (item) => renderDate(item.periodDate)
            },
            {
                key: 'depreciationAmount',
                label: 'Depreciation',
                sortKey: 'depreciationAmount',
                render: (item) => renderMoney(item.depreciationAmount)
            },
            {
                key: 'accumulatedDepreciation',
                label: 'Accumulated',
                sortKey: 'accumulatedDepreciation',
                render: (item) => renderMoney(item.accumulatedDepreciation)
            },
            {
                key: 'bookValue',
                label: 'Book Value',
                sortKey: 'bookValue',
                render: (item) => renderMoney(item.bookValue)
            }
        ],

        AssetDisposal: [
            { key: 'disposalId', label: 'ID', sortKey: 'disposalId', filterKey: 'disposalId' },
            { key: 'assetId', label: 'Asset', sortKey: 'assetId', filterKey: 'assetId' },
            {
                key: 'disposalDate',
                label: 'Disposal Date',
                sortKey: 'disposalDate',
                render: (item) => renderDate(item.disposalDate)
            },
            {
                key: 'disposalMethod',
                label: 'Method',
                sortKey: 'disposalMethod',
                render: (item) => render.disposalMethod(item.disposalMethod)
            },
            {
                key: 'salePrice',
                label: 'Sale Price',
                sortKey: 'salePrice',
                render: (item) => renderMoney(item.salePrice)
            },
            {
                key: 'gainLoss',
                label: 'Gain/Loss',
                sortKey: 'gainLoss',
                render: (item) => renderMoney(item.gainLoss)
            }
        ],

        AssetTransfer: [
            { key: 'transferId', label: 'ID', sortKey: 'transferId', filterKey: 'transferId' },
            { key: 'assetId', label: 'Asset', sortKey: 'assetId', filterKey: 'assetId' },
            { key: 'fromDepartment', label: 'From Department', sortKey: 'fromDepartment', filterKey: 'fromDepartment' },
            { key: 'toDepartment', label: 'To Department', sortKey: 'toDepartment', filterKey: 'toDepartment' },
            {
                key: 'transferDate',
                label: 'Transfer Date',
                sortKey: 'transferDate',
                render: (item) => renderDate(item.transferDate)
            }
        ],

        AssetMaintenance: [
            { key: 'maintenanceId', label: 'ID', sortKey: 'maintenanceId', filterKey: 'maintenanceId' },
            { key: 'assetId', label: 'Asset', sortKey: 'assetId', filterKey: 'assetId' },
            {
                key: 'maintenanceType',
                label: 'Type',
                sortKey: 'maintenanceType',
                render: (item) => render.maintenanceType(item.maintenanceType)
            },
            {
                key: 'scheduledDate',
                label: 'Scheduled Date',
                sortKey: 'scheduledDate',
                render: (item) => renderDate(item.scheduledDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.maintenanceStatus(item.status)
            },
            {
                key: 'cost',
                label: 'Cost',
                sortKey: 'cost',
                render: (item) => renderMoney(item.cost)
            }
        ],

        AssetRevaluation: [
            { key: 'revaluationId', label: 'ID', sortKey: 'revaluationId', filterKey: 'revaluationId' },
            { key: 'assetId', label: 'Asset', sortKey: 'assetId', filterKey: 'assetId' },
            {
                key: 'revaluationDate',
                label: 'Revaluation Date',
                sortKey: 'revaluationDate',
                render: (item) => renderDate(item.revaluationDate)
            },
            {
                key: 'oldValue',
                label: 'Old Value',
                sortKey: 'oldValue',
                render: (item) => renderMoney(item.oldValue)
            },
            {
                key: 'newValue',
                label: 'New Value',
                sortKey: 'newValue',
                render: (item) => renderMoney(item.newValue)
            },
            {
                key: 'adjustmentAmount',
                label: 'Adjustment',
                sortKey: 'adjustmentAmount',
                render: (item) => renderMoney(item.adjustmentAmount)
            }
        ]
    };

})();
