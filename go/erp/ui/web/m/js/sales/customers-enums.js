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
 * Mobile Sales Customers Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: sales/customers/customers-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileSalesCustomers = window.MobileSalesCustomers || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const CONTRACT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Active', 'active', 'status-active'],
        ['Expired', 'expired', 'status-inactive'],
        ['Terminated', 'terminated', 'status-terminated'],
        ['Renewed', 'renewed', 'status-active']
    ]);

    const PARTNER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'status-active'],
        ['Inactive', 'inactive', 'status-inactive'],
        ['Pending', 'pending', 'status-pending'],
        ['Suspended', 'suspended', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileSalesCustomers.enums = {
        CONTRACT_STATUS: CONTRACT_STATUS.enum,
        CONTRACT_STATUS_VALUES: CONTRACT_STATUS.values,
        CONTRACT_STATUS_CLASSES: CONTRACT_STATUS.classes,
        PARTNER_STATUS: PARTNER_STATUS.enum,
        PARTNER_STATUS_VALUES: PARTNER_STATUS.values,
        PARTNER_STATUS_CLASSES: PARTNER_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileSalesCustomers.render = {
        contractStatus: createStatusRenderer(CONTRACT_STATUS.enum, CONTRACT_STATUS.classes),
        partnerStatus: createStatusRenderer(PARTNER_STATUS.enum, PARTNER_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
