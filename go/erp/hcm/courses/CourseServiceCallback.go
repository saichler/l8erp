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
package courses

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
)

func newCourseServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("Course",
		func(e *hcm.Course) { common.GenerateID(&e.CourseId) },
		validateCourse)
}

func validateCourse(entity *hcm.Course, vnic ifs.IVNic) error {
	if err := validateCourseRequiredFields(entity); err != nil {
		return err
	}
	if err := validateCourseEnums(entity); err != nil {
		return err
	}
	if err := validateCourseInstructor(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateCourseRequiredFields(entity *hcm.Course) error {
	if err := common.ValidateRequired(entity.CourseId, "CourseId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.Title, "Title"); err != nil {
		return err
	}
	return nil
}

func validateCourseEnums(entity *hcm.Course) error {
	if err := common.ValidateEnum(int32(entity.CourseType), hcm.CourseType_name, "CourseType"); err != nil {
		return err
	}
	if err := common.ValidateEnum(int32(entity.DeliveryMethod), hcm.CourseDeliveryMethod_name, "DeliveryMethod"); err != nil {
		return err
	}
	if err := common.ValidateEnum(int32(entity.Category), hcm.CourseCategory_name, "Category"); err != nil {
		return err
	}
	if err := common.ValidateEnum(int32(entity.Level), hcm.CourseLevel_name, "Level"); err != nil {
		return err
	}
	return nil
}

func validateCourseInstructor(entity *hcm.Course, vnic ifs.IVNic) error {
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
