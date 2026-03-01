/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */
package services

import (
	"github.com/saichler/l8types/go/ifs"

	// Regulatory
	"github.com/saichler/l8erp/go/erp/comp/certifications"
	"github.com/saichler/l8erp/go/erp/comp/regulations"

	// Internal Controls
	"github.com/saichler/l8erp/go/erp/comp/approvalmatrices"
	"github.com/saichler/l8erp/go/erp/comp/controls"
	"github.com/saichler/l8erp/go/erp/comp/policydocuments"

	// Risk Management
	"github.com/saichler/l8erp/go/erp/comp/incidents"
	"github.com/saichler/l8erp/go/erp/comp/insurancepolicies"
	"github.com/saichler/l8erp/go/erp/comp/riskregisters"

	// Audit Management
	"github.com/saichler/l8erp/go/erp/comp/auditfindings"
	"github.com/saichler/l8erp/go/erp/comp/auditschedules"
	"github.com/saichler/l8erp/go/erp/comp/compliancereports"
)

func collectCompActivations(creds, dbname string, nic ifs.IVNic) []func() {
	return []func(){
		// Regulatory
		func() { regulations.Activate(creds, dbname, nic) },
		func() { certifications.Activate(creds, dbname, nic) },
		// Internal Controls
		func() { controls.Activate(creds, dbname, nic) },
		func() { policydocuments.Activate(creds, dbname, nic) },
		func() { approvalmatrices.Activate(creds, dbname, nic) },
		// Risk Management
		func() { riskregisters.Activate(creds, dbname, nic) },
		func() { incidents.Activate(creds, dbname, nic) },
		func() { insurancepolicies.Activate(creds, dbname, nic) },
		// Audit Management
		func() { auditschedules.Activate(creds, dbname, nic) },
		func() { auditfindings.Activate(creds, dbname, nic) },
		func() { compliancereports.Activate(creds, dbname, nic) },
	}
}
