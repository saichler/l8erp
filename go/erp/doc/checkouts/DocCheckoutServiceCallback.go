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
package checkouts

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/doc"
)

func newDocCheckoutServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("DocCheckout",
		func(e *doc.DocCheckout) { common.GenerateID(&e.CheckoutId) },
		validateDocCheckout)
}

func validateDocCheckout(item *doc.DocCheckout, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.CheckoutId, "CheckoutId"); err != nil {
		return err
	}
	return nil
}
