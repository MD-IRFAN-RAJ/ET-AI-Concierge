param(
  [int]$Port = 8000
)

$ScriptDir = Split-Path -Parent $PSCommandPath
$RootDir = Split-Path -Parent $ScriptDir

& "$RootDir\scripts\start-backend.ps1" -Port $Port
