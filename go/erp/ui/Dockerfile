FROM saichler/builder:latest AS build

COPY ./main1/main.go /home/src/github.com/saichler/build/
COPY ./main2/main2.go /home/src/github.com/saichler/build/
COPY shared.go /home/src/github.com/saichler/build/
COPY shared_crm.go /home/src/github.com/saichler/build/
COPY shared_fin.go /home/src/github.com/saichler/build/
COPY shared_mfg.go /home/src/github.com/saichler/build/
COPY shared_other.go /home/src/github.com/saichler/build/
COPY shared_prj.go /home/src/github.com/saichler/build/
COPY shared_sales.go /home/src/github.com/saichler/build/
COPY shared_scm.go /home/src/github.com/saichler/build/

RUN go mod init
RUN GOPROXY=direct GOPRIVATE=github.com go mod tidy
RUN go build -o erpweb main.go
RUN go build -o erpweb2 main2.go

FROM saichler/erp-security:latest AS final
COPY --from=build /home/src/github.com/saichler/build/erpweb /home/run/erpweb
COPY --from=build /home/src/github.com/saichler/build/erpweb2 /home/run/erpweb2
COPY ./web /home/run/web
COPY ./entrypoint.sh /home/run/entrypoint.sh

ENTRYPOINT ["/home/run/entrypoint.sh"]