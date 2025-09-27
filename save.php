<?php
/**
 * Photo Booth Save Backend
 * Handles saving collage images to the server
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
$upload_dir = 'photos/';
$max_file_size = 5 * 1024 * 1024; // 5MB limit
$allowed_types = ['image/jpeg', 'image/png'];

// Create photos directory if it doesn't exist
if (!file_exists($upload_dir)) {
    if (!mkdir($upload_dir, 0755, true)) {
        echo json_encode(['success' => false, 'error' => 'Could not create upload directory']);
        exit;
    }
}

// Check if directory is writable
if (!is_writable($upload_dir)) {
    echo json_encode(['success' => false, 'error' => 'Upload directory is not writable']);
    exit;
}

// Only handle POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Only POST method allowed']);
    exit;
}

// Check if image data was sent
if (!isset($_POST['image']) || empty($_POST['image'])) {
    echo json_encode(['success' => false, 'error' => 'No image data received']);
    exit;
}

$image_data = $_POST['image'];

// Validate data URL format
if (!preg_match('/^data:image\/(jpeg|png);base64,/', $image_data)) {
    echo json_encode(['success' => false, 'error' => 'Invalid image format']);
    exit;
}

// Extract image type and base64 data
preg_match('/^data:image\/(jpeg|png);base64,(.+)$/', $image_data, $matches);
$image_type = $matches[1];
$base64_data = $matches[2];

// Validate image type
$mime_type = 'image/' . $image_type;
if (!in_array($mime_type, $allowed_types)) {
    echo json_encode(['success' => false, 'error' => 'Unsupported image type']);
    exit;
}

// Decode base64 data
$binary_data = base64_decode($base64_data);

if ($binary_data === false) {
    echo json_encode(['success' => false, 'error' => 'Invalid base64 data']);
    exit;
}

// Check file size
if (strlen($binary_data) > $max_file_size) {
    echo json_encode(['success' => false, 'error' => 'Image too large']);
    exit;
}

// Generate unique filename
$timestamp = date('Y-m-d_H-i-s');
$random = bin2hex(random_bytes(4));
$extension = ($image_type === 'jpeg') ? 'jpg' : 'png';
$filename = "photobooth_{$timestamp}_{$random}.{$extension}";
$filepath = $upload_dir . $filename;

// Save the file
if (file_put_contents($filepath, $binary_data)) {
    // Verify the saved file
    if (file_exists($filepath) && filesize($filepath) > 0) {
        // Return success response
        echo json_encode([
            'success' => true,
            'url' => $filepath,
            'filename' => $filename,
            'size' => filesize($filepath),
            'timestamp' => time()
        ]);
    } else {
        echo json_encode(['success' => false, 'error' => 'File was not saved correctly']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to save file']);
}
?>