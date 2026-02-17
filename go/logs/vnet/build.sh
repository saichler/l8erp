#!/usr/bin/env bash
set -e
docker build --no-cache --platform=linux/amd64 -t saichler/erp-logs-vnet:latest .
docker push saichler/erp-logs-vnet:latest
