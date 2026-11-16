FROM builder:latest AS build

# Populated automatically by buildx from --platform (blank => host default).
ARG TARGETOS=linux
ARG TARGETARCH

COPY main.go /home/src/github.com/saichler/build/main.go
COPY help.md /home/src/github.com/saichler/build/help.md
RUN go mod init
RUN GOPROXY=direct GOPRIVATE=github.com go mod tidy
RUN GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build -o chatagent

FROM erp-security:latest AS final

COPY --from=build /home/src/github.com/saichler/build/chatagent /home/run/chatagent

ENTRYPOINT ["/home/run/chatagent"]
