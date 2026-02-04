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
            { key: 'subject', label: 'Subject', sortKey: 'subject', filterKey: 'subject' },
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
                key: 'scheduledDate',
                label: 'Scheduled',
                sortKey: 'scheduledDate',
                render: (item) => renderDate(item.scheduledDate)
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
            { key: 'specialization', label: 'Specialization', sortKey: 'specialization' },
            { key: 'region', label: 'Region', sortKey: 'region', filterKey: 'region' },
            { key: 'skillLevel', label: 'Skill Level', sortKey: 'skillLevel' },
            {
                key: 'isCertified',
                label: 'Certified',
                sortKey: 'isCertified',
                render: (item) => renderBoolean(item.isCertified)
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
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
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
                key: 'scheduledDate',
                label: 'Date',
                sortKey: 'scheduledDate',
                render: (item) => renderDate(item.scheduledDate)
            },
            { key: 'startTime', label: 'Start Time', sortKey: 'startTime' },
            { key: 'endTime', label: 'End Time', sortKey: 'endTime' },
            { key: 'estimatedDuration', label: 'Duration (hrs)', sortKey: 'estimatedDuration' },
            {
                key: 'isConfirmed',
                label: 'Confirmed',
                sortKey: 'isConfirmed',
                render: (item) => renderBoolean(item.isConfirmed)
            }
        ],

        CrmServicePart: [
            { key: 'partId', label: 'ID', sortKey: 'partId', filterKey: 'partId' },
            { key: 'serviceOrderId', label: 'Service Order', sortKey: 'serviceOrderId', filterKey: 'serviceOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            {
                key: 'unitPrice',
                label: 'Unit Price',
                sortKey: 'unitPrice',
                render: (item) => renderMoney(item.unitPrice)
            },
            {
                key: 'totalPrice',
                label: 'Total Price',
                sortKey: 'totalPrice',
                render: (item) => renderMoney(item.totalPrice)
            },
            {
                key: 'isInstalled',
                label: 'Installed',
                sortKey: 'isInstalled',
                render: (item) => renderBoolean(item.isInstalled)
            }
        ],

        CrmServiceVisit: [
            { key: 'visitId', label: 'ID', sortKey: 'visitId', filterKey: 'visitId' },
            { key: 'serviceOrderId', label: 'Service Order', sortKey: 'serviceOrderId', filterKey: 'serviceOrderId' },
            { key: 'technicianId', label: 'Technician', sortKey: 'technicianId', filterKey: 'technicianId' },
            {
                key: 'visitDate',
                label: 'Visit Date',
                sortKey: 'visitDate',
                render: (item) => renderDate(item.visitDate)
            },
            { key: 'arrivalTime', label: 'Arrival', sortKey: 'arrivalTime' },
            { key: 'departureTime', label: 'Departure', sortKey: 'departureTime' },
            { key: 'workPerformed', label: 'Work Performed', sortKey: 'workPerformed' },
            {
                key: 'customerSignature',
                label: 'Signed',
                sortKey: 'customerSignature',
                render: (item) => renderBoolean(item.customerSignature ? true : false)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.visitStatus(item.status)
            }
        ]
    };

})();
