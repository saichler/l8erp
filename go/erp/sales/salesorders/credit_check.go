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
package salesorders

import (
	"fmt"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
)

// validateCreditLimit checks that confirming an order does not exceed the customer's credit limit.
func validateCreditLimit(v interface{}, vnic ifs.IVNic) error {
	order := v.(*sales.SalesOrder)
	if order.Status != sales.SalesOrderStatus_SALES_ORDER_STATUS_CONFIRMED {
		return nil
	}
	if order.CustomerId == "" || order.TotalAmount == nil {
		return nil
	}
	customer, err := common.GetEntity("Customer", 40, &fin.Customer{CustomerId: order.CustomerId}, vnic)
	if err != nil || customer == nil {
		return err
	}
	customerTyped := customer.(*fin.Customer)
	if customerTyped.CreditLimit == nil || customerTyped.CreditLimit.Amount == 0 {
		return nil // no credit limit set
	}
	// Sum all open orders for this customer
	openOrdersRaw, err := common.GetEntities("SalesOrder", 60, &sales.SalesOrder{CustomerId: order.CustomerId}, vnic)
	openOrders := make([]*sales.SalesOrder, 0, len(openOrdersRaw))
	for _, ri := range openOrdersRaw { openOrders = append(openOrders, ri.(*sales.SalesOrder)) }
	if err != nil {
		return err
	}
	openTotal := int64(0)
	for _, o := range openOrders {
		if o.SalesOrderId == order.SalesOrderId {
			continue // skip current order
		}
		s := int32(o.Status)
		if s == 6 || s == 7 { // DELIVERED or CANCELLED — skip
			continue
		}
		openTotal += common.MoneyAmount(o.TotalAmount)
	}
	orderAmount := common.MoneyAmount(order.TotalAmount)
	if openTotal+orderAmount > customerTyped.CreditLimit.Amount {
		return fmt.Errorf("credit limit exceeded for customer %s: open %d + order %d > limit %d",
			order.CustomerId, openTotal, orderAmount, customerTyped.CreditLimit.Amount)
	}
	return nil
}
