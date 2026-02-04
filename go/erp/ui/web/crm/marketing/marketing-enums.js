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
// CRM Marketing Module - Enum Definitions

(function() {
    'use strict';

    window.CrmMarketing = window.CrmMarketing || {};
    CrmMarketing.enums = {};

    // CAMPAIGN TYPE
    CrmMarketing.enums.CAMPAIGN_TYPE = {
        0: 'Unspecified',
        1: 'Email',
        2: 'Direct Mail',
        3: 'Telemarketing',
        4: 'Trade Show',
        5: 'Webinar',
        6: 'Advertisement',
        7: 'Social Media',
        8: 'Referral'
    };

    CrmMarketing.enums.CAMPAIGN_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-pending',
        5: 'layer8d-status-pending',
        6: 'layer8d-status-active',
        7: 'layer8d-status-active',
        8: 'layer8d-status-active'
    };

    // CAMPAIGN STATUS
    CrmMarketing.enums.CAMPAIGN_STATUS = {
        0: 'Unspecified',
        1: 'Planned',
        2: 'Active',
        3: 'Completed',
        4: 'Aborted'
    };

    CrmMarketing.enums.CAMPAIGN_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // CAMPAIGN MEMBER STATUS
    CrmMarketing.enums.CAMPAIGN_MEMBER_STATUS = {
        0: 'Unspecified',
        1: 'Sent',
        2: 'Responded',
        3: 'Converted',
        4: 'Opted Out'
    };

    CrmMarketing.enums.CAMPAIGN_MEMBER_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive'
    };

    // RESPONSE TYPE
    CrmMarketing.enums.RESPONSE_TYPE = {
        0: 'Unspecified',
        1: 'Opened',
        2: 'Clicked',
        3: 'Responded',
        4: 'Converted',
        5: 'Bounced',
        6: 'Unsubscribed'
    };

    CrmMarketing.enums.RESPONSE_TYPE_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-terminated',
        6: 'layer8d-status-inactive'
    };

    // RENDERERS
    CrmMarketing.render = {};

    CrmMarketing.render.campaignType = Layer8DRenderers.createStatusRenderer(
        CrmMarketing.enums.CAMPAIGN_TYPE,
        CrmMarketing.enums.CAMPAIGN_TYPE_CLASSES
    );

    CrmMarketing.render.campaignStatus = Layer8DRenderers.createStatusRenderer(
        CrmMarketing.enums.CAMPAIGN_STATUS,
        CrmMarketing.enums.CAMPAIGN_STATUS_CLASSES
    );

    CrmMarketing.render.campaignMemberStatus = Layer8DRenderers.createStatusRenderer(
        CrmMarketing.enums.CAMPAIGN_MEMBER_STATUS,
        CrmMarketing.enums.CAMPAIGN_MEMBER_STATUS_CLASSES
    );

    CrmMarketing.render.responseType = Layer8DRenderers.createStatusRenderer(
        CrmMarketing.enums.RESPONSE_TYPE,
        CrmMarketing.enums.RESPONSE_TYPE_CLASSES
    );

    CrmMarketing.render.date = Layer8DRenderers.renderDate;
    CrmMarketing.render.money = Layer8DRenderers.renderMoney;

})();
