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

    const col = window.Layer8ColumnFactory;
    const render = CrmAccounts.render;

    CrmAccounts.columns = {
        CrmAccount: [
            ...col.id('accountId'),
            ...col.col('name', 'Name'),
            ...col.enum('accountType', 'Type', null, render.accountType),
            ...col.col('industry', 'Industry'),
            ...col.col('phone', 'Phone'),
            ...col.col('website', 'Website'),
            ...col.enum('status', 'Status', null, render.accountStatus),
        ],

        CrmContact: [
            ...col.id('contactId'),
            ...col.col('firstName', 'First Name'),
            ...col.col('lastName', 'Last Name'),
            ...col.col('title', 'Title'),
            ...col.col('email', 'Email'),
            ...col.col('phone', 'Phone'),
            ...col.col('accountId', 'Account'),
        ],

        CrmInteraction: [
            ...col.id('interactionId'),
            ...col.col('subject', 'Subject'),
            ...col.enum('interactionType', 'Type', null, render.interactionType),
            ...col.enum('direction', 'Direction', null, render.interactionDirection),
            ...col.date('interactionDate', 'Date'),
            ...col.col('accountId', 'Account'),
            ...col.col('contactId', 'Contact'),
        ],

        CrmRelationship: [
            ...col.id('relationshipId'),
            ...col.col('accountId', 'Account'),
            ...col.col('relatedAccountId', 'Related Account'),
            ...col.enum('relationshipType', 'Type', null, render.relationshipType),
            ...col.date('startDate', 'Start Date'),
            ...col.col('isActive', 'Active'),
        ],

    };

})();
