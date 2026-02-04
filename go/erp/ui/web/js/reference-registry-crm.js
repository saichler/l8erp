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
/**
 * ERP Reference Registry - CRM Models
 * Registers Leads, Opportunities, Accounts, Marketing, Service, and Field Service models.
 */
Layer8DReferenceRegistry.register({
    // ========================================
    // CRM - Leads Management
    // ========================================
    CrmLead: {
        idColumn: 'leadId',
        displayColumn: 'lastName',
        selectColumns: ['leadId', 'firstName', 'lastName', 'company'],
        displayFormat: function(item) {
            return item.firstName + ' ' + item.lastName + (item.company ? ' (' + item.company + ')' : '');
        },
        displayLabel: 'Lead'
    },
    CrmLeadSource: {
        idColumn: 'sourceId',
        displayColumn: 'name'
    },
    CrmLeadScore: {
        idColumn: 'scoreId',
        displayColumn: 'name'
    },
    CrmLeadActivity: {
        idColumn: 'activityId',
        displayColumn: 'subject'
    },
    CrmLeadAssign: {
        idColumn: 'assignmentId',
        displayColumn: 'name'
    },
    CrmLeadConversion: {
        idColumn: 'conversionId',
        displayColumn: 'conversionId'
    },

    // ========================================
    // CRM - Opportunities Management
    // ========================================
    CrmOpportunity: {
        idColumn: 'opportunityId',
        displayColumn: 'name',
        selectColumns: ['opportunityId', 'name'],
        displayLabel: 'Opportunity'
    },
    CrmOppStage: {
        idColumn: 'stageId',
        displayColumn: 'name'
    },
    CrmOppCompetitor: {
        idColumn: 'competitorId',
        displayColumn: 'competitorName'
    },
    CrmOppProduct: {
        idColumn: 'oppProductId',
        displayColumn: 'oppProductId'
    },
    CrmOppTeam: {
        idColumn: 'teamMemberId',
        displayColumn: 'teamMemberId'
    },
    CrmOppActivity: {
        idColumn: 'activityId',
        displayColumn: 'subject'
    },

    // ========================================
    // CRM - Accounts Management
    // ========================================
    CrmAccount: {
        idColumn: 'accountId',
        displayColumn: 'name',
        selectColumns: ['accountId', 'name'],
        displayLabel: 'Account'
    },
    CrmContact: {
        idColumn: 'contactId',
        displayColumn: 'lastName',
        selectColumns: ['contactId', 'firstName', 'lastName'],
        displayFormat: function(item) {
            return item.firstName + ' ' + item.lastName;
        },
        displayLabel: 'Contact'
    },
    CrmInteraction: {
        idColumn: 'interactionId',
        displayColumn: 'subject'
    },
    CrmRelationship: {
        idColumn: 'relationshipId',
        displayColumn: 'relationshipId'
    },
    CrmHealthScore: {
        idColumn: 'healthScoreId',
        displayColumn: 'healthScoreId'
    },
    CrmAccountPlan: {
        idColumn: 'planId',
        displayColumn: 'name'
    },

    // ========================================
    // CRM - Marketing Management
    // ========================================
    CrmCampaign: {
        idColumn: 'campaignId',
        displayColumn: 'name',
        selectColumns: ['campaignId', 'name'],
        displayLabel: 'Campaign'
    },
    CrmCampaignMember: {
        idColumn: 'memberId',
        displayColumn: 'memberId'
    },
    CrmEmailTemplate: {
        idColumn: 'templateId',
        displayColumn: 'name'
    },
    CrmMarketingList: {
        idColumn: 'listId',
        displayColumn: 'name'
    },
    CrmCampaignResponse: {
        idColumn: 'responseId',
        displayColumn: 'responseId'
    },
    CrmCampaignROI: {
        idColumn: 'roiId',
        displayColumn: 'roiId'
    },

    // ========================================
    // CRM - Customer Service
    // ========================================
    CrmCase: {
        idColumn: 'caseId',
        displayColumn: 'subject',
        selectColumns: ['caseId', 'caseNumber', 'subject'],
        displayFormat: function(item) {
            return item.caseNumber + ' - ' + item.subject;
        },
        displayLabel: 'Case'
    },
    CrmCaseComment: {
        idColumn: 'commentId',
        displayColumn: 'commentId'
    },
    CrmKBArticle: {
        idColumn: 'articleId',
        displayColumn: 'title',
        selectColumns: ['articleId', 'articleNumber', 'title'],
        displayFormat: function(item) {
            return item.articleNumber + ' - ' + item.title;
        },
        displayLabel: 'KB Article'
    },
    CrmSLA: {
        idColumn: 'slaId',
        displayColumn: 'name'
    },
    CrmEscalation: {
        idColumn: 'escalationId',
        displayColumn: 'name'
    },
    CrmSurvey: {
        idColumn: 'surveyId',
        displayColumn: 'name'
    },

    // ========================================
    // CRM - Field Service
    // ========================================
    CrmServiceOrder: {
        idColumn: 'orderId',
        displayColumn: 'orderNumber',
        selectColumns: ['orderId', 'orderNumber'],
        displayLabel: 'Service Order'
    },
    CrmTechnician: {
        idColumn: 'technicianId',
        displayColumn: 'name',
        selectColumns: ['technicianId', 'name'],
        displayLabel: 'Technician'
    },
    CrmServiceContract: {
        idColumn: 'contractId',
        displayColumn: 'contractNumber',
        selectColumns: ['contractId', 'contractNumber'],
        displayLabel: 'Service Contract'
    },
    CrmServiceSchedule: {
        idColumn: 'scheduleId',
        displayColumn: 'scheduleId'
    },
    CrmServicePart: {
        idColumn: 'partId',
        displayColumn: 'itemName'
    },
    CrmServiceVisit: {
        idColumn: 'visitId',
        displayColumn: 'visitId'
    }
});
