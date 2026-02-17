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
package items

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/scm"
)

func newItemServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[scm.ScmItem]("ScmItem",
		func(e *scm.ScmItem) { common.GenerateID(&e.ItemId) }).
		Require(func(e *scm.ScmItem) string { return e.ItemId }, "ItemId").
		Enum(func(e *scm.ScmItem) int32 { return int32(e.ItemType) }, scm.ScmItemType_name, "ItemType").
		Enum(func(e *scm.ScmItem) int32 { return int32(e.PlanningMethod) }, scm.ScmPlanningMethod_name, "PlanningMethod").
		Enum(func(e *scm.ScmItem) int32 { return int32(e.ValuationMethod) }, scm.ScmValuationMethod_name, "ValuationMethod").
		OptionalMoney(func(e *scm.ScmItem) *erp.Money { return e.UnitCost }, "UnitCost").
		OptionalMoney(func(e *scm.ScmItem) *erp.Money { return e.UnitPrice }, "UnitPrice").
		Build()
}
