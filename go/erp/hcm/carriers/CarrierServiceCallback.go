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
package carriers

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type CarrierServiceCallback struct {
}

func newCarrierServiceCallback() *CarrierServiceCallback {
	return &CarrierServiceCallback{}
}

func (this *CarrierServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.Carrier)
	if !ok {
		return nil, false, errors.New("invalid carrier type")
	}
	err := validateCarrier(entity)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CarrierServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCarrier(entity *hcm.Carrier) error {
	if err := validateCarrierRequiredFields(entity); err != nil {
		return err
	}
	if err := validateCarrierEnums(entity); err != nil {
		return err
	}
	return nil
}

func validateCarrierRequiredFields(entity *hcm.Carrier) error {
	if err := common.ValidateRequired(entity.CarrierId, "CarrierId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}

func validateCarrierEnums(entity *hcm.Carrier) error {
	if err := common.ValidateEnum(entity.CarrierType, hcm.CarrierType_name, "CarrierType"); err != nil {
		return err
	}
	return nil
}
