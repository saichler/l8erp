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
 * Mobile CRM Accounts Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: crm/accounts/accounts-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileCrmAccounts = window.MobileCrmAccounts || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const ACCOUNT_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Prospect', 'prospect', 'status-pending'],
        ['Customer', 'customer', 'status-active'],
        ['Partner', 'partner', 'status-active'],
        ['Competitor', 'competitor', 'status-inactive'],
        ['Other', 'other', 'status-inactive']
    ]);

    const ACCOUNT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'status-active'],
        ['Inactive', 'inactive', 'status-inactive'],
        ['Pending', 'pending', 'status-pending']
    ]);

    const RELATIONSHIP_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Parent', 'parent', 'status-active'],
        ['Subsidiary', 'subsidiary', 'status-active'],
        ['Partner', 'partner', 'status-active'],
        ['Vendor', 'vendor', 'status-pending'],
        ['Affiliate', 'affiliate', 'status-pending']
    ]);

    const HEALTH_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Healthy', 'healthy', 'status-active'],
        ['At Risk', 'atrisk', 'status-pending'],
        ['Critical', 'critical', 'status-terminated']
    ]);

    const INTERACTION_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Call', 'call', 'status-active'],
        ['Email', 'email', 'status-active'],
        ['Meeting', 'meeting', 'status-active'],
        ['Chat', 'chat', 'status-active'],
        ['Social', 'social', 'status-pending'],
        ['Visit', 'visit', 'status-active']
    ]);

    const INTERACTION_DIRECTION = factory.create([
        ['Unspecified', null, ''],
        ['Inbound', 'inbound', 'status-active'],
        ['Outbound', 'outbound', 'status-pending']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileCrmAccounts.enums = {
        ACCOUNT_TYPE: ACCOUNT_TYPE.enum,
        ACCOUNT_TYPE_VALUES: ACCOUNT_TYPE.values,
        ACCOUNT_TYPE_CLASSES: ACCOUNT_TYPE.classes,
        ACCOUNT_STATUS: ACCOUNT_STATUS.enum,
        ACCOUNT_STATUS_VALUES: ACCOUNT_STATUS.values,
        ACCOUNT_STATUS_CLASSES: ACCOUNT_STATUS.classes,
        RELATIONSHIP_TYPE: RELATIONSHIP_TYPE.enum,
        RELATIONSHIP_TYPE_VALUES: RELATIONSHIP_TYPE.values,
        RELATIONSHIP_TYPE_CLASSES: RELATIONSHIP_TYPE.classes,
        HEALTH_STATUS: HEALTH_STATUS.enum,
        HEALTH_STATUS_VALUES: HEALTH_STATUS.values,
        HEALTH_STATUS_CLASSES: HEALTH_STATUS.classes,
        INTERACTION_TYPE: INTERACTION_TYPE.enum,
        INTERACTION_TYPE_VALUES: INTERACTION_TYPE.values,
        INTERACTION_TYPE_CLASSES: INTERACTION_TYPE.classes,
        INTERACTION_DIRECTION: INTERACTION_DIRECTION.enum,
        INTERACTION_DIRECTION_VALUES: INTERACTION_DIRECTION.values,
        INTERACTION_DIRECTION_CLASSES: INTERACTION_DIRECTION.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCrmAccounts.render = {
        accountType: createStatusRenderer(ACCOUNT_TYPE.enum, ACCOUNT_TYPE.classes),
        accountStatus: createStatusRenderer(ACCOUNT_STATUS.enum, ACCOUNT_STATUS.classes),
        relationshipType: createStatusRenderer(RELATIONSHIP_TYPE.enum, RELATIONSHIP_TYPE.classes),
        healthStatus: createStatusRenderer(HEALTH_STATUS.enum, HEALTH_STATUS.classes),
        interactionType: createStatusRenderer(INTERACTION_TYPE.enum, INTERACTION_TYPE.classes),
        interactionDirection: createStatusRenderer(INTERACTION_DIRECTION.enum, INTERACTION_DIRECTION.classes),
        date: renderDate,
        money: renderMoney
    };

})();
