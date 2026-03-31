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

    const col = window.Layer8ColumnFactory;
    const render = CrmMarketing.render;

    CrmMarketing.columns = {
        CrmCampaign: [
            ...col.id('campaignId'),
            ...col.col('name', 'Name'),
            ...col.enum('campaignType', 'Type', null, render.campaignType),
            ...col.enum('status', 'Status', null, render.campaignStatus),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.money('budgetedCost', 'Budget'),
            ...col.col('numSent', 'Sent'),
            ...col.col('numResponses', 'Responses'),
        ],

        CrmEmailTemplate: [
            ...col.id('templateId'),
            ...col.col('name', 'Name'),
            ...col.col('subject', 'Subject'),
            ...col.col('templateType', 'Type'),
            ...col.col('folder', 'Folder'),
            ...col.col('timesUsed', 'Times Used'),
            ...col.date('lastUsedDate', 'Last Used'),
            ...col.col('isActive', 'Active'),
        ],

        CrmMarketingList: [
            ...col.id('listId'),
            ...col.col('name', 'Name'),
            ...col.col('listType', 'Type'),
            ...col.col('memberCount', 'Members'),
            ...col.col('isDynamic', 'Dynamic'),
            ...col.date('lastUsedDate', 'Last Used'),
            ...col.col('isActive', 'Active'),
        ],

    };

})();
