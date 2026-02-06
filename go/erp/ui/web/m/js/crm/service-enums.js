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
 * Mobile CRM Service Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: crm/service/service-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileCrmService = window.MobileCrmService || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const CASE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['New', 'new', 'status-pending'],
        ['In Progress', 'inprogress', 'status-active'],
        ['On Hold', 'onhold', 'status-inactive'],
        ['Escalated', 'escalated', 'status-terminated'],
        ['Resolved', 'resolved', 'status-active'],
        ['Closed', 'closed', 'status-active']
    ]);

    const CASE_PRIORITY = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'status-inactive'],
        ['Medium', 'medium', 'status-pending'],
        ['High', 'high', 'status-active'],
        ['Critical', 'critical', 'status-terminated']
    ]);

    const CASE_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Question', 'question', 'status-active'],
        ['Problem', 'problem', 'status-pending'],
        ['Feature Request', 'featurerequest', 'status-active'],
        ['Incident', 'incident', 'status-terminated']
    ]);

    const ARTICLE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Published', 'published', 'status-active'],
        ['Archived', 'archived', 'status-inactive']
    ]);

    const ESCALATION_LEVEL = factory.create([
        ['Unspecified', null, ''],
        ['Level 1', 'level1', 'status-active'],
        ['Level 2', 'level2', 'status-pending'],
        ['Level 3', 'level3', 'status-pending'],
        ['Executive', 'executive', 'status-terminated']
    ]);

    const SURVEY_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Sent', 'sent', 'status-pending'],
        ['Opened', 'opened', 'status-active'],
        ['Completed', 'completed', 'status-active'],
        ['Expired', 'expired', 'status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileCrmService.enums = {
        CASE_STATUS: CASE_STATUS.enum,
        CASE_STATUS_VALUES: CASE_STATUS.values,
        CASE_STATUS_CLASSES: CASE_STATUS.classes,
        CASE_PRIORITY: CASE_PRIORITY.enum,
        CASE_PRIORITY_VALUES: CASE_PRIORITY.values,
        CASE_PRIORITY_CLASSES: CASE_PRIORITY.classes,
        CASE_TYPE: CASE_TYPE.enum,
        CASE_TYPE_VALUES: CASE_TYPE.values,
        CASE_TYPE_CLASSES: CASE_TYPE.classes,
        ARTICLE_STATUS: ARTICLE_STATUS.enum,
        ARTICLE_STATUS_VALUES: ARTICLE_STATUS.values,
        ARTICLE_STATUS_CLASSES: ARTICLE_STATUS.classes,
        ESCALATION_LEVEL: ESCALATION_LEVEL.enum,
        ESCALATION_LEVEL_VALUES: ESCALATION_LEVEL.values,
        ESCALATION_LEVEL_CLASSES: ESCALATION_LEVEL.classes,
        SURVEY_STATUS: SURVEY_STATUS.enum,
        SURVEY_STATUS_VALUES: SURVEY_STATUS.values,
        SURVEY_STATUS_CLASSES: SURVEY_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCrmService.render = {
        caseStatus: createStatusRenderer(CASE_STATUS.enum, CASE_STATUS.classes),
        casePriority: createStatusRenderer(CASE_PRIORITY.enum, CASE_PRIORITY.classes),
        caseType: createStatusRenderer(CASE_TYPE.enum, CASE_TYPE.classes),
        articleStatus: createStatusRenderer(ARTICLE_STATUS.enum, ARTICLE_STATUS.classes),
        escalationLevel: createStatusRenderer(ESCALATION_LEVEL.enum, ESCALATION_LEVEL.classes),
        surveyStatus: createStatusRenderer(SURVEY_STATUS.enum, SURVEY_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
