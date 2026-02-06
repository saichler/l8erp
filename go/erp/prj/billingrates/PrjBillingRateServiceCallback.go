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
package billingrates

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/prj"
)

func newPrjBillingRateServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("PrjBillingRate",
		func(e *prj.PrjBillingRate) { common.GenerateID(&e.RateId) },
		validate)
}

func validate(item *prj.PrjBillingRate, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.RateId, "RateId"); err != nil {
		return err
	}
	return nil
}
