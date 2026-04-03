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
package hcmreports

import (
	common "github.com/saichler/l8common/go/generic"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

func reviewStatusName(s hcm.PerformanceReviewStatus) string {
	switch s {
	case hcm.PerformanceReviewStatus_PERFORMANCE_REVIEW_STATUS_NOT_STARTED:
		return "Not Started"
	case hcm.PerformanceReviewStatus_PERFORMANCE_REVIEW_STATUS_SELF_REVIEW:
		return "Self Review"
	case hcm.PerformanceReviewStatus_PERFORMANCE_REVIEW_STATUS_MANAGER_REVIEW:
		return "Manager Review"
	case hcm.PerformanceReviewStatus_PERFORMANCE_REVIEW_STATUS_CALIBRATION:
		return "Calibration"
	case hcm.PerformanceReviewStatus_PERFORMANCE_REVIEW_STATUS_HR_REVIEW:
		return "HR Review"
	case hcm.PerformanceReviewStatus_PERFORMANCE_REVIEW_STATUS_ACKNOWLEDGMENT:
		return "Acknowledgment"
	case hcm.PerformanceReviewStatus_PERFORMANCE_REVIEW_STATUS_COMPLETED:
		return "Completed"
	default:
		return "Other"
	}
}

func generatePerformanceSummary(report *fin.FinReport, vnic ifs.IVNic) error {
	reviews, err := common.GetEntities("PerfRevw", 30, &hcm.PerformanceReview{}, vnic)
	if err != nil {
		return err
	}

	currencyId := report.CurrencyId

	type statusStats struct {
		count       int32
		totalRating int64
	}

	byStatus := make(map[hcm.PerformanceReviewStatus]*statusStats)
	for _, r := range reviews {
		st, ok := byStatus[r.Status]
		if !ok {
			st = &statusStats{}
			byStatus[r.Status] = st
		}
		st.count++
		st.totalRating += int64(r.OverallRating)
	}

	section := &fin.FinReportSection{
		Title:        "Reviews by Status",
		SectionTotal: newMoney(0, currencyId),
	}

	var totalReviews int32
	for status, st := range byStatus {
		avgRating := int64(0)
		if st.count > 0 {
			avgRating = st.totalRating / int64(st.count)
		}
		line := &fin.FinReportLine{
			AccountName: reviewStatusName(status),
			Balance:     newMoney(int64(st.count), currencyId),
			Debit:       newMoney(avgRating, currencyId),
			Level:       st.count,
			Description: "avg rating in Debit",
		}
		section.Lines = append(section.Lines, line)
		totalReviews += st.count
	}
	section.SectionTotal = newMoney(int64(totalReviews), currencyId)

	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = section.SectionTotal
	report.RowCount = countLines(report.Sections)
	return nil
}
