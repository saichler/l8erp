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
// CRM Field Service Module - Column Configurations

(function() {
    'use strict';

    window.CrmFieldService = window.CrmFieldService || {};

    const { renderDate, renderMoney, renderBoolean } = Layer8DRenderers;
    const render = CrmFieldService.render;

    CrmFieldService.columns = {
        CrmServiceOrder: [
            { key: 'orderId', label: 'ID', sortKey: 'orderId', filterKey: 'orderId' },
            { key: 'orderNumber', label: 'Order #', sortKey: 'orderNumber', filterKey: 'orderNumber' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            { key: 'contactId', label: 'Contact', sortKey: 'contactId' },
            {
                key: 'orderType',
                label: 'Type',
                sortKey: 'orderType',
                render: (item) => render.serviceOrderType(item.orderType)
            },
            {
                key: 'priority',
                label: 'Priority',
                sortKey: 'priority',
                render: (item) => render.serviceOrderPriority(item.priority)
            },
            {
                key: 'scheduledStart',
                label: 'Scheduled',
                sortKey: 'scheduledStart',
                render: (item) => renderDate(item.scheduledStart)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.serviceOrderStatus(item.status)
            }
        ],

        CrmTechnician: [
            { key: 'technicianId', label: 'ID', sortKey: 'technicianId', filterKey: 'technicianId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'skills', label: 'Skills', sortKey: 'skills' },
            { key: 'territory', label: 'Territory', sortKey: 'territory', filterKey: 'territory' },
            { key: 'maxDailyOrders', label: 'Max Daily Orders', sortKey: 'maxDailyOrders' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.technicianStatus(item.status)
            }
        ],

        CrmServiceContract: [
            { key: 'contractId', label: 'ID', sortKey: 'contractId', filterKey: 'contractId' },
            { key: 'contractNumber', label: 'Contract #', sortKey: 'contractNumber', filterKey: 'contractNumber' },
            { key: 'terms', label: 'Terms', sortKey: 'terms', filterKey: 'terms' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            {
                key: 'contractType',
                label: 'Type',
                sortKey: 'contractType',
                render: (item) => render.contractType(item.contractType)
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
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.contractStatus(item.status)
            }
        ],

        CrmServiceSchedule: [
            { key: 'scheduleId', label: 'ID', sortKey: 'scheduleId', filterKey: 'scheduleId' },
            { key: 'serviceOrderId', label: 'Service Order', sortKey: 'serviceOrderId', filterKey: 'serviceOrderId' },
            { key: 'technicianId', label: 'Technician', sortKey: 'technicianId', filterKey: 'technicianId' },
            {
                key: 'scheduleDate',
                label: 'Date',
                sortKey: 'scheduleDate',
                render: (item) => renderDate(item.scheduleDate)
            },
            { key: 'startTime', label: 'Start Time', sortKey: 'startTime' },
            { key: 'endTime', label: 'End Time', sortKey: 'endTime' },
            { key: 'scheduleType', label: 'Type', sortKey: 'scheduleType' },
            {
                key: 'isAvailable',
                label: 'Available',
                sortKey: 'isAvailable',
                render: (item) => renderBoolean(item.isAvailable)
            }
        ],

    };

})();
