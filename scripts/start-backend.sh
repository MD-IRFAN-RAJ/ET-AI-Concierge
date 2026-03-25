#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ -f ".venv/Scripts/activate" ]; then
  # Git Bash on Windows virtualenv activation
  source ".venv/Scripts/activate"
fi

exec uvicorn app.main:app --app-dir backend --reload --host 127.0.0.1 --port "${1:-8000}"
