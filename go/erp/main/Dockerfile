FROM builder:latest AS build

# Populated automatically by buildx from --platform (blank => host default).
ARG TARGETOS=linux
ARG TARGETARCH

COPY erp_main.go /home/src/github.com/saichler/build/
RUN --mount=type=cache,target=/home/pkg/mod --mount=type=cache,target=/root/.cache/go-build go mod init
RUN --mount=type=cache,target=/home/pkg/mod --mount=type=cache,target=/root/.cache/go-build GOPROXY=direct GOPRIVATE=github.com go mod tidy
# Some layer8 modules still pin older siblings; move every layer8 module to its
# current version so they build together (and match the security plugin).
RUN --mount=type=cache,target=/home/pkg/mod --mount=type=cache,target=/root/.cache/go-build GOPROXY=direct GOPRIVATE=github.com go get $(go list -m all | awk '/^github.com\/saichler\// && $1 != "github.com/saichler/build" {print $1"@latest"}')
RUN --mount=type=cache,target=/home/pkg/mod --mount=type=cache,target=/root/.cache/go-build GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build -o erp

FROM erp-postgres:latest AS final

COPY --from=build /home/src/github.com/saichler/build/erp /home/run/erp

ENTRYPOINT ["/home/run/erp"]
