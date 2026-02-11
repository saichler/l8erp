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

// generateDowntimeEvents creates downtime event records (1 per work center)
func generateDowntimeEvents(store *MockDataStore) []*mfg.MfgDowntimeEvent {
	downtimeTypes := []mfg.MfgDowntimeType{
		mfg.MfgDowntimeType_MFG_DOWNTIME_TYPE_PLANNED,
		mfg.MfgDowntimeType_MFG_DOWNTIME_TYPE_UNPLANNED,
		mfg.MfgDowntimeType_MFG_DOWNTIME_TYPE_BREAKDOWN,
		mfg.MfgDowntimeType_MFG_DOWNTIME_TYPE_MAINTENANCE,
		mfg.MfgDowntimeType_MFG_DOWNTIME_TYPE_CHANGEOVER,
	}
	reasonCodes := []string{"MAINT", "SETUP", "BREAK", "MATLSHORT", "QUAL", "LABSHORT"}

	events := make([]*mfg.MfgDowntimeEvent, len(store.MfgWorkCenterIDs))
	for i, wcID := range store.MfgWorkCenterIDs {
		woID := pickRef(store.MfgWorkOrderIDs, i)
		reportedBy := pickRef(store.EmployeeIDs, i)
		resolvedBy := pickRef(store.EmployeeIDs, (i + 1))

		startTime := time.Now().AddDate(0, 0, -rand.Intn(7)).Add(time.Duration(rand.Intn(12)+6) * time.Hour)
		durationMinutes := float64(rand.Intn(180) + 30)
		endTime := startTime.Add(time.Duration(durationMinutes) * time.Minute)
		estimatedLoss := int64(durationMinutes * 50 * 100) // ~$50/minute

		events[i] = &mfg.MfgDowntimeEvent{
			EventId:         genID("downtime", i),
			WorkCenterId:    wcID,
			WorkOrderId:     woID,
			DowntimeType:    downtimeTypes[i%len(downtimeTypes)],
			ReasonCode:      reasonCodes[i%len(reasonCodes)],
			Description:     fmt.Sprintf("Downtime event for work center %s", wcID),
			StartTime:       startTime.Unix(),
			EndTime:         endTime.Unix(),
			DurationMinutes: durationMinutes,
			ReportedBy:      reportedBy,
			ResolvedBy:      resolvedBy,
			EstimatedLoss:   money(store, estimatedLoss),
			Notes:           fmt.Sprintf("Downtime notes for event %d", i+1),
			AuditInfo:       createAuditInfo(),
		}
	}
	return events
}
