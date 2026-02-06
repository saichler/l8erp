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
package pickreleases

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/sales"
)

func newPickReleaseServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("SalesPickRelease",
		func(e *sales.SalesPickRelease) { common.GenerateID(&e.PickReleaseId) },
		validate)
}

func validate(item *sales.SalesPickRelease, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.PickReleaseId, "PickReleaseId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(item.DeliveryOrderId, "DeliveryOrderId"); err != nil {
		return err
	}
	return nil
}
