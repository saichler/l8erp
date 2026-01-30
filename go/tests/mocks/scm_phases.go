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

// SCM Phase 1: Foundation
func generateScmPhase1(client *HCMClient, store *MockDataStore) error {
	// Generate Item Categories
	fmt.Printf("  Creating Item Categories...")
	itemCategories := generateItemCategories()
	if err := client.post("/erp/50/ItemCat", &scm.ScmItemCategoryList{List: itemCategories}); err != nil {
		return fmt.Errorf("item categories: %w", err)
	}
	for _, ic := range itemCategories {
		store.ItemCategoryIDs = append(store.ItemCategoryIDs, ic.CategoryId)
	}
	fmt.Printf(" %d created\n", len(itemCategories))

	// Generate Warehouses
	fmt.Printf("  Creating Warehouses...")
	warehouses := generateWarehouses(store)
	if err := client.post("/erp/50/Warehouse", &scm.ScmWarehouseList{List: warehouses}); err != nil {
		return fmt.Errorf("warehouses: %w", err)
	}
	for _, w := range warehouses {
		store.SCMWarehouseIDs = append(store.SCMWarehouseIDs, w.WarehouseId)
	}
	fmt.Printf(" %d created\n", len(warehouses))

	// Generate SCM Carriers
	fmt.Printf("  Creating SCM Carriers...")
	carriers := generateSCMCarriers()
	if err := client.post("/erp/50/Carrier", &scm.ScmCarrierList{List: carriers}); err != nil {
		return fmt.Errorf("scm carriers: %w", err)
	}
	for _, c := range carriers {
		store.SCMCarrierIDs = append(store.SCMCarrierIDs, c.CarrierId)
	}
	fmt.Printf(" %d created\n", len(carriers))

	// Generate Forecast Models
	fmt.Printf("  Creating Forecast Models...")
	forecastModels := generateForecastModels()
	if err := client.post("/erp/50/FcastModel", &scm.ScmForecastModelList{List: forecastModels}); err != nil {
		return fmt.Errorf("forecast models: %w", err)
	}
	for _, fm := range forecastModels {
		store.ForecastModelIDs = append(store.ForecastModelIDs, fm.ModelId)
	}
	fmt.Printf(" %d created\n", len(forecastModels))

	return nil
}

// SCM Phase 2: Inventory Core
func generateScmPhase2(client *HCMClient, store *MockDataStore) error {
	// Generate Items
	fmt.Printf("  Creating Items...")
	items := generateItems(store)
	if err := client.post("/erp/50/Item", &scm.ScmItemList{List: items}); err != nil {
		return fmt.Errorf("items: %w", err)
	}
	for _, item := range items {
		store.ItemIDs = append(store.ItemIDs, item.ItemId)
	}
	fmt.Printf(" %d created\n", len(items))

	// Generate Bins
	fmt.Printf("  Creating Bins...")
	bins := generateBins(store)
	if err := client.post("/erp/50/Bin", &scm.ScmBinList{List: bins}); err != nil {
		return fmt.Errorf("bins: %w", err)
	}
	for _, b := range bins {
		store.BinIDs = append(store.BinIDs, b.BinId)
	}
	fmt.Printf(" %d created\n", len(bins))

	// Generate Freight Rates
	fmt.Printf("  Creating Freight Rates...")
	freightRates := generateFreightRates(store)
	if err := client.post("/erp/50/FreightRt", &scm.ScmFreightRateList{List: freightRates}); err != nil {
		return fmt.Errorf("freight rates: %w", err)
	}
	for _, fr := range freightRates {
		store.FreightRateIDs = append(store.FreightRateIDs, fr.RateId)
	}
	fmt.Printf(" %d created\n", len(freightRates))

	return nil
}

// SCM Phase 3: Procurement
func generateScmPhase3(client *HCMClient, store *MockDataStore) error {
	// Generate Purchase Requisitions
	fmt.Printf("  Creating Purchase Requisitions...")
	requisitions := generatePurchaseRequisitions(store)
	if err := client.post("/erp/50/PurchReq", &scm.ScmPurchaseRequisitionList{List: requisitions}); err != nil {
		return fmt.Errorf("purchase requisitions: %w", err)
	}
	for _, r := range requisitions {
		store.PurchaseRequisitionIDs = append(store.PurchaseRequisitionIDs, r.RequisitionId)
	}
	fmt.Printf(" %d created\n", len(requisitions))

	// Generate Requisition Lines
	fmt.Printf("  Creating Requisition Lines...")
	reqLines := generateRequisitionLines(store)
	if err := client.post("/erp/50/ReqLine", &scm.ScmRequisitionLineList{List: reqLines}); err != nil {
		return fmt.Errorf("requisition lines: %w", err)
	}
	for _, rl := range reqLines {
		store.RequisitionLineIDs = append(store.RequisitionLineIDs, rl.LineId)
	}
	fmt.Printf(" %d created\n", len(reqLines))

	// Generate RFQs
	fmt.Printf("  Creating RFQs...")
	rfqs := generateRFQs(store)
	if err := client.post("/erp/50/RFQ", &scm.ScmRequestForQuotationList{List: rfqs}); err != nil {
		return fmt.Errorf("rfqs: %w", err)
	}
	for _, rfq := range rfqs {
		store.RFQIDs = append(store.RFQIDs, rfq.RfqId)
	}
	fmt.Printf(" %d created\n", len(rfqs))

	// Generate Blanket Orders
	fmt.Printf("  Creating Blanket Orders...")
	blanketOrders := generateBlanketOrders(store)
	if err := client.post("/erp/50/BlnktOrder", &scm.ScmBlanketOrderList{List: blanketOrders}); err != nil {
		return fmt.Errorf("blanket orders: %w", err)
	}
	for _, bo := range blanketOrders {
		store.BlanketOrderIDs = append(store.BlanketOrderIDs, bo.BlanketOrderId)
	}
	fmt.Printf(" %d created\n", len(blanketOrders))

	// Generate Supplier Scorecards
	fmt.Printf("  Creating Supplier Scorecards...")
	scorecards := generateSupplierScorecards(store)
	if err := client.post("/erp/50/SupplrCard", &scm.ScmSupplierScorecardList{List: scorecards}); err != nil {
		return fmt.Errorf("supplier scorecards: %w", err)
	}
	for _, sc := range scorecards {
		store.SupplierScorecardIDs = append(store.SupplierScorecardIDs, sc.ScorecardId)
	}
	fmt.Printf(" %d created\n", len(scorecards))

	return nil
}

// SCM Phase 4: Purchase Orders
func generateScmPhase4(client *HCMClient, store *MockDataStore) error {
	// Generate Purchase Orders
	fmt.Printf("  Creating Purchase Orders...")
	purchaseOrders := generateSCMPurchaseOrders(store)
	if err := client.post("/erp/50/PurchOrder", &scm.ScmPurchaseOrderList{List: purchaseOrders}); err != nil {
		return fmt.Errorf("purchase orders: %w", err)
	}
	for _, po := range purchaseOrders {
		store.SCMPurchaseOrderIDs = append(store.SCMPurchaseOrderIDs, po.PurchaseOrderId)
	}
	fmt.Printf(" %d created\n", len(purchaseOrders))

	// Generate PO Lines
	fmt.Printf("  Creating PO Lines...")
	poLines := generatePOLines(store)
	if err := client.post("/erp/50/POLine", &scm.ScmPurchaseOrderLineList{List: poLines}); err != nil {
		return fmt.Errorf("po lines: %w", err)
	}
	for _, pl := range poLines {
		store.POLineIDs = append(store.POLineIDs, pl.LineId)
	}
	fmt.Printf(" %d created\n", len(poLines))

	return nil
}

// SCM Phase 5: Warehouse Operations
func generateScmPhase5(client *HCMClient, store *MockDataStore) error {
	// Generate Receiving Orders
	fmt.Printf("  Creating Receiving Orders...")
	receivingOrders := generateReceivingOrders(store)
	if err := client.post("/erp/50/RecvOrder", &scm.ScmReceivingOrderList{List: receivingOrders}); err != nil {
		return fmt.Errorf("receiving orders: %w", err)
	}
	for _, ro := range receivingOrders {
		store.ReceivingOrderIDs = append(store.ReceivingOrderIDs, ro.ReceivingOrderId)
	}
	fmt.Printf(" %d created\n", len(receivingOrders))

	// Generate Putaway Tasks
	fmt.Printf("  Creating Putaway Tasks...")
	putawayTasks := generatePutawayTasks(store)
	if err := client.post("/erp/50/PutAway", &scm.ScmPutawayTaskList{List: putawayTasks}); err != nil {
		return fmt.Errorf("putaway tasks: %w", err)
	}
	for _, pt := range putawayTasks {
		store.PutawayTaskIDs = append(store.PutawayTaskIDs, pt.TaskId)
	}
	fmt.Printf(" %d created\n", len(putawayTasks))

	// Generate Pick Tasks
	fmt.Printf("  Creating Pick Tasks...")
	pickTasks := generatePickTasks(store)
	if err := client.post("/erp/50/PickTask", &scm.ScmPickTaskList{List: pickTasks}); err != nil {
		return fmt.Errorf("pick tasks: %w", err)
	}
	for _, pk := range pickTasks {
		store.PickTaskIDs = append(store.PickTaskIDs, pk.TaskId)
	}
	fmt.Printf(" %d created\n", len(pickTasks))

	// Generate Pack Tasks
	fmt.Printf("  Creating Pack Tasks...")
	packTasks := generatePackTasks(store)
	if err := client.post("/erp/50/PackTask", &scm.ScmPackTaskList{List: packTasks}); err != nil {
		return fmt.Errorf("pack tasks: %w", err)
	}
	for _, pk := range packTasks {
		store.PackTaskIDs = append(store.PackTaskIDs, pk.TaskId)
	}
	fmt.Printf(" %d created\n", len(packTasks))

	// Generate Ship Tasks
	fmt.Printf("  Creating Ship Tasks...")
	shipTasks := generateShipTasks(store)
	if err := client.post("/erp/50/ShipTask", &scm.ScmShipTaskList{List: shipTasks}); err != nil {
		return fmt.Errorf("ship tasks: %w", err)
	}
	for _, st := range shipTasks {
		store.ShipTaskIDs = append(store.ShipTaskIDs, st.TaskId)
	}
	fmt.Printf(" %d created\n", len(shipTasks))

	// Generate Wave Plans
	fmt.Printf("  Creating Wave Plans...")
	wavePlans := generateWavePlans(store)
	if err := client.post("/erp/50/WavePlan", &scm.ScmWavePlanList{List: wavePlans}); err != nil {
		return fmt.Errorf("wave plans: %w", err)
	}
	for _, wp := range wavePlans {
		store.WavePlanIDs = append(store.WavePlanIDs, wp.WavePlanId)
	}
	fmt.Printf(" %d created\n", len(wavePlans))

	// Generate Dock Schedules
	fmt.Printf("  Creating Dock Schedules...")
	dockSchedules := generateDockSchedules(store)
	if err := client.post("/erp/50/DockSched", &scm.ScmDockScheduleList{List: dockSchedules}); err != nil {
		return fmt.Errorf("dock schedules: %w", err)
	}
	for _, ds := range dockSchedules {
		store.DockScheduleIDs = append(store.DockScheduleIDs, ds.ScheduleId)
	}
	fmt.Printf(" %d created\n", len(dockSchedules))

	return nil
}
