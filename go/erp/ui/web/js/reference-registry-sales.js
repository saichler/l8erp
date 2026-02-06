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
 * ERP Reference Registry - Sales Models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refSales = window.Layer8RefFactory;

window.Layer8DReferenceRegistrySales = {
    // ========================================
    // Sales - Customer Models
    // ========================================
    ...refSales.simple('SalesCustomerHierarchy', 'hierarchyId', 'name', 'Hierarchy'),
    ...refSales.simple('SalesCustomerSegment', 'segmentId', 'name', 'Segment'),
    ...refSales.simple('SalesCustomerContract', 'contractId', 'contractNumber', 'Contract'),
    ...refSales.simple('SalesPartnerChannel', 'channelId', 'name', 'Channel'),

    // ========================================
    // Sales - Pricing Models
    // ========================================
    ...refSales.simple('SalesPriceList', 'priceListId', 'name', 'Price List'),
    ...refSales.idOnly('SalesPriceListEntry', 'entryId'),
    ...refSales.idOnly('SalesCustomerPrice', 'customerPriceId'),
    ...refSales.simple('SalesDiscountRule', 'ruleId', 'name', 'Discount Rule'),
    ...refSales.idOnly('SalesPromotionalPrice', 'promotionalPriceId'),
    ...refSales.idOnly('SalesQuantityBreak', 'breakId'),

    // ========================================
    // Sales - Order Models
    // ========================================
    ...refSales.simple('SalesQuotation', 'quotationId', 'quotationNumber', 'Quotation'),
    ...refSales.idOnly('SalesQuotationLine', 'lineId'),
    ...refSales.simple('SalesOrder', 'salesOrderId', 'orderNumber', 'Sales Order'),
    ...refSales.idOnly('SalesOrderLine', 'lineId'),
    ...refSales.idOnly('SalesOrderAllocation', 'allocationId'),
    ...refSales.idOnly('SalesBackOrder', 'backOrderId'),
    ...refSales.simple('SalesReturnOrder', 'returnOrderId', 'returnNumber', 'Return Order'),
    ...refSales.idOnly('SalesReturnOrderLine', 'lineId'),

    // ========================================
    // Sales - Shipping Models
    // ========================================
    ...refSales.simple('SalesDeliveryOrder', 'deliveryOrderId', 'deliveryNumber', 'Delivery Order'),
    ...refSales.idOnly('SalesDeliveryLine', 'lineId'),
    ...refSales.idOnly('SalesPickRelease', 'pickReleaseId'),
    ...refSales.idOnly('SalesPackingSlip', 'packingSlipId'),
    ...refSales.idOnly('SalesShippingDoc', 'shippingDocId'),
    ...refSales.idOnly('SalesDeliveryConfirm', 'confirmId'),

    // ========================================
    // Sales - Billing Models
    // ========================================
    ...refSales.simple('SalesBillingSchedule', 'scheduleId', 'name', 'Billing Schedule'),
    ...refSales.idOnly('SalesBillingMilestone', 'milestoneId'),
    ...refSales.idOnly('SalesRevenueSchedule', 'scheduleId'),

    // ========================================
    // Sales - Territory & Commission Models
    // ========================================
    ...refSales.simple('SalesTerritory', 'territoryId', 'name', 'Territory'),
    ...refSales.idOnly('SalesTerritoryAssign', 'assignmentId'),
    ...refSales.simple('SalesCommissionPlan', 'planId', 'name', 'Commission Plan'),
    ...refSales.idOnly('SalesCommissionCalc', 'calcId'),

    // ========================================
    // Sales - Analytics Models
    // ========================================
    ...refSales.idOnly('SalesTarget', 'targetId'),
    ...refSales.idOnly('SalesForecast', 'forecastId')
};
