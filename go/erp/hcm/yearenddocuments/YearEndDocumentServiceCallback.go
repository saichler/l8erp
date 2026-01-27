package yearenddocuments

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type YearEndDocumentServiceCallback struct {
}

func newYearEndDocumentServiceCallback() *YearEndDocumentServiceCallback {
	return &YearEndDocumentServiceCallback{}
}

func (this *YearEndDocumentServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.YearEndDocument)
	if !ok {
		return nil, false, errors.New("invalid year end document type")
	}
	err := validateYrEndDoc(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *YearEndDocumentServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateYrEndDoc(entity *hcm.YearEndDocument, vnic ifs.IVNic) error {
	if err := validateYrEndDocRequiredFields(entity); err != nil {
		return err
	}
	if err := validateYrEndDocEnums(entity); err != nil {
		return err
	}
	if err := validateYrEndDocEmployee(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateYrEndDocRequiredFields(entity *hcm.YearEndDocument) error {
	if err := common.ValidateRequired(entity.EmployeeId, "EmployeeId"); err != nil {
		return err
	}
	return nil
}

func validateYrEndDocEnums(entity *hcm.YearEndDocument) error {
	if err := common.ValidateEnum(entity.DocumentType, hcm.YearEndDocumentType_name, "DocumentType"); err != nil {
		return err
	}
	if err := common.ValidateEnum(entity.Status, hcm.YearEndDocumentStatus_name, "Status"); err != nil {
		return err
	}
	return nil
}

func validateYrEndDocEmployee(entity *hcm.YearEndDocument, vnic ifs.IVNic) error {
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
