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
// ECOM Catalog Module - Form Definitions

(function() {
    'use strict';

    window.EcomCatalog = window.EcomCatalog || {};

    const enums = EcomCatalog.enums;

    EcomCatalog.forms = {
        EcomProduct: {
            title: 'Product',
            sections: [
                {
                    title: 'Product Details',
                    fields: [
                        { key: 'sku', label: 'SKU', type: 'text', required: true },
                        { key: 'name', label: 'Product Name', type: 'text', required: true },
                        { key: 'shortDescription', label: 'Short Description', type: 'text' },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'productType', label: 'Product Type', type: 'select', options: enums.PRODUCT_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.PRODUCT_STATUS },
                        { key: 'categoryId', label: 'Category', type: 'reference', lookupModel: 'EcomCategory' },
                        { key: 'brand', label: 'Brand', type: 'text' }
                    ]
                },
                {
                    title: 'Pricing',
                    fields: [
                        { key: 'price', label: 'Price', type: 'money', required: true },
                        { key: 'compareAtPrice', label: 'Compare At Price', type: 'money' },
                        { key: 'costPrice', label: 'Cost Price', type: 'money' },
                        { key: 'isTaxable', label: 'Is Taxable', type: 'checkbox' },
                        { key: 'taxClass', label: 'Tax Class', type: 'text' }
                    ]
                },
                {
                    title: 'Inventory',
                    fields: [
                        { key: 'stockQuantity', label: 'Stock Quantity', type: 'number' },
                        { key: 'lowStockThreshold', label: 'Low Stock Threshold', type: 'number' },
                        { key: 'trackInventory', label: 'Track Inventory', type: 'checkbox' },
                        { key: 'allowBackorder', label: 'Allow Backorder', type: 'checkbox' },
                        { key: 'itemId', label: 'SCM Item', type: 'reference', lookupModel: 'ScmItem' }
                    ]
                },
                {
                    title: 'Shipping',
                    fields: [
                        { key: 'weight', label: 'Weight', type: 'number' },
                        { key: 'weightUnit', label: 'Weight Unit', type: 'text' }
                    ]
                },
                {
                    title: 'SEO',
                    fields: [
                        { key: 'slug', label: 'URL Slug', type: 'text' },
                        { key: 'metaTitle', label: 'Meta Title', type: 'text' },
                        { key: 'metaDescription', label: 'Meta Description', type: 'textarea' }
                    ]
                }
            ]
        },

        EcomCategory: {
            title: 'Category',
            sections: [
                {
                    title: 'Category Details',
                    fields: [
                        { key: 'name', label: 'Category Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'parentCategoryId', label: 'Parent Category', type: 'reference', lookupModel: 'EcomCategory' },
                        { key: 'slug', label: 'URL Slug', type: 'text' },
                        { key: 'imageUrl', label: 'Image URL', type: 'text' },
                        { key: 'sortOrder', label: 'Sort Order', type: 'number' },
                        { key: 'isActive', label: 'Is Active', type: 'checkbox' },
                        { key: 'level', label: 'Level', type: 'number' },
                        { key: 'path', label: 'Path', type: 'text' }
                    ]
                },
                {
                    title: 'SEO',
                    fields: [
                        { key: 'metaTitle', label: 'Meta Title', type: 'text' },
                        { key: 'metaDescription', label: 'Meta Description', type: 'textarea' }
                    ]
                }
            ]
        },

        EcomAttribute: {
            title: 'Attribute',
            sections: [
                {
                    title: 'Attribute Details',
                    fields: [
                        { key: 'name', label: 'Attribute Name', type: 'text', required: true },
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'attributeType', label: 'Attribute Type', type: 'select', options: enums.ATTRIBUTE_TYPE, required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'defaultValue', label: 'Default Value', type: 'text' },
                        { key: 'sortOrder', label: 'Sort Order', type: 'number' }
                    ]
                },
                {
                    title: 'Settings',
                    fields: [
                        { key: 'isRequired', label: 'Is Required', type: 'checkbox' },
                        { key: 'isFilterable', label: 'Is Filterable', type: 'checkbox' },
                        { key: 'isVisible', label: 'Is Visible', type: 'checkbox' },
                        { key: 'isSearchable', label: 'Is Searchable', type: 'checkbox' }
                    ]
                }
            ]
        },

        EcomImage: {
            title: 'Image',
            sections: [
                {
                    title: 'Image Details',
                    fields: [
                        { key: 'productId', label: 'Product', type: 'reference', lookupModel: 'EcomProduct', required: true },
                        { key: 'variantId', label: 'Variant', type: 'reference', lookupModel: 'EcomVariant' },
                        { key: 'fileName', label: 'File Name', type: 'text', required: true },
                        { key: 'url', label: 'URL', type: 'text', required: true },
                        { key: 'thumbnailUrl', label: 'Thumbnail URL', type: 'text' },
                        { key: 'imageType', label: 'Image Type', type: 'select', options: enums.IMAGE_TYPE },
                        { key: 'altText', label: 'Alt Text', type: 'text' },
                        { key: 'title', label: 'Title', type: 'text' }
                    ]
                },
                {
                    title: 'Dimensions',
                    fields: [
                        { key: 'width', label: 'Width', type: 'number' },
                        { key: 'height', label: 'Height', type: 'number' },
                        { key: 'fileSize', label: 'File Size', type: 'number' },
                        { key: 'mimeType', label: 'MIME Type', type: 'text' }
                    ]
                },
                {
                    title: 'Display',
                    fields: [
                        { key: 'sortOrder', label: 'Sort Order', type: 'number' },
                        { key: 'isPrimary', label: 'Is Primary', type: 'checkbox' }
                    ]
                }
            ]
        },

        EcomVariant: {
            title: 'Variant',
            sections: [
                {
                    title: 'Variant Details',
                    fields: [
                        { key: 'productId', label: 'Product', type: 'reference', lookupModel: 'EcomProduct', required: true },
                        { key: 'sku', label: 'SKU', type: 'text', required: true },
                        { key: 'name', label: 'Variant Name', type: 'text', required: true },
                        { key: 'barcode', label: 'Barcode', type: 'text' },
                        { key: 'imageId', label: 'Image', type: 'reference', lookupModel: 'EcomImage' }
                    ]
                },
                {
                    title: 'Pricing',
                    fields: [
                        { key: 'price', label: 'Price', type: 'money' },
                        { key: 'compareAtPrice', label: 'Compare At Price', type: 'money' },
                        { key: 'costPrice', label: 'Cost Price', type: 'money' }
                    ]
                },
                {
                    title: 'Inventory',
                    fields: [
                        { key: 'stockQuantity', label: 'Stock Quantity', type: 'number' },
                        { key: 'weight', label: 'Weight', type: 'number' },
                        { key: 'weightUnit', label: 'Weight Unit', type: 'text' }
                    ]
                },
                {
                    title: 'Display',
                    fields: [
                        { key: 'sortOrder', label: 'Sort Order', type: 'number' },
                        { key: 'isActive', label: 'Is Active', type: 'checkbox' }
                    ]
                }
            ]
        }
    };

    EcomCatalog.primaryKeys = {
        EcomProduct: 'productId',
        EcomCategory: 'categoryId',
        EcomAttribute: 'attributeId',
        EcomImage: 'imageId',
        EcomVariant: 'variantId'
    };

})();
