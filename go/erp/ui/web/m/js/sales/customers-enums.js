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
 * Mobile Sales Customers Module - Enum Definitions
 * Desktop Equivalent: sales/customers/customers-enums.js
 */
(function() {
    'use strict';

    window.MobileSalesCustomers = window.MobileSalesCustomers || {};
    MobileSalesCustomers.enums = {};

    // ============================================================================
    // CONTRACT STATUS
    // ============================================================================

    MobileSalesCustomers.enums.CONTRACT_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Active', 3: 'Expired', 4: 'Terminated', 5: 'Renewed'
    };
    MobileSalesCustomers.enums.CONTRACT_STATUS_VALUES = {
        'draft': 1, 'active': 2, 'expired': 3, 'terminated': 4, 'renewed': 5
    };
    MobileSalesCustomers.enums.CONTRACT_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-inactive', 4: 'status-terminated', 5: 'status-active'
    };

    // ============================================================================
    // PARTNER STATUS
    // ============================================================================

    MobileSalesCustomers.enums.PARTNER_STATUS = {
        0: 'Unspecified', 1: 'Active', 2: 'Inactive', 3: 'Pending', 4: 'Suspended'
    };
    MobileSalesCustomers.enums.PARTNER_STATUS_VALUES = {
        'active': 1, 'inactive': 2, 'pending': 3, 'suspended': 4
    };
    MobileSalesCustomers.enums.PARTNER_STATUS_CLASSES = {
        1: 'status-active', 2: 'status-inactive', 3: 'status-pending', 4: 'status-terminated'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileSalesCustomers.render = {
        contractStatus: Layer8MRenderers.createStatusRenderer(
            MobileSalesCustomers.enums.CONTRACT_STATUS,
            MobileSalesCustomers.enums.CONTRACT_STATUS_CLASSES
        ),
        partnerStatus: Layer8MRenderers.createStatusRenderer(
            MobileSalesCustomers.enums.PARTNER_STATUS,
            MobileSalesCustomers.enums.PARTNER_STATUS_CLASSES
        ),
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
