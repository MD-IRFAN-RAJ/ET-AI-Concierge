@echo off
set PORT=%1
if "%PORT%"=="" set PORT=8000

set ROOT=%~dp0..
"%ROOT%\.venv\Scripts\python.exe" -m uvicorn app.main:app --app-dir backend --reload --host 127.0.0.1 --port %PORT%
