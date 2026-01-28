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
package salarygrades

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type SalaryGradeServiceCallback struct {
}

func newSalaryGradeServiceCallback() *SalaryGradeServiceCallback {
	return &SalaryGradeServiceCallback{}
}

func (this *SalaryGradeServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.SalaryGrade)
	if !ok {
		return nil, false, errors.New("invalid salary grade type")
	}
	err := validateSalGrade(entity)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *SalaryGradeServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateSalGrade(entity *hcm.SalaryGrade) error {
	if err := validateSalGradeRequiredFields(entity); err != nil {
		return err
	}
	return nil
}

func validateSalGradeRequiredFields(entity *hcm.SalaryGrade) error {
	if err := common.ValidateRequired(entity.Name, "Name"); err != nil {
		return err
	}
	return nil
}
