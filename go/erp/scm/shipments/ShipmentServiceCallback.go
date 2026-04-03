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
package shipments

import (
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/scm"
	common "github.com/saichler/l8erp/go/erp/common"
)

func newShipmentServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&scm.ScmShipment{}, vnic).
		StatusTransition(shipmentTransitions()).
		Require(func(v interface{}) string { return v.(*scm.ScmShipment).ShipmentId }, "ShipmentId").
		Enum(func(v interface{}) int32 { return int32(v.(*scm.ScmShipment).Status) }, scm.ScmShipmentStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*scm.ScmShipment).FreightCost }, "FreightCost").
		Build()
}

func shipmentTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*scm.ScmShipment).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*scm.ScmShipment).Status = scm.ScmShipmentStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*scm.ScmShipment);
			return &scm.ScmShipment{ShipmentId: e.ShipmentId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 5},    // PLANNED → PICKED_UP, FAILED
			2: {3, 5},    // PICKED_UP → IN_TRANSIT, FAILED
			3: {4, 5},    // IN_TRANSIT → DELIVERED, FAILED
			5: {6},       // FAILED → RETURNED
		},
		StatusNames: scm.ScmShipmentStatus_name,
	}
}
