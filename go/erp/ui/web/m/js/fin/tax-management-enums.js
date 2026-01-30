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
 * Mobile Tax Management Module - Enum Definitions
 * Desktop Equivalent: fin/tax/tax-enums.js
 */
(function() {
    'use strict';

    window.MobileTaxManagement = window.MobileTaxManagement || {};
    MobileTaxManagement.enums = {};

    // ============================================================================
    // TAX TYPE
    // ============================================================================

    MobileTaxManagement.enums.TAX_TYPE = {
        0: 'Unspecified', 1: 'Sales', 2: 'Purchase', 3: 'Income',
        4: 'Withholding', 5: 'Excise', 6: 'Property', 7: 'Payroll', 8: 'Value Added'
    };

    // ============================================================================
    // JURISDICTION LEVEL
    // ============================================================================

    MobileTaxManagement.enums.JURISDICTION_LEVEL = {
        0: 'Unspecified', 1: 'Federal', 2: 'State', 3: 'Local', 4: 'International'
    };

    // ============================================================================
    // TAX RETURN STATUS
    // ============================================================================

    MobileTaxManagement.enums.TAX_RETURN_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Filed', 3: 'Accepted',
        4: 'Rejected', 5: 'Amended'
    };
    MobileTaxManagement.enums.TAX_RETURN_STATUS_VALUES = {
        'draft': 1, 'filed': 2, 'accepted': 3, 'rejected': 4, 'amended': 5
    };
    MobileTaxManagement.enums.TAX_RETURN_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active',
        4: 'status-terminated', 5: 'status-pending'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileTaxManagement.render = {
        taxType: (type) => MobileRenderers.renderEnum(type, MobileTaxManagement.enums.TAX_TYPE),
        jurisdictionLevel: (level) => MobileRenderers.renderEnum(level, MobileTaxManagement.enums.JURISDICTION_LEVEL),
        taxReturnStatus: MobileRenderers.createStatusRenderer(
            MobileTaxManagement.enums.TAX_RETURN_STATUS,
            MobileTaxManagement.enums.TAX_RETURN_STATUS_CLASSES
        ),
        boolean: MobileRenderers.renderBoolean,
        date: MobileRenderers.renderDate,
        money: MobileRenderers.renderMoney,
        percentage: MobileRenderers.renderPercentage
    };

})();
