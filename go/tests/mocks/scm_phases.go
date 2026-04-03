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

// SCM Phase 1: Foundation
func generateScmPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate Item Categories
	itemCategories := generateItemCategories()
	if err := runOp(client, "Item Categories", "/erp/50/ItemCat", &scm.ScmItemCategoryList{List: itemCategories}, extractIDs(itemCategories, func(v interface{}) string { return v.(*scm.ScmItemCategory).CategoryId }), &store.ItemCategoryIDs); err != nil {
		return err
	}

	// Generate Warehouses
	warehouses := generateWarehouses(store)
	if err := runOp(client, "Warehouses", "/erp/50/Warehouse", &scm.ScmWarehouseList{List: warehouses}, extractIDs(warehouses, func(v interface{}) string { return v.(*scm.ScmWarehouse).WarehouseId }), &store.SCMWarehouseIDs); err != nil {
		return err
	}

	// Generate SCM Carriers
	carriers := generateSCMCarriers()
	if err := runOp(client, "SCM Carriers", "/erp/50/ScmCarrier", &scm.ScmCarrierList{List: carriers}, extractIDs(carriers, func(v interface{}) string { return v.(*scm.ScmCarrier).CarrierId }), &store.SCMCarrierIDs); err != nil {
		return err
	}

	// Generate Forecast Models
	forecastModels := generateForecastModels()
	if err := runOp(client, "Forecast Models", "/erp/50/FcastModel", &scm.ScmForecastModelList{List: forecastModels}, extractIDs(forecastModels, func(v interface{}) string { return v.(*scm.ScmForecastModel).ModelId }), &store.ForecastModelIDs); err != nil {
		return err
	}

	return nil
}

// SCM Phase 2: Inventory Core
func generateScmPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Items
	items := generateItems(store)
	if err := runOp(client, "Items", "/erp/50/Item", &scm.ScmItemList{List: items}, extractIDs(items, func(v interface{}) string { return v.(*scm.ScmItem).ItemId }), &store.ItemIDs); err != nil {
		return err
	}

	// Bins are embedded in Warehouses (Phase 1), BinIDs already populated

	// Generate Freight Rates
	freightRates := generateFreightRates(store)
	if err := runOp(client, "Freight Rates", "/erp/50/FreightRt", &scm.ScmFreightRateList{List: freightRates}, extractIDs(freightRates, func(v interface{}) string { return v.(*scm.ScmFreightRate).RateId }), &store.FreightRateIDs); err != nil {
		return err
	}

	return nil
}

// SCM Phase 3: Procurement
func generateScmPhase3(client *HCMClient, store *MockDataStore) error {
	// Generate Purchase Requisitions
	requisitions := generatePurchaseRequisitions(store)
	if err := runOp(client, "Purchase Requisitions", "/erp/50/PurchReq", &scm.ScmPurchaseRequisitionList{List: requisitions}, extractIDs(requisitions, func(v interface{}) string { return v.(*scm.ScmPurchaseRequisition).RequisitionId }), &store.PurchaseRequisitionIDs); err != nil {
		return err
	}

	// Requisition Lines are embedded in PurchaseRequisitions above

	// Generate RFQs
	rfqs := generateRFQs(store)
	if err := runOp(client, "RFQs", "/erp/50/RFQ", &scm.ScmRequestForQuotationList{List: rfqs}, extractIDs(rfqs, func(v interface{}) string { return v.(*scm.ScmRequestForQuotation).RfqId }), &store.RFQIDs); err != nil {
		return err
	}

	// Generate Blanket Orders
	blanketOrders := generateBlanketOrders(store)
	if err := runOp(client, "Blanket Orders", "/erp/50/BlnktOrder", &scm.ScmBlanketOrderList{List: blanketOrders}, extractIDs(blanketOrders, func(v interface{}) string { return v.(*scm.ScmBlanketOrder).BlanketOrderId }), &store.BlanketOrderIDs); err != nil {
		return err
	}

	// Generate Supplier Scorecards
	scorecards := generateSupplierScorecards(store)
	if err := runOp(client, "Supplier Scorecards", "/erp/50/SupplrCard", &scm.ScmSupplierScorecardList{List: scorecards}, extractIDs(scorecards, func(v interface{}) string { return v.(*scm.ScmSupplierScorecard).ScorecardId }), &store.SupplierScorecardIDs); err != nil {
		return err
	}

	return nil
}

// SCM Phase 4: Purchase Orders (with embedded PO Lines)
func generateScmPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Purchase Orders
	purchaseOrders := generateSCMPurchaseOrders(store)

	// Generate PO Lines and embed in POs (3 lines per PO)
	poLines := generatePOLines(store, len(purchaseOrders))
	for i, line := range poLines {
		poIdx := i / 3 // 3 lines per PO
		if poIdx < len(purchaseOrders) {
			purchaseOrders[poIdx].Lines = append(purchaseOrders[poIdx].Lines, line)
		}
	}

	if err := runOp(client, "Purchase Orders", "/erp/50/PurchOrder", &scm.ScmPurchaseOrderList{List: purchaseOrders}, extractIDs(purchaseOrders, func(v interface{}) string { return v.(*scm.ScmPurchaseOrder).PurchaseOrderId }), &store.SCMPurchaseOrderIDs); err != nil {
		return err
	}

	return nil
}

// SCM Phase 5: Warehouse Operations (with embedded tasks)
func generateScmPhase5(client *HCMClient, store *MockDataStore) error {
	// Generate Receiving Orders with embedded putaway tasks
	receivingOrders := generateReceivingOrders(store)
	putawayTasks := generatePutawayTasks(store, len(receivingOrders))
	for i, task := range putawayTasks {
		roIdx := i % len(receivingOrders)
		receivingOrders[roIdx].PutawayTasks = append(receivingOrders[roIdx].PutawayTasks, task)
	}
	if err := runOp(client, "Receiving Orders", "/erp/50/RecvOrder", &scm.ScmReceivingOrderList{List: receivingOrders}, extractIDs(receivingOrders, func(v interface{}) string { return v.(*scm.ScmReceivingOrder).ReceivingOrderId }), &store.ReceivingOrderIDs); err != nil {
		return err
	}

	// Generate Wave Plans with embedded pick/pack/ship tasks
	wavePlans := generateWavePlans(store)
	pickTasks := generatePickTasks(store)
	for i, task := range pickTasks {
		wpIdx := i % len(wavePlans)
		wavePlans[wpIdx].PickTasks = append(wavePlans[wpIdx].PickTasks, task)
	}
	packTasks := generatePackTasks(store)
	for i, task := range packTasks {
		wpIdx := i % len(wavePlans)
		wavePlans[wpIdx].PackTasks = append(wavePlans[wpIdx].PackTasks, task)
	}
	shipTasks := generateShipTasks(store)
	for i, task := range shipTasks {
		wpIdx := i % len(wavePlans)
		wavePlans[wpIdx].ShipTasks = append(wavePlans[wpIdx].ShipTasks, task)
	}
	if err := runOp(client, "Wave Plans", "/erp/50/WavePlan", &scm.ScmWavePlanList{List: wavePlans}, extractIDs(wavePlans, func(v interface{}) string { return v.(*scm.ScmWavePlan).WavePlanId }), &store.WavePlanIDs); err != nil {
		return err
	}

	// Generate Dock Schedules
	dockSchedules := generateDockSchedules(store)
	if err := runOp(client, "Dock Schedules", "/erp/50/DockSched", &scm.ScmDockScheduleList{List: dockSchedules}, extractIDs(dockSchedules, func(v interface{}) string { return v.(*scm.ScmDockSchedule).ScheduleId }), &store.DockScheduleIDs); err != nil {
		return err
	}

	return nil
}
