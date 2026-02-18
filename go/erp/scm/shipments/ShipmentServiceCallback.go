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
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/scm"
	"github.com/saichler/l8erp/go/erp/common"
)

func newShipmentServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[scm.ScmShipment]("ScmShipment",
		func(e *scm.ScmShipment) { common.GenerateID(&e.ShipmentId) }).
		StatusTransition(shipmentTransitions()).
		Require(func(e *scm.ScmShipment) string { return e.ShipmentId }, "ShipmentId").
		Enum(func(e *scm.ScmShipment) int32 { return int32(e.Status) }, scm.ScmShipmentStatus_name, "Status").
		OptionalMoney(func(e *scm.ScmShipment) *erp.Money { return e.FreightCost }, "FreightCost").
		Build()
}

func shipmentTransitions() *common.StatusTransitionConfig[scm.ScmShipment] {
	return &common.StatusTransitionConfig[scm.ScmShipment]{
		StatusGetter:  func(e *scm.ScmShipment) int32 { return int32(e.Status) },
		StatusSetter:  func(e *scm.ScmShipment, s int32) { e.Status = scm.ScmShipmentStatus(s) },
		FilterBuilder: func(e *scm.ScmShipment) *scm.ScmShipment {
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
