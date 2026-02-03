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
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
)

type ReturnOrderServiceCallback struct{}

func newReturnOrderServiceCallback() *ReturnOrderServiceCallback {
	return &ReturnOrderServiceCallback{}
}

func (this *ReturnOrderServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*sales.SalesReturnOrder)
	if !ok {
		return nil, false, errors.New("invalid return order type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.ReturnOrderId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *ReturnOrderServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *sales.SalesReturnOrder, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.ReturnOrderId, "ReturnOrderId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(item.SalesOrderId, "SalesOrderId"); err != nil {
		return err
	}
	return nil
}
