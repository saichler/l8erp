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
 * Mobile ECOM Catalog Module - Column Configurations
 * Desktop Equivalent: ecom/catalog/catalog-columns.js
 */
(function() {
    'use strict';

    const render = MobileEcomCatalog.render;

    MobileEcomCatalog.columns = {
        EcomProduct: [
            { key: 'productId', label: 'ID', sortKey: 'productId', filterKey: 'productId' },
            { key: 'sku', label: 'SKU', sortKey: 'sku', filterKey: 'sku' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'productType', label: 'Type', sortKey: 'productType', render: (item) => render.productType(item.productType) },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.productStatus(item.status) },
            { key: 'price', label: 'Price', sortKey: 'price', render: (item) => Layer8MRenderers.renderMoney(item.price) },
            { key: 'stockQuantity', label: 'Stock Qty', sortKey: 'stockQuantity' }
        ],

        EcomCategory: [
            { key: 'categoryId', label: 'ID', sortKey: 'categoryId', filterKey: 'categoryId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'slug', label: 'Slug', sortKey: 'slug', filterKey: 'slug' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' },
            { key: 'sortOrder', label: 'Sort Order', sortKey: 'sortOrder' }
        ],

        EcomAttribute: [
            { key: 'attributeId', label: 'ID', sortKey: 'attributeId', filterKey: 'attributeId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'attributeType', label: 'Type', sortKey: 'attributeType', render: (item) => render.attributeType(item.attributeType) },
            { key: 'isRequired', label: 'Required', sortKey: 'isRequired', render: (item) => item.isRequired ? 'Yes' : 'No' },
            { key: 'isFilterable', label: 'Filterable', sortKey: 'isFilterable', render: (item) => item.isFilterable ? 'Yes' : 'No' }
        ],

        EcomImage: [
            { key: 'imageId', label: 'ID', sortKey: 'imageId', filterKey: 'imageId' },
            { key: 'productId', label: 'Product', sortKey: 'productId', filterKey: 'productId' },
            { key: 'fileName', label: 'File Name', sortKey: 'fileName', filterKey: 'fileName' },
            { key: 'imageType', label: 'Type', sortKey: 'imageType', render: (item) => render.imageType(item.imageType) },
            { key: 'isPrimary', label: 'Primary', sortKey: 'isPrimary', render: (item) => item.isPrimary ? 'Yes' : 'No' },
            { key: 'sortOrder', label: 'Sort Order', sortKey: 'sortOrder' }
        ],

        EcomVariant: [
            { key: 'variantId', label: 'ID', sortKey: 'variantId', filterKey: 'variantId' },
            { key: 'productId', label: 'Product', sortKey: 'productId', filterKey: 'productId' },
            { key: 'sku', label: 'SKU', sortKey: 'sku', filterKey: 'sku' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'price', label: 'Price', sortKey: 'price', render: (item) => Layer8MRenderers.renderMoney(item.price) },
            { key: 'stockQuantity', label: 'Stock Qty', sortKey: 'stockQuantity' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ]
    };

    MobileEcomCatalog.primaryKeys = {
        EcomProduct: 'productId',
        EcomCategory: 'categoryId',
        EcomAttribute: 'attributeId',
        EcomImage: 'imageId',
        EcomVariant: 'variantId'
    };

})();
