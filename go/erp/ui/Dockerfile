FROM saichler/builder:latest AS build

COPY ./main/main.go /home/src/github.com/saichler/build/

RUN go mod init
RUN GOPROXY=direct GOPRIVATE=github.com go mod tidy
RUN go build -o erpweb

FROM saichler/erp-security:latest AS final
COPY --from=build /home/src/github.com/saichler/build/erpweb /home/run/erpweb
COPY ./web /home/run/web

ENTRYPOINT ["/home/run/erpweb"]