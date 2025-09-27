#!/bin/bash

# Photo Booth Pro - XAMPP Deployment Script
# Run this script to deploy to your XAMPP htdocs folder

echo "Photo Booth Pro - Deployment Script"
echo "======================================"

# Check if XAMPP is installed
XAMPP_PATHS=(
    "/Applications/XAMPP/htdocs"
    "/opt/lampp/htdocs"
    "/xampp/htdocs"
    "C:/xampp/htdocs"
    "/usr/local/xampp/htdocs"
)

HTDOCS_PATH=""
for path in "${XAMPP_PATHS[@]}"; do
    if [ -d "$path" ]; then
        HTDOCS_PATH="$path"
        break
    fi
done

if [ -z "$HTDOCS_PATH" ]; then
    echo "XAMPP not found. Please install XAMPP first."
    echo "Or manually copy the potobooth folder to your htdocs directory"
    exit 1
fi

echo "Found XAMPP at: $HTDOCS_PATH"

# Copy files
echo "Copying Photo Booth Pro files..."
cp -r . "$HTDOCS_PATH/photobooth-pro"

# Set permissions for photos directory
echo "Setting permissions for photos directory..."
chmod -R 755 "$HTDOCS_PATH/photobooth-pro"
chmod -R 777 "$HTDOCS_PATH/photobooth-pro/photos"

echo ""
echo "Deployment Complete!"
echo "======================"
echo "Installed to: $HTDOCS_PATH/photobooth-pro"
echo "Access URL: http://localhost/photobooth-pro"
echo ""
echo "Next Steps:"
echo "1. Start XAMPP Control Panel"
echo "2. Start Apache service"
echo "3. Open: http://localhost/photobooth-pro"
echo ""
echo "Features Available:"
echo "• 3D Background Animations"
echo "• Dark/Light Theme Toggle"
echo "• Professional Photo Processing"
echo "• Mobile-Responsive Design"
echo ""
echo "Ready to capture amazing memories!"