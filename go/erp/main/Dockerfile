FROM saichler/builder:latest AS build

# Populated automatically by buildx from --platform (blank => host default).
ARG TARGETOS=linux
ARG TARGETARCH

COPY erp_main.go /home/src/github.com/saichler/build/
RUN go mod init
RUN GOPROXY=direct GOPRIVATE=github.com go mod tidy
RUN GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build -o erp

FROM saichler/erp-postgres:latest AS final

COPY --from=build /home/src/github.com/saichler/build/erp /home/run/erp

ENTRYPOINT ["/home/run/erp"]
