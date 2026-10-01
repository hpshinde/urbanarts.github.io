#!/bin/sh

set -eu

PROJECT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
CODEX_NODE="/Users/data/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
CODEX_PYTHON="/Users/data/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3"

find_node() {
  if command -v node >/dev/null 2>&1; then
    command -v node
  elif [ -x "$CODEX_NODE" ]; then
    printf '%s\n' "$CODEX_NODE"
  else
    printf '%s\n' "Node.js was not found." >&2
    printf '%s\n' "Install Node.js, or open this project in Codex and try again." >&2
    exit 1
  fi
}

find_image_python() {
  if [ -x "$CODEX_PYTHON" ]; then
    printf '%s\n' "$CODEX_PYTHON"
  elif command -v python3 >/dev/null 2>&1 && python3 -c 'from PIL import Image' >/dev/null 2>&1; then
    command -v python3
  else
    printf '%s\n' "The image-processing Python runtime was not found." >&2
    printf '%s\n' "Open this project in Codex to use its bundled image tools." >&2
    exit 1
  fi
}

case "${1:-}" in
  build)
    NODE_BIN=$(find_node)
    cd "$PROJECT_DIR"
    exec "$NODE_BIN" build.mjs
    ;;
  serve)
    cd "$PROJECT_DIR"
    if command -v python3 >/dev/null 2>&1; then
      exec python3 -m http.server 4173 --bind 127.0.0.1 -d dist
    elif command -v python >/dev/null 2>&1; then
      exec python -m http.server 4173 --bind 127.0.0.1 -d dist
    else
      printf '%s\n' "Python was not found, so the local preview server cannot start." >&2
      exit 1
    fi
    ;;
  images)
    PYTHON_BIN=$(find_image_python)
    cd "$PROJECT_DIR"
    exec "$PYTHON_BIN" scripts/process_images.py
    ;;
  *)
    printf '%s\n' "Usage: ./scripts/site.sh build" "       ./scripts/site.sh serve" "       ./scripts/site.sh images" >&2
    exit 2
    ;;
esac
