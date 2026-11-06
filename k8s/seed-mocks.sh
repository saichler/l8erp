#!/usr/bin/env bash
set -e

# Uploads the mock data set (go/tests/mocks) into a running l8erp deployment.
# Called by kind-start.sh once every pod is Ready; can also be re-run by hand
# against a fresh cluster. The target defaults to the KIND host port mapping.
ADDRESS="${L8ERP_BASE_URL:-https://localhost:2773}"
SEED_USER="${L8ERP_SEED_USER:-operator}"
SEED_PASS="${L8ERP_SEED_PASS:-Oper123!}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Waiting for ${ADDRESS} to answer..."
for i in $(seq 1 60); do
  if curl -sk -o /dev/null "${ADDRESS}/login.json"; then
    break
  fi
  sleep 2
done

echo "Uploading mock data to ${ADDRESS} as ${SEED_USER}..."
cd "${SCRIPT_DIR}/../go"
go run ./tests/mocks/cmd --address "${ADDRESS}" --user "${SEED_USER}" --password "${SEED_PASS}" --insecure
