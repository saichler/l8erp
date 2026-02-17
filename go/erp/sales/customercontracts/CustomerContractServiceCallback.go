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
package customercontracts

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/sales"
)

func newCustomerContractServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[sales.SalesCustomerContract]("SalesCustomerContract",
		func(e *sales.SalesCustomerContract) { common.GenerateID(&e.ContractId) }).
		Require(func(e *sales.SalesCustomerContract) string { return e.ContractId }, "ContractId").
		Require(func(e *sales.SalesCustomerContract) string { return e.CustomerId }, "CustomerId").
		Enum(func(e *sales.SalesCustomerContract) int32 { return int32(e.Status) }, sales.SalesContractStatus_name, "Status").
		OptionalMoney(func(e *sales.SalesCustomerContract) *erp.Money { return e.ContractValue }, "ContractValue").
		DateAfter(func(e *sales.SalesCustomerContract) int64 { return e.EndDate }, func(e *sales.SalesCustomerContract) int64 { return e.StartDate }, "EndDate", "StartDate").
		Build()
}
