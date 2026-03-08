# Plan: Assign All ERP Services to "ERPSG" Service Group

## Goal
All 243 ERP services should participate in a single shared service group called `"ERPSG"` for leader election and participant tracking, reducing message floods and improving performance.

## How Service Groups Work
- `sla.SetServiceGroup("ERPSG")` makes services share a single leader election under the group name
- Each service keeps its own ServiceName for HTTP routing and VNet multicast
- The group uses area 0 for elections (handled automatically by the framework)
- When no group is set, each service runs its own independent election

## Changes

### Step 1: Add `ServiceGroup` field to `ServiceConfig`

**File**: `go/erp/common/service_factory.go` (line 38-45)

Add `ServiceGroup string` to the struct:
```go
type ServiceConfig struct {
    ServiceName   string
    ServiceArea   byte
    PrimaryKey    string
    Callback      ifs.IServiceCallback
    Transactional bool
    EnableCache   bool
    ServiceGroup  string
}
```

### Step 2: Call `SetServiceGroup` in `ActivateService`

**File**: `go/erp/common/service_factory.go` (before line 78)

Add one line before `vnic.Resources().Services().Activate(sla, vnic)`:
```go
if cfg.ServiceGroup != "" {
    sla.SetServiceGroup(cfg.ServiceGroup)
}
vnic.Resources().Services().Activate(sla, vnic)
```

### Step 3: Add `ServiceGroup: "ERPSG"` to all 243 service Activate calls

Every `*Service.go` file under `go/erp/` has the same pattern:
```go
common.ActivateService[...](common.ServiceConfig{
    ServiceName: ServiceName, ServiceArea: ServiceArea,
    PrimaryKey: "...", Callback: ...,
    Transactional: true, EnableCache: true,
}, creds, dbname, vnic)
```

Each needs `ServiceGroup: "ERPSG"` added:
```go
common.ActivateService[...](common.ServiceConfig{
    ServiceName: ServiceName, ServiceArea: ServiceArea,
    PrimaryKey: "...", Callback: ...,
    Transactional: true, EnableCache: true,
    ServiceGroup: "ERPSG",
}, creds, dbname, vnic)
```

**Files (243 total across 12 modules + sys):**

| Module | Count | ServiceArea | Directory |
|--------|-------|-------------|-----------|
| HCM | 57 | 30 | `go/erp/hcm/` |
| FIN | 28 | 40 | `go/erp/fin/` |
| SCM | 29 | 50 | `go/erp/scm/` |
| Sales | 17 | 60 | `go/erp/sales/` |
| MFG | 18 | 70 | `go/erp/mfg/` |
| CRM | 22 | 80 | `go/erp/crm/` |
| PRJ | 21 | 90 | `go/erp/prj/` |
| ECOM | 13 | 100 | `go/erp/ecom/` |
| COMP | 11 | 110 | `go/erp/comp/` |
| BI | 14 | 35 | `go/erp/bi/` |
| DOC | 11 | 45 | `go/erp/doc/` |
| SYS | 2 | 0 | `go/erp/sys/` |

All 243 files follow the identical `common.ServiceConfig{...}` literal pattern, so a single `sed` or script can apply the change uniformly.

## Execution

1. Edit `service_factory.go` — add field + `SetServiceGroup` call
2. Run a bulk replacement across all `*Service.go` files:
   ```bash
   # Replace "EnableCache: true," with "EnableCache: true, ServiceGroup: \"ERPSG\","
   # in all files that contain common.ServiceConfig
   ```
3. Build: `cd go && go build ./...`
4. Verify count: `grep -r 'ServiceGroup: "ERPSG"' go/erp/ | wc -l` should equal 243

## Verification
```bash
# All services have the group
grep -rL 'ServiceGroup:' go/erp/*/*Service.go
# Should return 0 files (except service_factory.go itself)

# Build succeeds
cd go && go build ./...
```
