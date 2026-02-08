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

// Sales Phase 6: Shipping
func generateSalesPhase6(client *HCMClient, store *MockDataStore) error {
	// Generate Delivery Orders
	deliveries := generateSalesDeliveryOrders(store)
	if err := runOp(client, "Delivery Orders", "/erp/60/DlvryOrder", &sales.SalesDeliveryOrderList{List: deliveries}, extractIDs(deliveries, func(e *sales.SalesDeliveryOrder) string { return e.DeliveryOrderId }), &store.SalesDeliveryOrderIDs); err != nil {
		return err
	}

	// Generate Delivery Lines
	deliveryLines := generateSalesDeliveryLines(store)
	if err := runOp(client, "Delivery Lines", "/erp/60/DlvryLine", &sales.SalesDeliveryLineList{List: deliveryLines}, extractIDs(deliveryLines, func(e *sales.SalesDeliveryLine) string { return e.LineId }), &store.SalesDeliveryLineIDs); err != nil {
		return err
	}

	// Generate Pick Releases
	pickReleases := generateSalesPickReleases(store)
	if err := runOp(client, "Pick Releases", "/erp/60/PickRlease", &sales.SalesPickReleaseList{List: pickReleases}, extractIDs(pickReleases, func(e *sales.SalesPickRelease) string { return e.PickReleaseId }), &store.SalesPickReleaseIDs); err != nil {
		return err
	}

	// Generate Shipping Documents
	shipDocs := generateSalesShippingDocs(store)
	if err := runOp(client, "Shipping Documents", "/erp/60/ShipDoc", &sales.SalesShippingDocList{List: shipDocs}, extractIDs(shipDocs, func(e *sales.SalesShippingDoc) string { return e.DocId }), &store.SalesShippingDocIDs); err != nil {
		return err
	}

	// Generate Packing Slips
	packingSlips := generateSalesPackingSlips(store)
	if err := runOp(client, "Packing Slips", "/erp/60/PackSlip", &sales.SalesPackingSlipList{List: packingSlips}, extractIDs(packingSlips, func(e *sales.SalesPackingSlip) string { return e.PackingSlipId }), &store.SalesPackingSlipIDs); err != nil {
		return err
	}

	// Generate Delivery Confirmations
	confirms := generateSalesDeliveryConfirms(store)
	if err := runOp(client, "Delivery Confirmations", "/erp/60/DlvryConf", &sales.SalesDeliveryConfirmList{List: confirms}, extractIDs(confirms, func(e *sales.SalesDeliveryConfirm) string { return e.ConfirmId }), &store.SalesDeliveryConfirmIDs); err != nil {
		return err
	}

	return nil
}

// Sales Phase 7: Billing
func generateSalesPhase7(client *HCMClient, store *MockDataStore) error {
	// Generate Billing Schedules
	schedules := generateSalesBillingSchedules(store)
	if err := runOp(client, "Billing Schedules", "/erp/60/BillSched", &sales.SalesBillingScheduleList{List: schedules}, extractIDs(schedules, func(e *sales.SalesBillingSchedule) string { return e.ScheduleId }), &store.SalesBillingScheduleIDs); err != nil {
		return err
	}

	// Generate Billing Milestones
	milestones := generateSalesBillingMilestones(store)
	if err := runOp(client, "Billing Milestones", "/erp/60/BillMilstn", &sales.SalesBillingMilestoneList{List: milestones}, extractIDs(milestones, func(e *sales.SalesBillingMilestone) string { return e.MilestoneId }), &store.SalesBillingMilestoneIDs); err != nil {
		return err
	}

	// Generate Revenue Schedules
	revenueSchedules := generateSalesRevenueSchedules(store)
	if err := runOp(client, "Revenue Schedules", "/erp/60/RevSched", &sales.SalesRevenueScheduleList{List: revenueSchedules}, extractIDs(revenueSchedules, func(e *sales.SalesRevenueSchedule) string { return e.ScheduleId }), &store.SalesRevenueScheduleIDs); err != nil {
		return err
	}

	return nil
}

// Sales Phase 8: Analytics
func generateSalesPhase8(client *HCMClient, store *MockDataStore) error {
	// Generate Commission Plans
	plans := generateSalesCommissionPlans(store)
	if err := runOp(client, "Commission Plans", "/erp/60/CommPlan", &sales.SalesCommissionPlanList{List: plans}, extractIDs(plans, func(e *sales.SalesCommissionPlan) string { return e.PlanId }), &store.SalesCommissionPlanIDs); err != nil {
		return err
	}

	// Generate Commission Calculations
	calcs := generateSalesCommissionCalcs(store)
	if err := runOp(client, "Commission Calculations", "/erp/60/CommCalc", &sales.SalesCommissionCalcList{List: calcs}, extractIDs(calcs, func(e *sales.SalesCommissionCalc) string { return e.CalcId }), &store.SalesCommissionCalcIDs); err != nil {
		return err
	}

	// Generate Territory Assignments
	assigns := generateSalesTerritoryAssigns(store)
	if err := runOp(client, "Territory Assignments", "/erp/60/TerrAssign", &sales.SalesTerritoryAssignList{List: assigns}, extractIDs(assigns, func(e *sales.SalesTerritoryAssign) string { return e.AssignmentId }), &store.SalesTerritoryAssignIDs); err != nil {
		return err
	}

	// Generate Sales Targets
	targets := generateSalesTargets(store)
	if err := runOp(client, "Sales Targets", "/erp/60/SalesTrgt", &sales.SalesTargetList{List: targets}, extractIDs(targets, func(e *sales.SalesTarget) string { return e.TargetId }), &store.SalesTargetIDs); err != nil {
		return err
	}

	// Generate Sales Forecasts
	forecasts := generateSalesForecasts(store)
	if err := runOp(client, "Sales Forecasts", "/erp/60/SalesFcast", &sales.SalesForecastList{List: forecasts}, extractIDs(forecasts, func(e *sales.SalesForecast) string { return e.ForecastId }), &store.SalesForecastIDs); err != nil {
		return err
	}

	return nil
}
