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

package qualityinspections

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/mfg"
	"github.com/saichler/l8types/go/ifs"
)

type MfgQualityInspectionServiceCallback struct{}

func newMfgQualityInspectionServiceCallback() *MfgQualityInspectionServiceCallback {
	return &MfgQualityInspectionServiceCallback{}
}

func (this *MfgQualityInspectionServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*mfg.MfgQualityInspection)
	if !ok {
		return nil, false, errors.New("invalid MfgQualityInspection type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.InspectionId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *MfgQualityInspectionServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *mfg.MfgQualityInspection, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.InspectionId, "InspectionId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(item.ItemId, "ItemId"); err != nil {
		return err
	}
	return nil
}
