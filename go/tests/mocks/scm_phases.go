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

	"github.com/saichler/l8erp/go/types/scm"
)

// SCM Phase 1: Foundation
func generateScmPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate Item Categories
	itemCategories := generateItemCategories()
	if err := runOp(client, "Item Categories", "/erp/50/ItemCat", &scm.ScmItemCategoryList{List: itemCategories}, extractIDs(itemCategories, func(e *scm.ScmItemCategory) string { return e.CategoryId }), &store.ItemCategoryIDs); err != nil {
		return err
	}

	// Generate Warehouses
	warehouses := generateWarehouses(store)
	if err := runOp(client, "Warehouses", "/erp/50/Warehouse", &scm.ScmWarehouseList{List: warehouses}, extractIDs(warehouses, func(e *scm.ScmWarehouse) string { return e.WarehouseId }), &store.SCMWarehouseIDs); err != nil {
		return err
	}

	// Generate SCM Carriers
	carriers := generateSCMCarriers()
	if err := runOp(client, "SCM Carriers", "/erp/50/ScmCarrier", &scm.ScmCarrierList{List: carriers}, extractIDs(carriers, func(e *scm.ScmCarrier) string { return e.CarrierId }), &store.SCMCarrierIDs); err != nil {
		return err
	}

	// Generate Forecast Models
	forecastModels := generateForecastModels()
	if err := runOp(client, "Forecast Models", "/erp/50/FcastModel", &scm.ScmForecastModelList{List: forecastModels}, extractIDs(forecastModels, func(e *scm.ScmForecastModel) string { return e.ModelId }), &store.ForecastModelIDs); err != nil {
		return err
	}

	return nil
}

// SCM Phase 2: Inventory Core
func generateScmPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Items
	items := generateItems(store)
	if err := runOp(client, "Items", "/erp/50/Item", &scm.ScmItemList{List: items}, extractIDs(items, func(e *scm.ScmItem) string { return e.ItemId }), &store.ItemIDs); err != nil {
		return err
	}

	// Generate Bins
	bins := generateBins(store)
	if err := runOp(client, "Bins", "/erp/50/Bin", &scm.ScmBinList{List: bins}, extractIDs(bins, func(e *scm.ScmBin) string { return e.BinId }), &store.BinIDs); err != nil {
		return err
	}

	// Generate Freight Rates
	freightRates := generateFreightRates(store)
	if err := runOp(client, "Freight Rates", "/erp/50/FreightRt", &scm.ScmFreightRateList{List: freightRates}, extractIDs(freightRates, func(e *scm.ScmFreightRate) string { return e.RateId }), &store.FreightRateIDs); err != nil {
		return err
	}

	return nil
}

// SCM Phase 3: Procurement
func generateScmPhase3(client *HCMClient, store *MockDataStore) error {
	// Generate Purchase Requisitions
	requisitions := generatePurchaseRequisitions(store)
	if err := runOp(client, "Purchase Requisitions", "/erp/50/PurchReq", &scm.ScmPurchaseRequisitionList{List: requisitions}, extractIDs(requisitions, func(e *scm.ScmPurchaseRequisition) string { return e.RequisitionId }), &store.PurchaseRequisitionIDs); err != nil {
		return err
	}

	// Generate Requisition Lines
	reqLines := generateRequisitionLines(store)
	if err := runOp(client, "Requisition Lines", "/erp/50/ReqLine", &scm.ScmRequisitionLineList{List: reqLines}, extractIDs(reqLines, func(e *scm.ScmRequisitionLine) string { return e.LineId }), &store.RequisitionLineIDs); err != nil {
		return err
	}

	// Generate RFQs
	rfqs := generateRFQs(store)
	if err := runOp(client, "RFQs", "/erp/50/RFQ", &scm.ScmRequestForQuotationList{List: rfqs}, extractIDs(rfqs, func(e *scm.ScmRequestForQuotation) string { return e.RfqId }), &store.RFQIDs); err != nil {
		return err
	}

	// Generate Blanket Orders
	blanketOrders := generateBlanketOrders(store)
	if err := runOp(client, "Blanket Orders", "/erp/50/BlnktOrder", &scm.ScmBlanketOrderList{List: blanketOrders}, extractIDs(blanketOrders, func(e *scm.ScmBlanketOrder) string { return e.BlanketOrderId }), &store.BlanketOrderIDs); err != nil {
		return err
	}

	// Generate Supplier Scorecards
	scorecards := generateSupplierScorecards(store)
	if err := runOp(client, "Supplier Scorecards", "/erp/50/SupplrCard", &scm.ScmSupplierScorecardList{List: scorecards}, extractIDs(scorecards, func(e *scm.ScmSupplierScorecard) string { return e.ScorecardId }), &store.SupplierScorecardIDs); err != nil {
		return err
	}

	return nil
}

// SCM Phase 4: Purchase Orders
func generateScmPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Purchase Orders
	purchaseOrders := generateSCMPurchaseOrders(store)
	if err := runOp(client, "Purchase Orders", "/erp/50/PurchOrder", &scm.ScmPurchaseOrderList{List: purchaseOrders}, extractIDs(purchaseOrders, func(e *scm.ScmPurchaseOrder) string { return e.PurchaseOrderId }), &store.SCMPurchaseOrderIDs); err != nil {
		return err
	}

	// Generate PO Lines
	poLines := generatePOLines(store)
	if err := runOp(client, "PO Lines", "/erp/50/POLine", &scm.ScmPurchaseOrderLineList{List: poLines}, extractIDs(poLines, func(e *scm.ScmPurchaseOrderLine) string { return e.LineId }), &store.POLineIDs); err != nil {
		return err
	}

	return nil
}

// SCM Phase 5: Warehouse Operations
func generateScmPhase5(client *HCMClient, store *MockDataStore) error {
	// Generate Receiving Orders
	receivingOrders := generateReceivingOrders(store)
	if err := runOp(client, "Receiving Orders", "/erp/50/RecvOrder", &scm.ScmReceivingOrderList{List: receivingOrders}, extractIDs(receivingOrders, func(e *scm.ScmReceivingOrder) string { return e.ReceivingOrderId }), &store.ReceivingOrderIDs); err != nil {
		return err
	}

	// Generate Putaway Tasks
	putawayTasks := generatePutawayTasks(store)
	if err := runOp(client, "Putaway Tasks", "/erp/50/PutAway", &scm.ScmPutawayTaskList{List: putawayTasks}, extractIDs(putawayTasks, func(e *scm.ScmPutawayTask) string { return e.TaskId }), &store.PutawayTaskIDs); err != nil {
		return err
	}

	// Generate Pick Tasks
	pickTasks := generatePickTasks(store)
	if err := runOp(client, "Pick Tasks", "/erp/50/PickTask", &scm.ScmPickTaskList{List: pickTasks}, extractIDs(pickTasks, func(e *scm.ScmPickTask) string { return e.TaskId }), &store.PickTaskIDs); err != nil {
		return err
	}

	// Generate Pack Tasks
	packTasks := generatePackTasks(store)
	if err := runOp(client, "Pack Tasks", "/erp/50/PackTask", &scm.ScmPackTaskList{List: packTasks}, extractIDs(packTasks, func(e *scm.ScmPackTask) string { return e.TaskId }), &store.PackTaskIDs); err != nil {
		return err
	}

	// Generate Ship Tasks
	shipTasks := generateShipTasks(store)
	if err := runOp(client, "Ship Tasks", "/erp/50/ShipTask", &scm.ScmShipTaskList{List: shipTasks}, extractIDs(shipTasks, func(e *scm.ScmShipTask) string { return e.TaskId }), &store.ShipTaskIDs); err != nil {
		return err
	}

	// Generate Wave Plans
	wavePlans := generateWavePlans(store)
	if err := runOp(client, "Wave Plans", "/erp/50/WavePlan", &scm.ScmWavePlanList{List: wavePlans}, extractIDs(wavePlans, func(e *scm.ScmWavePlan) string { return e.WavePlanId }), &store.WavePlanIDs); err != nil {
		return err
	}

	// Generate Dock Schedules
	dockSchedules := generateDockSchedules(store)
	if err := runOp(client, "Dock Schedules", "/erp/50/DockSched", &scm.ScmDockScheduleList{List: dockSchedules}, extractIDs(dockSchedules, func(e *scm.ScmDockSchedule) string { return e.ScheduleId }), &store.DockScheduleIDs); err != nil {
		return err
	}

	return nil
}
