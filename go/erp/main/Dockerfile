FROM saichler/builder:latest AS build

COPY erp_main.go /home/src/github.com/saichler/build/
COPY erp_bi.go /home/src/github.com/saichler/build/
COPY erp_comp.go /home/src/github.com/saichler/build/
COPY erp_crm.go /home/src/github.com/saichler/build/
COPY erp_doc.go /home/src/github.com/saichler/build/
COPY erp_ecom.go /home/src/github.com/saichler/build/
COPY erp_fin.go /home/src/github.com/saichler/build/
COPY erp_hcm.go /home/src/github.com/saichler/build/
COPY erp_mfg.go /home/src/github.com/saichler/build/
COPY erp_prj.go /home/src/github.com/saichler/build/
COPY erp_sales.go /home/src/github.com/saichler/build/
COPY erp_scm.go /home/src/github.com/saichler/build/
COPY erp_sys.go /home/src/github.com/saichler/build/
RUN go mod init
RUN GOPROXY=direct GOPRIVATE=github.com go mod tidy
RUN go build -o erp

FROM saichler/erp-postgres:latest AS final

COPY --from=build /home/src/github.com/saichler/build/erp /home/run/erp

ENTRYPOINT ["/home/run/erp"]