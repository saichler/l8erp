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
 * Mobile ECOM Catalog Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: ecom/catalog/catalog-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileEcomCatalog = window.MobileEcomCatalog || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const PRODUCT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Active', 'active', 'status-active'],
        ['Inactive', 'inactive', 'status-inactive'],
        ['Discontinued', 'discontinued', 'status-terminated'],
        ['Out of Stock', 'out', 'status-terminated']
    ]);

    const PRODUCT_TYPE = factory.simple([
        'Unspecified', 'Physical', 'Digital', 'Service', 'Subscription', 'Bundle'
    ]);

    const ATTRIBUTE_TYPE = factory.simple([
        'Unspecified', 'Text', 'Number', 'Select', 'Multi Select',
        'Boolean', 'Date', 'Color', 'Size'
    ]);

    const IMAGE_TYPE = factory.simple([
        'Unspecified', 'Main', 'Thumbnail', 'Gallery', 'Zoom', 'Variant'
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileEcomCatalog.enums = {
        PRODUCT_STATUS: PRODUCT_STATUS.enum,
        PRODUCT_STATUS_CLASSES: PRODUCT_STATUS.classes,
        PRODUCT_TYPE: PRODUCT_TYPE.enum,
        ATTRIBUTE_TYPE: ATTRIBUTE_TYPE.enum,
        IMAGE_TYPE: IMAGE_TYPE.enum
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileEcomCatalog.render = {
        productStatus: createStatusRenderer(PRODUCT_STATUS.enum, PRODUCT_STATUS.classes),
        productType: (v) => renderEnum(v, PRODUCT_TYPE.enum),
        attributeType: (v) => renderEnum(v, ATTRIBUTE_TYPE.enum),
        imageType: (v) => renderEnum(v, IMAGE_TYPE.enum),
        date: renderDate,
        money: renderMoney
    };

})();
