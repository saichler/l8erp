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
package attributes

import (
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8erp/go/erp/common"
)

func newEcomAttributeServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[ecom.EcomAttribute]("EcomAttribute",
		func(e *ecom.EcomAttribute) { common.GenerateID(&e.AttributeId) }).
		Require(func(e *ecom.EcomAttribute) string { return e.AttributeId }, "AttributeId").
		Enum(func(e *ecom.EcomAttribute) int32 { return int32(e.AttributeType) }, ecom.EcomAttributeType_name, "AttributeType").
		Build()
}
