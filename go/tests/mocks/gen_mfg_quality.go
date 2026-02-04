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

	"github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/mfg"
)

// generateQualityPlans creates quality plan records
func generateQualityPlans(store *MockDataStore) []*mfg.MfgQualityPlan {
	count := 10
	plans := make([]*mfg.MfgQualityPlan, count)

	for i := 0; i < count; i++ {
		itemID := ""
		if len(store.ItemIDs) > 0 {
			itemID = store.ItemIDs[i%len(store.ItemIDs)]
		}
		effectiveDate := time.Now().AddDate(0, -rand.Intn(6), 0)

		plans[i] = &mfg.MfgQualityPlan{
			PlanId:        fmt.Sprintf("qplan-%03d", i+1),
			PlanNumber:    fmt.Sprintf("QP-%05d", 40000+i+1),
			Name:          fmt.Sprintf("Quality Plan %d", i+1),
			Description:   fmt.Sprintf("Quality control plan for product line %d", i+1),
			ItemId:        itemID,
			EffectiveDate: effectiveDate.Unix(),
			Revision:      fmt.Sprintf("R%d", rand.Intn(3)+1),
			Notes:         fmt.Sprintf("Quality assurance plan notes %d", i+1),
			AuditInfo:     createAuditInfo(),
		}
	}
	return plans
}

// generateInspectionPoints creates inspection point records (3 per quality plan)
func generateInspectionPoints(store *MockDataStore) []*mfg.MfgInspectionPoint {
	inspTypes := []mfg.MfgInspectionType{
		mfg.MfgInspectionType_MFG_INSPECTION_TYPE_INCOMING,
		mfg.MfgInspectionType_MFG_INSPECTION_TYPE_IN_PROCESS,
		mfg.MfgInspectionType_MFG_INSPECTION_TYPE_FINAL,
		mfg.MfgInspectionType_MFG_INSPECTION_TYPE_RANDOM,
	}
	samplingMethods := []string{"100%", "SAMPLE", "RANDOM", "AQL"}

	points := make([]*mfg.MfgInspectionPoint, 0, len(store.MfgQualityPlanIDs)*3)
	idx := 1
	for planIdx, planID := range store.MfgQualityPlanIDs {
		for j := 0; j < 3; j++ {
			opID := ""
			if len(store.MfgRoutingOpIDs) > 0 {
				opID = store.MfgRoutingOpIDs[(planIdx*3+j)%len(store.MfgRoutingOpIDs)]
			}

			lowerLimit := float64(rand.Intn(40)+30) / 10.0
			upperLimit := float64(rand.Intn(40)+70) / 10.0

			points = append(points, &mfg.MfgInspectionPoint{
				PointId:        fmt.Sprintf("inspt-%03d", idx),
				PlanId:         planID,
				Sequence:       int32((j + 1) * 10),
				Name:           fmt.Sprintf("Inspection Point %d-%d", planIdx+1, j+1),
				Description:    fmt.Sprintf("Inspection checkpoint %d for quality plan", idx),
				InspectionType: inspTypes[(planIdx*3+j)%len(inspTypes)],
				OperationId:    opID,
				Characteristic: fmt.Sprintf("Characteristic %d", j+1),
				Specification:  fmt.Sprintf("SPEC-%03d", idx),
				LowerLimit:     lowerLimit,
				UpperLimit:     upperLimit,
				UnitOfMeasure:  "mm",
				SamplingMethod: samplingMethods[j%len(samplingMethods)],
				SampleSize:     int32(rand.Intn(10) + 5),
				IsMandatory:    j < 2,
				Notes:          fmt.Sprintf("Inspection point notes %d", idx),
				AuditInfo:      createAuditInfo(),
			})
			idx++
		}
	}
	return points
}

// generateQualityInspections creates quality inspection records
func generateQualityInspections(store *MockDataStore) []*mfg.MfgQualityInspection {
	count := 20
	inspections := make([]*mfg.MfgQualityInspection, count)

	inspTypes := []mfg.MfgInspectionType{
		mfg.MfgInspectionType_MFG_INSPECTION_TYPE_INCOMING,
		mfg.MfgInspectionType_MFG_INSPECTION_TYPE_IN_PROCESS,
		mfg.MfgInspectionType_MFG_INSPECTION_TYPE_FINAL,
		mfg.MfgInspectionType_MFG_INSPECTION_TYPE_RANDOM,
	}

	for i := 0; i < count; i++ {
		planID := ""
		if len(store.MfgQualityPlanIDs) > 0 {
			planID = store.MfgQualityPlanIDs[i%len(store.MfgQualityPlanIDs)]
		}
		woID := ""
		if len(store.MfgWorkOrderIDs) > 0 {
			woID = store.MfgWorkOrderIDs[i%len(store.MfgWorkOrderIDs)]
		}
		inspectorID := ""
		if len(store.EmployeeIDs) > 0 {
			inspectorID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}
		itemID := ""
		if len(store.ItemIDs) > 0 {
			itemID = store.ItemIDs[i%len(store.ItemIDs)]
		}
		warehouseID := ""
		if len(store.SCMWarehouseIDs) > 0 {
			warehouseID = store.SCMWarehouseIDs[i%len(store.SCMWarehouseIDs)]
		}

		inspDate := time.Now().AddDate(0, 0, -rand.Intn(14))
		completedDate := inspDate.AddDate(0, 0, rand.Intn(3)+1)

		qtyInspected := float64(rand.Intn(100) + 10)
		qtyRejected := float64(rand.Intn(10))
		qtyAccepted := qtyInspected - qtyRejected

		// Result distribution: 70% Pass, 15% Fail, 10% Conditional, 5% Pending
		var result mfg.MfgInspectionResult
		if i < count*7/10 {
			result = mfg.MfgInspectionResult_MFG_INSPECTION_RESULT_PASS
		} else if i < count*85/100 {
			result = mfg.MfgInspectionResult_MFG_INSPECTION_RESULT_FAIL
		} else if i < count*95/100 {
			result = mfg.MfgInspectionResult_MFG_INSPECTION_RESULT_CONDITIONAL
		} else {
			result = mfg.MfgInspectionResult_MFG_INSPECTION_RESULT_PENDING
		}

		inspections[i] = &mfg.MfgQualityInspection{
			InspectionId:      fmt.Sprintf("qinsp-%03d", i+1),
			InspectionNumber:  fmt.Sprintf("QI-%06d", 500000+i+1),
			PlanId:            planID,
			WorkOrderId:       woID,
			ItemId:            itemID,
			LotNumber:         fmt.Sprintf("LOT-%06d", 400000+i+1),
			QuantityInspected: qtyInspected,
			QuantityAccepted:  qtyAccepted,
			QuantityRejected:  qtyRejected,
			InspectionType:    inspTypes[i%len(inspTypes)],
			OverallResult:     result,
			InspectorId:       inspectorID,
			InspectionDate:    inspDate.Unix(),
			CompletedDate:     completedDate.Unix(),
			WarehouseId:       warehouseID,
			Notes:             fmt.Sprintf("Quality inspection notes %d", i+1),
			AuditInfo:         createAuditInfo(),
		}
	}
	return inspections
}

// generateTestResults creates test result records (2 per inspection)
func generateTestResults(store *MockDataStore) []*mfg.MfgTestResult {
	results := make([]*mfg.MfgTestResult, 0, len(store.MfgQualityInspectionIDs)*2)
	idx := 1
	for inspIdx, inspID := range store.MfgQualityInspectionIDs {
		for j := 0; j < 2; j++ {
			pointID := ""
			if len(store.MfgInspectionPointIDs) > 0 {
				pointID = store.MfgInspectionPointIDs[(inspIdx*2+j)%len(store.MfgInspectionPointIDs)]
			}
			testerID := ""
			if len(store.EmployeeIDs) > 0 {
				testerID = store.EmployeeIDs[(inspIdx+j)%len(store.EmployeeIDs)]
			}

			testDate := time.Now().AddDate(0, 0, -rand.Intn(14))
			measuredValue := float64(rand.Intn(100)+40) / 10.0

			// Result distribution: 80% Pass, 20% Fail
			var result mfg.MfgInspectionResult
			isInSpec := true
			if (inspIdx*2+j)%5 < 4 {
				result = mfg.MfgInspectionResult_MFG_INSPECTION_RESULT_PASS
			} else {
				result = mfg.MfgInspectionResult_MFG_INSPECTION_RESULT_FAIL
				isInSpec = false
			}

			results = append(results, &mfg.MfgTestResult{
				ResultId:      fmt.Sprintf("testres-%03d", idx),
				InspectionId:  inspID,
				PointId:       pointID,
				SampleNumber:  int32(j + 1),
				MeasuredValue: measuredValue,
				TextValue:     fmt.Sprintf("%.2f mm", measuredValue),
				Result:        result,
				IsInSpec:      isInSpec,
				TesterId:      testerID,
				TestDate:      testDate.Unix(),
				EquipmentId:   fmt.Sprintf("equip-%03d", rand.Intn(10)+1),
				Notes:         fmt.Sprintf("Test result notes %d", idx),
				AuditInfo:     createAuditInfo(),
			})
			idx++
		}
	}
	return results
}

// generateNCRs creates non-conformance report records
func generateNCRs(store *MockDataStore) []*mfg.MfgNCR {
	severities := []mfg.MfgNCRSeverity{
		mfg.MfgNCRSeverity_MFG_NCR_SEVERITY_MINOR,
		mfg.MfgNCRSeverity_MFG_NCR_SEVERITY_MAJOR,
		mfg.MfgNCRSeverity_MFG_NCR_SEVERITY_CRITICAL,
	}
	dispositions := []mfg.MfgNCRDisposition{
		mfg.MfgNCRDisposition_MFG_NCR_DISPOSITION_USE_AS_IS,
		mfg.MfgNCRDisposition_MFG_NCR_DISPOSITION_REWORK,
		mfg.MfgNCRDisposition_MFG_NCR_DISPOSITION_SCRAP,
		mfg.MfgNCRDisposition_MFG_NCR_DISPOSITION_RETURN_TO_VENDOR,
		mfg.MfgNCRDisposition_MFG_NCR_DISPOSITION_PENDING,
	}

	count := 10
	ncrs := make([]*mfg.MfgNCR, count)

	for i := 0; i < count; i++ {
		itemID := ""
		if len(store.ItemIDs) > 0 {
			itemID = store.ItemIDs[i%len(store.ItemIDs)]
		}
		woID := ""
		if len(store.MfgWorkOrderIDs) > 0 {
			woID = store.MfgWorkOrderIDs[i%len(store.MfgWorkOrderIDs)]
		}
		inspID := ""
		if len(store.MfgQualityInspectionIDs) > 0 {
			inspID = store.MfgQualityInspectionIDs[i%len(store.MfgQualityInspectionIDs)]
		}
		reportedBy := ""
		if len(store.EmployeeIDs) > 0 {
			reportedBy = store.EmployeeIDs[i%len(store.EmployeeIDs)]
		}
		assignedTo := ""
		if len(store.EmployeeIDs) > 0 {
			assignedTo = store.EmployeeIDs[(i+1)%len(store.EmployeeIDs)]
		}

		reportedDate := time.Now().AddDate(0, 0, -rand.Intn(30))
		dueDate := reportedDate.AddDate(0, 0, rand.Intn(14)+7)

		// Status distribution: 20% Open, 40% Under Review, 20% Dispositioned, 20% Closed
		var status mfg.MfgNCRStatus
		var closedDate int64
		if i < count*2/10 {
			status = mfg.MfgNCRStatus_MFG_NCR_STATUS_OPEN
		} else if i < count*6/10 {
			status = mfg.MfgNCRStatus_MFG_NCR_STATUS_UNDER_REVIEW
		} else if i < count*8/10 {
			status = mfg.MfgNCRStatus_MFG_NCR_STATUS_DISPOSITIONED
		} else {
			status = mfg.MfgNCRStatus_MFG_NCR_STATUS_CLOSED
			closedDate = reportedDate.AddDate(0, 0, rand.Intn(14)+3).Unix()
		}

		estCost := int64(rand.Intn(10000) + 1000)
		actCost := int64(0)
		if status >= mfg.MfgNCRStatus_MFG_NCR_STATUS_DISPOSITIONED {
			actCost = int64(float64(estCost) * (0.9 + rand.Float64()*0.2))
		}

		ncrs[i] = &mfg.MfgNCR{
			NcrId:            fmt.Sprintf("ncr-%03d", i+1),
			NcrNumber:        fmt.Sprintf("NCR-%06d", 600000+i+1),
			Title:            fmt.Sprintf("NCR: %s", mfgNCRReasons[i%len(mfgNCRReasons)]),
			Description:      fmt.Sprintf("Non-conformance report for issue %d", i+1),
			InspectionId:     inspID,
			WorkOrderId:      woID,
			ItemId:           itemID,
			LotNumber:        fmt.Sprintf("LOT-%06d", 400000+i+1),
			QuantityAffected: float64(rand.Intn(50) + 5),
			Severity:         severities[i%len(severities)],
			Status:           status,
			Disposition:      dispositions[i%len(dispositions)],
			DefectCode:       fmt.Sprintf("DEF-%03d", i+1),
			RootCause:        fmt.Sprintf("Root cause analysis for NCR %d", i+1),
			CorrectiveAction: fmt.Sprintf("Corrective action for NCR %d", i+1),
			ReportedBy:       reportedBy,
			ReportedDate:     reportedDate.Unix(),
			AssignedTo:       assignedTo,
			DueDate:          dueDate.Unix(),
			ClosedDate:       closedDate,
			EstimatedCost:    &erp.Money{Amount: estCost, CurrencyCode: "USD"},
			ActualCost:       &erp.Money{Amount: actCost, CurrencyCode: "USD"},
			Notes:            fmt.Sprintf("NCR notes %d", i+1),
			AuditInfo:        createAuditInfo(),
		}
	}
	return ncrs
}

// generateNCRActions creates NCR action records (2 per NCR)
func generateNCRActions(store *MockDataStore) []*mfg.MfgNCRAction {
	actionTypes := []string{"Corrective Action", "Preventive Action", "Containment Action", "Root Cause Analysis"}

	actions := make([]*mfg.MfgNCRAction, 0, len(store.MfgNCRIDs)*2)
	idx := 1
	for ncrIdx, ncrID := range store.MfgNCRIDs {
		for j := 0; j < 2; j++ {
			assignedTo := ""
			if len(store.EmployeeIDs) > 0 {
				assignedTo = store.EmployeeIDs[(ncrIdx*2+j)%len(store.EmployeeIDs)]
			}

			dueDate := time.Now().AddDate(0, 0, rand.Intn(30)+7)
			var completedDate int64
			// 50% completed
			if j == 0 {
				completedDate = time.Now().AddDate(0, 0, -rand.Intn(7)).Unix()
			}

			actions = append(actions, &mfg.MfgNCRAction{
				ActionId:      fmt.Sprintf("ncract-%03d", idx),
				NcrId:         ncrID,
				ActionType:    actionTypes[(ncrIdx*2+j)%len(actionTypes)],
				Description:   fmt.Sprintf("Action item %d for NCR resolution", idx),
				AssignedTo:    assignedTo,
				DueDate:       dueDate.Unix(),
				CompletedDate: completedDate,
				Notes:         fmt.Sprintf("NCR action notes %d", idx),
				AuditInfo:     createAuditInfo(),
			})
			idx++
		}
	}
	return actions
}
