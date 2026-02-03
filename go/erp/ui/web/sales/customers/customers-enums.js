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
// Sales Customers Module - Enum Definitions
// All enum constants and value mappings for Sales Customer Management models

(function() {
    'use strict';

    // Create SalesCustomers namespace
    window.SalesCustomers = window.SalesCustomers || {};
    SalesCustomers.enums = {};

    // ============================================================================
    // CONTRACT STATUS
    // ============================================================================

    SalesCustomers.enums.CONTRACT_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Active',
        3: 'Expired',
        4: 'Terminated',
        5: 'Renewed'
    };

    SalesCustomers.enums.CONTRACT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-active'
    };

    // ============================================================================
    // PARTNER STATUS
    // ============================================================================

    SalesCustomers.enums.PARTNER_STATUS = {
        0: 'Unspecified',
        1: 'Active',
        2: 'Inactive',
        3: 'Pending',
        4: 'Suspended'
    };

    SalesCustomers.enums.PARTNER_STATUS_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-inactive',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-terminated'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    SalesCustomers.render = {};

    SalesCustomers.render.contractStatus = Layer8DRenderers.createStatusRenderer(
        SalesCustomers.enums.CONTRACT_STATUS,
        SalesCustomers.enums.CONTRACT_STATUS_CLASSES
    );

    SalesCustomers.render.partnerStatus = Layer8DRenderers.createStatusRenderer(
        SalesCustomers.enums.PARTNER_STATUS,
        SalesCustomers.enums.PARTNER_STATUS_CLASSES
    );

    SalesCustomers.render.date = Layer8DRenderers.renderDate;
    SalesCustomers.render.money = Layer8DRenderers.renderMoney;

})();
