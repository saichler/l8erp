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

	"github.com/saichler/l8erp/go/types/scm"
)

// generateItemCategories creates item category records
func generateItemCategories() []*scm.ScmItemCategory {
	categories := make([]*scm.ScmItemCategory, len(itemCategoryNames))
	for i, name := range itemCategoryNames {
		cat := &scm.ScmItemCategory{
			CategoryId:  genID("icat", i),
			Name:        name,
			Description: fmt.Sprintf("Category for %s", name),
			IsActive:    true,
			AuditInfo:   createAuditInfo(),
		}
		// First 3 categories have no parent; rest link to one of the first 3
		if i >= 3 {
			cat.ParentCategoryId = fmt.Sprintf("icat-%03d", (i%3)+1)
		}
		categories[i] = cat
	}
	return categories
}

// generateWarehouses creates warehouse records
func generateWarehouses(store *MockDataStore) []*scm.ScmWarehouse {
	warehouseTypes := []scm.ScmWarehouseType{
		scm.ScmWarehouseType_WAREHOUSE_TYPE_STANDARD,
		scm.ScmWarehouseType_WAREHOUSE_TYPE_STANDARD,
		scm.ScmWarehouseType_WAREHOUSE_TYPE_STANDARD,
		scm.ScmWarehouseType_WAREHOUSE_TYPE_STANDARD,
		scm.ScmWarehouseType_WAREHOUSE_TYPE_COLD_STORAGE,
		scm.ScmWarehouseType_WAREHOUSE_TYPE_HAZMAT,
	}

	warehouses := make([]*scm.ScmWarehouse, len(warehouseNames))
	for i, name := range warehouseNames {
		managerID := ""
		if len(store.ManagerIDs) > 0 {
			managerID = store.ManagerIDs[i%len(store.ManagerIDs)]
		} else if len(store.EmployeeIDs) > 0 {
			managerID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		warehouses[i] = &scm.ScmWarehouse{
			WarehouseId:   genID("wh", i),
			Code:          genCode("WH", i),
			Name:          name,
			WarehouseType: warehouseTypes[i],
			Address:       createAddress(),
			ManagerId:     managerID,
			IsActive:      true,
			Capacity:      float64(rand.Intn(40001) + 10000),
			Notes:         fmt.Sprintf("Warehouse facility: %s", name),
			AuditInfo:     createAuditInfo(),
		}
	}
	return warehouses
}

// generateBins creates bin records (5 per warehouse = 30 total)
func generateBins(store *MockDataStore) []*scm.ScmBin {
	binTypes := []scm.ScmBinType{
		scm.ScmBinType_BIN_TYPE_STORAGE,
		scm.ScmBinType_BIN_TYPE_PICKING,
		scm.ScmBinType_BIN_TYPE_RECEIVING,
		scm.ScmBinType_BIN_TYPE_SHIPPING,
		scm.ScmBinType_BIN_TYPE_STAGING,
	}

	bins := make([]*scm.ScmBin, 0, len(store.SCMWarehouseIDs)*5)
	idx := 1
	for whIdx, warehouseID := range store.SCMWarehouseIDs {
		for j := 0; j < 5; j++ {
			zone := whIdx + 1
			aisle := j + 1
			rack := rand.Intn(10) + 1
			level := rand.Intn(5) + 1
			maxCap := float64(rand.Intn(901) + 100)
			currentQty := float64(rand.Intn(int(maxCap*0.8) + 1))

			bins = append(bins, &scm.ScmBin{
				BinId:           fmt.Sprintf("bin-%03d", idx),
				WarehouseId:     warehouseID,
				BinCode:         fmt.Sprintf("Z%d-A%d-R%d-L%d", zone, aisle, rack, level),
				BinType:         binTypes[j%len(binTypes)],
				Zone:            fmt.Sprintf("Z%d", zone),
				Aisle:           fmt.Sprintf("A%d", aisle),
				Rack:            fmt.Sprintf("R%d", rack),
				Level:           fmt.Sprintf("L%d", level),
				IsActive:        true,
				MaxCapacity:     maxCap,
				CurrentQuantity: currentQty,
				AuditInfo:       createAuditInfo(),
			})
			idx++
		}
	}
	return bins
}

// generateSCMCarriers creates SCM carrier records
func generateSCMCarriers() []*scm.ScmCarrier {
	carrierTypes := []scm.ScmCarrierType{
		scm.ScmCarrierType_CARRIER_TYPE_PARCEL,
		scm.ScmCarrierType_CARRIER_TYPE_LTL,
		scm.ScmCarrierType_CARRIER_TYPE_FTL,
		scm.ScmCarrierType_CARRIER_TYPE_AIR,
		scm.ScmCarrierType_CARRIER_TYPE_OCEAN,
		scm.ScmCarrierType_CARRIER_TYPE_RAIL,
		scm.ScmCarrierType_CARRIER_TYPE_COURIER,
	}

	carriers := make([]*scm.ScmCarrier, len(scmCarrierNames))
	for i, name := range scmCarrierNames {
		carriers[i] = &scm.ScmCarrier{
			CarrierId:   genID("sccar", i),
			Code:        genCode("CR", i),
			Name:        name,
			CarrierType: carrierTypes[i%len(carrierTypes)],
			ContactInfo: createContact(),
			IsActive:    true,
			Rating:      3.5 + rand.Float64()*1.5,
			Notes:       fmt.Sprintf("Logistics carrier: %s", name),
			AuditInfo:   createAuditInfo(),
		}
	}
	return carriers
}

// generateFreightRates creates freight rate records (2 per carrier = 20 total)
func generateFreightRates(store *MockDataStore) []*scm.ScmFreightRate {
	unitTypes := []string{"per_lb", "per_pallet"}

	rates := make([]*scm.ScmFreightRate, 0, len(store.SCMCarrierIDs)*2)
	idx := 1
	for _, carrierID := range store.SCMCarrierIDs {
		for j := 0; j < 2; j++ {
			originIdx := rand.Intn(len(cities))
			destIdx := (originIdx + rand.Intn(len(cities)-1) + 1) % len(cities)
			effectiveDate := time.Now().AddDate(0, -rand.Intn(3), 0)
			expiryDate := effectiveDate.AddDate(0, 6, 0)

			rates = append(rates, &scm.ScmFreightRate{
				RateId:    fmt.Sprintf("frt-%03d", idx),
				CarrierId: carrierID,
				Origin:    cities[originIdx],
				Destination: cities[destIdx],
				RatePerUnit: money(int64(rand.Intn(4501) + 500)),
				UnitType:      unitTypes[j%len(unitTypes)],
				EffectiveDate: effectiveDate.Unix(),
				ExpiryDate:    expiryDate.Unix(),
				MinWeight:     float64(rand.Intn(901) + 100),
				MaxWeight:     float64(rand.Intn(45001) + 5000),
				Notes:         fmt.Sprintf("Freight rate from %s to %s", cities[originIdx], cities[destIdx]),
				AuditInfo:     createAuditInfo(),
			})
			idx++
		}
	}
	return rates
}

// generateForecastModels creates forecast model records
func generateForecastModels() []*scm.ScmForecastModel {
	type modelDef struct {
		name           string
		description    string
		method         scm.ScmForecastMethod
		params         map[string]string
		accuracyScore  float64
	}

	defs := []modelDef{
		{
			name:        "Moving Average Model",
			description: "Forecast using simple moving average over configurable window",
			method:      scm.ScmForecastMethod_FORECAST_METHOD_MOVING_AVG,
			params:      map[string]string{"window_size": "12", "weighted": "false"},
			accuracyScore: 0.82,
		},
		{
			name:        "Exponential Smoothing",
			description: "Forecast using exponential smoothing with alpha parameter",
			method:      scm.ScmForecastMethod_FORECAST_METHOD_EXPONENTIAL,
			params:      map[string]string{"alpha": "0.3", "beta": "0.1"},
			accuracyScore: 0.87,
		},
		{
			name:        "Regression Analysis",
			description: "Linear regression model for trend-based forecasting",
			method:      scm.ScmForecastMethod_FORECAST_METHOD_REGRESSION,
			params:      map[string]string{"variables": "price|season|promotion", "confidence": "0.95"},
			accuracyScore: 0.91,
		},
		{
			name:        "Seasonal Decomposition",
			description: "Seasonal decomposition model for cyclical demand patterns",
			method:      scm.ScmForecastMethod_FORECAST_METHOD_SEASONAL,
			params:      map[string]string{"period": "12", "trend_type": "additive"},
			accuracyScore: 0.89,
		},
		{
			name:        "Manual Forecast",
			description: "Manual forecast entry for expert-driven planning",
			method:      scm.ScmForecastMethod_FORECAST_METHOD_MANUAL,
			params:      map[string]string{"review_frequency": "monthly", "approval_required": "true"},
			accuracyScore: 0.76,
		},
	}

	models := make([]*scm.ScmForecastModel, len(defs))
	for i, d := range defs {
		models[i] = &scm.ScmForecastModel{
			ModelId:        genID("fmdl", i),
			Name:           d.name,
			Description:    d.description,
			ForecastMethod: d.method,
			Parameters:     d.params,
			IsActive:       true,
			AccuracyScore:  d.accuracyScore,
			AuditInfo:      createAuditInfo(),
		}
	}
	return models
}
