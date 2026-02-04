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
// CRM Service Module - Form Definitions

(function() {
    'use strict';

    window.CrmService = window.CrmService || {};

    const enums = CrmService.enums;

    CrmService.forms = {
        CrmCase: {
            title: 'Case',
            sections: [
                {
                    title: 'Case Details',
                    fields: [
                        { key: 'caseNumber', label: 'Case Number', type: 'text', required: true },
                        { key: 'subject', label: 'Subject', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'contactId', label: 'Contact', type: 'reference', lookupModel: 'CrmContact' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'HcmEmployee' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.CASE_STATUS },
                        { key: 'priority', label: 'Priority', type: 'select', options: enums.CASE_PRIORITY },
                        { key: 'caseType', label: 'Type', type: 'select', options: enums.CASE_TYPE }
                    ]
                },
                {
                    title: 'SLA & Escalation',
                    fields: [
                        { key: 'slaId', label: 'SLA', type: 'reference', lookupModel: 'CrmSLA' },
                        { key: 'escalationLevel', label: 'Escalation Level', type: 'number' },
                        { key: 'isEscalated', label: 'Escalated', type: 'checkbox' },
                        { key: 'parentCaseId', label: 'Parent Case', type: 'reference', lookupModel: 'CrmCase' }
                    ]
                },
                {
                    title: 'Dates & Resolution',
                    fields: [
                        { key: 'openedDate', label: 'Opened Date', type: 'date' },
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'closedDate', label: 'Closed Date', type: 'date' },
                        { key: 'origin', label: 'Origin', type: 'text' },
                        { key: 'resolution', label: 'Resolution', type: 'textarea' },
                        { key: 'productId', label: 'Product', type: 'reference', lookupModel: 'ScmItem' }
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
                        { key: 'isPublic', label: 'Public', type: 'checkbox' },
                        { key: 'createdById', label: 'Created By', type: 'reference', lookupModel: 'HcmEmployee' },
                        { key: 'commentDate', label: 'Date', type: 'date' }
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
                        { key: 'articleNumber', label: 'Article Number', type: 'text', required: true },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'summary', label: 'Summary', type: 'textarea' },
                        { key: 'body', label: 'Body', type: 'textarea', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ARTICLE_STATUS },
                        { key: 'authorId', label: 'Author', type: 'reference', lookupModel: 'HcmEmployee' }
                    ]
                },
                {
                    title: 'Categorization',
                    fields: [
                        { key: 'category', label: 'Category', type: 'text' },
                        { key: 'subcategory', label: 'Subcategory', type: 'text' },
                        { key: 'version', label: 'Version', type: 'text' },
                        { key: 'isFeatured', label: 'Featured', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Publishing',
                    fields: [
                        { key: 'publishDate', label: 'Publish Date', type: 'date' },
                        { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
                        { key: 'viewCount', label: 'View Count', type: 'number', readonly: true },
                        { key: 'helpfulCount', label: 'Helpful Count', type: 'number', readonly: true },
                        { key: 'notHelpfulCount', label: 'Not Helpful Count', type: 'number', readonly: true }
                    ]
                }
            ]
        },

        CrmSLA: {
            title: 'Service Level Agreement',
            sections: [
                {
                    title: 'SLA Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Response Times',
                    fields: [
                        { key: 'firstResponseMinutes', label: 'First Response (minutes)', type: 'number', required: true },
                        { key: 'resolutionMinutes', label: 'Resolution (minutes)', type: 'number', required: true },
                        { key: 'appliesToPriority', label: 'Applies To Priority', type: 'select', options: enums.CASE_PRIORITY }
                    ]
                },
                {
                    title: 'Business Hours',
                    fields: [
                        { key: 'businessHours', label: 'Business Hours', type: 'text' },
                        { key: 'includeWeekends', label: 'Include Weekends', type: 'checkbox' },
                        { key: 'escalationRules', label: 'Escalation Rules', type: 'textarea' }
                    ]
                }
            ]
        },

        CrmEscalation: {
            title: 'Escalation Rule',
            sections: [
                {
                    title: 'Escalation Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'level', label: 'Level', type: 'select', options: enums.ESCALATION_LEVEL },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Trigger & Actions',
                    fields: [
                        { key: 'triggerMinutes', label: 'Trigger After (minutes)', type: 'number', required: true },
                        { key: 'criteria', label: 'Criteria', type: 'textarea' },
                        { key: 'escalateToUserId', label: 'Escalate To User', type: 'reference', lookupModel: 'HcmEmployee' },
                        { key: 'escalateToQueue', label: 'Escalate To Queue', type: 'text' }
                    ]
                },
                {
                    title: 'Notifications',
                    fields: [
                        { key: 'notifyOwner', label: 'Notify Owner', type: 'checkbox' },
                        { key: 'notifyManager', label: 'Notify Manager', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmSurvey: {
            title: 'Customer Survey',
            sections: [
                {
                    title: 'Survey Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'surveyType', label: 'Survey Type', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.SURVEY_STATUS },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'HcmEmployee' }
                    ]
                },
                {
                    title: 'Target',
                    fields: [
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount' },
                        { key: 'contactId', label: 'Contact', type: 'reference', lookupModel: 'CrmContact' },
                        { key: 'caseId', label: 'Case', type: 'reference', lookupModel: 'CrmCase' }
                    ]
                },
                {
                    title: 'Response',
                    fields: [
                        { key: 'sentDate', label: 'Sent Date', type: 'date' },
                        { key: 'completedDate', label: 'Completed Date', type: 'date' },
                        { key: 'overallRating', label: 'Overall Rating', type: 'number' },
                        { key: 'wouldRecommend', label: 'Would Recommend', type: 'checkbox' },
                        { key: 'feedback', label: 'Feedback', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    CrmService.primaryKeys = {
        CrmCase: 'caseId',
        CrmCaseComment: 'commentId',
        CrmKBArticle: 'articleId',
        CrmSLA: 'slaId',
        CrmEscalation: 'escalationId',
        CrmSurvey: 'surveyId'
    };

})();
