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

	"github.com/saichler/l8erp/go/types/hcm"
)

// generateDependents creates dependent records
func generateDependents(store *MockDataStore) []*hcm.Dependent {
	dependents := make([]*hcm.Dependent, 0)
	idx := 1
	relationships := []hcm.DependentRelationship{
		hcm.DependentRelationship_DEPENDENT_RELATIONSHIP_SPOUSE,
		hcm.DependentRelationship_DEPENDENT_RELATIONSHIP_CHILD,
		hcm.DependentRelationship_DEPENDENT_RELATIONSHIP_DOMESTIC_PARTNER,
	}

	// 60% of employees have dependents
	for i := 0; i < len(store.EmployeeIDs)*6/10; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		numDeps := rand.Intn(3) + 1

		for j := 0; j < numDeps; j++ {
			dependents = append(dependents, &hcm.Dependent{
				DependentId:        fmt.Sprintf("dep-%04d", idx),
				EmployeeId:         empID,
				FirstName:          firstNames[rand.Intn(len(firstNames))],
				LastName:           lastNames[rand.Intn(len(lastNames))],
				Relationship:       relationships[rand.Intn(len(relationships))],
				DateOfBirth:        randomBirthDate(),
				Gender:             hcm.Gender(rand.Intn(2) + 1),
				VerificationStatus: hcm.VerificationStatus_VERIFICATION_STATUS_VERIFIED,
				AuditInfo:          createAuditInfo(),
			})
			idx++
		}
	}
	return dependents
}

// generateLifeEvents creates life event records
func generateLifeEvents(store *MockDataStore) []*hcm.LifeEvent {
	events := make([]*hcm.LifeEvent, 0)
	idx := 1
	eventTypes := []hcm.LifeEventType{
		hcm.LifeEventType_LIFE_EVENT_TYPE_MARRIAGE,
		hcm.LifeEventType_LIFE_EVENT_TYPE_BIRTH,
		hcm.LifeEventType_LIFE_EVENT_TYPE_ADOPTION,
		hcm.LifeEventType_LIFE_EVENT_TYPE_DIVORCE,
	}

	// 20% of employees had life events
	for i := 0; i < len(store.EmployeeIDs)/5; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		eventDate := time.Date(2024, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)

		events = append(events, &hcm.LifeEvent{
			LifeEventId:        fmt.Sprintf("life-%04d", idx),
			EmployeeId:         empID,
			EventType:          eventTypes[rand.Intn(len(eventTypes))],
			EventDate:          eventDate.Unix(),
			Status:             hcm.LifeEventStatus_LIFE_EVENT_STATUS_APPROVED,
			EnrollmentDeadline: eventDate.AddDate(0, 0, 30).Unix(),
			AuditInfo:          createAuditInfo(),
		})
		idx++
	}
	return events
}

// generateCOBRAEvents creates COBRA event records
func generateCOBRAEvents(store *MockDataStore) []*hcm.COBRAEvent {
	events := make([]*hcm.COBRAEvent, 0)
	idx := 1
	eventTypes := []hcm.COBRAEventType{
		hcm.COBRAEventType_COBRA_EVENT_TYPE_TERMINATION,
		hcm.COBRAEventType_COBRA_EVENT_TYPE_HOURS_REDUCTION,
		hcm.COBRAEventType_COBRA_EVENT_TYPE_DIVORCE,
	}

	// 5% of employees have COBRA events (former employees or dependents)
	numEvents := len(store.EmployeeIDs) / 20
	if numEvents < 1 {
		numEvents = 1
	}

	for i := 0; i < numEvents; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		qualifyingDate := time.Date(2024, time.Month(rand.Intn(12)+1), rand.Intn(28)+1, 0, 0, 0, 0, time.UTC)
		notificationDate := qualifyingDate.AddDate(0, 0, 14)
		monthlyPremium := int64(rand.Intn(1000)+500) * 100

		events = append(events, &hcm.COBRAEvent{
			CobraEventId:        fmt.Sprintf("cobra-%04d", idx),
			EmployeeId:          empID,
			EventType:           eventTypes[rand.Intn(len(eventTypes))],
			QualifyingEventDate: qualifyingDate.Unix(),
			NotificationDate:    notificationDate.Unix(),
			ElectionDeadline:    notificationDate.AddDate(0, 0, 60).Unix(),
			CoverageStartDate:   qualifyingDate.Unix(),
			CoverageEndDate:     qualifyingDate.AddDate(0, 18, 0).Unix(),
			CoverageMonths:      18,
			Status:              hcm.COBRAStatus_COBRA_STATUS_NOTIFIED,
			MonthlyPremium:      &hcm.Money{Amount: monthlyPremium, CurrencyCode: "USD"},
			AdminFeePercentage:  2.0,
			TotalMonthlyCost:    &hcm.Money{Amount: int64(float64(monthlyPremium) * 1.02), CurrencyCode: "USD"},
			AuditInfo:           createAuditInfo(),
		})
		idx++
	}
	return events
}

// generateComplianceRecords creates compliance record records
func generateComplianceRecords(store *MockDataStore) []*hcm.ComplianceRecord {
	records := make([]*hcm.ComplianceRecord, 0)
	idx := 1
	complianceTypes := []hcm.ComplianceType{
		hcm.ComplianceType_COMPLIANCE_TYPE_I9,
		hcm.ComplianceType_COMPLIANCE_TYPE_BACKGROUND_CHECK,
		hcm.ComplianceType_COMPLIANCE_TYPE_DRUG_TEST,
		hcm.ComplianceType_COMPLIANCE_TYPE_WORK_AUTHORIZATION,
	}

	for _, empID := range store.EmployeeIDs {
		records = append(records, &hcm.ComplianceRecord{
			RecordId:       fmt.Sprintf("comp-%04d", idx),
			EmployeeId:     empID,
			ComplianceType: complianceTypes[rand.Intn(len(complianceTypes))],
			Status:         "Compliant",
			DueDate:        randomHireDate(),
			CompletionDate: randomHireDate(),
			ExpirationDate: time.Now().AddDate(1, 0, 0).Unix(),
			AuditInfo:      createAuditInfo(),
		})
		idx++
	}
	return records
}
