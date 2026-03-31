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
// ECOM Catalog Module - Column Configurations

(function() {
    'use strict';

    window.EcomCatalog = window.EcomCatalog || {};

    const col = window.Layer8ColumnFactory;
    const render = EcomCatalog.render;

    EcomCatalog.columns = {
        EcomProduct: [
            ...col.id('productId'),
            ...col.col('sku', 'SKU'),
            ...col.col('name', 'Name'),
            ...col.enum('productType', 'Type', null, render.productType),
            ...col.enum('status', 'Status', null, render.productStatus),
            ...col.money('price', 'Price'),
            ...col.col('stockQuantity', 'Stock Qty'),
        ],

        EcomCategory: [
            ...col.id('categoryId'),
            ...col.col('name', 'Name'),
            ...col.col('slug', 'Slug'),
            ...col.boolean('isActive', 'Active'),
            ...col.col('sortOrder', 'Sort Order'),
        ],

        EcomAttribute: [
            ...col.id('attributeId'),
            ...col.col('name', 'Name'),
            ...col.col('code', 'Code'),
            ...col.enum('attributeType', 'Type', null, render.attributeType),
            ...col.boolean('isRequired', 'Required'),
            ...col.boolean('isFilterable', 'Filterable'),
        ]
    };

})();
