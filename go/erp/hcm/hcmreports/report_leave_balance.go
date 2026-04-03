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

func leaveTypeName(t hcm.LeaveType) string {
	switch t {
	case hcm.LeaveType_LEAVE_TYPE_PTO:
		return "PTO"
	case hcm.LeaveType_LEAVE_TYPE_VACATION:
		return "Vacation"
	case hcm.LeaveType_LEAVE_TYPE_SICK:
		return "Sick"
	case hcm.LeaveType_LEAVE_TYPE_PERSONAL:
		return "Personal"
	case hcm.LeaveType_LEAVE_TYPE_BEREAVEMENT:
		return "Bereavement"
	case hcm.LeaveType_LEAVE_TYPE_JURY_DUTY:
		return "Jury Duty"
	case hcm.LeaveType_LEAVE_TYPE_MILITARY:
		return "Military"
	case hcm.LeaveType_LEAVE_TYPE_FMLA:
		return "FMLA"
	case hcm.LeaveType_LEAVE_TYPE_PARENTAL:
		return "Parental"
	case hcm.LeaveType_LEAVE_TYPE_MATERNITY:
		return "Maternity"
	case hcm.LeaveType_LEAVE_TYPE_PATERNITY:
		return "Paternity"
	case hcm.LeaveType_LEAVE_TYPE_SABBATICAL:
		return "Sabbatical"
	case hcm.LeaveType_LEAVE_TYPE_UNPAID:
		return "Unpaid"
	case hcm.LeaveType_LEAVE_TYPE_ADMINISTRATIVE:
		return "Administrative"
	case hcm.LeaveType_LEAVE_TYPE_VOLUNTEER:
		return "Volunteer"
	default:
		return "Other"
	}
}

func generateLeaveBalanceSummary(report *fin.FinReport, vnic ifs.IVNic) error {
	balances, err := common.GetEntities("LeaveBal", 30, &hcm.LeaveBalance{}, vnic)
	if err != nil {
		return err
	}

	currencyId := report.CurrencyId

	type leaveStats struct {
		employees int32
		accrued   float64
		used      float64
		available float64
	}

	byType := make(map[hcm.LeaveType]*leaveStats)
	for _, b := range balances {
		st, ok := byType[b.LeaveType]
		if !ok {
			st = &leaveStats{}
			byType[b.LeaveType] = st
		}
		st.employees++
		st.accrued += b.Accrued
		st.used += b.Used
		st.available += b.Available
	}

	section := &fin.FinReportSection{
		Title:        "Leave Balances by Type",
		SectionTotal: newMoney(0, currencyId),
	}

	var totalAvailable float64
	for lt, st := range byType {
		line := &fin.FinReportLine{
			AccountName: leaveTypeName(lt),
			Debit:       newMoney(int64(st.accrued*100), currencyId),
			Credit:      newMoney(int64(st.used*100), currencyId),
			Balance:     newMoney(int64(st.available*100), currencyId),
			Level:       st.employees,
			Description: "hours",
		}
		section.Lines = append(section.Lines, line)
		totalAvailable += st.available
	}
	section.SectionTotal = newMoney(int64(totalAvailable*100), currencyId)

	report.Sections = []*fin.FinReportSection{section}
	report.GrandTotal = section.SectionTotal
	report.RowCount = countLines(report.Sections)
	return nil
}
