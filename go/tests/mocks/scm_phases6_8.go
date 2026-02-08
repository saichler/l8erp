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

	"github.com/saichler/l8erp/go/types/scm"
)

// SCM Phase 6: Inventory Transactions
func generateScmPhase6(client *HCMClient, store *MockDataStore) error {
	// Generate Stock Movements
	stockMovements := generateStockMovements(store)
	if err := runOp(client, "Stock Movements", "/erp/50/StockMove", &scm.ScmStockMovementList{List: stockMovements}, extractIDs(stockMovements, func(e *scm.ScmStockMovement) string { return e.MovementId }), &store.StockMovementIDs); err != nil {
		return err
	}

	// Generate Lot Numbers
	lotNumbers := generateLotNumbers(store)
	if err := runOp(client, "Lot Numbers", "/erp/50/LotNumber", &scm.ScmLotNumberList{List: lotNumbers}, extractIDs(lotNumbers, func(e *scm.ScmLotNumber) string { return e.LotId }), &store.LotNumberIDs); err != nil {
		return err
	}

	// Generate Serial Numbers
	serialNumbers := generateSerialNumbers(store)
	if err := runOp(client, "Serial Numbers", "/erp/50/SerialNum", &scm.ScmSerialNumberList{List: serialNumbers}, extractIDs(serialNumbers, func(e *scm.ScmSerialNumber) string { return e.SerialId }), &store.SerialNumberIDs); err != nil {
		return err
	}

	// Generate Cycle Counts
	cycleCounts := generateCycleCounts(store)
	if err := runOp(client, "Cycle Counts", "/erp/50/CycleCount", &scm.ScmCycleCountList{List: cycleCounts}, extractIDs(cycleCounts, func(e *scm.ScmCycleCount) string { return e.CycleCountId }), &store.CycleCountIDs); err != nil {
		return err
	}

	// Generate Reorder Points
	reorderPoints := generateReorderPoints(store)
	if err := runOp(client, "Reorder Points", "/erp/50/ReorderPt", &scm.ScmReorderPointList{List: reorderPoints}, extractIDs(reorderPoints, func(e *scm.ScmReorderPoint) string { return e.ReorderPointId }), &store.ReorderPointIDs); err != nil {
		return err
	}

	// Generate Inventory Valuations
	inventoryValuations := generateInventoryValuations(store)
	if err := runOp(client, "Inventory Valuations", "/erp/50/InvValue", &scm.ScmInventoryValuationList{List: inventoryValuations}, extractIDs(inventoryValuations, func(e *scm.ScmInventoryValuation) string { return e.ValuationId }), &store.InventoryValuationIDs); err != nil {
		return err
	}

	return nil
}

// SCM Phase 7: Logistics
func generateScmPhase7(client *HCMClient, store *MockDataStore) error {
	// Generate Shipments
	shipments := generateShipments(store)
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

	// Generate Delivery Proofs
	deliveryProofs := generateDeliveryProofs(store)
	if err := runOp(client, "Delivery Proofs", "/erp/50/DlvryProof", &scm.ScmDeliveryProofList{List: deliveryProofs}, extractIDs(deliveryProofs, func(e *scm.ScmDeliveryProof) string { return e.ProofId }), &store.DeliveryProofIDs); err != nil {
		return err
	}

	// Generate Freight Audits
	freightAudits := generateFreightAudits(store)
	if err := runOp(client, "Freight Audits", "/erp/50/FrtAudit", &scm.ScmFreightAuditList{List: freightAudits}, extractIDs(freightAudits, func(e *scm.ScmFreightAudit) string { return e.AuditId }), &store.FreightAuditIDs); err != nil {
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
	// Generate Demand Forecasts
	demandForecasts := generateDemandForecasts(store)
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

	// Generate Forecast Accuracy
	forecastAccuracy := generateForecastAccuracy(store)
	if err := runOp(client, "Forecast Accuracy", "/erp/50/FcastAccur", &scm.ScmForecastAccuracyList{List: forecastAccuracy}, extractIDs(forecastAccuracy, func(e *scm.ScmForecastAccuracy) string { return e.AccuracyId }), &store.ForecastAccuracyIDs); err != nil {
		return err
	}

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
