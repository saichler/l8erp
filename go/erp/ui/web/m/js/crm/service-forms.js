/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const enums = MobileCrmService.enums;

    MobileCrmService.forms = {
        CrmCase: {
            title: 'Case',
            sections: [
                {
                    title: 'Case Details',
                    fields: [
                        { key: 'caseNumber', label: 'Case Number', type: 'text' },
                        { key: 'subject', label: 'Subject', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'contactId', label: 'Contact', type: 'reference', lookupModel: 'CrmContact' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.CASE_STATUS },
                        { key: 'priority', label: 'Priority', type: 'select', options: enums.CASE_PRIORITY },
                        { key: 'caseType', label: 'Type', type: 'select', options: enums.CASE_TYPE },
                        { key: 'slaId', label: 'SLA', type: 'reference', lookupModel: 'CrmSLA' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'resolution', label: 'Resolution', type: 'textarea' }
                    ]
                }
            ]
        },

        CrmCaseComment: {
            title: 'Case Comment',
            sections: [
                {
                    title: 'Comment Details',
                    fields: [
                        { key: 'caseId', label: 'Case', type: 'reference', lookupModel: 'CrmCase', required: true },
                        { key: 'body', label: 'Comment', type: 'textarea', required: true },
                        { key: 'isPublic', label: 'Public', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmKBArticle: {
            title: 'Knowledge Base Article',
            sections: [
                {
                    title: 'Article Details',
                    fields: [
                        { key: 'articleNumber', label: 'Article Number', type: 'text' },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'summary', label: 'Summary', type: 'textarea' },
                        { key: 'body', label: 'Body', type: 'textarea', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ARTICLE_STATUS },
                        { key: 'category', label: 'Category', type: 'text' },
                        { key: 'subcategory', label: 'Subcategory', type: 'text' },
                        { key: 'authorId', label: 'Author', type: 'reference', lookupModel: 'Employee' },
                        { key: 'publishDate', label: 'Publish Date', type: 'date' },
                        { key: 'isFeatured', label: 'Featured', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmSLA: {
            title: 'SLA',
            sections: [
                {
                    title: 'SLA Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'firstResponseMinutes', label: 'First Response (min)', type: 'number', required: true },
                        { key: 'resolutionMinutes', label: 'Resolution (min)', type: 'number', required: true },
                        { key: 'businessHours', label: 'Business Hours', type: 'text' },
                        { key: 'includeWeekends', label: 'Include Weekends', type: 'checkbox' },
                        { key: 'appliesToPriority', label: 'Applies To Priority', type: 'select', options: enums.CASE_PRIORITY },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmEscalation: {
            title: 'Escalation',
            sections: [
                {
                    title: 'Escalation Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'level', label: 'Level', type: 'select', options: enums.ESCALATION_LEVEL, required: true },
                        { key: 'triggerMinutes', label: 'Trigger After (min)', type: 'number', required: true },
                        { key: 'escalateToUserId', label: 'Escalate To', type: 'reference', lookupModel: 'Employee' },
                        { key: 'escalateToQueue', label: 'Escalate To Queue', type: 'text' },
                        { key: 'notifyOwner', label: 'Notify Owner', type: 'checkbox' },
                        { key: 'notifyManager', label: 'Notify Manager', type: 'checkbox' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmSurvey: {
            title: 'Survey',
            sections: [
                {
                    title: 'Survey Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'contactId', label: 'Contact', type: 'reference', lookupModel: 'CrmContact' },
                        { key: 'caseId', label: 'Case', type: 'reference', lookupModel: 'CrmCase' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.SURVEY_STATUS },
                        { key: 'overallRating', label: 'Overall Rating', type: 'number' },
                        { key: 'feedback', label: 'Feedback', type: 'textarea' },
                        { key: 'wouldRecommend', label: 'Would Recommend', type: 'checkbox' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
                    ]
                }
            ]
        }
    };

})();
