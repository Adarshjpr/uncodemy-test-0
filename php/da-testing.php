<?php
// Enable error reporting (for debugging)
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', 'php-error.log'); // CORS Headers (Fix Cross-Origin Issue)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json"); // Handle Preflight (OPTIONS) Request
if ($_SERVER["REQUEST_METHOD"]==="OPTIONS"){ http_response_code(200); exit();} // Database connection
$servername="ucdb.cbutm1vn3zay.eu-north-1.rds.amazonaws.com";
$username="admin";
$password="UCDatabase8434";
$dbname="ucdatabase"; // Connect to MySQL
$conn=new mysqli($servername, $username, $password, $dbname); // Check database connection
if ($conn->connect_error){ die(json_encode(["status"=>"error", "message"=>"Database connection failed: " . $conn->connect_error]));} // Ensure request is POST
if ($_SERVER["REQUEST_METHOD"] !=="POST"){ die(json_encode(["status"=>"error", "message"=>"Invalid request method."]));} // Read input data (Check if JSON or FormData)
$input=file_get_contents("php://input");
$contentType=$_SERVER["CONTENT_TYPE"] ?? ''; if (strpos($contentType, "application/json") !==false){ $data=json_decode($input, true);} else{ $data=$_POST;} // Debugging: Log incoming data to a file
file_put_contents("debug_log.txt", json_encode($data) . PHP_EOL, FILE_APPEND); // Validate required fields
if (!isset($data['name'], $data['email'], $data['phone'], $data['location'])){ die(json_encode(["status"=>"error", "message"=>"Missing required form fields."]));} // Sanitize inputs
$name=mysqli_real_escape_string($conn, $data['name']);
$email=mysqli_real_escape_string($conn, $data['email']);
$phone=mysqli_real_escape_string($conn, $data['phone']);
$location=mysqli_real_escape_string($conn, $data['location']); // Prepare SQL statement
$stmt=$conn->prepare("INSERT INTO DaTestingDB (name, email, phone, location) VALUES (?, ?, ?, ?)"); if (!$stmt){ die(json_encode(["status"=>"error", "message"=>"SQL prepare error: " . $conn->error]));} $stmt->bind_param("ssss", $name, $email, $phone, $location); // Execute query
if ($stmt->execute()){ echo json_encode(["status"=>"success", "message"=>"Form submitted successfully."]);} else{ die(json_encode(["status"=>"error", "message"=>"Database error: " . $stmt->error]));} // Close connections
$stmt->close();
$conn->close();
?>