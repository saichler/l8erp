#!/bin/sh

# Start the first service in the background
/home/run/erpweb &

# Start the second service in the foreground (or exec the main process)
exec /home/run/erpweb2 "$@"
