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
// CRM Service Module - Column Configurations

(function() {
    'use strict';

    window.CrmService = window.CrmService || {};

    const { renderDate, renderBoolean } = Layer8DRenderers;
    const render = CrmService.render;

    CrmService.columns = {
        CrmCase: [
            { key: 'caseId', label: 'ID', sortKey: 'caseId', filterKey: 'caseId' },
            { key: 'caseNumber', label: 'Case #', sortKey: 'caseNumber', filterKey: 'caseNumber' },
            { key: 'subject', label: 'Subject', sortKey: 'subject', filterKey: 'subject' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            { key: 'contactId', label: 'Contact', sortKey: 'contactId' },
            { key: 'ownerId', label: 'Owner', sortKey: 'ownerId' },
            {
                key: 'priority',
                label: 'Priority',
                sortKey: 'priority',
                render: (item) => render.casePriority(item.priority)
            },
            {
                key: 'caseType',
                label: 'Type',
                sortKey: 'caseType',
                render: (item) => render.caseType(item.caseType)
            },
            {
                key: 'openedDate',
                label: 'Opened',
                sortKey: 'openedDate',
                render: (item) => renderDate(item.openedDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.caseStatus(item.status)
            }
        ],

        CrmCaseComment: [
            { key: 'commentId', label: 'ID', sortKey: 'commentId', filterKey: 'commentId' },
            { key: 'caseId', label: 'Case', sortKey: 'caseId', filterKey: 'caseId' },
            { key: 'body', label: 'Comment', sortKey: 'body' },
            { key: 'createdById', label: 'Created By', sortKey: 'createdById' },
            {
                key: 'isPublic',
                label: 'Public',
                sortKey: 'isPublic',
                render: (item) => renderBoolean(item.isPublic)
            },
            {
                key: 'commentDate',
                label: 'Date',
                sortKey: 'commentDate',
                render: (item) => renderDate(item.commentDate)
            }
        ],

        CrmKBArticle: [
            { key: 'articleId', label: 'ID', sortKey: 'articleId', filterKey: 'articleId' },
            { key: 'articleNumber', label: 'Article #', sortKey: 'articleNumber', filterKey: 'articleNumber' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'category', label: 'Category', sortKey: 'category', filterKey: 'category' },
            { key: 'authorId', label: 'Author', sortKey: 'authorId' },
            { key: 'viewCount', label: 'Views', sortKey: 'viewCount' },
            {
                key: 'isFeatured',
                label: 'Featured',
                sortKey: 'isFeatured',
                render: (item) => renderBoolean(item.isFeatured)
            },
            {
                key: 'publishDate',
                label: 'Published',
                sortKey: 'publishDate',
                render: (item) => renderDate(item.publishDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.articleStatus(item.status)
            }
        ],

        CrmSLA: [
            { key: 'slaId', label: 'ID', sortKey: 'slaId', filterKey: 'slaId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'firstResponseMinutes', label: 'First Response (min)', sortKey: 'firstResponseMinutes' },
            { key: 'resolutionMinutes', label: 'Resolution (min)', sortKey: 'resolutionMinutes' },
            { key: 'businessHours', label: 'Business Hours', sortKey: 'businessHours' },
            {
                key: 'includeWeekends',
                label: 'Weekends',
                sortKey: 'includeWeekends',
                render: (item) => renderBoolean(item.includeWeekends)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        CrmEscalation: [
            { key: 'escalationId', label: 'ID', sortKey: 'escalationId', filterKey: 'escalationId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            {
                key: 'level',
                label: 'Level',
                sortKey: 'level',
                render: (item) => render.escalationLevel(item.level)
            },
            { key: 'triggerMinutes', label: 'Trigger (min)', sortKey: 'triggerMinutes' },
            { key: 'escalateToUserId', label: 'Escalate To', sortKey: 'escalateToUserId' },
            {
                key: 'notifyOwner',
                label: 'Notify Owner',
                sortKey: 'notifyOwner',
                render: (item) => renderBoolean(item.notifyOwner)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        CrmSurvey: [
            { key: 'surveyId', label: 'ID', sortKey: 'surveyId', filterKey: 'surveyId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'surveyType', label: 'Type', sortKey: 'surveyType', filterKey: 'surveyType' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId' },
            { key: 'contactId', label: 'Contact', sortKey: 'contactId' },
            { key: 'overallRating', label: 'Rating', sortKey: 'overallRating' },
            {
                key: 'wouldRecommend',
                label: 'Recommend',
                sortKey: 'wouldRecommend',
                render: (item) => renderBoolean(item.wouldRecommend)
            },
            {
                key: 'sentDate',
                label: 'Sent',
                sortKey: 'sentDate',
                render: (item) => renderDate(item.sentDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.surveyStatus(item.status)
            }
        ]
    };

})();
