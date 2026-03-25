param(
  [int]$Port = 8000
)

$RootDir = Split-Path -Parent $PSScriptRoot
Set-Location $RootDir

$PythonExe = Join-Path $RootDir ".venv\Scripts\python.exe"
if (-not (Test-Path $PythonExe)) {
  Write-Error "Python virtual environment not found at .venv\Scripts\python.exe"
  exit 1
}

& $PythonExe -m uvicorn app.main:app --app-dir backend --reload --host 127.0.0.1 --port $Port
