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

// Initialize response
$response = [
    'status' => 'error',
    'message' => 'Unknown error',
    'whatsapp' => false,
    'email' => false
];

try {
    // Get input data
    $input = json_decode(file_get_contents('php://input'), true);
    if ($input === null && json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON input");
    }

    // Validate inputs
    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $mobile = trim($input['mobile'] ?? '');
    $course = trim($input['course'] ?? 'IT Course');
    $campaign_id = trim($input['campaign_id'] ?? '');

    if (empty($name) || (empty($email) && empty($mobile))) {
        throw new Exception("Name and either email or mobile are required");
    }

    if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email format");
    }

    if (!empty($mobile)) {
        $mobile = preg_replace('/\D/', '', $mobile);
        if (strlen($mobile) !== 10) {
            throw new Exception("Mobile number must be 10 digits");
        }
    }

    // Send notifications
    if (!empty($email)) {
        $response['email'] = sendUserEmail($email, $name, $course);
        // If email failed first time, try once more
        if (!$response['email']) {
            error_log("First email attempt failed, retrying...");
            $response['email'] = sendUserEmail($email, $name, $course);
        }
    }

    if (!empty($mobile)) {
        // WhatsApp will be handled by Node.js service
        $response['whatsapp'] = true;
    }

    $response['status'] = 'success';
    $response['message'] = 'Notifications sent successfully';

} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    http_response_code(400);
    $response['message'] = $e->getMessage();
    $response['error_details'] = $e->getFile() . ':' . $e->getLine();
}

echo json_encode($response);

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
        $mail->Password = 'cmtk ycyd jjwn eyxf';
        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;
        $mail->SMTPDebug = 0; // Set to 0 for production, 3 for debugging
        $mail->Debugoutput = function($str, $level) {
            error_log("PHPMailer ($level): $str");
        };

        // Email content
        $mail->setFrom('join@uncodemy.com', 'Uncodemy Team');
        $mail->addAddress($email);
        $mail->Subject = 'Thank You for Contacting Uncodemy | Your IT Training Starts Here!';
        
        $emailBody = <<<HTML
        <!DOCTYPE html><html><head><title>Thank You - Uncodemy</title><meta charset="UTF-8"></head><body style="margin:0;padding:0;background-color:#f2f2f2;font-family:Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:20px 0;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 0 10px rgba(0,0,0,0.1);"><tr><td style="background-color:#1e73be;padding:10px 20px;text-align:center;"><img src="https://uncodemy.com/img/placement/uncodemy_cover.png" alt="Uncodemy Edutech Pvt. Ltd." width="100%" style="max-width:320px;margin-bottom:10px;border-radius:8px;border:1px solid #ddd;"><p style="color:#ffffff;font-size:18px;margin:0;font-weight:700;">India&#39;s Premier IT Training Institute</p></td></tr><tr><td style="background-color:#e9f3ff;padding:30px 20px 20px;text-align:center;"><img src="https://i.gifer.com/RPCJ.gif" alt="Thank You" width="100%" style="max-width:250px;height:100px;border-radius:8px;border:1px solid #ddd;"><div style="font-size:20px;font-weight:bold;color:#1d1d1d;border:2px solid #1d1d1d;border-radius:20px;display:inline-block;padding:15px 20px;background:#ffffff;">Thank You for Choosing Uncodemy</div><p style="margin-top:10px;font-size:14px;color:#555555;">Your journey toward IT excellence begins with us! &#128188;</p></td></tr><tr><td style="padding:20px;font-size:15px;color:#1d1d1d;"><p style="margin:0 0 10px 0;">Dear <strong style="color:#1e73be;">$name</strong>,</p><p style="margin:0 0 15px 0;"><strong style="color:#1e73be;"> Thank you for your inquiry regarding our training and placement programs </strong>.</p><table width="100%" cellpadding="15" cellspacing="0" border="0" style="background-color:#d9ebfd;border-radius:8px;"><tr><td style="font-size:14px;color:#1d1d1d;"><p style="margin:0 0 10px 0;"><strong style="color:#1e73be;">We&#39;re excited to discuss how we can assist you! &#128640;</strong></p><p style="margin:0 0 10px 0;">&#128222; One of our team members will call you shortly to provide detailed information and answer any questions you might have.</p><p style="margin:0;">&#9200;&#65039; Please let us know if there&#39;s a specific time that works best for you.</p></td></tr></table></td></tr><tr><td style="padding:20px;"><p style="font-size:14px;margin:0 0 10px 0;">&#9993;&#65039; We&#39;re excited to connect!<br>Choose your preferred action:</p><table cellpadding="10" cellspacing="0" border="0"><tr><td><a href="tel:+918766313646" style="display:inline-block;background-color:#1e73be;color:#ffffff;padding:10px 5px;border-radius:5px;text-decoration:none;font-size:14px;">&#128222; Call Us Now </a></td><td><a href="https://wa.me/919818366550" style="display:inline-block;background-color:#25D366;color:#ffffff;padding:10px 5px;border-radius:5px;text-decoration:none;font-size:14px;">&#128172; WhatsApp</a></td><td><a href="https://uncodemy.com" style="display:inline-block;background-color:#002a80;color:#ffffff;padding:10px 5px;border-radius:5px;text-decoration:none;font-size:14px;">&#127760; Visit Website</a></td><td><a href="https://uncodemy.com/placement#placement-2024" style="display:inline-block;background-color:#ff5421;color:#ffffff;padding:10px 5px;border-radius:5px;text-decoration:none;font-size:14px;">Placement Report</a></td></tr></table><p style="font-size:13px;margin-top:10px;color:#666666;">&#9203; Prefer a callback? Let us know your convenient time!</p></td></tr><tr><td style="padding:20px;"><div style="background-color:#f8f9fa;border-left:4px solid #1e73be;padding:15px;margin-bottom:20px;border-radius:0 8px 8px 0;"><h2 style="font-size:18px;color:#1e73be;margin:0 0 10px 0;">&#127775; About Uncodemy</h2><p style="font-size:14px;margin:0 0 15px 0;line-height:1.6;">At <strong style="color:#1e73be;">Uncodemy India&#39;s Top IT Institute</strong>, we specialize in providing <strong>industry-focused training and placement services</strong> in IT technologies, ensuring alignment with current market demands. Our Training & Placement Department has successfully guided <strong>over 2,00,892 students</strong>.</p><p style="font-size:14px;margin:0 0 15px 0;line-height:1.6;">Our experienced <strong>EdTech counselors</strong> support your training and placement process so you gain the <strong style="color:#1e73be;">skills and opportunities</strong> needed to excel.</p></div><div style="background-color:#fff8e6;border-radius:8px;padding:15px;margin-bottom:20px;border:1px solid #ffeeba;"><h3 style="font-size:16px;color:#1e73be;margin:0 0 10px 0;display:flex;align-items:center;">&#128273; <span style="margin-left:5px;">Key Highlights</span></h3><ul style="font-size:14px;margin:0 0 0 15px;padding-left:10px;line-height:1.6;"><li style="margin-bottom:8px;"><strong>Industry Insights:</strong> Reports from <strong>Deloitte, PWC, EY, KPMG, TCS, HCL, Adobe</strong> show <strong style="color:#d9534f;">1.5 Lakh+ job openings</strong> expected in FY25.</li><li style="margin-bottom:8px;"><strong>Target Batch:</strong> Flexible schedule batch for working pros & freshers.</li><li style="margin-bottom:0;"><strong>Limited Seats:</strong> 15, 20 students per batch for better practical learning.</li></ul></div><div style="background-color:#e8f4f8;border-radius:8px;padding:15px;margin-bottom:20px;"><h3 style="font-size:16px;color:#1e73be;margin:0 0 10px 0;display:flex;align-items:center;">&#127760; <span style="margin-left:5px;">Our Network</span></h3><ul style="font-size:14px;margin:0 0 0 15px;padding-left:10px;line-height:1.6;"><li style="margin-bottom:8px;">We own <strong>10+ companies</strong> across sectors</li><li style="margin-bottom:0;">Partnered with <strong>550+ companies</strong> for placements</li></ul></div><div style="background-color:#e7f5ee;border-radius:8px;padding:15px;margin-bottom:20px;"><h3 style="font-size:16px;color:#1e73be;margin:0 0 15px 0;display:flex;align-items:center;">&#128222; <span style="margin-left:5px;">Contact Us</span></h3><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td width="30" style="vertical-align:top;padding-right:10px;">&#128241;</td><td style="padding-bottom:10px;"><strong>Call/WhatsApp:</strong><br><a href="tel:+9198183 66550" style="color:#1e73be;text-decoration:none;">+91-9818366550</a> / <a href="tel:+918766313646" style="color:#1e73be;text-decoration:none;">8766313646</a> / <a href="tel:+918800023723" style="color:#1e73be;text-decoration:none;">8800023723</a></td></tr><tr><td width="30" style="vertical-align:top;padding-right:10px;">&#128231;</td><td style="padding-bottom:10px;"><strong>Email:</strong><br><a href="mailto:info@uncodemy.com" style="color:#1e73be;text-decoration:none;">info@uncodemy.com</a></td></tr><tr><td width="30" style="vertical-align:top;padding-right:10px;">&#127760;</td><td style="padding-bottom:10px;"><strong>Website:</strong><br><a href="https://uncodemy.com" style="color:#1e73be;text-decoration:none;">uncodemy.com</a></td></tr><tr><td width="30" style="vertical-align:top;padding-right:10px;">&#128205;</td><td><strong>Google Map:</strong><br><a href="https://maps.google.com/?q=Uncodemy" style="color:#1e73be;text-decoration:none;">Our Location</a></td></tr></table></div><div style="text-align:center;background-color:#f0f7ff;border-radius:8px;padding:15px;"><h3 style="font-size:16px;color:#1e73be;margin:0 0 15px 0;">&#127891; Registration</h3><a href="https://uncodemy.com/register-now" style="display:inline-block;background-color:#1e73be;color:#ffffff;text-decoration:none;font-size:14px;padding:10px 20px;border-radius:5px;font-weight:bold;">Click here to register now</a><p style="font-size:14px;margin:15px 0 0 0;color:#555555;">Looking forward to helping you achieve your career goals!</p><p style="font-size:14px;margin:5px 0 0 0;color:#555555;">Best regards,<br><strong>The Uncodemy Team</strong> &#128104;&#8205;&#128187;&#128105;&#8205;&#128187;</p></div></td></tr><tr><td style="text-align:center;padding:20px;"><a href="https://uncodemy.com/contact-us" style="display:inline-block;background:linear-gradient(to right,#1e73be,#25D366);color:#ffffff;text-decoration:none;font-size:16px;padding:12px 25px;border-radius:6px;font-weight:bold;">&#10024; Contact Us Now &#10024;</a></td></tr><tr><td style="background-color:#1e73be;text-align:center;padding:15px;"><a href="https://uncodemy.com" style="color:#ffffff;margin:0 10px;font-size:14px;text-decoration:none;">&#127968; Home</a><a href="https://uncodemy.com/all-courses" style="color:#ffffff;margin:0 10px;font-size:14px;text-decoration:none;">&#128218; Courses</a><a href="https://uncodemy.com/privacy-policy" style="color:#ffffff;margin:0 10px;font-size:14px;text-decoration:none;">&#128274; Privacy Policy</a><a href="https://uncodemy.com/terms-and-conditions" style="color:#ffffff;margin:0 10px;font-size:14px;text-decoration:none;">&#128221; Terms & Condition</a></td></tr><tr><td style="text-align:center;font-size:12px;color:#999999;padding:10px;">Copyright 2026 Uncodemy. All Rights Reserved.</td></tr></table></td></tr></table></body></html>
        HTML;

        $mail->isHTML(true);
        $mail->Body = $emailBody;
        $mail->AltBody = "Dear $name,\n\nThank you for contacting Uncodemy about our $course program.\n\nContact us:\nPhone: +91-9818366550 / 8766313646 / 8800023723\nEmail: info@uncodemy.com\nWebsite: uncodemy.com\n\nBest regards,\nThe Uncodemy Team";
        
        return $mail->send();
    } catch (Exception $e) {
        error_log("Email Error: " . $mail->ErrorInfo);
        return false;
    }
}