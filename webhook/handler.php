<?php
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Razorpay webhook secret from dashboard
$webhookSecret = 'uncodemy123!@#';

// Check if header exists
if (!isset($_SERVER['HTTP_X_RAZORPAY_SIGNATURE'])) {
    file_put_contents("log.txt", "❌ Missing signature header\n", FILE_APPEND);
    http_response_code(400);
    exit("Missing signature");
}

$actualSignature = $_SERVER['HTTP_X_RAZORPAY_SIGNATURE'];
$expectedSignature = hash_hmac('sha256', $input, $webhookSecret);

// Signature verification
if (hash_equals($expectedSignature, $actualSignature)) {
    // ✅ Verified — log data
    file_put_contents("log.txt", print_r($data, true), FILE_APPEND);
    http_response_code(200);
    echo "Webhook received and verified";
} else {
    // ❌ Signature mismatch
    file_put_contents("log.txt", "❌ Signature mismatch\n", FILE_APPEND);
    http_response_code(403);
    echo "Invalid signature";
}
?>
