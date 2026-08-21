<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$servername = "ucdb.cbutm1vn3zay.eu-north-1.rds.amazonaws.com";
$username = "admin";
$password = "UCDatabase8434";
$dbname = "ucdatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['name'], $input['email'], $input['phone'], $input['course'], $input['working_status'], $input['experience'])) {
    echo json_encode(["success" => false, "message" => "Invalid input data"]);
    exit();
}

$name = $conn->real_escape_string($input['name']);
$email = $conn->real_escape_string($input['email']);
$phone = $conn->real_escape_string($input['phone']);
$course = $conn->real_escape_string($input['course']);
$working_status = $conn->real_escape_string($input['working_status']);
$experience = $conn->real_escape_string($input['experience']);

$sql = "INSERT INTO `ai-career-guidance` (name, email, phone, course, working_status, experience) 
        VALUES ('$name', '$email', '$phone', '$course', '$working_status', '$experience')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Data submitted successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
}

$conn->close();
?>
