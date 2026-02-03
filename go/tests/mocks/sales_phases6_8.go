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

// Sales Phase 6: Shipping
func generateSalesPhase6(client *HCMClient, store *MockDataStore) error {
	// Generate Delivery Orders
	fmt.Printf("  Creating Delivery Orders...")
	deliveries := generateSalesDeliveryOrders(store)
	if err := client.post("/erp/60/Delivery", &sales.SalesDeliveryOrderList{List: deliveries}); err != nil {
		return fmt.Errorf("delivery orders: %w", err)
	}
	for _, d := range deliveries {
		store.SalesDeliveryOrderIDs = append(store.SalesDeliveryOrderIDs, d.DeliveryOrderId)
	}
	fmt.Printf(" %d created\n", len(deliveries))

	// Generate Delivery Lines
	fmt.Printf("  Creating Delivery Lines...")
	deliveryLines := generateSalesDeliveryLines(store)
	if err := client.post("/erp/60/DelivLine", &sales.SalesDeliveryLineList{List: deliveryLines}); err != nil {
		return fmt.Errorf("delivery lines: %w", err)
	}
	for _, dl := range deliveryLines {
		store.SalesDeliveryLineIDs = append(store.SalesDeliveryLineIDs, dl.LineId)
	}
	fmt.Printf(" %d created\n", len(deliveryLines))

	// Generate Pick Releases
	fmt.Printf("  Creating Pick Releases...")
	pickReleases := generateSalesPickReleases(store)
	if err := client.post("/erp/60/PickRel", &sales.SalesPickReleaseList{List: pickReleases}); err != nil {
		return fmt.Errorf("pick releases: %w", err)
	}
	for _, pr := range pickReleases {
		store.SalesPickReleaseIDs = append(store.SalesPickReleaseIDs, pr.PickReleaseId)
	}
	fmt.Printf(" %d created\n", len(pickReleases))

	// Generate Shipping Documents
	fmt.Printf("  Creating Shipping Documents...")
	shipDocs := generateSalesShippingDocs(store)
	if err := client.post("/erp/60/ShipDoc", &sales.SalesShippingDocList{List: shipDocs}); err != nil {
		return fmt.Errorf("shipping documents: %w", err)
	}
	for _, sd := range shipDocs {
		store.SalesShippingDocIDs = append(store.SalesShippingDocIDs, sd.DocId)
	}
	fmt.Printf(" %d created\n", len(shipDocs))

	// Generate Packing Slips
	fmt.Printf("  Creating Packing Slips...")
	packingSlips := generateSalesPackingSlips(store)
	if err := client.post("/erp/60/PackSlip", &sales.SalesPackingSlipList{List: packingSlips}); err != nil {
		return fmt.Errorf("packing slips: %w", err)
	}
	for _, ps := range packingSlips {
		store.SalesPackingSlipIDs = append(store.SalesPackingSlipIDs, ps.PackingSlipId)
	}
	fmt.Printf(" %d created\n", len(packingSlips))

	return nil
}

// Sales Phase 7: Billing
func generateSalesPhase7(client *HCMClient, store *MockDataStore) error {
	// Generate Billing Schedules
	fmt.Printf("  Creating Billing Schedules...")
	schedules := generateSalesBillingSchedules(store)
	if err := client.post("/erp/60/BillSched", &sales.SalesBillingScheduleList{List: schedules}); err != nil {
		return fmt.Errorf("billing schedules: %w", err)
	}
	for _, s := range schedules {
		store.SalesBillingScheduleIDs = append(store.SalesBillingScheduleIDs, s.ScheduleId)
	}
	fmt.Printf(" %d created\n", len(schedules))

	// Generate Billing Milestones
	fmt.Printf("  Creating Billing Milestones...")
	milestones := generateSalesBillingMilestones(store)
	if err := client.post("/erp/60/BillMstone", &sales.SalesBillingMilestoneList{List: milestones}); err != nil {
		return fmt.Errorf("billing milestones: %w", err)
	}
	for _, m := range milestones {
		store.SalesBillingMilestoneIDs = append(store.SalesBillingMilestoneIDs, m.MilestoneId)
	}
	fmt.Printf(" %d created\n", len(milestones))

	// Generate Revenue Schedules
	fmt.Printf("  Creating Revenue Schedules...")
	revenueSchedules := generateSalesRevenueSchedules(store)
	if err := client.post("/erp/60/RevSched", &sales.SalesRevenueScheduleList{List: revenueSchedules}); err != nil {
		return fmt.Errorf("revenue schedules: %w", err)
	}
	for _, rs := range revenueSchedules {
		store.SalesRevenueScheduleIDs = append(store.SalesRevenueScheduleIDs, rs.ScheduleId)
	}
	fmt.Printf(" %d created\n", len(revenueSchedules))

	return nil
}

// Sales Phase 8: Analytics
func generateSalesPhase8(client *HCMClient, store *MockDataStore) error {
	// Generate Commission Plans
	fmt.Printf("  Creating Commission Plans...")
	plans := generateSalesCommissionPlans()
	if err := client.post("/erp/60/CommPlan", &sales.SalesCommissionPlanList{List: plans}); err != nil {
		return fmt.Errorf("commission plans: %w", err)
	}
	for _, p := range plans {
		store.SalesCommissionPlanIDs = append(store.SalesCommissionPlanIDs, p.PlanId)
	}
	fmt.Printf(" %d created\n", len(plans))

	// Generate Commission Calculations
	fmt.Printf("  Creating Commission Calculations...")
	calcs := generateSalesCommissionCalcs(store)
	if err := client.post("/erp/60/CommCalc", &sales.SalesCommissionCalcList{List: calcs}); err != nil {
		return fmt.Errorf("commission calculations: %w", err)
	}
	for _, c := range calcs {
		store.SalesCommissionCalcIDs = append(store.SalesCommissionCalcIDs, c.CalcId)
	}
	fmt.Printf(" %d created\n", len(calcs))

	// Generate Territory Assignments
	fmt.Printf("  Creating Territory Assignments...")
	assigns := generateSalesTerritoryAssigns(store)
	if err := client.post("/erp/60/TerrAssign", &sales.SalesTerritoryAssignList{List: assigns}); err != nil {
		return fmt.Errorf("territory assignments: %w", err)
	}
	for _, a := range assigns {
		store.SalesTerritoryAssignIDs = append(store.SalesTerritoryAssignIDs, a.AssignmentId)
	}
	fmt.Printf(" %d created\n", len(assigns))

	// Generate Sales Targets
	fmt.Printf("  Creating Sales Targets...")
	targets := generateSalesTargets(store)
	if err := client.post("/erp/60/Target", &sales.SalesTargetList{List: targets}); err != nil {
		return fmt.Errorf("sales targets: %w", err)
	}
	for _, t := range targets {
		store.SalesTargetIDs = append(store.SalesTargetIDs, t.TargetId)
	}
	fmt.Printf(" %d created\n", len(targets))

	// Generate Sales Forecasts
	fmt.Printf("  Creating Sales Forecasts...")
	forecasts := generateSalesForecasts(store)
	if err := client.post("/erp/60/Forecast", &sales.SalesForecastList{List: forecasts}); err != nil {
		return fmt.Errorf("sales forecasts: %w", err)
	}
	for _, f := range forecasts {
		store.SalesForecastIDs = append(store.SalesForecastIDs, f.ForecastId)
	}
	fmt.Printf(" %d created\n", len(forecasts))

	return nil
}
