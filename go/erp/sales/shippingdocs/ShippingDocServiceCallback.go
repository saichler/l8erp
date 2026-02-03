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

package shippingdocs

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
)

type ShippingDocServiceCallback struct{}

func newShippingDocServiceCallback() *ShippingDocServiceCallback {
	return &ShippingDocServiceCallback{}
}

func (this *ShippingDocServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*sales.SalesShippingDoc)
	if !ok {
		return nil, false, errors.New("invalid shipping doc type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.DocId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *ShippingDocServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *sales.SalesShippingDoc, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.DocId, "DocId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(item.DeliveryOrderId, "DeliveryOrderId"); err != nil {
		return err
	}
	return nil
}
