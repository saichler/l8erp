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
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/prj"
	"github.com/saichler/l8erp/go/erp/common"
)

func newPrjProjectServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[prj.PrjProject]("PrjProject",
		func(e *prj.PrjProject) { common.GenerateID(&e.ProjectId) }).
		Require(func(e *prj.PrjProject) string { return e.ProjectId }, "ProjectId").
		Enum(func(e *prj.PrjProject) int32 { return int32(e.BillingType) }, prj.PrjBillingType_name, "BillingType").
		Enum(func(e *prj.PrjProject) int32 { return int32(e.Priority) }, prj.PrjProjectPriority_name, "Priority").
		Enum(func(e *prj.PrjProject) int32 { return int32(e.ProjectType) }, prj.PrjProjectType_name, "ProjectType").
		Enum(func(e *prj.PrjProject) int32 { return int32(e.Status) }, prj.PrjProjectStatus_name, "Status").
		OptionalMoney(func(e *prj.PrjProject) *erp.Money { return e.Budget }, "Budget").
		OptionalMoney(func(e *prj.PrjProject) *erp.Money { return e.ActualCost }, "ActualCost").
		DateAfter(func(e *prj.PrjProject) int64 { return e.EndDate }, func(e *prj.PrjProject) int64 { return e.StartDate }, "EndDate", "StartDate").
		DateAfter(func(e *prj.PrjProject) int64 { return e.ActualEndDate }, func(e *prj.PrjProject) int64 { return e.ActualStartDate }, "ActualEndDate", "ActualStartDate").
		Build()
}
