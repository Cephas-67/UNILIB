$ErrorActionPreference = 'Stop'

Write-Output "1) LOGIN..."
try {
  $body = '{"username":"marcel@gmail.com","password":"password123"}'
  $login = Invoke-RestMethod -Method Post -Uri 'http://127.0.0.1:8000/api/auth/login/' -ContentType 'application/json' -Body $body -ErrorAction Stop
  Write-Output "Login response (JSON):"
  $login | ConvertTo-Json -Depth 5
} catch {
  Write-Output "Login request failed: $_"
  exit 0
}

$access = $login.access
if (-not $access) {
  Write-Output "No access token found — stopping."
  exit 0
}
Write-Output "Access token length: $($access.Length)"

Write-Output "2) GET /me"
try {
  $me = Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/auth/me/' -Headers @{ Authorization = "Bearer $access" } -ErrorAction Stop
  $me | ConvertTo-Json -Depth 5
} catch {
  Write-Output "GET /me failed: $_"
}

Write-Output "3) GET /resources/"
try {
  $resources = Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/resources/' -Headers @{ Authorization = "Bearer $access" } -ErrorAction Stop
  $resources | ConvertTo-Json -Depth 5
} catch {
  Write-Output "GET /resources failed: $_"
}
