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

    const col = window.Layer8ColumnFactory;
    const render = FixedAssets.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    FixedAssets.columns = {
        Asset: [
            ...col.id('assetId'),
            ...col.col('assetNumber', 'Asset #'),
            ...col.col('name', 'Name'),
            ...col.col('categoryId', 'Category'),
            ...col.enum('status', 'Status', null, render.assetStatus),
            ...col.money('acquisitionCost', 'Acquisition Cost'),
            ...col.date('acquisitionDate', 'Acquisition Date'),
            ...col.enum('depreciationMethod', 'Depreciation', null, render.depreciationMethod),
            ...col.money('netBookValue', 'Net Book Value'),
        ],

        AssetCategory: [
            ...col.id('categoryId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.enum('defaultDepreciationMethod', 'Depreciation Method', null, render.depreciationMethod),
            ...col.col('defaultUsefulLifeMonths', 'Useful Life (Months)'),
        ]
    };

})();
