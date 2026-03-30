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
	"fmt"

	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

func generateHeadcount(report *fin.FinReport, vnic ifs.IVNic) error {
	employees, err := common.GetEntities("Employee", 30, &hcm.Employee{}, vnic)
	if err != nil {
		return err
	}
	departments, err := common.GetEntities("Dept", 30, &hcm.Department{}, vnic)
	if err != nil {
		return err
	}

	deptNames := make(map[string]string)
	for _, d := range departments {
		deptNames[d.DepartmentId] = d.Name
	}

	// Group employees by department
	deptCounts := make(map[string]int32)
	for _, emp := range employees {
		if emp.EmploymentStatus == hcm.EmploymentStatus_EMPLOYMENT_STATUS_TERMINATED {
			continue
		}
		deptCounts[emp.DepartmentId]++
	}

	currencyId := report.CurrencyId
	section := &fin.FinReportSection{
		Title:        "Headcount by Department",
		SectionTotal: newMoney(0, currencyId),
	}

	var totalHeadcount int32
	for deptId, count := range deptCounts {
		name := deptNames[deptId]
		if name == "" {
			name = fmt.Sprintf("Department %s", deptId)
		}
		line := &fin.FinReportLine{
			AccountId:   deptId,
			AccountName: name,
			Balance:     newMoney(int64(count), currencyId),
		}
		section.Lines = append(section.Lines, line)
		totalHeadcount += count
	}
	section.SectionTotal = newMoney(int64(totalHeadcount), currencyId)

	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = newMoney(int64(totalHeadcount), currencyId)
	report.RowCount = countLines(report.Sections)
	return nil
}
