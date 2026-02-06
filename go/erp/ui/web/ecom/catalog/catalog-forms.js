/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// ECOM Catalog Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.EcomCatalog = window.EcomCatalog || {};

    const f = window.Layer8FormFactory;
    const enums = EcomCatalog.enums;

    EcomCatalog.forms = {
        EcomProduct: f.form('Product', [
            f.section('Product Details', [
                ...f.text('sku', 'SKU', true),
                ...f.text('name', 'Product Name', true),
                ...f.text('shortDescription', 'Short Description'),
                ...f.textarea('description', 'Description'),
                ...f.select('productType', 'Product Type', enums.PRODUCT_TYPE),
                ...f.select('status', 'Status', enums.PRODUCT_STATUS),
                ...f.reference('categoryId', 'Category', 'EcomCategory'),
                ...f.text('brand', 'Brand')
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
                ...f.number('sortOrder', 'Sort Order')
            ]),
            f.section('Settings', [
                ...f.checkbox('isRequired', 'Is Required'),
                ...f.checkbox('isFilterable', 'Is Filterable'),
                ...f.checkbox('isVisible', 'Is Visible'),
                ...f.checkbox('isSearchable', 'Is Searchable')
            ])
        ]),

        EcomImage: f.form('Image', [
            f.section('Image Details', [
                ...f.reference('productId', 'Product', 'EcomProduct', true),
                ...f.reference('variantId', 'Variant', 'EcomVariant'),
                ...f.text('fileName', 'File Name', true),
                ...f.text('url', 'URL', true),
                ...f.text('thumbnailUrl', 'Thumbnail URL'),
                ...f.select('imageType', 'Image Type', enums.IMAGE_TYPE),
                ...f.text('altText', 'Alt Text'),
                ...f.text('title', 'Title')
            ]),
            f.section('Dimensions', [
                ...f.number('width', 'Width'),
                ...f.number('height', 'Height'),
                ...f.number('fileSize', 'File Size'),
                ...f.text('mimeType', 'MIME Type')
            ]),
            f.section('Display', [
                ...f.number('sortOrder', 'Sort Order'),
                ...f.checkbox('isPrimary', 'Is Primary')
            ])
        ]),

        EcomVariant: f.form('Variant', [
            f.section('Variant Details', [
                ...f.reference('productId', 'Product', 'EcomProduct', true),
                ...f.text('sku', 'SKU', true),
                ...f.text('name', 'Variant Name', true),
                ...f.text('barcode', 'Barcode'),
                ...f.reference('imageId', 'Image', 'EcomImage')
            ]),
            f.section('Pricing', [
                ...f.money('price', 'Price'),
                ...f.money('compareAtPrice', 'Compare At Price'),
                ...f.money('costPrice', 'Cost Price')
            ]),
            f.section('Inventory', [
                ...f.number('stockQuantity', 'Stock Quantity'),
                ...f.number('weight', 'Weight'),
                ...f.text('weightUnit', 'Weight Unit')
            ]),
            f.section('Display', [
                ...f.number('sortOrder', 'Sort Order'),
                ...f.checkbox('isActive', 'Is Active')
            ])
        ])
    };

    EcomCatalog.primaryKeys = {
        EcomProduct: 'productId',
        EcomCategory: 'categoryId',
        EcomAttribute: 'attributeId',
        EcomImage: 'imageId',
        EcomVariant: 'variantId'
    };

})();
