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
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/scm"
)

func newBlanketOrderServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&scm.ScmBlanketOrder{}, vnic).
		Require(func(v interface{}) string { return v.(*scm.ScmBlanketOrder).BlanketOrderId }, "BlanketOrderId").
		Require(func(v interface{}) string { return v.(*scm.ScmBlanketOrder).VendorId }, "VendorId").
		Enum(func(v interface{}) int32 { return int32(v.(*scm.ScmBlanketOrder).Status) }, scm.ScmPurchaseOrderStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*scm.ScmBlanketOrder).MaxAmount }, "MaxAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*scm.ScmBlanketOrder).UsedAmount }, "UsedAmount").
		DateAfter(func(v interface{}) int64 { return v.(*scm.ScmBlanketOrder).EndDate }, func(v interface{}) int64 { return v.(*scm.ScmBlanketOrder).StartDate }, "EndDate", "StartDate").
		Build()
}
