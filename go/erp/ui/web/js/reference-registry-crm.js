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
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refCrm = window.Layer8RefFactory;

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
    ...refCrm.batch([
        ['CrmLeadSource', 'sourceId', 'name'],
        ['CrmLeadScore', 'scoreId', 'name'],
        ['CrmLeadAssign', 'assignmentId', 'name']
    ]),

    // ========================================
    // CRM - Opportunities Management
    // ========================================
    ...refCrm.simple('CrmOpportunity', 'opportunityId', 'name', 'Opportunity'),
    ...refCrm.simple('CrmOppStage', 'stageId', 'name'),

    // ========================================
    // CRM - Accounts Management
    // ========================================
    ...refCrm.simple('CrmAccount', 'accountId', 'name', 'Account'),
    ...refCrm.person('CrmContact', 'contactId'),
    ...refCrm.simple('CrmInteraction', 'interactionId', 'subject'),
    ...refCrm.idOnly('CrmRelationship', 'relationshipId'),

    // ========================================
    // CRM - Marketing Management
    // ========================================
    ...refCrm.simple('CrmCampaign', 'campaignId', 'name', 'Campaign'),
    ...refCrm.batch([
        ['CrmEmailTemplate', 'templateId', 'name'],
        ['CrmMarketingList', 'listId', 'name']
    ]),

    // ========================================
    // CRM - Customer Service
    // ========================================
    ...refCrm.coded('CrmCase', 'caseId', 'caseNumber', 'subject'),
    ...refCrm.coded('CrmKBArticle', 'articleId', 'articleNumber', 'title'),
    ...refCrm.batch([
        ['CrmSLA', 'slaId', 'name'],
        ['CrmEscalation', 'escalationId', 'name'],
        ['CrmSurvey', 'surveyId', 'name']
    ]),

    // ========================================
    // CRM - Field Service
    // ========================================
    ...refCrm.simple('CrmServiceOrder', 'orderId', 'orderNumber', 'Service Order'),
    ...refCrm.simple('CrmTechnician', 'technicianId', 'name', 'Technician'),
    ...refCrm.simple('CrmServiceContract', 'contractId', 'contractNumber', 'Service Contract'),
    ...refCrm.idOnly('CrmServiceSchedule', 'scheduleId')
});
