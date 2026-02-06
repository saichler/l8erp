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
package purchaseinvoices

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/fin"
)

func newPurchaseInvoiceServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("PurchaseInvoice",
		func(e *fin.PurchaseInvoice) { common.GenerateID(&e.InvoiceId) },
		validate)
}

func validate(purchaseInvoice *fin.PurchaseInvoice, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(purchaseInvoice.InvoiceId, "InvoiceId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(purchaseInvoice.VendorId, "VendorId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(purchaseInvoice.InvoiceNumber, "InvoiceNumber"); err != nil {
		return err
	}
	return nil
}
