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

    const { renderMoney } = Layer8DRenderers;
    const render = EcomCatalog.render;

    EcomCatalog.columns = {
        EcomProduct: [
            { key: 'productId', label: 'ID', sortKey: 'productId', filterKey: 'productId' },
            { key: 'sku', label: 'SKU', sortKey: 'sku', filterKey: 'sku' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'productType',
                label: 'Type',
                sortKey: 'productType',
                render: (item) => render.productType(item.productType)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.productStatus(item.status)
            },
            {
                key: 'price',
                label: 'Price',
                sortKey: 'price',
                render: (item) => renderMoney(item.price)
            },
            { key: 'stockQuantity', label: 'Stock Qty', sortKey: 'stockQuantity' }
        ],

        EcomCategory: [
            { key: 'categoryId', label: 'ID', sortKey: 'categoryId', filterKey: 'categoryId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'slug', label: 'Slug', sortKey: 'slug', filterKey: 'slug' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive' },
            { key: 'sortOrder', label: 'Sort Order', sortKey: 'sortOrder' }
        ],

        EcomAttribute: [
            { key: 'attributeId', label: 'ID', sortKey: 'attributeId', filterKey: 'attributeId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            {
                key: 'attributeType',
                label: 'Type',
                sortKey: 'attributeType',
                render: (item) => render.attributeType(item.attributeType)
            },
            { key: 'isRequired', label: 'Required', sortKey: 'isRequired' },
            { key: 'isFilterable', label: 'Filterable', sortKey: 'isFilterable' }
        ]
    };

})();
