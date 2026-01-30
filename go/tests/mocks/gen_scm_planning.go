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

	"github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/scm"
)

// generateDemandForecasts creates 30 demand forecast records for items
func generateDemandForecasts(store *MockDataStore) []*scm.DemandForecast {
	forecasts := make([]*scm.DemandForecast, 30)

	forecastMethods := []scm.ForecastMethod{
		scm.ForecastMethod_FORECAST_METHOD_MOVING_AVG,
		scm.ForecastMethod_FORECAST_METHOD_EXPONENTIAL,
		scm.ForecastMethod_FORECAST_METHOD_REGRESSION,
		scm.ForecastMethod_FORECAST_METHOD_SEASONAL,
		scm.ForecastMethod_FORECAST_METHOD_MANUAL,
	}

	for i := 0; i < 30; i++ {
		itemIdx := i % len(store.ItemIDs)
		periodStart := time.Date(2025, time.Month((i%12)+1), 1, 0, 0, 0, 0, time.UTC)
		periodEnd := periodStart.AddDate(0, 1, -1)

		forecastQty := float64(rand.Intn(4501)+500) // 500-5000
		// Actual quantity varies from forecast by -20% to +10%
		variance := 0.8 + rand.Float64()*0.3
		actualQty := forecastQty * variance
		confidenceLevel := 0.65 + rand.Float64()*0.30 // 0.65-0.95

		forecasts[i] = &scm.DemandForecast{
			ForecastId:       fmt.Sprintf("dfcast-%03d", i+1),
			ItemId:           store.ItemIDs[itemIdx],
			PeriodStart:      periodStart.Unix(),
			PeriodEnd:        periodEnd.Unix(),
			ForecastQuantity: forecastQty,
			ActualQuantity:   actualQty,
			ForecastMethod:   forecastMethods[i%len(forecastMethods)],
			ConfidenceLevel:  confidenceLevel,
			Notes:            fmt.Sprintf("Demand forecast for period %s", periodStart.Format("Jan 2006")),
			AuditInfo:        createAuditInfo(),
		}
	}

	return forecasts
}

// generateDemandPlans creates 3 demand plan records
func generateDemandPlans(store *MockDataStore) []*scm.DemandPlan {
	type planDef struct {
		name        string
		description string
		startMonth  time.Month
		endMonth    time.Month
		status      scm.TaskStatus
		approvedBy  string
	}

	defs := []planDef{
		{
			name:        "Q1 Demand Plan",
			description: "Demand plan for Q1 2025 covering January through March",
			startMonth:  time.January,
			endMonth:    time.March,
			status:      scm.TaskStatus_TASK_STATUS_COMPLETED,
			approvedBy:  "mock-generator",
		},
		{
			name:        "Q2 Demand Plan",
			description: "Demand plan for Q2 2025 covering April through June",
			startMonth:  time.April,
			endMonth:    time.June,
			status:      scm.TaskStatus_TASK_STATUS_IN_PROGRESS,
			approvedBy:  "",
		},
		{
			name:        "Annual Demand Plan",
			description: "Annual demand plan for fiscal year 2025",
			startMonth:  time.January,
			endMonth:    time.December,
			status:      scm.TaskStatus_TASK_STATUS_PENDING,
			approvedBy:  "",
		},
	}

	plans := make([]*scm.DemandPlan, len(defs))
	for i, d := range defs {
		startDate := time.Date(2025, d.startMonth, 1, 0, 0, 0, 0, time.UTC)
		endDate := time.Date(2025, d.endMonth+1, 0, 0, 0, 0, 0, time.UTC)

		plans[i] = &scm.DemandPlan{
			PlanId:      fmt.Sprintf("dplan-%03d", i+1),
			Name:        d.name,
			Description: d.description,
			PlanPeriod: &erp.DateRange{
				StartDate: startDate.Unix(),
				EndDate:   endDate.Unix(),
			},
			Status:    d.status,
			CreatedBy: "mock-generator",
			ApprovedBy: d.approvedBy,
			Notes:     fmt.Sprintf("Demand plan: %s", d.name),
			AuditInfo: createAuditInfo(),
		}
	}

	return plans
}

// generatePromotionalPlans creates 6 promotional plan records
func generatePromotionalPlans(store *MockDataStore) []*scm.PromotionalPlan {
	type promoDef struct {
		name        string
		description string
		startMonth  time.Month
		durationDays int
		status      scm.TaskStatus
	}

	defs := []promoDef{
		{"Spring Sale", "Spring promotional event with seasonal discounts", time.March, 14, scm.TaskStatus_TASK_STATUS_COMPLETED},
		{"Summer Clearance", "Mid-year clearance promotion for excess inventory", time.June, 21, scm.TaskStatus_TASK_STATUS_COMPLETED},
		{"Back to School", "Back-to-school promotion for office and safety supplies", time.August, 30, scm.TaskStatus_TASK_STATUS_IN_PROGRESS},
		{"Black Friday", "Annual Black Friday promotional event", time.November, 4, scm.TaskStatus_TASK_STATUS_PENDING},
		{"Holiday Season", "Year-end holiday promotional campaign", time.December, 21, scm.TaskStatus_TASK_STATUS_PENDING},
		{"New Year Launch", "New year product launch promotion", time.January, 10, scm.TaskStatus_TASK_STATUS_PENDING},
	}

	plans := make([]*scm.PromotionalPlan, len(defs))
	for i, d := range defs {
		startDate := time.Date(2025, d.startMonth, 1, 0, 0, 0, 0, time.UTC)
		endDate := startDate.AddDate(0, 0, d.durationDays)
		expectedUplift := 10.0 + rand.Float64()*40.0 // 10-50%

		// Assign 3-5 random items to each promotional plan
		numItems := rand.Intn(3) + 3
		itemIds := make([]string, numItems)
		for j := 0; j < numItems; j++ {
			itemIds[j] = store.ItemIDs[(i*3+j)%len(store.ItemIDs)]
		}

		plans[i] = &scm.PromotionalPlan{
			PlanId:         fmt.Sprintf("promo-%03d", i+1),
			Name:           d.name,
			Description:    d.description,
			StartDate:      startDate.Unix(),
			EndDate:        endDate.Unix(),
			ExpectedUplift: expectedUplift,
			ItemIds:        itemIds,
			Status:         d.status,
			Notes:          fmt.Sprintf("Promotional plan: %s", d.name),
			AuditInfo:      createAuditInfo(),
		}
	}

	return plans
}

// generateNewProductPlans creates 4 new product plan records
func generateNewProductPlans(store *MockDataStore) []*scm.NewProductPlan {
	type nppDef struct {
		name           string
		itemIdx        int
		launchMonth    time.Month
		initialForecast float64
		rampUpPeriod   int32
		status         scm.TaskStatus
	}

	defs := []nppDef{
		{"Next-Gen Motor Launch", 5, time.March, 2500.0, 6, scm.TaskStatus_TASK_STATUS_COMPLETED},
		{"Smart Sensor Release", 6, time.June, 1500.0, 3, scm.TaskStatus_TASK_STATUS_IN_PROGRESS},
		{"Advanced Filter Line", 11, time.September, 4000.0, 9, scm.TaskStatus_TASK_STATUS_PENDING},
		{"Eco-Friendly Gasket", 8, time.November, 800.0, 12, scm.TaskStatus_TASK_STATUS_PENDING},
	}

	plans := make([]*scm.NewProductPlan, len(defs))
	for i, d := range defs {
		launchDate := time.Date(2025, d.launchMonth, 15, 0, 0, 0, 0, time.UTC)
		// Use a comparable item from existing items
		comparableIdx := (d.itemIdx + 1) % len(store.ItemIDs)

		plans[i] = &scm.NewProductPlan{
			PlanId:           fmt.Sprintf("npp-%03d", i+1),
			Name:             d.name,
			ItemId:           store.ItemIDs[d.itemIdx%len(store.ItemIDs)],
			LaunchDate:       launchDate.Unix(),
			RampUpPeriod:     d.rampUpPeriod,
			InitialForecast:  d.initialForecast,
			ComparableItemId: store.ItemIDs[comparableIdx],
			Status:           d.status,
			Notes:            fmt.Sprintf("New product plan: %s", d.name),
			AuditInfo:        createAuditInfo(),
		}
	}

	return plans
}

// generateForecastAccuracy creates 15 forecast accuracy records linked to forecasts
func generateForecastAccuracy(store *MockDataStore) []*scm.ForecastAccuracy {
	records := make([]*scm.ForecastAccuracy, 15)

	for i := 0; i < 15; i++ {
		forecastIdx := i % len(store.DemandForecastIDs)
		itemIdx := i % len(store.ItemIDs)

		forecastQty := float64(rand.Intn(4001) + 500)
		// Actual varies from forecast
		actualQty := forecastQty * (0.75 + rand.Float64()*0.50)

		diff := forecastQty - actualQty
		if diff < 0 {
			diff = -diff
		}
		mape := (diff / actualQty) * 100.0
		bias := (forecastQty - actualQty) / actualQty * 100.0

		periodStart := time.Date(2025, time.Month((i%12)+1), 1, 0, 0, 0, 0, time.UTC)
		periodEnd := periodStart.AddDate(0, 1, -1)

		records[i] = &scm.ForecastAccuracy{
			AccuracyId:       fmt.Sprintf("facc-%03d", i+1),
			ForecastId:       store.DemandForecastIDs[forecastIdx],
			ItemId:           store.ItemIDs[itemIdx],
			Period: &erp.DateRange{
				StartDate: periodStart.Unix(),
				EndDate:   periodEnd.Unix(),
			},
			ForecastQuantity: forecastQty,
			ActualQuantity:   actualQty,
			Mape:             mape,
			Bias:             bias,
			Notes:            fmt.Sprintf("Forecast accuracy for period %s", periodStart.Format("Jan 2006")),
			AuditInfo:        createAuditInfo(),
		}
	}

	return records
}

// generateMaterialRequirements creates 20 material requirement records
func generateMaterialRequirements(store *MockDataStore) []*scm.MaterialRequirement {
	requirements := make([]*scm.MaterialRequirement, 20)

	planningMethods := []scm.PlanningMethod{
		scm.PlanningMethod_PLANNING_METHOD_MRP,
		scm.PlanningMethod_PLANNING_METHOD_REORDER_POINT,
		scm.PlanningMethod_PLANNING_METHOD_MIN_MAX,
		scm.PlanningMethod_PLANNING_METHOD_KANBAN,
	}

	statuses := []scm.TaskStatus{
		scm.TaskStatus_TASK_STATUS_PENDING,
		scm.TaskStatus_TASK_STATUS_IN_PROGRESS,
		scm.TaskStatus_TASK_STATUS_COMPLETED,
	}

	sources := []string{"MRP Run", "Reorder Point Trigger", "Manual Request", "Safety Stock Alert"}

	for i := 0; i < 20; i++ {
		itemIdx := i % len(store.ItemIDs)
		requiredDate := time.Now().AddDate(0, 0, rand.Intn(60)+7)
		plannedOrderDate := requiredDate.AddDate(0, 0, -(rand.Intn(14) + 7))

		requiredQty := float64(rand.Intn(451) + 50)                 // 50-500
		availableQty := requiredQty * (float64(rand.Intn(81)) / 100.0) // 0-80% of required
		shortageQty := requiredQty - availableQty

		requirements[i] = &scm.MaterialRequirement{
			RequirementId:     fmt.Sprintf("mreq-%03d", i+1),
			ItemId:            store.ItemIDs[itemIdx],
			RequiredDate:      requiredDate.Unix(),
			RequiredQuantity:  requiredQty,
			AvailableQuantity: availableQty,
			ShortageQuantity:  shortageQty,
			PlannedOrderDate:  plannedOrderDate.Unix(),
			PlanningMethod:    planningMethods[i%len(planningMethods)],
			Source:            sources[i%len(sources)],
			Status:            statuses[i%len(statuses)],
			AuditInfo:         createAuditInfo(),
		}
	}

	return requirements
}

// generateDistributionRequirements creates 10 distribution requirement records between warehouses
func generateDistributionRequirements(store *MockDataStore) []*scm.DistributionRequirement {
	requirements := make([]*scm.DistributionRequirement, 10)

	statuses := []scm.TaskStatus{
		scm.TaskStatus_TASK_STATUS_PENDING,
		scm.TaskStatus_TASK_STATUS_IN_PROGRESS,
		scm.TaskStatus_TASK_STATUS_COMPLETED,
	}

	for i := 0; i < 10; i++ {
		itemIdx := i % len(store.ItemIDs)
		sourceIdx := i % len(store.SCMWarehouseIDs)
		destIdx := (i + 1) % len(store.SCMWarehouseIDs)
		// Ensure source and destination are different
		if destIdx == sourceIdx {
			destIdx = (destIdx + 1) % len(store.SCMWarehouseIDs)
		}

		requiredDate := time.Now().AddDate(0, 0, rand.Intn(30)+7)
		requiredQty := float64(rand.Intn(451) + 50) // 50-500
		transferQty := requiredQty * (0.8 + rand.Float64()*0.2)

		requirements[i] = &scm.DistributionRequirement{
			RequirementId:          fmt.Sprintf("dreq-%03d", i+1),
			ItemId:                 store.ItemIDs[itemIdx],
			SourceWarehouseId:      store.SCMWarehouseIDs[sourceIdx],
			DestinationWarehouseId: store.SCMWarehouseIDs[destIdx],
			RequiredDate:           requiredDate.Unix(),
			RequiredQuantity:       requiredQty,
			TransferQuantity:       transferQty,
			Status:                 statuses[i%len(statuses)],
			Notes:                  fmt.Sprintf("Distribution requirement from warehouse %d to warehouse %d", sourceIdx+1, destIdx+1),
			AuditInfo:              createAuditInfo(),
		}
	}

	return requirements
}

// generateSupplyPlans creates 3 supply plan records
func generateSupplyPlans(store *MockDataStore) []*scm.SupplyPlan {
	type planDef struct {
		name        string
		description string
		startMonth  time.Month
		endMonth    time.Month
		status      scm.TaskStatus
		approvedBy  string
	}

	defs := []planDef{
		{
			name:        "Q1 Supply Plan",
			description: "Supply plan for Q1 2025 covering material sourcing and procurement",
			startMonth:  time.January,
			endMonth:    time.March,
			status:      scm.TaskStatus_TASK_STATUS_COMPLETED,
			approvedBy:  "mock-generator",
		},
		{
			name:        "Q2 Supply Plan",
			description: "Supply plan for Q2 2025 covering seasonal inventory buildup",
			startMonth:  time.April,
			endMonth:    time.June,
			status:      scm.TaskStatus_TASK_STATUS_IN_PROGRESS,
			approvedBy:  "",
		},
		{
			name:        "H2 Supply Plan",
			description: "Supply plan for second half of 2025",
			startMonth:  time.July,
			endMonth:    time.December,
			status:      scm.TaskStatus_TASK_STATUS_PENDING,
			approvedBy:  "",
		},
	}

	plans := make([]*scm.SupplyPlan, len(defs))
	for i, d := range defs {
		startDate := time.Date(2025, d.startMonth, 1, 0, 0, 0, 0, time.UTC)
		endDate := time.Date(2025, d.endMonth+1, 0, 0, 0, 0, 0, time.UTC)

		plans[i] = &scm.SupplyPlan{
			PlanId:      fmt.Sprintf("splan-%03d", i+1),
			Name:        d.name,
			Description: d.description,
			PlanPeriod: &erp.DateRange{
				StartDate: startDate.Unix(),
				EndDate:   endDate.Unix(),
			},
			Status:     d.status,
			CreatedBy:  "mock-generator",
			ApprovedBy: d.approvedBy,
			Notes:      fmt.Sprintf("Supply plan: %s", d.name),
			AuditInfo:  createAuditInfo(),
		}
	}

	return plans
}

// generateSupplierCollaborations creates 10 supplier collaboration records
func generateSupplierCollaborations(store *MockDataStore) []*scm.SupplierCollaboration {
	collaborations := make([]*scm.SupplierCollaboration, 10)

	statusValues := []string{"Active", "Pending", "Suspended"}

	for i := 0; i < 10; i++ {
		vendorIdx := i % len(store.VendorIDs)
		itemIdx := i % len(store.ItemIDs)

		collaborations[i] = &scm.SupplierCollaboration{
			CollaborationId:  fmt.Sprintf("scollab-%03d", i+1),
			VendorId:         store.VendorIDs[vendorIdx],
			ItemId:           store.ItemIDs[itemIdx],
			ForecastShared:   i%2 == 0,
			InventoryVisible: i%3 != 0,
			LeadTimeAgreed:   int32(rand.Intn(39) + 7), // 7-45 days
			MinOrderQuantity: float64(rand.Intn(91) + 10), // 10-100
			Status:           statusValues[i%len(statusValues)],
			Notes:            fmt.Sprintf("Supplier collaboration with vendor %d for item %d", vendorIdx+1, itemIdx+1),
			AuditInfo:        createAuditInfo(),
		}
	}

	return collaborations
}

// generateSafetyStocks creates 1 safety stock record per item (25 total)
func generateSafetyStocks(store *MockDataStore) []*scm.SafetyStock {
	stocks := make([]*scm.SafetyStock, len(store.ItemIDs))

	calcMethods := []string{"Statistical", "Fixed Quantity", "Demand-Based", "Service Level"}

	for i, itemID := range store.ItemIDs {
		warehouseIdx := i % len(store.SCMWarehouseIDs)
		safetyStockQty := float64(rand.Intn(451) + 50) // 50-500
		serviceLevel := 0.90 + rand.Float64()*0.09      // 0.90-0.99

		stocks[i] = &scm.SafetyStock{
			SafetyStockId:       fmt.Sprintf("sstock-%03d", i+1),
			ItemId:              itemID,
			WarehouseId:         store.SCMWarehouseIDs[warehouseIdx],
			SafetyStockQuantity: safetyStockQty,
			CalculationMethod:   calcMethods[i%len(calcMethods)],
			ServiceLevel:        serviceLevel,
			ReviewDate:          time.Now().AddDate(0, rand.Intn(3)+1, 0).Unix(),
			IsActive:            true,
			Notes:               fmt.Sprintf("Safety stock for item %s", itemID),
			AuditInfo:           createAuditInfo(),
		}
	}

	return stocks
}

// generateLeadTimes creates 1 lead time record per item (25 total)
func generateLeadTimes(store *MockDataStore) []*scm.LeadTime {
	leadTimes := make([]*scm.LeadTime, len(store.ItemIDs))

	for i, itemID := range store.ItemIDs {
		vendorIdx := i % len(store.VendorIDs)
		leadTimeDays := int32(rand.Intn(39) + 7)   // 7-45 days
		transitDays := int32(rand.Intn(13) + 2)     // 2-14 days
		receivingDays := int32(rand.Intn(3) + 1)    // 1-3 days
		totalDays := leadTimeDays + transitDays + receivingDays

		leadTimes[i] = &scm.LeadTime{
			LeadTimeId:    fmt.Sprintf("lt-%03d", i+1),
			ItemId:        itemID,
			VendorId:      store.VendorIDs[vendorIdx],
			LeadTimeDays:  leadTimeDays,
			TransitDays:   transitDays,
			ReceivingDays: receivingDays,
			TotalDays:     totalDays,
			IsActive:      true,
			Notes:         fmt.Sprintf("Lead time for item %s from vendor %s", itemID, store.VendorIDs[vendorIdx]),
			AuditInfo:     createAuditInfo(),
		}
	}

	return leadTimes
}
