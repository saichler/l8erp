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
 * Shared Reference Data - CRM Models
 * Used by both desktop and mobile reference registries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    window.ReferenceDataCrm = {
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
        ...ref.simple('CrmLeadSource', 'sourceId', 'name'),
        ...ref.simple('CrmLeadScore', 'scoreId', 'name'),
        ...ref.simple('CrmLeadAssign', 'assignmentId', 'name'),

        // ========================================
        // CRM - Opportunities Management
        // ========================================
        ...ref.simple('CrmOpportunity', 'opportunityId', 'name', 'Opportunity'),
        ...ref.simple('CrmOppStage', 'stageId', 'name'),

        // ========================================
        // CRM - Accounts Management
        // ========================================
        ...ref.simple('CrmAccount', 'accountId', 'name', 'Account'),
        ...ref.person('CrmContact', 'contactId'),
        ...ref.simple('CrmInteraction', 'interactionId', 'subject'),
        ...ref.idOnly('CrmRelationship', 'relationshipId'),

        // ========================================
        // CRM - Marketing Management
        // ========================================
        ...ref.simple('CrmCampaign', 'campaignId', 'name', 'Campaign'),
        ...ref.simple('CrmEmailTemplate', 'templateId', 'name'),
        ...ref.simple('CrmMarketingList', 'listId', 'name'),

        // ========================================
        // CRM - Customer Service
        // ========================================
        ...ref.coded('CrmCase', 'caseId', 'caseNumber', 'subject'),
        ...ref.coded('CrmKBArticle', 'articleId', 'articleNumber', 'title'),
        ...ref.simple('CrmSLA', 'slaId', 'name'),
        ...ref.simple('CrmEscalation', 'escalationId', 'name'),
        ...ref.simple('CrmSurvey', 'surveyId', 'name'),

        // ========================================
        // CRM - Field Service
        // ========================================
        ...ref.simple('CrmServiceOrder', 'orderId', 'orderNumber', 'Service Order'),
        ...ref.simple('CrmTechnician', 'technicianId', 'name', 'Technician'),
        ...ref.simple('CrmServiceContract', 'contractId', 'contractNumber', 'Service Contract'),
        ...ref.idOnly('CrmServiceSchedule', 'scheduleId')
    };
})();
