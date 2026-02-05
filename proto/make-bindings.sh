#!/usr/bin/env bash

set -e

wget https://raw.githubusercontent.com/saichler/l8types/refs/heads/main/proto/api.proto

# Use the protoc image to run protoc.sh and generate the bindings.

# Shared ERP types (must be first - other modules depend on it)
docker run --user "$(id -u):$(id -g)" -e PROTO=erp-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest

# Human Capital Management
docker run --user "$(id -u):$(id -g)" -e PROTO=hcm-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=hcm-core_hr.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=hcm-payroll.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=hcm-benefits.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=hcm-time_attendance.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=hcm-talent.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=hcm-learning.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=hcm-compensation.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest

# Financial Management
docker run --user "$(id -u):$(id -g)" -e PROTO=fin-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=fin-general_ledger.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=fin-accounts_payable.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=fin-accounts_receivable.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=fin-cash_management.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=fin-fixed_assets.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=fin-budgeting.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=fin-tax.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest

# Supply Chain Management
docker run --user "$(id -u):$(id -g)" -e PROTO=scm-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=scm-procurement.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=scm-inventory.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=scm-warehouse.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=scm-logistics.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=scm-demand_planning.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=scm-supply_planning.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest

# Sales and Distribution
docker run --user "$(id -u):$(id -g)" -e PROTO=sales-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=sales-customer.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=sales-orders.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=sales-pricing.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=sales-shipping.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=sales-billing.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=sales-analytics.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest

# Manufacturing
docker run --user "$(id -u):$(id -g)" -e PROTO=mfg-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=mfg-engineering.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=mfg-production.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=mfg-shopfloor.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=mfg-quality.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=mfg-planning.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=mfg-costing.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest

# Customer Relationship Management
docker run --user "$(id -u):$(id -g)" -e PROTO=crm-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=crm-leads.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=crm-opportunities.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=crm-accounts.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=crm-marketing.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=crm-service.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=crm-fieldservice.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest

# Project Management
docker run --user "$(id -u):$(id -g)" -e PROTO=prj-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=prj-planning.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=prj-resources.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=prj-timeexpense.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=prj-billing.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=prj-analytics.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest

# Business Intelligence
docker run --user "$(id -u):$(id -g)" -e PROTO=bi-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=bi-reporting.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=bi-dashboards.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=bi-analytics.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=bi-datamanagement.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest

# Document Management
docker run --user "$(id -u):$(id -g)" -e PROTO=doc-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=doc-storage.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=doc-workflow.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=doc-integration.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=doc-compliance.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest

# E-Commerce
docker run --user "$(id -u):$(id -g)" -e PROTO=ecom-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=ecom-catalog.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=ecom-orders.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=ecom-customers.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=ecom-promotions.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest

rm api.proto

# Now move the generated bindings to the models directory and clean up
rm -rf ../go/types
mkdir -p ../go/types
mv ./types/* ../go/types/.
rm -rf ./types

rm -rf *.rs

cd ../go
find . -name "*.go" -type f -exec sed -i 's|"./types/l8services"|"github.com/saichler/l8types/go/types/l8services"|g' {} +
find . -name "*.go" -type f -exec sed -i 's|"./types/l8api"|"github.com/saichler/l8types/go/types/l8api"|g' {} +
find . -name "*.go" -type f -exec sed -i 's|"./types/erp"|"github.com/saichler/l8erp/go/types/erp"|g' {} +
find . -name "*.go" -type f -exec sed -i 's|"./types/scm"|"github.com/saichler/l8erp/go/types/scm"|g' {} +
find . -name "*.go" -type f -exec sed -i 's|"./types/sales"|"github.com/saichler/l8erp/go/types/sales"|g' {} +
find . -name "*.go" -type f -exec sed -i 's|"./types/mfg"|"github.com/saichler/l8erp/go/types/mfg"|g' {} +
find . -name "*.go" -type f -exec sed -i 's|"./types/crm"|"github.com/saichler/l8erp/go/types/crm"|g' {} +
find . -name "*.go" -type f -exec sed -i 's|"./types/prj"|"github.com/saichler/l8erp/go/types/prj"|g' {} +
find . -name "*.go" -type f -exec sed -i 's|"./types/bi"|"github.com/saichler/l8erp/go/types/bi"|g' {} +
find . -name "*.go" -type f -exec sed -i 's|"./types/doc"|"github.com/saichler/l8erp/go/types/doc"|g' {} +
find . -name "*.go" -type f -exec sed -i 's|"./types/ecom"|"github.com/saichler/l8erp/go/types/ecom"|g' {} +