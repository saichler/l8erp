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
package blanketorders

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/scm"
)

func newBlanketOrderServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[scm.ScmBlanketOrder]("ScmBlanketOrder",
		func(e *scm.ScmBlanketOrder) { common.GenerateID(&e.BlanketOrderId) }).
		Require(func(e *scm.ScmBlanketOrder) string { return e.BlanketOrderId }, "BlanketOrderId").
		Require(func(e *scm.ScmBlanketOrder) string { return e.VendorId }, "VendorId").
		Enum(func(e *scm.ScmBlanketOrder) int32 { return int32(e.Status) }, scm.ScmPurchaseOrderStatus_name, "Status").
		OptionalMoney(func(e *scm.ScmBlanketOrder) *erp.Money { return e.MaxAmount }, "MaxAmount").
		OptionalMoney(func(e *scm.ScmBlanketOrder) *erp.Money { return e.UsedAmount }, "UsedAmount").
		DateAfter(func(e *scm.ScmBlanketOrder) int64 { return e.EndDate }, func(e *scm.ScmBlanketOrder) int64 { return e.StartDate }, "EndDate", "StartDate").
		Build()
}
