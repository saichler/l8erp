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

	"github.com/saichler/l8erp/go/types/mfg"
)

// MFG Phase 1: Foundation (Shop Floor & Engineering)
func generateMfgPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate Work Centers
	fmt.Printf("  Creating Work Centers...")
	workCenters := generateWorkCenters()
	if err := client.post("/erp/70/MfgWorkCtr", &mfg.MfgWorkCenterList{List: workCenters}); err != nil {
		return fmt.Errorf("work centers: %w", err)
	}
	for _, wc := range workCenters {
		store.MfgWorkCenterIDs = append(store.MfgWorkCenterIDs, wc.WorkCenterId)
	}
	fmt.Printf(" %d created\n", len(workCenters))

	// Generate Work Center Capacities
	fmt.Printf("  Creating Work Center Capacities...")
	workCenterCaps := generateWorkCenterCaps(store)
	if err := client.post("/erp/70/MfgWCCap", &mfg.MfgWorkCenterCapList{List: workCenterCaps}); err != nil {
		return fmt.Errorf("work center caps: %w", err)
	}
	for _, cap := range workCenterCaps {
		store.MfgWorkCenterCapIDs = append(store.MfgWorkCenterCapIDs, cap.CapacityId)
	}
	fmt.Printf(" %d created\n", len(workCenterCaps))

	// Generate Shift Schedules
	fmt.Printf("  Creating Shift Schedules...")
	shiftSchedules := generateShiftSchedules()
	if err := client.post("/erp/70/MfgShift", &mfg.MfgShiftScheduleList{List: shiftSchedules}); err != nil {
		return fmt.Errorf("shift schedules: %w", err)
	}
	for _, shift := range shiftSchedules {
		store.MfgShiftScheduleIDs = append(store.MfgShiftScheduleIDs, shift.ScheduleId)
	}
	fmt.Printf(" %d created\n", len(shiftSchedules))

	// Generate BOMs
	fmt.Printf("  Creating BOMs...")
	boms := generateBoms(store)
	if err := client.post("/erp/70/MfgBom", &mfg.MfgBomList{List: boms}); err != nil {
		return fmt.Errorf("boms: %w", err)
	}
	for _, bom := range boms {
		store.MfgBomIDs = append(store.MfgBomIDs, bom.BomId)
	}
	fmt.Printf(" %d created\n", len(boms))

	// Generate BOM Lines
	fmt.Printf("  Creating BOM Lines...")
	bomLines := generateBomLines(store)
	if err := client.post("/erp/70/MfgBomLine", &mfg.MfgBomLineList{List: bomLines}); err != nil {
		return fmt.Errorf("bom lines: %w", err)
	}
	for _, line := range bomLines {
		store.MfgBomLineIDs = append(store.MfgBomLineIDs, line.LineId)
	}
	fmt.Printf(" %d created\n", len(bomLines))

	// Generate Routings
	fmt.Printf("  Creating Routings...")
	routings := generateRoutings(store)
	if err := client.post("/erp/70/MfgRouting", &mfg.MfgRoutingList{List: routings}); err != nil {
		return fmt.Errorf("routings: %w", err)
	}
	for _, routing := range routings {
		store.MfgRoutingIDs = append(store.MfgRoutingIDs, routing.RoutingId)
	}
	fmt.Printf(" %d created\n", len(routings))

	// Generate Routing Operations
	fmt.Printf("  Creating Routing Operations...")
	routingOps := generateRoutingOperations(store)
	if err := client.post("/erp/70/MfgRtngOp", &mfg.MfgRoutingOperationList{List: routingOps}); err != nil {
		return fmt.Errorf("routing operations: %w", err)
	}
	for _, op := range routingOps {
		store.MfgRoutingOpIDs = append(store.MfgRoutingOpIDs, op.OperationId)
	}
	fmt.Printf(" %d created\n", len(routingOps))

	return nil
}

// MFG Phase 2: Engineering Changes & Quality Plans
func generateMfgPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Engineering Change Orders
	fmt.Printf("  Creating Engineering Change Orders...")
	ecos := generateEngChangeOrders(store)
	if err := client.post("/erp/70/MfgECO", &mfg.MfgEngChangeOrderList{List: ecos}); err != nil {
		return fmt.Errorf("engineering change orders: %w", err)
	}
	for _, eco := range ecos {
		store.MfgEngChangeOrderIDs = append(store.MfgEngChangeOrderIDs, eco.ChangeOrderId)
	}
	fmt.Printf(" %d created\n", len(ecos))

	// Generate Engineering Change Details
	fmt.Printf("  Creating Engineering Change Details...")
	ecoDetails := generateEngChangeDetails(store)
	if err := client.post("/erp/70/MfgECODtl", &mfg.MfgEngChangeDetailList{List: ecoDetails}); err != nil {
		return fmt.Errorf("engineering change details: %w", err)
	}
	for _, detail := range ecoDetails {
		store.MfgEngChangeDetailIDs = append(store.MfgEngChangeDetailIDs, detail.DetailId)
	}
	fmt.Printf(" %d created\n", len(ecoDetails))

	// Generate Quality Plans
	fmt.Printf("  Creating Quality Plans...")
	qualityPlans := generateQualityPlans(store)
	if err := client.post("/erp/70/MfgQCPlan", &mfg.MfgQualityPlanList{List: qualityPlans}); err != nil {
		return fmt.Errorf("quality plans: %w", err)
	}
	for _, plan := range qualityPlans {
		store.MfgQualityPlanIDs = append(store.MfgQualityPlanIDs, plan.PlanId)
	}
	fmt.Printf(" %d created\n", len(qualityPlans))

	// Generate Inspection Points
	fmt.Printf("  Creating Inspection Points...")
	inspPoints := generateInspectionPoints(store)
	if err := client.post("/erp/70/MfgInspPt", &mfg.MfgInspectionPointList{List: inspPoints}); err != nil {
		return fmt.Errorf("inspection points: %w", err)
	}
	for _, point := range inspPoints {
		store.MfgInspectionPointIDs = append(store.MfgInspectionPointIDs, point.PointId)
	}
	fmt.Printf(" %d created\n", len(inspPoints))

	return nil
}

// MFG Phase 3: Work Orders & Production
func generateMfgPhase3(client *HCMClient, store *MockDataStore) error {
	// Generate Work Orders
	fmt.Printf("  Creating Work Orders...")
	workOrders := generateWorkOrders(store)
	if err := client.post("/erp/70/MfgWorkOrd", &mfg.MfgWorkOrderList{List: workOrders}); err != nil {
		return fmt.Errorf("work orders: %w", err)
	}
	for _, wo := range workOrders {
		store.MfgWorkOrderIDs = append(store.MfgWorkOrderIDs, wo.WorkOrderId)
	}
	fmt.Printf(" %d created\n", len(workOrders))

	// Generate Work Order Operations
	fmt.Printf("  Creating Work Order Operations...")
	woOps := generateWorkOrderOps(store)
	if err := client.post("/erp/70/MfgWOOp", &mfg.MfgWorkOrderOpList{List: woOps}); err != nil {
		return fmt.Errorf("work order operations: %w", err)
	}
	for _, op := range woOps {
		store.MfgWorkOrderOpIDs = append(store.MfgWorkOrderOpIDs, op.OperationId)
	}
	fmt.Printf(" %d created\n", len(woOps))

	// Generate Production Orders
	fmt.Printf("  Creating Production Orders...")
	prodOrders := generateProductionOrders(store)
	if err := client.post("/erp/70/MfgProdOrd", &mfg.MfgProductionOrderList{List: prodOrders}); err != nil {
		return fmt.Errorf("production orders: %w", err)
	}
	for _, po := range prodOrders {
		store.MfgProductionOrderIDs = append(store.MfgProductionOrderIDs, po.ProdOrderId)
	}
	fmt.Printf(" %d created\n", len(prodOrders))

	// Generate Production Order Lines
	fmt.Printf("  Creating Production Order Lines...")
	poLines := generateProdOrderLines(store)
	if err := client.post("/erp/70/MfgPOLine", &mfg.MfgProdOrderLineList{List: poLines}); err != nil {
		return fmt.Errorf("production order lines: %w", err)
	}
	for _, line := range poLines {
		store.MfgProdOrderLineIDs = append(store.MfgProdOrderLineIDs, line.LineId)
	}
	fmt.Printf(" %d created\n", len(poLines))

	// Generate Production Batches
	fmt.Printf("  Creating Production Batches...")
	batches := generateProdBatches(store)
	if err := client.post("/erp/70/MfgBatch", &mfg.MfgProdBatchList{List: batches}); err != nil {
		return fmt.Errorf("production batches: %w", err)
	}
	for _, batch := range batches {
		store.MfgProdBatchIDs = append(store.MfgProdBatchIDs, batch.BatchId)
	}
	fmt.Printf(" %d created\n", len(batches))

	return nil
}

// MFG Phase 4: Shop Floor Transactions
func generateMfgPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Labor Entries
	fmt.Printf("  Creating Labor Entries...")
	laborEntries := generateLaborEntries(store)
	if err := client.post("/erp/70/MfgLabor", &mfg.MfgLaborEntryList{List: laborEntries}); err != nil {
		return fmt.Errorf("labor entries: %w", err)
	}
	for _, entry := range laborEntries {
		store.MfgLaborEntryIDs = append(store.MfgLaborEntryIDs, entry.EntryId)
	}
	fmt.Printf(" %d created\n", len(laborEntries))

	// Generate Machine Entries
	fmt.Printf("  Creating Machine Entries...")
	machineEntries := generateMachineEntries(store)
	if err := client.post("/erp/70/MfgMachine", &mfg.MfgMachineEntryList{List: machineEntries}); err != nil {
		return fmt.Errorf("machine entries: %w", err)
	}
	for _, entry := range machineEntries {
		store.MfgMachineEntryIDs = append(store.MfgMachineEntryIDs, entry.EntryId)
	}
	fmt.Printf(" %d created\n", len(machineEntries))

	// Generate Downtime Events
	fmt.Printf("  Creating Downtime Events...")
	downtimeEvents := generateDowntimeEvents(store)
	if err := client.post("/erp/70/MfgDowntm", &mfg.MfgDowntimeEventList{List: downtimeEvents}); err != nil {
		return fmt.Errorf("downtime events: %w", err)
	}
	for _, event := range downtimeEvents {
		store.MfgDowntimeEventIDs = append(store.MfgDowntimeEventIDs, event.EventId)
	}
	fmt.Printf(" %d created\n", len(downtimeEvents))

	// Generate Production Consumptions
	fmt.Printf("  Creating Production Consumptions...")
	consumptions := generateProdConsumptions(store)
	if err := client.post("/erp/70/MfgConsump", &mfg.MfgProdConsumptionList{List: consumptions}); err != nil {
		return fmt.Errorf("production consumptions: %w", err)
	}
	for _, consump := range consumptions {
		store.MfgProdConsumpIDs = append(store.MfgProdConsumpIDs, consump.ConsumptionId)
	}
	fmt.Printf(" %d created\n", len(consumptions))

	return nil
}

// MFG Phase 5: Quality Transactions
func generateMfgPhase5(client *HCMClient, store *MockDataStore) error {
	// Generate Quality Inspections
	fmt.Printf("  Creating Quality Inspections...")
	inspections := generateQualityInspections(store)
	if err := client.post("/erp/70/MfgQCInsp", &mfg.MfgQualityInspectionList{List: inspections}); err != nil {
		return fmt.Errorf("quality inspections: %w", err)
	}
	for _, insp := range inspections {
		store.MfgQualityInspectionIDs = append(store.MfgQualityInspectionIDs, insp.InspectionId)
	}
	fmt.Printf(" %d created\n", len(inspections))

	// Generate Test Results
	fmt.Printf("  Creating Test Results...")
	testResults := generateTestResults(store)
	if err := client.post("/erp/70/MfgTestRes", &mfg.MfgTestResultList{List: testResults}); err != nil {
		return fmt.Errorf("test results: %w", err)
	}
	for _, result := range testResults {
		store.MfgTestResultIDs = append(store.MfgTestResultIDs, result.ResultId)
	}
	fmt.Printf(" %d created\n", len(testResults))

	// Generate NCRs
	fmt.Printf("  Creating NCRs...")
	ncrs := generateNCRs(store)
	if err := client.post("/erp/70/MfgNCR", &mfg.MfgNCRList{List: ncrs}); err != nil {
		return fmt.Errorf("NCRs: %w", err)
	}
	for _, ncr := range ncrs {
		store.MfgNCRIDs = append(store.MfgNCRIDs, ncr.NcrId)
	}
	fmt.Printf(" %d created\n", len(ncrs))

	// Generate NCR Actions
	fmt.Printf("  Creating NCR Actions...")
	ncrActions := generateNCRActions(store)
	if err := client.post("/erp/70/MfgNCRAct", &mfg.MfgNCRActionList{List: ncrActions}); err != nil {
		return fmt.Errorf("NCR actions: %w", err)
	}
	for _, action := range ncrActions {
		store.MfgNCRActionIDs = append(store.MfgNCRActionIDs, action.ActionId)
	}
	fmt.Printf(" %d created\n", len(ncrActions))

	return nil
}

// MFG Phase 6: Planning
func generateMfgPhase6(client *HCMClient, store *MockDataStore) error {
	// Generate MRP Runs
	fmt.Printf("  Creating MRP Runs...")
	mrpRuns := generateMrpRuns()
	if err := client.post("/erp/70/MfgMrpRun", &mfg.MfgMrpRunList{List: mrpRuns}); err != nil {
		return fmt.Errorf("MRP runs: %w", err)
	}
	for _, run := range mrpRuns {
		store.MfgMrpRunIDs = append(store.MfgMrpRunIDs, run.RunId)
	}
	fmt.Printf(" %d created\n", len(mrpRuns))

	// Generate MRP Requirements
	fmt.Printf("  Creating MRP Requirements...")
	mrpReqs := generateMrpRequirements(store)
	if err := client.post("/erp/70/MfgMrpReq", &mfg.MfgMrpRequirementList{List: mrpReqs}); err != nil {
		return fmt.Errorf("MRP requirements: %w", err)
	}
	for _, req := range mrpReqs {
		store.MfgMrpRequirementIDs = append(store.MfgMrpRequirementIDs, req.RequirementId)
	}
	fmt.Printf(" %d created\n", len(mrpReqs))

	// Generate Capacity Plans
	fmt.Printf("  Creating Capacity Plans...")
	capPlans := generateCapacityPlans()
	if err := client.post("/erp/70/MfgCapPlan", &mfg.MfgCapacityPlanList{List: capPlans}); err != nil {
		return fmt.Errorf("capacity plans: %w", err)
	}
	for _, plan := range capPlans {
		store.MfgCapacityPlanIDs = append(store.MfgCapacityPlanIDs, plan.PlanId)
	}
	fmt.Printf(" %d created\n", len(capPlans))

	// Generate Capacity Loads
	fmt.Printf("  Creating Capacity Loads...")
	capLoads := generateCapacityLoads(store)
	if err := client.post("/erp/70/MfgCapLoad", &mfg.MfgCapacityLoadList{List: capLoads}); err != nil {
		return fmt.Errorf("capacity loads: %w", err)
	}
	for _, load := range capLoads {
		store.MfgCapacityLoadIDs = append(store.MfgCapacityLoadIDs, load.LoadId)
	}
	fmt.Printf(" %d created\n", len(capLoads))

	// Generate Production Schedules
	fmt.Printf("  Creating Production Schedules...")
	prodSchedules := generateProdSchedules()
	if err := client.post("/erp/70/MfgProdSch", &mfg.MfgProdScheduleList{List: prodSchedules}); err != nil {
		return fmt.Errorf("production schedules: %w", err)
	}
	for _, sched := range prodSchedules {
		store.MfgProdScheduleIDs = append(store.MfgProdScheduleIDs, sched.ScheduleId)
	}
	fmt.Printf(" %d created\n", len(prodSchedules))

	// Generate Schedule Blocks
	fmt.Printf("  Creating Schedule Blocks...")
	schedBlocks := generateScheduleBlocks(store)
	if err := client.post("/erp/70/MfgSchBlk", &mfg.MfgScheduleBlockList{List: schedBlocks}); err != nil {
		return fmt.Errorf("schedule blocks: %w", err)
	}
	for _, block := range schedBlocks {
		store.MfgScheduleBlockIDs = append(store.MfgScheduleBlockIDs, block.BlockId)
	}
	fmt.Printf(" %d created\n", len(schedBlocks))

	return nil
}

// MFG Phase 7: Costing
func generateMfgPhase7(client *HCMClient, store *MockDataStore) error {
	// Generate Standard Costs
	fmt.Printf("  Creating Standard Costs...")
	stdCosts := generateStandardCosts(store)
	if err := client.post("/erp/70/MfgStdCost", &mfg.MfgStandardCostList{List: stdCosts}); err != nil {
		return fmt.Errorf("standard costs: %w", err)
	}
	for _, cost := range stdCosts {
		store.MfgStandardCostIDs = append(store.MfgStandardCostIDs, cost.CostId)
	}
	fmt.Printf(" %d created\n", len(stdCosts))

	// Generate Cost Rollups
	fmt.Printf("  Creating Cost Rollups...")
	rollups := generateCostRollups()
	if err := client.post("/erp/70/MfgRollup", &mfg.MfgCostRollupList{List: rollups}); err != nil {
		return fmt.Errorf("cost rollups: %w", err)
	}
	for _, rollup := range rollups {
		store.MfgCostRollupIDs = append(store.MfgCostRollupIDs, rollup.RollupId)
	}
	fmt.Printf(" %d created\n", len(rollups))

	// Generate Actual Costs
	fmt.Printf("  Creating Actual Costs...")
	actCosts := generateActualCosts(store)
	if err := client.post("/erp/70/MfgActCost", &mfg.MfgActualCostList{List: actCosts}); err != nil {
		return fmt.Errorf("actual costs: %w", err)
	}
	for _, cost := range actCosts {
		store.MfgActualCostIDs = append(store.MfgActualCostIDs, cost.ActualCostId)
	}
	fmt.Printf(" %d created\n", len(actCosts))

	// Generate Cost Variances
	fmt.Printf("  Creating Cost Variances...")
	variances := generateCostVariances(store)
	if err := client.post("/erp/70/MfgCostVar", &mfg.MfgCostVarianceList{List: variances}); err != nil {
		return fmt.Errorf("cost variances: %w", err)
	}
	for _, variance := range variances {
		store.MfgCostVarianceIDs = append(store.MfgCostVarianceIDs, variance.VarianceId)
	}
	fmt.Printf(" %d created\n", len(variances))

	// Generate Overheads
	fmt.Printf("  Creating Overheads...")
	overheads := generateOverheads(store)
	if err := client.post("/erp/70/MfgOverhd", &mfg.MfgOverheadList{List: overheads}); err != nil {
		return fmt.Errorf("overheads: %w", err)
	}
	for _, oh := range overheads {
		store.MfgOverheadIDs = append(store.MfgOverheadIDs, oh.OverheadId)
	}
	fmt.Printf(" %d created\n", len(overheads))

	// Generate Overhead Allocations
	fmt.Printf("  Creating Overhead Allocations...")
	ohAllocs := generateOverheadAllocs(store)
	if err := client.post("/erp/70/MfgOHAlloc", &mfg.MfgOverheadAllocList{List: ohAllocs}); err != nil {
		return fmt.Errorf("overhead allocations: %w", err)
	}
	for _, alloc := range ohAllocs {
		store.MfgOverheadAllocIDs = append(store.MfgOverheadAllocIDs, alloc.AllocationId)
	}
	fmt.Printf(" %d created\n", len(ohAllocs))

	return nil
}
