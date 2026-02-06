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
// Tax Management Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney, renderPercentage } = Layer8DRenderers;

    window.TaxManagement = window.TaxManagement || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const TAX_TYPE = factory.simple([
        'Unspecified', 'Sales', 'Purchase', 'Income', 'Withholding',
        'Excise', 'Property', 'Payroll', 'Value Added'
    ]);

    const JURISDICTION_LEVEL = factory.simple([
        'Unspecified', 'Federal', 'State', 'Local', 'International'
    ]);

    const TAX_RETURN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Filed', 'filed', 'layer8d-status-pending'],
        ['Accepted', 'accepted', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-terminated'],
        ['Amended', 'amended', 'layer8d-status-pending']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    window.TaxManagement.enums = {
        TAX_TYPE: TAX_TYPE.enum,
        JURISDICTION_LEVEL: JURISDICTION_LEVEL.enum,
        TAX_RETURN_STATUS: TAX_RETURN_STATUS.enum,
        TAX_RETURN_STATUS_CLASSES: TAX_RETURN_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderTaxReturnStatus = createStatusRenderer(TAX_RETURN_STATUS.enum, TAX_RETURN_STATUS.classes);

    window.TaxManagement.render = {
        taxType: (v) => renderEnum(v, TAX_TYPE.enum),
        jurisdictionLevel: (v) => renderEnum(v, JURISDICTION_LEVEL.enum),
        taxReturnStatus: renderTaxReturnStatus,
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney,
        percentage: renderPercentage
    };

})();
