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
// CRM Leads Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney } = Layer8DRenderers;

    window.CrmLeads = window.CrmLeads || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const LEAD_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['New', 'new', 'layer8d-status-pending'],
        ['Contacted', 'contacted', 'layer8d-status-active'],
        ['Qualified', 'qualified', 'layer8d-status-active'],
        ['Unqualified', 'unqualified', 'layer8d-status-inactive'],
        ['Converted', 'converted', 'layer8d-status-active'],
        ['Lost', 'lost', 'layer8d-status-terminated']
    ]);

    const LEAD_RATING = factory.create([
        ['Unspecified', null, ''],
        ['Hot', 'hot', 'layer8d-status-active'],
        ['Warm', 'warm', 'layer8d-status-pending'],
        ['Cold', 'cold', 'layer8d-status-inactive']
    ]);

    const LEAD_SOURCE_TYPE = factory.simple([
        'Unspecified', 'Web', 'Phone', 'Email', 'Referral',
        'Trade Show', 'Partner', 'Advertising', 'Social Media'
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

    CrmLeads.enums = {
        LEAD_STATUS: LEAD_STATUS.enum,
        LEAD_STATUS_CLASSES: LEAD_STATUS.classes,
        LEAD_RATING: LEAD_RATING.enum,
        LEAD_RATING_CLASSES: LEAD_RATING.classes,
        LEAD_SOURCE_TYPE: LEAD_SOURCE_TYPE.enum,
        ACTIVITY_TYPE: ACTIVITY_TYPE.enum,
        ACTIVITY_STATUS: ACTIVITY_STATUS.enum,
        ACTIVITY_STATUS_CLASSES: ACTIVITY_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    CrmLeads.render = {
        leadStatus: createStatusRenderer(LEAD_STATUS.enum, LEAD_STATUS.classes),
        leadRating: createStatusRenderer(LEAD_RATING.enum, LEAD_RATING.classes),
        leadSourceType: (v) => renderEnum(v, LEAD_SOURCE_TYPE.enum),
        activityType: (v) => renderEnum(v, ACTIVITY_TYPE.enum),
        activityStatus: createStatusRenderer(ACTIVITY_STATUS.enum, ACTIVITY_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
