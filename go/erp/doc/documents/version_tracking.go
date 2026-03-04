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
	"github.com/saichler/l8erp/go/erp/common"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/doc"
	"github.com/saichler/l8types/go/ifs"
	"time"
)

// trackDocumentVersion increments the version counter and creates a version
// history entry when the document's checksum changes on update.
func trackDocumentVersion(d *doc.DocDocument, vnic ifs.IVNic) error {
	if d.Checksum == "" {
		return nil
	}
	// Check if this is an update with a different checksum
	existing, err := common.GetEntity("DocDoc", 45,
		&doc.DocDocument{DocumentId: d.DocumentId}, vnic)
	if err != nil || existing == nil {
		// New document — set initial version
		if d.CurrentVersion == 0 {
			d.CurrentVersion = 1
		}
		return nil
	}
	if existing.Checksum == d.Checksum {
		return nil
	}
	// Checksum changed — increment version
	d.CurrentVersion = existing.CurrentVersion + 1
	d.ModifiedDate = time.Now().Unix()
	var versionId string
	common.GenerateID(&versionId)
	d.Versions = append(d.Versions, &doc.DocDocumentVersion{
		VersionId:     versionId,
		VersionNumber: d.CurrentVersion,
		FileName:      d.FileName,
		FileSize:      d.FileSize,
		StoragePath:   d.StoragePath,
		Checksum:      d.Checksum,
		CreatedDate:   d.ModifiedDate,
		AuditInfo:     &erp.AuditInfo{},
	})
	return nil
}
