#!/usr/bin/env bash
set -e

CLUSTER_NAME="l8erp"
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

# Write cluster config
cat > "${SCRIPT_DIR}/${KIND_CONFIG}" <<'EOF'
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    kubeadmConfigPatches:
      - |
        kind: InitConfiguration
        nodeRegistration:
          taints:
            - key: node-role.kubernetes.io/control-plane
              effect: NoSchedule
  - role: worker
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
kubectl wait --for=condition=Ready nodes --all --timeout=120s

echo "Loading Docker images into KIND cluster..."
IMAGES=(
  saichler/erp-vnet:latest
  saichler/erp-logs-vnet:latest
  saichler/erp-log-agent:latest
  saichler/erp:latest
  saichler/erp-web:latest
  saichler/erp-maint:latest
)

for img in "${IMAGES[@]}"; do
  if docker image inspect "$img" &>/dev/null; then
    echo "  Loading $img..."
    kind load docker-image "$img" --name "${CLUSTER_NAME}"
  else
    echo "  SKIP $img (not found locally — will pull from registry)"
  fi
done

echo "Phase 1: Deploying namespace + vnets..."
kubectl apply -f "${SCRIPT_DIR}/l8erp-kind.yaml"

echo "Waiting for erp-vnet to be Ready..."
kubectl -n l8erp rollout status statefulset/erp-vnet --timeout=120s

echo "Waiting for erp-logs-vnet to be Ready..."
kubectl -n l8erp rollout status statefulset/erp-logs-vnet --timeout=120s

echo "Phase 2: Waiting for all services to be Ready..."
for sts in erp erp-web erp-log-agent erp-maint; do
  echo "  Waiting for ${sts}..."
  kubectl -n l8erp rollout status statefulset/"${sts}" --timeout=180s
done

echo ""
echo "KIND cluster '${CLUSTER_NAME}' is up and l8erp is deployed."
echo "Run 'kubectl get pods -n l8erp' to check status."
echo "Run './kind-stop.sh' to tear down."
