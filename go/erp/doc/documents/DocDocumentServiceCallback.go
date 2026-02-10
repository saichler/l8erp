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
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
)

func newDocDocumentServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[doc.DocDocument]("DocDocument",
		func(e *doc.DocDocument) { common.GenerateID(&e.DocumentId) }).
		Require(func(e *doc.DocDocument) string { return e.DocumentId }, "DocumentId").
		Enum(func(e *doc.DocDocument) int32 { return int32(e.AccessLevel) }, doc.DocAccessLevel_name, "AccessLevel").
		Enum(func(e *doc.DocDocument) int32 { return int32(e.DocumentType) }, doc.DocDocumentType_name, "DocumentType").
		Enum(func(e *doc.DocDocument) int32 { return int32(e.FileFormat) }, doc.DocFileFormat_name, "FileFormat").
		Enum(func(e *doc.DocDocument) int32 { return int32(e.Status) }, doc.DocDocumentStatus_name, "Status").
		Build()
}
