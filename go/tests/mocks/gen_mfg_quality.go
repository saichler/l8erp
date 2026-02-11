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

// generateQualityPlans creates quality plan records with embedded inspection points
func generateQualityPlans(store *MockDataStore) []*mfg.MfgQualityPlan {
	inspTypes := []mfg.MfgInspectionType{
		mfg.MfgInspectionType_MFG_INSPECTION_TYPE_INCOMING,
		mfg.MfgInspectionType_MFG_INSPECTION_TYPE_IN_PROCESS,
		mfg.MfgInspectionType_MFG_INSPECTION_TYPE_FINAL,
		mfg.MfgInspectionType_MFG_INSPECTION_TYPE_RANDOM,
	}
	samplingMethods := []string{"100%", "SAMPLE", "RANDOM", "AQL"}
	statuses := []mfg.MfgBomStatus{
		mfg.MfgBomStatus_MFG_BOM_STATUS_ACTIVE,
		mfg.MfgBomStatus_MFG_BOM_STATUS_DRAFT,
		mfg.MfgBomStatus_MFG_BOM_STATUS_PENDING_APPROVAL,
		mfg.MfgBomStatus_MFG_BOM_STATUS_OBSOLETE,
	}

	count := 10
	pointIdx := 1
	plans := make([]*mfg.MfgQualityPlan, count)

	for i := 0; i < count; i++ {
		itemID := pickRef(store.ItemIDs, i)
		effectiveDate := time.Now().AddDate(0, -rand.Intn(6), 0)
		planID := genID("qplan", i)

		// Generate 3 embedded inspection points per plan
		points := make([]*mfg.MfgInspectionPoint, 3)
		for j := 0; j < 3; j++ {
			lowerLimit := float64(rand.Intn(40)+30) / 10.0
			upperLimit := float64(rand.Intn(40)+70) / 10.0

			points[j] = &mfg.MfgInspectionPoint{
				PointId:        fmt.Sprintf("inspt-%03d", pointIdx),
				PlanId:         planID,
				Sequence:       int32((j + 1) * 10),
				Name:           fmt.Sprintf("Inspection Point %d-%d", i+1, j+1),
				Description:    fmt.Sprintf("Inspection checkpoint %d for quality plan", pointIdx),
				InspectionType: inspTypes[(i*3+j)%len(inspTypes)],
				Characteristic: fmt.Sprintf("Characteristic %d", j+1),
				Specification:  fmt.Sprintf("SPEC-%03d", pointIdx),
				LowerLimit:     lowerLimit,
				UpperLimit:     upperLimit,
				UnitOfMeasure:  "mm",
				SamplingMethod: samplingMethods[j%len(samplingMethods)],
				SampleSize:     int32(rand.Intn(10) + 5),
				IsMandatory:    j < 2,
				Notes:          fmt.Sprintf("Inspection point notes %d", pointIdx),
				AuditInfo:      createAuditInfo(),
			}
			pointIdx++
		}

		plans[i] = &mfg.MfgQualityPlan{
			PlanId:           planID,
			PlanNumber:       fmt.Sprintf("QP-%05d", 40000+i+1),
			Name:             fmt.Sprintf("Quality Plan %d", i+1),
			Description:      fmt.Sprintf("Quality control plan for product line %d", i+1),
			ItemId:           itemID,
			Status:           statuses[i%len(statuses)],
			EffectiveDate:    effectiveDate.Unix(),
			Revision:         fmt.Sprintf("R%d", rand.Intn(3)+1),
			Notes:            fmt.Sprintf("Quality assurance plan notes %d", i+1),
			AuditInfo:        createAuditInfo(),
			InspectionPoints: points,
		}
	}
	return plans
}

// generateQualityInspections creates quality inspection records with embedded test results
func generateQualityInspections(store *MockDataStore) []*mfg.MfgQualityInspection {
	count := 20
	resultIdx := 1
	inspections := make([]*mfg.MfgQualityInspection, count)

	inspTypes := []mfg.MfgInspectionType{
		mfg.MfgInspectionType_MFG_INSPECTION_TYPE_INCOMING,
		mfg.MfgInspectionType_MFG_INSPECTION_TYPE_IN_PROCESS,
		mfg.MfgInspectionType_MFG_INSPECTION_TYPE_FINAL,
		mfg.MfgInspectionType_MFG_INSPECTION_TYPE_RANDOM,
	}

	for i := 0; i < count; i++ {
		planID := pickRef(store.MfgQualityPlanIDs, i)
		woID := pickRef(store.MfgWorkOrderIDs, i)
		inspectorID := pickRef(store.EmployeeIDs, i)
		itemID := pickRef(store.ItemIDs, i)
		warehouseID := pickRef(store.SCMWarehouseIDs, i)

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

		inspID := genID("qinsp", i)

		// Generate 2 embedded test results per inspection
		testResults := make([]*mfg.MfgTestResult, 2)
		for j := 0; j < 2; j++ {
			testerID := pickRef(store.EmployeeIDs, (i + j))
			testDate := time.Now().AddDate(0, 0, -rand.Intn(14))
			measuredValue := float64(rand.Intn(100)+40) / 10.0

			var trResult mfg.MfgInspectionResult
			isInSpec := true
			if (i*2+j)%5 < 4 {
				trResult = mfg.MfgInspectionResult_MFG_INSPECTION_RESULT_PASS
			} else {
				trResult = mfg.MfgInspectionResult_MFG_INSPECTION_RESULT_FAIL
				isInSpec = false
			}

			testResults[j] = &mfg.MfgTestResult{
				ResultId:      fmt.Sprintf("testres-%03d", resultIdx),
				InspectionId:  inspID,
				SampleNumber:  int32(j + 1),
				MeasuredValue: measuredValue,
				TextValue:     fmt.Sprintf("%.2f mm", measuredValue),
				Result:        trResult,
				IsInSpec:      isInSpec,
				TesterId:      testerID,
				TestDate:      testDate.Unix(),
				EquipmentId:   fmt.Sprintf("equip-%03d", rand.Intn(10)+1),
				Notes:         fmt.Sprintf("Test result notes %d", resultIdx),
				AuditInfo:     createAuditInfo(),
			}
			resultIdx++
		}

		inspections[i] = &mfg.MfgQualityInspection{
			InspectionId:      inspID,
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
			TestResults:       testResults,
		}
	}
	return inspections
}

// generateNCRs creates non-conformance report records with embedded actions
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
	actionTypes := []string{"Corrective Action", "Preventive Action", "Containment Action", "Root Cause Analysis"}

	count := 10
	actionIdx := 1
	ncrs := make([]*mfg.MfgNCR, count)

	for i := 0; i < count; i++ {
		itemID := pickRef(store.ItemIDs, i)
		woID := pickRef(store.MfgWorkOrderIDs, i)
		inspID := pickRef(store.MfgQualityInspectionIDs, i)
		reportedBy := pickRef(store.EmployeeIDs, i)
		assignedTo := pickRef(store.EmployeeIDs, (i + 1))

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

		ncrID := genID("ncr", i)

		// Generate 2 embedded actions per NCR
		actions := make([]*mfg.MfgNCRAction, 2)
		for j := 0; j < 2; j++ {
			actAssignedTo := pickRef(store.EmployeeIDs, (i*2 + j))
			actDueDate := time.Now().AddDate(0, 0, rand.Intn(30)+7)
			var completedDate int64
			if j == 0 {
				completedDate = time.Now().AddDate(0, 0, -rand.Intn(7)).Unix()
			}

			actions[j] = &mfg.MfgNCRAction{
				ActionId:      fmt.Sprintf("ncract-%03d", actionIdx),
				NcrId:         ncrID,
				ActionType:    actionTypes[(i*2+j)%len(actionTypes)],
				Description:   fmt.Sprintf("Action item %d for NCR resolution", actionIdx),
				AssignedTo:    actAssignedTo,
				DueDate:       actDueDate.Unix(),
				CompletedDate: completedDate,
				Notes:         fmt.Sprintf("NCR action notes %d", actionIdx),
				AuditInfo:     createAuditInfo(),
			}
			actionIdx++
		}

		ncrs[i] = &mfg.MfgNCR{
			NcrId:            ncrID,
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
			EstimatedCost:    money(store, estCost),
			ActualCost:       money(store, actCost),
			Notes:            fmt.Sprintf("NCR notes %d", i+1),
			AuditInfo:        createAuditInfo(),
			Actions:          actions,
		}
	}
	return ncrs
}
