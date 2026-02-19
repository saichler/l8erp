/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile ECOM Catalog Module - Form Configurations
 * Desktop Equivalent: ecom/catalog/catalog-forms.js
 */
(function() {
    'use strict';

    window.MobileEcomCatalog = window.MobileEcomCatalog || {};
    const f = window.Layer8FormFactory;
    const enums = MobileEcomCatalog.enums;

    MobileEcomCatalog.forms = {
        EcomProduct: f.form('Product', [
            f.section('Product Details', [
                ...f.text('sku', 'SKU', true),
                ...f.text('name', 'Product Name', true),
                ...f.text('shortDescription', 'Short Description'),
                ...f.textarea('description', 'Description'),
                ...f.select('productType', 'Product Type', enums.PRODUCT_TYPE),
                ...f.select('status', 'Status', enums.PRODUCT_STATUS),
                ...f.reference('categoryId', 'Category', 'EcomCategory'),
                ...f.text('brand', 'Brand'),
                ...f.text('tagIds', 'Tag Ids'),
            ]),
            f.section('Pricing', [
                ...f.money('price', 'Price', true),
                ...f.money('compareAtPrice', 'Compare At Price'),
                ...f.money('costPrice', 'Cost Price'),
                ...f.checkbox('isTaxable', 'Is Taxable'),
                ...f.text('taxClass', 'Tax Class')
            ]),
            f.section('Inventory', [
                ...f.number('stockQuantity', 'Stock Quantity'),
                ...f.number('lowStockThreshold', 'Low Stock Threshold'),
                ...f.checkbox('trackInventory', 'Track Inventory'),
                ...f.checkbox('allowBackorder', 'Allow Backorder'),
                ...f.reference('itemId', 'SCM Item', 'ScmItem')
            ]),
            f.section('Shipping', [
                ...f.number('weight', 'Weight'),
                ...f.text('weightUnit', 'Weight Unit')
            ]),
            f.section('SEO', [
                ...f.text('slug', 'URL Slug'),
                ...f.text('metaTitle', 'Meta Title'),
                ...f.textarea('metaDescription', 'Meta Description')
            ]),
            f.section('Images', [
                ...f.inlineTable('images', 'Product Images', [
                    { key: 'imageId', label: 'ID', hidden: true },
                    { key: 'fileName', label: 'File Name', type: 'text' },
                    { key: 'url', label: 'URL', type: 'text' },
                    { key: 'altText', label: 'Alt Text', type: 'text' },
                    { key: 'sortOrder', label: 'Sort Order', type: 'number' },
                    { key: 'isPrimary', label: 'Primary', type: 'checkbox' }
                ])
            ]),
            f.section('Variants', [
                ...f.inlineTable('variants', 'Product Variants', [
                    { key: 'variantId', label: 'ID', hidden: true },
                    { key: 'sku', label: 'SKU', type: 'text' },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'stockQuantity', label: 'Stock Qty', type: 'number' },
                    { key: 'weight', label: 'Weight', type: 'number' },
                    { key: 'barcode', label: 'Barcode', type: 'text' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ])
            ])
        ]),

        EcomCategory: f.form('Category', [
            f.section('Category Details', [
                ...f.text('name', 'Category Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('parentCategoryId', 'Parent Category', 'EcomCategory'),
                ...f.text('slug', 'URL Slug'),
                ...f.text('imageUrl', 'Image URL'),
                ...f.number('sortOrder', 'Sort Order'),
                ...f.checkbox('isActive', 'Is Active'),
                ...f.number('level', 'Level'),
                ...f.text('path', 'Path')
            ]),
            f.section('SEO', [
                ...f.text('metaTitle', 'Meta Title'),
                ...f.textarea('metaDescription', 'Meta Description')
            ])
        ]),

        EcomAttribute: f.form('Attribute', [
            f.section('Attribute Details', [
                ...f.text('name', 'Attribute Name', true),
                ...f.text('code', 'Code', true),
                ...f.select('attributeType', 'Attribute Type', enums.ATTRIBUTE_TYPE, true),
                ...f.textarea('description', 'Description'),
                ...f.text('defaultValue', 'Default Value'),
                ...f.number('sortOrder', 'Sort Order'),
                ...f.text('options', 'Options'),
            ]),
            f.section('Settings', [
                ...f.checkbox('isRequired', 'Is Required'),
                ...f.checkbox('isFilterable', 'Is Filterable'),
                ...f.checkbox('isVisible', 'Is Visible'),
                ...f.checkbox('isSearchable', 'Is Searchable')
            ])
        ]),

        // EcomImage, EcomVariant - now inline tables in EcomProduct
    };

})();
