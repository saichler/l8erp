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
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/sales"
)

func newCustomerSegmentServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[sales.SalesCustomerSegment]("SalesCustomerSegment",
		func(e *sales.SalesCustomerSegment) { common.GenerateID(&e.SegmentId) }).
		Require(func(e *sales.SalesCustomerSegment) string { return e.SegmentId }, "SegmentId").
		Require(func(e *sales.SalesCustomerSegment) string { return e.Name }, "Name").
		Enum(func(e *sales.SalesCustomerSegment) int32 { return int32(e.SegmentType) }, sales.SalesSegmentType_name, "SegmentType").
		Build()
}
