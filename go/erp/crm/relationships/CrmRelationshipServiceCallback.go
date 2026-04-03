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
package relationships

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/crm"
)

func newCrmRelationshipServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&crm.CrmRelationship{}, vnic).
		Require(func(v interface{}) string { return v.(*crm.CrmRelationship).RelationshipId }, "RelationshipId").
		Require(func(v interface{}) string { return v.(*crm.CrmRelationship).AccountId }, "AccountId").
		Enum(func(v interface{}) int32 { return int32(v.(*crm.CrmRelationship).RelationshipType) }, crm.CrmRelationshipType_name, "RelationshipType").
		DateAfter(func(v interface{}) int64 { return v.(*crm.CrmRelationship).EndDate }, func(v interface{}) int64 { return v.(*crm.CrmRelationship).StartDate }, "EndDate", "StartDate").
		Build()
}
