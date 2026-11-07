#!/usr/bin/env bash
# Creates the Secrets the l8erp namespace needs before the manifests apply:
#   harbor-pull   pulls the images from the private Harbor project
#                 (registry.layer-8.dev:44443/erp)
# An existing Secret is never replaced.
#
# The credentials come from l8secure's harbor/harbor.yaml.b64 (base64 YAML:
# registry, username, password); HARBOR_CREDS points at another copy of that
# file. KIND does not need this: kind-start.sh loads the images into the nodes.
#
# Usage: ./secrets.sh [context]   (default: KUBE_CONTEXT, else the current one)
set -e

KUBE_CONTEXT="${1:-${KUBE_CONTEXT:-$(kubectl config current-context 2>/dev/null)}}"
if [ -z "$KUBE_CONTEXT" ]; then
  echo "error: no current kubectl context -- pass one or set KUBE_CONTEXT=<context>" >&2
  exit 1
fi
KUBECTL=(kubectl --context "${KUBE_CONTEXT}")

"${KUBECTL[@]}" get namespace l8erp >/dev/null 2>&1 || "${KUBECTL[@]}" create namespace l8erp

if "${KUBECTL[@]}" -n l8erp get secret harbor-pull >/dev/null 2>&1; then
  echo "Secret harbor-pull already exists; keeping it."
  exit 0
fi

HARBOR_CREDS="${HARBOR_CREDS:-$(cd "$(dirname "$0")" && pwd)/../../l8secure/harbor/harbor.yaml.b64}"
[ -f "$HARBOR_CREDS" ] || { echo "missing $HARBOR_CREDS (set HARBOR_CREDS to l8secure/harbor/harbor.yaml.b64)"; exit 1; }
HARBOR_YAML="$(base64 -d "$HARBOR_CREDS")"
harbor_get() { printf '%s\n' "$HARBOR_YAML" | sed -n "s/^$1:[[:space:]]*//p" | head -n1; }
REGISTRY="$(harbor_get registry)"
USERNAME="$(harbor_get username)"
PASSWORD="$(harbor_get password)"
if [ -z "$REGISTRY" ] || [ -z "$USERNAME" ] || [ -z "$PASSWORD" ]; then
  echo "$HARBOR_CREDS must contain registry, username and password"
  exit 1
fi
echo "Creating the Harbor pull secret for $REGISTRY..."
"${KUBECTL[@]}" -n l8erp create secret docker-registry harbor-pull \
  --docker-server="$REGISTRY" --docker-username="$USERNAME" --docker-password="$PASSWORD"
