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

	// Generate BOMs
	boms := generateBoms(store)
	if err := runOp(client, "BOMs", "/erp/70/MfgBom", &mfg.MfgBomList{List: boms}, extractIDs(boms, func(e *mfg.MfgBom) string { return e.BomId }), &store.MfgBomIDs); err != nil {
		return err
	}

	// Generate BOM Lines
	bomLines := generateBomLines(store)
	if err := runOp(client, "BOM Lines", "/erp/70/MfgBomLine", &mfg.MfgBomLineList{List: bomLines}, extractIDs(bomLines, func(e *mfg.MfgBomLine) string { return e.LineId }), &store.MfgBomLineIDs); err != nil {
		return err
	}

	// Generate Routings
	routings := generateRoutings(store)
	if err := runOp(client, "Routings", "/erp/70/MfgRouting", &mfg.MfgRoutingList{List: routings}, extractIDs(routings, func(e *mfg.MfgRouting) string { return e.RoutingId }), &store.MfgRoutingIDs); err != nil {
		return err
	}

	// Generate Routing Operations
	routingOps := generateRoutingOperations(store)
	if err := runOp(client, "Routing Operations", "/erp/70/MfgRtngOp", &mfg.MfgRoutingOperationList{List: routingOps}, extractIDs(routingOps, func(e *mfg.MfgRoutingOperation) string { return e.OperationId }), &store.MfgRoutingOpIDs); err != nil {
		return err
	}

	return nil
}

// MFG Phase 2: Engineering Changes & Quality Plans
func generateMfgPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Engineering Change Orders
	ecos := generateEngChangeOrders(store)
	if err := runOp(client, "Engineering Change Orders", "/erp/70/MfgECO", &mfg.MfgEngChangeOrderList{List: ecos}, extractIDs(ecos, func(e *mfg.MfgEngChangeOrder) string { return e.ChangeOrderId }), &store.MfgEngChangeOrderIDs); err != nil {
		return err
	}

	// Generate Engineering Change Details
	ecoDetails := generateEngChangeDetails(store)
	if err := runOp(client, "Engineering Change Details", "/erp/70/MfgECODtl", &mfg.MfgEngChangeDetailList{List: ecoDetails}, extractIDs(ecoDetails, func(e *mfg.MfgEngChangeDetail) string { return e.DetailId }), &store.MfgEngChangeDetailIDs); err != nil {
		return err
	}

	// Generate Quality Plans
	qualityPlans := generateQualityPlans(store)
	if err := runOp(client, "Quality Plans", "/erp/70/MfgQCPlan", &mfg.MfgQualityPlanList{List: qualityPlans}, extractIDs(qualityPlans, func(e *mfg.MfgQualityPlan) string { return e.PlanId }), &store.MfgQualityPlanIDs); err != nil {
		return err
	}

	// Generate Inspection Points
	inspPoints := generateInspectionPoints(store)
	if err := runOp(client, "Inspection Points", "/erp/70/MfgInspPt", &mfg.MfgInspectionPointList{List: inspPoints}, extractIDs(inspPoints, func(e *mfg.MfgInspectionPoint) string { return e.PointId }), &store.MfgInspectionPointIDs); err != nil {
		return err
	}

	return nil
}

// MFG Phase 3: Work Orders & Production
func generateMfgPhase3(client *HCMClient, store *MockDataStore) error {
	// Generate Work Orders
	workOrders := generateWorkOrders(store)
	if err := runOp(client, "Work Orders", "/erp/70/MfgWorkOrd", &mfg.MfgWorkOrderList{List: workOrders}, extractIDs(workOrders, func(e *mfg.MfgWorkOrder) string { return e.WorkOrderId }), &store.MfgWorkOrderIDs); err != nil {
		return err
	}

	// Generate Work Order Operations
	woOps := generateWorkOrderOps(store)
	if err := runOp(client, "Work Order Operations", "/erp/70/MfgWOOp", &mfg.MfgWorkOrderOpList{List: woOps}, extractIDs(woOps, func(e *mfg.MfgWorkOrderOp) string { return e.OperationId }), &store.MfgWorkOrderOpIDs); err != nil {
		return err
	}

	// Generate Production Orders
	prodOrders := generateProductionOrders(store)
	if err := runOp(client, "Production Orders", "/erp/70/MfgProdOrd", &mfg.MfgProductionOrderList{List: prodOrders}, extractIDs(prodOrders, func(e *mfg.MfgProductionOrder) string { return e.ProdOrderId }), &store.MfgProductionOrderIDs); err != nil {
		return err
	}

	// Generate Production Order Lines
	poLines := generateProdOrderLines(store)
	if err := runOp(client, "Production Order Lines", "/erp/70/MfgPOLine", &mfg.MfgProdOrderLineList{List: poLines}, extractIDs(poLines, func(e *mfg.MfgProdOrderLine) string { return e.LineId }), &store.MfgProdOrderLineIDs); err != nil {
		return err
	}

	// Generate Production Batches
	batches := generateProdBatches(store)
	if err := runOp(client, "Production Batches", "/erp/70/MfgBatch", &mfg.MfgProdBatchList{List: batches}, extractIDs(batches, func(e *mfg.MfgProdBatch) string { return e.BatchId }), &store.MfgProdBatchIDs); err != nil {
		return err
	}

	return nil
}

// MFG Phase 4: Shop Floor Transactions
func generateMfgPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Labor Entries
	laborEntries := generateLaborEntries(store)
	if err := runOp(client, "Labor Entries", "/erp/70/MfgLabor", &mfg.MfgLaborEntryList{List: laborEntries}, extractIDs(laborEntries, func(e *mfg.MfgLaborEntry) string { return e.EntryId }), &store.MfgLaborEntryIDs); err != nil {
		return err
	}

	// Generate Machine Entries
	machineEntries := generateMachineEntries(store)
	if err := runOp(client, "Machine Entries", "/erp/70/MfgMachine", &mfg.MfgMachineEntryList{List: machineEntries}, extractIDs(machineEntries, func(e *mfg.MfgMachineEntry) string { return e.EntryId }), &store.MfgMachineEntryIDs); err != nil {
		return err
	}

	// Generate Downtime Events
	downtimeEvents := generateDowntimeEvents(store)
	if err := runOp(client, "Downtime Events", "/erp/70/MfgDowntm", &mfg.MfgDowntimeEventList{List: downtimeEvents}, extractIDs(downtimeEvents, func(e *mfg.MfgDowntimeEvent) string { return e.EventId }), &store.MfgDowntimeEventIDs); err != nil {
		return err
	}

	// Generate Production Consumptions
	consumptions := generateProdConsumptions(store)
	if err := runOp(client, "Production Consumptions", "/erp/70/MfgConsump", &mfg.MfgProdConsumptionList{List: consumptions}, extractIDs(consumptions, func(e *mfg.MfgProdConsumption) string { return e.ConsumptionId }), &store.MfgProdConsumpIDs); err != nil {
		return err
	}

	return nil
}

// MFG Phase 5: Quality Transactions
func generateMfgPhase5(client *HCMClient, store *MockDataStore) error {
	// Generate Quality Inspections
	inspections := generateQualityInspections(store)
	if err := runOp(client, "Quality Inspections", "/erp/70/MfgQCInsp", &mfg.MfgQualityInspectionList{List: inspections}, extractIDs(inspections, func(e *mfg.MfgQualityInspection) string { return e.InspectionId }), &store.MfgQualityInspectionIDs); err != nil {
		return err
	}

	// Generate Test Results
	testResults := generateTestResults(store)
	if err := runOp(client, "Test Results", "/erp/70/MfgTestRes", &mfg.MfgTestResultList{List: testResults}, extractIDs(testResults, func(e *mfg.MfgTestResult) string { return e.ResultId }), &store.MfgTestResultIDs); err != nil {
		return err
	}

	// Generate NCRs
	ncrs := generateNCRs(store)
	if err := runOp(client, "NCRs", "/erp/70/MfgNCR", &mfg.MfgNCRList{List: ncrs}, extractIDs(ncrs, func(e *mfg.MfgNCR) string { return e.NcrId }), &store.MfgNCRIDs); err != nil {
		return err
	}

	// Generate NCR Actions
	ncrActions := generateNCRActions(store)
	if err := runOp(client, "NCR Actions", "/erp/70/MfgNCRAct", &mfg.MfgNCRActionList{List: ncrActions}, extractIDs(ncrActions, func(e *mfg.MfgNCRAction) string { return e.ActionId }), &store.MfgNCRActionIDs); err != nil {
		return err
	}

	return nil
}

// MFG Phase 6: Planning
func generateMfgPhase6(client *HCMClient, store *MockDataStore) error {
	// Generate MRP Runs
	mrpRuns := generateMrpRuns()
	if err := runOp(client, "MRP Runs", "/erp/70/MfgMrpRun", &mfg.MfgMrpRunList{List: mrpRuns}, extractIDs(mrpRuns, func(e *mfg.MfgMrpRun) string { return e.RunId }), &store.MfgMrpRunIDs); err != nil {
		return err
	}

	// Generate MRP Requirements
	mrpReqs := generateMrpRequirements(store)
	if err := runOp(client, "MRP Requirements", "/erp/70/MfgMrpReq", &mfg.MfgMrpRequirementList{List: mrpReqs}, extractIDs(mrpReqs, func(e *mfg.MfgMrpRequirement) string { return e.RequirementId }), &store.MfgMrpRequirementIDs); err != nil {
		return err
	}

	// Generate Capacity Plans
	capPlans := generateCapacityPlans()
	if err := runOp(client, "Capacity Plans", "/erp/70/MfgCapPlan", &mfg.MfgCapacityPlanList{List: capPlans}, extractIDs(capPlans, func(e *mfg.MfgCapacityPlan) string { return e.PlanId }), &store.MfgCapacityPlanIDs); err != nil {
		return err
	}

	// Generate Capacity Loads
	capLoads := generateCapacityLoads(store)
	if err := runOp(client, "Capacity Loads", "/erp/70/MfgCapLoad", &mfg.MfgCapacityLoadList{List: capLoads}, extractIDs(capLoads, func(e *mfg.MfgCapacityLoad) string { return e.LoadId }), &store.MfgCapacityLoadIDs); err != nil {
		return err
	}

	// Generate Production Schedules
	prodSchedules := generateProdSchedules()
	if err := runOp(client, "Production Schedules", "/erp/70/MfgProdSch", &mfg.MfgProdScheduleList{List: prodSchedules}, extractIDs(prodSchedules, func(e *mfg.MfgProdSchedule) string { return e.ScheduleId }), &store.MfgProdScheduleIDs); err != nil {
		return err
	}

	// Generate Schedule Blocks
	schedBlocks := generateScheduleBlocks(store)
	if err := runOp(client, "Schedule Blocks", "/erp/70/MfgSchBlk", &mfg.MfgScheduleBlockList{List: schedBlocks}, extractIDs(schedBlocks, func(e *mfg.MfgScheduleBlock) string { return e.BlockId }), &store.MfgScheduleBlockIDs); err != nil {
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

	// Generate Actual Costs
	actCosts := generateActualCosts(store)
	if err := runOp(client, "Actual Costs", "/erp/70/MfgActCost", &mfg.MfgActualCostList{List: actCosts}, extractIDs(actCosts, func(e *mfg.MfgActualCost) string { return e.ActualCostId }), &store.MfgActualCostIDs); err != nil {
		return err
	}

	// Generate Cost Variances
	variances := generateCostVariances(store)
	if err := runOp(client, "Cost Variances", "/erp/70/MfgCostVar", &mfg.MfgCostVarianceList{List: variances}, extractIDs(variances, func(e *mfg.MfgCostVariance) string { return e.VarianceId }), &store.MfgCostVarianceIDs); err != nil {
		return err
	}

	// Generate Overheads
	overheads := generateOverheads(store)
	if err := runOp(client, "Overheads", "/erp/70/MfgOverhd", &mfg.MfgOverheadList{List: overheads}, extractIDs(overheads, func(e *mfg.MfgOverhead) string { return e.OverheadId }), &store.MfgOverheadIDs); err != nil {
		return err
	}

	// Generate Overhead Allocations
	ohAllocs := generateOverheadAllocs(store)
	if err := runOp(client, "Overhead Allocations", "/erp/70/MfgOHAlloc", &mfg.MfgOverheadAllocList{List: ohAllocs}, extractIDs(ohAllocs, func(e *mfg.MfgOverheadAlloc) string { return e.AllocationId }), &store.MfgOverheadAllocIDs); err != nil {
		return err
	}

	return nil
}
