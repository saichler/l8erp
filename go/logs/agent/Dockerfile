FROM saichler/builder:latest AS build

COPY main.go /home/src/github.com/saichler/build/main.go
RUN go mod init
RUN GOPROXY=direct GOPRIVATE=github.com go mod tidy
RUN go build -o log-agent

FROM saichler/erp-security:latest AS final
COPY --from=build /home/src/github.com/saichler/build/log-agent /home/run/log-agent

ENTRYPOINT ["/home/run/log-agent"]