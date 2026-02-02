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

package courseenrollments

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/courses"
	"github.com/saichler/l8erp/go/erp/hcm/coursesessions"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type CourseEnrollmentServiceCallback struct {
}

func newCourseEnrollmentServiceCallback() *CourseEnrollmentServiceCallback {
	return &CourseEnrollmentServiceCallback{}
}

func (this *CourseEnrollmentServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.CourseEnrollment)
	if !ok {
		return nil, false, errors.New("invalid course enrollment type")
	}
	err := validateCourseEnrollment(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CourseEnrollmentServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCourseEnrollment(entity *hcm.CourseEnrollment, vnic ifs.IVNic) error {
	if err := validateEnrollmentRequiredFields(entity); err != nil {
		return err
	}
	if err := validateEnrollmentEnums(entity); err != nil {
		return err
	}
	if err := validateEnrollmentDates(entity); err != nil {
		return err
	}
	if err := validateEnrollmentBusinessRules(entity); err != nil {
		return err
	}
	if err := validateEnrollmentEmployee(entity, vnic); err != nil {
		return err
	}
	if err := validateEnrollmentCourse(entity, vnic); err != nil {
		return err
	}
	if err := validateEnrollmentSession(entity, vnic); err != nil {
		return err
	}
	if err := validateEnrollmentManager(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateEnrollmentRequiredFields(entity *hcm.CourseEnrollment) error {
	if err := common.ValidateRequired(entity.EnrollmentId, "EnrollmentId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.CourseId, "CourseId"); err != nil {
		return err
	}
	return nil
}

func validateEnrollmentEnums(entity *hcm.CourseEnrollment) error {
	if err := common.ValidateEnum(int32(entity.Status), hcm.CourseEnrollmentStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateEnrollmentDates(entity *hcm.CourseEnrollment) error {
	if entity.StartedDate != 0 && entity.CompletedDate != 0 {
		if err := common.ValidateDateAfter(entity.CompletedDate, entity.StartedDate, "CompletedDate", "StartedDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateEnrollmentBusinessRules(entity *hcm.CourseEnrollment) error {
	if entity.Status == hcm.CourseEnrollmentStatus_COURSE_ENROLLMENT_STATUS_COMPLETED {
		if entity.CompletedDate == 0 {
			return errors.New("CompletedDate is required when Status is COMPLETED")
		}
	}
	return nil
}

func validateEnrollmentEmployee(entity *hcm.CourseEnrollment, vnic ifs.IVNic) error {
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

func validateEnrollmentCourse(entity *hcm.CourseEnrollment, vnic ifs.IVNic) error {
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

func validateEnrollmentSession(entity *hcm.CourseEnrollment, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.SessionId,
		"Session",
		coursesessions.ServiceName,
		coursesessions.ServiceArea,
		coursesessions.CourseSessions,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return coursesessions.CourseSession(id, vnic) },
		hcm.CourseSession{SessionId: entity.SessionId},
		vnic,
	)
}

func validateEnrollmentManager(entity *hcm.CourseEnrollment, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.ManagerId,
		"Manager",
		employees.ServiceName,
		employees.ServiceArea,
		employees.Employees,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return employees.Employee(id, vnic) },
		hcm.Employee{EmployeeId: entity.ManagerId},
		vnic,
	)
}
