# Plan: SCM Inventory Quantity Tracking

## Context
Phase B item 5 from MISSING-FEATURES.md. Currently, SCM has the data model for inventory tracking (ScmStockMovement, ScmBin.currentQuantity) but no runtime logic that updates quantities when goods are received or issued. The mock data generator creates static records, but real operations (completing a ReceivingOrder, completing PickTasks in a WavePlan) don't affect inventory.

## What This Implements
When a **ReceivingOrder** is completed, for each PutawayTask:
- Append a RECEIPT `ScmStockMovement` to the `ScmItem.Movements`
- Increment the destination bin's `CurrentQuantity` on the `ScmWarehouse`

When a **WavePlan** is completed (all picks done), for each completed PickTask:
- Append an ISSUE `ScmStockMovement` to the `ScmItem.Movements`
- Decrement the source bin's `CurrentQuantity` on the `ScmWarehouse`

## Scope — 2 files modified

### File 1: `go/erp/scm/receivingorders/ReceivingOrderServiceCallback.go`

**Add After() hook**: `updateInventoryOnReceipt`
- Chain `.After(updateInventoryOnReceipt)` alongside existing `.After(cascadeCreatePurchaseInvoice)`
- Guard: only run when `recv.Status == TASK_STATUS_COMPLETED`
- For each `PutawayTask` in `recv.PutawayTasks` where `task.Status == COMPLETED`:
  1. Fetch the ScmItem via `common.GetEntity("Item", 50, &scm.ScmItem{ItemId: task.ItemId}, vnic)`
  2. Create a `ScmStockMovement{MovementType: RECEIPT, Quantity: task.Quantity, WarehouseId: recv.WarehouseId, BinId: task.ToBinId, ReferenceId: recv.ReceivingOrderId, ReferenceType: "ReceivingOrder", MovementDate: now, UnitOfMeasure: item.UnitOfMeasure}`
  3. Append movement to `item.Movements`, call `common.PutEntity("Item", 50, item, vnic)`
  4. Fetch the ScmWarehouse via `common.GetEntity("Warehouse", 50, &scm.ScmWarehouse{WarehouseId: recv.WarehouseId}, vnic)`
  5. Find the bin by `task.ToBinId`, increment `bin.CurrentQuantity += task.Quantity`
  6. Call `common.PutEntity("Warehouse", 50, warehouse, vnic)`

**Helper**: `findBin(warehouse *scm.ScmWarehouse, binId string) *scm.ScmBin` — finds bin by ID in warehouse.Bins slice

### File 2: `go/erp/scm/waveplans/WavePlanServiceCallback.go`

**Add After() hook**: `updateInventoryOnPick`
- Chain `.After(updateInventoryOnPick)` on existing validation builder
- Guard: only run when `wp.Status == TASK_STATUS_COMPLETED`
- For each `PickTask` in `wp.PickTasks` where `task.Status == COMPLETED`:
  1. Fetch the ScmItem via `common.GetEntity("Item", 50, &scm.ScmItem{ItemId: task.ItemId}, vnic)`
  2. Create a `ScmStockMovement{MovementType: ISSUE, Quantity: task.Quantity, WarehouseId: wp.WarehouseId, BinId: task.FromBinId, ReferenceId: wp.WavePlanId, ReferenceType: "WavePlan", MovementDate: now, UnitOfMeasure: item.UnitOfMeasure}`
  3. Append movement to `item.Movements`, call `common.PutEntity("Item", 50, item, vnic)`
  4. Fetch the ScmWarehouse via `common.GetEntity("Warehouse", 50, &scm.ScmWarehouse{WarehouseId: wp.WarehouseId}, vnic)`
  5. Find the bin by `task.FromBinId`, decrement `bin.CurrentQuantity -= task.Quantity`
  6. Call `common.PutEntity("Warehouse", 50, warehouse, vnic)`

## Key References
- Service names: `"Item"` (area 50), `"Warehouse"` (area 50)
- Movement types: `scm.ScmMovementType_MOVEMENT_TYPE_RECEIPT`, `scm.ScmMovementType_MOVEMENT_TYPE_ISSUE`
- Task status: `scm.ScmTaskStatus_TASK_STATUS_COMPLETED`
- Existing pattern: `cascadeCreatePurchaseInvoice` in ReceivingOrderServiceCallback.go
- Helpers: `common.GetEntity`, `common.PutEntity`, `common.GenerateID`

## Verification
1. `go build ./erp/scm/receivingorders/` — compile check
2. `go build ./erp/scm/waveplans/` — compile check
3. `go vet ./erp/scm/...` — static analysis
4. Run mock data upload — verify no errors from inventory tracking hooks
