/*
(c) 2025 Sharon Aicler (saichler@gmail.com)

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

	"github.com/saichler/l8erp/go/types/mfg"
)

// MFG Phase 1: Foundation (Shop Floor & Engineering)
func generateMfgPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate Work Centers
	workCenters := generateWorkCenters(store)
	if err := runOp(client, "Work Centers", "/erp/70/MfgWorkCtr", &mfg.MfgWorkCenterList{List: workCenters}, extractIDs(workCenters, func(e *mfg.MfgWorkCenter) string { return e.WorkCenterId }), &store.MfgWorkCenterIDs); err != nil {
		return err
	}

	// Generate Work Center Capacities
	workCenterCaps := generateWorkCenterCaps(store)
	if err := runOp(client, "Work Center Capacities", "/erp/70/MfgWCCap", &mfg.MfgWorkCenterCapList{List: workCenterCaps}, extractIDs(workCenterCaps, func(e *mfg.MfgWorkCenterCap) string { return e.CapacityId }), &store.MfgWorkCenterCapIDs); err != nil {
		return err
	}

	// Generate Shift Schedules
	shiftSchedules := generateShiftSchedules()
	if err := runOp(client, "Shift Schedules", "/erp/70/MfgShift", &mfg.MfgShiftScheduleList{List: shiftSchedules}, extractIDs(shiftSchedules, func(e *mfg.MfgShiftSchedule) string { return e.ScheduleId }), &store.MfgShiftScheduleIDs); err != nil {
		return err
	}

	// Generate BOMs (with embedded BOM Lines)
	boms := generateBoms(store)
	if err := runOp(client, "BOMs", "/erp/70/MfgBom", &mfg.MfgBomList{List: boms}, extractIDs(boms, func(e *mfg.MfgBom) string { return e.BomId }), &store.MfgBomIDs); err != nil {
		return err
	}

	// Generate Routings (with embedded Routing Operations)
	routings := generateRoutings(store)
	if err := runOp(client, "Routings", "/erp/70/MfgRouting", &mfg.MfgRoutingList{List: routings}, extractIDs(routings, func(e *mfg.MfgRouting) string { return e.RoutingId }), &store.MfgRoutingIDs); err != nil {
		return err
	}

	return nil
}

// MFG Phase 2: Engineering Changes & Quality Plans
func generateMfgPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Engineering Change Orders (with embedded Details)
	ecos := generateEngChangeOrders(store)
	if err := runOp(client, "Engineering Change Orders", "/erp/70/MfgECO", &mfg.MfgEngChangeOrderList{List: ecos}, extractIDs(ecos, func(e *mfg.MfgEngChangeOrder) string { return e.ChangeOrderId }), &store.MfgEngChangeOrderIDs); err != nil {
		return err
	}

	// Generate Quality Plans (with embedded Inspection Points)
	qualityPlans := generateQualityPlans(store)
	if err := runOp(client, "Quality Plans", "/erp/70/MfgQCPlan", &mfg.MfgQualityPlanList{List: qualityPlans}, extractIDs(qualityPlans, func(e *mfg.MfgQualityPlan) string { return e.PlanId }), &store.MfgQualityPlanIDs); err != nil {
		return err
	}

	return nil
}

// MFG Phase 3: Work Orders & Production
func generateMfgPhase3(client *HCMClient, store *MockDataStore) error {
	// Generate Work Orders (with embedded Ops, Labor, Machine, Consumptions, Batches, ActualCosts, Variances)
	workOrders := generateWorkOrders(store)
	if err := runOp(client, "Work Orders", "/erp/70/MfgWorkOrd", &mfg.MfgWorkOrderList{List: workOrders}, extractIDs(workOrders, func(e *mfg.MfgWorkOrder) string { return e.WorkOrderId }), &store.MfgWorkOrderIDs); err != nil {
		return err
	}

	// Generate Production Orders (with embedded Lines)
	prodOrders := generateProductionOrders(store)
	if err := runOp(client, "Production Orders", "/erp/70/MfgProdOrd", &mfg.MfgProductionOrderList{List: prodOrders}, extractIDs(prodOrders, func(e *mfg.MfgProductionOrder) string { return e.ProdOrderId }), &store.MfgProductionOrderIDs); err != nil {
		return err
	}

	return nil
}

// MFG Phase 4: Shop Floor Transactions
func generateMfgPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Downtime Events
	downtimeEvents := generateDowntimeEvents(store)
	if err := runOp(client, "Downtime Events", "/erp/70/MfgDowntm", &mfg.MfgDowntimeEventList{List: downtimeEvents}, extractIDs(downtimeEvents, func(e *mfg.MfgDowntimeEvent) string { return e.EventId }), &store.MfgDowntimeEventIDs); err != nil {
		return err
	}

	return nil
}

// MFG Phase 5: Quality Transactions
func generateMfgPhase5(client *HCMClient, store *MockDataStore) error {
	// Generate Quality Inspections (with embedded Test Results)
	inspections := generateQualityInspections(store)
	if err := runOp(client, "Quality Inspections", "/erp/70/MfgQCInsp", &mfg.MfgQualityInspectionList{List: inspections}, extractIDs(inspections, func(e *mfg.MfgQualityInspection) string { return e.InspectionId }), &store.MfgQualityInspectionIDs); err != nil {
		return err
	}

	// Generate NCRs (with embedded Actions)
	ncrs := generateNCRs(store)
	if err := runOp(client, "NCRs", "/erp/70/MfgNCR", &mfg.MfgNCRList{List: ncrs}, extractIDs(ncrs, func(e *mfg.MfgNCR) string { return e.NcrId }), &store.MfgNCRIDs); err != nil {
		return err
	}

	return nil
}

// MFG Phase 6: Planning
func generateMfgPhase6(client *HCMClient, store *MockDataStore) error {
	// Generate MRP Runs (with embedded Requirements)
	mrpRuns := generateMrpRuns(store)
	if err := runOp(client, "MRP Runs", "/erp/70/MfgMrpRun", &mfg.MfgMrpRunList{List: mrpRuns}, extractIDs(mrpRuns, func(e *mfg.MfgMrpRun) string { return e.RunId }), &store.MfgMrpRunIDs); err != nil {
		return err
	}

	// Generate Capacity Plans (with embedded Loads)
	capPlans := generateCapacityPlans(store)
	if err := runOp(client, "Capacity Plans", "/erp/70/MfgCapPlan", &mfg.MfgCapacityPlanList{List: capPlans}, extractIDs(capPlans, func(e *mfg.MfgCapacityPlan) string { return e.PlanId }), &store.MfgCapacityPlanIDs); err != nil {
		return err
	}

	// Generate Production Schedules (with embedded Blocks)
	prodSchedules := generateProdSchedules(store)
	if err := runOp(client, "Production Schedules", "/erp/70/MfgProdSch", &mfg.MfgProdScheduleList{List: prodSchedules}, extractIDs(prodSchedules, func(e *mfg.MfgProdSchedule) string { return e.ScheduleId }), &store.MfgProdScheduleIDs); err != nil {
		return err
	}

	return nil
}

// MFG Phase 7: Costing
func generateMfgPhase7(client *HCMClient, store *MockDataStore) error {
	// Generate Standard Costs
	stdCosts := generateStandardCosts(store)
	if err := runOp(client, "Standard Costs", "/erp/70/MfgStdCost", &mfg.MfgStandardCostList{List: stdCosts}, extractIDs(stdCosts, func(e *mfg.MfgStandardCost) string { return e.CostId }), &store.MfgStandardCostIDs); err != nil {
		return err
	}

	// Generate Cost Rollups
	rollups := generateCostRollups()
	if err := runOp(client, "Cost Rollups", "/erp/70/MfgRollup", &mfg.MfgCostRollupList{List: rollups}, extractIDs(rollups, func(e *mfg.MfgCostRollup) string { return e.RollupId }), &store.MfgCostRollupIDs); err != nil {
		return err
	}

	// Generate Overheads (with embedded Allocations)
	overheads := generateOverheads(store)
	if err := runOp(client, "Overheads", "/erp/70/MfgOverhd", &mfg.MfgOverheadList{List: overheads}, extractIDs(overheads, func(e *mfg.MfgOverhead) string { return e.OverheadId }), &store.MfgOverheadIDs); err != nil {
		return err
	}

	return nil
}
