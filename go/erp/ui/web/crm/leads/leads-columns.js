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

    const col = window.Layer8ColumnFactory;
    const render = CrmLeads.render;

    CrmLeads.columns = {
        CrmLead: [
            ...col.id('leadId'),
            ...col.col('firstName', 'First Name'),
            ...col.col('lastName', 'Last Name'),
            ...col.col('email', 'Email'),
            ...col.col('company', 'Company'),
            ...col.col('title', 'Title'),
            ...col.enum('status', 'Status', null, render.leadStatus),
            ...col.enum('rating', 'Rating', null, render.leadRating),
            ...col.col('score', 'Score'),
            ...col.date('lastActivityDate', 'Last Activity'),
        ],

        CrmLeadSource: [
            ...col.id('sourceId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.enum('sourceType', 'Type', null, render.leadSourceType),
            ...col.col('defaultCost', 'Default Cost'),
            ...col.boolean('isActive', 'Active'),
        ],

        CrmLeadScore: [
            ...col.id('scoreId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.col('fieldName', 'Field'),
            ...col.col('fieldValue', 'Value'),
            ...col.col('scoreValue', 'Score'),
            ...col.col('priority', 'Priority'),
            ...col.boolean('isActive', 'Active'),
        ],

        CrmLeadAssign: [
            ...col.id('assignmentId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.col('criteriaField', 'Criteria Field'),
            ...col.col('criteriaValue', 'Criteria Value'),
            ...col.col('priority', 'Priority'),
            ...col.boolean('roundRobin', 'Round Robin'),
            ...col.boolean('isActive', 'Active'),
        ],

    };

})();
