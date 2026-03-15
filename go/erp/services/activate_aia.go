/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */
package services

import (
	"github.com/saichler/l8erp/go/erp/aia"
	"github.com/saichler/l8types/go/ifs"
)

func collectAiaActivations(creds, dbname string, nic ifs.IVNic) []func() {
	return []func(){
		func() { aia.Activate(creds, dbname, nic) },
	}
}
