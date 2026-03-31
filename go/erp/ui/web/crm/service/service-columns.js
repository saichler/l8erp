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

    const col = window.Layer8ColumnFactory;
    const render = CrmService.render;

    CrmService.columns = {
        CrmCase: [
            ...col.id('caseId'),
            ...col.col('caseNumber', 'Case #'),
            ...col.col('subject', 'Subject'),
            ...col.col('accountId', 'Account'),
            ...col.col('contactId', 'Contact'),
            ...col.col('ownerId', 'Owner'),
            ...col.enum('priority', 'Priority', null, render.casePriority),
            ...col.enum('caseType', 'Type', null, render.caseType),
            ...col.date('openedDate', 'Opened'),
            ...col.enum('status', 'Status', null, render.caseStatus),
        ],

        CrmKBArticle: [
            ...col.id('articleId'),
            ...col.col('articleNumber', 'Article #'),
            ...col.col('title', 'Title'),
            ...col.col('category', 'Category'),
            ...col.col('authorId', 'Author'),
            ...col.col('viewCount', 'Views'),
            ...col.boolean('isFeatured', 'Featured'),
            ...col.date('publishDate', 'Published'),
            ...col.enum('status', 'Status', null, render.articleStatus),
        ],

        CrmSLA: [
            ...col.id('slaId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.col('firstResponseMinutes', 'First Response (min)'),
            ...col.col('resolutionMinutes', 'Resolution (min)'),
            ...col.col('businessHours', 'Business Hours'),
            ...col.boolean('includeWeekends', 'Weekends'),
            ...col.boolean('isActive', 'Active'),
        ],

        CrmEscalation: [
            ...col.id('escalationId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.enum('level', 'Level', null, render.escalationLevel),
            ...col.col('triggerMinutes', 'Trigger (min)'),
            ...col.col('escalateToUserId', 'Escalate To'),
            ...col.boolean('notifyOwner', 'Notify Owner'),
            ...col.boolean('isActive', 'Active'),
        ],

        CrmSurvey: [
            ...col.id('surveyId'),
            ...col.col('name', 'Name'),
            ...col.col('surveyType', 'Type'),
            ...col.col('accountId', 'Account'),
            ...col.col('contactId', 'Contact'),
            ...col.col('overallRating', 'Rating'),
            ...col.boolean('wouldRecommend', 'Recommend'),
            ...col.date('sentDate', 'Sent'),
            ...col.enum('status', 'Status', null, render.surveyStatus),
        ]
    };

})();
