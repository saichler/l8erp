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
 * Shared Reference Data - SCM Models
 * Used by both desktop and mobile reference registries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    window.ReferenceDataScm = {
        // ========================================
        // SCM - Procurement Models
        // ========================================
        ...ref.simple('ScmPurchaseOrder', 'purchaseOrderId', 'orderNumber', 'Purchase Order'),
        ...ref.simple('ScmPurchaseRequisition', 'requisitionId', 'requisitionNumber', 'Requisition'),
        ...ref.simple('ScmRequestForQuote', 'rfqId', 'rfqNumber', 'RFQ'),

        // ========================================
        // SCM - Inventory Models
        // ========================================
        ...ref.coded('ScmItem', 'itemId', 'itemNumber', 'name'),

        // ========================================
        // SCM - Warehouse Management Models
        // ========================================
        ...ref.coded('ScmWarehouse', 'warehouseId', 'code', 'name'),
        ...ref.idOnly('ScmReceivingOrder', 'receivingOrderId'),

        // ========================================
        // SCM - Logistics & Transportation Models
        // ========================================
        ...ref.idOnly('ScmFreightRate', 'rateId'),
        ...ref.simple('ScmShipment', 'shipmentId', 'shipmentNumber', 'Shipment'),
        ...ref.simple('ScmReturnAuthorization', 'rmaId', 'rmaNumber', 'RMA'),

        // ========================================
        // SCM - Demand Planning Models
        // ========================================
        ...ref.simple('ScmDemandForecast', 'forecastId', 'forecastId', 'Forecast'),
        ...ref.idOnly('ScmSafetyStock', 'safetyStockId'),

        // ========================================
        // SCM - Supply Planning Models
        // ========================================
        ...ref.simple('ScmSupplyPlan', 'planId', 'name', 'Supply Plan')
    };
})();
