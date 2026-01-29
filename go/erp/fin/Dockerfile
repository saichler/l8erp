FROM saichler/builder:latest AS build

COPY fin_main.go /home/src/github.com/saichler/build/main.go
RUN go mod init
RUN GOPROXY=direct GOPRIVATE=github.com go mod tidy
RUN go build -o fin

FROM saichler/erp-postgres:latest AS final

COPY --from=build /home/src/github.com/saichler/build/fin /home/run/fin

ENTRYPOINT ["/home/run/fin"]