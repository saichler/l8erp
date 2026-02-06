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
 * Mobile CRM Opportunities Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: crm/opportunities/opportunities-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileCrmOpportunities = window.MobileCrmOpportunities || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const OPPORTUNITY_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Open', 'open', 'status-active'],
        ['Won', 'won', 'status-active'],
        ['Lost', 'lost', 'status-terminated'],
        ['On Hold', 'onhold', 'status-inactive'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    const SALES_STAGE = factory.create([
        ['Unspecified', null, ''],
        ['Prospecting', 'prospecting', 'status-pending'],
        ['Qualification', 'qualification', 'status-pending'],
        ['Needs Analysis', 'needsanalysis', 'status-active'],
        ['Value Proposition', 'valueproposition', 'status-active'],
        ['Decision Makers', 'decisionmakers', 'status-active'],
        ['Proposal', 'proposal', 'status-active'],
        ['Negotiation', 'negotiation', 'status-active'],
        ['Closed Won', 'closedwon', 'status-active'],
        ['Closed Lost', 'closedlost', 'status-terminated']
    ]);

    const THREAT_LEVEL = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'status-active'],
        ['Medium', 'medium', 'status-pending'],
        ['High', 'high', 'status-terminated']
    ]);

    const ACTIVITY_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Call', 'call', 'status-active'],
        ['Email', 'email', 'status-active'],
        ['Meeting', 'meeting', 'status-active'],
        ['Demo', 'demo', 'status-active'],
        ['Proposal', 'proposal', 'status-active'],
        ['Follow Up', 'followup', 'status-pending'],
        ['Task', 'task', 'status-pending'],
        ['Note', 'note', 'status-inactive']
    ]);

    const ACTIVITY_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Planned', 'planned', 'status-pending'],
        ['In Progress', 'inprogress', 'status-active'],
        ['Completed', 'completed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileCrmOpportunities.enums = {
        OPPORTUNITY_STATUS: OPPORTUNITY_STATUS.enum,
        OPPORTUNITY_STATUS_VALUES: OPPORTUNITY_STATUS.values,
        OPPORTUNITY_STATUS_CLASSES: OPPORTUNITY_STATUS.classes,
        SALES_STAGE: SALES_STAGE.enum,
        SALES_STAGE_VALUES: SALES_STAGE.values,
        SALES_STAGE_CLASSES: SALES_STAGE.classes,
        THREAT_LEVEL: THREAT_LEVEL.enum,
        THREAT_LEVEL_VALUES: THREAT_LEVEL.values,
        THREAT_LEVEL_CLASSES: THREAT_LEVEL.classes,
        ACTIVITY_TYPE: ACTIVITY_TYPE.enum,
        ACTIVITY_TYPE_VALUES: ACTIVITY_TYPE.values,
        ACTIVITY_TYPE_CLASSES: ACTIVITY_TYPE.classes,
        ACTIVITY_STATUS: ACTIVITY_STATUS.enum,
        ACTIVITY_STATUS_VALUES: ACTIVITY_STATUS.values,
        ACTIVITY_STATUS_CLASSES: ACTIVITY_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCrmOpportunities.render = {
        opportunityStatus: createStatusRenderer(OPPORTUNITY_STATUS.enum, OPPORTUNITY_STATUS.classes),
        salesStage: createStatusRenderer(SALES_STAGE.enum, SALES_STAGE.classes),
        threatLevel: createStatusRenderer(THREAT_LEVEL.enum, THREAT_LEVEL.classes),
        activityType: createStatusRenderer(ACTIVITY_TYPE.enum, ACTIVITY_TYPE.classes),
        activityStatus: createStatusRenderer(ACTIVITY_STATUS.enum, ACTIVITY_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
