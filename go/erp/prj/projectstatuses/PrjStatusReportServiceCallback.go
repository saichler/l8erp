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
package projectstatuses

import (
	"github.com/saichler/l8erp/go/types/prj"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newPrjStatusReportServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&prj.PrjStatusReport{}, vnic).
		Require(func(v interface{}) string { return v.(*prj.PrjStatusReport).StatusId }, "StatusId").
		Enum(func(v interface{}) int32 { return int32(v.(*prj.PrjStatusReport).BudgetHealth) }, prj.PrjHealthIndicator_name, "BudgetHealth").
		Enum(func(v interface{}) int32 { return int32(v.(*prj.PrjStatusReport).OverallHealth) }, prj.PrjHealthIndicator_name, "OverallHealth").
		Enum(func(v interface{}) int32 { return int32(v.(*prj.PrjStatusReport).ResourceHealth) }, prj.PrjHealthIndicator_name, "ResourceHealth").
		Enum(func(v interface{}) int32 { return int32(v.(*prj.PrjStatusReport).ScheduleHealth) }, prj.PrjHealthIndicator_name, "ScheduleHealth").
		Enum(func(v interface{}) int32 { return int32(v.(*prj.PrjStatusReport).ScopeHealth) }, prj.PrjHealthIndicator_name, "ScopeHealth").
		Build()
}
