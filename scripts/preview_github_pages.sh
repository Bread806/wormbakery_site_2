#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/preview_github_pages.sh [port]
PORT="${1:-3000}"
BASE_PREV_DIR="/tmp/preview_site"
TARGET_DIR="$BASE_PREV_DIR/wormbakery_site_2"
LOGFILE="/tmp/preview_server_${PORT}.log"

echo "== preview: start (port=$PORT) =="

echo "1) build (GH_PAGES=1)"
GH_PAGES=1 npm run build

echo "2) prepare preview dir: $TARGET_DIR"
mkdir -p "$TARGET_DIR"
# safe remove old preview contents
/bin/rm -rf "$TARGET_DIR"/*
cp -R dist/* "$TARGET_DIR/"

# 3) free the port if occupied
echo "3) checking port $PORT..."
if command -v lsof >/dev/null 2>&1; then
  EXIST_PIDS=$(lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t || true)
  if [ -n "$EXIST_PIDS" ]; then
    echo "Found process(es) on port $PORT: $EXIST_PIDS"
    for pid in $EXIST_PIDS; do
      echo "Terminating PID $pid..."
      kill "$pid" || true
      sleep 0.5
      if kill -0 "$pid" >/dev/null 2>&1; then
        echo "PID $pid still alive, forcing..."
        kill -9 "$pid" || true
      fi
    done
  else
    echo "Port $PORT is free."
  fi
else
  echo "lsof not found; please ensure nothing else is using port $PORT."
fi

# 4) start static server (background)
echo "4) starting python http.server on port $PORT (root: $BASE_PREV_DIR)"
cd "$BASE_PREV_DIR"

# Create a small index at the preview root that redirects browsers to the
# site subpath so accidental visits to http://host:port/ don't load the wrong
# root page and cause asset 404s for /assets/... paths.
cat > "$BASE_PREV_DIR/index.html" <<'HTML'
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0;url=/wormbakery_site_2/" />
    <title>Preview - redirecting</title>
  </head>
  <body>
    Redirecting to <a href="/wormbakery_site_2/">/wormbakery_site_2/</a>
  </body>
</html>
HTML
# nohup so it persists; redirect logs
nohup python3 -m http.server "$PORT" > "$LOGFILE" 2>&1 &
SERVER_PID=$!
sleep 0.5

echo "Preview server started. PID: $SERVER_PID"
echo "Preview URL: http://127.0.0.1:$PORT/wormbakery_site_2/"
echo "Log file: $LOGFILE"

# try to open default browser (macOS)
if command -v open >/dev/null 2>&1; then
  open "http://127.0.0.1:$PORT/wormbakery_site_2/" || true
fi

exit 0
