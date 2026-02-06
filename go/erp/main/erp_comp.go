/*
 * COMP (Compliance and Risk Management) service activations
 */

package main

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"

	// Regulatory
	"github.com/saichler/l8erp/go/erp/comp/certifications"
	"github.com/saichler/l8erp/go/erp/comp/compliancestatuses"
	"github.com/saichler/l8erp/go/erp/comp/regulations"
	"github.com/saichler/l8erp/go/erp/comp/requirements"
	"github.com/saichler/l8erp/go/erp/comp/violationrecords"

	// Internal Controls
	"github.com/saichler/l8erp/go/erp/comp/approvalmatrices"
	"github.com/saichler/l8erp/go/erp/comp/controlassessments"
	"github.com/saichler/l8erp/go/erp/comp/controls"
	"github.com/saichler/l8erp/go/erp/comp/policydocuments"
	"github.com/saichler/l8erp/go/erp/comp/segregationrules"

	// Risk Management
	"github.com/saichler/l8erp/go/erp/comp/incidents"
	"github.com/saichler/l8erp/go/erp/comp/insurancepolicies"
	"github.com/saichler/l8erp/go/erp/comp/mitigationplans"
	"github.com/saichler/l8erp/go/erp/comp/riskassessments"
	"github.com/saichler/l8erp/go/erp/comp/riskregisters"

	// Audit Management
	"github.com/saichler/l8erp/go/erp/comp/auditfindings"
	"github.com/saichler/l8erp/go/erp/comp/auditreports"
	"github.com/saichler/l8erp/go/erp/comp/auditschedules"
	"github.com/saichler/l8erp/go/erp/comp/compliancereports"
	"github.com/saichler/l8erp/go/erp/comp/remediationactions"
)

func activateCompServices(nic ifs.IVNic) {
	// Regulatory
	regulations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	requirements.Activate(common.DB_CREDS, common.DB_NAME, nic)
	compliancestatuses.Activate(common.DB_CREDS, common.DB_NAME, nic)
	certifications.Activate(common.DB_CREDS, common.DB_NAME, nic)
	violationrecords.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Internal Controls
	controls.Activate(common.DB_CREDS, common.DB_NAME, nic)
	controlassessments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	policydocuments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	approvalmatrices.Activate(common.DB_CREDS, common.DB_NAME, nic)
	segregationrules.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Risk Management
	riskregisters.Activate(common.DB_CREDS, common.DB_NAME, nic)
	riskassessments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	incidents.Activate(common.DB_CREDS, common.DB_NAME, nic)
	mitigationplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	insurancepolicies.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Audit Management
	auditschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	auditfindings.Activate(common.DB_CREDS, common.DB_NAME, nic)
	remediationactions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	auditreports.Activate(common.DB_CREDS, common.DB_NAME, nic)
	compliancereports.Activate(common.DB_CREDS, common.DB_NAME, nic)
}
