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

// Report phases run LAST within their module: the POST triggers the module's
// server-side generator, which reads the tables the earlier phases populated.
// A report phase placed before them produces an empty report, not an error.

import (
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8erp/go/types/scm"
)

func generateFinReportsPhase(client *HCMClient, store *MockDataStore) error {
	r := generateFinReports(store)
	return runOp(client, "Financial Reports", "/erp/40/FinReport",
		&fin.FinReportList{List: r},
		extractIDs(r, func(v interface{}) string { return v.(*fin.FinReport).ReportId }),
		&store.FinReportIDs)
}

func generateHcmReportsPhase(client *HCMClient, store *MockDataStore) error {
	r := generateHcmReports(store)
	return runOp(client, "HCM Reports", "/erp/30/HcmReport",
		&hcm.HcmReportList{List: r},
		extractIDs(r, func(v interface{}) string { return v.(*hcm.HcmReport).ReportId }),
		&store.HcmReportIDs)
}

func generateScmReportsPhase(client *HCMClient, store *MockDataStore) error {
	r := generateScmReports(store)
	return runOp(client, "SCM Reports", "/erp/50/ScmReport",
		&scm.ScmReportList{List: r},
		extractIDs(r, func(v interface{}) string { return v.(*scm.ScmReport).ReportId }),
		&store.ScmReportIDs)
}

func generateMfgReportsPhase(client *HCMClient, store *MockDataStore) error {
	r := generateMfgReports(store)
	return runOp(client, "MFG Reports", "/erp/70/MfgReport",
		&mfg.MfgReportList{List: r},
		extractIDs(r, func(v interface{}) string { return v.(*mfg.MfgReport).ReportId }),
		&store.MfgReportIDs)
}

func generateSalesReportsPhase(client *HCMClient, store *MockDataStore) error {
	r := generateSalesReports(store)
	return runOp(client, "Sales Reports", "/erp/60/SalesRept",
		&sales.SalesReportList{List: r},
		extractIDs(r, func(v interface{}) string { return v.(*sales.SalesReport).ReportId }),
		&store.SalesReportIDs)
}

func generateCrmReportsPhase(client *HCMClient, store *MockDataStore) error {
	r := generateCrmReports(store)
	return runOp(client, "CRM Reports", "/erp/80/CrmReport",
		&crm.CrmReportList{List: r},
		extractIDs(r, func(v interface{}) string { return v.(*crm.CrmReport).ReportId }),
		&store.CrmReportIDs)
}

func generatePrjReportsPhase(client *HCMClient, store *MockDataStore) error {
	r := generatePrjReports(store)
	return runOp(client, "Project Reports", "/erp/90/PrjReport",
		&prj.PrjReportList{List: r},
		extractIDs(r, func(v interface{}) string { return v.(*prj.PrjReport).ReportId }),
		&store.PrjReportIDs)
}
