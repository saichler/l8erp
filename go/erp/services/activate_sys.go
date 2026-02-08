/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */
package services

import (
	"github.com/saichler/l8erp/go/erp/sys/moduleconfig"
	"github.com/saichler/l8types/go/ifs"
)

func ActivateSysServices(creds, dbname string, nic ifs.IVNic) {
	moduleconfig.Activate(creds, dbname, nic)
}
