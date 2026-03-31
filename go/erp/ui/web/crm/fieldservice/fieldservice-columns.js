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

    const col = window.Layer8ColumnFactory;
    const render = CrmFieldService.render;

    CrmFieldService.columns = {
        CrmServiceOrder: [
            ...col.id('orderId'),
            ...col.col('orderNumber', 'Order #'),
            ...col.col('description', 'Description'),
            ...col.col('accountId', 'Account'),
            ...col.col('contactId', 'Contact'),
            ...col.enum('orderType', 'Type', null, render.serviceOrderType),
            ...col.enum('priority', 'Priority', null, render.serviceOrderPriority),
            ...col.date('scheduledStart', 'Scheduled'),
            ...col.enum('status', 'Status', null, render.serviceOrderStatus),
        ],

        CrmTechnician: [
            ...col.id('technicianId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('name', 'Name'),
            ...col.col('skills', 'Skills'),
            ...col.col('territory', 'Territory'),
            ...col.col('maxDailyOrders', 'Max Daily Orders'),
            ...col.boolean('isActive', 'Active'),
            ...col.enum('status', 'Status', null, render.technicianStatus),
        ],

        CrmServiceContract: [
            ...col.id('contractId'),
            ...col.col('contractNumber', 'Contract #'),
            ...col.col('terms', 'Terms'),
            ...col.col('accountId', 'Account'),
            ...col.enum('contractType', 'Type', null, render.contractType),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.enum('status', 'Status', null, render.contractStatus),
        ],

        CrmServiceSchedule: [
            ...col.id('scheduleId'),
            ...col.col('serviceOrderId', 'Service Order'),
            ...col.col('technicianId', 'Technician'),
            ...col.date('scheduleDate', 'Date'),
            ...col.date('startTime', 'Start Time'),
            ...col.date('endTime', 'End Time'),
            ...col.col('scheduleType', 'Type'),
            ...col.boolean('isAvailable', 'Available'),
        ],

    };

})();
