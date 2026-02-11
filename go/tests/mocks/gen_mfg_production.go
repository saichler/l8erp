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

	"github.com/saichler/l8erp/go/types/mfg"
)

// generateEngChangeOrders creates engineering change order records with embedded details
func generateEngChangeOrders(store *MockDataStore) []*mfg.MfgEngChangeOrder {
	changeTypes := []mfg.MfgChangeType{
		mfg.MfgChangeType_MFG_CHANGE_TYPE_BOM,
		mfg.MfgChangeType_MFG_CHANGE_TYPE_ROUTING,
		mfg.MfgChangeType_MFG_CHANGE_TYPE_ITEM,
		mfg.MfgChangeType_MFG_CHANGE_TYPE_PROCESS,
	}

	ecos := make([]*mfg.MfgEngChangeOrder, 10)
	detailIdx := 1
	for i := 0; i < 10; i++ {
		requestedBy := pickRef(store.EmployeeIDs, i)
		requestDate := time.Now().AddDate(0, -rand.Intn(3), -rand.Intn(30))
		requiredDate := requestDate.AddDate(0, 1, rand.Intn(30))

		// Status distribution: 30% Draft, 30% Submitted, 20% Approved, 20% Implemented
		var status mfg.MfgChangeOrderStatus
		if i < 3 {
			status = mfg.MfgChangeOrderStatus_MFG_CHANGE_ORDER_STATUS_DRAFT
		} else if i < 6 {
			status = mfg.MfgChangeOrderStatus_MFG_CHANGE_ORDER_STATUS_SUBMITTED
		} else if i < 8 {
			status = mfg.MfgChangeOrderStatus_MFG_CHANGE_ORDER_STATUS_APPROVED
		} else {
			status = mfg.MfgChangeOrderStatus_MFG_CHANGE_ORDER_STATUS_IMPLEMENTED
		}

		estCost := int64(rand.Intn(50000) + 5000)
		actCost := int64(0)
		if status == mfg.MfgChangeOrderStatus_MFG_CHANGE_ORDER_STATUS_IMPLEMENTED {
			actCost = int64(float64(estCost) * (0.9 + rand.Float64()*0.2))
		}

		ecoID := genID("eco", i)

		// Generate 2 embedded details per ECO
		details := make([]*mfg.MfgEngChangeDetail, 2)
		for j := 0; j < 2; j++ {
			changeType := changeTypes[(i*2+j)%len(changeTypes)]
			affectedID := ""
			switch changeType {
			case mfg.MfgChangeType_MFG_CHANGE_TYPE_BOM:
				if len(store.MfgBomIDs) > 0 {
					affectedID = store.MfgBomIDs[(i+j)%len(store.MfgBomIDs)]
				}
			case mfg.MfgChangeType_MFG_CHANGE_TYPE_ROUTING:
				if len(store.MfgRoutingIDs) > 0 {
					affectedID = store.MfgRoutingIDs[(i+j)%len(store.MfgRoutingIDs)]
				}
			default:
				if len(store.ItemIDs) > 0 {
					affectedID = store.ItemIDs[(i*2+j)%len(store.ItemIDs)]
				}
			}

			details[j] = &mfg.MfgEngChangeDetail{
				DetailId:      fmt.Sprintf("ecodtl-%03d", detailIdx),
				ChangeOrderId: ecoID,
				ChangeType:    changeType,
				AffectedId:    affectedID,
				Description:   fmt.Sprintf("Change detail %d for ECO", detailIdx),
				OldValue:      fmt.Sprintf("Old specification %d", detailIdx),
				NewValue:      fmt.Sprintf("New specification %d", detailIdx),
				OldRevision:   fmt.Sprintf("R%d", rand.Intn(3)+1),
				NewRevision:   fmt.Sprintf("R%d", rand.Intn(3)+2),
				Notes:         fmt.Sprintf("ECO detail notes %d", detailIdx),
				AuditInfo:     createAuditInfo(),
			}
			detailIdx++
		}

		ecos[i] = &mfg.MfgEngChangeOrder{
			ChangeOrderId: ecoID,
			EcoNumber:     fmt.Sprintf("ECO-%05d", 20000+i+1),
			Title:         fmt.Sprintf("Engineering Change %d", i+1),
			Description:   fmt.Sprintf("Engineering change order for process improvement #%d", i+1),
			Status:        status,
			RequestedBy:   requestedBy,
			RequestDate:   requestDate.Unix(),
			RequiredDate:  requiredDate.Unix(),
			Priority:      int32(rand.Intn(5) + 1),
			Reason:        fmt.Sprintf("Improve quality and reduce costs for product line %d", i+1),
			EstimatedCost: money(store, estCost),
			ActualCost:    money(store, actCost),
			Notes:         fmt.Sprintf("ECO notes for change order %d", i+1),
			AuditInfo:     createAuditInfo(),
			Details:       details,
		}
	}
	return ecos
}

// generateProductionOrders creates production order records with embedded lines
func generateProductionOrders(store *MockDataStore) []*mfg.MfgProductionOrder {
	count := 15
	lineIdx := 1
	orders := make([]*mfg.MfgProductionOrder, count)

	for i := 0; i < count; i++ {
		customerID := pickRef(store.CustomerIDs, i)
		salesOrderID := ""
		if len(store.SalesOrderIDs) > 0 && i < 5 {
			salesOrderID = store.SalesOrderIDs[i%len(store.SalesOrderIDs)]
		}
		plannerID := pickRef(store.EmployeeIDs, i)

		orderDate := time.Now().AddDate(0, 0, -rand.Intn(30))
		requiredDate := orderDate.AddDate(0, 0, rand.Intn(30)+14)

		// Status distribution: 30% Planned, 30% Confirmed, 20% In Progress, 20% Completed
		var status mfg.MfgProductionOrderStatus
		if i < count*3/10 {
			status = mfg.MfgProductionOrderStatus_MFG_PROD_ORDER_STATUS_PLANNED
		} else if i < count*6/10 {
			status = mfg.MfgProductionOrderStatus_MFG_PROD_ORDER_STATUS_CONFIRMED
		} else if i < count*8/10 {
			status = mfg.MfgProductionOrderStatus_MFG_PROD_ORDER_STATUS_IN_PROGRESS
		} else {
			status = mfg.MfgProductionOrderStatus_MFG_PROD_ORDER_STATUS_COMPLETED
		}

		estCost := int64(rand.Intn(100000) + 20000)
		actCost := int64(0)
		if status >= mfg.MfgProductionOrderStatus_MFG_PROD_ORDER_STATUS_IN_PROGRESS {
			actCost = int64(float64(estCost) * (0.9 + rand.Float64()*0.2))
		}

		prodOrderID := genID("pord", i)

		// Generate 2 embedded lines per order
		lines := make([]*mfg.MfgProdOrderLine, 2)
		for j := 0; j < 2; j++ {
			itemID := pickRef(store.ItemIDs, (i*2 + j))
			warehouseID := pickRef(store.SCMWarehouseIDs, (i + j))
			woID := pickRef(store.MfgWorkOrderIDs, (i*2 + j))

			qtyOrdered := float64(rand.Intn(100) + 10)
			qtyCompleted := qtyOrdered * float64(rand.Intn(80)) / 100.0
			reqDate := time.Now().AddDate(0, 0, rand.Intn(30)+7)
			promisedDate := reqDate.AddDate(0, 0, rand.Intn(5))

			lines[j] = &mfg.MfgProdOrderLine{
				LineId:            fmt.Sprintf("poln-%03d", lineIdx),
				ProdOrderId:       prodOrderID,
				LineNumber:        int32((j + 1) * 10),
				ItemId:            itemID,
				WorkOrderId:       woID,
				QuantityOrdered:   qtyOrdered,
				QuantityCompleted: qtyCompleted,
				RequiredDate:      reqDate.Unix(),
				PromisedDate:      promisedDate.Unix(),
				WarehouseId:       warehouseID,
				Notes:             fmt.Sprintf("Production order line %d", lineIdx),
				AuditInfo:         createAuditInfo(),
			}
			lineIdx++
		}

		orders[i] = &mfg.MfgProductionOrder{
			ProdOrderId:        prodOrderID,
			OrderNumber:        fmt.Sprintf("PO-%06d", 200000+i+1),
			CustomerId:         customerID,
			SalesOrderId:       salesOrderID,
			OrderDate:          orderDate.Unix(),
			RequiredDate:       requiredDate.Unix(),
			Status:             status,
			Priority:           int32(rand.Intn(5) + 1),
			PlannerId:          plannerID,
			TotalEstimatedCost: money(store, estCost),
			TotalActualCost:    money(store, actCost),
			Notes:              fmt.Sprintf("Production order for batch manufacturing %d", i+1),
			AuditInfo:          createAuditInfo(),
			Lines:              lines,
		}
	}
	return orders
}
