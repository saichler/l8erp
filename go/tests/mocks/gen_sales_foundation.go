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
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/sales"
)

// generateSalesTerritories creates sales territory records
func generateSalesTerritories(store *MockDataStore) []*sales.SalesTerritory {
	territoryTypes := []sales.SalesTerritoryType{
		sales.SalesTerritoryType_TERRITORY_TYPE_GEOGRAPHIC,
		sales.SalesTerritoryType_TERRITORY_TYPE_ACCOUNT_BASED,
		sales.SalesTerritoryType_TERRITORY_TYPE_INDUSTRY,
		sales.SalesTerritoryType_TERRITORY_TYPE_PRODUCT,
	}

	territories := make([]*sales.SalesTerritory, len(salesTerritoryNames))
	for i, name := range salesTerritoryNames {
		managerID := ""
		if len(store.ManagerIDs) > 0 {
			managerID = store.ManagerIDs[i%len(store.ManagerIDs)]
		} else if len(store.EmployeeIDs) > 0 {
			managerID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		territory := &sales.SalesTerritory{
			TerritoryId:   genID("sterr", i),
			Name:          name,
			Description:   fmt.Sprintf("Sales territory for %s", name),
			TerritoryType: territoryTypes[i%len(territoryTypes)],
			Region:        salesRegionNames[i%len(salesRegionNames)],
			ManagerId:     managerID,
			IsActive:      true,
			AuditInfo:     createAuditInfo(),
		}

		// First 4 territories are top-level; rest link to first 4
		if i >= 4 {
			territory.ParentTerritoryId = fmt.Sprintf("sterr-%03d", (i%4)+1)
		}

		// Add country/state codes based on region
		if i < 4 {
			territory.CountryCodes = []string{"US", "CA"}
		} else if i < 8 {
			territory.StateCodes = states[:3]
		}

		territories[i] = territory
	}
	return territories
}

// generateSalesPriceLists creates sales price list records
func generateSalesPriceLists(store *MockDataStore) []*sales.SalesPriceList {
	statuses := []sales.SalesPriceListStatus{
		sales.SalesPriceListStatus_PRICE_LIST_STATUS_ACTIVE,
		sales.SalesPriceListStatus_PRICE_LIST_STATUS_ACTIVE,
		sales.SalesPriceListStatus_PRICE_LIST_STATUS_ACTIVE,
		sales.SalesPriceListStatus_PRICE_LIST_STATUS_ACTIVE,
		sales.SalesPriceListStatus_PRICE_LIST_STATUS_ACTIVE,
		sales.SalesPriceListStatus_PRICE_LIST_STATUS_DRAFT,
		sales.SalesPriceListStatus_PRICE_LIST_STATUS_DRAFT,
		sales.SalesPriceListStatus_PRICE_LIST_STATUS_EXPIRED,
	}

	priceLists := make([]*sales.SalesPriceList, len(salesPriceListNames))
	for i, name := range salesPriceListNames {
		effectiveDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		expiryDate := effectiveDate.AddDate(1, 0, 0)

		priceLists[i] = &sales.SalesPriceList{
			PriceListId:   genID("spl", i),
			Name:          name,
			Description:   fmt.Sprintf("Price list: %s", name),
			CurrencyId: pickRef(store.CurrencyIDs, i),
			Status:        statuses[i%len(statuses)],
			EffectiveDate: effectiveDate.Unix(),
			ExpiryDate:    expiryDate.Unix(),
			IsDefault:     i == 0, // First one is default
			Notes:         fmt.Sprintf("Pricing configuration for %s", name),
			AuditInfo:     createAuditInfo(),
		}
	}
	return priceLists
}

// generateSalesCustomerHierarchies creates customer hierarchy records
func generateSalesCustomerHierarchies(store *MockDataStore) []*sales.SalesCustomerHierarchy {
	hierarchies := make([]*sales.SalesCustomerHierarchy, len(salesHierarchyNames))
	for i, name := range salesHierarchyNames {
		hierarchy := &sales.SalesCustomerHierarchy{
			HierarchyId: genID("sch", i),
			Name:        name,
			Description: fmt.Sprintf("Customer hierarchy for %s", name),
			Level:       int32((i % 3) + 1),
			IsActive:    true,
			AuditInfo:   createAuditInfo(),
		}

		// First 3 are top-level; rest link to first 3
		if i >= 3 {
			hierarchy.ParentHierarchyId = fmt.Sprintf("sch-%03d", (i%3)+1)
		}

		// Link some customers from FIN
		if len(store.CustomerIDs) > 0 {
			numCustomers := rand.Intn(3) + 1
			customerIds := make([]string, numCustomers)
			for j := 0; j < numCustomers; j++ {
				customerIds[j] = store.CustomerIDs[(i*numCustomers+j)%len(store.CustomerIDs)]
			}
			hierarchy.CustomerIds = customerIds
		}

		hierarchies[i] = hierarchy
	}
	return hierarchies
}

// generateSalesCustomerSegments creates customer segment records
func generateSalesCustomerSegments() []*sales.SalesCustomerSegment {
	segmentTypes := []sales.SalesSegmentType{
		sales.SalesSegmentType_SEGMENT_TYPE_SIZE,
		sales.SalesSegmentType_SEGMENT_TYPE_INDUSTRY,
		sales.SalesSegmentType_SEGMENT_TYPE_GEOGRAPHY,
		sales.SalesSegmentType_SEGMENT_TYPE_BEHAVIOR,
		sales.SalesSegmentType_SEGMENT_TYPE_VALUE,
	}

	segments := make([]*sales.SalesCustomerSegment, len(salesSegmentNames))
	for i, name := range salesSegmentNames {
		segments[i] = &sales.SalesCustomerSegment{
			SegmentId:     genID("sseg", i),
			Name:          name,
			Description:   fmt.Sprintf("Customer segment: %s", name),
			SegmentType:   segmentTypes[i%len(segmentTypes)],
			Criteria:      fmt.Sprintf("revenue > %d AND employees > %d", (i+1)*100000, (i+1)*10),
			CustomerCount: int32(rand.Intn(100) + 10),
			IsActive:      true,
			AuditInfo:     createAuditInfo(),
		}
	}
	return segments
}
