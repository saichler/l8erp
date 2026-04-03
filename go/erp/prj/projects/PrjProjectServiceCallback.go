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
package projects

import (
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/prj"
	common "github.com/saichler/l8erp/go/erp/common"
)

func newPrjProjectServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&prj.PrjProject{}, vnic).
		Compute(computeTaskSchedule).
		Compute(computeEarnedValue).
		Require(func(v interface{}) string { return v.(*prj.PrjProject).ProjectId }, "ProjectId").
		Enum(func(v interface{}) int32 { return int32(v.(*prj.PrjProject).BillingType) }, prj.PrjBillingType_name, "BillingType").
		Enum(func(v interface{}) int32 { return int32(v.(*prj.PrjProject).Priority) }, prj.PrjProjectPriority_name, "Priority").
		Enum(func(v interface{}) int32 { return int32(v.(*prj.PrjProject).ProjectType) }, prj.PrjProjectType_name, "ProjectType").
		Enum(func(v interface{}) int32 { return int32(v.(*prj.PrjProject).Status) }, prj.PrjProjectStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjProject).Budget }, "Budget").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*prj.PrjProject).ActualCost }, "ActualCost").
		DateAfter(func(v interface{}) int64 { return v.(*prj.PrjProject).EndDate }, func(v interface{}) int64 { return v.(*prj.PrjProject).StartDate }, "EndDate", "StartDate").
		DateAfter(func(v interface{}) int64 { return v.(*prj.PrjProject).ActualEndDate }, func(v interface{}) int64 { return v.(*prj.PrjProject).ActualStartDate }, "ActualEndDate", "ActualStartDate").
		Build()
}
