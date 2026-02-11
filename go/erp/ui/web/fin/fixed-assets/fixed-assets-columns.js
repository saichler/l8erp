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
                key: 'defaultDepreciationMethod',
                label: 'Depreciation Method',
                sortKey: 'defaultDepreciationMethod',
                render: (item) => render.depreciationMethod(item.defaultDepreciationMethod)
            },
            { key: 'defaultUsefulLifeMonths', label: 'Useful Life (Months)', sortKey: 'defaultUsefulLifeMonths' }
        ]
    };

})();
