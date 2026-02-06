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
// CRM Opportunities Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney } = Layer8DRenderers;

    window.CrmOpportunities = window.CrmOpportunities || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const OPPORTUNITY_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Open', 'open', 'layer8d-status-active'],
        ['Won', 'won', 'layer8d-status-active'],
        ['Lost', 'lost', 'layer8d-status-terminated'],
        ['On Hold', 'hold', 'layer8d-status-inactive'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    const SALES_STAGE = factory.create([
        ['Unspecified', null, ''],
        ['Prospecting', 'prospecting', 'layer8d-status-pending'],
        ['Qualification', 'qualification', 'layer8d-status-pending'],
        ['Needs Analysis', 'needs', 'layer8d-status-active'],
        ['Value Proposition', 'value', 'layer8d-status-active'],
        ['Decision Makers', 'decision', 'layer8d-status-active'],
        ['Proposal', 'proposal', 'layer8d-status-active'],
        ['Negotiation', 'negotiation', 'layer8d-status-active'],
        ['Closed Won', 'won', 'layer8d-status-active'],
        ['Closed Lost', 'lost', 'layer8d-status-terminated']
    ]);

    const THREAT_LEVEL = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'layer8d-status-active'],
        ['Medium', 'medium', 'layer8d-status-pending'],
        ['High', 'high', 'layer8d-status-terminated']
    ]);

    const ACTIVITY_TYPE = factory.simple([
        'Unspecified', 'Call', 'Email', 'Meeting', 'Demo',
        'Proposal', 'Follow Up', 'Task', 'Note'
    ]);

    const ACTIVITY_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Planned', 'planned', 'layer8d-status-pending'],
        ['In Progress', 'progress', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    CrmOpportunities.enums = {
        OPPORTUNITY_STATUS: OPPORTUNITY_STATUS.enum,
        OPPORTUNITY_STATUS_CLASSES: OPPORTUNITY_STATUS.classes,
        SALES_STAGE: SALES_STAGE.enum,
        SALES_STAGE_CLASSES: SALES_STAGE.classes,
        THREAT_LEVEL: THREAT_LEVEL.enum,
        THREAT_LEVEL_CLASSES: THREAT_LEVEL.classes,
        ACTIVITY_TYPE: ACTIVITY_TYPE.enum,
        ACTIVITY_STATUS: ACTIVITY_STATUS.enum,
        ACTIVITY_STATUS_CLASSES: ACTIVITY_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    CrmOpportunities.render = {
        opportunityStatus: createStatusRenderer(OPPORTUNITY_STATUS.enum, OPPORTUNITY_STATUS.classes),
        salesStage: createStatusRenderer(SALES_STAGE.enum, SALES_STAGE.classes),
        threatLevel: createStatusRenderer(THREAT_LEVEL.enum, THREAT_LEVEL.classes),
        activityType: (v) => renderEnum(v, ACTIVITY_TYPE.enum),
        activityStatus: createStatusRenderer(ACTIVITY_STATUS.enum, ACTIVITY_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
