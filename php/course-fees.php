<?php
// Logging
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/debug.log');
error_reporting(E_ALL);

// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$dbConfig = [
    'host' => 'ucdb.cbutm1vn3zay.eu-north-1.rds.amazonaws.com',
    'user' => 'admin',
    'pass' => 'UCDatabase8434',
    'name' => 'ucdatabase',
    'port' => 3306
];

$response = [
    'status'   => 'error',
    'message'  => 'Unknown error',
    'database' => false,
    'whatsapp' => false,
    'email'    => false
];

try {
    $conn = new mysqli(
        $dbConfig['host'], $dbConfig['user'], $dbConfig['pass'],
        $dbConfig['name'], $dbConfig['port']
    );
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }
    $conn->set_charset("utf8mb4");

    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        throw new Exception("Invalid request method.");
    }

    $input = json_decode(file_get_contents("php://input"), true);
    if ($input === null && json_last_error() !== JSON_ERROR_NONE) {
        $input = $_POST;
    }

    $name           = trim($input['name'] ?? '');
    $email          = trim($input['email'] ?? '');
    $phone          = preg_replace('/\D/', '', trim($input['phone'] ?? ''));
    $working_status = trim($input['working_status'] ?? '');

    // Course Fees enquiry — WhatsApp/Email me yehi naam jayega
    $course = 'Course Fees Enquiry';

    if (empty($name) || empty($email) || empty($phone) || empty($working_status)) {
        throw new Exception("Missing required form fields.");
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email address.");
    }
    if (!preg_match('/^[0-9]{10,12}$/', $phone)) {
        throw new Exception("Invalid phone number.");
    }

    $conn->begin_transaction();

    try {
        // 1. Database insert
        $stmt = $conn->prepare("INSERT INTO coursefeesDB (name, email, phone, status) VALUES (?, ?, ?, ?)");
        if (!$stmt) {
            throw new Exception("Database prepare failed: " . $conn->error);
        }
        $stmt->bind_param("ssss", $name, $email, $phone, $working_status);
        $response['database'] = $stmt->execute();
        $stmt->close();

        if (!$response['database']) {
            throw new Exception("Database insert failed");
        }

        // 2. WhatsApp
        $response['whatsapp'] = sendWhatsAppMessage($conn, $phone, $name, $course);

        // 3. Email (ek retry ke saath)
        $response['email'] = sendUserEmail($email, $name, $course);
        if (!$response['email']) {
            error_log("First email attempt failed, retrying...");
            $response['email'] = sendUserEmail($email, $name, $course);
        }

        $conn->commit();

        $response['status']  = 'success';
        $response['message'] = 'Form submitted successfully.';

    } catch (Exception $e) {
        $conn->rollback();
        throw $e;
    }

} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    http_response_code(500);
    $response['message'] = $e->getMessage();
} finally {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
    echo json_encode($response);
}


/* ------------------------------- EMAIL ---------------------------------- */

function sendUserEmail($email, $name, $course) {
    $mail = null;
    try {
        error_log("Attempting to send email to: $email");

        $phpmailerPath = __DIR__ . '/lib/PHPMailer/';
        require_once $phpmailerPath . 'PHPMailer.php';
        require_once $phpmailerPath . 'SMTP.php';
        require_once $phpmailerPath . 'Exception.php';

        $mail = new PHPMailer\PHPMailer\PHPMailer(true);

        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'contact@uncodemy.com';
        $mail->Password   = 'gyui jcvp kqao sieu';
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;
        $mail->CharSet    = 'UTF-8';
        $mail->SMTPDebug  = 0;
        $mail->Debugoutput = function ($str, $level) {
            error_log("PHPMailer ($level): $str");
        };

        $mail->setFrom('contact@uncodemy.com', 'Uncodemy Team');
        $mail->addAddress($email);
        $mail->Subject = 'Thank You for Contacting Uncodemy - ' . $course;

        $safeName   = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
        $safeCourse = htmlspecialchars($course, ENT_QUOTES, 'UTF-8');

        $emailBody = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - Uncodemy</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f4f7;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:24px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" border="0"
           style="background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e6e6e6;">

      <tr>
        <td style="background-color:#153f6b;padding:22px 25px;text-align:left;">
          <span style="font-size:20px;font-weight:bold;color:#ffffff;">Uncodemy</span>
        </td>
      </tr>

      <tr>
        <td style="padding:30px 28px 10px;font-size:15px;color:#222222;line-height:1.6;">
          <p style="margin:0 0 12px;">Hi <strong>$safeName</strong>,</p>
          <p style="margin:0 0 14px;">
            Thanks for reaching out about our <strong>$safeCourse</strong>.
            We've received your inquiry and someone from our team will call you shortly
            with the course fee and program details.
          </p>
          <p style="margin:0;">
            If a particular time works better for you, just reply to this email and let us know.
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:10px 28px;">
          <hr style="border:none;border-top:1px solid #eaeaea;margin:0;">
        </td>
      </tr>

      <tr>
        <td style="padding:20px 28px;font-size:14px;color:#333333;line-height:1.6;">
          <h2 style="font-size:16px;color:#153f6b;margin:0 0 10px;">About Uncodemy</h2>
          <p style="margin:0 0 12px;">
            We offer industry-focused IT training and placement support, with a
            structured curriculum and small batch sizes for better hands-on learning.
          </p>
          <p style="margin:0;">
            Our team works closely with hiring partners to help students transition
            into relevant roles after training.
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:0 28px 24px;">
          <table width="100%" cellpadding="14" cellspacing="0" border="0"
                 style="background-color:#f7f9fc;border-radius:6px;">
            <tr>
              <td style="font-size:14px;color:#333333;line-height:1.8;">
                <strong>Phone:</strong> +91 98183 66550<br>
                <strong>Email:</strong> info@uncodemy.com<br>
                <strong>Website:</strong> uncodemy.com
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:0 28px 28px;font-size:14px;color:#444444;line-height:1.6;">
          <p style="margin:0 0 6px;">Looking forward to helping you with your career goals.</p>
          <p style="margin:0;">Best regards,<br><strong>The Uncodemy Team</strong></p>
        </td>
      </tr>

      <tr>
        <td style="background-color:#f2f4f7;text-align:center;padding:16px;border-top:1px solid #eaeaea;">
          <p style="margin:0 0 6px;font-size:12px;color:#888888;">
            Uncodemy Edutech Pvt. Ltd. &middot; uncodemy.com
          </p>
          <p style="margin:0;font-size:12px;color:#999999;">
            You're receiving this email because you submitted an inquiry with us.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>
HTML;

        $mail->isHTML(true);
        $mail->Body    = $emailBody;
        $mail->AltBody = "Dear $name,\n\nThank you for contacting Uncodemy regarding $course.\n\nContact us:\nPhone: +91-9818366550 / 8766313646 / 8800023723\nEmail: info@uncodemy.com\nWebsite: uncodemy.com\n\nBest regards,\nThe Uncodemy Team";

        $mail->send();
        return true;

    } catch (Exception $e) {
        error_log("Email Error: " . ($mail ? $mail->ErrorInfo : $e->getMessage()));
        return false;
    }
}


/* ------------------------------ WHATSAPP -------------------------------- */

function sendWhatsAppMessage($conn, $mobile, $name, $course) {
    $queueId = null;
    try {
        $stmt = $conn->prepare("INSERT INTO whatsapp_queue (mobile, name) VALUES (?, ?)");
        $stmt->bind_param("ss", $mobile, $name);
        $stmt->execute();
        $queueId = $stmt->insert_id;
        $stmt->close();

        sleep(1);

        $ultramsg_token    = 'wnc3vea7gnstkqs1';
        $ultramsg_instance = 'instance177583';

        $message  = "Hi *$name*!\n\n";
        $message .= "*Thanks for reaching out about our $course!*\n\n";
        $message .= "We're excited to discuss how we can assist you.\n";
        $message .= "*One of our team members will call you shortly to provide detailed information and answer any questions you might have.*\n";
        $message .= "Please let us know if there's a specific time that works best for you.\n\n";

        $message .= "*About Uncodemy:*\n";
        $message .= "India's *Top IT Institute* offering *job-oriented training & placement programs*\n";
        $message .= "✅ *2,00,000+ students trained*\n";
        $message .= "✅ *Backed by industry experts & live projects*\n";
        $message .= "✅ *850+ hiring partners & 14+ own companies*\n\n";

        $message .= "*Target Batch FY26:*\n";
        $message .= "With *1.5+ Lakh job openings projected in India*, this is your chance to *upskill and get hired!*\n\n";
        $message .= "✅ *Flexible schedules available*\n";
        $message .= "✅ *Live sessions with real-time projects*\n";
        $message .= "✅ *Only 15-20 seats per batch – Book yours now!*\n\n";

        $message .= "*Contact Us:*\n\n";
        $message .= "*Website:*\nuncodemy.com\nhttp://uncodemy.com\n\n";
        $message .= "*Email:*\ninfo@uncodemy.com\n\n";
        $message .= "*Call/WhatsApp:*\n";
        $message .= "https://wa.me/919818366550\n";
        $message .= "https://wa.me/918766313646\n";
        $message .= "https://wa.me/918800023723\n\n";

        $message .= "*Important Links:*\n*Location:*\n";
        $message .= "https://goo.gl/maps/ngUKcggCaujjfsLY6\n\n";
        $message .= "*Register Now:*\nhttps://uncodemy.com/fee-payment\n\n";
        $message .= "Want a *free demo or consultation?* Reply *YES* and we'll arrange it for you!\n\n";
        $message .= "*Let's get you closer to your IT career goals!*";

        // 10 digit ho to +91, warna number jaise hai waise (country code already)
        $to = (strlen($mobile) === 10) ? '+91' . $mobile : '+' . $mobile;

        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => "https://api.ultramsg.com/$ultramsg_instance/messages/chat",
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => http_build_query([
                'token' => $ultramsg_token,
                'to'    => $to,
                'body'  => $message
            ]),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_SSL_VERIFYPEER => false
        ]);

        curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $status = ($httpCode === 200) ? 'sent' : 'failed';

        $upd = $conn->prepare("UPDATE whatsapp_queue SET status = ?, sent_at = NOW() WHERE id = ?");
        $upd->bind_param("si", $status, $queueId);
        $upd->execute();
        $upd->close();

        return $status === 'sent';

    } catch (Exception $e) {
        error_log("WhatsApp Error: " . $e->getMessage());
        if ($queueId) {
            $upd = $conn->prepare("UPDATE whatsapp_queue SET status = 'failed' WHERE id = ?");
            $upd->bind_param("i", $queueId);
            $upd->execute();
            $upd->close();
        }
        return false;
    }
}