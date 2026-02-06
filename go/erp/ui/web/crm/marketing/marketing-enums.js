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
// CRM Marketing Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney } = Layer8DRenderers;

    window.CrmMarketing = window.CrmMarketing || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const CAMPAIGN_TYPE = factory.simple([
        'Unspecified', 'Email', 'Direct Mail', 'Telemarketing', 'Trade Show',
        'Webinar', 'Advertisement', 'Social Media', 'Referral'
    ]);

    const CAMPAIGN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Planned', 'planned', 'layer8d-status-pending'],
        ['Active', 'active', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Aborted', 'aborted', 'layer8d-status-terminated']
    ]);

    const CAMPAIGN_MEMBER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Sent', 'sent', 'layer8d-status-pending'],
        ['Responded', 'responded', 'layer8d-status-active'],
        ['Converted', 'converted', 'layer8d-status-active'],
        ['Opted Out', 'opted', 'layer8d-status-inactive']
    ]);

    const RESPONSE_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Opened', 'opened', 'layer8d-status-pending'],
        ['Clicked', 'clicked', 'layer8d-status-active'],
        ['Responded', 'responded', 'layer8d-status-active'],
        ['Converted', 'converted', 'layer8d-status-active'],
        ['Bounced', 'bounced', 'layer8d-status-terminated'],
        ['Unsubscribed', 'unsubscribed', 'layer8d-status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    CrmMarketing.enums = {
        CAMPAIGN_TYPE: CAMPAIGN_TYPE.enum,
        CAMPAIGN_STATUS: CAMPAIGN_STATUS.enum,
        CAMPAIGN_STATUS_CLASSES: CAMPAIGN_STATUS.classes,
        CAMPAIGN_MEMBER_STATUS: CAMPAIGN_MEMBER_STATUS.enum,
        CAMPAIGN_MEMBER_STATUS_CLASSES: CAMPAIGN_MEMBER_STATUS.classes,
        RESPONSE_TYPE: RESPONSE_TYPE.enum,
        RESPONSE_TYPE_CLASSES: RESPONSE_TYPE.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    CrmMarketing.render = {
        campaignType: (v) => renderEnum(v, CAMPAIGN_TYPE.enum),
        campaignStatus: createStatusRenderer(CAMPAIGN_STATUS.enum, CAMPAIGN_STATUS.classes),
        campaignMemberStatus: createStatusRenderer(CAMPAIGN_MEMBER_STATUS.enum, CAMPAIGN_MEMBER_STATUS.classes),
        responseType: createStatusRenderer(RESPONSE_TYPE.enum, RESPONSE_TYPE.classes),
        date: renderDate,
        money: renderMoney
    };

})();
