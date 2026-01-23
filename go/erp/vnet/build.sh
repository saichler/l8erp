#!/usr/bin/env bash
set -e
docker build --no-cache --platform=linux/amd64 -t saichler/erp-vnet:latest .
docker push saichler/erp-vnet:latest
