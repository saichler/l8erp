FROM saichler/builder:latest AS build

ENV CGO_ENABLED 1
COPY main.go /home/src/github.com/saichler/build/main.go
RUN go mod init
RUN GOPROXY=direct GOPRIVATE=github.com go mod tidy
RUN go mod vendor

WORKDIR /home/src/github.com/saichler/build
RUN go build -o erp-vnet

FROM saichler/erp-security:latest AS final
COPY --from=build /home/src/github.com/saichler/build/erp-vnet /home/run/erp-vnet

ENTRYPOINT ["/home/run/erp-vnet"]