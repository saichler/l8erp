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
// CRM Service Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderBoolean } = Layer8DRenderers;

    window.CrmService = window.CrmService || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const CASE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['New', 'new', 'layer8d-status-pending'],
        ['In Progress', 'progress', 'layer8d-status-active'],
        ['Waiting on Customer', 'waiting', 'layer8d-status-inactive'],
        ['Escalated', 'escalated', 'layer8d-status-terminated'],
        ['Resolved', 'resolved', 'layer8d-status-active'],
        ['Closed', 'closed', 'layer8d-status-inactive']
    ]);

    const CASE_PRIORITY = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'layer8d-status-inactive'],
        ['Medium', 'medium', 'layer8d-status-pending'],
        ['High', 'high', 'layer8d-status-active'],
        ['Critical', 'critical', 'layer8d-status-terminated']
    ]);

    const CASE_TYPE = factory.simple([
        'Unspecified', 'Question', 'Problem', 'Feature Request', 'Complaint'
    ]);

    const ARTICLE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Published', 'published', 'layer8d-status-active'],
        ['Archived', 'archived', 'layer8d-status-inactive']
    ]);

    const ESCALATION_LEVEL = factory.simple([
        'Unspecified', 'Level 1', 'Level 2', 'Level 3', 'Manager'
    ]);

    const SURVEY_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Active', 'active', 'layer8d-status-active'],
        ['Closed', 'closed', 'layer8d-status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    CrmService.enums = {
        CASE_STATUS: CASE_STATUS.enum,
        CASE_STATUS_CLASSES: CASE_STATUS.classes,
        CASE_PRIORITY: CASE_PRIORITY.enum,
        CASE_PRIORITY_CLASSES: CASE_PRIORITY.classes,
        CASE_TYPE: CASE_TYPE.enum,
        ARTICLE_STATUS: ARTICLE_STATUS.enum,
        ARTICLE_STATUS_CLASSES: ARTICLE_STATUS.classes,
        ESCALATION_LEVEL: ESCALATION_LEVEL.enum,
        SURVEY_STATUS: SURVEY_STATUS.enum,
        SURVEY_STATUS_CLASSES: SURVEY_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    CrmService.render = {
        caseStatus: createStatusRenderer(CASE_STATUS.enum, CASE_STATUS.classes),
        casePriority: createStatusRenderer(CASE_PRIORITY.enum, CASE_PRIORITY.classes),
        caseType: (v) => renderEnum(v, CASE_TYPE.enum),
        articleStatus: createStatusRenderer(ARTICLE_STATUS.enum, ARTICLE_STATUS.classes),
        escalationLevel: (v) => renderEnum(v, ESCALATION_LEVEL.enum),
        surveyStatus: createStatusRenderer(SURVEY_STATUS.enum, SURVEY_STATUS.classes),
        date: renderDate,
        boolean: renderBoolean
    };

})();
