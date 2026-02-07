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
 * Mobile Fixed Assets Module - Column Configurations
 * Desktop Equivalent: fin/fixed-assets/fixed-assets-columns.js
 */
(function() {
    'use strict';

    const enums = MobileFixedAssets.enums;
    const render = MobileFixedAssets.render;

    MobileFixedAssets.columns = {
        Asset: [
            { key: 'assetId', label: 'ID', sortKey: 'assetId', filterKey: 'assetId' },
            { key: 'assetNumber', label: 'Asset #', sortKey: 'assetNumber', filterKey: 'assetNumber' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'categoryId', label: 'Category', sortKey: 'categoryId', filterKey: 'categoryId' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.ASSET_STATUS_VALUES, render: (item) => render.assetStatus(item.status) },
            { key: 'acquisitionCost', label: 'Acquisition Cost', sortKey: 'acquisitionCost', render: (item) => Layer8MRenderers.renderMoney(item.acquisitionCost) },
            { key: 'acquisitionDate', label: 'Acquisition Date', sortKey: 'acquisitionDate', render: (item) => Layer8MRenderers.renderDate(item.acquisitionDate) }
        ],

        AssetCategory: [
            { key: 'categoryId', label: 'ID', sortKey: 'categoryId', filterKey: 'categoryId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            { key: 'defaultDepreciationMethod', label: 'Depreciation Method', sortKey: 'defaultDepreciationMethod', render: (item) => render.depreciationMethod(item.defaultDepreciationMethod) },
            { key: 'defaultUsefulLifeMonths', label: 'Useful Life (Months)', sortKey: 'defaultUsefulLifeMonths' }
        ],

        DepreciationSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'assetId', label: 'Asset', sortKey: 'assetId', filterKey: 'assetId' },
            { key: 'depreciationDate', label: 'Depreciation Date', sortKey: 'depreciationDate', render: (item) => Layer8MRenderers.renderDate(item.depreciationDate) },
            { key: 'depreciationAmount', label: 'Depreciation', sortKey: 'depreciationAmount', render: (item) => Layer8MRenderers.renderMoney(item.depreciationAmount) },
            { key: 'accumulatedAmount', label: 'Accumulated', sortKey: 'accumulatedAmount', render: (item) => Layer8MRenderers.renderMoney(item.accumulatedAmount) },
            { key: 'remainingValue', label: 'Remaining Value', sortKey: 'remainingValue', render: (item) => Layer8MRenderers.renderMoney(item.remainingValue) }
        ],

        AssetDisposal: [
            { key: 'disposalId', label: 'ID', sortKey: 'disposalId', filterKey: 'disposalId' },
            { key: 'assetId', label: 'Asset', sortKey: 'assetId', filterKey: 'assetId' },
            { key: 'disposalDate', label: 'Disposal Date', sortKey: 'disposalDate', render: (item) => Layer8MRenderers.renderDate(item.disposalDate) },
            { key: 'disposalMethod', label: 'Method', sortKey: 'disposalMethod', render: (item) => render.disposalMethod(item.disposalMethod) },
            { key: 'disposalProceeds', label: 'Disposal Proceeds', sortKey: 'disposalProceeds', render: (item) => Layer8MRenderers.renderMoney(item.disposalProceeds) },
            { key: 'gainLoss', label: 'Gain/Loss', sortKey: 'gainLoss', render: (item) => Layer8MRenderers.renderMoney(item.gainLoss) }
        ],

        AssetTransfer: [
            { key: 'transferId', label: 'ID', sortKey: 'transferId', filterKey: 'transferId' },
            { key: 'assetId', label: 'Asset', sortKey: 'assetId', filterKey: 'assetId' },
            { key: 'fromDepartmentId', label: 'From Department', sortKey: 'fromDepartmentId', filterKey: 'fromDepartmentId' },
            { key: 'toDepartmentId', label: 'To Department', sortKey: 'toDepartmentId', filterKey: 'toDepartmentId' },
            { key: 'transferDate', label: 'Transfer Date', sortKey: 'transferDate', render: (item) => Layer8MRenderers.renderDate(item.transferDate) }
        ],

        AssetMaintenance: [
            { key: 'maintenanceId', label: 'ID', sortKey: 'maintenanceId', filterKey: 'maintenanceId' },
            { key: 'assetId', label: 'Asset', sortKey: 'assetId', filterKey: 'assetId' },
            { key: 'maintenanceType', label: 'Type', sortKey: 'maintenanceType', render: (item) => render.maintenanceType(item.maintenanceType) },
            { key: 'scheduledDate', label: 'Scheduled Date', sortKey: 'scheduledDate', render: (item) => Layer8MRenderers.renderDate(item.scheduledDate) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.maintenanceStatus(item.status) },
            { key: 'cost', label: 'Cost', sortKey: 'cost', render: (item) => Layer8MRenderers.renderMoney(item.cost) }
        ],

        AssetRevaluation: [
            { key: 'revaluationId', label: 'ID', sortKey: 'revaluationId', filterKey: 'revaluationId' },
            { key: 'assetId', label: 'Asset', sortKey: 'assetId', filterKey: 'assetId' },
            { key: 'revaluationDate', label: 'Revaluation Date', sortKey: 'revaluationDate', render: (item) => Layer8MRenderers.renderDate(item.revaluationDate) },
            { key: 'previousValue', label: 'Previous Value', sortKey: 'previousValue', render: (item) => Layer8MRenderers.renderMoney(item.previousValue) },
            { key: 'newValue', label: 'New Value', sortKey: 'newValue', render: (item) => Layer8MRenderers.renderMoney(item.newValue) },
            { key: 'adjustmentAmount', label: 'Adjustment', sortKey: 'adjustmentAmount', render: (item) => Layer8MRenderers.renderMoney(item.adjustmentAmount) }
        ]
    };

    MobileFixedAssets.primaryKeys = {
        Asset: 'assetId', AssetCategory: 'categoryId', DepreciationSchedule: 'scheduleId',
        AssetDisposal: 'disposalId', AssetTransfer: 'transferId',
        AssetMaintenance: 'maintenanceId', AssetRevaluation: 'revaluationId'
    };

})();
