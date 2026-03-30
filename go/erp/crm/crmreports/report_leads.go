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

	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"

	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
)

func generateLeadConversion(report *fin.FinReport, vnic ifs.IVNic) error {
	leads, err := common.GetEntities("CrmLead", 80, &crm.CrmLead{}, vnic)
	if err != nil {
		return err
	}

	counts := make(map[crm.CrmLeadStatus]int32)
	for _, lead := range leads {
		counts[lead.Status]++
	}

	section := &fin.FinReportSection{
		Title:        "Lead Conversion Summary",
		SectionTotal: &erp.Money{Amount: 0, CurrencyId: "USD"},
	}

	total := int32(len(leads))
	for status, count := range counts {
		line := &fin.FinReportLine{
			AccountName: status.String(),
			Description: status.String(),
			Level:       count,
		}
		section.Lines = append(section.Lines, line)
	}

	// Add conversion rate line
	converted := counts[crm.CrmLeadStatus_CRM_LEAD_STATUS_CONVERTED]
	var conversionRate float64
	if total > 0 {
		conversionRate = float64(converted) / float64(total) * 100
	}
	section.Lines = append(section.Lines, &fin.FinReportLine{
		AccountName:     "Conversion Rate",
		Description:     fmt.Sprintf("%.1f%%", conversionRate),
		IsHeader:        true,
		VariancePercent: conversionRate,
	})

	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = &erp.Money{Amount: int64(total), CurrencyId: "USD"}
	report.RowCount = int32(len(section.Lines))
	return nil
}
