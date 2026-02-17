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
package servicecontracts

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/crm"
)

func newCrmServiceContractServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[crm.CrmServiceContract]("CrmServiceContract",
		func(e *crm.CrmServiceContract) { common.GenerateID(&e.ContractId) }).
		Require(func(e *crm.CrmServiceContract) string { return e.ContractId }, "ContractId").
		Require(func(e *crm.CrmServiceContract) string { return e.AccountId }, "AccountId").
		Enum(func(e *crm.CrmServiceContract) int32 { return int32(e.ContractType) }, crm.CrmContractType_name, "ContractType").
		Enum(func(e *crm.CrmServiceContract) int32 { return int32(e.Status) }, crm.CrmContractStatus_name, "Status").
		OptionalMoney(func(e *crm.CrmServiceContract) *erp.Money { return e.ContractValue }, "ContractValue").
		DateAfter(func(e *crm.CrmServiceContract) int64 { return e.EndDate }, func(e *crm.CrmServiceContract) int64 { return e.StartDate }, "EndDate", "StartDate").
		Build()
}
