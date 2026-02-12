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
// CRM Marketing Module - Column Configurations

(function() {
    'use strict';

    window.CrmMarketing = window.CrmMarketing || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = CrmMarketing.render;

    CrmMarketing.columns = {
        CrmCampaign: [
            { key: 'campaignId', label: 'ID', sortKey: 'campaignId', filterKey: 'campaignId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'campaignType',
                label: 'Type',
                sortKey: 'campaignType',
                render: (item) => render.campaignType(item.campaignType)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.campaignStatus(item.status)
            },
            {
                key: 'startDate',
                label: 'Start Date',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End Date',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            },
            {
                key: 'budgetedCost',
                label: 'Budget',
                sortKey: 'budgetedCost',
                render: (item) => renderMoney(item.budgetedCost)
            },
            { key: 'numSent', label: 'Sent', sortKey: 'numSent' },
            { key: 'numResponses', label: 'Responses', sortKey: 'numResponses' }
        ],

        CrmEmailTemplate: [
            { key: 'templateId', label: 'ID', sortKey: 'templateId', filterKey: 'templateId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'subject', label: 'Subject', sortKey: 'subject' },
            { key: 'templateType', label: 'Type', sortKey: 'templateType' },
            { key: 'folder', label: 'Folder', sortKey: 'folder' },
            { key: 'timesUsed', label: 'Times Used', sortKey: 'timesUsed' },
            {
                key: 'lastUsedDate',
                label: 'Last Used',
                sortKey: 'lastUsedDate',
                render: (item) => renderDate(item.lastUsedDate)
            },
            { key: 'isActive', label: 'Active', sortKey: 'isActive' }
        ],

        CrmMarketingList: [
            { key: 'listId', label: 'ID', sortKey: 'listId', filterKey: 'listId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'listType', label: 'Type', sortKey: 'listType' },
            { key: 'memberCount', label: 'Members', sortKey: 'memberCount' },
            { key: 'isDynamic', label: 'Dynamic', sortKey: 'isDynamic' },
            {
                key: 'lastUsedDate',
                label: 'Last Used',
                sortKey: 'lastUsedDate',
                render: (item) => renderDate(item.lastUsedDate)
            },
            { key: 'isActive', label: 'Active', sortKey: 'isActive' }
        ],

    };

})();
