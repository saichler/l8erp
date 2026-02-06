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
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8erp/go/types/erp"
)

// generateTechnicians creates technician records
func generateTechnicians(store *MockDataStore) []*crm.CrmTechnician {
	statuses := []crm.CrmTechnicianStatus{
		crm.CrmTechnicianStatus_CRM_TECHNICIAN_STATUS_AVAILABLE,
		crm.CrmTechnicianStatus_CRM_TECHNICIAN_STATUS_BUSY,
		crm.CrmTechnicianStatus_CRM_TECHNICIAN_STATUS_ON_LEAVE,
	}

	count := 15
	technicians := make([]*crm.CrmTechnician, count)
	for i := 0; i < count; i++ {
		employeeID := pickRef(store.EmployeeIDs, i)

		firstName := firstNames[i%len(firstNames)]
		lastName := lastNames[i%len(lastNames)]

		// Status distribution: 70% available, 20% busy, 10% on leave
		var status crm.CrmTechnicianStatus
		if i < count*7/10 {
			status = statuses[0]
		} else if i < count*9/10 {
			status = statuses[1]
		} else {
			status = statuses[2]
		}

		// Build skills list
		numSkills := rand.Intn(4) + 2
		skills := make([]string, numSkills)
		for j := 0; j < numSkills; j++ {
			skills[j] = crmTechnicianSkills[(i+j)%len(crmTechnicianSkills)]
		}

		technicians[i] = &crm.CrmTechnician{
			TechnicianId: genID("tech", i),
			EmployeeId:   employeeID,
			Name:         fmt.Sprintf("%s %s", firstName, lastName),
			Email:        fmt.Sprintf("%s.%s@company.com", firstName, lastName),
			Phone:        fmt.Sprintf("555-%03d-%04d", rand.Intn(1000), rand.Intn(10000)),
			Status:       status,
			Skills:       skills,
			Territory:    crmTerritories[i%len(crmTerritories)],
			HomeLocation: &erp.Address{
				Line1:         fmt.Sprintf("%d %s", rand.Intn(9999)+1, streetNames[i%len(streetNames)]),
				City:          cities[i%len(cities)],
				StateProvince: states[i%len(states)],
				PostalCode:    fmt.Sprintf("%05d", rand.Intn(100000)),
				CountryCode:   "US",
			},
			HourlyRate:     float64(rand.Intn(50) + 50),
			OvertimeRate:   float64(rand.Intn(30) + 75),
			MaxDailyOrders: int32(rand.Intn(5) + 3),
			IsActive:       status != crm.CrmTechnicianStatus_CRM_TECHNICIAN_STATUS_INACTIVE,
			AuditInfo:      createAuditInfo(),
		}
	}
	return technicians
}

// generateServiceContracts creates service contract records
func generateServiceContracts(store *MockDataStore) []*crm.CrmServiceContract {
	types := []crm.CrmContractType{
		crm.CrmContractType_CRM_CONTRACT_TYPE_WARRANTY,
		crm.CrmContractType_CRM_CONTRACT_TYPE_MAINTENANCE,
		crm.CrmContractType_CRM_CONTRACT_TYPE_SUPPORT,
		crm.CrmContractType_CRM_CONTRACT_TYPE_FULL_SERVICE,
	}
	statuses := []crm.CrmContractStatus{
		crm.CrmContractStatus_CRM_CONTRACT_STATUS_ACTIVE,
		crm.CrmContractStatus_CRM_CONTRACT_STATUS_DRAFT,
		crm.CrmContractStatus_CRM_CONTRACT_STATUS_EXPIRED,
	}
	billingFreqs := []string{"Monthly", "Quarterly", "Annually"}

	count := 25
	contracts := make([]*crm.CrmServiceContract, count)
	for i := 0; i < count; i++ {
		accountID := pickRef(store.CrmAccountIDs, i)
		slaID := pickRef(store.CrmSLAIDs, i)
		ownerID := pickRef(store.EmployeeIDs, i)

		// Status distribution: 70% active, 20% draft, 10% expired
		var status crm.CrmContractStatus
		if i < count*7/10 {
			status = statuses[0]
		} else if i < count*9/10 {
			status = statuses[1]
		} else {
			status = statuses[2]
		}

		includedHours := int32(rand.Intn(100) + 20)
		includedVisits := int32(rand.Intn(12) + 4)

		contracts[i] = &crm.CrmServiceContract{
			ContractId:        genID("svccontr", i),
			ContractNumber:    fmt.Sprintf("SC-%05d", 10000+i+1),
			AccountId:         accountID,
			ContractType:      types[i%len(types)],
			Status:            status,
			StartDate:         time.Now().AddDate(-1, 0, 0).Unix(),
			EndDate:           time.Now().AddDate(1, 0, 0).Unix(),
			ContractValue:     randomMoney(5000, 50000),
			IncludedHours:     includedHours,
			UsedHours:         int32(float64(includedHours) * (float64(rand.Intn(80)) / 100)),
			IncludedVisits:    includedVisits,
			UsedVisits:        int32(float64(includedVisits) * (float64(rand.Intn(80)) / 100)),
			SlaId:             slaID,
			BillingFrequency:  billingFreqs[i%len(billingFreqs)],
			Terms:             crmContractTerms[i%len(crmContractTerms)],
			OwnerId:           ownerID,
			AutoRenew:         i%2 == 0,
			RenewalNoticeDays: int32(30 + (i%3)*15),
			AuditInfo:         createAuditInfo(),
		}
	}
	return contracts
}

// generateServiceOrders creates field service order records
func generateServiceOrders(store *MockDataStore) []*crm.CrmServiceOrder {
	types := []crm.CrmServiceOrderType{
		crm.CrmServiceOrderType_CRM_SERVICE_ORDER_TYPE_REPAIR,
		crm.CrmServiceOrderType_CRM_SERVICE_ORDER_TYPE_MAINTENANCE,
		crm.CrmServiceOrderType_CRM_SERVICE_ORDER_TYPE_INSTALL,
		crm.CrmServiceOrderType_CRM_SERVICE_ORDER_TYPE_INSPECTION,
	}
	statuses := []crm.CrmServiceOrderStatus{
		crm.CrmServiceOrderStatus_CRM_SERVICE_ORDER_STATUS_NEW,
		crm.CrmServiceOrderStatus_CRM_SERVICE_ORDER_STATUS_SCHEDULED,
		crm.CrmServiceOrderStatus_CRM_SERVICE_ORDER_STATUS_IN_PROGRESS,
		crm.CrmServiceOrderStatus_CRM_SERVICE_ORDER_STATUS_COMPLETED,
	}
	priorities := []crm.CrmServiceOrderPriority{
		crm.CrmServiceOrderPriority_CRM_SERVICE_ORDER_PRIORITY_LOW,
		crm.CrmServiceOrderPriority_CRM_SERVICE_ORDER_PRIORITY_NORMAL,
		crm.CrmServiceOrderPriority_CRM_SERVICE_ORDER_PRIORITY_HIGH,
		crm.CrmServiceOrderPriority_CRM_SERVICE_ORDER_PRIORITY_EMERGENCY,
	}

	count := 40
	orders := make([]*crm.CrmServiceOrder, count)
	for i := 0; i < count; i++ {
		accountID := pickRef(store.CrmAccountIDs, i)
		contactID := pickRef(store.CrmContactIDs, i)
		caseID := ""
		if len(store.CrmCaseIDs) > 0 && i%3 == 0 {
			caseID = store.CrmCaseIDs[i%len(store.CrmCaseIDs)]
		}
		contractID := pickRef(store.CrmServiceContractIDs, i)
		technicianID := pickRef(store.CrmTechnicianIDs, i)
		ownerID := pickRef(store.EmployeeIDs, i)

		// Status distribution: 10% new, 30% scheduled, 30% in progress, 30% completed
		var status crm.CrmServiceOrderStatus
		if i < count*1/10 {
			status = statuses[0]
		} else if i < count*4/10 {
			status = statuses[1]
		} else if i < count*7/10 {
			status = statuses[2]
		} else {
			status = statuses[3]
		}

		scheduledStart := time.Now().AddDate(0, 0, rand.Intn(14)-7)
		scheduledEnd := scheduledStart.Add(time.Duration(rand.Intn(4)+1) * time.Hour)
		var actualStart, actualEnd int64
		if status == crm.CrmServiceOrderStatus_CRM_SERVICE_ORDER_STATUS_COMPLETED || status == crm.CrmServiceOrderStatus_CRM_SERVICE_ORDER_STATUS_IN_PROGRESS {
			actualStart = scheduledStart.Unix()
			if status == crm.CrmServiceOrderStatus_CRM_SERVICE_ORDER_STATUS_COMPLETED {
				actualEnd = scheduledEnd.Unix()
			}
		}

		estimatedCost := int64(rand.Intn(5000) + 500)
		var actualCost int64
		if status == crm.CrmServiceOrderStatus_CRM_SERVICE_ORDER_STATUS_COMPLETED {
			actualCost = int64(float64(estimatedCost) * (float64(rand.Intn(40)+80) / 100))
		}

		orders[i] = &crm.CrmServiceOrder{
			OrderId:     genID("svcord", i),
			OrderNumber: fmt.Sprintf("SO-%05d", 10000+i+1),
			OrderType:   types[i%len(types)],
			Status:      status,
			Priority:    priorities[i%len(priorities)],
			AccountId:   accountID,
			ContactId:   contactID,
			CaseId:      caseID,
			ContractId:  contractID,
			Description: fmt.Sprintf("Service order %d - %s", i+1, types[i%len(types)].String()),
			ServiceAddress: &erp.Address{
				Line1:         fmt.Sprintf("%d %s", rand.Intn(9999)+1, streetNames[i%len(streetNames)]),
				City:          cities[i%len(cities)],
				StateProvince: states[i%len(states)],
				PostalCode:    fmt.Sprintf("%05d", rand.Intn(100000)),
				CountryCode:   "US",
			},
			ScheduledStart: scheduledStart.Unix(),
			ScheduledEnd:   scheduledEnd.Unix(),
			ActualStart:    actualStart,
			ActualEnd:      actualEnd,
			TechnicianId:   technicianID,
			SerialNumber:   fmt.Sprintf("SN-%08d", rand.Intn(100000000)),
			EstimatedCost:  money(estimatedCost),
			ActualCost:     money(actualCost),
			Resolution:     "Service completed successfully",
			OwnerId:        ownerID,
			AuditInfo:      createAuditInfo(),
		}
	}
	return orders
}

// generateServiceSchedules creates technician schedule records
func generateServiceSchedules(store *MockDataStore) []*crm.CrmServiceSchedule {
	scheduleTypes := []string{"Work", "Training", "Meeting", "Break", "Travel"}

	schedules := make([]*crm.CrmServiceSchedule, 0, len(store.CrmTechnicianIDs)*5)
	idx := 1
	for _, techID := range store.CrmTechnicianIDs {
		for j := 0; j < 5; j++ {
			schedDate := time.Now().AddDate(0, 0, j)
			startTime := schedDate.Add(time.Duration(8+rand.Intn(2)) * time.Hour)
			endTime := startTime.Add(time.Duration(rand.Intn(4)+4) * time.Hour)

			serviceOrderID := ""
			if len(store.CrmServiceOrderIDs) > 0 && j%2 == 0 {
				serviceOrderID = store.CrmServiceOrderIDs[(idx-1)%len(store.CrmServiceOrderIDs)]
			}

			schedules = append(schedules, &crm.CrmServiceSchedule{
				ScheduleId:     fmt.Sprintf("svcschd-%03d", idx),
				TechnicianId:   techID,
				ScheduleDate:   schedDate.Unix(),
				StartTime:      startTime.Unix(),
				EndTime:        endTime.Unix(),
				ScheduleType:   scheduleTypes[j%len(scheduleTypes)],
				IsAvailable:    j%3 != 0,
				ServiceOrderId: serviceOrderID,
				Notes:          fmt.Sprintf("Schedule entry %d", idx),
				AuditInfo:      createAuditInfo(),
			})
			idx++
		}
	}
	return schedules
}

// generateServiceParts creates service part records
func generateServiceParts(store *MockDataStore) []*crm.CrmServicePart {
	parts := make([]*crm.CrmServicePart, 0, len(store.CrmServiceOrderIDs)*2)
	idx := 1
	for _, orderID := range store.CrmServiceOrderIDs {
		numParts := rand.Intn(3) + 1
		for j := 0; j < numParts; j++ {
			itemID := ""
			itemName := itemNames[(idx-1)%len(itemNames)]
			if len(store.ItemIDs) > 0 {
				itemID = store.ItemIDs[(idx-1)%len(store.ItemIDs)]
			}
			warehouseID := pickRef(store.SCMWarehouseIDs, (idx-1))

			quantity := float64(rand.Intn(5) + 1)
			unitCost := int64(rand.Intn(500) + 50)
			totalCost := int64(float64(unitCost) * quantity)

			parts = append(parts, &crm.CrmServicePart{
				PartId:         fmt.Sprintf("svcpart-%03d", idx),
				ServiceOrderId: orderID,
				ItemId:         itemID,
				ItemName:       itemName,
				Quantity:       quantity,
				UnitCost:       money(unitCost),
				TotalCost:      money(totalCost),
				SerialNumber:   fmt.Sprintf("PN-%08d", rand.Intn(100000000)),
				IsWarranty:     idx%5 == 0,
				WarehouseId:    warehouseID,
				Notes:          fmt.Sprintf("Part %d for service order", j+1),
				AuditInfo:      createAuditInfo(),
			})
			idx++
		}
	}
	return parts
}

// generateServiceVisits creates field service visit records
func generateServiceVisits(store *MockDataStore) []*crm.CrmServiceVisit {
	statuses := []crm.CrmVisitStatus{
		crm.CrmVisitStatus_CRM_VISIT_STATUS_SCHEDULED,
		crm.CrmVisitStatus_CRM_VISIT_STATUS_EN_ROUTE,
		crm.CrmVisitStatus_CRM_VISIT_STATUS_ON_SITE,
		crm.CrmVisitStatus_CRM_VISIT_STATUS_COMPLETED,
	}

	visits := make([]*crm.CrmServiceVisit, 0, len(store.CrmServiceOrderIDs))
	idx := 1
	for _, orderID := range store.CrmServiceOrderIDs {
		technicianID := pickRef(store.CrmTechnicianIDs, (idx-1))

		// Status distribution: 10% scheduled, 10% en route, 20% on site, 60% completed
		var status crm.CrmVisitStatus
		if idx <= len(store.CrmServiceOrderIDs)*1/10 {
			status = statuses[0]
		} else if idx <= len(store.CrmServiceOrderIDs)*2/10 {
			status = statuses[1]
		} else if idx <= len(store.CrmServiceOrderIDs)*4/10 {
			status = statuses[2]
		} else {
			status = statuses[3]
		}

		scheduledArrival := time.Now().AddDate(0, 0, -rand.Intn(7))
		var actualArrival, departureTime int64
		if status != crm.CrmVisitStatus_CRM_VISIT_STATUS_SCHEDULED {
			actualArrival = scheduledArrival.Add(time.Duration(rand.Intn(30)) * time.Minute).Unix()
		}
		if status == crm.CrmVisitStatus_CRM_VISIT_STATUS_COMPLETED {
			departureTime = scheduledArrival.Add(time.Duration(rand.Intn(3)+1) * time.Hour).Unix()
		}

		laborHours := float64(rand.Intn(4) + 1)
		travelHours := float64(rand.Intn(2)) + 0.5
		travelDistance := float64(rand.Intn(50) + 5)
		laborCost := int64(laborHours * float64(rand.Intn(50)+50))
		travelCost := int64(travelDistance * 0.58)

		visits = append(visits, &crm.CrmServiceVisit{
			VisitId:           fmt.Sprintf("svcvist-%03d", idx),
			ServiceOrderId:    orderID,
			TechnicianId:      technicianID,
			Status:            status,
			ScheduledArrival:  scheduledArrival.Unix(),
			ActualArrival:     actualArrival,
			DepartureTime:     departureTime,
			LaborHours:        laborHours,
			TravelHours:       travelHours,
			TravelDistance:    travelDistance,
			WorkPerformed:     "Completed scheduled maintenance and inspections",
			CustomerSignature: "J. Smith",
			CustomerRating:    int32(rand.Intn(5) + 1),
			CustomerFeedback:  "Excellent service!",
			LaborCost:         money(laborCost),
			TravelCost:        money(travelCost),
			AuditInfo:         createAuditInfo(),
		})
		idx++
	}
	return visits
}
