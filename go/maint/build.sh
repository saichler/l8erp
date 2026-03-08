#!/usr/bin/env bash
set -e
docker build --no-cache --platform=linux/amd64 -t saichler/erp-maint:latest .
docker push saichler/erp-maint:latest
