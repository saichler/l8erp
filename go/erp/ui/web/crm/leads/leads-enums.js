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
// CRM Leads Module - Enum Definitions

(function() {
    'use strict';

    window.CrmLeads = window.CrmLeads || {};
    CrmLeads.enums = {};

    // LEAD STATUS
    CrmLeads.enums.LEAD_STATUS = {
        0: 'Unspecified',
        1: 'New',
        2: 'Contacted',
        3: 'Qualified',
        4: 'Unqualified',
        5: 'Converted',
        6: 'Lost'
    };

    CrmLeads.enums.LEAD_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive',
        5: 'layer8d-status-active',
        6: 'layer8d-status-terminated'
    };

    // LEAD RATING
    CrmLeads.enums.LEAD_RATING = {
        0: 'Unspecified',
        1: 'Hot',
        2: 'Warm',
        3: 'Cold'
    };

    CrmLeads.enums.LEAD_RATING_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-inactive'
    };

    // LEAD SOURCE TYPE
    CrmLeads.enums.LEAD_SOURCE_TYPE = {
        0: 'Unspecified',
        1: 'Web',
        2: 'Phone',
        3: 'Email',
        4: 'Referral',
        5: 'Trade Show',
        6: 'Partner',
        7: 'Advertising',
        8: 'Social Media'
    };

    CrmLeads.enums.LEAD_SOURCE_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-pending',
        6: 'layer8d-status-active',
        7: 'layer8d-status-pending',
        8: 'layer8d-status-active'
    };

    // ACTIVITY TYPE
    CrmLeads.enums.ACTIVITY_TYPE = {
        0: 'Unspecified',
        1: 'Call',
        2: 'Email',
        3: 'Meeting',
        4: 'Demo',
        5: 'Proposal',
        6: 'Follow Up',
        7: 'Task',
        8: 'Note'
    };

    CrmLeads.enums.ACTIVITY_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active',
        6: 'layer8d-status-pending',
        7: 'layer8d-status-pending',
        8: 'layer8d-status-inactive'
    };

    // ACTIVITY STATUS
    CrmLeads.enums.ACTIVITY_STATUS = {
        0: 'Unspecified',
        1: 'Planned',
        2: 'In Progress',
        3: 'Completed',
        4: 'Cancelled'
    };

    CrmLeads.enums.ACTIVITY_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // RENDERERS
    CrmLeads.render = {};

    CrmLeads.render.leadStatus = Layer8DRenderers.createStatusRenderer(
        CrmLeads.enums.LEAD_STATUS,
        CrmLeads.enums.LEAD_STATUS_CLASSES
    );

    CrmLeads.render.leadRating = Layer8DRenderers.createStatusRenderer(
        CrmLeads.enums.LEAD_RATING,
        CrmLeads.enums.LEAD_RATING_CLASSES
    );

    CrmLeads.render.leadSourceType = Layer8DRenderers.createStatusRenderer(
        CrmLeads.enums.LEAD_SOURCE_TYPE,
        CrmLeads.enums.LEAD_SOURCE_TYPE_CLASSES
    );

    CrmLeads.render.activityType = Layer8DRenderers.createStatusRenderer(
        CrmLeads.enums.ACTIVITY_TYPE,
        CrmLeads.enums.ACTIVITY_TYPE_CLASSES
    );

    CrmLeads.render.activityStatus = Layer8DRenderers.createStatusRenderer(
        CrmLeads.enums.ACTIVITY_STATUS,
        CrmLeads.enums.ACTIVITY_STATUS_CLASSES
    );

    CrmLeads.render.date = Layer8DRenderers.renderDate;
    CrmLeads.render.money = Layer8DRenderers.renderMoney;

})();
