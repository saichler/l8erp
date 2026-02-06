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
package returnlines

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/ecom"
)

func newEcomReturnLineServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("EcomReturnLine",
		func(e *ecom.EcomReturnLine) { common.GenerateID(&e.LineId) },
		validateEcomReturnLine)
}

func validateEcomReturnLine(item *ecom.EcomReturnLine, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.LineId, "LineId"); err != nil {
		return err
	}
	return nil
}
