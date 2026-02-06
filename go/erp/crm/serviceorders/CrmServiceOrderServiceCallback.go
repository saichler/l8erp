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
package serviceorders

import (
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newCrmServiceOrderServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("CrmServiceOrder",
		func(e *crm.CrmServiceOrder) { common.GenerateID(&e.OrderId) },
		validate)
}

func validate(item *crm.CrmServiceOrder, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.OrderId, "OrderId"); err != nil {
		return err
	}
	return nil
}
