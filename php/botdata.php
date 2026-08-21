<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *'); // Update with your actual frontend URL using HTTPS
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('SameSite=None; Secure'); // Include this line to allow cross-origin requests in both secure and non-secure contexts

// $conn = mysqli_connect('localhost', 'root', '', 'chatbot');
$conn = mysqli_connect('ucdb.cbutm1vn3zay.eu-north-1.rds.amazonaws.com', 'admin', 'UCDatabase8434', 'ucdatabase');

if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $userName = $_POST['username'];
        $email = $_POST['email'];
        $phoneNumber = $_POST['mobile'];
        $course = $_POST['course'];
        $mode = $_POST['mode'];

        // Example of inserting values into the database
        $sql = "INSERT INTO botdetails(username, email, mobile, course, mode) VALUES ('$userName', '$email', '$phoneNumber', '$course', '$mode')";
        
        $res = mysqli_query($conn, $sql);

        if ($res) {
            echo true;
        } else {
            echo false;
        }
    }
}

$conn->close();
?>
