#!/usr/bin/env bash
set -e

# Arguments may be given in any order: [tag] [amd64|arm64]
# A blank architecture builds both amd64 and arm64.
TAG="latest"
ARCH=""
for arg in "$@"; do
    case "$arg" in
        "")            ;;
        -h|--help)     echo "Usage: $0 [tag] [amd64|arm64]"; echo "  Arguments may be in any order. Blank architecture builds the host architecture;"; echo "  'both' builds amd64 + arm64 (needs arm64 builder/erp-security/erp-postgres base images)."; exit 0 ;;
        amd64|x86_64)  ARCH="amd64" ;;
        arm64|aarch64) ARCH="arm64" ;;
        both)          ARCH="both" ;;
        *)             TAG="$arg" ;;
    esac
done
# Default: the host architecture. The base images (builder, erp-security,
# erp-postgres) are built locally by l8secure for the host only, so a blank
# dual-arch build could not resolve its arm64 bases. 'both' builds both.
if [ -z "$ARCH" ]; then
    case "$(uname -m)" in
        aarch64|arm64) ARCH="arm64" ;;
        *)             ARCH="amd64" ;;
    esac
fi
if [ "$ARCH" = "both" ]; then
    PLATFORM="linux/amd64,linux/arm64"
else
    PLATFORM="linux/$ARCH"
fi

echo "Building registry.layer-8.dev:44443/erp/erp-log-agent:${TAG} for ${PLATFORM}"
docker buildx build --no-cache --platform="$PLATFORM" -t registry.layer-8.dev:44443/erp/erp-log-agent:${TAG} --push .
