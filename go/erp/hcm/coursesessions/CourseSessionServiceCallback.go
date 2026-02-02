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

package coursesessions

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/courses"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type CourseSessionServiceCallback struct {
}

func newCourseSessionServiceCallback() *CourseSessionServiceCallback {
	return &CourseSessionServiceCallback{}
}

func (this *CourseSessionServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.CourseSession)
	if !ok {
		return nil, false, errors.New("invalid course session type")
	}
	err := validateCourseSession(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CourseSessionServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCourseSession(entity *hcm.CourseSession, vnic ifs.IVNic) error {
	if err := validateSessionRequiredFields(entity); err != nil {
		return err
	}
	if err := validateSessionEnums(entity); err != nil {
		return err
	}
	if err := validateSessionDates(entity); err != nil {
		return err
	}
	if err := validateSessionCourse(entity, vnic); err != nil {
		return err
	}
	if err := validateSessionInstructor(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateSessionRequiredFields(entity *hcm.CourseSession) error {
	if err := common.ValidateRequired(entity.SessionId, "SessionId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.CourseId, "CourseId"); err != nil {
		return err
	}
	return nil
}

func validateSessionEnums(entity *hcm.CourseSession) error {
	if err := common.ValidateEnum(int32(entity.Status), hcm.SessionStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateSessionDates(entity *hcm.CourseSession) error {
	if entity.StartDate != 0 && entity.EndDate != 0 {
		if err := common.ValidateDateAfter(entity.EndDate, entity.StartDate, "EndDate", "StartDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateSessionCourse(entity *hcm.CourseSession, vnic ifs.IVNic) error {
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

func validateSessionInstructor(entity *hcm.CourseSession, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.InstructorId,
		"Instructor",
		employees.ServiceName,
		employees.ServiceArea,
		employees.Employees,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return employees.Employee(id, vnic) },
		hcm.Employee{EmployeeId: entity.InstructorId},
		vnic,
	)
}
