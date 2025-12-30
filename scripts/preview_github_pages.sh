#!/usr/bin/env bash
set -euo pipefail

# Preview script for GitHub Pages-like production build
# Usage: bash ./scripts/preview_github_pages.sh [port]
# Default port: 5173

PORT=${1:-5173}
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PREVIEW_PARENT_DIR="/tmp/preview_site"
PREVIEW_DIR="$PREVIEW_PARENT_DIR/wormbakery_site_2"

echo "[preview] repo root: $REPO_ROOT"
echo "[preview] build with GH_PAGES=1 -> base will be set for GitHub Pages"

GH_PAGES=1 npm run build

echo "[preview] preparing preview dir: $PREVIEW_DIR"
mkdir -p "$PREVIEW_DIR"
/bin/rm -rf "$PREVIEW_DIR"/*
cp -R "$REPO_ROOT/dist"/* "$PREVIEW_DIR/"

echo "[preview] starting static server (python) on port $PORT"
cd "$PREVIEW_PARENT_DIR"

if command -v lsof >/dev/null 2>&1; then
  # If port is in use, try to find the PID(s) and kill them gracefully
  PIDS=$(lsof -t -iTCP:"$PORT" -sTCP:LISTEN -Pn || true)
  if [ -n "$PIDS" ]; then
    echo "[preview] port $PORT is in use by PID(s): $PIDS"
    echo "[preview] attempting to stop existing server(s)..."
    # Try graceful TERM first, then KILL after short wait if still present
    kill $PIDS || true
    sleep 0.6
    # check again
    STILL=$(lsof -t -iTCP:"$PORT" -sTCP:LISTEN -Pn || true)
    if [ -n "$STILL" ]; then
      echo "[preview] some processes did not exit, sending SIGKILL to: $STILL"
      kill -9 $STILL || true
      sleep 0.2
    fi
    # final check
    FINAL=$(lsof -t -iTCP:"$PORT" -sTCP:LISTEN -Pn || true)
    if [ -n "$FINAL" ]; then
      echo "[preview] ERROR: port $PORT is still in use by: $FINAL" >&2
      exit 1
    fi
    echo "[preview] previous server(s) stopped"
  fi
fi

LOGFILE="/tmp/preview_server_$PORT.log"
nohup python3 -m http.server "$PORT" >"$LOGFILE" 2>&1 &
SERVER_PID=$!
sleep 0.4

echo "[preview] server started (pid: $SERVER_PID)"
echo "[preview] open URL: http://127.0.0.1:$PORT/wormbakery_site_2/"
echo "[preview] server log: $LOGFILE"
echo "[preview] to stop server: kill $SERVER_PID"
