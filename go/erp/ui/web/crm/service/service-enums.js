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
// CRM Service Module - Enum Definitions

(function() {
    'use strict';

    window.CrmService = window.CrmService || {};
    CrmService.enums = {};

    // CASE STATUS
    CrmService.enums.CASE_STATUS = {
        0: 'Unspecified',
        1: 'New',
        2: 'In Progress',
        3: 'Waiting on Customer',
        4: 'Escalated',
        5: 'Resolved',
        6: 'Closed'
    };

    CrmService.enums.CASE_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-active',
        6: 'layer8d-status-inactive'
    };

    // CASE PRIORITY
    CrmService.enums.CASE_PRIORITY = {
        0: 'Unspecified',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Critical'
    };

    CrmService.enums.CASE_PRIORITY_CLASSES = {
        1: 'layer8d-status-inactive',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // CASE TYPE
    CrmService.enums.CASE_TYPE = {
        0: 'Unspecified',
        1: 'Question',
        2: 'Problem',
        3: 'Feature Request',
        4: 'Complaint'
    };

    CrmService.enums.CASE_TYPE_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-terminated',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // ARTICLE STATUS
    CrmService.enums.ARTICLE_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Published',
        3: 'Archived'
    };

    CrmService.enums.ARTICLE_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive'
    };

    // ESCALATION LEVEL
    CrmService.enums.ESCALATION_LEVEL = {
        0: 'Unspecified',
        1: 'Level 1',
        2: 'Level 2',
        3: 'Level 3',
        4: 'Manager'
    };

    CrmService.enums.ESCALATION_LEVEL_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // SURVEY STATUS
    CrmService.enums.SURVEY_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Active',
        3: 'Closed'
    };

    CrmService.enums.SURVEY_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive'
    };

    // RENDERERS
    CrmService.render = {};

    CrmService.render.caseStatus = Layer8DRenderers.createStatusRenderer(
        CrmService.enums.CASE_STATUS,
        CrmService.enums.CASE_STATUS_CLASSES
    );

    CrmService.render.casePriority = Layer8DRenderers.createStatusRenderer(
        CrmService.enums.CASE_PRIORITY,
        CrmService.enums.CASE_PRIORITY_CLASSES
    );

    CrmService.render.caseType = Layer8DRenderers.createStatusRenderer(
        CrmService.enums.CASE_TYPE,
        CrmService.enums.CASE_TYPE_CLASSES
    );

    CrmService.render.articleStatus = Layer8DRenderers.createStatusRenderer(
        CrmService.enums.ARTICLE_STATUS,
        CrmService.enums.ARTICLE_STATUS_CLASSES
    );

    CrmService.render.escalationLevel = Layer8DRenderers.createStatusRenderer(
        CrmService.enums.ESCALATION_LEVEL,
        CrmService.enums.ESCALATION_LEVEL_CLASSES
    );

    CrmService.render.surveyStatus = Layer8DRenderers.createStatusRenderer(
        CrmService.enums.SURVEY_STATUS,
        CrmService.enums.SURVEY_STATUS_CLASSES
    );

    CrmService.render.date = Layer8DRenderers.renderDate;
    CrmService.render.boolean = Layer8DRenderers.renderBoolean;

})();
