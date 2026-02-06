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
package main

import (

	"github.com/saichler/l8erp/go/types/sales"
)

// Sales Phase 1: Foundation
func generateSalesPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate Sales Territories
	territories := generateSalesTerritories(store)
	if err := runOp(client, "Sales Territories", "/erp/60/Territory", &sales.SalesTerritoryList{List: territories}, extractIDs(territories, func(e *sales.SalesTerritory) string { return e.TerritoryId }), &store.SalesTerritoryIDs); err != nil {
		return err
	}

	// Generate Sales Price Lists
	priceLists := generateSalesPriceLists()
	if err := runOp(client, "Sales Price Lists", "/erp/60/PriceList", &sales.SalesPriceListList{List: priceLists}, extractIDs(priceLists, func(e *sales.SalesPriceList) string { return e.PriceListId }), &store.SalesPriceListIDs); err != nil {
		return err
	}

	// Generate Customer Hierarchies
	hierarchies := generateSalesCustomerHierarchies(store)
	if err := runOp(client, "Customer Hierarchies", "/erp/60/CustHier", &sales.SalesCustomerHierarchyList{List: hierarchies}, extractIDs(hierarchies, func(e *sales.SalesCustomerHierarchy) string { return e.HierarchyId }), &store.SalesCustomerHierarchyIDs); err != nil {
		return err
	}

	// Generate Customer Segments
	segments := generateSalesCustomerSegments()
	if err := runOp(client, "Customer Segments", "/erp/60/CustSegmt", &sales.SalesCustomerSegmentList{List: segments}, extractIDs(segments, func(e *sales.SalesCustomerSegment) string { return e.SegmentId }), &store.SalesCustomerSegmentIDs); err != nil {
		return err
	}

	return nil
}

// Sales Phase 2: Customer & Partners
func generateSalesPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Partner Channels
	partners := generateSalesPartnerChannels(store)
	if err := runOp(client, "Partner Channels", "/erp/60/Partner", &sales.SalesPartnerChannelList{List: partners}, extractIDs(partners, func(e *sales.SalesPartnerChannel) string { return e.PartnerId }), &store.SalesPartnerChannelIDs); err != nil {
		return err
	}

	// Generate Customer Contracts
	contracts := generateSalesCustomerContracts(store)
	if err := runOp(client, "Customer Contracts", "/erp/60/CustContr", &sales.SalesCustomerContractList{List: contracts}, extractIDs(contracts, func(e *sales.SalesCustomerContract) string { return e.ContractId }), &store.SalesCustomerContractIDs); err != nil {
		return err
	}

	return nil
}

// Sales Phase 3: Pricing Setup
func generateSalesPhase3(client *HCMClient, store *MockDataStore) error {
	// Generate Price List Entries
	entries := generateSalesPriceListEntries(store)
	if err := runOp(client, "Price List Entries", "/erp/60/PriceEntry", &sales.SalesPriceListEntryList{List: entries}, extractIDs(entries, func(e *sales.SalesPriceListEntry) string { return e.EntryId }), &store.SalesPriceListEntryIDs); err != nil {
		return err
	}

	// Generate Customer Prices
	customerPrices := generateSalesCustomerPrices(store)
	if err := runOp(client, "Customer Prices", "/erp/60/CustPrice", &sales.SalesCustomerPriceList{List: customerPrices}, extractIDs(customerPrices, func(e *sales.SalesCustomerPrice) string { return e.CustomerPriceId }), &store.SalesCustomerPriceIDs); err != nil {
		return err
	}

	// Generate Discount Rules
	discountRules := generateSalesDiscountRules(store)
	if err := runOp(client, "Discount Rules", "/erp/60/DiscntRule", &sales.SalesDiscountRuleList{List: discountRules}, extractIDs(discountRules, func(e *sales.SalesDiscountRule) string { return e.RuleId }), &store.SalesDiscountRuleIDs); err != nil {
		return err
	}

	// Generate Promotional Prices
	promotions := generateSalesPromotionalPrices(store)
	if err := runOp(client, "Promotional Prices", "/erp/60/PromoPrice", &sales.SalesPromotionalPriceList{List: promotions}, extractIDs(promotions, func(e *sales.SalesPromotionalPrice) string { return e.PromoId }), &store.SalesPromotionalPriceIDs); err != nil {
		return err
	}

	// Generate Quantity Breaks
	qtyBreaks := generateSalesQuantityBreaks(store)
	if err := runOp(client, "Quantity Breaks", "/erp/60/QtyBreak", &sales.SalesQuantityBreakList{List: qtyBreaks}, extractIDs(qtyBreaks, func(e *sales.SalesQuantityBreak) string { return e.BreakId }), &store.SalesQuantityBreakIDs); err != nil {
		return err
	}

	return nil
}

// Sales Phase 4: Quotations
func generateSalesPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Quotations
	quotations := generateSalesQuotations(store)
	if err := runOp(client, "Quotations", "/erp/60/SalesQuote", &sales.SalesQuotationList{List: quotations}, extractIDs(quotations, func(e *sales.SalesQuotation) string { return e.QuotationId }), &store.SalesQuotationIDs); err != nil {
		return err
	}

	// Generate Quotation Lines
	quotationLines := generateSalesQuotationLines(store)
	if err := runOp(client, "Quotation Lines", "/erp/60/QuoteLine", &sales.SalesQuotationLineList{List: quotationLines}, extractIDs(quotationLines, func(e *sales.SalesQuotationLine) string { return e.LineId }), &store.SalesQuotationLineIDs); err != nil {
		return err
	}

	return nil
}

// Sales Phase 5: Orders
func generateSalesPhase5(client *HCMClient, store *MockDataStore) error {
	// Generate Sales Orders
	orders := generateSalesOrders(store)
	if err := runOp(client, "Sales Orders", "/erp/60/SalesOrder", &sales.SalesOrderList{List: orders}, extractIDs(orders, func(e *sales.SalesOrder) string { return e.SalesOrderId }), &store.SalesOrderIDs); err != nil {
		return err
	}

	// Generate Sales Order Lines
	orderLines := generateSalesOrderLines(store)
	if err := runOp(client, "Sales Order Lines", "/erp/60/OrderLine", &sales.SalesOrderLineList{List: orderLines}, extractIDs(orderLines, func(e *sales.SalesOrderLine) string { return e.LineId }), &store.SalesOrderLineIDs); err != nil {
		return err
	}

	// Generate Sales Order Allocations
	allocations := generateSalesOrderAllocations(store)
	if err := runOp(client, "Order Allocations", "/erp/60/OrderAlloc", &sales.SalesOrderAllocationList{List: allocations}, extractIDs(allocations, func(e *sales.SalesOrderAllocation) string { return e.AllocationId }), &store.SalesOrderAllocationIDs); err != nil {
		return err
	}

	// Generate Sales Back Orders
	backOrders := generateSalesBackOrders(store)
	if err := runOp(client, "Back Orders", "/erp/60/BackOrder", &sales.SalesBackOrderList{List: backOrders}, extractIDs(backOrders, func(e *sales.SalesBackOrder) string { return e.BackOrderId }), &store.SalesBackOrderIDs); err != nil {
		return err
	}

	// Generate Sales Return Orders
	returns := generateSalesReturnOrders(store)
	if err := runOp(client, "Sales Return Orders", "/erp/60/ReturnOrd", &sales.SalesReturnOrderList{List: returns}, extractIDs(returns, func(e *sales.SalesReturnOrder) string { return e.ReturnOrderId }), &store.SalesReturnOrderIDs); err != nil {
		return err
	}

	// Generate Sales Return Order Lines
	returnLines := generateSalesReturnOrderLines(store)
	if err := runOp(client, "Return Order Lines", "/erp/60/ReturnLine", &sales.SalesReturnOrderLineList{List: returnLines}, extractIDs(returnLines, func(e *sales.SalesReturnOrderLine) string { return e.LineId }), &store.SalesReturnOrderLineIDs); err != nil {
		return err
	}

	return nil
}
