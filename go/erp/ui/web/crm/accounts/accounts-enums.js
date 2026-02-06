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
// CRM Accounts Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney } = Layer8DRenderers;

    window.CrmAccounts = window.CrmAccounts || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const ACCOUNT_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Prospect', 'prospect', 'layer8d-status-pending'],
        ['Customer', 'customer', 'layer8d-status-active'],
        ['Partner', 'partner', 'layer8d-status-active'],
        ['Competitor', 'competitor', 'layer8d-status-inactive'],
        ['Other', 'other', 'layer8d-status-inactive']
    ]);

    const ACCOUNT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'layer8d-status-active'],
        ['Inactive', 'inactive', 'layer8d-status-inactive'],
        ['Pending', 'pending', 'layer8d-status-pending']
    ]);

    const RELATIONSHIP_TYPE = factory.simple([
        'Unspecified', 'Parent', 'Subsidiary', 'Partner', 'Vendor', 'Affiliate'
    ]);

    const HEALTH_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Healthy', 'healthy', 'layer8d-status-active'],
        ['At Risk', 'risk', 'layer8d-status-pending'],
        ['Critical', 'critical', 'layer8d-status-terminated']
    ]);

    const INTERACTION_TYPE = factory.simple([
        'Unspecified', 'Call', 'Email', 'Meeting', 'Chat', 'Social', 'Visit'
    ]);

    const INTERACTION_DIRECTION = factory.simple(['Unspecified', 'Inbound', 'Outbound']);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    CrmAccounts.enums = {
        ACCOUNT_TYPE: ACCOUNT_TYPE.enum,
        ACCOUNT_TYPE_CLASSES: ACCOUNT_TYPE.classes,
        ACCOUNT_STATUS: ACCOUNT_STATUS.enum,
        ACCOUNT_STATUS_CLASSES: ACCOUNT_STATUS.classes,
        RELATIONSHIP_TYPE: RELATIONSHIP_TYPE.enum,
        HEALTH_STATUS: HEALTH_STATUS.enum,
        HEALTH_STATUS_CLASSES: HEALTH_STATUS.classes,
        INTERACTION_TYPE: INTERACTION_TYPE.enum,
        INTERACTION_DIRECTION: INTERACTION_DIRECTION.enum
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    CrmAccounts.render = {
        accountType: createStatusRenderer(ACCOUNT_TYPE.enum, ACCOUNT_TYPE.classes),
        accountStatus: createStatusRenderer(ACCOUNT_STATUS.enum, ACCOUNT_STATUS.classes),
        relationshipType: (v) => renderEnum(v, RELATIONSHIP_TYPE.enum),
        healthStatus: createStatusRenderer(HEALTH_STATUS.enum, HEALTH_STATUS.classes),
        interactionType: (v) => renderEnum(v, INTERACTION_TYPE.enum),
        interactionDirection: (v) => renderEnum(v, INTERACTION_DIRECTION.enum),
        date: renderDate,
        money: renderMoney
    };

})();
