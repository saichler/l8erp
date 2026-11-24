#!/usr/bin/env bash
set -e

CLUSTER_NAME="l8erp"

# Pin the target cluster instead of inheriting the ambient context. `kind
# create cluster` rewrites the global current-context, so whichever kind
# cluster was created last would otherwise own every kubectl call here --
# which is how one project's pods end up inside another's cluster.
KUBECTL=(kubectl --context "kind-${CLUSTER_NAME}")
KIND_CONFIG="kind-cluster.yaml"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Install KIND if not present
if ! command -v kind &>/dev/null; then
  echo "kind not found — installing..."
  if [[ "$(uname)" == "Darwin" ]]; then
    brew install kind
  else
    curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
    chmod +x ./kind
    sudo mv ./kind /usr/local/bin/kind
  fi
  echo "kind installed: $(kind version)"
fi

# Check if cluster already exists
if kind get clusters 2>/dev/null | grep -q "^${CLUSTER_NAME}$"; then
  echo "KIND cluster '${CLUSTER_NAME}' already exists."
  echo "Run ./kind-stop.sh first if you want to recreate it."
  exit 1
fi

# Harbor pull credentials for the KIND nodes. The Harbor project is private
# and every manifest uses imagePullPolicy: Always (a `kind load`-ed image is
# not used), so the kubelet must authenticate. Kind's documented way: mount a
# docker config.json at /var/lib/kubelet/config.json on every node. Only the
# Harbor entry is copied out of the host's docker config.
REGISTRY="registry.layer-8.dev:44443"
REG_DIR="${HOME}/.cache/l8erp-kind"
REG_CONFIG="${REG_DIR}/registry-config.json"
mkdir -p "${REG_DIR}"
chmod 700 "${REG_DIR}"
( umask 077
  python3 - "${HOME}/.docker/config.json" "${REGISTRY}" > "${REG_CONFIG}" <<'PYEOF'
import json, sys
cfg = json.load(open(sys.argv[1]))
reg = sys.argv[2]
auth = cfg.get('auths', {}).get(reg, {}).get('auth')
if not auth:
    sys.exit('no inline auth for %s in %s -- run: docker login %s' % (reg, sys.argv[1], reg))
json.dump({'auths': {reg: {'auth': auth}}}, sys.stdout)
PYEOF
)

# Write cluster config
cat > "${SCRIPT_DIR}/${KIND_CONFIG}" <<EOF
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    extraMounts:
      - hostPath: ${REG_CONFIG}
        containerPath: /var/lib/kubelet/config.json
    kubeadmConfigPatches:
      - |
        kind: InitConfiguration
        nodeRegistration:
          taints:
            - key: node-role.kubernetes.io/control-plane
              effect: NoSchedule
  - role: worker
    extraMounts:
      - hostPath: ${REG_CONFIG}
        containerPath: /var/lib/kubelet/config.json
    extraPortMappings:
      - containerPort: 2773
        hostPort: 2773
        protocol: TCP
      - containerPort: 4443
        hostPort: 4443
        protocol: TCP
EOF

echo "Creating KIND cluster '${CLUSTER_NAME}' (1 control-plane + 1 worker)..."
kind create cluster --name "${CLUSTER_NAME}" --config "${SCRIPT_DIR}/${KIND_CONFIG}"

echo "Waiting for nodes to be Ready..."
"${KUBECTL[@]}" wait --for=condition=Ready nodes --all --timeout=120s

# Images are pulled from Harbor (imagePullPolicy: Always) with the credentials
# mounted above; push changed images to registry.layer-8.dev:44443/erp before
# starting. No `kind load`.

echo "Phase 1: Deploying namespace + vnets..."
MANIFEST="${SCRIPT_DIR}/l8erp-kind.yaml"
"${KUBECTL[@]}" apply -f "${MANIFEST}"

echo "Waiting for erp-vnet to be Ready..."
"${KUBECTL[@]}" -n l8erp rollout status statefulset/erp-vnet --timeout=120s

echo "Waiting for erp-logs-vnet to be Ready..."
"${KUBECTL[@]}" -n l8erp rollout status statefulset/erp-logs-vnet --timeout=120s

echo "Phase 2: Waiting for all services to be Ready..."
for sts in erp erp-web erp-log-agent erp-chat-orm erp-chat erp-chat-router erp-chat-users erp-chat-agent; do
  echo "  Waiting for ${sts}..."
  "${KUBECTL[@]}" -n l8erp rollout status statefulset/"${sts}" --timeout=180s
done

echo "Phase 3: Seeding mock data..."
"${SCRIPT_DIR}/seed-mocks.sh"

echo ""
echo "KIND cluster '${CLUSTER_NAME}' is up and l8erp is deployed."
echo "Run 'kubectl get pods -n l8erp' to check status."
echo "Run './kind-stop.sh' to tear down."
