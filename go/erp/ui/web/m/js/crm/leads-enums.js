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
 * Mobile CRM Leads Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: crm/leads/leads-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileCrmLeads = window.MobileCrmLeads || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const LEAD_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['New', 'new', 'status-pending'],
        ['Contacted', 'contacted', 'status-active'],
        ['Qualified', 'qualified', 'status-active'],
        ['Unqualified', 'unqualified', 'status-inactive'],
        ['Converted', 'converted', 'status-active'],
        ['Lost', 'lost', 'status-terminated']
    ]);

    const LEAD_RATING = factory.create([
        ['Unspecified', null, ''],
        ['Hot', 'hot', 'status-active'],
        ['Warm', 'warm', 'status-pending'],
        ['Cold', 'cold', 'status-inactive']
    ]);

    const LEAD_SOURCE_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Web', 'web', 'status-active'],
        ['Phone', 'phone', 'status-active'],
        ['Email', 'email', 'status-active'],
        ['Referral', 'referral', 'status-active'],
        ['Trade Show', 'tradeshow', 'status-pending'],
        ['Partner', 'partner', 'status-active'],
        ['Advertising', 'advertising', 'status-pending'],
        ['Social Media', 'socialmedia', 'status-active']
    ]);

    const ACTIVITY_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Call', 'call', 'status-active'],
        ['Email', 'email', 'status-active'],
        ['Meeting', 'meeting', 'status-pending'],
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

    MobileCrmLeads.enums = {
        LEAD_STATUS: LEAD_STATUS.enum,
        LEAD_STATUS_VALUES: LEAD_STATUS.values,
        LEAD_STATUS_CLASSES: LEAD_STATUS.classes,
        LEAD_RATING: LEAD_RATING.enum,
        LEAD_RATING_VALUES: LEAD_RATING.values,
        LEAD_RATING_CLASSES: LEAD_RATING.classes,
        LEAD_SOURCE_TYPE: LEAD_SOURCE_TYPE.enum,
        LEAD_SOURCE_TYPE_VALUES: LEAD_SOURCE_TYPE.values,
        LEAD_SOURCE_TYPE_CLASSES: LEAD_SOURCE_TYPE.classes,
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

    MobileCrmLeads.render = {
        leadStatus: createStatusRenderer(LEAD_STATUS.enum, LEAD_STATUS.classes),
        leadRating: createStatusRenderer(LEAD_RATING.enum, LEAD_RATING.classes),
        leadSourceType: createStatusRenderer(LEAD_SOURCE_TYPE.enum, LEAD_SOURCE_TYPE.classes),
        activityType: createStatusRenderer(ACTIVITY_TYPE.enum, ACTIVITY_TYPE.classes),
        activityStatus: createStatusRenderer(ACTIVITY_STATUS.enum, ACTIVITY_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
