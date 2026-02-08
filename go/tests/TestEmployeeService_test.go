package tests

import (
	"crypto/tls"
	"fmt"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/services"
	"github.com/saichler/l8erp/go/tests/mocks"
	"net/http"
	"testing"
	"time"
)

func TestMain(m *testing.M) {
	setup()
	m.Run()
	tear()
}

func dropAllTables(t *testing.T) {
	db := common.OpenDBConection("admin", "admin", "admin")
	rows, err := db.Query("SELECT tablename FROM pg_tables WHERE schemaname = 'public'")
	if err != nil {
		t.Fatalf("Failed to query tables: %v", err)
	}
	defer rows.Close()

	var tables []string
	for rows.Next() {
		var name string
		if err := rows.Scan(&name); err != nil {
			t.Fatalf("Failed to scan table name: %v", err)
		}
		tables = append(tables, name)
	}

	for _, table := range tables {
		_, err := db.Exec(fmt.Sprintf("DROP TABLE IF EXISTS \"%s\" CASCADE", table))
		if err != nil {
			t.Fatalf("Failed to drop table %s: %v", table, err)
		}
	}
	fmt.Printf("Dropped %d tables\n", len(tables))
}

func TestAllServices(t *testing.T) {
	erpServicesVnic := topo.VnicByVnetNum(1, 1)
	webServiceVnic := topo.VnicByVnetNum(3, 3)
	log := webServiceVnic.Resources().Logger()

	// 0. Drop all existing tables for a clean slate
	dropAllTables(t)

	// 1. Activate all ERP services on the services vNic
	services.ActivateAllServices("admin", "admin", erpServicesVnic)
	// 2. Start web server on the web service vNic (non-blocking)
	port := 9443
	startWebServer(port, webServiceVnic)
	time.Sleep(10 * time.Second)

	// 3. Create mock client pointing to web server
	httpClient := &http.Client{
		Timeout: 30 * time.Second,
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
		},
	}
	client := mocks.NewHCMClient(fmt.Sprintf("https://localhost:%d", port), httpClient)
	err := client.Authenticate("admin", "admin")
	if err != nil {
		log.Fail(t, "Authentication failed: ", err.Error())
		return
	}

	// 4. Run all mock data phases
	store := &mocks.MockDataStore{}
	mocks.RunAllPhases(client, store)

	// 5. Verify key entity counts
	if len(store.EmployeeIDs) == 0 {
		log.Fail(t, "No employees generated")
	}
	if len(store.CurrencyIDs) == 0 {
		log.Fail(t, "No currencies generated")
	}

	mocks.PrintSummary(store)
}
