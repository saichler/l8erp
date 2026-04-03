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
package insurancepolicies

import (
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/comp"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newCompInsurancePolicyServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&comp.CompInsurancePolicy{}, vnic).
		Require(func(v interface{}) string { return v.(*comp.CompInsurancePolicy).InsuranceId }, "InsuranceId").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*comp.CompInsurancePolicy).CoverageAmount }, "CoverageAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*comp.CompInsurancePolicy).Deductible }, "Deductible").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*comp.CompInsurancePolicy).Premium }, "Premium").
		DateAfter(func(v interface{}) int64 { return v.(*comp.CompInsurancePolicy).ExpiryDate }, func(v interface{}) int64 { return v.(*comp.CompInsurancePolicy).EffectiveDate }, "ExpiryDate", "EffectiveDate").
		Build()
}
