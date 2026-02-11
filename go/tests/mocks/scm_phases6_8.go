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
	"fmt"

	"github.com/saichler/l8erp/go/types/scm"
)

// SCM Phase 6: Inventory Transactions (children embedded in Items via Phase 2 re-post)
func generateScmPhase6(client *HCMClient, store *MockDataStore) error {
	// Stock Movements, Lot Numbers, Serial Numbers, Reorder Points, and Inventory Valuations
	// are now embedded in ScmItem (posted in Phase 2). Generate and re-post items with children.
	items := generateItems(store)
	movements := generateStockMovements(store)
	for i, m := range movements {
		items[i%len(items)].Movements = append(items[i%len(items)].Movements, m)
	}
	lots := generateLotNumbers(store)
	for i, l := range lots {
		items[i%len(items)].Lots = append(items[i%len(items)].Lots, l)
	}
	serials := generateSerialNumbers(store)
	for i, s := range serials {
		items[i%len(items)].Serials = append(items[i%len(items)].Serials, s)
	}
	reorderPoints := generateReorderPoints(store)
	for i, r := range reorderPoints {
		items[i%len(items)].ReorderPoints = append(items[i%len(items)].ReorderPoints, r)
	}
	valuations := generateInventoryValuations(store)
	for i, v := range valuations {
		items[i%len(items)].Valuations = append(items[i%len(items)].Valuations, v)
	}
	// Re-post items with embedded children (PUT to update)
	if _, err := client.Post("/erp/50/Item", &scm.ScmItemList{List: items}); err != nil {
		return fmt.Errorf("failed to update Items with children: %v", err)
	}
	fmt.Printf("  Updated %d Items with embedded children (movements: %d, lots: %d, serials: %d, reorder points: %d, valuations: %d)\n",
		len(items), len(movements), len(lots), len(serials), len(reorderPoints), len(valuations))

	// Generate Cycle Counts (standalone Prime Object)
	cycleCounts := generateCycleCounts(store)
	if err := runOp(client, "Cycle Counts", "/erp/50/CycleCount", &scm.ScmCycleCountList{List: cycleCounts}, extractIDs(cycleCounts, func(e *scm.ScmCycleCount) string { return e.CycleCountId }), &store.CycleCountIDs); err != nil {
		return err
	}

	return nil
}

// SCM Phase 7: Logistics (with embedded delivery proofs and freight audits)
func generateScmPhase7(client *HCMClient, store *MockDataStore) error {
	// Generate Shipments with embedded delivery proofs and freight audits
	shipments := generateShipments(store)
	deliveryProofs := generateDeliveryProofs(store)
	for i, proof := range deliveryProofs {
		shipments[i%len(shipments)].DeliveryProofs = append(shipments[i%len(shipments)].DeliveryProofs, proof)
	}
	freightAudits := generateFreightAudits(store)
	for i, audit := range freightAudits {
		shipments[i%len(shipments)].FreightAudits = append(shipments[i%len(shipments)].FreightAudits, audit)
	}
	if err := runOp(client, "Shipments", "/erp/50/Shipment", &scm.ScmShipmentList{List: shipments}, extractIDs(shipments, func(e *scm.ScmShipment) string { return e.ShipmentId }), &store.ShipmentIDs); err != nil {
		return err
	}

	// Generate Routes
	routes := generateRoutes(store)
	if err := runOp(client, "Routes", "/erp/50/Route", &scm.ScmRouteList{List: routes}, extractIDs(routes, func(e *scm.ScmRoute) string { return e.RouteId }), &store.RouteIDs); err != nil {
		return err
	}

	// Generate Load Plans
	loadPlans := generateLoadPlans(store)
	if err := runOp(client, "Load Plans", "/erp/50/LoadPlan", &scm.ScmLoadPlanList{List: loadPlans}, extractIDs(loadPlans, func(e *scm.ScmLoadPlan) string { return e.LoadPlanId }), &store.LoadPlanIDs); err != nil {
		return err
	}

	// Generate Return Authorizations
	returnAuths := generateReturnAuthorizations(store)
	if err := runOp(client, "Return Authorizations", "/erp/50/ReturnAuth", &scm.ScmReturnAuthorizationList{List: returnAuths}, extractIDs(returnAuths, func(e *scm.ScmReturnAuthorization) string { return e.RmaId }), &store.ReturnAuthorizationIDs); err != nil {
		return err
	}

	return nil
}

// SCM Phase 8: Planning
func generateScmPhase8(client *HCMClient, store *MockDataStore) error {
	// Generate Demand Forecasts with embedded accuracy records
	demandForecasts := generateDemandForecasts(store)
	forecastAccuracy := generateForecastAccuracy(store)
	for i, acc := range forecastAccuracy {
		demandForecasts[i%len(demandForecasts)].Accuracies = append(demandForecasts[i%len(demandForecasts)].Accuracies, acc)
	}
	if err := runOp(client, "Demand Forecasts", "/erp/50/DmndFcast", &scm.ScmDemandForecastList{List: demandForecasts}, extractIDs(demandForecasts, func(e *scm.ScmDemandForecast) string { return e.ForecastId }), &store.DemandForecastIDs); err != nil {
		return err
	}

	// Generate Demand Plans
	demandPlans := generateDemandPlans(store)
	if err := runOp(client, "Demand Plans", "/erp/50/DemandPlan", &scm.ScmDemandPlanList{List: demandPlans}, extractIDs(demandPlans, func(e *scm.ScmDemandPlan) string { return e.PlanId }), &store.DemandPlanIDs); err != nil {
		return err
	}

	// Generate Promotional Plans
	promoPlan := generatePromotionalPlans(store)
	if err := runOp(client, "Promotional Plans", "/erp/50/PromoPlan", &scm.ScmPromotionalPlanList{List: promoPlan}, extractIDs(promoPlan, func(e *scm.ScmPromotionalPlan) string { return e.PlanId }), &store.PromotionalPlanIDs); err != nil {
		return err
	}

	// Generate New Product Plans
	newProductPlans := generateNewProductPlans(store)
	if err := runOp(client, "New Product Plans", "/erp/50/NewProdPln", &scm.ScmNewProductPlanList{List: newProductPlans}, extractIDs(newProductPlans, func(e *scm.ScmNewProductPlan) string { return e.PlanId }), &store.NewProductPlanIDs); err != nil {
		return err
	}

	// Forecast Accuracy records are embedded in Demand Forecasts above

	// Generate Material Requirements
	materialReqs := generateMaterialRequirements(store)
	if err := runOp(client, "Material Requirements", "/erp/50/MatReq", &scm.ScmMaterialRequirementList{List: materialReqs}, extractIDs(materialReqs, func(e *scm.ScmMaterialRequirement) string { return e.RequirementId }), &store.MaterialRequirementIDs); err != nil {
		return err
	}

	// Generate Distribution Requirements
	distReqs := generateDistributionRequirements(store)
	if err := runOp(client, "Distribution Requirements", "/erp/50/DistReq", &scm.ScmDistributionRequirementList{List: distReqs}, extractIDs(distReqs, func(e *scm.ScmDistributionRequirement) string { return e.RequirementId }), &store.DistributionRequirementIDs); err != nil {
		return err
	}

	// Generate Supply Plans
	supplyPlans := generateSupplyPlans(store)
	if err := runOp(client, "Supply Plans", "/erp/50/SupplyPlan", &scm.ScmSupplyPlanList{List: supplyPlans}, extractIDs(supplyPlans, func(e *scm.ScmSupplyPlan) string { return e.PlanId }), &store.SupplyPlanIDs); err != nil {
		return err
	}

	// Generate Supplier Collaborations
	supplierCollabs := generateSupplierCollaborations(store)
	if err := runOp(client, "Supplier Collaborations", "/erp/50/SupCollab", &scm.ScmSupplierCollaborationList{List: supplierCollabs}, extractIDs(supplierCollabs, func(e *scm.ScmSupplierCollaboration) string { return e.CollaborationId }), &store.SupplierCollaborationIDs); err != nil {
		return err
	}

	// Generate Safety Stocks
	safetyStocks := generateSafetyStocks(store)
	if err := runOp(client, "Safety Stocks", "/erp/50/SafeStock", &scm.ScmSafetyStockList{List: safetyStocks}, extractIDs(safetyStocks, func(e *scm.ScmSafetyStock) string { return e.SafetyStockId }), &store.SafetyStockIDs); err != nil {
		return err
	}

	// Generate Lead Times
	leadTimes := generateLeadTimes(store)
	if err := runOp(client, "Lead Times", "/erp/50/LeadTime", &scm.ScmLeadTimeList{List: leadTimes}, extractIDs(leadTimes, func(e *scm.ScmLeadTime) string { return e.LeadTimeId }), &store.LeadTimeIDs); err != nil {
		return err
	}

	return nil
}
