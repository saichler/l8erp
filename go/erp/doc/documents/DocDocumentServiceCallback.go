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
package documents

import (
	"github.com/saichler/l8erp/go/types/doc"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newDocDocumentServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&doc.DocDocument{}, vnic).
		Custom(trackDocumentVersion).
		Require(func(v interface{}) string { return v.(*doc.DocDocument).DocumentId }, "DocumentId").
		Enum(func(v interface{}) int32 { return int32(v.(*doc.DocDocument).AccessLevel) }, doc.DocAccessLevel_name, "AccessLevel").
		Enum(func(v interface{}) int32 { return int32(v.(*doc.DocDocument).DocumentType) }, doc.DocDocumentType_name, "DocumentType").
		Enum(func(v interface{}) int32 { return int32(v.(*doc.DocDocument).FileFormat) }, doc.DocFileFormat_name, "FileFormat").
		Enum(func(v interface{}) int32 { return int32(v.(*doc.DocDocument).Status) }, doc.DocDocumentStatus_name, "Status").
		Build()
}
