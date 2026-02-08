/*
 * SYS (System) service activations
 */

package main

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/sys/moduleconfig"
	"github.com/saichler/l8types/go/ifs"
)

func activateSysServices(nic ifs.IVNic) {
	moduleconfig.Activate(common.DB_CREDS, common.DB_NAME, nic)
}
