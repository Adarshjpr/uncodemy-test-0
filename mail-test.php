<?php
require_once 'C:/inetpub/wwwroot/php/lib/PHPMailer/PHPMailer.php';
require_once 'C:/inetpub/wwwroot/php/lib/PHPMailer/SMTP.php';
require_once 'C:/inetpub/wwwroot/php/lib/PHPMailer/Exception.php';

$mail = new PHPMailer\PHPMailer\PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'join@uncodemy.com';
    $mail->Password = 'palf kqmz iusu pirb';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    
    $mail->setFrom('join@uncodemy.com', 'Test');
    $mail->addAddress('bambam@uncodemy.com');
    $mail->Subject = 'SMTP Test';
    $mail->Body = 'This is a test email';
    
    $mail->send();
    echo "Email sent successfully!";
} catch (Exception $e) {
    echo "Error: {$e->getMessage()}";
}