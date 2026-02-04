/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const enums = MobileCrmService.enums;
    const render = MobileCrmService.render;

    MobileCrmService.columns = {
        CrmCase: [
            { key: 'caseId', label: 'ID', sortKey: 'caseId', filterKey: 'caseId' },
            { key: 'caseNumber', label: 'Case #', sortKey: 'caseNumber', filterKey: 'caseNumber' },
            { key: 'subject', label: 'Subject', sortKey: 'subject', filterKey: 'subject' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.CASE_STATUS_VALUES, render: (item) => render.caseStatus(item.status) },
            { key: 'priority', label: 'Priority', sortKey: 'priority', enumValues: enums.CASE_PRIORITY_VALUES, render: (item) => render.casePriority(item.priority) },
            { key: 'caseType', label: 'Type', sortKey: 'caseType', enumValues: enums.CASE_TYPE_VALUES, render: (item) => render.caseType(item.caseType) },
            { key: 'openedDate', label: 'Opened', sortKey: 'openedDate', render: (item) => Layer8MRenderers.renderDate(item.openedDate) }
        ],

        CrmCaseComment: [
            { key: 'commentId', label: 'ID', sortKey: 'commentId', filterKey: 'commentId' },
            { key: 'caseId', label: 'Case', sortKey: 'caseId', filterKey: 'caseId' },
            { key: 'body', label: 'Comment', sortKey: 'body' },
            { key: 'isPublic', label: 'Public', sortKey: 'isPublic', render: (item) => item.isPublic ? 'Yes' : 'No' },
            { key: 'commentDate', label: 'Date', sortKey: 'commentDate', render: (item) => Layer8MRenderers.renderDate(item.commentDate) }
        ],

        CrmKBArticle: [
            { key: 'articleId', label: 'ID', sortKey: 'articleId', filterKey: 'articleId' },
            { key: 'articleNumber', label: 'Article #', sortKey: 'articleNumber', filterKey: 'articleNumber' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'category', label: 'Category', sortKey: 'category', filterKey: 'category' },
            { key: 'status', label: 'Status', sortKey: 'status', enumValues: enums.ARTICLE_STATUS_VALUES, render: (item) => render.articleStatus(item.status) },
            { key: 'viewCount', label: 'Views', sortKey: 'viewCount' }
        ],

        CrmSLA: [
            { key: 'slaId', label: 'ID', sortKey: 'slaId', filterKey: 'slaId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'firstResponseMinutes', label: 'First Response (min)', sortKey: 'firstResponseMinutes' },
            { key: 'resolutionMinutes', label: 'Resolution (min)', sortKey: 'resolutionMinutes' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        CrmEscalation: [
            { key: 'escalationId', label: 'ID', sortKey: 'escalationId', filterKey: 'escalationId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'level', label: 'Level', sortKey: 'level', enumValues: enums.ESCALATION_LEVEL_VALUES, render: (item) => render.escalationLevel(item.level) },
            { key: 'triggerMinutes', label: 'Trigger (min)', sortKey: 'triggerMinutes' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => item.isActive ? 'Yes' : 'No' }
        ],

        CrmSurvey: [
            { key: 'surveyId', label: 'ID', sortKey: 'surveyId', filterKey: 'surveyId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            { key: 'status', label: 'Status', sortKey: 'status', enumValues: enums.SURVEY_STATUS_VALUES, render: (item) => render.surveyStatus(item.status) },
            { key: 'overallRating', label: 'Rating', sortKey: 'overallRating' },
            { key: 'completedDate', label: 'Completed', sortKey: 'completedDate', render: (item) => Layer8MRenderers.renderDate(item.completedDate) }
        ]
    };

    MobileCrmService.primaryKeys = {
        CrmCase: 'caseId', CrmCaseComment: 'commentId', CrmKBArticle: 'articleId',
        CrmSLA: 'slaId', CrmEscalation: 'escalationId', CrmSurvey: 'surveyId'
    };

})();
