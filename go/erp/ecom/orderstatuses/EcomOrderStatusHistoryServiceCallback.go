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
package orderstatuses

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/ecom"
)

func newEcomOrderStatusHistoryServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[ecom.EcomOrderStatusHistory]("EcomOrderStatusHistory",
		func(e *ecom.EcomOrderStatusHistory) { common.GenerateID(&e.StatusId) }).
		Require(func(e *ecom.EcomOrderStatusHistory) string { return e.StatusId }, "StatusId").
		Enum(func(e *ecom.EcomOrderStatusHistory) int32 { return int32(e.NewStatus) }, ecom.EcomOrderStatus_name, "NewStatus").
		Enum(func(e *ecom.EcomOrderStatusHistory) int32 { return int32(e.PreviousStatus) }, ecom.EcomOrderStatus_name, "PreviousStatus").
		Build()
}
