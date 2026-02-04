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
// CRM Leads Module - Column Configurations

(function() {
    'use strict';

    window.CrmLeads = window.CrmLeads || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = CrmLeads.render;

    CrmLeads.columns = {
        CrmLead: [
            { key: 'leadId', label: 'ID', sortKey: 'leadId', filterKey: 'leadId' },
            { key: 'firstName', label: 'First Name', sortKey: 'firstName', filterKey: 'firstName' },
            { key: 'lastName', label: 'Last Name', sortKey: 'lastName', filterKey: 'lastName' },
            { key: 'email', label: 'Email', sortKey: 'email', filterKey: 'email' },
            { key: 'company', label: 'Company', sortKey: 'company', filterKey: 'company' },
            { key: 'title', label: 'Title', sortKey: 'title' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.leadStatus(item.status)
            },
            {
                key: 'rating',
                label: 'Rating',
                sortKey: 'rating',
                render: (item) => render.leadRating(item.rating)
            },
            { key: 'score', label: 'Score', sortKey: 'score' },
            {
                key: 'lastActivityDate',
                label: 'Last Activity',
                sortKey: 'lastActivityDate',
                render: (item) => renderDate(item.lastActivityDate)
            }
        ],

        CrmLeadSource: [
            { key: 'sourceId', label: 'ID', sortKey: 'sourceId', filterKey: 'sourceId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            {
                key: 'sourceType',
                label: 'Type',
                sortKey: 'sourceType',
                render: (item) => render.leadSourceType(item.sourceType)
            },
            { key: 'defaultCost', label: 'Default Cost', sortKey: 'defaultCost' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        CrmLeadScore: [
            { key: 'scoreId', label: 'ID', sortKey: 'scoreId', filterKey: 'scoreId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'fieldName', label: 'Field', sortKey: 'fieldName' },
            { key: 'fieldValue', label: 'Value', sortKey: 'fieldValue' },
            { key: 'scoreValue', label: 'Score', sortKey: 'scoreValue' },
            { key: 'priority', label: 'Priority', sortKey: 'priority' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        CrmLeadActivity: [
            { key: 'activityId', label: 'ID', sortKey: 'activityId', filterKey: 'activityId' },
            { key: 'leadId', label: 'Lead', sortKey: 'leadId', filterKey: 'leadId' },
            {
                key: 'activityType',
                label: 'Type',
                sortKey: 'activityType',
                render: (item) => render.activityType(item.activityType)
            },
            { key: 'subject', label: 'Subject', sortKey: 'subject', filterKey: 'subject' },
            {
                key: 'activityDate',
                label: 'Date',
                sortKey: 'activityDate',
                render: (item) => renderDate(item.activityDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.activityStatus(item.status)
            },
            { key: 'durationMinutes', label: 'Duration (min)', sortKey: 'durationMinutes' },
            {
                key: 'isCompleted',
                label: 'Completed',
                sortKey: 'isCompleted',
                render: (item) => item.isCompleted ? 'Yes' : 'No'
            }
        ],

        CrmLeadAssign: [
            { key: 'assignmentId', label: 'ID', sortKey: 'assignmentId', filterKey: 'assignmentId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'criteriaField', label: 'Criteria Field', sortKey: 'criteriaField' },
            { key: 'criteriaValue', label: 'Criteria Value', sortKey: 'criteriaValue' },
            { key: 'priority', label: 'Priority', sortKey: 'priority' },
            {
                key: 'roundRobin',
                label: 'Round Robin',
                sortKey: 'roundRobin',
                render: (item) => item.roundRobin ? 'Yes' : 'No'
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => item.isActive ? 'Yes' : 'No'
            }
        ],

        CrmLeadConversion: [
            { key: 'conversionId', label: 'ID', sortKey: 'conversionId', filterKey: 'conversionId' },
            { key: 'leadId', label: 'Lead', sortKey: 'leadId', filterKey: 'leadId' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId' },
            { key: 'contactId', label: 'Contact', sortKey: 'contactId' },
            { key: 'opportunityId', label: 'Opportunity', sortKey: 'opportunityId' },
            {
                key: 'conversionDate',
                label: 'Conversion Date',
                sortKey: 'conversionDate',
                render: (item) => renderDate(item.conversionDate)
            },
            { key: 'convertedBy', label: 'Converted By', sortKey: 'convertedBy' },
            {
                key: 'createOpportunity',
                label: 'Created Opportunity',
                sortKey: 'createOpportunity',
                render: (item) => item.createOpportunity ? 'Yes' : 'No'
            }
        ]
    };

})();
