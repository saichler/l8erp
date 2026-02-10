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
package customeraddresses

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/ecom"
)

func newEcomCustomerAddressServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[ecom.EcomCustomerAddress]("EcomCustomerAddress",
		func(e *ecom.EcomCustomerAddress) { common.GenerateID(&e.AddressId) }).
		Require(func(e *ecom.EcomCustomerAddress) string { return e.AddressId }, "AddressId").
		Require(func(e *ecom.EcomCustomerAddress) string { return e.CustomerId }, "CustomerId").
		Build()
}
