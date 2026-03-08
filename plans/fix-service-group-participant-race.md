# Plan: Fix Service Group Participant Registration Race Condition

## Bug Summary

When a service uses `SetServiceGroup("ERPSG")`, the participant registry stores participants under the group key `"ERPSG-0"`. However, `resolveGroup()` depends on the local `serviceToGroup` map being populated — which only happens when the local node activates that specific service. If a remote `ServiceRegister` multicast arrives **before** the local node activates the same service, `resolveGroup()` fails to resolve and stores the participant under the service key (e.g., `"Currency-40"`) instead of the group key (`"ERPSG-0"`).

This is a race condition: 243 services activate concurrently across multiple nodes. A fast node can multicast `ServiceRegister` for service X before a slow node has activated service X locally.

## Root Cause

`ServiceManager.resolveGroup()` in `ServiceManager.go` lines 206-215:
```go
func (this *ServiceManager) resolveGroup(serviceName string, serviceArea byte) (string, byte) {
    key := cacheKey(serviceName, serviceArea)
    if groupName, ok := this.serviceToGroup.Load(key); ok {
        return groupName.(string), 0
    }
    return serviceName, serviceArea  // <-- Falls through if mapping not yet stored
}
```

The `serviceToGroup` map is populated one service at a time during `Activate()` (line 113-115). There's no bulk pre-registration of all service-to-group mappings.

## Fix: Project `l8services`

### Option A: Publish group mapping before multicast (Recommended)

In `ServiceActivate.go`, move the `serviceToGroup.Store()` call to happen **before** `publishService()` and `triggerElections()`. Currently:

```
line 93:  publishService        ← remote nodes discover us
line 113: serviceToGroup.Store  ← local mapping stored (TOO LATE for incoming messages)
line 117: triggerElections      ← multicasts ServiceRegister
```

Change to:
```
line 93:  serviceToGroup.Store  ← store mapping FIRST
line xx:  publishService        ← now remote messages can resolve
line xx:  triggerElections      ← multicasts go out after mapping exists locally
```

This only fixes the local side. The receiving node still needs the mapping.

### Option B: Add a `RegisterGroupMapping` method (Recommended addition)

Add a method to `ServiceManager` that allows bulk registration of service-to-group mappings **before** any service activates:

```go
// RegisterGroupMapping pre-registers a service-to-group mapping.
// Call this before Activate() to ensure group resolution works
// even if remote ServiceRegister messages arrive before local activation.
func (this *ServiceManager) RegisterGroupMapping(serviceName string, serviceArea byte, groupName string) {
    if groupName != serviceName {
        serviceKey := cacheKey(serviceName, serviceArea)
        this.serviceToGroup.Store(serviceKey, groupName)
    }
}
```

Then in `l8erp`, before activating any services, register all 243 mappings:
```go
for _, cfg := range allServiceConfigs {
    vnic.Resources().Services().RegisterGroupMapping(cfg.ServiceName, cfg.ServiceArea, "ERPSG")
}
```

This ensures that when node B receives a `ServiceRegister` for `"Currency"` (area 40), `resolveGroup` finds the mapping even if `"Currency"` hasn't been activated on node B yet.

### Option C: Include group name in ServiceRegister multicast message

Instead of relying on local resolution, include the group name in the `ServiceRegister` multicast payload. The receiver uses the group name from the message directly instead of resolving locally.

This requires changes to:
- `triggerElections`: Pass group name in multicast payload
- `handleServiceRegister`: Read group name from payload instead of calling `resolveGroupKey`
- Message format: Add group name field

This is the most robust solution but requires the most changes.

## Recommendation

**Option B** is the safest and least invasive:
1. Add `RegisterGroupMapping` to `ServiceManager` in `l8services`
2. In `l8erp`, call it for all services before `ActivateAllServices`
3. No changes to message format or multicast logic
4. No race condition because mappings exist before any activation

## Verification

1. Start 2+ nodes
2. All 243 services should share a single leader under `"ERPSG-0"`
3. Replication targets (via `RoundRobinParticipants`) should find participants across nodes
4. No empty participant maps for any service
