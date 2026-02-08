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

    const col = window.Layer8ColumnFactory;
    const enums = MobileFixedAssets.enums;
    const render = MobileFixedAssets.render;

    MobileFixedAssets.columns = {
        Asset: [
            ...col.id('assetId'),
            ...col.col('assetNumber', 'Asset #'),
            ...col.col('name', 'Name'),
            ...col.col('categoryId', 'Category'),
            ...col.status('status', 'Status', enums.ASSET_STATUS_VALUES, render.assetStatus),
            ...col.money('acquisitionCost', 'Acquisition Cost'),
            ...col.date('acquisitionDate', 'Acquisition Date')
        ],

        AssetCategory: [
            ...col.id('categoryId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.enum('defaultDepreciationMethod', 'Depreciation Method', null, render.depreciationMethod),
            ...col.col('defaultUsefulLifeMonths', 'Useful Life (Months)')
        ],

        DepreciationSchedule: [
            ...col.id('scheduleId'),
            ...col.col('assetId', 'Asset'),
            ...col.date('depreciationDate', 'Depreciation Date'),
            ...col.money('depreciationAmount', 'Depreciation'),
            ...col.money('accumulatedAmount', 'Accumulated'),
            ...col.money('remainingValue', 'Remaining Value')
        ],

        AssetDisposal: [
            ...col.id('disposalId'),
            ...col.col('assetId', 'Asset'),
            ...col.date('disposalDate', 'Disposal Date'),
            ...col.enum('disposalMethod', 'Method', null, render.disposalMethod),
            ...col.money('disposalProceeds', 'Disposal Proceeds'),
            ...col.money('gainLoss', 'Gain/Loss')
        ],

        AssetTransfer: [
            ...col.id('transferId'),
            ...col.col('assetId', 'Asset'),
            ...col.col('fromDepartmentId', 'From Department'),
            ...col.col('toDepartmentId', 'To Department'),
            ...col.date('transferDate', 'Transfer Date')
        ],

        AssetMaintenance: [
            ...col.id('maintenanceId'),
            ...col.col('assetId', 'Asset'),
            ...col.enum('maintenanceType', 'Type', null, render.maintenanceType),
            ...col.date('scheduledDate', 'Scheduled Date'),
            ...col.enum('status', 'Status', null, render.maintenanceStatus),
            ...col.money('cost', 'Cost')
        ],

        AssetRevaluation: [
            ...col.id('revaluationId'),
            ...col.col('assetId', 'Asset'),
            ...col.date('revaluationDate', 'Revaluation Date'),
            ...col.money('previousValue', 'Previous Value'),
            ...col.money('newValue', 'New Value'),
            ...col.money('adjustmentAmount', 'Adjustment')
        ]
    };

    MobileFixedAssets.primaryKeys = {
        Asset: 'assetId', AssetCategory: 'categoryId', DepreciationSchedule: 'scheduleId',
        AssetDisposal: 'disposalId', AssetTransfer: 'transferId',
        AssetMaintenance: 'maintenanceId', AssetRevaluation: 'revaluationId'
    };

})();
