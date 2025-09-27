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

// Accept either a data URL in POST['image'] OR a binary upload in FILES['image_file']
$binary_data = false;
$mime_type = null;

// Priority 1: binary file upload via multipart/form-data (field: image_file)
if (isset($_FILES['image_file']) && is_uploaded_file($_FILES['image_file']['tmp_name'])) {
    $file = $_FILES['image_file'];

    // Basic upload error check
    if ($file['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['success' => false, 'error' => 'File upload error']);
        exit;
    }

    // Size check
    if ($file['size'] > $max_file_size) {
        echo json_encode(['success' => false, 'error' => 'Image too large']);
        exit;
    }

    // Detect MIME type from file contents
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $detected = $finfo->file($file['tmp_name']);
    if (!in_array($detected, $allowed_types)) {
        echo json_encode(['success' => false, 'error' => 'Unsupported image type']);
        exit;
    }

    $mime_type = $detected;
    $binary_data = file_get_contents($file['tmp_name']);
}

// Priority 2: data URL sent in a form field named 'image' (existing behavior)
elseif (isset($_POST['image']) && !empty($_POST['image'])) {
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
}
else {
    echo json_encode(['success' => false, 'error' => 'No image data received']);
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