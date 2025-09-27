#!/usr/bin/env bash
# xampp_verify.sh
# Sends a small test base64 image to the deployed save.php and prints the response.

set -euo pipefail

URL="http://localhost/potobooth/save.php"
IMG='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='

echo "POSTing test image to $URL"

response=$(curl -s -X POST "$URL" -F "image=$IMG" -H "Accept: application/json")

if [[ -z "$response" ]]; then
  echo "No response from server. Check Apache/PHP logs." >&2
  exit 1
fi

echo "Response: $response"

# Try to pretty print JSON if jq is available
if command -v jq >/dev/null 2>&1; then
  echo "$response" | jq .
fi

exit 0
