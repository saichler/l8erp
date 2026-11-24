#!/usr/bin/env bash

# Builds and pushes the l8erp images, several at a time.
#
#   ./build-all-images.sh [tag] [amd64|arm64|both] [-j N] [image ...]
#
#   tag      image tag (default: latest)
#   arch     blank = host architecture; 'both' = amd64 + arm64 (needs arm64
#            builder / erp-security / erp-postgres base images from l8secure)
#   -j N     parallel builds (default: 4)
#   image    build only these (keys below); default: all
#
# Each image's output goes to its own log; a failed image prints its log tail.
# The Dockerfiles share BuildKit cache mounts for the Go module and build
# caches, so after the first image the rest reuse downloaded modules and
# compiled dependencies (`--no-cache` and `go get @latest` stay in effect).

# "<key>:<Display Name>:<directory under go/>"
IMAGES=(
    "vnet:Vnet:erp/vnet"
    "erp:ERP:erp/main"
    "web:UI:erp/ui"
    "maint:Maint:maint"
    "log-agent:Log Agent:logs/agent"
    "log-vnet:Log Vnet:logs/vnet"
    "chat-orm:Chat ORM:erp/chat-orm"
    "chat:Chat:erp/chat"
    "chat-router:Chat Router:erp/chat-router"
    "chat-users:Chat Users:erp/chat-users"
    "chat-agent:Chat Agent:erp/chat-agent"
)

usage() {
    echo "Usage: $0 [tag] [amd64|arm64|both] [-j N] [image ...]"
    echo "  Arguments may be in any order. Blank architecture builds the host architecture."
    echo "  Images:"
    for entry in "${IMAGES[@]}"; do
        echo "    ${entry%%:*}"
    done
}

is_image_key() {
    local k="$1" entry
    for entry in "${IMAGES[@]}"; do
        [ "${entry%%:*}" = "$k" ] && return 0
    done
    return 1
}

TAG="latest"
ARCH=""
JOBS=4
SELECTED=()
while [ $# -gt 0 ]; do
    case "$1" in
        "")            ;;
        -h|--help)     usage; exit 0 ;;
        -j)            shift; JOBS="$1" ;;
        -j*)           JOBS="${1#-j}" ;;
        amd64|x86_64)  ARCH="amd64" ;;
        arm64|aarch64) ARCH="arm64" ;;
        both)          ARCH="both" ;;
        *)
            if is_image_key "$1"; then SELECTED+=("$1"); else TAG="$1"; fi ;;
    esac
    shift
done
case "$JOBS" in
    ''|*[!0-9]*|0) echo "error: -j needs a positive number" >&2; exit 1 ;;
esac

if [ -z "$ARCH" ]; then
    case "$(uname -m)" in
        aarch64|arm64) ARCH="arm64" ;;
        *)             ARCH="amd64" ;;
    esac
fi
ARCH_LABEL="$ARCH"
[ "$ARCH" = "both" ] && ARCH_LABEL="amd64 + arm64"

TODO=()
for entry in "${IMAGES[@]}"; do
    key="${entry%%:*}"
    if [ ${#SELECTED[@]} -eq 0 ] || [[ " ${SELECTED[*]} " == *" $key "* ]]; then
        TODO+=("$entry")
    fi
done

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_DIR="${TMPDIR:-/tmp}/l8erp-build-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$LOG_DIR"

echo "*** Tag: ${TAG} | Architecture: ${ARCH_LABEL} | Parallel: ${JOBS} | Images: ${#TODO[@]} ***"
echo "*** Logs: ${LOG_DIR} ***"

# Current phase of one running build, read from its log.
phase_of() {
    local log="$1" line
    line=$(grep -E '^#[0-9]+ (\[(build|final) +[0-9]+/[0-9]+\]|exporting|pushing|naming|writing image)' "$log" 2>/dev/null | tail -1)
    case "$line" in
        *"go mod tidy"*)        echo "go mod tidy" ;;
        *"go get"*)             echo "go get @latest" ;;
        *"go mod vendor"*)      echo "go mod vendor" ;;
        *"go build"*)           echo "go build" ;;
        *"patch.sh"*)           echo "patching" ;;
        *"[final"*)             echo "final image" ;;
        *exporting*|*naming*|*writing*) echo "exporting" ;;
        *pushing*)              echo "pushing" ;;
        "")                     echo "starting" ;;
        *)                      echo "preparing" ;;
    esac
}

# Network steps (go mod tidy / go get) print a line per module as they go.
# No new log output for STALL_SECS in one of them means a fetch is stuck on a
# single library (e.g. a GitHub connection that only times out after 5 min):
# kill that build and start it again, up to MAX_ATTEMPTS.
STALL_SECS="${STALL_SECS:-30}"
MAX_ATTEMPTS="${MAX_ATTEMPTS:-3}"

# Runs one image's build.sh with the stall watchdog; records its result,
# duration and attempt count in the log dir.
build_one() {
    local key="$1" name="$2" dir="$3" start end rc attempt pid phase idle stalled
    local log="$LOG_DIR/$key.log"
    start=$(date +%s)
    : > "$log"
    for attempt in $(seq 1 $MAX_ATTEMPTS); do
        echo "$attempt" > "$LOG_DIR/$key.attempt"
        echo "===== attempt ${attempt}/${MAX_ATTEMPTS} =====" >> "$log"
        # Own process group, so a stalled build is killed as a whole (the
        # buildx client exiting cancels the BuildKit job).
        setsid bash -c 'cd "$1" && exec ./build.sh "$2" "$3"' _ "$SCRIPT_DIR/$dir" "$TAG" "$ARCH" >> "$log" 2>&1 &
        pid=$!
        stalled=""
        while kill -0 "$pid" 2>/dev/null; do
            sleep 2
            phase=$(phase_of "$log")
            if [ "$phase" = "go mod tidy" ] || [ "$phase" = "go get @latest" ]; then
                idle=$(( $(date +%s) - $(stat -c %Y "$log") ))
                if [ "$idle" -ge "$STALL_SECS" ]; then
                    stalled="$phase"
                    kill -TERM -- "-$pid" 2>/dev/null
                    sleep 2
                    kill -KILL -- "-$pid" 2>/dev/null
                    break
                fi
            fi
        done
        wait "$pid" 2>/dev/null
        rc=$?
        if [ -z "$stalled" ]; then
            break
        fi
        rc=124
        echo "===== stalled ${STALL_SECS}s in ${stalled} -- killed =====" >> "$log"
        if [ "$attempt" -lt "$MAX_ATTEMPTS" ]; then
            echo "  RETRY   ${name}: stuck ${STALL_SECS}s in ${stalled} (attempt ${attempt}/${MAX_ATTEMPTS}), restarting"
        else
            echo "  GIVE UP ${name}: stuck in ${stalled} on all ${MAX_ATTEMPTS} attempts"
        fi
    done
    end=$(date +%s)
    echo "$rc $((end - start))" > "$LOG_DIR/$key.result"
    if [ $rc -eq 0 ]; then
        echo "  OK      ${name} ($((end - start))s)"
    else
        echo "  FAILED  ${name} ($((end - start))s) -- log: $log"
    fi
}

fmt_secs() { printf '%d:%02d' $(($1 / 60)) $(($1 % 60)); }

STATUS_EVERY=10
START_ALL=$(date +%s)
declare -A PIDS=() STARTED=() NAMES=()
queue=("${TODO[@]}")
done_count=0
last_status=0

while [ ${#queue[@]} -gt 0 ] || [ ${#PIDS[@]} -gt 0 ]; do
    # Launch while there is a free slot.
    while [ ${#queue[@]} -gt 0 ] && [ ${#PIDS[@]} -lt "$JOBS" ]; do
        entry="${queue[0]}"; queue=("${queue[@]:1}")
        key="${entry%%:*}"; rest="${entry#*:}"
        name="${rest%%:*}"; dir="${rest#*:}"
        echo "  start   ${name}"
        build_one "$key" "$name" "$dir" &
        PIDS[$key]=$!
        STARTED[$key]=$(date +%s)
        NAMES[$key]="$name"
    done

    # Reap finished builds (build_one prints OK/FAILED itself).
    for key in "${!PIDS[@]}"; do
        if ! kill -0 "${PIDS[$key]}" 2>/dev/null; then
            wait "${PIDS[$key]}" 2>/dev/null
            unset 'PIDS[$key]'
            done_count=$((done_count + 1))
        fi
    done

    # Periodic status: progress, elapsed, and what each running build is doing.
    now=$(date +%s)
    if [ ${#PIDS[@]} -gt 0 ] && [ $((now - last_status)) -ge $STATUS_EVERY ]; then
        last_status=$now
        running_desc=""
        for key in "${!PIDS[@]}"; do
            att=$(cat "$LOG_DIR/$key.attempt" 2>/dev/null || echo 1)
            att_desc=""
            [ "$att" -gt 1 ] && att_desc=", attempt ${att}"
            running_desc+="${NAMES[$key]} [$(phase_of "$LOG_DIR/$key.log")${att_desc}, $(fmt_secs $((now - STARTED[$key])))]  "
        done
        echo "  [$(fmt_secs $((now - START_ALL)))] ${done_count}/${#TODO[@]} done, ${#queue[@]} queued | ${running_desc}"
    fi
    sleep 1
done
END_ALL=$(date +%s)

SUCCEEDED=()
FAILED=()
STALLED=0
for entry in "${TODO[@]}"; do
    key="${entry%%:*}"; rest="${entry#*:}"; name="${rest%%:*}"
    read -r rc secs < "$LOG_DIR/$key.result" 2>/dev/null || rc=1
    if [ "$rc" = "0" ]; then SUCCEEDED+=("$name (${secs}s)"); else FAILED+=("$key|$name"); fi
    [ "$rc" = "124" ] && STALLED=$((STALLED + 1))
done

echo ""
echo "======================================================"
echo " Build summary (tag: ${TAG}, arch: ${ARCH_LABEL}, total: $((END_ALL - START_ALL))s)"
echo "======================================================"
echo " Succeeded (${#SUCCEEDED[@]}/${#TODO[@]}):"
if [ ${#SUCCEEDED[@]} -eq 0 ]; then
    echo "   (none)"
else
    for name in "${SUCCEEDED[@]}"; do echo "   OK      $name"; done
fi
echo " Failed (${#FAILED[@]}/${#TODO[@]}):"
if [ ${#FAILED[@]} -eq 0 ]; then
    echo "   (none)"
else
    for f in "${FAILED[@]}"; do
        echo "   FAILED  ${f#*|}"
        echo "   ---- last lines of $LOG_DIR/${f%%|*}.log ----"
        tail -15 "$LOG_DIR/${f%%|*}.log" | sed 's/^/     /'
    done
fi
echo "======================================================"

if [ "$STALLED" -gt 0 ]; then
    echo ""
    echo " ${STALLED} image(s) failed because go mod tidy / go get stayed stuck on a"
    echo " module fetch (no progress for ${STALL_SECS}s) on all ${MAX_ATTEMPTS} attempts --"
    echo " usually GitHub throttling or a network problem. Retry later, or with"
    echo " fewer parallel builds (-j 2), e.g.: $0 -j 2 <image ...>"
fi

if [ "$STALLED" -eq 0 ] && [ ${#TODO[@]} -gt 0 ] && [ ${#FAILED[@]} -eq ${#TODO[@]} ]; then
    echo ""
    echo " Every image failed. The usual cause is a base image that is not"
    echo " available for a requested architecture -- the local builder,"
    echo " erp-security and erp-postgres images (built by l8secure) must each"
    echo " exist for ${ARCH_LABEL}. Rebuild them from l8secure:"
    echo "   cd ../../l8secure/builder  && ./build.sh ${ARCH/both/}"
    echo "   cd ../security             && ./build.sh erp ${ARCH/both/}"
    echo "   cd ../postgres             && ./build.sh erp ${ARCH/both/}"
    echo " A build stage that dies immediately with exit code 255 is the"
    echo " symptom: the base image is the wrong architecture for the target."
fi

[ ${#FAILED[@]} -eq 0 ] || exit 1
