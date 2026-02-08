package tests

import (
	"github.com/saichler/l8erp/go/erp/comp/approvalmatrices"
	"github.com/saichler/l8erp/go/erp/comp/auditfindings"
	"github.com/saichler/l8erp/go/erp/comp/auditreports"
	"github.com/saichler/l8erp/go/erp/comp/auditschedules"
	"github.com/saichler/l8erp/go/erp/comp/certifications"
	"github.com/saichler/l8erp/go/erp/comp/compliancereports"
	"github.com/saichler/l8erp/go/erp/comp/compliancestatuses"
	"github.com/saichler/l8erp/go/erp/comp/controlassessments"
	"github.com/saichler/l8erp/go/erp/comp/controls"
	"github.com/saichler/l8erp/go/erp/comp/incidents"
	"github.com/saichler/l8erp/go/erp/comp/insurancepolicies"
	"github.com/saichler/l8erp/go/erp/comp/mitigationplans"
	"github.com/saichler/l8erp/go/erp/comp/policydocuments"
	"github.com/saichler/l8erp/go/erp/comp/regulations"
	"github.com/saichler/l8erp/go/erp/comp/remediationactions"
	"github.com/saichler/l8erp/go/erp/comp/requirements"
	"github.com/saichler/l8erp/go/erp/comp/riskassessments"
	"github.com/saichler/l8erp/go/erp/comp/riskregisters"
	"github.com/saichler/l8erp/go/erp/comp/segregationrules"
	"github.com/saichler/l8erp/go/erp/comp/violationrecords"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceGettersCOMP(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if _, err := approvalmatrices.CompApprovalMatrix("test-id", vnic); err != nil {
		log.Fail(t, "CompApprovalMatrix getter failed: ", err.Error())
	}
	if _, err := auditfindings.CompAuditFinding("test-id", vnic); err != nil {
		log.Fail(t, "CompAuditFinding getter failed: ", err.Error())
	}
	if _, err := auditreports.CompAuditReport("test-id", vnic); err != nil {
		log.Fail(t, "CompAuditReport getter failed: ", err.Error())
	}
	if _, err := auditschedules.CompAuditSchedule("test-id", vnic); err != nil {
		log.Fail(t, "CompAuditSchedule getter failed: ", err.Error())
	}
	if _, err := certifications.CompCertification("test-id", vnic); err != nil {
		log.Fail(t, "CompCertification getter failed: ", err.Error())
	}
	if _, err := compliancereports.CompComplianceReport("test-id", vnic); err != nil {
		log.Fail(t, "CompComplianceReport getter failed: ", err.Error())
	}
	if _, err := compliancestatuses.CompComplianceStatus("test-id", vnic); err != nil {
		log.Fail(t, "CompComplianceStatus getter failed: ", err.Error())
	}
	if _, err := controlassessments.CompControlAssessment("test-id", vnic); err != nil {
		log.Fail(t, "CompControlAssessment getter failed: ", err.Error())
	}
	if _, err := controls.CompControl("test-id", vnic); err != nil {
		log.Fail(t, "CompControl getter failed: ", err.Error())
	}
	if _, err := incidents.CompIncident("test-id", vnic); err != nil {
		log.Fail(t, "CompIncident getter failed: ", err.Error())
	}
	if _, err := insurancepolicies.CompInsurancePolicy("test-id", vnic); err != nil {
		log.Fail(t, "CompInsurancePolicy getter failed: ", err.Error())
	}
	if _, err := mitigationplans.CompMitigationPlan("test-id", vnic); err != nil {
		log.Fail(t, "CompMitigationPlan getter failed: ", err.Error())
	}
	if _, err := policydocuments.CompPolicyDocument("test-id", vnic); err != nil {
		log.Fail(t, "CompPolicyDocument getter failed: ", err.Error())
	}
	if _, err := regulations.CompRegulation("test-id", vnic); err != nil {
		log.Fail(t, "CompRegulation getter failed: ", err.Error())
	}
	if _, err := remediationactions.CompRemediationAction("test-id", vnic); err != nil {
		log.Fail(t, "CompRemediationAction getter failed: ", err.Error())
	}
	if _, err := requirements.CompRequirement("test-id", vnic); err != nil {
		log.Fail(t, "CompRequirement getter failed: ", err.Error())
	}
	if _, err := riskassessments.CompRiskAssessment("test-id", vnic); err != nil {
		log.Fail(t, "CompRiskAssessment getter failed: ", err.Error())
	}
	if _, err := riskregisters.CompRiskRegister("test-id", vnic); err != nil {
		log.Fail(t, "CompRiskRegister getter failed: ", err.Error())
	}
	if _, err := segregationrules.CompSegregationRule("test-id", vnic); err != nil {
		log.Fail(t, "CompSegregationRule getter failed: ", err.Error())
	}
	if _, err := violationrecords.CompViolationRecord("test-id", vnic); err != nil {
		log.Fail(t, "CompViolationRecord getter failed: ", err.Error())
	}
}
