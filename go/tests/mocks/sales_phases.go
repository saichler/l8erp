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
	"fmt"

	"github.com/saichler/l8erp/go/types/sales"
)

// Sales Phase 1: Foundation
func generateSalesPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate Sales Territories
	fmt.Printf("  Creating Sales Territories...")
	territories := generateSalesTerritories(store)
	if err := client.post("/erp/60/SalesTerritory", &sales.SalesTerritoryList{List: territories}); err != nil {
		return fmt.Errorf("sales territories: %w", err)
	}
	for _, t := range territories {
		store.SalesTerritoryIDs = append(store.SalesTerritoryIDs, t.TerritoryId)
	}
	fmt.Printf(" %d created\n", len(territories))

	// Generate Sales Price Lists
	fmt.Printf("  Creating Sales Price Lists...")
	priceLists := generateSalesPriceLists()
	if err := client.post("/erp/60/PriceList", &sales.SalesPriceListList{List: priceLists}); err != nil {
		return fmt.Errorf("sales price lists: %w", err)
	}
	for _, pl := range priceLists {
		store.SalesPriceListIDs = append(store.SalesPriceListIDs, pl.PriceListId)
	}
	fmt.Printf(" %d created\n", len(priceLists))

	// Generate Customer Hierarchies
	fmt.Printf("  Creating Customer Hierarchies...")
	hierarchies := generateSalesCustomerHierarchies(store)
	if err := client.post("/erp/60/CustHier", &sales.SalesCustomerHierarchyList{List: hierarchies}); err != nil {
		return fmt.Errorf("customer hierarchies: %w", err)
	}
	for _, h := range hierarchies {
		store.SalesCustomerHierarchyIDs = append(store.SalesCustomerHierarchyIDs, h.HierarchyId)
	}
	fmt.Printf(" %d created\n", len(hierarchies))

	// Generate Customer Segments
	fmt.Printf("  Creating Customer Segments...")
	segments := generateSalesCustomerSegments()
	if err := client.post("/erp/60/CustSeg", &sales.SalesCustomerSegmentList{List: segments}); err != nil {
		return fmt.Errorf("customer segments: %w", err)
	}
	for _, s := range segments {
		store.SalesCustomerSegmentIDs = append(store.SalesCustomerSegmentIDs, s.SegmentId)
	}
	fmt.Printf(" %d created\n", len(segments))

	return nil
}

// Sales Phase 2: Customer & Partners
func generateSalesPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Partner Channels
	fmt.Printf("  Creating Partner Channels...")
	partners := generateSalesPartnerChannels(store)
	if err := client.post("/erp/60/Partner", &sales.SalesPartnerChannelList{List: partners}); err != nil {
		return fmt.Errorf("partner channels: %w", err)
	}
	for _, p := range partners {
		store.SalesPartnerChannelIDs = append(store.SalesPartnerChannelIDs, p.PartnerId)
	}
	fmt.Printf(" %d created\n", len(partners))

	// Generate Customer Contracts
	fmt.Printf("  Creating Customer Contracts...")
	contracts := generateSalesCustomerContracts(store)
	if err := client.post("/erp/60/CustContr", &sales.SalesCustomerContractList{List: contracts}); err != nil {
		return fmt.Errorf("customer contracts: %w", err)
	}
	for _, c := range contracts {
		store.SalesCustomerContractIDs = append(store.SalesCustomerContractIDs, c.ContractId)
	}
	fmt.Printf(" %d created\n", len(contracts))

	return nil
}

// Sales Phase 3: Pricing Setup
func generateSalesPhase3(client *HCMClient, store *MockDataStore) error {
	// Generate Price List Entries
	fmt.Printf("  Creating Price List Entries...")
	entries := generateSalesPriceListEntries(store)
	if err := client.post("/erp/60/PriceEntry", &sales.SalesPriceListEntryList{List: entries}); err != nil {
		return fmt.Errorf("price list entries: %w", err)
	}
	for _, e := range entries {
		store.SalesPriceListEntryIDs = append(store.SalesPriceListEntryIDs, e.EntryId)
	}
	fmt.Printf(" %d created\n", len(entries))

	// Generate Customer Prices
	fmt.Printf("  Creating Customer Prices...")
	customerPrices := generateSalesCustomerPrices(store)
	if err := client.post("/erp/60/CustPrice", &sales.SalesCustomerPriceList{List: customerPrices}); err != nil {
		return fmt.Errorf("customer prices: %w", err)
	}
	for _, cp := range customerPrices {
		store.SalesCustomerPriceIDs = append(store.SalesCustomerPriceIDs, cp.CustomerPriceId)
	}
	fmt.Printf(" %d created\n", len(customerPrices))

	// Generate Discount Rules
	fmt.Printf("  Creating Discount Rules...")
	discountRules := generateSalesDiscountRules(store)
	if err := client.post("/erp/60/DiscRule", &sales.SalesDiscountRuleList{List: discountRules}); err != nil {
		return fmt.Errorf("discount rules: %w", err)
	}
	for _, dr := range discountRules {
		store.SalesDiscountRuleIDs = append(store.SalesDiscountRuleIDs, dr.RuleId)
	}
	fmt.Printf(" %d created\n", len(discountRules))

	// Generate Promotional Prices
	fmt.Printf("  Creating Promotional Prices...")
	promotions := generateSalesPromotionalPrices(store)
	if err := client.post("/erp/60/PromoPrice", &sales.SalesPromotionalPriceList{List: promotions}); err != nil {
		return fmt.Errorf("promotional prices: %w", err)
	}
	for _, p := range promotions {
		store.SalesPromotionalPriceIDs = append(store.SalesPromotionalPriceIDs, p.PromoId)
	}
	fmt.Printf(" %d created\n", len(promotions))

	return nil
}

// Sales Phase 4: Quotations
func generateSalesPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Quotations
	fmt.Printf("  Creating Quotations...")
	quotations := generateSalesQuotations(store)
	if err := client.post("/erp/60/Quotation", &sales.SalesQuotationList{List: quotations}); err != nil {
		return fmt.Errorf("quotations: %w", err)
	}
	for _, q := range quotations {
		store.SalesQuotationIDs = append(store.SalesQuotationIDs, q.QuotationId)
	}
	fmt.Printf(" %d created\n", len(quotations))

	// Generate Quotation Lines
	fmt.Printf("  Creating Quotation Lines...")
	quotationLines := generateSalesQuotationLines(store)
	if err := client.post("/erp/60/QuoteLine", &sales.SalesQuotationLineList{List: quotationLines}); err != nil {
		return fmt.Errorf("quotation lines: %w", err)
	}
	for _, ql := range quotationLines {
		store.SalesQuotationLineIDs = append(store.SalesQuotationLineIDs, ql.LineId)
	}
	fmt.Printf(" %d created\n", len(quotationLines))

	return nil
}

// Sales Phase 5: Orders
func generateSalesPhase5(client *HCMClient, store *MockDataStore) error {
	// Generate Sales Orders
	fmt.Printf("  Creating Sales Orders...")
	orders := generateSalesOrders(store)
	if err := client.post("/erp/60/SalesOrder", &sales.SalesOrderList{List: orders}); err != nil {
		return fmt.Errorf("sales orders: %w", err)
	}
	for _, o := range orders {
		store.SalesOrderIDs = append(store.SalesOrderIDs, o.SalesOrderId)
	}
	fmt.Printf(" %d created\n", len(orders))

	// Generate Sales Order Lines
	fmt.Printf("  Creating Sales Order Lines...")
	orderLines := generateSalesOrderLines(store)
	if err := client.post("/erp/60/OrderLine", &sales.SalesOrderLineList{List: orderLines}); err != nil {
		return fmt.Errorf("sales order lines: %w", err)
	}
	for _, ol := range orderLines {
		store.SalesOrderLineIDs = append(store.SalesOrderLineIDs, ol.LineId)
	}
	fmt.Printf(" %d created\n", len(orderLines))

	// Generate Sales Return Orders
	fmt.Printf("  Creating Sales Return Orders...")
	returns := generateSalesReturnOrders(store)
	if err := client.post("/erp/60/ReturnOrd", &sales.SalesReturnOrderList{List: returns}); err != nil {
		return fmt.Errorf("sales return orders: %w", err)
	}
	for _, r := range returns {
		store.SalesReturnOrderIDs = append(store.SalesReturnOrderIDs, r.ReturnOrderId)
	}
	fmt.Printf(" %d created\n", len(returns))

	return nil
}
