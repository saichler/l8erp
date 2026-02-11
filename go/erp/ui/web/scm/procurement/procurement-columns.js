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
// Procurement Module - Column Configurations
// Table column definitions for all Procurement models

(function() {
    'use strict';

    window.Procurement = window.Procurement || {};

    const col = window.Layer8ColumnFactory;
    const render = Procurement.render;

    Procurement.columns = {
        ScmPurchaseRequisition: [
            ...col.id('requisitionId'),
            ...col.basic([['requisitionNumber', 'Req #'], ['requesterId', 'Requester']]),
            ...col.date('requestDate', 'Date'),
            ...col.custom('status', 'Status', (item) => render.requisitionStatus(item.status)),
            ...col.money('estimatedTotal', 'Est. Total')
        ],

        ScmRequestForQuotation: [
            ...col.id('rfqId'),
            ...col.col('rfqNumber', 'RFQ #'),
            ...col.date('issueDate', 'Issued'),
            ...col.date('responseDeadline', 'Deadline'),
            ...col.custom('status', 'Status', (item) => render.requisitionStatus(item.status))
        ],

        ScmPurchaseOrder: [
            ...col.id('purchaseOrderId'),
            ...col.basic([['orderNumber', 'PO #'], ['vendorId', 'Vendor']]),
            ...col.date('orderDate', 'Order Date'),
            ...col.custom('status', 'Status', (item) => render.poStatus(item.status)),
            ...col.money('totalAmount', 'Total')
        ],

        ScmBlanketOrder: [
            ...col.id('blanketOrderId'),
            ...col.basic([['orderNumber', 'Order #'], ['vendorId', 'Vendor']]),
            ...col.date('startDate', 'Start'),
            ...col.date('endDate', 'End'),
            ...col.custom('status', 'Status', (item) => render.poStatus(item.status)),
            ...col.money('maxAmount', 'Max Amount')
        ],

        ScmSupplierScorecard: [
            ...col.id('scorecardId'),
            ...col.col('vendorId', 'Vendor'),
            ...col.basic([['qualityScore', 'Quality'], ['deliveryScore', 'Delivery'], ['overallScore', 'Overall']])
        ]
    };
})();
