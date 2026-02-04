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
// CRM Accounts Module - Enum Definitions

(function() {
    'use strict';

    window.CrmAccounts = window.CrmAccounts || {};
    CrmAccounts.enums = {};

    // ACCOUNT TYPE
    CrmAccounts.enums.ACCOUNT_TYPE = {
        0: 'Unspecified',
        1: 'Prospect',
        2: 'Customer',
        3: 'Partner',
        4: 'Competitor',
        5: 'Other'
    };

    CrmAccounts.enums.ACCOUNT_TYPE_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive',
        5: 'layer8d-status-inactive'
    };

    // ACCOUNT STATUS
    CrmAccounts.enums.ACCOUNT_STATUS = {
        0: 'Unspecified',
        1: 'Active',
        2: 'Inactive',
        3: 'Pending'
    };

    CrmAccounts.enums.ACCOUNT_STATUS_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-inactive',
        3: 'layer8d-status-pending'
    };

    // RELATIONSHIP TYPE
    CrmAccounts.enums.RELATIONSHIP_TYPE = {
        0: 'Unspecified',
        1: 'Parent',
        2: 'Subsidiary',
        3: 'Partner',
        4: 'Vendor',
        5: 'Affiliate'
    };

    CrmAccounts.enums.RELATIONSHIP_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-pending',
        5: 'layer8d-status-pending'
    };

    // HEALTH STATUS
    CrmAccounts.enums.HEALTH_STATUS = {
        0: 'Unspecified',
        1: 'Healthy',
        2: 'At Risk',
        3: 'Critical'
    };

    CrmAccounts.enums.HEALTH_STATUS_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-terminated'
    };

    // INTERACTION TYPE
    CrmAccounts.enums.INTERACTION_TYPE = {
        0: 'Unspecified',
        1: 'Call',
        2: 'Email',
        3: 'Meeting',
        4: 'Chat',
        5: 'Social',
        6: 'Visit'
    };

    CrmAccounts.enums.INTERACTION_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-pending',
        6: 'layer8d-status-active'
    };

    // INTERACTION DIRECTION
    CrmAccounts.enums.INTERACTION_DIRECTION = {
        0: 'Unspecified',
        1: 'Inbound',
        2: 'Outbound'
    };

    CrmAccounts.enums.INTERACTION_DIRECTION_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-pending'
    };

    // RENDERERS
    CrmAccounts.render = {};

    CrmAccounts.render.accountType = Layer8DRenderers.createStatusRenderer(
        CrmAccounts.enums.ACCOUNT_TYPE,
        CrmAccounts.enums.ACCOUNT_TYPE_CLASSES
    );

    CrmAccounts.render.accountStatus = Layer8DRenderers.createStatusRenderer(
        CrmAccounts.enums.ACCOUNT_STATUS,
        CrmAccounts.enums.ACCOUNT_STATUS_CLASSES
    );

    CrmAccounts.render.relationshipType = Layer8DRenderers.createStatusRenderer(
        CrmAccounts.enums.RELATIONSHIP_TYPE,
        CrmAccounts.enums.RELATIONSHIP_TYPE_CLASSES
    );

    CrmAccounts.render.healthStatus = Layer8DRenderers.createStatusRenderer(
        CrmAccounts.enums.HEALTH_STATUS,
        CrmAccounts.enums.HEALTH_STATUS_CLASSES
    );

    CrmAccounts.render.interactionType = Layer8DRenderers.createStatusRenderer(
        CrmAccounts.enums.INTERACTION_TYPE,
        CrmAccounts.enums.INTERACTION_TYPE_CLASSES
    );

    CrmAccounts.render.interactionDirection = Layer8DRenderers.createStatusRenderer(
        CrmAccounts.enums.INTERACTION_DIRECTION,
        CrmAccounts.enums.INTERACTION_DIRECTION_CLASSES
    );

    CrmAccounts.render.date = Layer8DRenderers.renderDate;
    CrmAccounts.render.money = Layer8DRenderers.renderMoney;

})();
