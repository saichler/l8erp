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

// Generates one report per report type for each of the seven report services.
//
// Only parameters are sent. The service callback dispatches on report_type and
// fills in sections/grand_total/row_count from that module's live tables, which
// is why every report type generated here must have a case in its module's
// generate<M>Report() -- an unhandled type fails the POST outright.
//
// The seven generators differ only in which enum they map onto, so the shared
// parameter set lives in one builder rather than being copied seven times
// (Maintainability's Second Instance Rule).

import (
	"fmt"
	"time"

	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8erp/go/types/scm"
)

// reportParams is the parameter set common to all seven report types.
type reportParams struct {
	ReportId     string
	PeriodName   string
	PeriodStart  int64
	PeriodEnd    int64
	CurrencyId   string
	DepartmentId string
	GeneratedBy  string
	Notes        string
}

// buildReportParams produces count parameter sets covering the trailing
// quarters, so every report carries a distinct, sortable period.
func buildReportParams(store *MockDataStore, prefix string, count int) []reportParams {
	now := time.Now()
	out := make([]reportParams, count)
	for i := 0; i < count; i++ {
		start := now.AddDate(0, -3*(count-i), 0)
		end := start.AddDate(0, 3, 0)
		out[i] = reportParams{
			ReportId:     fmt.Sprintf("%s-%03d", prefix, i+1),
			PeriodName:   fmt.Sprintf("Q%d %d", (int(start.Month())-1)/3+1, start.Year()),
			PeriodStart:  start.Unix(),
			PeriodEnd:    end.Unix(),
			CurrencyId:   pickRef(store.CurrencyIDs, i),
			DepartmentId: pickRef(store.DepartmentIDs, i),
			GeneratedBy:  pickRef(store.EmployeeIDs, i),
			Notes:        "Generated from mock data.",
		}
	}
	return out
}

func generateFinReports(store *MockDataStore) []*fin.FinReport {
	types := []fin.FinReportType{
		fin.FinReportType_FIN_REPORT_TYPE_BALANCE_SHEET,
		fin.FinReportType_FIN_REPORT_TYPE_INCOME_STATEMENT,
		fin.FinReportType_FIN_REPORT_TYPE_TRIAL_BALANCE,
		fin.FinReportType_FIN_REPORT_TYPE_BUDGET_VS_ACTUAL,
		fin.FinReportType_FIN_REPORT_TYPE_AGED_RECEIVABLES,
		fin.FinReportType_FIN_REPORT_TYPE_AGED_PAYABLES,
		fin.FinReportType_FIN_REPORT_TYPE_GL_DETAIL,
	}
	params := buildReportParams(store, "FINRPT", len(types))
	out := make([]*fin.FinReport, len(types))
	for i, t := range types {
		p := params[i]
		out[i] = &fin.FinReport{
			ReportId:       p.ReportId,
			ReportType:     t,
			PeriodName:     p.PeriodName,
			CurrencyId:     p.CurrencyId,
			DepartmentId:   p.DepartmentId,
			FiscalYearId:   pickRef(store.FiscalYearIDs, i),
			FiscalPeriodId: pickRef(store.FiscalPeriodIDs, i),
			AccountId:      pickRef(store.AccountIDs, i),
			AuditInfo:      createAuditInfo(),
		}
	}
	return out
}

func generateHcmReports(store *MockDataStore) []*hcm.HcmReport {
	types := []hcm.HcmReportType{
		hcm.HcmReportType_HCM_REPORT_TYPE_HEADCOUNT,
		hcm.HcmReportType_HCM_REPORT_TYPE_COMPENSATION_SUMMARY,
		hcm.HcmReportType_HCM_REPORT_TYPE_LEAVE_BALANCE,
		hcm.HcmReportType_HCM_REPORT_TYPE_PERFORMANCE_SUMMARY,
	}
	params := buildReportParams(store, "HCMRPT", len(types))
	out := make([]*hcm.HcmReport, len(types))
	for i, t := range types {
		p := params[i]
		out[i] = &hcm.HcmReport{
			ReportId: p.ReportId, ReportType: t, PeriodName: p.PeriodName,
			PeriodStart: p.PeriodStart, PeriodEnd: p.PeriodEnd,
			CurrencyId: p.CurrencyId, DepartmentId: p.DepartmentId,
			GeneratedBy: p.GeneratedBy, Notes: p.Notes, AuditInfo: createAuditInfo(),
		}
	}
	return out
}

func generateScmReports(store *MockDataStore) []*scm.ScmReport {
	types := []scm.ScmReportType{
		scm.ScmReportType_SCM_REPORT_TYPE_INVENTORY_VALUATION,
		scm.ScmReportType_SCM_REPORT_TYPE_PURCHASE_ORDER_SUMMARY,
		scm.ScmReportType_SCM_REPORT_TYPE_STOCK_BY_WAREHOUSE,
	}
	params := buildReportParams(store, "SCMRPT", len(types))
	out := make([]*scm.ScmReport, len(types))
	for i, t := range types {
		p := params[i]
		out[i] = &scm.ScmReport{
			ReportId: p.ReportId, ReportType: t, PeriodName: p.PeriodName,
			PeriodStart: p.PeriodStart, PeriodEnd: p.PeriodEnd,
			CurrencyId: p.CurrencyId, DepartmentId: p.DepartmentId,
			GeneratedBy: p.GeneratedBy, Notes: p.Notes, AuditInfo: createAuditInfo(),
		}
	}
	return out
}

func generateMfgReports(store *MockDataStore) []*mfg.MfgReport {
	types := []mfg.MfgReportType{
		mfg.MfgReportType_MFG_REPORT_TYPE_PRODUCTION_EFFICIENCY,
		mfg.MfgReportType_MFG_REPORT_TYPE_WORK_ORDER_STATUS,
		mfg.MfgReportType_MFG_REPORT_TYPE_SCRAP_RATE,
	}
	params := buildReportParams(store, "MFGRPT", len(types))
	out := make([]*mfg.MfgReport, len(types))
	for i, t := range types {
		p := params[i]
		out[i] = &mfg.MfgReport{
			ReportId: p.ReportId, ReportType: t, PeriodName: p.PeriodName,
			PeriodStart: p.PeriodStart, PeriodEnd: p.PeriodEnd,
			CurrencyId: p.CurrencyId, DepartmentId: p.DepartmentId,
			GeneratedBy: p.GeneratedBy, Notes: p.Notes, AuditInfo: createAuditInfo(),
		}
	}
	return out
}

func generateSalesReports(store *MockDataStore) []*sales.SalesReport {
	types := []sales.SalesReportType{
		sales.SalesReportType_SALES_REPORT_TYPE_SALES_BY_CUSTOMER,
		sales.SalesReportType_SALES_REPORT_TYPE_PIPELINE_SUMMARY,
		sales.SalesReportType_SALES_REPORT_TYPE_TERRITORY_PERFORMANCE,
	}
	params := buildReportParams(store, "SALRPT", len(types))
	out := make([]*sales.SalesReport, len(types))
	for i, t := range types {
		p := params[i]
		out[i] = &sales.SalesReport{
			ReportId: p.ReportId, ReportType: t, PeriodName: p.PeriodName,
			PeriodStart: p.PeriodStart, PeriodEnd: p.PeriodEnd,
			CurrencyId: p.CurrencyId, DepartmentId: p.DepartmentId,
			GeneratedBy: p.GeneratedBy, Notes: p.Notes, AuditInfo: createAuditInfo(),
		}
	}
	return out
}

func generateCrmReports(store *MockDataStore) []*crm.CrmReport {
	types := []crm.CrmReportType{
		crm.CrmReportType_CRM_REPORT_TYPE_LEAD_CONVERSION,
		crm.CrmReportType_CRM_REPORT_TYPE_OPPORTUNITY_PIPELINE,
		crm.CrmReportType_CRM_REPORT_TYPE_CASE_RESOLUTION,
	}
	params := buildReportParams(store, "CRMRPT", len(types))
	out := make([]*crm.CrmReport, len(types))
	for i, t := range types {
		p := params[i]
		out[i] = &crm.CrmReport{
			ReportId: p.ReportId, ReportType: t, PeriodName: p.PeriodName,
			PeriodStart: p.PeriodStart, PeriodEnd: p.PeriodEnd,
			CurrencyId: p.CurrencyId, DepartmentId: p.DepartmentId,
			GeneratedBy: p.GeneratedBy, Notes: p.Notes, AuditInfo: createAuditInfo(),
		}
	}
	return out
}

func generatePrjReports(store *MockDataStore) []*prj.PrjReport {
	types := []prj.PrjReportType{
		prj.PrjReportType_PRJ_REPORT_TYPE_PROJECT_BUDGET,
		prj.PrjReportType_PRJ_REPORT_TYPE_RESOURCE_UTILIZATION,
		prj.PrjReportType_PRJ_REPORT_TYPE_MILESTONE_TRACKING,
	}
	params := buildReportParams(store, "PRJRPT", len(types))
	out := make([]*prj.PrjReport, len(types))
	for i, t := range types {
		p := params[i]
		out[i] = &prj.PrjReport{
			ReportId: p.ReportId, ReportType: t, PeriodName: p.PeriodName,
			PeriodStart: p.PeriodStart, PeriodEnd: p.PeriodEnd,
			CurrencyId: p.CurrencyId, DepartmentId: p.DepartmentId,
			GeneratedBy: p.GeneratedBy, Notes: p.Notes, AuditInfo: createAuditInfo(),
		}
	}
	return out
}
