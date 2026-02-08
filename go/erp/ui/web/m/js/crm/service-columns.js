/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileCrmService.enums;
    const render = MobileCrmService.render;

    MobileCrmService.columns = {
        CrmCase: [
            ...col.id('caseId'),
            ...col.col('caseNumber', 'Case #'),
            ...col.col('subject', 'Subject'),
            ...col.col('accountId', 'Account'),
            ...col.status('status', 'Status', enums.CASE_STATUS_VALUES, render.caseStatus),
            ...col.status('priority', 'Priority', enums.CASE_PRIORITY_VALUES, render.casePriority),
            ...col.status('caseType', 'Type', enums.CASE_TYPE_VALUES, render.caseType),
            ...col.date('openedDate', 'Opened')
        ],

        CrmCaseComment: [
            ...col.id('commentId'),
            ...col.col('caseId', 'Case'),
            ...col.col('body', 'Comment'),
            ...col.boolean('isPublic', 'Public'),
            ...col.date('commentDate', 'Date')
        ],

        CrmKBArticle: [
            ...col.id('articleId'),
            ...col.col('articleNumber', 'Article #'),
            ...col.col('title', 'Title'),
            ...col.col('category', 'Category'),
            ...col.status('status', 'Status', enums.ARTICLE_STATUS_VALUES, render.articleStatus),
            ...col.col('viewCount', 'Views')
        ],

        CrmSLA: [
            ...col.id('slaId'),
            ...col.col('name', 'Name'),
            ...col.col('firstResponseMinutes', 'First Response (min)'),
            ...col.col('resolutionMinutes', 'Resolution (min)'),
            ...col.boolean('isActive', 'Active')
        ],

        CrmEscalation: [
            ...col.id('escalationId'),
            ...col.col('name', 'Name'),
            ...col.status('level', 'Level', enums.ESCALATION_LEVEL_VALUES, render.escalationLevel),
            ...col.col('triggerMinutes', 'Trigger (min)'),
            ...col.boolean('isActive', 'Active')
        ],

        CrmSurvey: [
            ...col.id('surveyId'),
            ...col.col('name', 'Name'),
            ...col.col('accountId', 'Account'),
            ...col.status('status', 'Status', enums.SURVEY_STATUS_VALUES, render.surveyStatus),
            ...col.col('overallRating', 'Rating'),
            ...col.date('completedDate', 'Completed')
        ]
    };

    MobileCrmService.primaryKeys = {
        CrmCase: 'caseId', CrmCaseComment: 'commentId', CrmKBArticle: 'articleId',
        CrmSLA: 'slaId', CrmEscalation: 'escalationId', CrmSurvey: 'surveyId'
    };

})();
