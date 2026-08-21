<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// Database credentials

$servername = "ucdb.cbutm1vn3zay.eu-north-1.rds.amazonaws.com";
$username = "admin";
$password = "UCDatabase8434";
$dbname = "ucdatabase";

// Database connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

// Retrieve JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['name'], $input['email'], $input['phone'], $input['course'])) {
    echo json_encode(["success" => false, "message" => "Invalid input data"]);
    exit();
}

// Sanitize inputs
$name = $conn->real_escape_string($input['name']);
$email = $conn->real_escape_string($input['email']);
$phone = $conn->real_escape_string($input['phone']);
$course = $conn->real_escape_string($input['course']);

// Insert into database
$sql = "INSERT INTO `uncodemy_tutorial_data` (name, email, phone, course) 
        VALUES ('$name', '$email', '$phone', '$course')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Data submitted successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
}

$conn->close();
?>
