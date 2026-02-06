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
package taxreturns

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/fin"
)

func newTaxReturnServiceCallback() ifs.IServiceCallback {
	return common.NewServiceCallback("TaxReturn",
		func(e *fin.TaxReturn) { common.GenerateID(&e.ReturnId) },
		validate)
}

func validate(taxReturn *fin.TaxReturn, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(taxReturn.ReturnId, "ReturnId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(taxReturn.JurisdictionId, "JurisdictionId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(taxReturn.FiscalPeriodId, "FiscalPeriodId"); err != nil {
		return err
	}
	return nil
}
