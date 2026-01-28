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
package holidays

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type HolidayServiceCallback struct {
}

func newHolidayServiceCallback() *HolidayServiceCallback {
	return &HolidayServiceCallback{}
}

func (this *HolidayServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.Holiday)
	if !ok {
		return nil, false, errors.New("invalid holiday type")
	}
	err := validateHoliday(entity)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *HolidayServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateHoliday(entity *hcm.Holiday) error {
	if err := validateHolidayRequiredFields(entity); err != nil {
		return err
	}
	if err := validateHolidayEnums(entity); err != nil {
		return err
	}
	return nil
}

func validateHolidayRequiredFields(entity *hcm.Holiday) error {
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}

func validateHolidayEnums(entity *hcm.Holiday) error {
	if err := common.ValidateEnum(entity.HolidayType, hcm.HolidayType_name, "HolidayType"); err != nil {
		return err
	}
	return nil
}
