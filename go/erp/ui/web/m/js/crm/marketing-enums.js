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
 * Mobile CRM Marketing Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: crm/marketing/marketing-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileCrmMarketing = window.MobileCrmMarketing || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const CAMPAIGN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Planning', 'planning', 'status-pending'],
        ['Active', 'active', 'status-active'],
        ['Paused', 'paused', 'status-inactive'],
        ['Completed', 'completed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    const CAMPAIGN_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Email', 'email', 'status-active'],
        ['Social', 'social', 'status-active'],
        ['Event', 'event', 'status-active'],
        ['Webinar', 'webinar', 'status-active'],
        ['Content', 'content', 'status-active'],
        ['Advertising', 'advertising', 'status-pending'],
        ['Other', 'other', 'status-inactive']
    ]);

    const MEMBER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Sent', 'sent', 'status-pending'],
        ['Opened', 'opened', 'status-active'],
        ['Clicked', 'clicked', 'status-active'],
        ['Responded', 'responded', 'status-active'],
        ['Converted', 'converted', 'status-active'],
        ['Opted Out', 'optedout', 'status-terminated']
    ]);

    const RESPONSE_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Click', 'click', 'status-active'],
        ['Open', 'open', 'status-active'],
        ['Register', 'register', 'status-active'],
        ['Attend', 'attend', 'status-active'],
        ['Download', 'download', 'status-active'],
        ['Purchase', 'purchase', 'status-active'],
        ['Unsubscribe', 'unsubscribe', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileCrmMarketing.enums = {
        CAMPAIGN_STATUS: CAMPAIGN_STATUS.enum,
        CAMPAIGN_STATUS_VALUES: CAMPAIGN_STATUS.values,
        CAMPAIGN_STATUS_CLASSES: CAMPAIGN_STATUS.classes,
        CAMPAIGN_TYPE: CAMPAIGN_TYPE.enum,
        CAMPAIGN_TYPE_VALUES: CAMPAIGN_TYPE.values,
        CAMPAIGN_TYPE_CLASSES: CAMPAIGN_TYPE.classes,
        MEMBER_STATUS: MEMBER_STATUS.enum,
        MEMBER_STATUS_VALUES: MEMBER_STATUS.values,
        MEMBER_STATUS_CLASSES: MEMBER_STATUS.classes,
        CAMPAIGN_MEMBER_STATUS: MEMBER_STATUS.enum,
        CAMPAIGN_MEMBER_STATUS_VALUES: MEMBER_STATUS.values,
        CAMPAIGN_MEMBER_STATUS_CLASSES: MEMBER_STATUS.classes,
        RESPONSE_TYPE: RESPONSE_TYPE.enum,
        RESPONSE_TYPE_VALUES: RESPONSE_TYPE.values,
        RESPONSE_TYPE_CLASSES: RESPONSE_TYPE.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCrmMarketing.render = {
        campaignStatus: createStatusRenderer(CAMPAIGN_STATUS.enum, CAMPAIGN_STATUS.classes),
        campaignType: createStatusRenderer(CAMPAIGN_TYPE.enum, CAMPAIGN_TYPE.classes),
        memberStatus: createStatusRenderer(MEMBER_STATUS.enum, MEMBER_STATUS.classes),
        responseType: createStatusRenderer(RESPONSE_TYPE.enum, RESPONSE_TYPE.classes),
        date: renderDate,
        money: renderMoney
    };

})();
