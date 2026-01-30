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
 * Mobile Fixed Assets Module - Form Configurations
 * Desktop Equivalent: fin/fixed-assets/fixed-assets-forms.js
 */
(function() {
    'use strict';

    const enums = MobileFixedAssets.enums;

    MobileFixedAssets.forms = {
        Asset: {
            title: 'Asset',
            sections: [
                {
                    title: 'Asset Information',
                    fields: [
                        { key: 'assetNumber', label: 'Asset Number', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'categoryId', label: 'Category', type: 'reference', lookupModel: 'AssetCategory', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ASSET_STATUS },
                        { key: 'acquisitionCost', label: 'Acquisition Cost', type: 'currency', required: true },
                        { key: 'acquisitionDate', label: 'Acquisition Date', type: 'date', required: true },
                        { key: 'location', label: 'Location', type: 'text' },
                        { key: 'serialNumber', label: 'Serial Number', type: 'text' }
                    ]
                }
            ]
        },

        AssetCategory: {
            title: 'Asset Category',
            sections: [
                {
                    title: 'Category Information',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'depreciationMethod', label: 'Depreciation Method', type: 'select', options: enums.DEPRECIATION_METHOD, required: true },
                        { key: 'usefulLife', label: 'Useful Life (Years)', type: 'number', required: true },
                        { key: 'salvageValuePercent', label: 'Salvage Value %', type: 'number' }
                    ]
                }
            ]
        },

        DepreciationSchedule: {
            title: 'Depreciation Schedule',
            sections: [
                {
                    title: 'Schedule Details',
                    fields: [
                        { key: 'assetId', label: 'Asset', type: 'reference', lookupModel: 'Asset', required: true },
                        { key: 'periodDate', label: 'Period Date', type: 'date', required: true },
                        { key: 'depreciationAmount', label: 'Depreciation Amount', type: 'currency' },
                        { key: 'accumulatedDepreciation', label: 'Accumulated Depreciation', type: 'currency' },
                        { key: 'bookValue', label: 'Book Value', type: 'currency' }
                    ]
                }
            ]
        },

        AssetDisposal: {
            title: 'Asset Disposal',
            sections: [
                {
                    title: 'Disposal Details',
                    fields: [
                        { key: 'assetId', label: 'Asset', type: 'reference', lookupModel: 'Asset', required: true },
                        { key: 'disposalDate', label: 'Disposal Date', type: 'date', required: true },
                        { key: 'disposalMethod', label: 'Disposal Method', type: 'select', options: enums.DISPOSAL_METHOD, required: true },
                        { key: 'salePrice', label: 'Sale Price', type: 'currency' },
                        { key: 'bookValueAtDisposal', label: 'Book Value at Disposal', type: 'currency' },
                        { key: 'gainLoss', label: 'Gain/Loss', type: 'currency' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        AssetTransfer: {
            title: 'Asset Transfer',
            sections: [
                {
                    title: 'Transfer Details',
                    fields: [
                        { key: 'assetId', label: 'Asset', type: 'reference', lookupModel: 'Asset', required: true },
                        { key: 'fromDepartment', label: 'From Department', type: 'text', required: true },
                        { key: 'toDepartment', label: 'To Department', type: 'text', required: true },
                        { key: 'transferDate', label: 'Transfer Date', type: 'date', required: true },
                        { key: 'reason', label: 'Reason', type: 'textarea' }
                    ]
                }
            ]
        },

        AssetMaintenance: {
            title: 'Asset Maintenance',
            sections: [
                {
                    title: 'Maintenance Details',
                    fields: [
                        { key: 'assetId', label: 'Asset', type: 'reference', lookupModel: 'Asset', required: true },
                        { key: 'maintenanceType', label: 'Maintenance Type', type: 'select', options: enums.MAINTENANCE_TYPE, required: true },
                        { key: 'scheduledDate', label: 'Scheduled Date', type: 'date', required: true },
                        { key: 'completedDate', label: 'Completed Date', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.MAINTENANCE_STATUS },
                        { key: 'cost', label: 'Cost', type: 'currency' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        AssetRevaluation: {
            title: 'Asset Revaluation',
            sections: [
                {
                    title: 'Revaluation Details',
                    fields: [
                        { key: 'assetId', label: 'Asset', type: 'reference', lookupModel: 'Asset', required: true },
                        { key: 'revaluationDate', label: 'Revaluation Date', type: 'date', required: true },
                        { key: 'oldValue', label: 'Old Value', type: 'currency' },
                        { key: 'newValue', label: 'New Value', type: 'currency', required: true },
                        { key: 'adjustmentAmount', label: 'Adjustment Amount', type: 'currency' },
                        { key: 'reason', label: 'Reason', type: 'textarea' }
                    ]
                }
            ]
        }
    };

})();
