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
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/scm"
)

// generateReceivingOrders creates 15 receiving order records for warehouse operations
func generateReceivingOrders(store *MockDataStore) []*scm.ScmReceivingOrder {
	orders := make([]*scm.ScmReceivingOrder, 15)

	for i := 0; i < 15; i++ {
		receivingDate := time.Date(2025, time.Month((i%12)+1), (i%28)+1, 8, 0, 0, 0, time.UTC)

		// Status: COMPLETED (60%), IN_PROGRESS (30%), PENDING (10%)
		var status scm.ScmTaskStatus
		switch {
		case i < 9:
			status = scm.ScmTaskStatus_TASK_STATUS_COMPLETED
		case i < 13:
			status = scm.ScmTaskStatus_TASK_STATUS_IN_PROGRESS
		default:
			status = scm.ScmTaskStatus_TASK_STATUS_PENDING
		}

		poID := pickRef(store.SCMPurchaseOrderIDs, i)

		whID := pickRef(store.SCMWarehouseIDs, i)

		receivedBy := "mock-generator"
		if len(store.EmployeeIDs) > 0 {
			receivedBy = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		orders[i] = &scm.ScmReceivingOrder{
			ReceivingOrderId: genID("ro", i),
			PurchaseOrderId:  poID,
			WarehouseId:      whID,
			ReceivingDate:    receivingDate.Unix(),
			Status:           status,
			ReceivedBy:       receivedBy,
			Notes:            fmt.Sprintf("Receiving order %d for PO goods", i+1),
			AuditInfo:        createAuditInfo(),
		}
	}

	return orders
}

// generatePutawayTasks creates 1 putaway task per receiving order (15 total)
func generatePutawayTasks(store *MockDataStore) []*scm.ScmPutawayTask {
	count := len(store.ReceivingOrderIDs)
	if count == 0 {
		count = 15
	}
	tasks := make([]*scm.ScmPutawayTask, count)

	for i := 0; i < count; i++ {
		receivingOrderID := pickRef(store.ReceivingOrderIDs, i)

		fromBinID := ""
		toBinID := ""
		if len(store.BinIDs) > 0 {
			fromBinID = store.BinIDs[i%len(store.BinIDs)]
			toBinID = store.BinIDs[(i+1)%len(store.BinIDs)]
		}

		itemID := pickRef(store.ItemIDs, i)

		assignedTo := "mock-generator"
		if len(store.EmployeeIDs) > 0 {
			assignedTo = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		// Status: COMPLETED (80%), IN_PROGRESS (20%)
		status := scm.ScmTaskStatus_TASK_STATUS_COMPLETED
		if i >= 12 {
			status = scm.ScmTaskStatus_TASK_STATUS_IN_PROGRESS
		}

		task := &scm.ScmPutawayTask{
			TaskId:           genID("put", i),
			ReceivingOrderId: receivingOrderID,
			ItemId:           itemID,
			FromBinId:        fromBinID,
			ToBinId:          toBinID,
			Quantity:         float64(rand.Intn(100) + 10),
			Status:           status,
			AssignedTo:       assignedTo,
			AuditInfo:        createAuditInfo(),
		}

		if status == scm.ScmTaskStatus_TASK_STATUS_COMPLETED {
			completedDate := time.Date(2025, time.Month((i%12)+1), (i%28)+2, 14, 0, 0, 0, time.UTC)
			task.CompletedAt = completedDate.Unix()
		}

		tasks[i] = task
	}

	return tasks
}

// generatePickTasks creates 20 pick tasks for warehouse operations
func generatePickTasks(store *MockDataStore) []*scm.ScmPickTask {
	tasks := make([]*scm.ScmPickTask, 20)
	priorities := []string{"High", "Medium", "Low"}

	for i := 0; i < 20; i++ {
		wavePlanID := pickRef(store.WavePlanIDs, i)

		fromBinID := pickRef(store.BinIDs, i)

		itemID := pickRef(store.ItemIDs, i)

		assignedTo := "mock-generator"
		if len(store.EmployeeIDs) > 0 {
			assignedTo = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		// Status: COMPLETED (60%), IN_PROGRESS (25%), PENDING (15%)
		var status scm.ScmTaskStatus
		switch {
		case i < 12:
			status = scm.ScmTaskStatus_TASK_STATUS_COMPLETED
		case i < 17:
			status = scm.ScmTaskStatus_TASK_STATUS_IN_PROGRESS
		default:
			status = scm.ScmTaskStatus_TASK_STATUS_PENDING
		}

		task := &scm.ScmPickTask{
			TaskId:         genID("pick", i),
			WavePlanId:     wavePlanID,
			ItemId:         itemID,
			FromBinId:      fromBinID,
			Quantity:       float64(rand.Intn(50) + 1),
			Status:         status,
			AssignedTo:     assignedTo,
			OrderReference: fmt.Sprintf("SO-%06d-%s", i+1, priorities[i%len(priorities)]),
			AuditInfo:      createAuditInfo(),
		}

		if status == scm.ScmTaskStatus_TASK_STATUS_COMPLETED {
			completedDate := time.Date(2025, time.Month((i%12)+1), (i%28)+1, 16, 0, 0, 0, time.UTC)
			task.CompletedAt = completedDate.Unix()
		}

		tasks[i] = task
	}

	return tasks
}

// generatePackTasks creates 15 pack tasks linked to the first 15 pick tasks
func generatePackTasks(store *MockDataStore) []*scm.ScmPackTask {
	tasks := make([]*scm.ScmPackTask, 15)

	for i := 0; i < 15; i++ {
		pickTaskID := pickRef(store.PickTaskIDs, i)

		itemID := pickRef(store.ItemIDs, i)

		assignedTo := "mock-generator"
		if len(store.EmployeeIDs) > 0 {
			assignedTo = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		// Status: COMPLETED (70%), IN_PROGRESS (20%), PENDING (10%)
		var status scm.ScmTaskStatus
		switch {
		case i < 10:
			status = scm.ScmTaskStatus_TASK_STATUS_COMPLETED
		case i < 13:
			status = scm.ScmTaskStatus_TASK_STATUS_IN_PROGRESS
		default:
			status = scm.ScmTaskStatus_TASK_STATUS_PENDING
		}

		task := &scm.ScmPackTask{
			TaskId:     genID("pack", i),
			PickTaskId: pickTaskID,
			ItemId:     itemID,
			Quantity:   float64(rand.Intn(50) + 1),
			PackageId:  fmt.Sprintf("PKG-%06d", i+1),
			Status:     status,
			AssignedTo: assignedTo,
			AuditInfo:  createAuditInfo(),
		}

		if status == scm.ScmTaskStatus_TASK_STATUS_COMPLETED {
			packedDate := time.Date(2025, time.Month((i%12)+1), (i%28)+2, 10, 0, 0, 0, time.UTC)
			task.CompletedAt = packedDate.Unix()
		}

		tasks[i] = task
	}

	return tasks
}

// generateShipTasks creates 12 ship tasks for warehouse shipping operations
func generateShipTasks(store *MockDataStore) []*scm.ScmShipTask {
	tasks := make([]*scm.ScmShipTask, 12)

	for i := 0; i < 12; i++ {
		packTaskID := pickRef(store.PackTaskIDs, i)

		carrierID := pickRef(store.SCMCarrierIDs, i)

		// Status: COMPLETED (60%), IN_PROGRESS (25%), PENDING (15%)
		var status scm.ScmTaskStatus
		switch {
		case i < 7:
			status = scm.ScmTaskStatus_TASK_STATUS_COMPLETED
		case i < 10:
			status = scm.ScmTaskStatus_TASK_STATUS_IN_PROGRESS
		default:
			status = scm.ScmTaskStatus_TASK_STATUS_PENDING
		}

		task := &scm.ScmShipTask{
			TaskId:         genID("ship", i),
			PackTaskId:     packTaskID,
			ShipmentId:     genID("shp", i),
			CarrierId:      carrierID,
			TrackingNumber: fmt.Sprintf("TRK-%010d", rand.Intn(9000000000)+1000000000),
			Status:         status,
			AuditInfo:      createAuditInfo(),
		}

		if status == scm.ScmTaskStatus_TASK_STATUS_COMPLETED {
			shippedDate := time.Date(2025, time.Month((i%12)+1), (i%28)+3, 12, 0, 0, 0, time.UTC)
			task.ShippedAt = shippedDate.Unix()
		}

		tasks[i] = task
	}

	return tasks
}

// generateWavePlans creates 5 wave plan records for order fulfillment batching
func generateWavePlans(store *MockDataStore) []*scm.ScmWavePlan {
	plans := make([]*scm.ScmWavePlan, 5)

	for i := 0; i < 5; i++ {
		whID := pickRef(store.SCMWarehouseIDs, i)

		assignedTo := "mock-generator"
		if len(store.EmployeeIDs) > 0 {
			assignedTo = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}

		planDate := time.Date(2025, time.Month((i*2)+1), 15, 6, 0, 0, 0, time.UTC)

		// Status: COMPLETED (60%), IN_PROGRESS (40%)
		status := scm.ScmTaskStatus_TASK_STATUS_COMPLETED
		if i >= 3 {
			status = scm.ScmTaskStatus_TASK_STATUS_IN_PROGRESS
		}

		totalOrders := int32(rand.Intn(21) + 5) // 5-25
		totalItems := totalOrders * int32(rand.Intn(4)+2)

		plans[i] = &scm.ScmWavePlan{
			WavePlanId:  genID("wave", i),
			WarehouseId: whID,
			PlanDate:    planDate.Unix(),
			Status:      status,
			TotalOrders: totalOrders,
			TotalItems:  totalItems,
			AssignedTo:  assignedTo,
			Notes:       fmt.Sprintf("Wave plan %d for batch fulfillment", i+1),
			AuditInfo:   createAuditInfo(),
		}
	}

	return plans
}

// generateDockSchedules creates 10 dock schedule records for shipping/receiving appointments
func generateDockSchedules(store *MockDataStore) []*scm.ScmDockSchedule {
	schedules := make([]*scm.ScmDockSchedule, 10)
	dockNumbers := []string{"D1", "D2", "D3", "D4", "D5"}
	directions := []string{"Inbound", "Outbound"}

	for i := 0; i < 10; i++ {
		whID := pickRef(store.SCMWarehouseIDs, i)

		carrierID := pickRef(store.SCMCarrierIDs, i)

		scheduleDate := time.Date(2025, time.Month((i%12)+1), (i%28)+1, 0, 0, 0, 0, time.UTC)
		startTime := scheduleDate.Add(time.Duration(8+i%4) * time.Hour)
		endTime := startTime.Add(2 * time.Hour)

		direction := directions[i%len(directions)]

		shipmentID := genID("shp", i)

		// Status: COMPLETED (50%), IN_PROGRESS (30%), PENDING (20%)
		var status scm.ScmTaskStatus
		switch {
		case i < 5:
			status = scm.ScmTaskStatus_TASK_STATUS_COMPLETED
		case i < 8:
			status = scm.ScmTaskStatus_TASK_STATUS_IN_PROGRESS
		default:
			status = scm.ScmTaskStatus_TASK_STATUS_PENDING
		}

		schedules[i] = &scm.ScmDockSchedule{
			ScheduleId:   genID("dock", i),
			WarehouseId:  whID,
			DockNumber:   dockNumbers[i%len(dockNumbers)],
			ScheduleDate: scheduleDate.Unix(),
			StartTime:    startTime.Unix(),
			EndTime:      endTime.Unix(),
			CarrierId:    carrierID,
			ShipmentId:   shipmentID,
			Direction:    direction,
			Status:       status,
			Notes:        fmt.Sprintf("Dock %s schedule for %s delivery", dockNumbers[i%len(dockNumbers)], direction),
			AuditInfo:    createAuditInfo(),
		}
	}

	return schedules
}
