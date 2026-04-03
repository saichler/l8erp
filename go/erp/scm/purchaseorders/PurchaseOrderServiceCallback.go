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
package purchaseorders

import (
	"reflect"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/scm"
)


func toSlice(slice interface{}) []interface{} {
	v := reflect.ValueOf(slice)
	result := make([]interface{}, v.Len())
	for i := 0; i < v.Len(); i++ {
		result[i] = v.Index(i).Interface()
	}
	return result
}

func newPurchaseOrderServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&scm.ScmPurchaseOrder{}, vnic).
		StatusTransition(purchaseOrderTransitions()).
		Compute(computePurchaseOrderTotals).
		Require(func(v interface{}) string { return v.(*scm.ScmPurchaseOrder).PurchaseOrderId }, "PurchaseOrderId").
		Require(func(v interface{}) string { return v.(*scm.ScmPurchaseOrder).VendorId }, "VendorId").
		Enum(func(v interface{}) int32 { return int32(v.(*scm.ScmPurchaseOrder).Status) }, scm.ScmPurchaseOrderStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*scm.ScmPurchaseOrder).TotalAmount }, "TotalAmount").
		Build()
}

func computePurchaseOrderTotals(v interface{}) error {
	po := v.(*scm.ScmPurchaseOrder)
	for _, line := range po.Lines {
		if line.UnitPrice != nil {
			line.TotalPrice = &l8common.Money{
				Amount:     int64(line.Quantity * float64(line.UnitPrice.Amount)),
				CurrencyId: line.UnitPrice.CurrencyId,
			}
		}
	}
	po.TotalAmount = common.SumLineMoney(toSlice(po.Lines), func(v interface{}) *l8common.Money { return v.(*scm.ScmPurchaseOrderLine).TotalPrice })
	return nil
}

func purchaseOrderTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*scm.ScmPurchaseOrder).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*scm.ScmPurchaseOrder).Status = scm.ScmPurchaseOrderStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*scm.ScmPurchaseOrder);
			return &scm.ScmPurchaseOrder{PurchaseOrderId: e.PurchaseOrderId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 7},    // DRAFT → APPROVED, CANCELLED
			2: {3, 7},    // APPROVED → SENT, CANCELLED
			3: {4, 5, 7}, // SENT → PARTIALLY_RECEIVED, RECEIVED, CANCELLED
			4: {5, 7},    // PARTIALLY_RECEIVED → RECEIVED, CANCELLED
			5: {6},       // RECEIVED → CLOSED
		},
		StatusNames: scm.ScmPurchaseOrderStatus_name,
	}
}
