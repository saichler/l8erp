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
package leavepolicies

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type LeavePolicyServiceCallback struct {
}

func newLeavePolicyServiceCallback() *LeavePolicyServiceCallback {
	return &LeavePolicyServiceCallback{}
}

func (this *LeavePolicyServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.LeavePolicy)
	if !ok {
		return nil, false, errors.New("invalid leave policy type")
	}
	err := validateLeavePol(entity)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *LeavePolicyServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateLeavePol(entity *hcm.LeavePolicy) error {
	if err := validateLeavePolEnums(entity); err != nil {
		return err
	}
	if err := validateLeavePolDates(entity); err != nil {
		return err
	}
	return nil
}

func validateLeavePolEnums(entity *hcm.LeavePolicy) error {
	if err := common.ValidateEnum(entity.LeaveType, hcm.LeaveType_name, "LeaveType"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.AccrualMethod, hcm.AccrualMethod_name, "AccrualMethod"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.AccrualFrequency, hcm.AccrualFrequency_name, "AccrualFrequency"); err != nil {
		return err
	}
	return nil
}

func validateLeavePolDates(entity *hcm.LeavePolicy) error {
	if entity.EffectiveDate != 0 && entity.EndDate != 0 {
		if err := common.ValidateDateAfter(entity.EndDate, entity.EffectiveDate, "EndDate", "EffectiveDate"); err != nil {
			return err
		}
	}
	return nil
}
