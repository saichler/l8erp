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
package cobraevents

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type COBRAEventServiceCallback struct {
}

func newCOBRAEventServiceCallback() *COBRAEventServiceCallback {
	return &COBRAEventServiceCallback{}
}

func (this *COBRAEventServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.COBRAEvent)
	if !ok {
		return nil, false, errors.New("invalid COBRA event type")
	}
	err := validateCOBRAEvt(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *COBRAEventServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateCOBRAEvt(entity *hcm.COBRAEvent, vnic ifs.IVNic) error {
	if err := validateCOBRAEvtRequiredFields(entity); err != nil {
		return err
	}
	if err := validateCOBRAEvtEnums(entity); err != nil {
		return err
	}
	if err := validateCOBRAEvtEmployee(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateCOBRAEvtRequiredFields(entity *hcm.COBRAEvent) error {
	if err := common.ValidateRequired(entity.CobraEventId, "CobraEventId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateCOBRAEvtEnums(entity *hcm.COBRAEvent) error {
	if err := common.ValidateEnum(entity.EventType, hcm.COBRAEventType_name, "EventType"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Status, hcm.COBRAStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateCOBRAEvtEmployee(entity *hcm.COBRAEvent, vnic ifs.IVNic) error {
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
