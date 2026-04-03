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
package crmreports

import (
	"fmt"

	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"

	common "github.com/saichler/l8common/go/generic"
	"github.com/saichler/l8erp/go/types/crm"
)

func generateCaseResolution(report *fin.FinReport, vnic ifs.IVNic) error {
	cases, err := common.GetEntities("CrmCase", 80, &crm.CrmCase{}, vnic)
	if err != nil {
		return err
	}

	counts := make(map[crm.CrmCaseStatus]int32)
	var totalResolutionDays int64
	var resolvedCount int32

	for _, c := range cases {
		counts[c.Status]++
		if (c.Status == crm.CrmCaseStatus_CRM_CASE_STATUS_RESOLVED ||
			c.Status == crm.CrmCaseStatus_CRM_CASE_STATUS_CLOSED) &&
			c.OpenedDate > 0 && c.ClosedDate > 0 {
			days := (c.ClosedDate - c.OpenedDate) / 86400
			totalResolutionDays += days
			resolvedCount++
		}
	}

	section := &fin.FinReportSection{
		Title:        "Case Resolution Summary",
		SectionTotal: &l8common.Money{Amount: 0, CurrencyId: "USD"},
	}

	for status, count := range counts {
		line := &fin.FinReportLine{
			AccountName: status.String(),
			Description: status.String(),
			Level:       count,
		}
		section.Lines = append(section.Lines, line)
	}

	// Add average resolution time
	var avgDays float64
	if resolvedCount > 0 {
		avgDays = float64(totalResolutionDays) / float64(resolvedCount)
	}
	section.Lines = append(section.Lines, &fin.FinReportLine{
		AccountName:     "Avg Resolution Time",
		Description:     fmt.Sprintf("%.1f days", avgDays),
		IsHeader:        true,
		VariancePercent: avgDays,
	})

	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = &l8common.Money{Amount: int64(len(cases)), CurrencyId: "USD"}
	report.RowCount = int32(len(section.Lines))
	return nil
}
