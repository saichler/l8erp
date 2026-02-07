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
 * Mobile Sales Customers Module - Column Configurations
 * Desktop Equivalent: sales/customers/customers-columns.js
 */
(function() {
    'use strict';

    const enums = MobileSalesCustomers.enums;
    const render = MobileSalesCustomers.render;

    MobileSalesCustomers.columns = {
        CustomerHierarchy: [
            { key: 'hierarchyId', label: 'ID', sortKey: 'hierarchyId', filterKey: 'hierarchyId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'parentHierarchyId', label: 'Parent', sortKey: 'parentHierarchyId', filterKey: 'parentHierarchyId' },
            { key: 'level', label: 'Level', sortKey: 'level' },
            { key: 'description', label: 'Description', sortKey: 'description' }
        ],

        CustomerSegment: [
            { key: 'segmentId', label: 'ID', sortKey: 'segmentId', filterKey: 'segmentId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'segmentType', label: 'Type', sortKey: 'segmentType', filterKey: 'segmentType' },
            { key: 'description', label: 'Description', sortKey: 'description' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive' }
        ],

        CustomerContract: [
            { key: 'contractId', label: 'ID', sortKey: 'contractId', filterKey: 'contractId' },
            { key: 'contractNumber', label: 'Contract #', sortKey: 'contractNumber', filterKey: 'contractNumber' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            { key: 'startDate', label: 'Start', sortKey: 'startDate', render: (item) => Layer8MRenderers.renderDate(item.startDate) },
            { key: 'endDate', label: 'End', sortKey: 'endDate', render: (item) => Layer8MRenderers.renderDate(item.endDate) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.CONTRACT_STATUS_VALUES, render: (item) => render.contractStatus(item.status) },
            { key: 'contractValue', label: 'Value', sortKey: 'contractValue', render: (item) => Layer8MRenderers.renderMoney(item.contractValue) }
        ],

        PartnerChannel: [
            { key: 'partnerId', label: 'ID', sortKey: 'partnerId', filterKey: 'partnerId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'partnerType', label: 'Type', sortKey: 'partnerType', filterKey: 'partnerType' },
            { key: 'contactName', label: 'Contact', sortKey: 'contactName' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive' },
            { key: 'commissionRate', label: 'Commission %', sortKey: 'commissionRate' }
        ]
    };

    MobileSalesCustomers.primaryKeys = {
        CustomerHierarchy: 'hierarchyId', CustomerSegment: 'segmentId',
        CustomerContract: 'contractId', PartnerChannel: 'partnerId'
    };

})();
