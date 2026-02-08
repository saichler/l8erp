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

func testServiceHandlersCOMP(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if h, ok := approvalmatrices.CompApprovalMatrices(vnic); !ok || h == nil {
		log.Fail(t, "CompApprovalMatrix service handler not found")
	}
	if h, ok := auditfindings.CompAuditFindings(vnic); !ok || h == nil {
		log.Fail(t, "CompAuditFinding service handler not found")
	}
	if h, ok := auditreports.CompAuditReports(vnic); !ok || h == nil {
		log.Fail(t, "CompAuditReport service handler not found")
	}
	if h, ok := auditschedules.CompAuditSchedules(vnic); !ok || h == nil {
		log.Fail(t, "CompAuditSchedule service handler not found")
	}
	if h, ok := certifications.CompCertifications(vnic); !ok || h == nil {
		log.Fail(t, "CompCertification service handler not found")
	}
	if h, ok := compliancereports.CompComplianceReports(vnic); !ok || h == nil {
		log.Fail(t, "CompComplianceReport service handler not found")
	}
	if h, ok := compliancestatuses.CompComplianceStatuses(vnic); !ok || h == nil {
		log.Fail(t, "CompComplianceStatus service handler not found")
	}
	if h, ok := controlassessments.CompControlAssessments(vnic); !ok || h == nil {
		log.Fail(t, "CompControlAssessment service handler not found")
	}
	if h, ok := controls.CompControls(vnic); !ok || h == nil {
		log.Fail(t, "CompControl service handler not found")
	}
	if h, ok := incidents.CompIncidents(vnic); !ok || h == nil {
		log.Fail(t, "CompIncident service handler not found")
	}
	if h, ok := insurancepolicies.CompInsurancePolicies(vnic); !ok || h == nil {
		log.Fail(t, "CompInsurancePolicy service handler not found")
	}
	if h, ok := mitigationplans.CompMitigationPlans(vnic); !ok || h == nil {
		log.Fail(t, "CompMitigationPlan service handler not found")
	}
	if h, ok := policydocuments.CompPolicyDocuments(vnic); !ok || h == nil {
		log.Fail(t, "CompPolicyDocument service handler not found")
	}
	if h, ok := regulations.CompRegulations(vnic); !ok || h == nil {
		log.Fail(t, "CompRegulation service handler not found")
	}
	if h, ok := remediationactions.CompRemediationActions(vnic); !ok || h == nil {
		log.Fail(t, "CompRemediationAction service handler not found")
	}
	if h, ok := requirements.CompRequirements(vnic); !ok || h == nil {
		log.Fail(t, "CompRequirement service handler not found")
	}
	if h, ok := riskassessments.CompRiskAssessments(vnic); !ok || h == nil {
		log.Fail(t, "CompRiskAssessment service handler not found")
	}
	if h, ok := riskregisters.CompRiskRegisters(vnic); !ok || h == nil {
		log.Fail(t, "CompRiskRegister service handler not found")
	}
	if h, ok := segregationrules.CompSegregationRules(vnic); !ok || h == nil {
		log.Fail(t, "CompSegregationRule service handler not found")
	}
	if h, ok := violationrecords.CompViolationRecords(vnic); !ok || h == nil {
		log.Fail(t, "CompViolationRecord service handler not found")
	}
}
