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

package workorderops

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8types/go/ifs"
)

type MfgWorkOrderOpServiceCallback struct{}

func newMfgWorkOrderOpServiceCallback() *MfgWorkOrderOpServiceCallback {
	return &MfgWorkOrderOpServiceCallback{}
}

func (this *MfgWorkOrderOpServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*mfg.MfgWorkOrderOp)
	if !ok {
		return nil, false, errors.New("invalid MfgWorkOrderOp type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.OperationId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *MfgWorkOrderOpServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *mfg.MfgWorkOrderOp, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.OperationId, "OperationId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(item.WorkOrderId, "WorkOrderId"); err != nil {
		return err
	}
	return nil
}
