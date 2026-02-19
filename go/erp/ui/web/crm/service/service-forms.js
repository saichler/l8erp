/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// CRM Service Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.CrmService = window.CrmService || {};

    const f = window.Layer8FormFactory;
    const enums = CrmService.enums;

    CrmService.forms = {
        CrmCase: f.form('Case', [
            f.section('Case Details', [
                ...f.text('caseNumber', 'Case Number', true),
                ...f.text('subject', 'Subject', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('accountId', 'Account', 'CrmAccount', true),
                ...f.reference('contactId', 'Contact', 'CrmContact'),
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.select('status', 'Status', enums.CASE_STATUS),
                ...f.select('priority', 'Priority', enums.CASE_PRIORITY),
                ...f.select('caseType', 'Type', enums.CASE_TYPE)
            ]),
            f.section('SLA & Escalation', [
                ...f.reference('slaId', 'SLA', 'CrmSLA'),
                ...f.number('escalationLevel', 'Escalation Level'),
                ...f.checkbox('isEscalated', 'Escalated'),
                ...f.reference('parentCaseId', 'Parent Case', 'CrmCase')
            ]),
            f.section('Dates & Resolution', [
                ...f.date('openedDate', 'Opened Date'),
                ...f.date('dueDate', 'Due Date'),
                ...f.date('closedDate', 'Closed Date'),
                ...f.text('origin', 'Origin'),
                ...f.textarea('resolution', 'Resolution'),
                ...f.reference('productId', 'Product', 'ScmItem')
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
                ...f.text('articleNumber', 'Article Number', true),
                ...f.text('title', 'Title', true),
                ...f.textarea('summary', 'Summary'),
                ...f.textarea('body', 'Body', true),
                ...f.select('status', 'Status', enums.ARTICLE_STATUS),
                ...f.reference('authorId', 'Author', 'Employee'),
                ...f.text('keywords', 'Keywords'),
            ]),
            f.section('Categorization', [
                ...f.text('category', 'Category'),
                ...f.text('subcategory', 'Subcategory'),
                ...f.text('version', 'Version'),
                ...f.checkbox('isFeatured', 'Featured')
            ]),
            f.section('Publishing', [
                ...f.date('publishDate', 'Publish Date'),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.number('viewCount', 'View Count'),
                ...f.number('helpfulCount', 'Helpful Count'),
                ...f.number('notHelpfulCount', 'Not Helpful Count')
            ])
        ]),

        CrmSLA: f.form('Service Level Agreement', [
            f.section('SLA Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Response Times', [
                ...f.number('firstResponseMinutes', 'First Response (minutes)', true),
                ...f.number('resolutionMinutes', 'Resolution (minutes)', true),
                ...f.select('appliesToPriority', 'Applies To Priority', enums.CASE_PRIORITY)
            ]),
            f.section('Business Hours', [
                ...f.text('businessHours', 'Business Hours'),
                ...f.checkbox('includeWeekends', 'Include Weekends'),
                ...f.textarea('escalationRules', 'Escalation Rules')
            ])
        ]),

        CrmEscalation: f.form('Escalation Rule', [
            f.section('Escalation Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('level', 'Level', enums.ESCALATION_LEVEL),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Trigger & Actions', [
                ...f.number('triggerMinutes', 'Trigger After (minutes)', true),
                ...f.textarea('criteria', 'Criteria'),
                ...f.reference('escalateToUserId', 'Escalate To User', 'Employee'),
                ...f.text('escalateToQueue', 'Escalate To Queue')
            ]),
            f.section('Notifications', [
                ...f.checkbox('notifyOwner', 'Notify Owner'),
                ...f.checkbox('notifyManager', 'Notify Manager')
            ])
        ]),

        CrmSurvey: f.form('Customer Survey', [
            f.section('Survey Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('surveyType', 'Survey Type'),
                ...f.select('status', 'Status', enums.SURVEY_STATUS),
                ...f.reference('ownerId', 'Owner', 'Employee')
            ]),
            f.section('Target', [
                ...f.reference('accountId', 'Account', 'CrmAccount'),
                ...f.reference('contactId', 'Contact', 'CrmContact'),
                ...f.reference('caseId', 'Case', 'CrmCase')
            ]),
            f.section('Response', [
                ...f.date('sentDate', 'Sent Date'),
                ...f.date('completedDate', 'Completed Date'),
                ...f.number('overallRating', 'Overall Rating'),
                ...f.checkbox('wouldRecommend', 'Would Recommend'),
                ...f.textarea('feedback', 'Feedback')
            ])
        ])
    };

    CrmService.primaryKeys = {
        CrmCase: 'caseId',
        CrmKBArticle: 'articleId',
        CrmSLA: 'slaId',
        CrmEscalation: 'escalationId',
        CrmSurvey: 'surveyId'
    };

})();
