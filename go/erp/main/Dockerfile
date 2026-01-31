FROM saichler/builder:latest AS build

COPY erp_main.go /home/src/github.com/saichler/build/main.go
RUN go mod init
RUN GOPROXY=direct GOPRIVATE=github.com go mod tidy
RUN go build -o erp

FROM saichler/erp-postgres:latest AS final

COPY --from=build /home/src/github.com/saichler/build/erp /home/run/erp

ENTRYPOINT ["/home/run/erp"]