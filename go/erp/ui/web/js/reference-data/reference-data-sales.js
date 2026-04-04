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
 * Shared Reference Data - Sales Models
 * Used by both desktop and mobile reference registries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    window.ReferenceDataSales = {
        // ========================================
        // Sales - Customer Models
        // ========================================
        ...ref.simple('SalesCustomerHierarchy', 'hierarchyId', 'name', 'Hierarchy'),
        ...ref.simple('SalesCustomerSegment', 'segmentId', 'name', 'Segment'),
        ...ref.simple('SalesCustomerContract', 'contractId', 'contractNumber', 'Contract'),
        ...ref.simple('SalesPartnerChannel', 'channelId', 'name', 'Channel'),

        // ========================================
        // Sales - Pricing Models
        // ========================================
        ...ref.simple('SalesPriceList', 'priceListId', 'name', 'Price List'),
        ...ref.simple('SalesDiscountRule', 'ruleId', 'name', 'Discount Rule'),
        ...ref.simple('SalesPromotionalPrice', 'promoId', 'name', 'Promotion'),

        // ========================================
        // Sales - Order Models
        // ========================================
        ...ref.simple('SalesQuotation', 'quotationId', 'quotationNumber', 'Quotation'),
        ...ref.simple('SalesOrder', 'salesOrderId', 'orderNumber', 'Sales Order'),
        ...ref.simple('SalesReturnOrder', 'returnOrderId', 'returnNumber', 'Return Order'),

        // ========================================
        // Sales - Shipping Models
        // ========================================
        ...ref.simple('SalesDeliveryOrder', 'deliveryOrderId', 'deliveryNumber', 'Delivery Order'),

        // ========================================
        // Sales - Billing Models
        // ========================================
        ...ref.simple('SalesBillingSchedule', 'scheduleId', 'name', 'Billing Schedule'),

        // ========================================
        // Sales - Territory & Commission Models
        // ========================================
        ...ref.simple('SalesTerritory', 'territoryId', 'name', 'Territory'),
        ...ref.simple('SalesCommissionPlan', 'planId', 'name', 'Commission Plan')
    };
})();
