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
package returnorders

import (
	"reflect"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/sales"
)


func toSlice(slice interface{}) []interface{} {
	v := reflect.ValueOf(slice)
	result := make([]interface{}, v.Len())
	for i := 0; i < v.Len(); i++ {
		result[i] = v.Index(i).Interface()
	}
	return result
}

func newReturnOrderServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&sales.SalesReturnOrder{}, vnic).
		StatusTransition(returnOrderTransitions()).
		Compute(computeReturnOrderTotals).
		Require(func(v interface{}) string { return v.(*sales.SalesReturnOrder).ReturnOrderId }, "ReturnOrderId").
		Require(func(v interface{}) string { return v.(*sales.SalesReturnOrder).SalesOrderId }, "SalesOrderId").
		Require(func(v interface{}) string { return v.(*sales.SalesReturnOrder).CustomerId }, "CustomerId").
		Enum(func(v interface{}) int32 { return int32(v.(*sales.SalesReturnOrder).Status) }, sales.SalesReturnStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*sales.SalesReturnOrder).RefundAmount }, "RefundAmount").
		Build()
}

func computeReturnOrderTotals(v interface{}) error {
	o := v.(*sales.SalesReturnOrder)
	o.RefundAmount = common.SumLineMoney(toSlice(o.Lines), func(v interface{}) *l8common.Money { return v.(*sales.SalesReturnOrderLine).LineTotal })
	return nil
}

func returnOrderTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*sales.SalesReturnOrder).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*sales.SalesReturnOrder).Status = sales.SalesReturnStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*sales.SalesReturnOrder);
			return &sales.SalesReturnOrder{ReturnOrderId: e.ReturnOrderId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 6},    // REQUESTED → APPROVED, REJECTED
			2: {3, 6},    // APPROVED → RECEIVED, REJECTED
			3: {4},       // RECEIVED → INSPECTED
			4: {5, 6},    // INSPECTED → PROCESSED, REJECTED
		},
		StatusNames: sales.SalesReturnStatus_name,
	}
}
