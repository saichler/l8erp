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
package quantitybreaks

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/sales"
)

func newQuantityBreakServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("SalesQuantityBreak",
		func(e *sales.SalesQuantityBreak) { common.GenerateID(&e.BreakId) },
		validate)
}

func validate(item *sales.SalesQuantityBreak, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.BreakId, "BreakId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(item.PriceListId, "PriceListId"); err != nil {
		return err
	}
	return nil
}
