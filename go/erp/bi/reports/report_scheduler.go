// Copyright 2025 Sharon Aicler (saichler@gmail.com)
//
// Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
// You may obtain a copy of the License at:
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package reports

import (
	"log"
	"sync"
	"time"

	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/bi"
	"github.com/saichler/l8types/go/ifs"
)

var (
	schedulerOnce sync.Once
	schedulerStop chan struct{}
)

// StartScheduler launches the background report scheduler goroutine.
// It is safe to call multiple times; only the first call starts the loop.
func StartScheduler(vnic ifs.IVNic) {
	schedulerOnce.Do(func() {
		schedulerStop = make(chan struct{})
		go runScheduler(vnic)
		log.Println("BI report scheduler started")
	})
}

// StopScheduler signals the background scheduler to exit.
func StopScheduler() {
	if schedulerStop != nil {
		close(schedulerStop)
	}
}

// runScheduler is the main loop. It checks for due schedules every minute.
func runScheduler(vnic ifs.IVNic) {
	ticker := time.NewTicker(1 * time.Minute)
	defer ticker.Stop()
	for {
		select {
		case <-schedulerStop:
			log.Println("BI report scheduler stopped")
			return
		case <-ticker.C:
			checkDueSchedules(vnic)
		}
	}
}

// checkDueSchedules fetches all reports and runs any whose schedules are due.
func checkDueSchedules(vnic ifs.IVNic) {
	reports, err := common.GetEntities(ServiceName, ServiceArea, &bi.BiReport{}, vnic)
	if err != nil {
		log.Printf("Scheduler: error fetching reports: %v", err)
		return
	}
	now := time.Now().Unix()
	for _, report := range reports {
		checkReportSchedules(report, now, vnic)
	}
}

// checkReportSchedules evaluates each active schedule on a report.
func checkReportSchedules(report *bi.BiReport, now int64, vnic ifs.IVNic) {
	for _, schedule := range report.Schedules {
		if !schedule.IsActive {
			continue
		}
		if schedule.EndDate > 0 && now > schedule.EndDate {
			continue
		}
		if schedule.NextRun > 0 && schedule.NextRun <= now {
			executeScheduledReport(report, schedule, vnic)
		}
	}
}

// executeScheduledReport is a placeholder for scheduled report execution.
// Report execution is handled by a dedicated AI Agent; this function updates
// the schedule timing so the scheduler tracks when reports are due.
func executeScheduledReport(report *bi.BiReport, schedule *bi.BiReportSchedule, _ ifs.IVNic) {
	log.Printf("Scheduled report due: %s (schedule: %s) — delegating to AI Agent", report.Name, schedule.Name)
	schedule.LastRun = time.Now().Unix()
	schedule.NextRun = computeNextRun(schedule)
}

// computeNextRun calculates the next run timestamp based on frequency.
func computeNextRun(schedule *bi.BiReportSchedule) int64 {
	now := time.Now()
	switch schedule.Frequency {
	case bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_DAILY:
		return now.Add(24 * time.Hour).Unix()
	case bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_WEEKLY:
		return now.Add(7 * 24 * time.Hour).Unix()
	case bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_MONTHLY:
		return now.AddDate(0, 1, 0).Unix()
	case bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_QUARTERLY:
		return now.AddDate(0, 3, 0).Unix()
	case bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_YEARLY:
		return now.AddDate(1, 0, 0).Unix()
	case bi.BiScheduleFrequency_BI_SCHEDULE_FREQUENCY_ONCE:
		return 0
	default:
		return 0
	}
}
