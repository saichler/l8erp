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
// CRM Opportunities Module - Enum Definitions

(function() {
    'use strict';

    window.CrmOpportunities = window.CrmOpportunities || {};
    CrmOpportunities.enums = {};

    // OPPORTUNITY STATUS
    CrmOpportunities.enums.OPPORTUNITY_STATUS = {
        0: 'Unspecified',
        1: 'Open',
        2: 'Won',
        3: 'Lost',
        4: 'On Hold',
        5: 'Cancelled'
    };

    CrmOpportunities.enums.OPPORTUNITY_STATUS_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-terminated',
        4: 'layer8d-status-inactive',
        5: 'layer8d-status-terminated'
    };

    // SALES STAGE
    CrmOpportunities.enums.SALES_STAGE = {
        0: 'Unspecified',
        1: 'Prospecting',
        2: 'Qualification',
        3: 'Needs Analysis',
        4: 'Value Proposition',
        5: 'Decision Makers',
        6: 'Proposal',
        7: 'Negotiation',
        8: 'Closed Won',
        9: 'Closed Lost'
    };

    CrmOpportunities.enums.SALES_STAGE_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active',
        6: 'layer8d-status-active',
        7: 'layer8d-status-active',
        8: 'layer8d-status-active',
        9: 'layer8d-status-terminated'
    };

    // THREAT LEVEL
    CrmOpportunities.enums.THREAT_LEVEL = {
        0: 'Unspecified',
        1: 'Low',
        2: 'Medium',
        3: 'High'
    };

    CrmOpportunities.enums.THREAT_LEVEL_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-terminated'
    };

    // ACTIVITY TYPE
    CrmOpportunities.enums.ACTIVITY_TYPE = {
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

    CrmOpportunities.enums.ACTIVITY_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active',
        6: 'layer8d-status-pending',
        7: 'layer8d-status-pending',
        8: 'layer8d-status-inactive'
    };

    // ACTIVITY STATUS
    CrmOpportunities.enums.ACTIVITY_STATUS = {
        0: 'Unspecified',
        1: 'Planned',
        2: 'In Progress',
        3: 'Completed',
        4: 'Cancelled'
    };

    CrmOpportunities.enums.ACTIVITY_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // RENDERERS
    CrmOpportunities.render = {};

    CrmOpportunities.render.opportunityStatus = Layer8DRenderers.createStatusRenderer(
        CrmOpportunities.enums.OPPORTUNITY_STATUS,
        CrmOpportunities.enums.OPPORTUNITY_STATUS_CLASSES
    );

    CrmOpportunities.render.salesStage = Layer8DRenderers.createStatusRenderer(
        CrmOpportunities.enums.SALES_STAGE,
        CrmOpportunities.enums.SALES_STAGE_CLASSES
    );

    CrmOpportunities.render.threatLevel = Layer8DRenderers.createStatusRenderer(
        CrmOpportunities.enums.THREAT_LEVEL,
        CrmOpportunities.enums.THREAT_LEVEL_CLASSES
    );

    CrmOpportunities.render.activityType = Layer8DRenderers.createStatusRenderer(
        CrmOpportunities.enums.ACTIVITY_TYPE,
        CrmOpportunities.enums.ACTIVITY_TYPE_CLASSES
    );

    CrmOpportunities.render.activityStatus = Layer8DRenderers.createStatusRenderer(
        CrmOpportunities.enums.ACTIVITY_STATUS,
        CrmOpportunities.enums.ACTIVITY_STATUS_CLASSES
    );

    CrmOpportunities.render.date = Layer8DRenderers.renderDate;
    CrmOpportunities.render.money = Layer8DRenderers.renderMoney;

})();
