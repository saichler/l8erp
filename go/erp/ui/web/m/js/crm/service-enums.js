/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    window.MobileCrmService = window.MobileCrmService || {};
    MobileCrmService.enums = {};

    // CASE STATUS
    MobileCrmService.enums.CASE_STATUS = {
        0: 'Unspecified', 1: 'New', 2: 'In Progress', 3: 'On Hold', 4: 'Escalated', 5: 'Resolved', 6: 'Closed'
    };
    MobileCrmService.enums.CASE_STATUS_VALUES = {
        'new': 1, 'inprogress': 2, 'onhold': 3, 'escalated': 4, 'resolved': 5, 'closed': 6
    };
    MobileCrmService.enums.CASE_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-inactive', 4: 'status-terminated', 5: 'status-active', 6: 'status-active'
    };

    // CASE PRIORITY
    MobileCrmService.enums.CASE_PRIORITY = {
        0: 'Unspecified', 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Critical'
    };
    MobileCrmService.enums.CASE_PRIORITY_VALUES = {
        'low': 1, 'medium': 2, 'high': 3, 'critical': 4
    };
    MobileCrmService.enums.CASE_PRIORITY_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-active', 4: 'status-terminated'
    };

    // CASE TYPE
    MobileCrmService.enums.CASE_TYPE = {
        0: 'Unspecified', 1: 'Question', 2: 'Problem', 3: 'Feature Request', 4: 'Incident'
    };
    MobileCrmService.enums.CASE_TYPE_VALUES = {
        'question': 1, 'problem': 2, 'featurerequest': 3, 'incident': 4
    };
    MobileCrmService.enums.CASE_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-pending', 3: 'status-active', 4: 'status-terminated'
    };

    // ARTICLE STATUS
    MobileCrmService.enums.ARTICLE_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Published', 3: 'Archived'
    };
    MobileCrmService.enums.ARTICLE_STATUS_VALUES = {
        'draft': 1, 'published': 2, 'archived': 3
    };
    MobileCrmService.enums.ARTICLE_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-inactive'
    };

    // ESCALATION LEVEL
    MobileCrmService.enums.ESCALATION_LEVEL = {
        0: 'Unspecified', 1: 'Level 1', 2: 'Level 2', 3: 'Level 3', 4: 'Executive'
    };
    MobileCrmService.enums.ESCALATION_LEVEL_VALUES = {
        'level1': 1, 'level2': 2, 'level3': 3, 'executive': 4
    };
    MobileCrmService.enums.ESCALATION_LEVEL_CLASSES = {
        1: 'status-active', 2: 'status-pending', 3: 'status-pending', 4: 'status-terminated'
    };

    // SURVEY STATUS
    MobileCrmService.enums.SURVEY_STATUS = {
        0: 'Unspecified', 1: 'Sent', 2: 'Opened', 3: 'Completed', 4: 'Expired'
    };
    MobileCrmService.enums.SURVEY_STATUS_VALUES = {
        'sent': 1, 'opened': 2, 'completed': 3, 'expired': 4
    };
    MobileCrmService.enums.SURVEY_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-inactive'
    };

    // RENDER FUNCTIONS
    MobileCrmService.render = {
        caseStatus: Layer8MRenderers.createStatusRenderer(MobileCrmService.enums.CASE_STATUS, MobileCrmService.enums.CASE_STATUS_CLASSES),
        casePriority: Layer8MRenderers.createStatusRenderer(MobileCrmService.enums.CASE_PRIORITY, MobileCrmService.enums.CASE_PRIORITY_CLASSES),
        caseType: Layer8MRenderers.createStatusRenderer(MobileCrmService.enums.CASE_TYPE, MobileCrmService.enums.CASE_TYPE_CLASSES),
        articleStatus: Layer8MRenderers.createStatusRenderer(MobileCrmService.enums.ARTICLE_STATUS, MobileCrmService.enums.ARTICLE_STATUS_CLASSES),
        escalationLevel: Layer8MRenderers.createStatusRenderer(MobileCrmService.enums.ESCALATION_LEVEL, MobileCrmService.enums.ESCALATION_LEVEL_CLASSES),
        surveyStatus: Layer8MRenderers.createStatusRenderer(MobileCrmService.enums.SURVEY_STATUS, MobileCrmService.enums.SURVEY_STATUS_CLASSES),
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
