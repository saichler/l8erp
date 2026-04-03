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
	deliveries := generateSalesDeliveryOrders(store)
	if err := runOp(client, "Delivery Orders", "/erp/60/DlvryOrder", &sales.SalesDeliveryOrderList{List: deliveries}, extractIDs(deliveries, func(v interface{}) string { return v.(*sales.SalesDeliveryOrder).DeliveryOrderId }), &store.SalesDeliveryOrderIDs); err != nil {
		return err
	}

	return nil
}

// Sales Phase 7: Billing
func generateSalesPhase7(client *HCMClient, store *MockDataStore) error {
	schedules := generateSalesBillingSchedules(store)
	if err := runOp(client, "Billing Schedules", "/erp/60/BillSched", &sales.SalesBillingScheduleList{List: schedules}, extractIDs(schedules, func(v interface{}) string { return v.(*sales.SalesBillingSchedule).ScheduleId }), &store.SalesBillingScheduleIDs); err != nil {
		return err
	}

	revenueSchedules := generateSalesRevenueSchedules(store)
	if err := runOp(client, "Revenue Schedules", "/erp/60/RevSched", &sales.SalesRevenueScheduleList{List: revenueSchedules}, extractIDs(revenueSchedules, func(v interface{}) string { return v.(*sales.SalesRevenueSchedule).ScheduleId }), &store.SalesRevenueScheduleIDs); err != nil {
		return err
	}

	return nil
}

// Sales Phase 8: Analytics
func generateSalesPhase8(client *HCMClient, store *MockDataStore) error {
	plans := generateSalesCommissionPlans(store)
	if err := runOp(client, "Commission Plans", "/erp/60/CommPlan", &sales.SalesCommissionPlanList{List: plans}, extractIDs(plans, func(v interface{}) string { return v.(*sales.SalesCommissionPlan).PlanId }), &store.SalesCommissionPlanIDs); err != nil {
		return err
	}

	targets := generateSalesTargets(store)
	if err := runOp(client, "Sales Targets", "/erp/60/SalesTrgt", &sales.SalesTargetList{List: targets}, extractIDs(targets, func(v interface{}) string { return v.(*sales.SalesTarget).TargetId }), &store.SalesTargetIDs); err != nil {
		return err
	}

	forecasts := generateSalesForecasts(store)
	if err := runOp(client, "Sales Forecasts", "/erp/60/SalesFcast", &sales.SalesForecastList{List: forecasts}, extractIDs(forecasts, func(v interface{}) string { return v.(*sales.SalesForecast).ForecastId }), &store.SalesForecastIDs); err != nil {
		return err
	}

	return nil
}
