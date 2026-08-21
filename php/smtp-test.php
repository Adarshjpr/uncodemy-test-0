<?php
// Enable detailed error logging
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/debug.log');
error_reporting(E_ALL);

// Set headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Database configuration
$dbConfig = [
    'host' => 'ucdb.cbutm1vn3zay.eu-north-1.rds.amazonaws.com',
    'user' => 'admin',
    'pass' => 'UCDatabase8434',
    'name' => 'ucdatabase',
    'port' => 3306
];

// Initialize response
$response = [
    'status' => 'error',
    'message' => 'Unknown error',
    'database' => false,
    'whatsapp' => false,
    'email' => false
];

try {
    // Database connection
    $conn = new mysqli(
        $dbConfig['host'],
        $dbConfig['user'],
        $dbConfig['pass'],
        $dbConfig['name'],
        $dbConfig['port']
    );
    
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    // Set charset
    $conn->set_charset("utf8mb4");

    // Get input data
    $input = json_decode(file_get_contents('php://input'), true);
    if ($input === null && json_last_error() !== JSON_ERROR_NONE) {
        $input = $_POST;
    }

    // Validate inputs
    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $mobile = trim($input['mobile'] ?? '');
    $location = trim($input['location'] ?? '');
    $course = trim($input['course'] ?? '');

    if (empty($name) || empty($email) || empty($mobile) || 
        !filter_var($email, FILTER_VALIDATE_EMAIL) || 
        !preg_match('/^[0-9]{10}$/', $mobile)) {
        throw new Exception("Invalid input data");
    }

    // Start transaction
    $conn->begin_transaction();

    try {
        // 1. Save to database
        $stmt = $conn->prepare("INSERT INTO uncodata (name, email, mobile, location, course) VALUES (?, ?, ?, ?, ?)");
        if (!$stmt) {
            throw new Exception("Database prepare failed: " . $conn->error);
        }
        
        $stmt->bind_param("sssss", $name, $email, $mobile, $location, $course);
        $response['database'] = $stmt->execute();
        $stmt->close();
        
        if (!$response['database']) {
            throw new Exception("Database insert failed");
        }

        // 2. Send WhatsApp (non-blocking)
        $response['whatsapp'] = sendWhatsAppMessage($conn, $mobile, $name);

        // 3. Send Email (with retry logic)
        $response['email'] = sendUserEmail($email, $name, $course);
        
        // If email failed first time, try once more
        if (!$response['email']) {
            error_log("First email attempt failed, retrying...");
            $response['email'] = sendUserEmail($email, $name, $course);
        }

        // Commit transaction
        $conn->commit();
        
        $response['status'] = 'success';
        $response['message'] = 'Form submitted successfully';
        
    } catch (Exception $e) {
        $conn->rollback();
        throw $e;
    }

} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    http_response_code(500);
    $response['message'] = $e->getMessage();
    $response['error_details'] = $e->getFile() . ':' . $e->getLine();
} finally {
    if (isset($conn)) {
        $conn->close();
    }
    echo json_encode($response);
}

// Email function with enhanced reliability
function sendUserEmail($email, $name, $course) {
    try {
        error_log("Attempting to send email to: $email");
        
        // PHPMailer paths
        $phpmailerPath = __DIR__ . '/lib/PHPMailer/';
        require_once $phpmailerPath . 'PHPMailer.php';
        require_once $phpmailerPath . 'SMTP.php';
        require_once $phpmailerPath . 'Exception.php';

        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'join@uncodemy.com';
        $mail->Password = 'palf kqmz iusu pirb';
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;
        $mail->SMTPDebug = 3;
        $mail->Debugoutput = function($str, $level) {
            error_log("PHPMailer ($level): $str");
        };

        // Email content
        $mail->setFrom('join@uncodemy.com', 'Uncodemy Team');
        $mail->addAddress($email);
        $mail->Subject = 'Thank You for Contacting Uncodemy - ' . $course;
        
        // HTML Email Body
        $emailBody = '<!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                .header { color: #00c914; font-weight: bold; }
            </style>
        </head>
        <body>
            <p>Dear ' . htmlspecialchars($name) . ',</p>
            <p>Thank you for your interest in our ' . htmlspecialchars($course) . ' program.</p>
            <!-- Rest of your email content -->
        </body>
        </html>';

        $mail->isHTML(true);
        $mail->Body = $emailBody;
        $mail->AltBody = "Dear $name,\n\nThank you for contacting Uncodemy about our $course program.";

        // Send with timeout
        $mail->Timeout = 30;
        $result = $mail->send();
        
        if (!$result) {
            throw new Exception("Mailer Error: " . $mail->ErrorInfo);
        }
        
        error_log("Email successfully sent to: $email");
        return true;
        
    } catch (Exception $e) {
        error_log("Email sending failed: " . $e->getMessage());
        return false;
    }
}

// WhatsApp function
function sendWhatsAppMessage($conn, $mobile, $name) {
    try {
        // Save to queue
        $stmt = $conn->prepare("INSERT INTO whatsapp_queue (mobile, name) VALUES (?, ?)");
        $stmt->bind_param("ss", $mobile, $name);
        $stmt->execute();
        $queueId = $stmt->insert_id;
        $stmt->close();

        sleep(3); // WhatsApp delay

        $ultramsg_token = 'gawp8wt4qwfvs8g7';
        $ultramsg_instance = 'instance112631';
        
        $message = "*🌟 Hi $name!*\n\nThanks for contacting Uncodemy..."; // Your message

        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => "https://api.ultramsg.com/$ultramsg_instance/messages/chat",
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => http_build_query([
                'token' => $ultramsg_token,
                'to' => '+91' . $mobile,
                'body' => $message
            ]),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_SSL_VERIFYPEER => false
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $status = ($httpCode === 200) ? 'sent' : 'failed';
        $conn->query("UPDATE whatsapp_queue SET status = '$status', sent_at = NOW() WHERE id = $queueId");
        
        return $status === 'sent';
    } catch (Exception $e) {
        error_log("WhatsApp Error: " . $e->getMessage());
        if (isset($queueId)) {
            $conn->query("UPDATE whatsapp_queue SET status = 'failed' WHERE id = $queueId");
        }
        return false;
    }
}