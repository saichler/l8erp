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

package pickreleases

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
)

type PickReleaseServiceCallback struct{}

func newPickReleaseServiceCallback() *PickReleaseServiceCallback {
	return &PickReleaseServiceCallback{}
}

func (this *PickReleaseServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*sales.SalesPickRelease)
	if !ok {
		return nil, false, errors.New("invalid pick release type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.PickReleaseId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *PickReleaseServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *sales.SalesPickRelease, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.PickReleaseId, "PickReleaseId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(item.DeliveryOrderId, "DeliveryOrderId"); err != nil {
		return err
	}
	return nil
}
