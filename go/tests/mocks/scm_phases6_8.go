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

	"github.com/saichler/l8erp/go/types/scm"
)

// SCM Phase 6: Inventory Transactions
func generateScmPhase6(client *HCMClient, store *MockDataStore) error {
	// Generate Stock Movements
	fmt.Printf("  Creating Stock Movements...")
	stockMovements := generateStockMovements(store)
	if err := client.post("/erp/50/StockMove", &scm.ScmStockMovementList{List: stockMovements}); err != nil {
		return fmt.Errorf("stock movements: %w", err)
	}
	for _, sm := range stockMovements {
		store.StockMovementIDs = append(store.StockMovementIDs, sm.MovementId)
	}
	fmt.Printf(" %d created\n", len(stockMovements))

	// Generate Lot Numbers
	fmt.Printf("  Creating Lot Numbers...")
	lotNumbers := generateLotNumbers(store)
	if err := client.post("/erp/50/LotNumber", &scm.ScmLotNumberList{List: lotNumbers}); err != nil {
		return fmt.Errorf("lot numbers: %w", err)
	}
	for _, ln := range lotNumbers {
		store.LotNumberIDs = append(store.LotNumberIDs, ln.LotId)
	}
	fmt.Printf(" %d created\n", len(lotNumbers))

	// Generate Serial Numbers
	fmt.Printf("  Creating Serial Numbers...")
	serialNumbers := generateSerialNumbers(store)
	if err := client.post("/erp/50/SerialNum", &scm.ScmSerialNumberList{List: serialNumbers}); err != nil {
		return fmt.Errorf("serial numbers: %w", err)
	}
	for _, sn := range serialNumbers {
		store.SerialNumberIDs = append(store.SerialNumberIDs, sn.SerialId)
	}
	fmt.Printf(" %d created\n", len(serialNumbers))

	// Generate Cycle Counts
	fmt.Printf("  Creating Cycle Counts...")
	cycleCounts := generateCycleCounts(store)
	if err := client.post("/erp/50/CycleCount", &scm.ScmCycleCountList{List: cycleCounts}); err != nil {
		return fmt.Errorf("cycle counts: %w", err)
	}
	for _, cc := range cycleCounts {
		store.CycleCountIDs = append(store.CycleCountIDs, cc.CycleCountId)
	}
	fmt.Printf(" %d created\n", len(cycleCounts))

	// Generate Reorder Points
	fmt.Printf("  Creating Reorder Points...")
	reorderPoints := generateReorderPoints(store)
	if err := client.post("/erp/50/ReorderPt", &scm.ScmReorderPointList{List: reorderPoints}); err != nil {
		return fmt.Errorf("reorder points: %w", err)
	}
	for _, rp := range reorderPoints {
		store.ReorderPointIDs = append(store.ReorderPointIDs, rp.ReorderPointId)
	}
	fmt.Printf(" %d created\n", len(reorderPoints))

	// Generate Inventory Valuations
	fmt.Printf("  Creating Inventory Valuations...")
	inventoryValuations := generateInventoryValuations(store)
	if err := client.post("/erp/50/InvValue", &scm.ScmInventoryValuationList{List: inventoryValuations}); err != nil {
		return fmt.Errorf("inventory valuations: %w", err)
	}
	for _, iv := range inventoryValuations {
		store.InventoryValuationIDs = append(store.InventoryValuationIDs, iv.ValuationId)
	}
	fmt.Printf(" %d created\n", len(inventoryValuations))

	return nil
}

// SCM Phase 7: Logistics
func generateScmPhase7(client *HCMClient, store *MockDataStore) error {
	// Generate Shipments
	fmt.Printf("  Creating Shipments...")
	shipments := generateShipments(store)
	if err := client.post("/erp/50/Shipment", &scm.ScmShipmentList{List: shipments}); err != nil {
		return fmt.Errorf("shipments: %w", err)
	}
	for _, s := range shipments {
		store.ShipmentIDs = append(store.ShipmentIDs, s.ShipmentId)
	}
	fmt.Printf(" %d created\n", len(shipments))

	// Generate Routes
	fmt.Printf("  Creating Routes...")
	routes := generateRoutes(store)
	if err := client.post("/erp/50/Route", &scm.ScmRouteList{List: routes}); err != nil {
		return fmt.Errorf("routes: %w", err)
	}
	for _, r := range routes {
		store.RouteIDs = append(store.RouteIDs, r.RouteId)
	}
	fmt.Printf(" %d created\n", len(routes))

	// Generate Load Plans
	fmt.Printf("  Creating Load Plans...")
	loadPlans := generateLoadPlans(store)
	if err := client.post("/erp/50/LoadPlan", &scm.ScmLoadPlanList{List: loadPlans}); err != nil {
		return fmt.Errorf("load plans: %w", err)
	}
	for _, lp := range loadPlans {
		store.LoadPlanIDs = append(store.LoadPlanIDs, lp.LoadPlanId)
	}
	fmt.Printf(" %d created\n", len(loadPlans))

	// Generate Delivery Proofs
	fmt.Printf("  Creating Delivery Proofs...")
	deliveryProofs := generateDeliveryProofs(store)
	if err := client.post("/erp/50/DlvryProof", &scm.ScmDeliveryProofList{List: deliveryProofs}); err != nil {
		return fmt.Errorf("delivery proofs: %w", err)
	}
	for _, dp := range deliveryProofs {
		store.DeliveryProofIDs = append(store.DeliveryProofIDs, dp.ProofId)
	}
	fmt.Printf(" %d created\n", len(deliveryProofs))

	// Generate Freight Audits
	fmt.Printf("  Creating Freight Audits...")
	freightAudits := generateFreightAudits(store)
	if err := client.post("/erp/50/FrtAudit", &scm.ScmFreightAuditList{List: freightAudits}); err != nil {
		return fmt.Errorf("freight audits: %w", err)
	}
	for _, fa := range freightAudits {
		store.FreightAuditIDs = append(store.FreightAuditIDs, fa.AuditId)
	}
	fmt.Printf(" %d created\n", len(freightAudits))

	// Generate Return Authorizations
	fmt.Printf("  Creating Return Authorizations...")
	returnAuths := generateReturnAuthorizations(store)
	if err := client.post("/erp/50/ReturnAuth", &scm.ScmReturnAuthorizationList{List: returnAuths}); err != nil {
		return fmt.Errorf("return authorizations: %w", err)
	}
	for _, ra := range returnAuths {
		store.ReturnAuthorizationIDs = append(store.ReturnAuthorizationIDs, ra.RmaId)
	}
	fmt.Printf(" %d created\n", len(returnAuths))

	return nil
}

// SCM Phase 8: Planning
func generateScmPhase8(client *HCMClient, store *MockDataStore) error {
	// Generate Demand Forecasts
	fmt.Printf("  Creating Demand Forecasts...")
	demandForecasts := generateDemandForecasts(store)
	if err := client.post("/erp/50/DmndFcast", &scm.ScmDemandForecastList{List: demandForecasts}); err != nil {
		return fmt.Errorf("demand forecasts: %w", err)
	}
	for _, df := range demandForecasts {
		store.DemandForecastIDs = append(store.DemandForecastIDs, df.ForecastId)
	}
	fmt.Printf(" %d created\n", len(demandForecasts))

	// Generate Demand Plans
	fmt.Printf("  Creating Demand Plans...")
	demandPlans := generateDemandPlans(store)
	if err := client.post("/erp/50/DemandPlan", &scm.ScmDemandPlanList{List: demandPlans}); err != nil {
		return fmt.Errorf("demand plans: %w", err)
	}
	for _, dp := range demandPlans {
		store.DemandPlanIDs = append(store.DemandPlanIDs, dp.PlanId)
	}
	fmt.Printf(" %d created\n", len(demandPlans))

	// Generate Promotional Plans
	fmt.Printf("  Creating Promotional Plans...")
	promoPlan := generatePromotionalPlans(store)
	if err := client.post("/erp/50/PromoPlan", &scm.ScmPromotionalPlanList{List: promoPlan}); err != nil {
		return fmt.Errorf("promotional plans: %w", err)
	}
	for _, pp := range promoPlan {
		store.PromotionalPlanIDs = append(store.PromotionalPlanIDs, pp.PlanId)
	}
	fmt.Printf(" %d created\n", len(promoPlan))

	// Generate New Product Plans
	fmt.Printf("  Creating New Product Plans...")
	newProductPlans := generateNewProductPlans(store)
	if err := client.post("/erp/50/NewProdPln", &scm.ScmNewProductPlanList{List: newProductPlans}); err != nil {
		return fmt.Errorf("new product plans: %w", err)
	}
	for _, np := range newProductPlans {
		store.NewProductPlanIDs = append(store.NewProductPlanIDs, np.PlanId)
	}
	fmt.Printf(" %d created\n", len(newProductPlans))

	// Generate Forecast Accuracy
	fmt.Printf("  Creating Forecast Accuracy...")
	forecastAccuracy := generateForecastAccuracy(store)
	if err := client.post("/erp/50/FcastAccur", &scm.ScmForecastAccuracyList{List: forecastAccuracy}); err != nil {
		return fmt.Errorf("forecast accuracy: %w", err)
	}
	for _, fa := range forecastAccuracy {
		store.ForecastAccuracyIDs = append(store.ForecastAccuracyIDs, fa.AccuracyId)
	}
	fmt.Printf(" %d created\n", len(forecastAccuracy))

	// Generate Material Requirements
	fmt.Printf("  Creating Material Requirements...")
	materialReqs := generateMaterialRequirements(store)
	if err := client.post("/erp/50/MatReq", &scm.ScmMaterialRequirementList{List: materialReqs}); err != nil {
		return fmt.Errorf("material requirements: %w", err)
	}
	for _, mr := range materialReqs {
		store.MaterialRequirementIDs = append(store.MaterialRequirementIDs, mr.RequirementId)
	}
	fmt.Printf(" %d created\n", len(materialReqs))

	// Generate Distribution Requirements
	fmt.Printf("  Creating Distribution Requirements...")
	distReqs := generateDistributionRequirements(store)
	if err := client.post("/erp/50/DistReq", &scm.ScmDistributionRequirementList{List: distReqs}); err != nil {
		return fmt.Errorf("distribution requirements: %w", err)
	}
	for _, dr := range distReqs {
		store.DistributionRequirementIDs = append(store.DistributionRequirementIDs, dr.RequirementId)
	}
	fmt.Printf(" %d created\n", len(distReqs))

	// Generate Supply Plans
	fmt.Printf("  Creating Supply Plans...")
	supplyPlans := generateSupplyPlans(store)
	if err := client.post("/erp/50/SupplyPlan", &scm.ScmSupplyPlanList{List: supplyPlans}); err != nil {
		return fmt.Errorf("supply plans: %w", err)
	}
	for _, sp := range supplyPlans {
		store.SupplyPlanIDs = append(store.SupplyPlanIDs, sp.PlanId)
	}
	fmt.Printf(" %d created\n", len(supplyPlans))

	// Generate Supplier Collaborations
	fmt.Printf("  Creating Supplier Collaborations...")
	supplierCollabs := generateSupplierCollaborations(store)
	if err := client.post("/erp/50/SupCollab", &scm.ScmSupplierCollaborationList{List: supplierCollabs}); err != nil {
		return fmt.Errorf("supplier collaborations: %w", err)
	}
	for _, sc := range supplierCollabs {
		store.SupplierCollaborationIDs = append(store.SupplierCollaborationIDs, sc.CollaborationId)
	}
	fmt.Printf(" %d created\n", len(supplierCollabs))

	// Generate Safety Stocks
	fmt.Printf("  Creating Safety Stocks...")
	safetyStocks := generateSafetyStocks(store)
	if err := client.post("/erp/50/SafeStock", &scm.ScmSafetyStockList{List: safetyStocks}); err != nil {
		return fmt.Errorf("safety stocks: %w", err)
	}
	for _, ss := range safetyStocks {
		store.SafetyStockIDs = append(store.SafetyStockIDs, ss.SafetyStockId)
	}
	fmt.Printf(" %d created\n", len(safetyStocks))

	// Generate Lead Times
	fmt.Printf("  Creating Lead Times...")
	leadTimes := generateLeadTimes(store)
	if err := client.post("/erp/50/LeadTime", &scm.ScmLeadTimeList{List: leadTimes}); err != nil {
		return fmt.Errorf("lead times: %w", err)
	}
	for _, lt := range leadTimes {
		store.LeadTimeIDs = append(store.LeadTimeIDs, lt.LeadTimeId)
	}
	fmt.Printf(" %d created\n", len(leadTimes))

	return nil
}
