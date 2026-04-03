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
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

func compensationTypeName(t hcm.CompensationType) string {
	switch t {
	case hcm.CompensationType_COMPENSATION_TYPE_SALARY:
		return "Salary"
	case hcm.CompensationType_COMPENSATION_TYPE_HOURLY:
		return "Hourly"
	case hcm.CompensationType_COMPENSATION_TYPE_COMMISSION:
		return "Commission"
	case hcm.CompensationType_COMPENSATION_TYPE_PIECE_RATE:
		return "Piece Rate"
	default:
		return "Other"
	}
}

func generateCompensationSummary(report *fin.FinReport, vnic ifs.IVNic) error {
	compsRaw, err := common.GetEntities("EmpComp", 30, &hcm.EmployeeCompensation{}, vnic)
	comps := make([]*hcm.EmployeeCompensation, 0, len(compsRaw))
	for _, ri := range compsRaw { comps = append(comps, ri.(*hcm.EmployeeCompensation)) }
	if err != nil {
		return err
	}

	currencyId := report.CurrencyId

	type compStats struct {
		count int32
		total int64
		min   int64
		max   int64
	}

	byType := make(map[hcm.CompensationType]*compStats)
	for _, c := range comps {
		amt := moneyAmount(c.BaseSalary)
		st, ok := byType[c.CompensationType]
		if !ok {
			st = &compStats{min: amt, max: amt}
			byType[c.CompensationType] = st
		}
		st.count++
		st.total += amt
		if amt < st.min {
			st.min = amt
		}
		if amt > st.max {
			st.max = amt
		}
	}

	section := &fin.FinReportSection{
		Title:        "Compensation by Type",
		SectionTotal: newMoney(0, currencyId),
	}

	for ct, st := range byType {
		avg := int64(0)
		if st.count > 0 {
			avg = st.total / int64(st.count)
		}
		line := &fin.FinReportLine{
			AccountName: compensationTypeName(ct),
			Balance:     newMoney(st.total, currencyId),
			Debit:       newMoney(avg, currencyId),
			Credit:      newMoney(st.min, currencyId),
			PriorPeriod: newMoney(st.max, currencyId),
			Description: "count",
		}
		line.Level = st.count
		section.Lines = append(section.Lines, line)
		section.SectionTotal = addMoney(section.SectionTotal, line.Balance)
	}

	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = section.SectionTotal
	report.RowCount = countLines(report.Sections)
	return nil
}
