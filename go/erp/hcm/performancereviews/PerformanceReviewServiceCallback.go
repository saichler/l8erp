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
package performancereviews

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type PerformanceReviewServiceCallback struct {
}

func newPerformanceReviewServiceCallback() *PerformanceReviewServiceCallback {
	return &PerformanceReviewServiceCallback{}
}

func (this *PerformanceReviewServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.PerformanceReview)
	if !ok {
		return nil, false, errors.New("invalid performance review type")
	}
	err := validatePerfRevw(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *PerformanceReviewServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validatePerfRevw(entity *hcm.PerformanceReview, vnic ifs.IVNic) error {
	if err := validatePerfRevwRequiredFields(entity); err != nil {
		return err
	}
	if err := validatePerfRevwEnums(entity); err != nil {
		return err
	}
	if err := validatePerfRevwDates(entity); err != nil {
		return err
	}
	if err := validatePerfRevwEmployee(entity, vnic); err != nil {
		return err
	}
	if err := validatePerfRevwReviewer(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validatePerfRevwRequiredFields(entity *hcm.PerformanceReview) error {
	if err := common.ValidateRequired(entity.ReviewId, "ReviewId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.ReviewerId, "ReviewerId"); err != nil {
		return err
	}
	return nil
}

func validatePerfRevwEnums(entity *hcm.PerformanceReview) error {
	if err := common.ValidateEnum(entity.Status, hcm.PerformanceReviewStatus_name, "Status"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.ReviewType, hcm.ReviewType_name, "ReviewType"); err != nil {
		return err
	}
	return nil
}

func validatePerfRevwDates(entity *hcm.PerformanceReview) error {
	if entity.ManagerSubmittedDate != 0 && entity.HrApprovedDate != 0 {
		if err := common.ValidateDateAfter(entity.HrApprovedDate, entity.ManagerSubmittedDate, "HrApprovedDate", "ManagerSubmittedDate"); err != nil {
			return err
		}
	}
	return nil
}

func validatePerfRevwEmployee(entity *hcm.PerformanceReview, vnic ifs.IVNic) error {
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

func validatePerfRevwReviewer(entity *hcm.PerformanceReview, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.ReviewerId,
		"Employee",
		employees.ServiceName,
		employees.ServiceArea,
		employees.Employees,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return employees.Employee(id, vnic) },
		hcm.Employee{EmployeeId: entity.ReviewerId},
		vnic,
	)
}
