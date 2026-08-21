<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Database connection details
$servername = "ucdb.cbutm1vn3zay.eu-north-1.rds.amazonaws.com";
$username = "admin";
$password = "UCDatabase8434";
$dbname = "ucdatabase";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Handle GET request for testing
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(["success" => false, "message" => "Please send a POST request with form data."]);
    exit();
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read POST data
    $data = $_POST;

    // Validate all fields are present
    $requiredFields = ['name', 'email', 'course', 'faculty', 'phone', 'startDate', 'endDate'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            echo json_encode(["success" => false, "error" => "Field '$field' is required."]);
            exit();
        }
    }

    // Retrieve form data
    $name = $data['name'];
    $email = $data['email'];
    $course = $data['course'];
    $faculty = $data['faculty'];
    $phone = $data['phone'];
    $startDate = $data['startDate'];
    $endDate = $data['endDate'];

    // SQL query to insert data
    $sql = "INSERT INTO certificate_requests (name, email, course, faculty, phone, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("sssssss", $name, $email, $course, $faculty, $phone, $startDate, $endDate);
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "🎉 Submission Successful!  Thank you for submitting your certificate request. We have received your details and our team will begin processing your request shortly. 
            we will contact you via the email or phone number you provided."]);
        } else {
            echo json_encode(["success" => false, "error" => "Database error: " . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "error" => "Failed to prepare SQL: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid request method."]);
}

$conn->close();
?>
