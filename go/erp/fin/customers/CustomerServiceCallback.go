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
package customers

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
)

func newCustomerServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[fin.Customer]("Customer",
		func(e *fin.Customer) { common.GenerateID(&e.CustomerId) }).
		Require(func(e *fin.Customer) string { return e.CustomerId }, "CustomerId").
		Require(func(e *fin.Customer) string { return e.Name }, "Name").
		Enum(func(e *fin.Customer) int32 { return int32(e.Status) }, fin.CustomerStatus_name, "Status").
		OptionalMoney(func(e *fin.Customer) *erp.Money { return e.CreditLimit }, "CreditLimit").
		Build()
}
