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
package customersegments

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/sales"
)

func newCustomerSegmentServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&sales.SalesCustomerSegment{}, vnic).
		Require(func(v interface{}) string { return v.(*sales.SalesCustomerSegment).SegmentId }, "SegmentId").
		Require(func(v interface{}) string { return v.(*sales.SalesCustomerSegment).Name }, "Name").
		Enum(func(v interface{}) int32 { return int32(v.(*sales.SalesCustomerSegment).SegmentType) }, sales.SalesSegmentType_name, "SegmentType").
		Build()
}
