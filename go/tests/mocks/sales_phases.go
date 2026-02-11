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
package mocks

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
	priceLists := generateSalesPriceLists(store)
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

	return nil
}

// Sales Phase 4: Quotations
func generateSalesPhase4(client *HCMClient, store *MockDataStore) error {
	quotations := generateSalesQuotations(store)
	if err := runOp(client, "Quotations", "/erp/60/SalesQuote", &sales.SalesQuotationList{List: quotations}, extractIDs(quotations, func(e *sales.SalesQuotation) string { return e.QuotationId }), &store.SalesQuotationIDs); err != nil {
		return err
	}

	return nil
}

// Sales Phase 5: Orders
func generateSalesPhase5(client *HCMClient, store *MockDataStore) error {
	orders := generateSalesOrders(store)
	if err := runOp(client, "Sales Orders", "/erp/60/SalesOrder", &sales.SalesOrderList{List: orders}, extractIDs(orders, func(e *sales.SalesOrder) string { return e.SalesOrderId }), &store.SalesOrderIDs); err != nil {
		return err
	}

	returns := generateSalesReturnOrders(store)
	if err := runOp(client, "Sales Return Orders", "/erp/60/ReturnOrd", &sales.SalesReturnOrderList{List: returns}, extractIDs(returns, func(e *sales.SalesReturnOrder) string { return e.ReturnOrderId }), &store.SalesReturnOrderIDs); err != nil {
		return err
	}

	return nil
}
