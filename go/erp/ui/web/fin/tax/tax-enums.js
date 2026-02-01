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
// Tax Management Module - Enum Definitions
// All enum constants and value mappings for Tax Management models

(function() {
    'use strict';

    // Create TaxManagement namespace
    window.TaxManagement = window.TaxManagement || {};
    TaxManagement.enums = {};

    // ============================================================================
    // TAX TYPE
    // ============================================================================

    TaxManagement.enums.TAX_TYPE = {
        0: 'Unspecified',
        1: 'Sales',
        2: 'Purchase',
        3: 'Income',
        4: 'Withholding',
        5: 'Excise',
        6: 'Property',
        7: 'Payroll',
        8: 'Value Added'
    };

    // ============================================================================
    // JURISDICTION LEVEL
    // ============================================================================

    TaxManagement.enums.JURISDICTION_LEVEL = {
        0: 'Unspecified',
        1: 'Federal',
        2: 'State',
        3: 'Local',
        4: 'International'
    };

    // ============================================================================
    // TAX RETURN STATUS
    // ============================================================================

    TaxManagement.enums.TAX_RETURN_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Filed',
        3: 'Accepted',
        4: 'Rejected',
        5: 'Amended'
    };

    TaxManagement.enums.TAX_RETURN_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-pending'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    // Create render functions using shared utilities
    TaxManagement.render = {};

    TaxManagement.render.taxType = (type) => Layer8DRenderers.renderEnum(type, TaxManagement.enums.TAX_TYPE);
    TaxManagement.render.jurisdictionLevel = (level) => Layer8DRenderers.renderEnum(level, TaxManagement.enums.JURISDICTION_LEVEL);

    TaxManagement.render.taxReturnStatus = Layer8DRenderers.createStatusRenderer(
        TaxManagement.enums.TAX_RETURN_STATUS,
        TaxManagement.enums.TAX_RETURN_STATUS_CLASSES
    );

    TaxManagement.render.boolean = Layer8DRenderers.renderBoolean;
    TaxManagement.render.date = Layer8DRenderers.renderDate;
    TaxManagement.render.money = Layer8DRenderers.renderMoney;
    TaxManagement.render.percentage = Layer8DRenderers.renderPercentage;

})();
