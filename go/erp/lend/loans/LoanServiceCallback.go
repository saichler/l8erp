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
package loans

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/lend"
	"github.com/saichler/l8types/go/ifs"
)

func newLoanServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&lend.Loan{}, vnic).
		Require(func(v interface{}) string { return v.(*lend.Loan).LoanId }, "LoanId").
		Require(func(v interface{}) string { return v.(*lend.Loan).CustomerId }, "CustomerId").
		Enum(func(v interface{}) int32 { return int32(v.(*lend.Loan).Status) }, lend.LoanStatus_name, "Status").
		Build()
}
