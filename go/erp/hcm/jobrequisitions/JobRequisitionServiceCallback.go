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
package jobrequisitions

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/departments"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type JobRequisitionServiceCallback struct {
}

func newJobRequisitionServiceCallback() *JobRequisitionServiceCallback {
	return &JobRequisitionServiceCallback{}
}

func (this *JobRequisitionServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.JobRequisition)
	if !ok {
		return nil, false, errors.New("invalid job requisition type")
	}
	err := validateJobReq(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *JobRequisitionServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateJobReq(entity *hcm.JobRequisition, vnic ifs.IVNic) error {
	if err := validateJobReqEnums(entity); err != nil {
		return err
	}
	if err := validateJobReqDepartment(entity, vnic); err != nil {
		return err
	}
	if err := validateJobReqHiringManager(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateJobReqEnums(entity *hcm.JobRequisition) error {
	if err := common.ValidateRequired(entity.RequisitionId, "RequisitionId"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Status, hcm.RequisitionStatus_name, "Status"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.RequisitionType, hcm.RequisitionType_name, "RequisitionType"); err != nil {
		return err
	}
	return nil
}

func validateJobReqDepartment(entity *hcm.JobRequisition, vnic ifs.IVNic) error {
	if entity.DepartmentId == "" {
		return nil
	}
	return common.ValidateReference(
		entity.DepartmentId,
		"Department",
		departments.ServiceName,
		departments.ServiceArea,
		departments.Departments,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return departments.Department(id, vnic) },
		hcm.Department{DepartmentId: entity.DepartmentId},
		vnic,
	)
}

func validateJobReqHiringManager(entity *hcm.JobRequisition, vnic ifs.IVNic) error {
	if entity.HiringManagerId == "" {
		return nil
	}
	return common.ValidateReference(
		entity.HiringManagerId,
		"Employee",
		employees.ServiceName,
		employees.ServiceArea,
		employees.Employees,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return employees.Employee(id, vnic) },
		hcm.Employee{EmployeeId: entity.HiringManagerId},
		vnic,
	)
}
