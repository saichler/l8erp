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
// ECOM Catalog Module - Enum Definitions

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
        5: 'layer8d-status-terminated'
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

    EcomCatalog.enums.PRODUCT_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-pending'
    };

    // ATTRIBUTE TYPE
    EcomCatalog.enums.ATTRIBUTE_TYPE = {
        0: 'Unspecified',
        1: 'Text',
        2: 'Number',
        3: 'Select',
        4: 'Multi Select',
        5: 'Boolean',
        6: 'Date',
        7: 'Color',
        8: 'Size'
    };

    EcomCatalog.enums.ATTRIBUTE_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active',
        6: 'layer8d-status-active',
        7: 'layer8d-status-pending',
        8: 'layer8d-status-pending'
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

    EcomCatalog.enums.IMAGE_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-pending'
    };

    // RENDERERS
    EcomCatalog.render = {};

    EcomCatalog.render.productStatus = Layer8DRenderers.createStatusRenderer(
        EcomCatalog.enums.PRODUCT_STATUS,
        EcomCatalog.enums.PRODUCT_STATUS_CLASSES
    );

    EcomCatalog.render.productType = Layer8DRenderers.createStatusRenderer(
        EcomCatalog.enums.PRODUCT_TYPE,
        EcomCatalog.enums.PRODUCT_TYPE_CLASSES
    );

    EcomCatalog.render.attributeType = Layer8DRenderers.createStatusRenderer(
        EcomCatalog.enums.ATTRIBUTE_TYPE,
        EcomCatalog.enums.ATTRIBUTE_TYPE_CLASSES
    );

    EcomCatalog.render.imageType = Layer8DRenderers.createStatusRenderer(
        EcomCatalog.enums.IMAGE_TYPE,
        EcomCatalog.enums.IMAGE_TYPE_CLASSES
    );

    EcomCatalog.render.date = Layer8DRenderers.renderDate;
    EcomCatalog.render.money = Layer8DRenderers.renderMoney;

})();
