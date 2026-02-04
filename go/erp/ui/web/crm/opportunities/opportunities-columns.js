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
// CRM Opportunities Module - Column Configurations

(function() {
    'use strict';

    window.CrmOpportunities = window.CrmOpportunities || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = CrmOpportunities.render;

    CrmOpportunities.columns = {
        CrmOpportunity: [
            { key: 'opportunityId', label: 'ID', sortKey: 'opportunityId', filterKey: 'opportunityId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            {
                key: 'amount',
                label: 'Amount',
                sortKey: 'amount',
                render: (item) => renderMoney(item.amount)
            },
            {
                key: 'stage',
                label: 'Stage',
                sortKey: 'stage',
                render: (item) => render.salesStage(item.stage)
            },
            { key: 'probability', label: 'Probability %', sortKey: 'probability' },
            {
                key: 'closeDate',
                label: 'Close Date',
                sortKey: 'closeDate',
                render: (item) => renderDate(item.closeDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.opportunityStatus(item.status)
            }
        ],

        CrmOppStage: [
            { key: 'stageId', label: 'ID', sortKey: 'stageId', filterKey: 'stageId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'sequence', label: 'Sequence', sortKey: 'sequence' },
            { key: 'probability', label: 'Probability %', sortKey: 'probability' },
            { key: 'forecastCategory', label: 'Forecast Category', sortKey: 'forecastCategory' },
            { key: 'isClosed', label: 'Closed', sortKey: 'isClosed' },
            { key: 'isWon', label: 'Won', sortKey: 'isWon' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive' }
        ],

        CrmOppCompetitor: [
            { key: 'competitorId', label: 'ID', sortKey: 'competitorId', filterKey: 'competitorId' },
            { key: 'opportunityId', label: 'Opportunity', sortKey: 'opportunityId', filterKey: 'opportunityId' },
            { key: 'name', label: 'Competitor', sortKey: 'name', filterKey: 'name' },
            { key: 'website', label: 'Website', sortKey: 'website' },
            {
                key: 'threatLevel',
                label: 'Threat Level',
                sortKey: 'threatLevel',
                render: (item) => render.threatLevel(item.threatLevel)
            },
            {
                key: 'competitorPrice',
                label: 'Price',
                sortKey: 'competitorPrice',
                render: (item) => renderMoney(item.competitorPrice)
            },
            { key: 'isPrimary', label: 'Primary', sortKey: 'isPrimary' }
        ],

        CrmOppProduct: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'opportunityId', label: 'Opportunity', sortKey: 'opportunityId', filterKey: 'opportunityId' },
            { key: 'productName', label: 'Product', sortKey: 'productName', filterKey: 'productName' },
            { key: 'lineNumber', label: 'Line #', sortKey: 'lineNumber' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            {
                key: 'unitPrice',
                label: 'Unit Price',
                sortKey: 'unitPrice',
                render: (item) => renderMoney(item.unitPrice)
            },
            { key: 'discountPercent', label: 'Discount %', sortKey: 'discountPercent' },
            {
                key: 'totalPrice',
                label: 'Total Price',
                sortKey: 'totalPrice',
                render: (item) => renderMoney(item.totalPrice)
            }
        ],

        CrmOppTeam: [
            { key: 'memberId', label: 'ID', sortKey: 'memberId', filterKey: 'memberId' },
            { key: 'opportunityId', label: 'Opportunity', sortKey: 'opportunityId', filterKey: 'opportunityId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'role', label: 'Role', sortKey: 'role' },
            { key: 'splitPercent', label: 'Split %', sortKey: 'splitPercent' },
            { key: 'isPrimary', label: 'Primary', sortKey: 'isPrimary' }
        ],

        CrmOppActivity: [
            { key: 'activityId', label: 'ID', sortKey: 'activityId', filterKey: 'activityId' },
            { key: 'opportunityId', label: 'Opportunity', sortKey: 'opportunityId', filterKey: 'opportunityId' },
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
            { key: 'isCompleted', label: 'Completed', sortKey: 'isCompleted' }
        ]
    };

})();
