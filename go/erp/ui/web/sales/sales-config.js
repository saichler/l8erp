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
// Sales Module - Configuration
// Module definitions and service mappings

(function() {
    'use strict';

    // Create Sales namespace
    window.Sales = window.Sales || {};

    // Sales Module Configuration
    Sales.modules = {
        'customers': {
            label: 'Customers',
            icon: '👥',
            services: [
                { key: 'hierarchies', label: 'Hierarchies', icon: '🏢', endpoint: '/60/CustHier', model: 'CustomerHierarchy' },
                { key: 'segments', label: 'Segments', icon: '📊', endpoint: '/60/CustSegmt', model: 'CustomerSegment' },
                { key: 'contracts', label: 'Contracts', icon: '📄', endpoint: '/60/CustContr', model: 'CustomerContract' },
                { key: 'partners', label: 'Partners', icon: '🤝', endpoint: '/60/Partner', model: 'PartnerChannel' }
            ]
        },
        'orders': {
            label: 'Orders',
            icon: '📋',
            services: [
                { key: 'quotations', label: 'Quotations', icon: '📝', endpoint: '/60/SalesQuote', model: 'SalesQuotation' },
                { key: 'quotation-lines', label: 'Quote Lines', icon: '📋', endpoint: '/60/QuoteLine', model: 'QuotationLine' },
                { key: 'sales-orders', label: 'Sales Orders', icon: '📦', endpoint: '/60/SalesOrder', model: 'SalesOrder' },
                { key: 'order-lines', label: 'Order Lines', icon: '📝', endpoint: '/60/OrderLine', model: 'SalesOrderLine' },
                { key: 'allocations', label: 'Allocations', icon: '📌', endpoint: '/60/OrderAlloc', model: 'OrderAllocation' },
                { key: 'back-orders', label: 'Back Orders', icon: '⏳', endpoint: '/60/BackOrder', model: 'BackOrder' },
                { key: 'returns', label: 'Returns', icon: '↩️', endpoint: '/60/ReturnOrd', model: 'ReturnOrder' },
                { key: 'return-lines', label: 'Return Lines', icon: '📋', endpoint: '/60/ReturnLine', model: 'ReturnOrderLine' }
            ]
        },
        'pricing': {
            label: 'Pricing',
            icon: '💰',
            services: [
                { key: 'price-lists', label: 'Price Lists', icon: '📃', endpoint: '/60/PriceList', model: 'PriceList' },
                { key: 'price-entries', label: 'Price Entries', icon: '📋', endpoint: '/60/PriceEntry', model: 'PriceListEntry' },
                { key: 'customer-prices', label: 'Customer Prices', icon: '🏷️', endpoint: '/60/CustPrice', model: 'CustomerPrice' },
                { key: 'discounts', label: 'Discounts', icon: '🎫', endpoint: '/60/DiscntRule', model: 'DiscountRule' },
                { key: 'promotions', label: 'Promotions', icon: '🎯', endpoint: '/60/PromoPrice', model: 'PromotionalPrice' },
                { key: 'qty-breaks', label: 'Qty Breaks', icon: '📈', endpoint: '/60/QtyBreak', model: 'QuantityBreak' }
            ]
        },
        'shipping': {
            label: 'Shipping',
            icon: '🚚',
            services: [
                { key: 'deliveries', label: 'Deliveries', icon: '📬', endpoint: '/60/DlvryOrder', model: 'DeliveryOrder' },
                { key: 'delivery-lines', label: 'Delivery Lines', icon: '📋', endpoint: '/60/DlvryLine', model: 'DeliveryLine' },
                { key: 'pick-releases', label: 'Pick Releases', icon: '📋', endpoint: '/60/PickRlease', model: 'PickRelease' },
                { key: 'packing', label: 'Packing Slips', icon: '📦', endpoint: '/60/PackSlip', model: 'PackingSlip' },
                { key: 'ship-docs', label: 'Ship Docs', icon: '📄', endpoint: '/60/ShipDoc', model: 'ShippingDoc' },
                { key: 'confirmations', label: 'Confirmations', icon: '✅', endpoint: '/60/DlvryConf', model: 'DeliveryConfirm' }
            ]
        },
        'billing': {
            label: 'Billing',
            icon: '💳',
            services: [
                { key: 'schedules', label: 'Billing Schedules', icon: '📅', endpoint: '/60/BillSched', model: 'BillingSchedule' },
                { key: 'milestones', label: 'Milestones', icon: '🏁', endpoint: '/60/BillMilstn', model: 'BillingMilestone' },
                { key: 'revenue', label: 'Revenue Recog', icon: '📊', endpoint: '/60/RevSched', model: 'RevenueSchedule' }
            ]
        },
        'analytics': {
            label: 'Analytics',
            icon: '📊',
            services: [
                { key: 'targets', label: 'Sales Targets', icon: '🎯', endpoint: '/60/SalesTrgt', model: 'SalesTarget' },
                { key: 'territories', label: 'Territories', icon: '🗺️', endpoint: '/60/Territory', model: 'SalesTerritory' },
                { key: 'territory-assigns', label: 'Assignments', icon: '📍', endpoint: '/60/TerrAssign', model: 'TerritoryAssign' },
                { key: 'commission-plans', label: 'Commission Plans', icon: '💵', endpoint: '/60/CommPlan', model: 'CommissionPlan' },
                { key: 'commission-calcs', label: 'Calculations', icon: '🧮', endpoint: '/60/CommCalc', model: 'SalesCommissionCalc' },
                { key: 'forecasts', label: 'Forecasts', icon: '🔮', endpoint: '/60/SalesFcast', model: 'SalesForecast' }
            ]
        }
    };

    // Sub-module namespaces for service registry
    Sales.submodules = ['SalesCustomers', 'SalesOrders', 'SalesPricing', 'SalesShipping', 'SalesBilling', 'SalesAnalytics'];

    // Render status badge (uses shared layer8d-status-* classes)
    Sales.renderStatus = function(status) {
        const statusMap = {
            1: { label: 'Active', class: 'layer8d-status-active' },
            0: { label: 'Inactive', class: 'layer8d-status-inactive' },
            2: { label: 'Pending', class: 'layer8d-status-pending' },
            3: { label: 'Closed', class: 'layer8d-status-terminated' }
        };

        const config = statusMap[status] || { label: status, class: '' };
        return `<span class="layer8d-status ${config.class}">${Layer8DUtils.escapeHtml(config.label)}</span>`;
    };

})();
