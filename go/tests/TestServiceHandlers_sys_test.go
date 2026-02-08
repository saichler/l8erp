package tests

import (
	"github.com/saichler/l8erp/go/erp/sys/moduleconfig"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceHandlersSYS(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if h, ok := moduleconfig.SysModuleConfigs(vnic); !ok || h == nil {
		log.Fail(t, "SysModuleConfig service handler not found")
	}
}
