#!/usr/bin/env bash
# deploy_to_xampp.sh
# Copies the current project to /Applications/XAMPP/htdocs/potobooth,
# ensures the photos folder exists and is writable, and restarts XAMPP Apache.

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
DEST_DIR="/Applications/XAMPP/htdocs/potobooth"
PHOTOS_DIR="$DEST_DIR/photos"

echo "Project dir: $PROJECT_DIR"

# Ensure running on macOS
if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "Warning: This script was written for macOS (XAMPP default path /Applications/XAMPP)." >&2
fi

# Ensure source exists
if [[ ! -d "$PROJECT_DIR" ]]; then
  echo "Project dir does not exist: $PROJECT_DIR" >&2
  exit 1
fi

# Copy files (preserve permissions where reasonable)
echo "Copying project to $DEST_DIR (requires sudo)"
sudo rm -rf "$DEST_DIR"
sudo mkdir -p "$(dirname "$DEST_DIR")"
sudo cp -R "$PROJECT_DIR" "$DEST_DIR"

# Ensure photos dir exists and is writable by Apache
echo "Ensuring photos directory exists and is writable"
sudo mkdir -p "$PHOTOS_DIR"
# Prefer owner 'daemon' for XAMPP (apache user), fall back to _www or www-data if present
APACHE_USER="daemon"
if id -u daemon >/dev/null 2>&1; then
  APACHE_USER="daemon"
elif id -u _www >/dev/null 2>&1; then
  APACHE_USER="_www"
elif id -u www-data >/dev/null 2>&1; then
  APACHE_USER="www-data"
fi

echo "Setting ownership to $APACHE_USER and permissions 775 (photos)"
sudo chown -R "$APACHE_USER" "$PHOTOS_DIR" || true
sudo chmod -R 775 "$PHOTOS_DIR" || true

# For simplicity allow writable by all if chown didn't work
if [[ ! -w "$PHOTOS_DIR" ]]; then
  echo "photos directory not writable by current user; relaxing permissions to 777"
  sudo chmod -R 777 "$PHOTOS_DIR"
fi

# Restart XAMPP Apache
if [[ -x "/Applications/XAMPP/xamppfiles/xampp" ]]; then
  echo "Restarting XAMPP Apache"
  sudo /Applications/XAMPP/xamppfiles/xampp restartapache || true
else
  echo "XAMPP control script not found at /Applications/XAMPP/xamppfiles/xampp"
  echo "Please start Apache via the XAMPP control panel."
fi

echo "Deployment complete. Open http://localhost/potobooth in your browser"

echo "To test save endpoint run: ./xampp_verify.sh"

exit 0
