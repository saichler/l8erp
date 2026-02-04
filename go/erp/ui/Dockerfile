FROM saichler/builder:latest AS build

COPY main.go /home/src/github.com/saichler/build/main.go
COPY main2.go /home/src/github.com/saichler/build/main2.go
COPY shared.go /home/src/github.com/saichler/build/shared.go

RUN go mod init
RUN GOPROXY=direct GOPRIVATE=github.com go mod tidy
RUN go build -o erpweb main.go shared.go
RUN go build -o erpweb2 main2.go shared.go

FROM saichler/erp-security:latest AS final
COPY --from=build /home/src/github.com/saichler/build/erpweb /home/run/erpweb
COPY --from=build /home/src/github.com/saichler/build/erpweb2 /home/run/erpweb2
COPY ./web /home/run/web
COPY ./entrypoint.sh /home/run/entrypoint.sh

ENTRYPOINT ["/home/run/entrypoint.sh"]