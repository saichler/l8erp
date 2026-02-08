package tests

import (
	"github.com/saichler/l8erp/go/erp/sys/moduleconfig"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceGettersSYS(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if _, err := moduleconfig.SysModuleConfig("test-id", vnic); err != nil {
		log.Fail(t, "SysModuleConfig getter failed: ", err.Error())
	}
}
