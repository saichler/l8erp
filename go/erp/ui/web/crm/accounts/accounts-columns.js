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
// CRM Accounts Module - Column Configurations

(function() {
    'use strict';

    window.CrmAccounts = window.CrmAccounts || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = CrmAccounts.render;

    CrmAccounts.columns = {
        CrmAccount: [
            { key: 'accountId', label: 'ID', sortKey: 'accountId', filterKey: 'accountId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'accountType',
                label: 'Type',
                sortKey: 'accountType',
                render: (item) => render.accountType(item.accountType)
            },
            { key: 'industry', label: 'Industry', sortKey: 'industry', filterKey: 'industry' },
            { key: 'phone', label: 'Phone', sortKey: 'phone' },
            { key: 'website', label: 'Website', sortKey: 'website' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.accountStatus(item.status)
            }
        ],

        CrmContact: [
            { key: 'contactId', label: 'ID', sortKey: 'contactId', filterKey: 'contactId' },
            { key: 'firstName', label: 'First Name', sortKey: 'firstName', filterKey: 'firstName' },
            { key: 'lastName', label: 'Last Name', sortKey: 'lastName', filterKey: 'lastName' },
            { key: 'title', label: 'Title', sortKey: 'title' },
            { key: 'email', label: 'Email', sortKey: 'email', filterKey: 'email' },
            { key: 'phone', label: 'Phone', sortKey: 'phone' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' }
        ],

        CrmInteraction: [
            { key: 'interactionId', label: 'ID', sortKey: 'interactionId', filterKey: 'interactionId' },
            { key: 'subject', label: 'Subject', sortKey: 'subject', filterKey: 'subject' },
            {
                key: 'interactionType',
                label: 'Type',
                sortKey: 'interactionType',
                render: (item) => render.interactionType(item.interactionType)
            },
            {
                key: 'direction',
                label: 'Direction',
                sortKey: 'direction',
                render: (item) => render.interactionDirection(item.direction)
            },
            {
                key: 'interactionDate',
                label: 'Date',
                sortKey: 'interactionDate',
                render: (item) => renderDate(item.interactionDate)
            },
            { key: 'accountId', label: 'Account', sortKey: 'accountId' },
            { key: 'contactId', label: 'Contact', sortKey: 'contactId' }
        ],

        CrmRelationship: [
            { key: 'relationshipId', label: 'ID', sortKey: 'relationshipId', filterKey: 'relationshipId' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            { key: 'relatedAccountId', label: 'Related Account', sortKey: 'relatedAccountId' },
            {
                key: 'relationshipType',
                label: 'Type',
                sortKey: 'relationshipType',
                render: (item) => render.relationshipType(item.relationshipType)
            },
            {
                key: 'startDate',
                label: 'Start Date',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            { key: 'isActive', label: 'Active', sortKey: 'isActive' }
        ],

    };

})();
