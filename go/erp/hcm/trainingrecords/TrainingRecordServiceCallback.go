// © 2025 Sharon Aicler (saichler@gmail.com)
//
// Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
// You may obtain a copy of the License at:
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package trainingrecords

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/courses"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type TrainingRecordServiceCallback struct {
}

func newTrainingRecordServiceCallback() *TrainingRecordServiceCallback {
	return &TrainingRecordServiceCallback{}
}

func (this *TrainingRecordServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.TrainingRecord)
	if !ok {
		return nil, false, errors.New("invalid training record type")
	}
	err := validateTrainingRecord(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *TrainingRecordServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateTrainingRecord(entity *hcm.TrainingRecord, vnic ifs.IVNic) error {
	if err := validateTrnRecRequiredFields(entity); err != nil {
		return err
	}
	if err := validateTrnRecEnums(entity); err != nil {
		return err
	}
	if err := validateTrnRecDates(entity); err != nil {
		return err
	}
	if err := validateTrnRecEmployee(entity, vnic); err != nil {
		return err
	}
	if err := validateTrnRecCourse(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateTrnRecRequiredFields(entity *hcm.TrainingRecord) error {
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateTrnRecEnums(entity *hcm.TrainingRecord) error {
	if err := common.ValidateEnum(int32(entity.TrainingType), hcm.TrainingType_name, "TrainingType"); err != nil {
		return err
	}
	return nil
}

func validateTrnRecDates(entity *hcm.TrainingRecord) error {
	if entity.CompletedDate != 0 && entity.ExpirationDate != 0 {
		if err := common.ValidateDateAfter(entity.ExpirationDate, entity.CompletedDate, "ExpirationDate", "CompletedDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateTrnRecEmployee(entity *hcm.TrainingRecord, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.EmployeeId,
		"Employee",
		employees.ServiceName,
		employees.ServiceArea,
		employees.Employees,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return employees.Employee(id, vnic) },
		hcm.Employee{EmployeeId: entity.EmployeeId},
		vnic,
	)
}

func validateTrnRecCourse(entity *hcm.TrainingRecord, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.CourseId,
		"Course",
		courses.ServiceName,
		courses.ServiceArea,
		courses.Courses,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return courses.Course(id, vnic) },
		hcm.Course{CourseId: entity.CourseId},
		vnic,
	)
}
