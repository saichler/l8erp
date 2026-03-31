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
// Sales Customers Module - Column Configurations
// Table column definitions for all Sales Customer Management models

(function() {
    'use strict';

    window.SalesCustomers = window.SalesCustomers || {};

    const col = window.Layer8ColumnFactory;
    const render = SalesCustomers.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    SalesCustomers.columns = {
        SalesCustomerHierarchy: [
            ...col.id('hierarchyId'),
            ...col.col('name', 'Name'),
            ...col.col('parentHierarchyId', 'Parent'),
            ...col.col('level', 'Level'),
            ...col.col('description', 'Description'),
        ],

        SalesCustomerSegment: [
            ...col.id('segmentId'),
            ...col.col('name', 'Name'),
            ...col.col('segmentType', 'Type'),
            ...col.col('description', 'Description'),
            ...col.col('isActive', 'Active'),
        ],

        SalesCustomerContract: [
            ...col.id('contractId'),
            ...col.col('contractNumber', 'Contract #'),
            ...col.col('customerId', 'Customer'),
            ...col.date('startDate', 'Start'),
            ...col.date('endDate', 'End'),
            ...col.enum('status', 'Status', null, render.contractStatus),
            ...col.money('contractValue', 'Value'),
        ],

        SalesPartnerChannel: [
            ...col.id('partnerId'),
            ...col.col('name', 'Name'),
            ...col.col('partnerType', 'Type'),
            ...col.col('contactName', 'Contact'),
            ...col.col('isActive', 'Active'),
            ...col.col('commissionRate', 'Commission %'),
        ]
    };

})();
