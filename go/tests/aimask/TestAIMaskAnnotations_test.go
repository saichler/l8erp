package aimask

import (
	"testing"

	"github.com/saichler/l8ai/go/types/l8ai"
	"github.com/saichler/l8erp/go/types/bi"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8erp/go/types/doc"
	"github.com/saichler/l8erp/go/types/ecom"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8erp/go/types/scm"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/reflect/protoreflect"
	"google.golang.org/protobuf/types/descriptorpb"
)

// The l8ai chat agent masks exactly the fields annotated [(l8ai.AIMask) = true]
// (l8book prime-object.md Rule 8). These are the sensitive fields the docs
// audit found unannotated; each must carry the option in the GENERATED
// descriptors -- i.e. the .proto was annotated AND make-bindings.sh was rerun.
func TestAIMaskAnnotations(t *testing.T) {
	cases := []struct {
		msg    proto.Message
		fields []string
	}{
		{&bi.BiDataSource{}, []string{"username", "connection_params", "connection_string"}},
		{&crm.CrmTechnician{}, []string{"hourly_rate", "overtime_rate"}},
		{&crm.CrmServiceVisit{}, []string{"customer_signature"}},
		{&doc.DocAccessLog{}, []string{"ip_address", "user_agent", "session_id"}},
		{&doc.DocAuditTrail{}, []string{"ip_address", "session_id"}},
		{&doc.DocSignature{}, []string{"ip_address"}},
		{&ecom.EcomCart{}, []string{"ip_address", "user_agent"}},
		{&ecom.EcomOrder{}, []string{"ip_address", "user_agent"}},
		{&hcm.EquityGrant{}, []string{"shares_granted", "shares_vested", "shares_unvested", "shares_exercised"}},
		{&hcm.CompensationStatement{}, []string{"equity_shares"}},
		{&hcm.Employee{}, []string{"nationality", "citizenship", "photo_url", "national_id"}},
		{&hcm.Payslip{}, []string{"employer_contributions"}},
		{&hcm.Applicant{}, []string{"portfolio_url", "resume_url", "cover_letter_url"}},
		{&hcm.TimeEntry{}, []string{"latitude", "longitude", "ip_address"}},
		{&hcm.LeaveRequest{}, []string{"reason"}},
		{&sales.SalesDeliveryConfirm{}, []string{"signature_path"}},
		{&scm.ScmDeliveryProof{}, []string{"received_by", "signature"}},
	}
	for _, c := range cases {
		md := c.msg.ProtoReflect().Descriptor()
		for _, name := range c.fields {
			fd := md.Fields().ByName(protoreflect.Name(name))
			if fd == nil {
				t.Errorf("%s has no field %q", md.FullName(), name)
				continue
			}
			if !aiMasked(fd) {
				t.Errorf("%s.%s is not annotated [(l8ai.AIMask) = true] -- its value reaches the LLM in clear text",
					md.FullName(), name)
			}
		}
	}
}

// Fields the agent must reason over stay unmasked (Rule 8: never mask IDs,
// statuses or counts).
func TestAIMaskLeavesReasoningFieldsAlone(t *testing.T) {
	md := (&hcm.Employee{}).ProtoReflect().Descriptor()
	for _, name := range []string{"employee_id", "employment_status", "department_id"} {
		fd := md.Fields().ByName(protoreflect.Name(name))
		if fd == nil {
			continue
		}
		if aiMasked(fd) {
			t.Errorf("%s.%s is masked but the agent must be able to count/filter on it", md.FullName(), name)
		}
	}
}

func aiMasked(fd protoreflect.FieldDescriptor) bool {
	opts, ok := fd.Options().(*descriptorpb.FieldOptions)
	if !ok || opts == nil {
		return false
	}
	v, ok := proto.GetExtension(opts, l8ai.E_AIMask).(bool)
	return ok && v
}
