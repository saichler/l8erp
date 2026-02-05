# E-Commerce Module - Implementation Plan

## Overview

Implement the E-Commerce (ECOM) module following the exact patterns established by HCM, FIN, SCM, Sales, Manufacturing, CRM, Projects, BI, and Documents. This covers 20 Prime Objects across 4 submodules: Catalog, Orders, Customers, and Promotions.

Reference documents:
- `plans/ERP_MODULES.md` (Section 11)
- `plans/PLAN-DOCUMENTS-IMPLEMENTATION.md` (pattern reference)
- Global rules in `~/.claude/rules/`
- `l8ui/GUIDE.md` (Layer8 UI component usage)

### Global Rules Compliance

| Rule | How This Plan Complies |
|------|----------------------|
| **File Size < 500 lines** | Service files ~80 lines, callbacks ~240 lines. UI split per submodule (columns, forms, enums). All files stay well under 500 lines. |
| **No Duplicate Code** | Reuses `erp-common.proto` shared types (AuditInfo, Money, Address). References Sales Customer, SCM Item. Uses all Layer8 shared UI components. |
| **Future-Proof Design** | E-Commerce integrates with Sales (orders), SCM (inventory), CRM (customers). Generic EcomOrder can sync to SalesOrder. |
| **Read Before Implementing** | Plan requires reading ALL existing module code (services, callbacks, protos, UI) before writing any ECOM code. |
| **Component Integration Analysis** | All ServiceArea assignments, endpoint construction, L8Query support, and initialization arguments are documented below. |
| **Demo Directory** | All UI work targets `go/erp/ui/web/`, never `go/demo/`. |
| **Single Responsibility** | One service per package (2 files each). UI split into columns/forms/enums per submodule. |
| **ServiceName <= 10 chars** | All 20 ServiceName constants are 10 characters or fewer. See Prime Objects Summary. |
| **ServiceArea same per Module** | All ECOM services use `ServiceArea = byte(100)`. |
| **ServiceCallback Auto-Generate ID** | All callbacks include `common.GenerateID()` in `Before()` for POST actions. See Section 3b. |
| **Vendor Dependencies** | Step 7 includes `go mod vendor` after proto generation. |
| **Mobile Parity** | Desktop and mobile UI are implemented together per mobile-parity.md. |
| **Mock Completeness** | All 20 services will have mock data generators per mock-completeness.md. |
| **Mock Endpoint Construction** | All endpoints use exact ServiceName constants per mock-endpoint-construction.md. |
| **JS Model Names** | All JS model names use `Ecom` prefix matching protobuf types per js-protobuf-model-names.md. |
| **JS Field Names** | All JS field names match protobuf JSON tags per js-protobuf-field-names.md. |

---

## Step 0: Prerequisites

### 0a. Verify `erp-common.proto` exists

Shared `erp-common.proto` contains: Money, AuditInfo, Address, AddressType, ContactInfo, ContactType, DateRange. Already created during FIN implementation.

### 0b. Verify cross-module references

E-Commerce references several other modules:

| Referenced Entity | Source Module | How ECOM Uses It |
|-------------------|--------------|----------------------|
| **SalesCustomer** | Sales | Links e-commerce customers to ERP customers |
| **ScmItem** | SCM | Product links to inventory items |
| **Employee** | HCM (Core HR) | Store managers, fulfillment staff |
| **ScmWarehouse** | SCM | Fulfillment locations |

E-Commerce is referenced BY:
| Referencing Module | How It Uses E-Commerce |
|-------------------|----------------------|
| **Sales** | Online orders become sales orders |
| **SCM** | Inventory reservations for online orders |
| **FIN** | Payment processing, revenue recognition |

### 0c. Future-Proof Note

E-Commerce is designed to integrate with external platforms:
- **Compliance** will track PCI-DSS compliance for payments
- **BI** will analyze e-commerce metrics (conversion, cart abandonment)
- Multiple storefront support (B2B, B2C, marketplace)

---

## Step 1: Create Proto Files (prefix: `ecom-`)

Create 5 proto files under `proto/`:

| File | Contents |
|------|----------|
| `ecom-common.proto` | ECOM-specific shared types and enums. Imports `erp-common.proto`. |
| `ecom-catalog.proto` | 5 Prime Objects: Product, Category, Attribute, Image, Variant |
| `ecom-orders.proto` | 5 Prime Objects: Order, OrderLine, OrderStatus, Return, ReturnLine |
| `ecom-customers.proto` | 5 Prime Objects: Customer, CustomerAddress, Wishlist, WishlistItem, Cart |
| `ecom-promotions.proto` | 5 Prime Objects: Promotion, Coupon, PriceRule, ShippingMethod, PaymentMethod |

### Key Rules

- Every Prime Object gets `// @PrimeObject` comment annotation
- **Every Prime Object MUST have a companion `<Name>List` message** (20 Prime Objects = 40 messages total)
- All use `package ecom` and `option go_package = "./types/ecom"`
- Import `ecom-common.proto` and `api.proto`
- Enums start with `_UNSPECIFIED = 0`
- Include `erp.AuditInfo audit_info` as the last field on every Prime Object
- Use `map<string, string> custom_fields` for extensibility
- License header on every file
- **All type names use `Ecom` prefix** (e.g., `EcomProduct`, not `Product`)

### 1a. `ecom-common.proto`

```protobuf
syntax = "proto3";
package ecom;
option go_package = "./types/ecom";

import "erp-common.proto";

// PRODUCT STATUS
enum EcomProductStatus {
    ECOM_PRODUCT_STATUS_UNSPECIFIED = 0;
    ECOM_PRODUCT_STATUS_DRAFT = 1;
    ECOM_PRODUCT_STATUS_ACTIVE = 2;
    ECOM_PRODUCT_STATUS_INACTIVE = 3;
    ECOM_PRODUCT_STATUS_DISCONTINUED = 4;
    ECOM_PRODUCT_STATUS_OUT_OF_STOCK = 5;
}

// ORDER STATUS
enum EcomOrderStatus {
    ECOM_ORDER_STATUS_UNSPECIFIED = 0;
    ECOM_ORDER_STATUS_PENDING = 1;
    ECOM_ORDER_STATUS_CONFIRMED = 2;
    ECOM_ORDER_STATUS_PROCESSING = 3;
    ECOM_ORDER_STATUS_SHIPPED = 4;
    ECOM_ORDER_STATUS_DELIVERED = 5;
    ECOM_ORDER_STATUS_CANCELLED = 6;
    ECOM_ORDER_STATUS_REFUNDED = 7;
}

// PAYMENT STATUS
enum EcomPaymentStatus {
    ECOM_PAYMENT_STATUS_UNSPECIFIED = 0;
    ECOM_PAYMENT_STATUS_PENDING = 1;
    ECOM_PAYMENT_STATUS_AUTHORIZED = 2;
    ECOM_PAYMENT_STATUS_CAPTURED = 3;
    ECOM_PAYMENT_STATUS_FAILED = 4;
    ECOM_PAYMENT_STATUS_REFUNDED = 5;
}

// PROMOTION TYPE
enum EcomPromotionType {
    ECOM_PROMOTION_TYPE_UNSPECIFIED = 0;
    ECOM_PROMOTION_TYPE_PERCENTAGE = 1;
    ECOM_PROMOTION_TYPE_FIXED_AMOUNT = 2;
    ECOM_PROMOTION_TYPE_BUY_X_GET_Y = 3;
    ECOM_PROMOTION_TYPE_FREE_SHIPPING = 4;
    ECOM_PROMOTION_TYPE_BUNDLE = 5;
}

// RETURN STATUS
enum EcomReturnStatus {
    ECOM_RETURN_STATUS_UNSPECIFIED = 0;
    ECOM_RETURN_STATUS_REQUESTED = 1;
    ECOM_RETURN_STATUS_APPROVED = 2;
    ECOM_RETURN_STATUS_RECEIVED = 3;
    ECOM_RETURN_STATUS_INSPECTED = 4;
    ECOM_RETURN_STATUS_REFUNDED = 5;
    ECOM_RETURN_STATUS_REJECTED = 6;
}

// CUSTOMER TYPE
enum EcomCustomerType {
    ECOM_CUSTOMER_TYPE_UNSPECIFIED = 0;
    ECOM_CUSTOMER_TYPE_GUEST = 1;
    ECOM_CUSTOMER_TYPE_REGISTERED = 2;
    ECOM_CUSTOMER_TYPE_VIP = 3;
    ECOM_CUSTOMER_TYPE_WHOLESALE = 4;
}
```

---

## Step 2: Generate Go Types via `make-bindings.sh`

Add to `proto/make-bindings.sh` after DOC docker runs:

```bash
# E-Commerce
docker run --user "$(id -u):$(id -g)" -e PROTO=ecom-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=ecom-catalog.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=ecom-orders.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=ecom-customers.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=ecom-promotions.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
```

Generated files land in `go/types/ecom/`.

Run: `cd proto/ && bash make-bindings.sh`

---

## Step 3: Create Go Services (20 services)

Create directory `go/erp/ecom/` with 20 service packages. Each package has exactly 2 files.

**All ECOM services use `ServiceArea = byte(100)`.**

### Service Directory Listing (20 packages)

**Catalog** (`ServiceArea = byte(100)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `products/` | `EcomProd` | EcomProduct | ProductId |
| `categories/` | `EcomCat` | EcomCategory | CategoryId |
| `attributes/` | `EcomAttr` | EcomAttribute | AttributeId |
| `images/` | `EcomImage` | EcomImage | ImageId |
| `variants/` | `EcomVar` | EcomVariant | VariantId |

**Orders** (`ServiceArea = byte(100)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `orders/` | `EcomOrder` | EcomOrder | OrderId |
| `orderlines/` | `EcomOrdLn` | EcomOrderLine | LineId |
| `orderstatuses/` | `EcomOrdSts` | EcomOrderStatusHistory | StatusId |
| `returns/` | `EcomReturn` | EcomReturn | ReturnId |
| `returnlines/` | `EcomRetLn` | EcomReturnLine | LineId |

**Customers** (`ServiceArea = byte(100)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `customers/` | `EcomCust` | EcomCustomer | CustomerId |
| `customeraddresses/` | `EcomAddr` | EcomCustomerAddress | AddressId |
| `wishlists/` | `EcomWish` | EcomWishlist | WishlistId |
| `wishlistitems/` | `EcomWishIt` | EcomWishlistItem | ItemId |
| `carts/` | `EcomCart` | EcomCart | CartId |

**Promotions** (`ServiceArea = byte(100)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `promotions/` | `EcomPromo` | EcomPromotion | PromotionId |
| `coupons/` | `EcomCoupon` | EcomCoupon | CouponId |
| `pricerules/` | `EcomPrcRl` | EcomPriceRule | RuleId |
| `shippingmethods/` | `EcomShip` | EcomShippingMethod | MethodId |
| `paymentmethods/` | `EcomPay` | EcomPaymentMethod | MethodId |

---

## Step 3b: ServiceCallback Pattern

Every `*ServiceCallback.go` MUST include auto-generate ID in the `Before()` method:

```go
func (cb *EcomProductServiceCallback) Before(any interface{}, action ifs.Action) error {
    entity, ok := any.(*ecom.EcomProduct)
    if !ok {
        return fmt.Errorf("expected *ecom.EcomProduct but got %T", any)
    }
    if action == ifs.POST {
        common.GenerateID(&entity.ProductId)
    }
    return validate(entity)
}
```

The primary key field name comes from the corresponding `*Service.go` file's `SetPrimaryKeys()` call.

---

## Step 4: Integrate ECOM into Centralized `erp_main.go`

**Important:** There is NO separate `ecom_main.go` file. All modules are activated from the centralized `go/erp/main/erp_main.go`.

### 4a. Add ECOM Imports

Add ECOM service imports to `erp_main.go` after the existing DOC imports (all 20 packages).

### 4b. Add Function Call in main()

```go
    activateHCMServices(nic)
    activateFinServices(nic)
    activateSCMServices(nic)
    activateSalesServices(nic)
    activateMfgServices(nic)
    activateCrmServices(nic)
    activatePrjServices(nic)
    activateBiServices(nic)
    activateDocServices(nic)
    activateEcomServices(nic)  // Add this line
```

### 4c. Create `activateEcomServices()` Function

Add function after `activateDocServices()` with all 20 service activations.

---

## Step 5: Register ECOM Types in UI

Add to `go/erp/ui/main.go`:

1. Add import: `"github.com/saichler/l8erp/go/types/ecom"`
2. Add call: `registerEcomTypes(resources)`
3. Create `registerEcomTypes()` function with all 20 types (see pattern from DOC).

---

## Step 6: Create Desktop UI

### 6a. Directory Structure

Create `go/erp/ui/web/ecom/` with this structure:

```
ecom/
├── ecom-config.js           # Module config with all services
├── ecom-init.js             # Module initialization
├── ecom.css                 # Module-specific styles
├── catalog/
│   ├── catalog-enums.js
│   ├── catalog-columns.js
│   ├── catalog-forms.js
│   └── catalog.js
├── orders/
│   ├── orders-enums.js
│   ├── orders-columns.js
│   ├── orders-forms.js
│   └── orders.js
├── customers/
│   ├── customers-enums.js
│   ├── customers-columns.js
│   ├── customers-forms.js
│   └── customers.js
└── promotions/
    ├── promotions-enums.js
    ├── promotions-columns.js
    ├── promotions-forms.js
    └── promotions.js
```

### 6b. Module Config File: `ecom/ecom-config.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.Ecom = window.Ecom || {};

    Ecom.modules = {
        'catalog': {
            label: 'Catalog',
            services: [
                { key: 'products', label: 'Products', endpoint: '/100/EcomProd', model: 'EcomProduct' },
                { key: 'categories', label: 'Categories', endpoint: '/100/EcomCat', model: 'EcomCategory' },
                { key: 'attributes', label: 'Attributes', endpoint: '/100/EcomAttr', model: 'EcomAttribute' },
                { key: 'images', label: 'Images', endpoint: '/100/EcomImage', model: 'EcomImage' },
                { key: 'variants', label: 'Variants', endpoint: '/100/EcomVar', model: 'EcomVariant' }
            ]
        },
        'orders': {
            label: 'Orders',
            services: [
                { key: 'orders', label: 'Orders', endpoint: '/100/EcomOrder', model: 'EcomOrder' },
                { key: 'order-lines', label: 'Order Lines', endpoint: '/100/EcomOrdLn', model: 'EcomOrderLine' },
                { key: 'order-statuses', label: 'Status History', endpoint: '/100/EcomOrdSts', model: 'EcomOrderStatusHistory' },
                { key: 'returns', label: 'Returns', endpoint: '/100/EcomReturn', model: 'EcomReturn' },
                { key: 'return-lines', label: 'Return Lines', endpoint: '/100/EcomRetLn', model: 'EcomReturnLine' }
            ]
        },
        'customers': {
            label: 'Customers',
            services: [
                { key: 'customers', label: 'Customers', endpoint: '/100/EcomCust', model: 'EcomCustomer' },
                { key: 'addresses', label: 'Addresses', endpoint: '/100/EcomAddr', model: 'EcomCustomerAddress' },
                { key: 'wishlists', label: 'Wishlists', endpoint: '/100/EcomWish', model: 'EcomWishlist' },
                { key: 'wishlist-items', label: 'Wishlist Items', endpoint: '/100/EcomWishIt', model: 'EcomWishlistItem' },
                { key: 'carts', label: 'Shopping Carts', endpoint: '/100/EcomCart', model: 'EcomCart' }
            ]
        },
        'promotions': {
            label: 'Promotions',
            services: [
                { key: 'promotions', label: 'Promotions', endpoint: '/100/EcomPromo', model: 'EcomPromotion' },
                { key: 'coupons', label: 'Coupons', endpoint: '/100/EcomCoupon', model: 'EcomCoupon' },
                { key: 'price-rules', label: 'Price Rules', endpoint: '/100/EcomPrcRl', model: 'EcomPriceRule' },
                { key: 'shipping-methods', label: 'Shipping Methods', endpoint: '/100/EcomShip', model: 'EcomShippingMethod' },
                { key: 'payment-methods', label: 'Payment Methods', endpoint: '/100/EcomPay', model: 'EcomPaymentMethod' }
            ]
        }
    };

    Ecom.submodules = ['EcomCatalog', 'EcomOrders', 'EcomCustomers', 'EcomPromotions'];
})();
```

### 6c. Catalog Submodule Example Files

#### `catalog/catalog-enums.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.EcomCatalog = window.EcomCatalog || {};
    EcomCatalog.enums = {};

    // PRODUCT STATUS
    EcomCatalog.enums.PRODUCT_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Active',
        3: 'Inactive',
        4: 'Discontinued',
        5: 'Out of Stock'
    };

    EcomCatalog.enums.PRODUCT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-pending'
    };

    // PRODUCT TYPE
    EcomCatalog.enums.PRODUCT_TYPE = {
        0: 'Unspecified',
        1: 'Physical',
        2: 'Digital',
        3: 'Service',
        4: 'Subscription',
        5: 'Bundle'
    };

    // ATTRIBUTE TYPE
    EcomCatalog.enums.ATTRIBUTE_TYPE = {
        0: 'Unspecified',
        1: 'Text',
        2: 'Number',
        3: 'Select',
        4: 'Multi-Select',
        5: 'Boolean',
        6: 'Date',
        7: 'Color',
        8: 'Size'
    };

    // IMAGE TYPE
    EcomCatalog.enums.IMAGE_TYPE = {
        0: 'Unspecified',
        1: 'Main',
        2: 'Thumbnail',
        3: 'Gallery',
        4: 'Zoom',
        5: 'Variant'
    };

    // RENDERERS
    EcomCatalog.render = {};

    EcomCatalog.render.productStatus = Layer8DRenderers.createStatusRenderer(
        EcomCatalog.enums.PRODUCT_STATUS,
        EcomCatalog.enums.PRODUCT_STATUS_CLASSES
    );

    EcomCatalog.render.date = Layer8DRenderers.renderDate;
    EcomCatalog.render.money = Layer8DRenderers.renderMoney;
})();
```

#### `catalog/catalog-columns.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.EcomCatalog = window.EcomCatalog || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = EcomCatalog.render;
    const enums = EcomCatalog.enums;

    EcomCatalog.columns = {
        EcomProduct: [
            { key: 'productId', label: 'ID', sortKey: 'productId', filterKey: 'productId' },
            { key: 'sku', label: 'SKU', sortKey: 'sku', filterKey: 'sku' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'productType',
                label: 'Type',
                sortKey: 'productType',
                render: (item) => enums.PRODUCT_TYPE[item.productType] || 'Unknown'
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
            { key: 'categoryId', label: 'Category', sortKey: 'categoryId' },
            {
                key: 'stockQuantity',
                label: 'Stock',
                sortKey: 'stockQuantity'
            }
        ],

        EcomCategory: [
            { key: 'categoryId', label: 'ID', sortKey: 'categoryId', filterKey: 'categoryId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'parentCategoryId', label: 'Parent', sortKey: 'parentCategoryId' },
            { key: 'slug', label: 'URL Slug', sortKey: 'slug' },
            { key: 'sortOrder', label: 'Sort Order', sortKey: 'sortOrder' },
            { key: 'isActive', label: 'Active', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        EcomAttribute: [
            { key: 'attributeId', label: 'ID', sortKey: 'attributeId', filterKey: 'attributeId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'code', label: 'Code', sortKey: 'code' },
            {
                key: 'attributeType',
                label: 'Type',
                sortKey: 'attributeType',
                render: (item) => enums.ATTRIBUTE_TYPE[item.attributeType] || 'Unknown'
            },
            { key: 'isRequired', label: 'Required', render: (item) => item.isRequired ? 'Yes' : 'No' },
            { key: 'isFilterable', label: 'Filterable', render: (item) => item.isFilterable ? 'Yes' : 'No' }
        ],

        EcomImage: [
            { key: 'imageId', label: 'ID', sortKey: 'imageId', filterKey: 'imageId' },
            { key: 'productId', label: 'Product', sortKey: 'productId' },
            { key: 'fileName', label: 'File Name', sortKey: 'fileName' },
            {
                key: 'imageType',
                label: 'Type',
                sortKey: 'imageType',
                render: (item) => enums.IMAGE_TYPE[item.imageType] || 'Unknown'
            },
            { key: 'altText', label: 'Alt Text', sortKey: 'altText' },
            { key: 'sortOrder', label: 'Sort Order', sortKey: 'sortOrder' }
        ],

        EcomVariant: [
            { key: 'variantId', label: 'ID', sortKey: 'variantId', filterKey: 'variantId' },
            { key: 'productId', label: 'Product', sortKey: 'productId' },
            { key: 'sku', label: 'SKU', sortKey: 'sku', filterKey: 'sku' },
            { key: 'name', label: 'Name', sortKey: 'name' },
            {
                key: 'price',
                label: 'Price',
                sortKey: 'price',
                render: (item) => renderMoney(item.price)
            },
            { key: 'stockQuantity', label: 'Stock', sortKey: 'stockQuantity' },
            { key: 'isActive', label: 'Active', render: (item) => item.isActive ? 'Yes' : 'No' }
        ]
    };
})();
```

#### `catalog/catalog-forms.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.EcomCatalog = window.EcomCatalog || {};

    const enums = EcomCatalog.enums;

    EcomCatalog.forms = {
        EcomProduct: {
            title: 'Product',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'sku', label: 'SKU', type: 'text', required: true },
                        { key: 'name', label: 'Product Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'productType', label: 'Type', type: 'select', options: enums.PRODUCT_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.PRODUCT_STATUS },
                        { key: 'categoryId', label: 'Category', type: 'reference', lookupModel: 'EcomCategory' }
                    ]
                },
                {
                    title: 'Pricing',
                    fields: [
                        { key: 'price', label: 'Price', type: 'money', required: true },
                        { key: 'compareAtPrice', label: 'Compare At Price', type: 'money' },
                        { key: 'costPrice', label: 'Cost Price', type: 'money' }
                    ]
                },
                {
                    title: 'Inventory',
                    fields: [
                        { key: 'stockQuantity', label: 'Stock Quantity', type: 'number' },
                        { key: 'lowStockThreshold', label: 'Low Stock Alert', type: 'number' },
                        { key: 'trackInventory', label: 'Track Inventory', type: 'checkbox' },
                        { key: 'allowBackorder', label: 'Allow Backorder', type: 'checkbox' }
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
                        { key: 'sortOrder', label: 'Sort Order', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
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
                        { key: 'attributeType', label: 'Type', type: 'select', options: enums.ATTRIBUTE_TYPE },
                        { key: 'isRequired', label: 'Required', type: 'checkbox' },
                        { key: 'isFilterable', label: 'Filterable', type: 'checkbox' },
                        { key: 'isVisible', label: 'Visible on Storefront', type: 'checkbox' }
                    ]
                }
            ]
        },

        EcomImage: {
            title: 'Product Image',
            sections: [
                {
                    title: 'Image Details',
                    fields: [
                        { key: 'productId', label: 'Product', type: 'reference', lookupModel: 'EcomProduct', required: true },
                        { key: 'fileName', label: 'File Name', type: 'text' },
                        { key: 'url', label: 'Image URL', type: 'text' },
                        { key: 'imageType', label: 'Type', type: 'select', options: enums.IMAGE_TYPE },
                        { key: 'altText', label: 'Alt Text', type: 'text' },
                        { key: 'sortOrder', label: 'Sort Order', type: 'number' }
                    ]
                }
            ]
        },

        EcomVariant: {
            title: 'Product Variant',
            sections: [
                {
                    title: 'Variant Details',
                    fields: [
                        { key: 'productId', label: 'Product', type: 'reference', lookupModel: 'EcomProduct', required: true },
                        { key: 'sku', label: 'SKU', type: 'text', required: true },
                        { key: 'name', label: 'Variant Name', type: 'text' },
                        { key: 'price', label: 'Price', type: 'money' },
                        { key: 'stockQuantity', label: 'Stock', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
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
```

#### `catalog/catalog.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    // EcomCatalog namespace initialized by enum, column, and form files
    // This file can contain any additional catalog-specific logic
    console.log('EcomCatalog module loaded successfully');
})();
```

### 6d. Module Init File: `ecom/ecom-init.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    Layer8DModuleFactory.create({
        namespace: 'Ecom',
        defaultModule: 'catalog',
        defaultService: 'products',
        sectionSelector: 'catalog',
        initializerName: 'initializeEcom',
        requiredNamespaces: ['EcomCatalog', 'EcomOrders', 'EcomCustomers', 'EcomPromotions']
    });
})();
```

### 6e. Section HTML: `sections/ecommerce.html`

Create section HTML following the CRM/DOC pattern with:
- Header with parallax effect and e-commerce-themed SVG icons (shopping cart, products, orders)
- Module tabs: Catalog, Orders, Customers, Promotions
- Each module has subnav with all its services
- Table containers with IDs: `{module}-{service}-table-container`

### 6f. Wiring in `app.html`

Add after DOC scripts:

```html
<!-- ECOM CSS -->
<link rel="stylesheet" href="ecom/ecom.css">

<!-- ECOM Reference Registry -->
<script src="js/reference-registry-ecom.js"></script>

<!-- ECOM Config -->
<script src="ecom/ecom-config.js"></script>

<!-- ECOM Submodules -->
<script src="ecom/catalog/catalog-enums.js"></script>
<script src="ecom/catalog/catalog-columns.js"></script>
<script src="ecom/catalog/catalog-forms.js"></script>
<script src="ecom/catalog/catalog.js"></script>

<script src="ecom/orders/orders-enums.js"></script>
<script src="ecom/orders/orders-columns.js"></script>
<script src="ecom/orders/orders-forms.js"></script>
<script src="ecom/orders/orders.js"></script>

<script src="ecom/customers/customers-enums.js"></script>
<script src="ecom/customers/customers-columns.js"></script>
<script src="ecom/customers/customers-forms.js"></script>
<script src="ecom/customers/customers.js"></script>

<script src="ecom/promotions/promotions-enums.js"></script>
<script src="ecom/promotions/promotions-columns.js"></script>
<script src="ecom/promotions/promotions-forms.js"></script>
<script src="ecom/promotions/promotions.js"></script>

<!-- ECOM Init (LAST) -->
<script src="ecom/ecom-init.js"></script>
```

### 6g. Wiring in `sections.js`

Add section mapping:

```javascript
const sections = {
    // ... existing sections
    ecommerce: 'sections/ecommerce.html'
};

const sectionInitializers = {
    // ... existing initializers
    ecommerce: () => { if (typeof initializeEcom === 'function') initializeEcom(); }
};
```

---

## Step 7: Create Mobile UI (Mobile Parity)

### 7a. Directory Structure

Create `go/erp/ui/web/m/js/ecom/` with files for each submodule:

```
m/js/ecom/
├── catalog-enums.js
├── catalog-columns.js
├── catalog-forms.js
├── orders-enums.js
├── orders-columns.js
├── orders-forms.js
├── customers-enums.js
├── customers-columns.js
├── customers-forms.js
├── promotions-enums.js
├── promotions-columns.js
├── promotions-forms.js
└── ecom-index.js
```

### 7b. Mobile Registry: `m/js/ecom/ecom-index.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    const modules = [
        MobileEcomCatalog,
        MobileEcomOrders,
        MobileEcomCustomers,
        MobileEcomPromotions
    ];

    function findModule(modelName) {
        for (const mod of modules) {
            if (mod.columns && mod.columns[modelName]) {
                return mod;
            }
        }
        return null;
    }

    window.MobileEcom = {
        getFormDef(modelName) {
            const mod = findModule(modelName);
            return mod && mod.forms && mod.forms[modelName] || null;
        },
        getColumns(modelName) {
            const mod = findModule(modelName);
            return mod && mod.columns && mod.columns[modelName] || null;
        },
        getEnums(modelName) {
            const mod = findModule(modelName);
            return mod && mod.enums || null;
        },
        getPrimaryKey(modelName) {
            const mod = findModule(modelName);
            return mod && mod.primaryKeys && mod.primaryKeys[modelName] || null;
        },
        hasModel(modelName) {
            return findModule(modelName) !== null;
        },
        modules: {
            Catalog: MobileEcomCatalog,
            Orders: MobileEcomOrders,
            Customers: MobileEcomCustomers,
            Promotions: MobileEcomPromotions
        }
    };
})();
```

### 7c. Mobile Nav Config Update

In `l8ui/m/js/layer8m-nav-config.js`:

1. Add ecommerce entry in modules list:
```javascript
{ key: 'ecommerce', label: 'E-Commerce', icon: 'ecommerce', hasSubModules: true }
```

2. Add full config block with all services.

### 7d. Mobile app.html Update

Add script tags and sidebar link.

---

## Step 8: Reference Registry Updates

### CRITICAL: Verify Field Names First

Before writing registry entries, grep the .pb.go files:

```bash
grep -A 30 "type EcomProduct struct" go/types/ecom/*.pb.go | grep 'json:"'
```

### Desktop Reference Registry

Create `js/reference-registry-ecom.js`:

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    Layer8DReferenceRegistry.register({
        // Catalog
        EcomProduct: {
            idColumn: 'productId',
            displayColumn: 'name',
            selectColumns: ['productId', 'sku', 'name', 'status'],
            displayFormat: function(item) { return item.sku + ' - ' + item.name; },
            displayLabel: 'Product'
        },
        EcomCategory: {
            idColumn: 'categoryId',
            displayColumn: 'name',
            selectColumns: ['categoryId', 'name', 'slug'],
            displayLabel: 'Category'
        },
        EcomAttribute: {
            idColumn: 'attributeId',
            displayColumn: 'name',
            selectColumns: ['attributeId', 'name', 'code'],
            displayLabel: 'Attribute'
        },
        EcomVariant: {
            idColumn: 'variantId',
            displayColumn: 'sku',
            selectColumns: ['variantId', 'productId', 'sku', 'name'],
            displayFormat: function(item) { return item.sku + (item.name ? ' - ' + item.name : ''); },
            displayLabel: 'Variant'
        },

        // Orders
        EcomOrder: {
            idColumn: 'orderId',
            displayColumn: 'orderNumber',
            selectColumns: ['orderId', 'orderNumber', 'status', 'totalAmount'],
            displayFormat: function(item) { return '#' + item.orderNumber; },
            displayLabel: 'Order'
        },
        EcomReturn: {
            idColumn: 'returnId',
            displayColumn: 'returnNumber',
            selectColumns: ['returnId', 'returnNumber', 'status'],
            displayFormat: function(item) { return 'RMA-' + item.returnNumber; },
            displayLabel: 'Return'
        },

        // Customers
        EcomCustomer: {
            idColumn: 'customerId',
            displayColumn: 'email',
            selectColumns: ['customerId', 'email', 'firstName', 'lastName'],
            displayFormat: function(item) { return (item.firstName || '') + ' ' + (item.lastName || '') + ' <' + item.email + '>'; },
            displayLabel: 'Customer'
        },
        EcomWishlist: {
            idColumn: 'wishlistId',
            displayColumn: 'name',
            selectColumns: ['wishlistId', 'customerId', 'name'],
            displayLabel: 'Wishlist'
        },

        // Promotions
        EcomPromotion: {
            idColumn: 'promotionId',
            displayColumn: 'name',
            selectColumns: ['promotionId', 'name', 'promotionType', 'isActive'],
            displayLabel: 'Promotion'
        },
        EcomCoupon: {
            idColumn: 'couponId',
            displayColumn: 'code',
            selectColumns: ['couponId', 'code', 'discountType', 'discountValue'],
            displayLabel: 'Coupon'
        },
        EcomShippingMethod: {
            idColumn: 'methodId',
            displayColumn: 'name',
            selectColumns: ['methodId', 'name', 'carrier'],
            displayLabel: 'Shipping Method'
        },
        EcomPaymentMethod: {
            idColumn: 'methodId',
            displayColumn: 'name',
            selectColumns: ['methodId', 'name', 'provider'],
            displayLabel: 'Payment Method'
        }
    });
})();
```

### Mobile Reference Registry

Add same entries to `layer8m-reference-registry.js`.

---

## Step 9: Mock Data Generation

### Phase Ordering (20 services, 5 phases)

| Phase | Models | Dependencies |
|-------|--------|-------------|
| 1 | EcomCategory, EcomAttribute, EcomShippingMethod, EcomPaymentMethod | None (configuration) |
| 2 | EcomProduct, EcomPromotion, EcomCoupon, EcomPriceRule, EcomCustomer | Phase 1 |
| 3 | EcomVariant, EcomImage, EcomCustomerAddress, EcomWishlist, EcomCart | Phase 2 |
| 4 | EcomOrder, EcomWishlistItem | Phase 2-3 |
| 5 | EcomOrderLine, EcomOrderStatusHistory, EcomReturn, EcomReturnLine | Phase 4 |

### Files to Create

| File | Contents |
|------|----------|
| `gen_ecom_foundation.go` | Phase 1 (categories, attributes, shipping, payment) |
| `gen_ecom_catalog.go` | Phases 2-3 (products, variants, images) |
| `gen_ecom_customers.go` | Phases 2-4 (customers, addresses, wishlists, carts) |
| `gen_ecom_orders.go` | Phases 4-5 (orders, lines, returns) |
| `gen_ecom_promotions.go` | Phases 2 (promotions, coupons, price rules) |
| `ecom_phases.go` | Phase orchestration (all phases) |

### Mock Data Store Additions

Add to `store.go`:

```go
// ECOM - Phase 1 (Configuration)
EcomCategoryIDs          []string
EcomAttributeIDs         []string
EcomShippingMethodIDs    []string
EcomPaymentMethodIDs     []string

// ECOM - Phase 2 (Core)
EcomProductIDs           []string
EcomPromotionIDs         []string
EcomCouponIDs            []string
EcomPriceRuleIDs         []string
EcomCustomerIDs          []string

// ECOM - Phase 3 (Dependent)
EcomVariantIDs           []string
EcomImageIDs             []string
EcomCustomerAddressIDs   []string
EcomWishlistIDs          []string
EcomCartIDs              []string

// ECOM - Phase 4 (Orders)
EcomOrderIDs             []string
EcomWishlistItemIDs      []string

// ECOM - Phase 5 (Order Details)
EcomOrderLineIDs         []string
EcomOrderStatusHistoryIDs []string
EcomReturnIDs            []string
EcomReturnLineIDs        []string
```

---

## Step 10: Verify Build

1. Run `go build ./erp/ecom/...`
2. Run `go vet ./erp/ecom/...`
3. Run `go build ./erp/ui/...`
4. Verify UI loads in browser with E-Commerce section
5. Verify mobile card navigation shows E-Commerce
6. Run mock data generation

---

## Files Summary

### Files to Modify

| File | Change |
|------|--------|
| `proto/make-bindings.sh` | Add ECOM proto docker runs |
| `go/erp/main/erp_main.go` | Add ECOM imports and activation |
| `go/erp/ui/main.go` | Add registerEcomTypes() |
| `go/erp/ui/web/js/sections.js` | Add `ecommerce` section mapping and initializer |
| `go/erp/ui/web/app.html` | Add ECOM CSS + script tags |
| `l8ui/m/js/layer8m-nav-config.js` | Add ECOM module config |
| `l8ui/m/js/layer8m-nav.js` | Add `MobileEcom` to registries |
| `m/app.html` | Add ECOM scripts |
| Desktop reference registry | Add ECOM models |
| Mobile reference registry | Add ECOM models |
| `go/tests/mocks/store.go` | Add ECOM ID slices |
| `go/tests/mocks/data.go` | Add ECOM data arrays |
| `go/tests/mocks/main.go` | Add ECOM phase calls |

### Files to Create

| Category | Count | Location |
|----------|-------|----------|
| Proto files | 5 | `proto/ecom-*.proto` |
| Go services | 40 | `go/erp/ecom/<service>/` (20 packages x 2 files) |
| Desktop UI config | 2 | `ecom/ecom-{config,init}.js` |
| Desktop UI CSS | 1 | `ecom/ecom.css` |
| Desktop submodule files | 16 | `ecom/<sub>/{enums,columns,forms,entry}.js` |
| Desktop section HTML | 1 | `sections/ecommerce.html` |
| Desktop reference registry | 1 | `js/reference-registry-ecom.js` |
| Mobile submodule files | 12 | `m/js/ecom/*` |
| Mobile registry | 1 | `m/js/ecom/ecom-index.js` |
| Mock generators | 6 | `go/tests/mocks/gen_ecom_*.go, ecom_phases.go` |
| **Total** | ~85 files | |

---

## Prime Objects Summary (20 total)

| # | Submodule | Prime Object | ServiceName | Primary Key |
|---|-----------|-------------|-------------|-------------|
| 1 | Catalog | EcomProduct | EcomProd | ProductId |
| 2 | Catalog | EcomCategory | EcomCat | CategoryId |
| 3 | Catalog | EcomAttribute | EcomAttr | AttributeId |
| 4 | Catalog | EcomImage | EcomImage | ImageId |
| 5 | Catalog | EcomVariant | EcomVar | VariantId |
| 6 | Orders | EcomOrder | EcomOrder | OrderId |
| 7 | Orders | EcomOrderLine | EcomOrdLn | LineId |
| 8 | Orders | EcomOrderStatusHistory | EcomOrdSts | StatusId |
| 9 | Orders | EcomReturn | EcomReturn | ReturnId |
| 10 | Orders | EcomReturnLine | EcomRetLn | LineId |
| 11 | Customers | EcomCustomer | EcomCust | CustomerId |
| 12 | Customers | EcomCustomerAddress | EcomAddr | AddressId |
| 13 | Customers | EcomWishlist | EcomWish | WishlistId |
| 14 | Customers | EcomWishlistItem | EcomWishIt | ItemId |
| 15 | Customers | EcomCart | EcomCart | CartId |
| 16 | Promotions | EcomPromotion | EcomPromo | PromotionId |
| 17 | Promotions | EcomCoupon | EcomCoupon | CouponId |
| 18 | Promotions | EcomPriceRule | EcomPrcRl | RuleId |
| 19 | Promotions | EcomShippingMethod | EcomShip | MethodId |
| 20 | Promotions | EcomPaymentMethod | EcomPay | MethodId |

**ServiceArea for ALL services: `byte(100)`**

**All ServiceName values are <= 10 characters.**

**All Proto type names and JS model names use `Ecom` prefix.**
