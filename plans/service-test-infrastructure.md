# Plan: Service Test Infrastructure

## Goal
Create a test that activates all ERP services on one vNic, starts a web server on another vNic, and runs mock data generation to verify the services — all within the Go test framework.

## Current State
- `go/erp/main/erp_*.go` (13 files) — service activation functions in `package main` (not importable)
- `go/erp/ui/main1/main.go` — web server startup in `package main` (not importable)
- `go/tests/mocks/` (115 files) — mock data generation in `package main` (not importable)
- `go/tests/TestEmployeeService_test.go` — skeleton test with 2 vNics fetched
- `go/tests/StartWebserver.go` — deleted file that had the right pattern (takes vNic param)

## Architecture

```
TestAllServices:
  1. erpServicesVnic = topo.VnicByVnetNum(1, 1)
  2. webServiceVnic  = topo.VnicByVnetNum(3, 3)
  3. services.ActivateAllServices(creds, dbname, erpServicesVnic)
  4. Register UI types on webServiceVnic
  5. Start web server on webServiceVnic (goroutine, non-blocking)
  6. Create HTTP client -> web server address
  7. mocks.RunAllPhases(client, store)
  8. Assert store has expected ID counts
```

---

## Step 1: Create `go/erp/services/` Package (Shared Service Activation)

Extract the 12 `activate*Services()` functions from `go/erp/main/` into an importable package.

### New Files

| File | Contents |
|------|----------|
| `go/erp/services/activate_hcm.go` | `ActivateHCMServices(creds, dbname string, nic ifs.IVNic)` — copy from `erp_hcm.go` |
| `go/erp/services/activate_fin.go` | `ActivateFinServices(...)` — copy from `erp_fin.go` |
| `go/erp/services/activate_scm.go` | `ActivateSCMServices(...)` — copy from `erp_scm.go` |
| `go/erp/services/activate_sales.go` | `ActivateSalesServices(...)` — copy from `erp_sales.go` |
| `go/erp/services/activate_mfg.go` | `ActivateMfgServices(...)` — copy from `erp_mfg.go` |
| `go/erp/services/activate_crm.go` | `ActivateCrmServices(...)` — copy from `erp_crm.go` |
| `go/erp/services/activate_prj.go` | `ActivatePrjServices(...)` — copy from `erp_prj.go` |
| `go/erp/services/activate_bi.go` | `ActivateBiServices(...)` — copy from `erp_bi.go` |
| `go/erp/services/activate_doc.go` | `ActivateDocServices(...)` — copy from `erp_doc.go` |
| `go/erp/services/activate_ecom.go` | `ActivateEcomServices(...)` — copy from `erp_ecom.go` |
| `go/erp/services/activate_comp.go` | `ActivateCompServices(...)` — copy from `erp_comp.go` |
| `go/erp/services/activate_sys.go` | `ActivateSysServices(...)` — copy from `erp_sys.go` |
| `go/erp/services/activate_all.go` | `ActivateAllServices(creds, dbname string, nic ifs.IVNic)` — calls all 12 |

### Pattern for each file:
```go
package services

import (
    "github.com/saichler/l8erp/go/erp/hcm/employees"
    // ... all service imports
    "github.com/saichler/l8types/go/ifs"
)

func ActivateHCMServices(creds, dbname string, nic ifs.IVNic) {
    employees.Activate(creds, dbname, nic)
    // ... same as current erp_hcm.go body
}
```

### `activate_all.go`:
```go
package services

import "github.com/saichler/l8types/go/ifs"

func ActivateAllServices(creds, dbname string, nic ifs.IVNic) {
    ActivateHCMServices(creds, dbname, nic)
    ActivateFinServices(creds, dbname, nic)
    ActivateSCMServices(creds, dbname, nic)
    ActivateSalesServices(creds, dbname, nic)
    ActivateMfgServices(creds, dbname, nic)
    ActivateCrmServices(creds, dbname, nic)
    ActivatePrjServices(creds, dbname, nic)
    ActivateBiServices(creds, dbname, nic)
    ActivateDocServices(creds, dbname, nic)
    ActivateEcomServices(creds, dbname, nic)
    ActivateCompServices(creds, dbname, nic)
    ActivateSysServices(creds, dbname, nic)
}
```

---

## Step 2: Update `go/erp/main/` to Use Shared Package

### Simplify `erp_main.go`:
```go
package main

import (
    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8erp/go/erp/services"
    "github.com/saichler/l8bus/go/overlay/vnic"
    "github.com/saichler/l8types/go/ifs"
)

func main() {
    res := common.CreateResources("ERPServices")
    ifs.SetNetworkMode(ifs.NETWORK_K8s)
    nic := vnic.NewVirtualNetworkInterface(res, nil)
    nic.Start()
    nic.WaitForConnection()

    startDb(nic)

    services.ActivateAllServices(common.DB_CREDS, common.DB_NAME, nic)

    common.WaitForSignal(res)
}
```

### Delete the individual `erp_*.go` files (12 files):
- `erp_hcm.go`, `erp_fin.go`, `erp_scm.go`, `erp_sales.go`, `erp_mfg.go`, `erp_crm.go`
- `erp_prj.go`, `erp_bi.go`, `erp_doc.go`, `erp_ecom.go`, `erp_comp.go`, `erp_sys.go`

Keep only `erp_main.go` (with `startDb` function).

---

## Step 3: Make Mock Data Importable

Change all 115 files in `go/tests/mocks/` from `package main` to `package mocks`.

### 3a: Rename package in all files
- `sed` all `package main` → `package mocks` in `go/tests/mocks/*.go`

### 3b: Export key types and functions

**client.go**: Export `HCMClient` (already capitalized), add constructor:
```go
func NewHCMClient(baseURL string, httpClient *http.Client) *HCMClient {
    return &HCMClient{baseURL: baseURL, client: httpClient}
}

func (c *HCMClient) Authenticate(user, password string) error { ... }  // capitalize
func (c *HCMClient) Post(endpoint string, data interface{}) error { ... }  // capitalize
```

**main_phases.go**: Export orchestration:
```go
func RunAllPhases(client *HCMClient, store *MockDataStore) { ... }  // capitalize
```

**phase_helpers.go**: Export helpers (capitalize `runOp`, `extractIDs`, `runPhase`)

**summary.go**: Export `PrintSummary`

**All phase/generator functions**: Capitalize the ~50+ phase and generator functions that are called from the phase runners. Each `runHCMPhases` → `RunHCMPhases`, `generatePhase1` → `GeneratePhase1`, etc.

### 3c: Create standalone entry point
Create `go/tests/mocks/cmd/main.go` (package main) as the thin CLI wrapper:
```go
package main

import (
    "crypto/tls"
    "flag"
    "fmt"
    "net/http"
    "os"
    "time"

    "github.com/saichler/l8erp/go/tests/mocks"
)

func main() {
    address := flag.String("address", "http://localhost:8080", "ERP server address")
    user := flag.String("user", "admin", "Username for authentication")
    password := flag.String("password", "admin", "Password for authentication")
    insecure := flag.Bool("insecure", false, "Skip TLS certificate verification")
    flag.Parse()

    httpClient := &http.Client{Timeout: 30 * time.Second}
    if *insecure {
        httpClient.Transport = &http.Transport{
            TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
        }
    }

    client := mocks.NewHCMClient(*address, httpClient)
    if err := client.Authenticate(*user, *password); err != nil {
        fmt.Printf("Authentication failed: %v\n", err)
        os.Exit(1)
    }

    store := &mocks.MockDataStore{}
    mocks.RunAllPhases(client, store)
    mocks.PrintSummary(store)
}
```

**Note on capitalization scope**: Only the "entry-point" functions need to be exported — the ones called from `RunAllPhases` chain and from the test. Internal generator functions that are only called from within the package can remain unexported. However, the phase runner functions (`runHCMPhases`, `runFINFoundation`, etc.) ARE called from `RunAllPhases`, so they need to be exported OR `RunAllPhases` calls them directly (they're in the same package so no export needed). Since they're all in `package mocks`, **only the external-facing API needs exporting**:
- `NewHCMClient`, `Authenticate`, `Post`
- `RunAllPhases`
- `MockDataStore` (already exported)
- `PrintSummary`

Internal functions like `runHCMPhases`, `generatePhase1`, `runOp`, `extractIDs`, `runPhase` remain unexported since they're called within the same package.

---

## Step 4: Recreate `go/tests/StartWebserver.go`

Restore the deleted file (from git history) with minor adjustments:
```go
package tests

import (
    "github.com/saichler/l8bus/go/overlay/health"
    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8erp/go/erp/ui"
    "github.com/saichler/l8types/go/ifs"
    "github.com/saichler/l8web/go/web/server"
)

func startWebServer(port int, nic ifs.IVNic) {
    // Register UI types on the vNic's resources
    ui.RegisterTypes(nic.Resources())

    serverConfig := &server.RestServerConfig{
        Host:           "localhost",
        Port:           port,
        Authentication: true,
        CertName:       "",  // no TLS in tests
        Prefix:         common.PREFIX,
    }
    svr, err := server.NewRestServer(serverConfig)
    if err != nil {
        panic(err)
    }

    hs, ok := nic.Resources().Services().ServiceHandler(health.ServiceName, 0)
    if ok {
        ws := hs.WebService()
        svr.RegisterWebService(ws, nic)
    }

    sla := ifs.NewServiceLevelAgreement(&server.WebService{}, ifs.WebService, 0, false, nil)
    sla.SetArgs(svr)
    nic.Resources().Services().Activate(sla, nic)

    go svr.Start()  // non-blocking in goroutine
}
```

**Key difference from the deleted version**: The web server's `Start()` is called in a goroutine so the test can continue. Also needs to register UI types on the vNic (currently the `registerTypes` function in `go/erp/ui/shared.go` is unexported — needs to be exported as `RegisterTypes`).

### Export `registerTypes` in `go/erp/ui/shared.go`:
Rename `registerTypes` → `RegisterTypes` (and update the one call site in `CreateVnic`).

---

## Step 5: Write the Test

### `go/tests/TestEmployeeService_test.go`:
```go
package tests

import (
    "crypto/tls"
    "fmt"
    "net/http"
    "testing"
    "time"

    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8erp/go/erp/services"
    "github.com/saichler/l8erp/go/tests/mocks"
)

func TestMain(m *testing.M) {
    setup()
    m.Run()
    tear()
}

func TestAllServices(t *testing.T) {
    erpServicesVnic := topo.VnicByVnetNum(1, 1)
    webServiceVnic := topo.VnicByVnetNum(3, 3)

    // 1. Activate all ERP services
    services.ActivateAllServices(common.DB_CREDS, common.DB_NAME, erpServicesVnic)

    // 2. Start web server (non-blocking)
    port := 9443
    startWebServer(port, webServiceVnic)
    time.Sleep(2 * time.Second) // wait for server to be ready

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
        t.Fatalf("Authentication failed: %v", err)
    }

    // 4. Run all mock data phases
    store := &mocks.MockDataStore{}
    mocks.RunAllPhases(client, store)

    // 5. Verify key entity counts
    if len(store.EmployeeIDs) == 0 {
        t.Error("No employees generated")
    }
    if len(store.CurrencyIDs) == 0 {
        t.Error("No currencies generated")
    }

    mocks.PrintSummary(store)
}
```

---

## Step 6: Build Verification

```bash
# Verify shared services package
go build ./erp/services/

# Verify main still works
go build ./erp/main/

# Verify mocks library compiles
go build ./tests/mocks/

# Verify mock CLI entry point
go build ./tests/mocks/cmd/

# Verify tests compile
go vet ./tests/

# Run the test
go test -v ./tests/ -run TestAllServices -timeout 300s
```

---

## File Change Summary

| Action | Files | Count |
|--------|-------|-------|
| **Create** | `go/erp/services/activate_*.go` (13 files) | 13 |
| **Create** | `go/tests/mocks/cmd/main.go` | 1 |
| **Delete** | `go/erp/main/erp_hcm.go` through `erp_sys.go` | 12 |
| **Modify** | `go/erp/main/erp_main.go` (simplify) | 1 |
| **Modify** | `go/tests/mocks/*.go` — `package main` → `package mocks` | 115 |
| **Modify** | `go/tests/mocks/client.go` — export constructor + methods | 1 |
| **Modify** | `go/tests/mocks/main.go` — remove `main()`, export `RunAllPhases` | 1 |
| **Modify** | `go/erp/ui/shared.go` — export `RegisterTypes` | 1 |
| **Create** | `go/tests/StartWebserver.go` (recreate) | 1 |
| **Modify** | `go/tests/TestEmployeeService_test.go` | 1 |

**Total: ~147 files touched** (mostly the mechanical `package main` → `package mocks` rename)

---

## Risk Considerations

1. **Database**: The test topology doesn't start PostgreSQL. Services use `common.ActivateService` which opens a DB connection. We may need to either:
   - Skip DB in test mode (services can work with in-memory store in the test topology)
   - Start a test PostgreSQL container
   - **Most likely**: The test topology's vNic handles service activation without requiring a real DB (the layer8 framework stores data in-memory when no DB is configured)

2. **TLS/Auth**: The web server in tests may need to be configured without TLS or with self-signed certs. The `RestServerConfig` may need `Authentication: false` for tests, or we use the existing test auth.

3. **Port conflicts**: The test web server port should not conflict with any running services.

4. **Timeout**: Mock data generation takes time. Use `-timeout 300s` or higher.

5. **The `HCMClient.post()` and `HCMClient.authenticate()` need capitalization** since they're called from outside the package in the test. All internal phase/generator functions stay lowercase since they're intra-package calls.
