package tests

import (
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"testing"
	"time"
)

func TestMain(m *testing.M) {
	setup()
	m.Run()
	tear()
}

func TestEmployeeService(t *testing.T) {
	nic := topo.VnicByVnetNum(1, 1)
	go startWebServer(2773, "/data/erp", nic)
	employees.Activate("postgres", "erp", nic)
	time.Sleep(10 * time.Second)
}
