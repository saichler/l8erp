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
 * Mobile Procurement Module - Column Configurations
 * Desktop Equivalent: scm/procurement/procurement-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileProcurement.enums;
    const render = MobileProcurement.render;

    MobileProcurement.columns = {
        ScmPurchaseRequisition: [
            ...col.id('requisitionId'),
            ...col.col('requisitionNumber', 'Req #'),
            ...col.col('requesterId', 'Requester'),
            ...col.date('requestDate', 'Date'),
            ...col.status('status', 'Status', enums.REQUISITION_STATUS_VALUES, render.requisitionStatus),
            ...col.money('estimatedTotal', 'Est. Total')
        ],
        ScmRequestForQuotation: [
            ...col.id('rfqId'),
            ...col.col('rfqNumber', 'RFQ #'),
            ...col.date('issueDate', 'Issued'),
            ...col.date('responseDeadline', 'Deadline'),
            ...col.status('status', 'Status', enums.REQUISITION_STATUS_VALUES, render.requisitionStatus)
        ],
        ScmPurchaseOrder: [
            ...col.id('purchaseOrderId'),
            ...col.col('orderNumber', 'PO #'),
            ...col.col('vendorId', 'Vendor'),
            ...col.date('orderDate', 'Order Date'),
            ...col.status('status', 'Status', enums.PO_STATUS_VALUES, render.poStatus),
            ...col.money('totalAmount', 'Total')
        ],
        ScmBlanketOrder: [
            ...col.id('blanketOrderId'),
            ...col.col('orderNumber', 'Order #'),
            ...col.col('vendorId', 'Vendor'),
            ...col.date('startDate', 'Start'),
            ...col.date('endDate', 'End'),
            ...col.status('status', 'Status', enums.PO_STATUS_VALUES, render.poStatus),
            ...col.money('maxAmount', 'Max Amount')
        ],
        ScmSupplierScorecard: [
            ...col.id('scorecardId'),
            ...col.col('vendorId', 'Vendor'),
            ...col.col('qualityScore', 'Quality'),
            ...col.col('deliveryScore', 'Delivery'),
            ...col.col('overallScore', 'Overall')
        ]
    };

    MobileProcurement.primaryKeys = {
        ScmPurchaseRequisition: 'requisitionId',
        ScmRequestForQuotation: 'rfqId', ScmPurchaseOrder: 'purchaseOrderId',
        ScmBlanketOrder: 'blanketOrderId', ScmSupplierScorecard: 'scorecardId'
    };

})();
