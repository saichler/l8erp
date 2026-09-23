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
package common

import (
	"time"

	"github.com/saichler/l8types/go/ifs"
	"google.golang.org/protobuf/proto"
)

// Report services are identical apart from their type: activate an ORM service
// keyed on ReportId, generate the id on POST, stamp GeneratedAt, then hand the
// report to the module's own generator. Seven modules were previously each
// carrying that scaffolding inline -- and, worse, all pointing at fin.FinReport,
// so seven services activated an ORM service over ONE table and ONE type
// (SingleOwnerDatabaseTable). This file is the shared half, extracted before a
// second consumer per Maintainability's Second Instance Rule; each module now
// supplies only its own type and generator.

// ReportAccessors adapts a module's concrete report type for the generic
// service. Each function is a two-line closure in the calling module.
type ReportAccessors struct {
	// TypeName is the protobuf message name, e.g. "HcmReport".
	TypeName string
	// Is reports whether the value is this module's report type.
	Is func(interface{}) bool
	// SetID writes a generated id into the report's ReportId field.
	SetID func(interface{})
	// SetGeneratedAt stamps the generation time on the report.
	SetGeneratedAt func(interface{}, int64)
	// Generate populates the report's sections. Called on POST only.
	// Required: a report service whose generator is absent would persist an
	// empty report and report success (FailFastNoSilentFallback).
	Generate func(interface{}, ifs.IVNic) error
}

// NewReportCallback builds the ServiceCallback every report service needs.
//
// The id is generated explicitly rather than relying on the introspector's
// primary-key decorator: a report service may be activated before the decorator
// is registered, and an unset ReportId is rejected downstream.
func NewReportCallback(a ReportAccessors) ifs.IServiceCallback {
	onPost := func(v interface{}, action ifs.Action, vnic ifs.IVNic) error {
		if action != ifs.POST {
			return nil
		}
		a.SetGeneratedAt(v, time.Now().Unix())
		return a.Generate(v, vnic)
	}

	return NewServiceCallback(
		a.TypeName,
		a.Is,
		a.SetID,
		nil,
		onPost,
	)
}

// ActivateReportService wires a module's report type into an ORM-backed
// service. serviceItem/serviceItemList are that module's own protos -- never
// another module's, or both services end up sharing one table and one cache.
func ActivateReportService(serviceName string, serviceArea byte, creds, dbname string,
	vnic ifs.IVNic, accessors ReportAccessors,
	serviceItem proto.Message, serviceItemList proto.Message) {

	sla := NewOrmSLA(serviceName, serviceArea, "ReportId",
		NewReportCallback(accessors), serviceItem, serviceItemList)
	ActivateService(sla, creds, dbname, vnic)
}
