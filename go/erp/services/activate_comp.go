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

func ActivateCompServices(creds, dbname string, nic ifs.IVNic) {
	// Regulatory
	regulations.Activate(creds, dbname, nic)
	certifications.Activate(creds, dbname, nic)

	// Internal Controls
	controls.Activate(creds, dbname, nic)
	policydocuments.Activate(creds, dbname, nic)
	approvalmatrices.Activate(creds, dbname, nic)

	// Risk Management
	riskregisters.Activate(creds, dbname, nic)
	incidents.Activate(creds, dbname, nic)
	insurancepolicies.Activate(creds, dbname, nic)

	// Audit Management
	auditschedules.Activate(creds, dbname, nic)
	auditfindings.Activate(creds, dbname, nic)
	compliancereports.Activate(creds, dbname, nic)
}
