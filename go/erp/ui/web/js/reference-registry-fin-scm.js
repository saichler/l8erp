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
 * ERP Reference Registry - Financial & SCM Models
 * Registers GL, AP, AR, Cash, Fixed Assets, Budgeting, Tax, and all SCM models.
 */
Layer8DReferenceRegistry.register({
        // ========================================
        // Financial Management - General Ledger
        // ========================================
        Account: {
            idColumn: 'accountId',
            displayColumn: 'name',
            selectColumns: ['accountId', 'accountNumber', 'name'],
            displayFormat: function(item) {
                return item.accountNumber + ' - ' + item.name;
            },
            displayLabel: 'Account'
        },
        JournalEntry: {
            idColumn: 'journalEntryId',
            displayColumn: 'entryNumber'
        },
        JournalEntryLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        FiscalYear: {
            idColumn: 'fiscalYearId',
            displayColumn: 'yearName',
            selectColumns: ['fiscalYearId', 'yearName']
        },
        FiscalPeriod: {
            idColumn: 'fiscalPeriodId',
            displayColumn: 'periodName',
            selectColumns: ['fiscalPeriodId', 'periodName']
        },
        Currency: {
            idColumn: 'currencyId',
            displayColumn: 'name',
            selectColumns: ['currencyId', 'code', 'name'],
            displayFormat: function(item) {
                return item.code + ' - ' + item.name;
            },
            displayLabel: 'Currency'
        },
        ExchangeRate: {
            idColumn: 'exchangeRateId',
            displayColumn: 'exchangeRateId'
        },
        AccountBalance: {
            idColumn: 'balanceId',
            displayColumn: 'balanceId'
        },

        // ========================================
        // Financial Management - Accounts Payable
        // ========================================
        Vendor: {
            idColumn: 'vendorId',
            displayColumn: 'name',
            selectColumns: ['vendorId', 'vendorNumber', 'name'],
            displayFormat: function(item) {
                return item.vendorNumber + ' - ' + item.name;
            },
            displayLabel: 'Vendor'
        },
        VendorContact: {
            idColumn: 'contactId',
            displayColumn: 'contactName'
        },
        PurchaseInvoice: {
            idColumn: 'invoiceId',
            displayColumn: 'invoiceNumber'
        },
        PurchaseInvoiceLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        PaymentSchedule: {
            idColumn: 'scheduleId',
            displayColumn: 'scheduleId'
        },
        VendorPayment: {
            idColumn: 'paymentId',
            displayColumn: 'paymentNumber'
        },
        PaymentAllocation: {
            idColumn: 'allocationId',
            displayColumn: 'allocationId'
        },
        VendorStatement: {
            idColumn: 'statementId',
            displayColumn: 'statementId'
        },

        // ========================================
        // Financial Management - Accounts Receivable
        // ========================================
        Customer: {
            idColumn: 'customerId',
            displayColumn: 'name',
            selectColumns: ['customerId', 'customerNumber', 'name'],
            displayFormat: function(item) {
                return item.customerNumber + ' - ' + item.name;
            },
            displayLabel: 'Customer'
        },
        CustomerContact: {
            idColumn: 'contactId',
            displayColumn: 'contactName'
        },
        SalesInvoice: {
            idColumn: 'invoiceId',
            displayColumn: 'invoiceNumber'
        },
        SalesInvoiceLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        CustomerPayment: {
            idColumn: 'paymentId',
            displayColumn: 'paymentNumber'
        },
        PaymentApplication: {
            idColumn: 'applicationId',
            displayColumn: 'applicationId'
        },
        CreditMemo: {
            idColumn: 'creditMemoId',
            displayColumn: 'memoNumber'
        },
        DunningLetter: {
            idColumn: 'letterId',
            displayColumn: 'letterId'
        },

        // ========================================
        // Financial Management - Cash Management
        // ========================================
        BankAccount: {
            idColumn: 'bankAccountId',
            displayColumn: 'accountName',
            selectColumns: ['bankAccountId', 'accountName', 'bankName'],
            displayFormat: function(item) {
                return item.bankName + ' - ' + item.accountName;
            },
            displayLabel: 'Bank Account'
        },
        BankTransaction: {
            idColumn: 'transactionId',
            displayColumn: 'transactionId'
        },
        BankReconciliation: {
            idColumn: 'reconciliationId',
            displayColumn: 'reconciliationId'
        },
        CashForecast: {
            idColumn: 'forecastId',
            displayColumn: 'forecastId'
        },
        FundTransfer: {
            idColumn: 'transferId',
            displayColumn: 'transferId'
        },
        PettyCash: {
            idColumn: 'pettyCashId',
            displayColumn: 'pettyCashId'
        },

        // ========================================
        // Financial Management - Fixed Assets
        // ========================================
        Asset: {
            idColumn: 'assetId',
            displayColumn: 'name',
            selectColumns: ['assetId', 'assetNumber', 'name'],
            displayFormat: function(item) {
                return item.assetNumber + ' - ' + item.name;
            },
            displayLabel: 'Asset'
        },
        AssetCategory: {
            idColumn: 'categoryId',
            displayColumn: 'name',
            selectColumns: ['categoryId', 'name']
        },
        DepreciationSchedule: {
            idColumn: 'scheduleId',
            displayColumn: 'scheduleId'
        },
        AssetDisposal: {
            idColumn: 'disposalId',
            displayColumn: 'disposalId'
        },
        AssetTransfer: {
            idColumn: 'transferId',
            displayColumn: 'transferId'
        },
        AssetMaintenance: {
            idColumn: 'maintenanceId',
            displayColumn: 'maintenanceId'
        },
        AssetRevaluation: {
            idColumn: 'revaluationId',
            displayColumn: 'revaluationId'
        },

        // ========================================
        // Financial Management - Budgeting
        // ========================================
        Budget: {
            idColumn: 'budgetId',
            displayColumn: 'budgetName',
            selectColumns: ['budgetId', 'budgetName']
        },
        BudgetLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        BudgetTransfer: {
            idColumn: 'transferId',
            displayColumn: 'transferId'
        },
        BudgetScenario: {
            idColumn: 'scenarioId',
            displayColumn: 'name'
        },
        CapitalExpenditure: {
            idColumn: 'capexId',
            displayColumn: 'name'
        },
        Forecast: {
            idColumn: 'forecastId',
            displayColumn: 'forecastId'
        },

        // ========================================
        // Financial Management - Tax
        // ========================================
        TaxCode: {
            idColumn: 'taxCodeId',
            displayColumn: 'name',
            selectColumns: ['taxCodeId', 'code', 'name'],
            displayFormat: function(item) {
                return item.code + ' - ' + item.name;
            },
            displayLabel: 'Tax Code'
        },
        TaxJurisdiction: {
            idColumn: 'jurisdictionId',
            displayColumn: 'name'
        },
        TaxRule: {
            idColumn: 'ruleId',
            displayColumn: 'name'
        },
        TaxReturn: {
            idColumn: 'returnId',
            displayColumn: 'returnId'
        },
        TaxExemption: {
            idColumn: 'exemptionId',
            displayColumn: 'exemptionId'
        },
        WithholdingTaxConfig: {
            idColumn: 'configId',
            displayColumn: 'name'
        },

        // ========================================
        // SCM - Procurement Models
        // ========================================
        ScmPurchaseOrder: {
            idColumn: 'purchaseOrderId',
            displayColumn: 'orderNumber',
            selectColumns: ['purchaseOrderId', 'orderNumber'],
            displayLabel: 'Purchase Order'
        },
        ScmPurchaseOrderLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        ScmPurchaseRequisition: {
            idColumn: 'requisitionId',
            displayColumn: 'requisitionNumber',
            selectColumns: ['requisitionId', 'requisitionNumber'],
            displayLabel: 'Requisition'
        },
        ScmRequisitionLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        ScmSupplierContract: {
            idColumn: 'contractId',
            displayColumn: 'contractNumber',
            selectColumns: ['contractId', 'contractNumber'],
            displayLabel: 'Contract'
        },
        ScmContractTerm: {
            idColumn: 'termId',
            displayColumn: 'termId'
        },
        ScmRequestForQuote: {
            idColumn: 'rfqId',
            displayColumn: 'rfqNumber',
            selectColumns: ['rfqId', 'rfqNumber'],
            displayLabel: 'RFQ'
        },

        // ========================================
        // SCM - Inventory Models
        // ========================================
        ScmItem: {
            idColumn: 'itemId',
            displayColumn: 'name',
            selectColumns: ['itemId', 'itemNumber', 'name'],
            displayFormat: function(item) {
                return item.itemNumber + ' - ' + item.name;
            },
            displayLabel: 'Item'
        },
        ScmItemCategory: {
            idColumn: 'categoryId',
            displayColumn: 'name'
        },
        ScmInventoryLocation: {
            idColumn: 'locationId',
            displayColumn: 'name'
        },
        ScmStockLevel: {
            idColumn: 'stockLevelId',
            displayColumn: 'stockLevelId'
        },
        ScmStockMovement: {
            idColumn: 'movementId',
            displayColumn: 'movementId'
        },
        ScmInventoryCount: {
            idColumn: 'countId',
            displayColumn: 'countId'
        },
        ScmLotSerial: {
            idColumn: 'lotSerialId',
            displayColumn: 'lotNumber'
        },
        ScmItemPricing: {
            idColumn: 'pricingId',
            displayColumn: 'pricingId'
        },

        // ========================================
        // SCM - Warehouse Management Models
        // ========================================
        ScmWarehouse: {
            idColumn: 'warehouseId',
            displayColumn: 'name',
            selectColumns: ['warehouseId', 'warehouseCode', 'name'],
            displayFormat: function(item) {
                return item.warehouseCode + ' - ' + item.name;
            },
            displayLabel: 'Warehouse'
        },
        ScmZone: {
            idColumn: 'zoneId',
            displayColumn: 'name'
        },
        ScmBin: {
            idColumn: 'binId',
            displayColumn: 'binCode'
        },
        ScmReceivingOrder: {
            idColumn: 'receivingOrderId',
            displayColumn: 'orderNumber'
        },
        ScmReceivingLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        ScmPickOrder: {
            idColumn: 'pickOrderId',
            displayColumn: 'orderNumber'
        },
        ScmPickLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        ScmPackOrder: {
            idColumn: 'packOrderId',
            displayColumn: 'orderNumber'
        },
        ScmPackLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },

        // ========================================
        // SCM - Logistics & Transportation Models
        // ========================================
        ScmShipmentCarrier: {
            idColumn: 'carrierId',
            displayColumn: 'name',
            selectColumns: ['carrierId', 'carrierCode', 'name'],
            displayFormat: function(item) {
                return item.carrierCode + ' - ' + item.name;
            },
            displayLabel: 'Carrier'
        },
        ScmShipment: {
            idColumn: 'shipmentId',
            displayColumn: 'shipmentNumber',
            selectColumns: ['shipmentId', 'shipmentNumber'],
            displayLabel: 'Shipment'
        },
        ScmShipmentLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        ScmFreightRate: {
            idColumn: 'rateId',
            displayColumn: 'rateId'
        },
        ScmDeliveryRoute: {
            idColumn: 'routeId',
            displayColumn: 'name'
        },
        ScmRouteStop: {
            idColumn: 'stopId',
            displayColumn: 'stopId'
        },
        ScmReturnOrder: {
            idColumn: 'returnOrderId',
            displayColumn: 'orderNumber'
        },
        ScmReturnLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },

        // ========================================
        // SCM - Demand Planning Models
        // ========================================
        ScmDemandForecast: {
            idColumn: 'forecastId',
            displayColumn: 'forecastName',
            selectColumns: ['forecastId', 'forecastName'],
            displayLabel: 'Forecast'
        },
        ScmForecastItem: {
            idColumn: 'forecastItemId',
            displayColumn: 'forecastItemId'
        },
        ScmDemandHistory: {
            idColumn: 'historyId',
            displayColumn: 'historyId'
        },
        ScmSeasonalProfile: {
            idColumn: 'profileId',
            displayColumn: 'name'
        },
        ScmPromotionImpact: {
            idColumn: 'impactId',
            displayColumn: 'impactId'
        },
        ScmConsensusAdjustment: {
            idColumn: 'adjustmentId',
            displayColumn: 'adjustmentId'
        },

        // ========================================
        // SCM - Supply Planning Models
        // ========================================
        ScmSupplyPlan: {
            idColumn: 'planId',
            displayColumn: 'planName',
            selectColumns: ['planId', 'planName'],
            displayLabel: 'Supply Plan'
        },
        ScmPlannedOrder: {
            idColumn: 'plannedOrderId',
            displayColumn: 'orderNumber'
        },
        ScmMRPRun: {
            idColumn: 'mrpRunId',
            displayColumn: 'mrpRunId'
        },
        ScmMRPException: {
            idColumn: 'exceptionId',
            displayColumn: 'exceptionId'
        },
        ScmSafetyStock: {
            idColumn: 'safetyStockId',
            displayColumn: 'safetyStockId'
        },
        ScmReorderRule: {
            idColumn: 'ruleId',
            displayColumn: 'ruleName'
        }

        // ========================================
        // Future: Manufacturing, Sales models
        // ========================================
});
