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

# The web server serves static files at once but registers each service's
# endpoint only when that service announces itself, so a fresh deployment
# answers 404 on /erp/40/Currency (the seed's first write) for a while.
# Wait until it is registered rather than failing the whole seed on it.
echo "Waiting for the service endpoints to register..."
TOKEN=""
for i in $(seq 1 90); do
  TOKEN="$(curl -sk -X POST "${ADDRESS}/auth" -H 'Content-Type: application/json' \
    -d "{\"user\":\"${SEED_USER}\",\"pass\":\"${SEED_PASS}\"}" | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')"
  if [ -n "$TOKEN" ]; then
    CODE="$(curl -sk -o /dev/null -w '%{http_code}' -G "${ADDRESS}/erp/40/Currency" \
      -H "Authorization: Bearer ${TOKEN}" --data-urlencode 'body={"text":"select * from Currency limit 1 page 0"}')"
    [ "$CODE" != "404" ] && [ "$CODE" != "000" ] && break
  fi
  sleep 2
done
if [ "${CODE:-404}" = "404" ] || [ "${CODE:-000}" = "000" ]; then
  echo "error: ${ADDRESS}/erp/40/Currency never registered (last HTTP ${CODE:-none})" >&2
  exit 1
fi

echo "Uploading mock data to ${ADDRESS} as ${SEED_USER}..."
cd "${SCRIPT_DIR}/../go"
go run ./tests/mocks/cmd --address "${ADDRESS}" --user "${SEED_USER}" --password "${SEED_PASS}" --insecure
