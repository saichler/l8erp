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
    ...refSales.simple('SalesDiscountRule', 'ruleId', 'name', 'Discount Rule'),
    ...refSales.simple('SalesPromotionalPrice', 'promoId', 'name', 'Promotion'),

    // ========================================
    // Sales - Order Models
    // ========================================
    ...refSales.simple('SalesQuotation', 'quotationId', 'quotationNumber', 'Quotation'),
    ...refSales.simple('SalesOrder', 'salesOrderId', 'orderNumber', 'Sales Order'),
    ...refSales.simple('SalesReturnOrder', 'returnOrderId', 'returnNumber', 'Return Order'),

    // ========================================
    // Sales - Shipping Models
    // ========================================
    ...refSales.simple('SalesDeliveryOrder', 'deliveryOrderId', 'deliveryNumber', 'Delivery Order'),

    // ========================================
    // Sales - Billing Models
    // ========================================
    ...refSales.simple('SalesBillingSchedule', 'scheduleId', 'name', 'Billing Schedule'),
    ...refSales.idOnly('SalesRevenueSchedule', 'scheduleId'),

    // ========================================
    // Sales - Territory & Commission Models
    // ========================================
    ...refSales.simple('SalesTerritory', 'territoryId', 'name', 'Territory'),
    ...refSales.simple('SalesCommissionPlan', 'planId', 'name', 'Commission Plan'),

    // ========================================
    // Sales - Analytics Models
    // ========================================
    ...refSales.idOnly('SalesTarget', 'targetId'),
    ...refSales.idOnly('SalesForecast', 'forecastId')
};
