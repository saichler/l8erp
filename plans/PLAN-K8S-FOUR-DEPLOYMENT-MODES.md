# Plan: K8s Four Deployment Modes + KIND Support for l8erp

## Summary

Bring l8erp's Kubernetes deployment in line with the four-mode deployment standard already implemented in probler and fmc. The current l8erp has 6 separate per-service YAML files (local/hostPath mode only), no consolidated manifests, and no KIND support.

## Current State

### l8erp k8s/ directory
- 6 individual YAML files: `vnet.yaml`, `erp.yaml`, `web.yaml`, `logs.yaml`, `log-agent.yaml`, `maint.yaml`
- All use DaemonSets with hostPath volumes (effectively "local" mode)
- `deploy.sh` applies individual files sequentially
- `undeploy.sh` deletes individual files
- `clean.sh` undeploys + cleans data directories
- **No** `l8erp-local.yaml` (consolidated)
- **No** `l8erp-baremetal.yaml`
- **No** `l8erp-gke.yaml`
- **No** `l8erp-kind.yaml`
- **No** `kind-start.sh` / `kind-stop.sh`

### l8erp services (6 Docker images)

| Service | Image | Old Namespace | hostNetwork | NODE_IP | Ports | Notes |
|---------|-------|---------------|-------------|---------|-------|-------|
| erp-vnet | saichler/erp-vnet | erp-vnet | true | **MISSING** | 34999 | Rule violation |
| erp-logs-vnet | saichler/erp-logs-vnet | erp-logs-vnet | true | **MISSING** | 35004 | Rule violation |
| erp-log-agent | saichler/erp-log-agent | erp-log-agent | no | yes | - | LOGPATH=/data/logs/erp |
| erp | saichler/erp | erp | no | yes | - | Main backend |
| erp-web | saichler/erp-web | erp-web | true | yes | - | Web UI |
| erp-maint | saichler/erp-maint | erp-maint | true | yes | - | Maintenance |

### Namespace convention — CHANGING
l8erp currently uses **separate namespaces per service** (erp, erp-vnet, erp-web, erp-logs-vnet, erp-log-agent, erp-maint). Both fmc and probler use a **single namespace** for all services. The separate namespaces cause issues with PVCs (PVCs are namespace-scoped, so a shared PVC cannot be referenced across namespaces). **All services will be consolidated into a single namespace `l8erp`** to match the fmc/probler pattern and enable shared PVC support in the GKE mode.

### build-all-images.sh gaps
The `maint` service is NOT included in `build-all-images.sh`.

### Rule violations in current YAMLs
1. `vnet.yaml` — missing `NODE_IP` env var (required by `k8s-yaml-required-entries.md`)
2. `logs.yaml` — missing `NODE_IP` env var (required by `k8s-yaml-required-entries.md`)

## Reference: fmc pattern (closest to l8erp architecture)

FMC has the same service topology as l8erp (vnet, log-vnet, log-agent, main, web) minus maint. FMC uses:
- Single namespace (`fmc`) for all services
- Four YAML files: `fmc-local.yaml`, `fmc-baremetal.yaml`, `fmc-gke.yaml`, `fmc-kind.yaml`
- `kind-start.sh` / `kind-stop.sh` scripts
- `deploy.sh` / `undeploy.sh` reference `fmc-local.yaml`

## Naming Convention

All file names, StorageClass names, PVC names, and the KIND cluster name use the `l8erp` prefix to match the namespace. This follows the fmc/probler convention where the prefix matches the namespace:
- fmc: namespace `fmc`, files `fmc-*.yaml`, cluster `fmc`
- probler: namespace `probler`, files `probler-*.yaml`, cluster `probler`
- **l8erp**: namespace `l8erp`, files `l8erp-*.yaml`, cluster `l8erp`

## Design Decisions

### 1. Namespace convention
**Consolidate all services into a single `l8erp` namespace.** The old per-service namespace layout (erp, erp-vnet, erp-web, etc.) causes PVC issues — PVCs are namespace-scoped, so shared PVCs in GKE mode cannot work across namespaces. This matches fmc (single `fmc` namespace) and probler (single `probler` namespace). A single Namespace definition at the top of each YAML replaces the 6 separate Namespace blocks.

### 2. Storage sizes (KIND/baremetal)
Following fmc proportions adapted for l8erp:

| Service | KIND | Baremetal |
|---------|------|----------|
| erp-vnet | 5Gi | 5Gi |
| erp-logs-vnet | 5Gi | 5Gi |
| erp-log-agent | 2Gi | 2Gi |
| erp | 10Gi | 10Gi |
| erp-web | 2Gi | 2Gi |
| erp-maint | 5Gi | 5Gi |

### 3. Baremetal replicas
3 replicas per service (matching fmc pattern).

### 4. GKE shared PVC
50Gi shared PVC `l8erp-data` in namespace `l8erp` (matching fmc pattern). Single namespace enables all services to share the PVC.

### 5. KIND port mappings
Ports 2443, 4443 (matching fmc pattern — TLS web and vnet ports).

---

## Phase 1: Create consolidated `l8erp-local.yaml`

Merge the 6 individual YAMLs into a single `k8s/l8erp-local.yaml` file, fixing rule violations:
- Single Namespace definition: `l8erp` (replaces 6 separate namespace blocks)
- All services use `namespace: l8erp`
- Add `NODE_IP` env var to `erp-vnet` container
- Add `NODE_IP` env var to `erp-logs-vnet` container
- Keep all DaemonSets with hostPath volumes

**Source**: Merge content from `vnet.yaml`, `logs.yaml`, `log-agent.yaml`, `erp.yaml`, `web.yaml`, `maint.yaml` with `---` separators, consolidating all namespaces to `l8erp`.

## Phase 2: Create `l8erp-kind.yaml`

Convert from `l8erp-local.yaml`:
- Add KIND header comment (no custom StorageClass needed)
- Convert all DaemonSets to StatefulSets with `replicas: 1`
- Add `serviceName` to each StatefulSet spec
- Replace `volumes` + `hostPath` with `volumeClaimTemplates` using `storageClassName: standard`
- Remove `volumes` sections
- Keep all hostNetwork, env vars, ports, and image settings identical

## Phase 3: Create `l8erp-baremetal.yaml`

Convert from `l8erp-local.yaml`:
- Add bare-metal header comment with local-path-provisioner prerequisite
- Add StorageClass definition: `l8erp-local-storage` with `rancher.io/local-path` provisioner
- Convert all DaemonSets to StatefulSets with `replicas: 3`
- Add `serviceName` to each StatefulSet spec
- Add `podAntiAffinity` (`requiredDuringSchedulingIgnoredDuringExecution` on `kubernetes.io/hostname`) to each
- Replace `volumes` + `hostPath` with `volumeClaimTemplates` using `storageClassName: l8erp-local-storage`

## Phase 4: Create `l8erp-gke.yaml`

Convert from `l8erp-local.yaml`:
- Add StorageClass definition: `l8erp-storage` with `kubernetes.io/gce-pd` provisioner, `pd-standard`, `reclaimPolicy: Retain`
- Add shared PersistentVolumeClaim: `l8erp-data`, 50Gi, `storageClassName: l8erp-storage`, namespace `l8erp`
- Keep DaemonSets (GKE handles native scheduling)
- Replace `hostPath` volumes with `persistentVolumeClaim: claimName: l8erp-data`

## Phase 5: Create `kind-start.sh`

Copy from fmc's `kind-start.sh` and adapt:
- `CLUSTER_NAME="l8erp"`
- Docker images list: `saichler/erp-vnet`, `saichler/erp-logs-vnet`, `saichler/erp-log-agent`, `saichler/erp`, `saichler/erp-web`, `saichler/erp-maint`
- Port mappings: 2443, 4443 (matching fmc)
- Apply `l8erp-kind.yaml`
- Wait for StatefulSets in namespace `l8erp` (erp-vnet, erp-logs-vnet, erp, erp-web, erp-log-agent, erp-maint)

## Phase 6: Create `kind-stop.sh`

Copy from fmc's `kind-stop.sh` and adapt:
- `CLUSTER_NAME="l8erp"`

## Phase 7: Update `deploy.sh` and `undeploy.sh`

Update to reference `l8erp-local.yaml`:
```bash
# deploy.sh
kubectl apply -f ./l8erp-local.yaml

# undeploy.sh
kubectl delete -f ./l8erp-local.yaml
```

## Phase 8: Update `build-all-images.sh`

Add the `maint` service build to `go/build-all-images.sh`.

## Phase 9: Clean up old individual YAML files

Remove the 6 individual YAML files that are now consolidated into `l8erp-local.yaml`:
- `vnet.yaml`, `erp.yaml`, `web.yaml`, `logs.yaml`, `log-agent.yaml`, `maint.yaml`

## Phase 10: End-to-End Verification

For every artifact produced by this plan:

1. **File existence**: All four YAMLs and both KIND scripts exist
2. **Namespace consistency**: All four YAMLs use only `namespace: l8erp` (no old per-service namespaces)
3. **Storage mode correctness**:
   - Local: hostPath only (no StorageClass, no PVC, no volumeClaimTemplates)
   - Baremetal: `l8erp-local-storage` StorageClass, volumeClaimTemplates
   - GKE: `l8erp-storage` StorageClass, shared `l8erp-data` PVC
   - KIND: no custom StorageClass, `storageClassName: standard` in volumeClaimTemplates
4. **Image parity**: Same `image:` tags across all four files
5. **NODE_IP completeness**: 6 NODE_IP env vars in each of the four files (one per service)
6. **Old files removed**: No `vnet.yaml`, `erp.yaml`, `web.yaml`, `logs.yaml`, `log-agent.yaml`, `maint.yaml`
7. **build-all-images.sh**: `maint` service included
8. **deploy.sh / undeploy.sh**: Reference `l8erp-local.yaml`
9. **KIND scripts executable**: `kind-start.sh` and `kind-stop.sh` have execute permission

```bash
# 1. File existence
ls k8s/l8erp-local.yaml k8s/l8erp-baremetal.yaml k8s/l8erp-gke.yaml k8s/l8erp-kind.yaml
ls -la k8s/kind-start.sh k8s/kind-stop.sh

# 2. Namespace consistency
for f in k8s/l8erp-{local,baremetal,gke,kind}.yaml; do
  echo "$f:"
  grep "namespace:" "$f" | sort -u
  # Expected: only "  namespace: l8erp" and "  name: l8erp"
done

# 3. Storage mode correctness
grep -c "StorageClass\|PersistentVolumeClaim\|volumeClaimTemplates" k8s/l8erp-local.yaml
# Expected: 0
grep "rancher.io/local-path" k8s/l8erp-baremetal.yaml
grep "l8erp-local-storage" k8s/l8erp-baremetal.yaml
grep "kubernetes.io/gce-pd" k8s/l8erp-gke.yaml
grep "l8erp-data" k8s/l8erp-gke.yaml
grep -c "kind: StorageClass" k8s/l8erp-kind.yaml
# Expected: 0
grep "storageClassName: standard" k8s/l8erp-kind.yaml

# 4. Image parity
diff <(grep "image:" k8s/l8erp-local.yaml | sort) <(grep "image:" k8s/l8erp-baremetal.yaml | sort)
diff <(grep "image:" k8s/l8erp-local.yaml | sort) <(grep "image:" k8s/l8erp-gke.yaml | sort)
diff <(grep "image:" k8s/l8erp-local.yaml | sort) <(grep "image:" k8s/l8erp-kind.yaml | sort)

# 5. NODE_IP completeness
for f in k8s/l8erp-{local,baremetal,gke,kind}.yaml; do echo "$f:"; grep -c "NODE_IP" "$f"; done
# Expected: 6 in each file

# 6. Old files removed
for f in vnet.yaml erp.yaml web.yaml logs.yaml log-agent.yaml maint.yaml; do
  test ! -f "k8s/$f" && echo "OK: $f removed" || echo "FAIL: $f still exists"
done

# 7. build-all-images.sh
grep "maint" go/build-all-images.sh

# 8. deploy.sh / undeploy.sh
grep "l8erp-local.yaml" k8s/deploy.sh k8s/undeploy.sh
```

---

## Traceability Matrix

| # | Gap / Action Item | Phase |
|---|-------------------|-------|
| 1 | No consolidated local YAML | Phase 1 |
| 2 | 6 separate namespaces → single `l8erp` namespace | Phase 1 |
| 3 | Missing NODE_IP on erp-vnet | Phase 1 |
| 4 | Missing NODE_IP on erp-logs-vnet | Phase 1 |
| 5 | No KIND YAML | Phase 2 |
| 6 | No baremetal YAML | Phase 3 |
| 7 | No GKE YAML | Phase 4 |
| 8 | No kind-start.sh | Phase 5 |
| 9 | No kind-stop.sh | Phase 6 |
| 10 | deploy.sh references individual files | Phase 7 |
| 11 | undeploy.sh references individual files | Phase 7 |
| 12 | maint missing from build-all-images.sh | Phase 8 |
| 13 | Old individual YAMLs should be removed | Phase 9 |
| 14 | End-to-end verification of all artifacts | Phase 10 |

## Rule Compliance

| Rule | Status |
|------|--------|
| `k8s-three-deployment-modes.md` | All four modes + KIND scripts produced |
| `k8s-yaml-required-entries.md` | Namespace labels, resource labels, NODE_IP env, hdata volume name — all present in all four files |
| `deployment-artifacts.md` | build-all-images.sh updated to include maint |
| `log-services-required.md` | log-vnet and log-agent included in all four modes |
| `plan-traceability-and-verification.md` | Traceability matrix present; Phase 10 is the final verification phase |
