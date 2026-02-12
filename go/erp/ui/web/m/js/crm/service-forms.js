/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
// Uses Layer8FormFactory for reduced boilerplate
(function() {
    'use strict';

    window.MobileCrmService = window.MobileCrmService || {};
    const f = window.Layer8FormFactory;
    const enums = MobileCrmService.enums;

    MobileCrmService.forms = {
        CrmCase: f.form('Case', [
            f.section('Case Details', [
                ...f.text('caseNumber', 'Case Number'),
                ...f.text('subject', 'Subject', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.reference('contactId', 'Contact', 'CrmContact'),
                ...f.select('status', 'Status', enums.CASE_STATUS),
                ...f.select('priority', 'Priority', enums.CASE_PRIORITY),
                ...f.select('caseType', 'Type', enums.CASE_TYPE),
                ...f.reference('slaId', 'SLA', 'CrmSLA'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.textarea('resolution', 'Resolution')
            ]),
            f.section('Comments', [
                ...f.inlineTable('comments', 'Case Comments', [
                    { key: 'commentId', label: 'ID', hidden: true },
                    { key: 'body', label: 'Comment', type: 'text', required: true },
                    { key: 'isPublic', label: 'Public', type: 'checkbox' },
                    { key: 'createdById', label: 'Created By', type: 'reference', lookupModel: 'Employee' },
                    { key: 'commentDate', label: 'Date', type: 'date' }
                ])
            ])
        ]),

        CrmKBArticle: f.form('Knowledge Base Article', [
            f.section('Article Details', [
                ...f.text('articleNumber', 'Article Number'),
                ...f.text('title', 'Title', true),
                ...f.textarea('summary', 'Summary'),
                ...f.textarea('body', 'Body', true),
                ...f.select('status', 'Status', enums.ARTICLE_STATUS),
                ...f.text('category', 'Category'),
                ...f.text('subcategory', 'Subcategory'),
                ...f.reference('authorId', 'Author', 'Employee'),
                ...f.date('publishDate', 'Publish Date'),
                ...f.checkbox('isFeatured', 'Featured')
            ])
        ]),

        CrmSLA: f.form('SLA', [
            f.section('SLA Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.number('firstResponseMinutes', 'First Response (min)', true),
                ...f.number('resolutionMinutes', 'Resolution (min)', true),
                ...f.text('businessHours', 'Business Hours'),
                ...f.checkbox('includeWeekends', 'Include Weekends'),
                ...f.select('appliesToPriority', 'Applies To Priority', enums.CASE_PRIORITY),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        CrmEscalation: f.form('Escalation', [
            f.section('Escalation Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('level', 'Level', enums.ESCALATION_LEVEL, true),
                ...f.number('triggerMinutes', 'Trigger After (min)', true),
                ...f.reference('escalateToUserId', 'Escalate To', 'Employee'),
                ...f.text('escalateToQueue', 'Escalate To Queue'),
                ...f.checkbox('notifyOwner', 'Notify Owner'),
                ...f.checkbox('notifyManager', 'Notify Manager'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        CrmSurvey: f.form('Survey', [
            f.section('Survey Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.reference('contactId', 'Contact', 'CrmContact'),
                ...f.reference('caseId', 'Case', 'CrmCase'),
                ...f.select('status', 'Status', enums.SURVEY_STATUS),
                ...f.number('overallRating', 'Overall Rating'),
                ...f.textarea('feedback', 'Feedback'),
                ...f.checkbox('wouldRecommend', 'Would Recommend'),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ])
        ])
    };

})();
