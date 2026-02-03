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

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = SalesCustomers.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    SalesCustomers.columns = {
        CustomerHierarchy: [
            { key: 'hierarchyId', label: 'ID', sortKey: 'hierarchyId', filterKey: 'hierarchyId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'parentId', label: 'Parent', sortKey: 'parentId', filterKey: 'parentId' },
            { key: 'level', label: 'Level', sortKey: 'level' },
            { key: 'description', label: 'Description', sortKey: 'description' }
        ],

        CustomerSegment: [
            { key: 'segmentId', label: 'ID', sortKey: 'segmentId', filterKey: 'segmentId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive' }
        ],

        CustomerContract: [
            { key: 'contractId', label: 'ID', sortKey: 'contractId', filterKey: 'contractId' },
            { key: 'contractNumber', label: 'Contract #', sortKey: 'contractNumber', filterKey: 'contractNumber' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            {
                key: 'startDate',
                label: 'Start',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.contractStatus(item.status)
            },
            {
                key: 'contractValue',
                label: 'Value',
                sortKey: 'contractValue',
                render: (item) => renderMoney(item.contractValue)
            }
        ],

        PartnerChannel: [
            { key: 'partnerId', label: 'ID', sortKey: 'partnerId', filterKey: 'partnerId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'partnerType', label: 'Type', sortKey: 'partnerType', filterKey: 'partnerType' },
            { key: 'contactName', label: 'Contact', sortKey: 'contactName' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.partnerStatus(item.status)
            },
            { key: 'commissionRate', label: 'Commission %', sortKey: 'commissionRate' }
        ]
    };

})();
